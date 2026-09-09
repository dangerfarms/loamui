import { EXAMPLES } from "./generated";
import { EXAMPLE_CATEGORIES } from "./categories";
import type { ExampleEntry, ExampleMetaEntry } from "./types";

export { EXAMPLES } from "./generated";
export { EXAMPLE_CATEGORIES, getCategory } from "./categories";
export { PILLARS } from "./types";
export type {
  ExampleCategory,
  ExampleEntry,
  ExampleMeta,
  ExampleMetaEntry,
  ExampleSource,
  PillarKey,
} from "./types";

export function examplesIn(category: string): ExampleEntry[] {
  return EXAMPLES.filter((e) => e.category === category);
}

export function getExample(category: string, slug: string): ExampleEntry | undefined {
  return EXAMPLES.find((e) => e.category === category && e.slug === slug);
}

/** Categories that have at least one example, with their examples, in display order. */
export function examplesByCategory() {
  return EXAMPLE_CATEGORIES.map((category) => ({
    category,
    items: examplesIn(category.slug),
  })).filter((g) => g.items.length > 0);
}

/** Every core component any example uses, with how many use it, most used first. */
export function componentsUsed(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of EXAMPLES)
    for (const name of e.meta.uses) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function exampleHref(e: Pick<ExampleMetaEntry, "category" | "slug">): string {
  return `/examples/${e.category}/${e.slug}`;
}
