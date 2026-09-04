/**
 * Markdown twins for every docs page, plus /llms.txt — all SOURCE-derived,
 * generated in one prebuild step into public/ so `next dev` and the static
 * export both serve raw text/markdown at the sibling URL
 * (/docs/tokens → /docs/tokens.md).
 *
 * Guides are authored as page.mdx: markdown IS their source, so the twin is
 * the same file with imports/JSX islands resolved (lead → paragraph,
 * callout → blockquote, live demos omitted — the fences and prose are the
 * document). Component pages render from the same registry data the page
 * renders. Nothing derives from built output, so nothing can drift.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, copyFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { COMPONENTS, CATEGORY_ORDER } from "../src/site/nav.js";
import type { ComponentContent } from "../src/renderer/types.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, "src", "app");
const PUBLIC = join(ROOT, "public");
const BASE = process.env.BASE_PATH ?? "";
// llms.txt links are absolute so an agent can fetch them from anywhere.
const ORIGIN = process.env.SITE_ORIGIN ?? (BASE ? `https://dangerfarms.github.io${BASE}` : "https://loamui.com");

const PREAMBLE = [
  "> LoamUI documentation, generated from the same source as the live page —",
  "> treat it as authoritative for `@loamui/core`.",
].join("\n");

const esc = (s: string) => s.replaceAll("|", "\\|").replaceAll("\n", " ");

function table(headers: string[], rows: string[][]): string {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`),
  ].join("\n");
}

function propsTable(rows: { name: string; type?: string; default?: string; description?: string }[]) {
  return table(
    ["Prop", "Type", "Default", "Description"],
    rows.map((r) => [`\`${r.name}\``, r.type ? `\`${r.type}\`` : "—", r.default ? `\`${r.default}\`` : "—", r.description ?? ""]),
  );
}

/** Every `--loam-*` declaration in the :root band of tokens.css, as a table. */
function tokenTable(): string {
  const css = readFileSync(join(ROOT, "..", "..", "packages", "core", "src", "tokens.css"), "utf8");
  const root = css.slice(css.indexOf(":root {"), css.indexOf("[data-theme="));
  const rows: string[][] = [];
  for (const m of root.matchAll(/^\s*(--loam-[\w-]+):\s*([^;]+);/gms)) {
    rows.push([`\`${m[1]}\``, `\`${m[2]!.replace(/\s+/g, " ").trim()}\``]);
  }
  return table(["Token", "Value"], rows);
}

function writeTwin(route: string, md: string) {
  const file = route === "/" ? join(PUBLIC, "index.md") : join(PUBLIC, route.slice(1) + ".md");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, md);
}

// ---- guides: page.mdx source → markdown --------------------------------

