// Run after the docs export. Verify shipped clipboard material against actual sources.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), "utf8");
const prompts = "apps/docs/public/recipe-prompts";
let count = 0;
for (const category of readdirSync(join(root, prompts))) {
  for (const file of readdirSync(join(root, prompts, category))) {
    const slug = file.replace(/\.txt$/, "");
    const prompt = read(`${prompts}/${category}/${file}`);
    for (const [source, language] of [
      ["Example.tsx", "tsx"],
      ["example.css", "css"],
    ]) {
      const code = read(`apps/docs/src/examples/${category}/${slug}/${source}`).trim();
      assert.ok(
        prompt.includes(`\`\`\`${language}\n${code}\n\`\`\``),
        `${category}/${slug}: ${source} drift`,
      );
    }
    const twin = read(`skills/loamui/references/recipes/${category}/${slug}.md`);
    const uses = twin.match(/^- Uses: (.+)$/m)?.[1] ?? "";
    for (const match of uses.matchAll(/`([^`]+)`/g)) {
      assert.ok(
        prompt.includes(`# Reference: ${match[1]}\n`),
        `${slug}: missing ${match[1]} contract`,
      );
    }
    assert.ok(prompt.includes("# Building with an agent"), `${slug}: missing workflow`);
    count++;
  }
}
const recipeCount = (read("apps/docs/src/examples/recipes.ts").match(/^  "[^"\n]+",$/gm) ?? [])
  .length;
assert.equal(count, recipeCount, "Every published recipe needs one prompt");
assert.ok(
  !existsSync(join(root, "apps/docs/public/llms-full.txt")),
  "Only llms.txt should be exported",
);
assert.ok(
  read("apps/docs/public/llms.txt").includes("# Building with an agent"),
  "Index must carry essential workflow",
);
console.log(
  `check-recipe-prompts: OK (${count} complete prompts, exact recipe source, component contracts, one llms.txt)`,
);
