// Build dist/styles.css: the cascade-layer order, then the base files
// (tokens and elements, each declaring its own layer), then every
// component's CSS wrapped into `loamui.components` here. Component source
// files contain no `@layer` — the layer is assigned at build time (and by
// the src/styles.css orchestrator's `layer()` imports during dev).
//
// Pass `--watch` (used by `pnpm dev`) to rebuild the stylesheet whenever a
// library CSS file changes, so library-CSS edits are live during dev. Watch
// mode touches only the CSS; the `"use client"` step on index.js is left to
// the one-shot build (tsup owns index.js while `tsup --watch` is running).
import { readFileSync, writeFileSync, readdirSync, mkdirSync, watch } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(pkgRoot, "src");
const componentsDir = join(src, "components");

const header = `/*!\n * LoamUI — @loamui/core\n * The complete, static stylesheet. Import once at your app root:\n *   import "@loamui/core/styles.css";\n * Nothing runs at runtime — no CSS-in-JS.\n */\n\n`;
const layerOrder = "@layer loamui.tokens, loamui.elements, loamui.components;\n";

/** Assemble dist/styles.css from tokens, elements and every component. */
function buildCss() {
  let out = header + layerOrder;
  for (const base of ["tokens.css", "elements.css"]) {
    out += "\n" + readFileSync(join(src, base), "utf8").trim() + "\n";
  }

  const names = readdirSync(componentsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const orchestrator = readFileSync(join(src, "styles.css"), "utf8");

  let count = 0;
  for (const name of names) {
    const cssPath = join(componentsDir, name, `${name}.css`);
    let css;
    try {
      css = readFileSync(cssPath, "utf8").trim();
    } catch {
      continue; // component has no stylesheet
    }
    if (!css) continue;
    if (css.includes("@layer")) {
      throw new Error(
        `${name}.css declares @layer — component files must not; the layer is assigned by the build and the orchestrator.`,
      );
    }
    if (!orchestrator.includes(`/${name}/${name}.css`)) {
      console.warn(
        `build-css: WARNING — src/styles.css is missing the import for ${name}.css (Storybook/dev won't load it)`,
      );
    }
    out += `\n/* ${name} */\n@layer loamui.components {\n${css}\n}\n`;
    count++;
  }

  mkdirSync(join(pkgRoot, "dist"), { recursive: true });
  writeFileSync(join(pkgRoot, "dist", "styles.css"), out);
  console.log(`build-css: wrote dist/styles.css (${count} components, ${out.length} bytes)`);
}

// LoamUI ships as a client-safe package (like @mantine/core): prepend the
// "use client" directive so every component can be imported directly from a
// React Server Component. esbuild strips this when bundling, so we add it here.
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
  // Recursive fs.watch is supported on macOS/Windows (the dev platforms);
  // debounce because a single save fires several events.
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
