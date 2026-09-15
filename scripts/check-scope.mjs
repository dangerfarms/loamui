// Gate: no dead rules inside a donut scope.
//
// `@scope (.loam-X) to ([class*="loam-"])` fences core parts out of a
// stylesheet, and the fence excludes the limit element itself. So a rule
// inside the donut whose subject carries a `loam-` class never matches:
// neither `.loam-X-item { … }` nor a bare `li { … }` when the component
// renders `<li className="loam-X-item">`. Breadcrumbs shipped exactly that
// and nothing noticed. This scanner walks every component stylesheet in both
// packages and the examples, finds rules nested (at any depth) in a donut, and fails when the
// rule's subject compound either names a `.loam-` class or is a bare element
// that the component's TSX gives a `loam-` class.
// Run: node scripts/check-scope.mjs

import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import postcss from "postcss";
import { pathToFileURL } from "node:url";

const ROOT = new URL("..", import.meta.url).pathname;
const ROOTS = [
  "packages/core/src/components",
  "apps/docs/src/examples",
  "apps/docs/src/app",
  "apps/docs/src/site",
  "apps/docs/src/renderer",
].map((p) => join(ROOT, p));
const DONUT = /to\s*\([^)]*\[class\*="loam-"\]/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".css")) out.push(full);
  }
  return out;
}

/** Split a selector list on top-level commas. */
function splitList(selector) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const ch of selector) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/** The last compound of a complex selector, ignoring anything inside (). */
function subject(selector) {
  let depth = 0;
  let start = 0;
  for (let i = 0; i < selector.length; i++) {
    const ch = selector[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (depth === 0 && /[\s>+~]/.test(ch)) start = i + 1;
  }
  return selector.slice(start).trim();
}

/** Rules nested in a donut, as { selector, line }. */
function donutRules(css) {
  const rules = [];
  const stack = []; // { donut: boolean }
  let prelude = "";
  let line = 1;
  let i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      const skipped = css.slice(i, end + 2);
      line += (skipped.match(/\n/g) || []).length;
      i = end + 2;
      continue;
    }
    if (ch === "\n") line++;
    if (ch === "{") {
      const text = prelude.trim();
      const inDonut = stack.some((b) => b.donut);
      if (text.startsWith("@scope")) stack.push({ donut: DONUT.test(text) });
      else if (text.startsWith("@")) stack.push({ donut: false });
      else {
        stack.push({ donut: false });
        if (inDonut) rules.push({ selector: text, line: line - (text.match(/\n/g) || []).length });
      }
      prelude = "";
    } else if (ch === "}") {
      stack.pop();
      prelude = "";
    } else if (ch === ";") {
      prelude = "";
    } else prelude += ch;
    i++;
  }
  return rules;
}