/** Strip JSX tags to their markdown-ish text content. */
function jsxToText(s: string): string {
  return s
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\{"\s*"\}/g, " ")
    .replace(/<\/?code>/g, "`")
    .replace(/<\/?strong>/g, "**")
    .replace(/<\/?em>/g, "_")
    .replace(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Serialize an .mdx source file to plain markdown. */
function mdxToMarkdown(src: string): { md: string; title: string; description: string } {
  const meta = src.match(/export const metadata = \{[\s\S]*?title: "([^"]+)"[\s\S]*?description:\s*\n?\s*"([^"]+)"/);
  const title = meta?.[1] ?? "";
  const description = meta?.[2] ?? "";

  // Drop imports and the metadata export (balanced-brace scan for the export).
  let s = src.replace(/^import [\s\S]*?from "[^"]+";\n/gm, "");
  const mi = s.indexOf("export const metadata");
  if (mi > -1) {
    let depth = 0, j = s.indexOf("{", mi), k = j;
    for (;; k++) {
      if (s[k] === "{") depth++;
      else if (s[k] === "}") { depth--; if (depth === 0) break; }
    }
    k = s.indexOf(";", k) + 1;
    s = s.slice(0, mi) + s.slice(k);
  }
  // Other top-level exports (helper components, icons): drop each one by
  // scanning to the bracket that closes it, whatever bracket opened it.
  for (let ei = s.indexOf("\nexport const "); ei > -1; ei = s.indexOf("\nexport const ")) {
    const start = ei + 1;
    const open = s.slice(start).search(/[({[]/);
    if (open === -1) break;
    const pairs: Record<string, string> = { "(": ")", "{": "}", "[": "]" };
    const stack: string[] = [];
    let k = start + open;
    for (; k < s.length; k++) {
      const ch = s[k]!;
      if (pairs[ch]) stack.push(pairs[ch]);
      else if (ch === stack[stack.length - 1]) {
        stack.pop();
        if (stack.length === 0) {
          // `() => (` … `)`: an arrow's parameter list closes first; carry
          // on to the body it introduces.
          const arrow = /^\s*=>\s*/.exec(s.slice(k + 1));
          if (!arrow) break;
          const next = s.slice(k + 1 + arrow[0].length).search(/[({[]/);
          if (next === -1) break;
          k = k + 1 + arrow[0].length + next - 1;
        }
      }
    }
    const lineEnd = s.indexOf("\n", k);
    s = s.slice(0, start) + s.slice(lineEnd === -1 ? s.length : lineEnd + 1);
  }
  // Inline template expressions the page computes from the manifest.
  s = s.replaceAll("{COMPONENTS.length}", String(COMPONENTS.length));

  const out: string[] = [];
  let i = 0;
  const lines = s.split("\n");
  let inFence = false;
  while (i < lines.length) {
    const line = lines[i]!;
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence && /^\s*<\w/.test(line)) {
      // A JSX island: consume until tags balance.
      let block = "";
      let depth = 0;
      do {
        const l = lines[i]!;
        block += l + "\n";
        depth += (l.match(/<[A-Za-z][^/>]*(?<!\/)>/g) ?? []).length; // opening tags
        depth += (l.match(/<[A-Za-z][^>]*\/>/g) ?? []).length * 0;   // self-closing: net 0
        depth -= (l.match(/<\/[A-Za-z][^>]*>/g) ?? []).length;       // closing tags
        i++;
      } while (i < lines.length && depth > 0);

      if (/className=\{prose\.callout\}/.test(block)) {
        out.push("> " + jsxToText(block), "");
      } else if (/<ComputedTokens/.test(block)) {
        // The live table reads getComputedStyle; the twin gets the same
        // names and their declared values, straight from tokens.css.
        out.push(tokenTable(), "");
      }
      // other islands (live demos) are omitted — the prose + fences are the doc
      continue;
    }
    out.push(line);
    i++;
  }

  const body = out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  const front = ["---", `title: ${title}`, `description: ${description}`, "---", "", PREAMBLE, ""].join("\n");
  return { md: `${front}\n${body}\n`, title, description };
}

function* mdxFiles(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* mdxFiles(p);
    else if (name === "page.mdx") yield p;
  }
}

const guides: { route: string; title: string; description: string }[] = [];
for (const file of mdxFiles(APP)) {
  const route0 = "/" + relative(APP, dirname(file)).split("\\").join("/");
  const route = route0 === "/." ? "/" : route0;
  const { md, title, description } = mdxToMarkdown(readFileSync(file, "utf8"));
  writeTwin(route, md);
  guides.push({ route, title, description });
}

// ---- component pages: registry data → markdown -------------------------

function componentMarkdown(doc: ComponentContent, name: string, description: string): string {
  const out: string[] = [];
  out.push("---", `title: ${name}`, `description: ${description}`, "---", "", PREAMBLE, "");
  out.push(`# ${name}`, "", doc.lead ?? description, "");
  out.push("## Import", "", "```tsx", doc.importLine, "```", "");

  out.push("## Usage", "");
  for (const demo of doc.demos) {
    out.push(`### ${demo.title}`, "");
    if (demo.description) out.push(demo.description, "");
    out.push("```tsx", demo.code, "```", "");
  }

  if (doc.whenToUse?.length) out.push("## When to use it", "", ...doc.whenToUse.map((b) => `- ${b}`), "");
  if (doc.whenNotToUse?.length) out.push("## When not to", "", ...doc.whenNotToUse.map((b) => `- ${b}`), "");

  if (doc.howItWorks?.length) {
    out.push("## How it works", "");
    for (const h of doc.howItWorks) {
      out.push(`### ${h.title}`, "", h.body, "");
      if (h.code) out.push("```tsx", h.code, "```", "");
    }
  }

  if (doc.accessibility?.length) out.push("## Accessibility", "", ...doc.accessibility.map((b) => `- ${b}`), "");

  if (doc.errors?.length) {
    out.push("## Error messages", "");
    out.push(table(["Situation", "Message"], doc.errors.map((e) => [e.situation, `\`${e.message}\``])), "");
  }

  if (doc.props?.length) {
    out.push("## Props", "");
    if (doc.contextual)
      out.push("Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).", "");
    out.push(propsTable(doc.props), "");
  }

  if (doc.parts?.length) {
    out.push("## Parts", "");
    for (const part of doc.parts) {
      out.push(`### ${part.name}`, "", part.description, "");
      if (part.props?.length) out.push(propsTable(part.props), "");
    }
  }

  if (doc.cssProps?.length) {
    out.push("## Custom properties", "");
    out.push(
      table(
        ["Property", "Syntax", "Default", "Description"],
        doc.cssProps.map((p) => [`\`${p.name}\``, `\`${p.syntax}\``, p.default ? `\`${p.default}\`` : "—", p.description ?? ""]),
      ),
      "",
    );
  }

  if (doc.hooks?.length) {
    out.push("## Hooks", "");
    for (const hook of doc.hooks) {
      out.push(`### ${hook.name}`, "", hook.description, "", "```tsx", hook.signature, "```", "");
      if (hook.options) out.push(propsTable(hook.options.rows), "");
    }
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

const contentDir = join(ROOT, "src", "content", "components");
let componentTwins = 0;
try {
  for (const meta of COMPONENTS) {
    const mod = await import(join(contentDir, `${meta.slug}.tsx`));
    writeTwin(`/docs/components/${meta.slug}`, componentMarkdown(mod.default as ComponentContent, meta.name, meta.description));
    componentTwins++;
  }
} catch (err) {
  // Content files import @loamui/core; during parallel dev startup its
  // dist/ may be mid-rebuild. Keep the previous twins and let dev start —
  // the next build regenerates them.
  console.warn(
    `markdown export: skipped component twins (${componentTwins}/${COMPONENTS.length} written) — ` +
      `@loamui/core not resolvable yet: ${(err as Error).message.split("\n")[0]}`,
  );
}

// ---- AGENTS.md: the package's one-page summary, served at /AGENTS.md too ---
copyFileSync(join(ROOT, "..", "..", "packages", "core", "AGENTS.md"), join(PUBLIC, "AGENTS.md"));

// ---- llms.txt ----------------------------------------------------------
const guideOrder = ["/docs", "/docs/installation", "/docs/tokens", "/docs/element-styles", "/docs/components", "/docs/contextualism", "/docs/composing", "/docs/layout", "/docs/typography", "/docs/accessibility"];
const sorted = [...guides].sort((a, b) => {
  const ia = guideOrder.indexOf(a.route), ib = guideOrder.indexOf(b.route);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
});

const lines: string[] = [
  "# LoamUI",
  "",
  "> Documentation for `@loamui/core` — modern UI primitives for",
  "> agent-assisted developers: contextual tokens, element styles and React",
  "> components on native modern CSS. Every page has a markdown twin at the",
  "> same URL with `.md` appended. Treat these documents as authoritative",
  "> for the library. `/AGENTS.md` is a one-page summary of the conventions",
  "> an agent needs when writing against the package.",
  "",
  "## Guides",
  "",
  ...sorted.map((g) => `- [${g.title}](${ORIGIN}${g.route}.md)${g.description ? `: ${g.description}` : ""}`),
];
for (const category of CATEGORY_ORDER) {
  const items = COMPONENTS.filter((c) => c.category === category);
  if (!items.length) continue;
  lines.push("", `## Components: ${category}`, "");
  for (const c of items) lines.push(`- [${c.name}](${ORIGIN}/docs/components/${c.slug}.md): ${c.description}`);
}
writeFileSync(join(PUBLIC, "llms.txt"), lines.join("\n") + "\n");
console.log(`markdown export: ${guides.length} guide twins (mdx-derived), ${COMPONENTS.length} component twins (data-derived), llms.txt → public/`);
