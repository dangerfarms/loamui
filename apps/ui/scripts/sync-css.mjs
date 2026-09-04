// Copies the built @loamui/core and @loamui/ui stylesheets into public/ so
// they are served as static files (see apps/docs/scripts/sync-css.mjs for
// why the library CSS bypasses the bundler). `--watch` re-copies on change.
import { copyFileSync, existsSync, mkdirSync, watch } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..", "..");
const publicDir = join(here, "..", "public");
const sources = [
  ["core", "loamui-core.css"],
  ["ui", "loamui-ui.css"],
];

function sync() {
  mkdirSync(publicDir, { recursive: true });
  for (const [pkg, out] of sources) {
    const built = join(repo, "packages", pkg, "dist", "styles.css");
    // A rebuild cleans dist before it writes; skip the gap, the write follows.
    if (!existsSync(built)) continue;
    copyFileSync(built, join(publicDir, out));
  }
  console.log("sync-css: copied core and ui stylesheets to public/");
}

sync();

if (process.argv.includes("--watch")) {
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
