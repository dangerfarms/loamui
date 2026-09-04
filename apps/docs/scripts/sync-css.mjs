// Copies the built LoamUI stylesheets into public/ so they're served as
// static files (<link> in layout.tsx) instead of being re-parsed by the app
// bundler. The library CSS is a finished build artifact — and it uses
// ahead-of-toolchain syntax (e.g. `@container anchored()`, `position-try`)
// that lightningcss (Turbopack's CSS engine) can't parse yet, so importing it
// through the bundler fails the build. Serving it verbatim sends it straight
// to the browser's forgiving parser, which is how the library is meant to be
// consumed. (Delete this once lightningcss learns anchor-positioning grammar.)
//
// Pass `--watch` (used by `pnpm dev`) to re-copy whenever core rebuilds its
// stylesheet, so library-CSS edits reach the docs live — paired with
// `build-css --watch` in core's dev, a CSS edit flows: src → dist → public,
// and the content-hashed <link> refetches on the next refresh.
import { copyFileSync, existsSync, mkdirSync, watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..", "..");
const publicDir = join(here, "..", "public");
const sources = [["core", "loamui-core.css"]];

function sync() {
  mkdirSync(publicDir, { recursive: true });
  for (const [pkg, out] of sources) {
    const built = join(repo, "packages", pkg, "dist", "styles.css");
    // A rebuild cleans dist before it writes; skip the gap, the write follows.
    if (!existsSync(built)) continue;
    copyFileSync(built, join(publicDir, out));
  }
  console.log("sync-css: copied core stylesheet to public/");
}

sync();

if (process.argv.includes("--watch")) {
  console.log("sync-css: watching core dist for changes…");
  let timer;
  for (const [pkg] of sources) {
    // Watch the directory, not the file: a rebuild unlinks and recreates
    // styles.css, and a watch on the file itself stops firing at the unlink.
    watch(join(repo, "packages", pkg, "dist"), (_event, file) => {
      if (file !== "styles.css") return;
      clearTimeout(timer);
      timer = setTimeout(sync, 80);
    });
  }
}
