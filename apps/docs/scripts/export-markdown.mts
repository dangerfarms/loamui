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
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, rmSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { COMPONENTS, CATEGORY_ORDER } from "../src/site/nav.js";
import type { ComponentContent } from "../src/renderer/types.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, "src", "app");
const PUBLIC = join(ROOT, "public");
// Links in llms.txt must be absolute: agents fetch it from anywhere and
// resolve the linked twins without a base URL.
const ORIGIN = process.env.SITE_ORIGIN ?? "https://loamui.com";
// The published `loamui` agent skill carries the same twins as offline
// references (skills/loamui/references/), regenerated here so they can't
// drift from the site. `check:skill` fails CI if the committed copy is stale.
const SKILL_REFS = join(ROOT, "..", "..", "skills", "loamui", "references");

/** Write the same markdown to public/ (served) and the skill references (committed). */
function writeBoth(publicFile: string, refFile: string, md: string) {
  mkdirSync(dirname(publicFile), { recursive: true });
  writeFileSync(publicFile, md);
  mkdirSync(dirname(refFile), { recursive: true });
  writeFileSync(refFile, md);
}

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

/** Guide twin: /docs/tokens → public/docs/tokens.md + references/guides/tokens.md. */
function writeGuideTwin(route: string, md: string) {
  const file = route === "/" ? join(PUBLIC, "index.md") : join(PUBLIC, route.slice(1) + ".md");
  const slug = route === "/" ? "index" : route === "/docs" ? "introduction" : route.split("/").at(-1)!;
  writeBoth(file, join(SKILL_REFS, "guides", `${slug}.md`), md);
}

/** Component twin: public/docs/components/<slug>.md + references/components/<slug>.md. */
function writeComponentTwin(slug: string, md: string) {
  writeBoth(join(PUBLIC, "docs", "components", `${slug}.md`), join(SKILL_REFS, "components", `${slug}.md`), md);
}

// Start the skill references from empty so removed pages don't linger.
rmSync(SKILL_REFS, { recursive: true, force: true });

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

  // Drop the metadata export (balanced-brace scan). MDX-level imports are
  // dropped line by line in the walk below, where code fences are known —
  // a multi-line regex here once swallowed everything between an `import`
  // inside one fence and the next `from "…"` in another.
  let s = src;
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
  // Other top-level exports (helper components/styles) — drop line blocks.
  s = s.replace(/^export const \w+ = [\s\S]*?^};?\n/gm, "");

  const out: string[] = [];
  let i = 0;
  let inFence = false;
  const lines = s.split("\n");
  while (i < lines.length) {
    const line = lines[i]!;
    // Code fences are verbatim: their JSX is documentation, not an island,
    // and their imports are the example's own.
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      out.push(line);
      i++;
      continue;
    }
    if (inFence) {
      out.push(line);
      i++;
      continue;
    }
    if (/^import .* from "[^"]+";\s*$/.test(line)) {
      i++;
      continue;
    }
    if (/^\s*<\w/.test(line)) {
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
  writeGuideTwin(route, md);
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
    writeComponentTwin(meta.slug, componentMarkdown(mod.default as ComponentContent, meta.name, meta.description));
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

// ---- llms.txt ----------------------------------------------------------
const guideOrder = ["/docs", "/docs/installation", "/docs/tokens", "/docs/element-styles", "/docs/components", "/docs/contextualism", "/docs/layout", "/docs/accessibility"];
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
  "> for the library.",
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

// ---- llms-full.txt: every twin in one file, for tools that ingest one -----
const guideSlug = (route: string) => (route === "/" ? "index" : route === "/docs" ? "introduction" : route.split("/").at(-1)!);
const full: string[] = [lines.join("\n"), ""];
for (const g of sorted) full.push("---", "", readFileSync(join(SKILL_REFS, "guides", `${guideSlug(g.route)}.md`), "utf8"));
for (const category of CATEGORY_ORDER) {
  for (const c of COMPONENTS.filter((x) => x.category === category)) {
    const f = join(SKILL_REFS, "components", `${c.slug}.md`);
    try {
      full.push("---", "", readFileSync(f, "utf8"));
    } catch {
      // component twins may be skipped during parallel dev startup (see above)
    }
  }
}
writeFileSync(join(PUBLIC, "llms-full.txt"), full.join("\n"));

// ---- skill references index: llms.txt with local paths for offline use ----
const idx: string[] = [
  "# LoamUI reference index",
  "",
  "> Generated from the docs source; the same content as the live `.md`",
  "> pages. Read a file here, or fetch its live twin, before using a",
  `> component you have not already read. Live index: ${ORIGIN}/llms.txt`,
  "",
  "## Guides",
  "",
  ...sorted.map((g) => `- [${g.title}](guides/${guideSlug(g.route)}.md) — ${g.description} · [live](${ORIGIN}${g.route}.md)`),
];
for (const category of CATEGORY_ORDER) {
  const items = COMPONENTS.filter((c) => c.category === category);
  if (!items.length) continue;
  idx.push("", `## Components: ${category}`, "");
  for (const c of items)
    idx.push(`- [${c.name}](components/${c.slug}.md) — ${c.description} · [live](${ORIGIN}/docs/components/${c.slug}.md)`);
}
writeFileSync(join(SKILL_REFS, "index.md"), idx.join("\n") + "\n");

console.log(
  `markdown export: ${guides.length} guide twins (mdx-derived), ${COMPONENTS.length} component twins (data-derived), llms.txt + llms-full.txt → public/, references → skills/loamui/references/`,
);
