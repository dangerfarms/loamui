import { EXAMPLE_META } from "./generated-meta";
import { EXAMPLE_CATEGORIES } from "./categories";
import type { ExampleMetaEntry } from "./types";

export { EXAMPLE_META } from "./generated-meta";

/** Browsing needs metadata only; keep component imports out of this module. */
export function examplesByCategory() {
  return EXAMPLE_CATEGORIES.map((category) => ({
    category,
    items: EXAMPLE_META.filter((e) => e.category === category.slug),
  })).filter((g) => g.items.length > 0);
}

/** Every core component any example uses, most used first. */
export function componentsUsed(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of EXAMPLE_META)
    for (const name of e.meta.uses) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function exampleHref(e: Pick<ExampleMetaEntry, "category" | "slug">): string {
  return `/examples/${e.category}/${e.slug}`;
}
