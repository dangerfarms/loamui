// Build dist/styles.css for @loamui/ui: the cascade-layer order (the core
// layers first, then `loamui.ui` on top), then every composition's CSS
// wrapped into `loamui.ui`. Composition files contain no `@layer`; the layer
// is assigned here (and by src/styles.css's `layer()` imports in dev).
// The stylesheet does NOT include @loamui/core: import both at the app root.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, watch } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(pkgRoot, "src");
const componentsDir = join(src, "components");

const header = `/*!\n * LoamUI — @loamui/ui\n * Compositions built from @loamui/core. Import after the core stylesheet:\n *   import "@loamui/core/styles.css";\n *   import "@loamui/ui/styles.css";\n * Nothing runs at runtime — no CSS-in-JS.\n */\n\n`;
const layerOrder = "@layer loamui.tokens, loamui.elements, loamui.components, loamui.ui;\n";

function buildCss() {
  let out = header + layerOrder;
  const names = readdirSync(componentsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  const orchestrator = readFileSync(join(src, "styles.css"), "utf8");
  let count = 0;
  for (const name of names) {
    let css;
    try {
      css = readFileSync(join(componentsDir, name, `${name}.css`), "utf8").trim();
    } catch {
      continue;
    }
    if (!css) continue;
    if (css.includes("@layer")) {
      throw new Error(`${name}.css declares @layer — composition files must not; the build assigns it.`);
    }
    if (!orchestrator.includes(`/${name}/${name}.css`)) {
      console.warn(`build-css: WARNING — src/styles.css is missing the import for ${name}.css`);
    }
    out += `\n/* ${name} */\n@layer loamui.ui {\n${css}\n}\n`;
    count++;
  }
  mkdirSync(join(pkgRoot, "dist"), { recursive: true });
  writeFileSync(join(pkgRoot, "dist", "styles.css"), out);
  console.log(`build-css: wrote dist/styles.css (${count} compositions, ${out.length} bytes)`);
}

function ensureUseClient() {
  const entry = join(pkgRoot, "dist", "index.js");
  const js = readFileSync(entry, "utf8");
  if (!js.startsWith('"use client"')) {
    writeFileSync(entry, `"use client";\n${js}`);
    console.log('build-css: prepended "use client" to dist/index.js');
  }
}

const watchMode = process.argv.includes("--watch");
buildCss();
if (!watchMode) ensureUseClient();
if (watchMode) {
  console.log("build-css: watching src for CSS changes…");
  let timer;
  watch(src, { recursive: true }, (_event, file) => {
    if (!file || !file.endsWith(".css")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        buildCss();
      } catch (err) {
        console.error(`build-css: ${err.message}`);
      }
    }, 80);
  });
}
