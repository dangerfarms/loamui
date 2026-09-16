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
    if (file.endsWith(".full.txt")) continue;
    const slug = file.replace(/\.txt$/, "");
    const short = read(`${prompts}/${category}/${file}`);
    const prompt = read(`${prompts}/${category}/${slug}.full.txt`);
    assert.ok(short.trim().split(/\s+/).length <= 40, `${slug}: default prompt is too long`);
    assert.ok(
      short.startsWith("Use the LoamUI skill to build the “"),
      `${slug}: must invoke the skill`,
    );
    assert.ok(!short.includes("\n\n"), `${slug}: expected one short prompt`);
    for (const path of [
      `/recipes/${category}/${slug}.md`,
      "/docs/agent-workflow.md",
      "/recipes/guide.md",
      `/recipe-prompts/${category}/${slug}.full.txt`,
    ]) {
      assert.ok(existsSync(join(root, "apps/docs/public", path)), `${slug}: broken ${path}`);
    }
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
    const title = twin.match(/^# (.+)$/m)?.[1];
    assert.ok(title && short.includes(`“${title}”`), `${slug}: prompt must name its recipe`);
    const uses = twin.match(/^- Uses: (.+)$/m)?.[1] ?? "";
    for (const match of uses.matchAll(/`([^`]+)`/g)) {
      assert.ok(
        twin.includes(`- [${match[1]}](https://loamui.com/docs/components/`),
        `${slug}: missing ${match[1]} link`,
      );
      assert.ok(
        prompt.includes(`# Reference: ${match[1]}\n`),
        `${slug}: missing ${match[1]} contract`,
      );
    }
    assert.ok(prompt.includes("# Build with the skill"), `${slug}: missing workflow`);
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
  read("apps/docs/public/llms.txt").includes("## Implementation brief"),
  "Index must carry the essential implementation brief",
);
console.log(
  `check-recipe-prompts: OK (${count} short skill prompts and complete offline references, exact recipe source, component contracts, one llms.txt)`,
);
