// Check CSS and literal React style objects in core, the site and published recipes.
// Fluid calc()/clamp() ramps and em geometry are deliberate exceptions.
// A -1px margin is allowed for border overlap and visually hidden geometry.
// Other functions (including var() fallbacks) are inspected rather than skipped.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import postcss from "postcss";
import valueParser from "postcss-value-parser";
import ts from "typescript";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PROPERTY = /^(?:padding|margin|(?:row-|column-)?gap)(?:-[a-z]+)*$/;

export function bypassesScale(value) {
  let bare = false;
  valueParser(value).walk((node) => {
    if (node.type === "function" && ["clamp", "calc"].includes(node.value)) return false;
    if (node.type === "word" && /^-?(?:\d*\.)?\d+(?:rem|px)$/.test(node.value)) {
      if (parseFloat(node.value) !== 0 && node.value !== "-1px") bare = true;
    }
  });
  return bare;
}

export function spacingFindings(source, file) {
  const findings = [];
  if (file.endsWith(".css")) {
    postcss.parse(source, { from: file }).walkDecls((decl) => {
      if (PROPERTY.test(decl.prop) && bypassesScale(decl.value)) {
        findings.push({ line: decl.source.start.line, prop: decl.prop, value: decl.value });
      }
    });
  } else {
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      // Covers inline style objects and extracted style constants, but not code
      // samples inside strings. Computed keys and runtime values need review.
      if (ts.isPropertyAssignment(node)) {
        const prop = node.name
          .getText(tree)
          .replace(/["']/g, "")
          .replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        const value = node.initializer;
        const literal = ts.isStringLiteralLike(value)
          ? value.text
          : ts.isNumericLiteral(value)
            ? `${value.text}px`
            : null;
        if (PROPERTY.test(prop) && literal !== null && bypassesScale(literal)) {
          findings.push({
            line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1,
            prop,
            value: literal,
          });
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(tree);
  }
  return findings;
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

export function checkedFiles() {
  const published = new Set(
    [
      ...readFileSync(join(ROOT, "apps/docs/src/examples/recipes.ts"), "utf8").matchAll(
        /^\s*"([^"\n]+)"/gm,
      ),
    ].map((m) => m[1]),
  );
  return ["packages/core/src", "apps/docs/src"]
    .flatMap((dir) => walk(join(ROOT, dir)))
    .filter((file) => {
      if (!/\.(css|tsx)$/.test(file) || /\.(test|stories)\.tsx$/.test(file)) return false;
      const recipe = relative(ROOT, file).match(/^apps\/docs\/src\/examples\/([^/]+\/[^/]+)\//);
      return !recipe || published.has(recipe[1]);
    });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = checkedFiles();
  const findings = files.flatMap((file) =>
    spacingFindings(readFileSync(file, "utf8"), file).map((finding) => ({ file, ...finding })),
  );
  for (const finding of findings)
    console.error(
      `${relative(ROOT, finding.file)}:${finding.line} ${finding.prop}: ${finding.value}`,
    );
  if (findings.length) {
    console.error(
      `check-spacing: ${findings.length} literal spacing values bypass tokens. Use --loam-space-* or --loam-space-fixed-*.`,
    );
    process.exitCode = 1;
  } else
    console.log(
      `check-spacing: ${files.length} CSS/TSX files checked, including published recipes. Runtime values and calc()/clamp() ramps require review.`,
    );
}
