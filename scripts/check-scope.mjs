// Gate: no dead rules inside a donut scope.
//
// `@scope (.loam-X) to ([class*="loam-"])` fences core parts out of a
// stylesheet, and the fence excludes the limit element itself. So a rule
// inside the donut whose subject carries a `loam-` class never matches:
// neither `.loam-X-item { … }` nor a bare `li { … }` when the component
// renders `<li className="loam-X-item">`. Breadcrumbs shipped exactly that
// and nothing noticed. This scanner walks every component stylesheet in both
// packages, finds rules nested (at any depth) in a donut, and fails when the
// rule's subject compound either names a `.loam-` class or is a bare element
// that the component's TSX gives a `loam-` class.
// Run: node scripts/check-scope.mjs

import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const ROOTS = ["packages/core/src/components", "packages/ui/src/components"].map((p) => join(ROOT, p));
const DONUT = /to \(\[class\*="loam-"\]\)/;

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

const findings = [];
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
          findings.push({ file, line: rule.line, sel, why: "names a loam- class, which the donut excludes" });
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
          return classes.length === 0 || classes.every((c) => new RegExp(`["'\`\\s]${c}["'\`\\s]`).test(attrs));
        });
        if (hit) {
          findings.push({ file, line: rule.line, sel, why: `the <${el}> it targets carries a loam- class, which the donut excludes` });
        }
      }
    }
  }
}

if (findings.length) {
  console.error(`check-scope: ${findings.length} rule(s) inside a donut scope can never match.\n`);
  for (const f of findings) {
    console.error(`  ${relative(ROOT, f.file)}:${f.line}  \`${f.sel}\` — ${f.why}`);
  }
  console.error(`\nMove the rule into that element's own @scope block (e.g. @scope (.loam-${"X-part"})).`);
  process.exit(1);
}
console.log(`check-scope: no dead donut rules (${basename(ROOTS[0])} and ui scanned).`);
