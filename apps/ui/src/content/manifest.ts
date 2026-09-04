import type { Category } from "./types";

export type CompositionMeta = {
  slug: string;
  name: string;
  category: Category;
  description: string;
};

export const CATEGORY_ORDER: Category[] = ["Page sections", "Navigation", "Data display"];

/**
 * Server-safe index of every composition (no JSX, no library imports), used
 * for static params and metadata. The live entries live in registry.client.tsx.
 */
export const MANIFEST: CompositionMeta[] = [
  {
    slug: "hero",
    name: "Hero",
    category: "Page sections",
    description: "A page-opening section: eyebrow, title, lede and a row of actions.",
  },
  {
    slug: "header",
    name: "Header",
    category: "Navigation",
    description: "A site header: brand, primary navigation and a row of actions.",
  },
  {
    slug: "footer",
    name: "Footer",
    category: "Navigation",
    description:
      "A site footer: brand and tagline, columns of links and a bottom row for small print.",
  },
  {
    slug: "stats",
    name: "Stats",
    category: "Data display",
    description: "A row of headline figures: each a large value over a short label.",
  },
  {
    slug: "pricing",
    name: "Pricing",
    category: "Page sections",
    description:
      "A grid of plans, each a Card with a name, a price, a feature list and one action.",
  },
  {
    slug: "testimonials",
    name: "Testimonials",
    category: "Page sections",
    description:
      "A scroll-snap carousel of quotes, each in a Card, with a pair of Buttons that page through it.",
  },
  {
    slug: "features",
    name: "Features",
    category: "Page sections",
    description:
      "A grid of feature tiles: an icon, a title and a line of body text, separated by space alone.",
  },
];

export function metaBySlug(slug: string): CompositionMeta | undefined {
  return MANIFEST.find((c) => c.slug === slug);
}
