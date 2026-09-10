import type { ComponentType } from "react";

/**
 * The five pillars, keyed the way an example's `meta.notes` names them.
 * The order is the README's, and the page renders the rows in it.
 */
export const PILLARS = [
  { key: "native", name: "Native CSS" },
  { key: "modern", name: "Modern CSS" },
  { key: "composition", name: "Composition" },
  { key: "context", name: "Contextualism" },
  { key: "accessible", name: "Accessible & gatekept" },
] as const;

export type PillarKey = (typeof PILLARS)[number]["key"];

/** A category folder under src/examples, in display order. */
export interface ExampleCategory {
  /** The folder name and the URL segment: /examples/<slug>. */
  slug: string;
  title: string;
  /** One line under the title on the category page and the index rail. */
  blurb: string;
}

/** What an example says about itself: src/examples/<category>/<slug>/meta.ts. */
export interface ExampleMeta {
  title: string;
  /** One sentence: what the section is and what it is for. */
  description: string;
  /** Must equal the folder the example lives in; the gate checks. */
  category: string;
  /**
   * The `@loamui/core` components the example imports, by export name
   * ("Button", "Badge"). Must match the import line exactly; the gate
   * checks. Empty when the example is element styles alone.
   */
  uses: string[];
  /**
   * One sentence per pillar on the judgment this example encodes. Only the
   * pillars that apply; the page fills the rest with the pillar's own line.
   */
  notes: Partial<Record<PillarKey, string>>;
  /** Free-text search terms beyond the title ("landing", "marketing"). */
  tags?: string[];
  /** Position within the category (lower first); ties break by slug. */
  order?: number;
}

/** The raw text of an example's two source files, read from disk at build. */
export interface ExampleSource {
  tsx: string;
  css: string;
}

/** One example's identity and meta, as generated-meta.ts lists it (JSX-free). */
export interface ExampleMetaEntry {
  slug: string;
  category: string;
  meta: ExampleMeta;
}

/** One example with its component, as generated.ts lists it. */
export interface ExampleEntry extends ExampleMetaEntry {
  Example: ComponentType;
}
