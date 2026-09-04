// Writes public/llms.txt for the compositions site from the server-safe
// manifest: an index agents can fetch, pointing at the gallery pages and at
// the core docs' llms.txt for the primitives the compositions are built from.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const ORIGIN = process.env.SITE_ORIGIN ?? "https://loamui.com";
const BASE = process.env.BASE_PATH ?? "/ui";

// The manifest is TypeScript; read the entries with a small regex rather
// than compiling it, since it is plain data by contract.
const src = readFileSync(join(root, "src", "content", "manifest.ts"), "utf8");
const entries = [
  ...src.matchAll(/slug: "([^"]+)",\s*name: "([^"]+)",\s*category: "([^"]+)",\s*description:\s*"([^"]+)"/g),
].map(([, slug, name, category, description]) => ({ slug, name, category, description }));

const lines = [
  "# LoamUI compositions (@loamui/ui)",
  "",
  "> Ready-made sections built from @loamui/core primitives. Each is a compound",
  "> component (parts you arrange, no size/variant/colour props). Install",
  "> `@loamui/core` and `@loamui/ui`, import both stylesheets (core first), or",
  "> copy the code from a gallery page. The primitives themselves are documented",
  `> at ${ORIGIN}/llms.txt; read that first.`,
  "",
];
for (const category of [...new Set(entries.map((e) => e.category))]) {
  lines.push(`## ${category}`, "");
  for (const e of entries.filter((x) => x.category === category)) {
    lines.push(`- [${e.name}](${ORIGIN}${BASE}/${e.slug}/): ${e.description}`);
  }
  lines.push("");
}
mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public", "llms.txt"), lines.join("\n"));
console.log(`export-llms: ${entries.length} compositions → public/llms.txt`);