export function nakedScopes(css) {
  const out = [];
  postcss.parse(css).walkAtRules("scope", (scope) => {
    if (DONUT.test(scope.params)) return;
    const bare = new Set();
    scope.walkRules((rule) => {
      let parent = rule.parent;
      while (parent !== scope) {
        if (
          parent.type === "atrule" &&
          (parent.name === "scope" || parent.name.endsWith("keyframes"))
        )
          return;
        parent = parent.parent;
      }
      for (const match of rule.selector.matchAll(
        /(?:^|[\s>,+~(])([a-z][a-z0-9-]*)(?=[\s.#:[>+~),]|$)/g,
      ))
        bare.add(match[1]);
    });
    if (bare.size) out.push({ root: scope.params, line: scope.source.start.line, bare: [...bare] });
  });
  return out;
}

export function proseBoundaryFindings(css) {
  const findings = [];
  postcss.parse(css).walkAtRules("scope", (scope) => {
    if (!/^\(\.site-prose\)(?:\s|$)/.test(scope.params)) return;
    if (!/to\s*\([^)]*\.block(?:[\s,)]|$)/.test(scope.params) || !DONUT.test(scope.params))
      findings.push("article scope must exclude preview blocks and core roots");
    let parent = scope.parent;
    while (parent && !(parent.type === "atrule" && parent.name === "layer")) parent = parent.parent;
    if (!parent) findings.push("article styles must have an explicit cascade layer");
  });
  return findings;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const findings = [];
  const proseFile = join(ROOT, "apps/docs/src/app/docs/prose.css");
  for (const why of proseBoundaryFindings(readFileSync(proseFile, "utf8")))
    findings.push({ file: proseFile, line: 1, sel: ".site-prose", why });

  for (const root of ROOTS) {
    for (const file of walk(root)) {
      const dir = dirname(file);
      const tsx = readdirSync(dir)
        .filter((f) => f.endsWith(".tsx") && !/\.(stories|test)\.tsx$/.test(f))
        .map((f) => readFileSync(join(dir, f), "utf8"))
        .join("\n");
      for (const rule of donutRules(readFileSync(file, "utf8"))) {
        for (const sel of splitList(rule.selector)) {
          const subj = subject(sel);
          if (!subj || subj.startsWith(":scope") || subj === "&" || subj === "*") continue;
          if (/\.loam-/.test(subj)) {
            findings.push({
              file,
              line: rule.line,
              sel,
              why: "names a loam- class, which the donut excludes",
            });
            continue;
          }
          const el = subj.match(/^([a-z][a-z0-9]*)(?![\w-])/)?.[1];
          if (!el) continue;
          // The selector's own classes (`div.body` → ["body"]); a rule with none
          // (`li`) applies to every such element the component renders.
          const classes = [...subj.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
          // Every <el …> tag the component renders, with its attribute text.
          const tags = [...tsx.matchAll(new RegExp(`<${el}\\b([^>]*)>`, "gs"))].map((m) => m[1]);
          const hit = tags.some((attrs) => {
            if (!/className=/.test(attrs) || !/loam-/.test(attrs)) return false;
            return (
              classes.length === 0 ||
              classes.every((c) => new RegExp(`["'\`\\s]${c}["'\`\\s]`).test(attrs))
            );
          });
          if (hit) {
            findings.push({
              file,
              line: rule.line,
              sel,
              why: `the <${el}> it targets carries a loam- class, which the donut excludes`,
            });
          }
        }
      }
    }
  }

  /**
   * The inverse fault: a scope that hosts core components but has no donut, with
   * bare type selectors that will reach into whatever it hosts. The rule is in
   * CONTRIBUTING and in the agent guidance, and the homepage demo still shipped
   * without it — so it is checked here rather than trusted to review.
   */

  for (const root of ROOTS) {
    for (const file of walk(root)) {
      const dir = dirname(file);
      const tsx = readdirSync(dir)
        .filter((f) => f.endsWith(".tsx") && !/\.(stories|test)\.tsx$/.test(f))
        .map((f) => readFileSync(join(dir, f), "utf8"))
        .filter((source) => source.includes(`"./${basename(file)}"`))
        .join("\n");
      if (!/from "@loamui\/core"/.test(tsx) && basename(file) !== "prose.css") continue;
      for (const s of nakedScopes(readFileSync(file, "utf8"))) {
        findings.push({
          file,
          line: s.line,
          sel: `@scope ${s.root}`,
          why: `hosts core components but has no donut, and its bare ${s.bare.map((b) => `\`${b}\``).join(", ")} selector(s) reach inside them`,
        });
      }
    }
  }

  if (findings.length) {
    console.error(`check-scope: ${findings.length} scope problem(s).\n`);
    for (const f of findings) {
      console.error(`  ${relative(ROOT, f.file)}:${f.line}  \`${f.sel}\` — ${f.why}`);
    }
    console.error(
      `\nEither move the rule into that element's own @scope block, or add the donut: @scope (root) to ([class*="loam-"]).`,
    );
    process.exit(1);
  }
  console.log(
    `check-scope: static scope checks passed (${ROOTS.length} roots). Verify rendered cascade and embedded recipe boundaries in a browser.`,
  );
}
