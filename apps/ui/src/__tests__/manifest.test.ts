import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { MANIFEST } from "../content/manifest";
import type { Composition } from "../content/types";

// The manifest is a server-safe copy of each page's metadata, kept by hand;
// these tests are what stops the copy drifting from the page.

const NOT_PAGES = new Set(["manifest.ts", "registry.client.tsx", "types.ts"]);

const pageSlugs = readdirSync(new URL("../content/", import.meta.url))
  .filter((file) => file.endsWith(".tsx") && !NOT_PAGES.has(file))
  .map((file) => file.replace(/\.tsx$/, ""));

async function loadPage(slug: string): Promise<Composition> {
  const page = (await import(`../content/${slug}.tsx`)) as { default: Composition };
  return page.default;
}

describe("manifest", () => {
  it("lists every content page, and nothing else", () => {
    const manifestSlugs = MANIFEST.map((entry) => entry.slug);
    expect(new Set(manifestSlugs).size, "duplicate slugs").toBe(manifestSlugs.length);
    expect([...pageSlugs].sort()).toEqual([...manifestSlugs].sort());
  });

  it("carries each page's own slug and description", async () => {
    const pages = await Promise.all(MANIFEST.map((entry) => loadPage(entry.slug)));
    const mismatches: string[] = [];
    for (const [i, entry] of MANIFEST.entries()) {
      const page = pages[i]!;
      if (page.slug !== entry.slug) {
        mismatches.push(`${entry.slug}: page slug is "${page.slug}"`);
      }
      if (page.description !== entry.description) {
        mismatches.push(
          `${entry.slug}:\n  manifest: ${entry.description}\n  page:     ${page.description}`,
        );
      }
    }
    expect(mismatches, `manifest.ts disagrees with its pages:\n${mismatches.join("\n")}`).toEqual(
      [],
    );
  });
});
