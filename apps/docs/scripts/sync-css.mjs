// Copies the built LoamUI stylesheets into public/ so they're served as
// static files (<link> in layout.tsx) instead of being re-parsed by the app
// bundler. The library CSS is a finished build artifact — and it uses
// ahead-of-toolchain syntax (e.g. `@container anchored()`) that lightningcss
// can't parse yet. Runs via predev/prebuild; re-run after `pnpm build` in
// packages/* if you're iterating on library CSS during docs dev.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..", "..");
const publicDir = join(here, "..", "public");

mkdirSync(publicDir, { recursive: true });

for (const [pkg, out] of [["core", "loamui-core.css"]]) {
  copyFileSync(join(repo, "packages", pkg, "dist", "styles.css"), join(publicDir, out));
}
console.log("sync-css: copied core stylesheet to public/");
