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
    description: "Headline figures: each tile a large value over a short label, alone or in a row.",
  },
  {
    slug: "testimonial",
    name: "Testimonial",
    category: "Page sections",
    description:
      "One testimonial: a quotation and who said it, alone, in a Card or in a Carousel.",
  },
  {
    slug: "feature",
    name: "Feature",
    category: "Page sections",
    description:
      "One feature: an icon, a title and a line on what it does, alone or in a grid you write.",
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
    slug: "contact-form",
    name: "Contact form",
    category: "Forms",
    description: "A stack of fields and a row of actions on a native form.",
  },
  {
    slug: "sign-in-form",
    name: "Sign-in form",
    category: "Forms",
    description:
      "A sign-in form in a Card: a title, one column of fields, a stretched action and a footer link.",
  },
  {
    slug: "error-page",
    name: "Error page",
    category: "Page sections",
    description:
      "An error page: the status code, a title that says what happened, a line on what to do next and a row of ways out.",
  },
  {
    slug: "person",
    name: "Person",
    category: "Page sections",
    description: "One person: an avatar over a name and a role, alone or in a grid you write.",
  },
  {
    slug: "article-card",
    name: "Article card",
    category: "Blog",
    description:
      "One article in a Card: a category and date, a linked title, an excerpt and an author, alone or in a grid you write.",
  },
  {
    slug: "table-of-contents",
    name: "Table of contents",
    category: "Blog",
    description:
      "A table of contents for the page in view: a small label over a list of links to the headings, with the current section marked.",
  },
  {
    slug: "steps",
    name: "Steps",
    category: "Page sections",
    description:
      "An ordered sequence: each step a marker, a title and a description; a timeline when the marker is a date.",
  },
  {
    slug: "logo-wall",
    name: "Logo wall",
    category: "Page sections",
    description:
      "A row of client or partner logos, each an image with the organisation's name, sized to one shared height so marks of any shape read as one set.",
  },
  {
    slug: "gallery",
    name: "Gallery",
    category: "Page sections",
    description:
      "A grid of figures, each an image that opens larger: a real link to the full-size file, a lightbox once JavaScript arrives.",
  },
];

export function metaBySlug(slug: string): CompositionMeta | undefined {
  return MANIFEST.find((c) => c.slug === slug);
}
