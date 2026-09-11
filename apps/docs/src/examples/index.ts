import { EXAMPLES } from "./generated";
import type { ExampleEntry } from "./types";

export { EXAMPLES } from "./generated";
export { EXAMPLE_CATEGORIES, getCategory } from "./categories";
export { exampleHref, examplesByCategory, componentsUsed } from "./catalog";
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
