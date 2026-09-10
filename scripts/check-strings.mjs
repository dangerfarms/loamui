// Gate: no hard-coded user-facing English in component JSX.
//
// CONTRIBUTING's rule is that every default string a component shows or
// announces is overridable through a `labels` prop or through children.
// This scans the core component sources (not stories, tests or
// docs) and fails on:
//   1. literal text between JSX tags that starts with a capital letter
//      (`<span>Weak</span>`, `>Show password<`), and
//   2. literal `aria-label`, `title`, `placeholder` and `alt` attributes.
// A line is exempt when it mentions `labels` (the string is a default being
// read from or written into the labels object) or carries `// i18n-default`.
// Run: node scripts/check-strings.mjs [--fix-hint]

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const ROOTS = ["packages/core/src/components"].map((p) => join(ROOT, p));

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx$/.test(entry) && !/\.(stories|test)\.tsx$/.test(entry)) out.push(full);
  }
  return out;
}

const TEXT = />\s*([A-Z][A-Za-z'’]*(?:\s+[A-Za-z'’,:]+)*[.:!?]?)\s*</g;
const ATTR = /\b(aria-label|title|placeholder|alt)="([^"]+)"/g;

const findings = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (/labels|i18n-default/i.test(line)) return;
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments and JSDoc
      for (const m of line.matchAll(TEXT)) {
        const text = m[1];
        // Single glyphs and code-like tokens are not prose.
        if (text.length < 3 || /^[A-Z0-9_]+$/.test(text)) continue;
        findings.push({ file, line: i + 1, kind: "text", value: text });
      }
      for (const m of line.matchAll(ATTR)) {
        findings.push({ file, line: i + 1, kind: m[1], value: m[2] });
      }
    });
  }
}

if (findings.length) {
  console.error(`check-strings: ${findings.length} hard-coded string(s) in component JSX.\n`);
  for (const f of findings) {
    console.error(`  ${relative(ROOT, f.file)}:${f.line}  ${f.kind}: "${f.value}"`);
  }
  console.error(
    `\nRead the string from a \`labels\` prop with an English default, or take it as children. Mark a deliberate literal with // i18n-default.`,
  );
  process.exit(1);
}
console.log("check-strings: no hard-coded strings in component JSX.");
