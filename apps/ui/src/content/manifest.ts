import type { Category } from "./types";

export type CompositionMeta = {
  slug: string;
  name: string;
  category: Category;
  description: string;
};

export const CATEGORY_ORDER: Category[] = [
  "Page sections",
  "Forms",
  "Navigation",
  "Data display",
  "Blog",
];

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
  {
    slug: "carousel",
    name: "Carousel",
    category: "Page sections",
    description:
      "A scroll-snap track for any run of content, cards, images or quotes, with a pair of Buttons that page through it.",
  },
  {
    slug: "call-to-action",
    name: "Call to action",
    category: "Page sections",
    description:
      "A closing section: a title, one sentence and a row of actions, centred on a subtle surface.",
  },
  {
    slug: "banner",
    name: "Banner",
    category: "Page sections",
    description:
      "A one-line announcement bar for the top of a page: a message and, beside it, a Button or a link.",
  },
  {
    slug: "faq",
    name: "FAQ",
    category: "Page sections",
    description:
      "A list of questions, each a native disclosure the browser opens, closes and searches.",
  },
  {
    slug: "contact-form",
    name: "Contact form",
    category: "Forms",
    description: "A stack of fields and a row of actions on a native form.",
  },
  {
    slug: "sign-in",
    name: "Sign in",
    category: "Forms",
    description:
      "A sign-in card: a title, one column of fields, a stretched action and a footer link.",
  },
  {
    slug: "error-page",
    name: "Error page",
    category: "Page sections",
    description:
      "An error page: the status code, a title that says what happened, a line on what to do next and a row of ways out.",
  },
  {
    slug: "team",
    name: "Team",
    category: "Page sections",
    description: "A grid of team members, each an avatar over a name and a role.",
  },
  {
    slug: "article-cards",
    name: "Article cards",
    category: "Blog",
    description:
      "A grid of article Cards, each a category and date, a linked title, an excerpt and an author.",
  },
  {
    slug: "table-of-contents",
    name: "Table of contents",
    category: "Blog",
    description:
      "A table of contents for the page in view: a small label over a list of links to the headings, with the current section marked.",
  },
];

export function metaBySlug(slug: string): CompositionMeta | undefined {
  return MANIFEST.find((c) => c.slug === slug);
}
