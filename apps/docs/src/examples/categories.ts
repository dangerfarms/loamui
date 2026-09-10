import type { ExampleCategory } from "./types";

/**
 * The example categories, in display order. Each is a folder under
 * src/examples; the generator refuses a folder that is not listed here,
 * and the gate refuses an entry with no folder. JSX-free, so the export
 * script and the navigation can import it.
 */
export const EXAMPLE_CATEGORIES: ExampleCategory[] = [
  {
    slug: "page-sections",
    title: "Page sections",
    blurb: "Heroes, features and calls to action: the blocks a marketing page is built from.",
  },
  {
    slug: "navigation",
    title: "Navigation",
    blurb: "Headers, footers and side navigation: the way around a site.",
  },
  {
    slug: "forms",
    title: "Forms",
    blurb: "Signing in, getting in touch, settings and choices: forms that say what they need.",
  },
  {
    slug: "data-display",
    title: "Data display",
    blurb: "Stats, lists and summaries: figures and facts laid out to be read at a glance.",
  },
  {
    slug: "app-cards",
    title: "Application cards",
    blurb: "Services, progress, preferences and tasks, each on one surface.",
  },
  {
    slug: "users",
    title: "Users",
    blurb: "People in an application: who is signed in, who is on the team, and what they can do.",
  },
  {
    slug: "blog",
    title: "Blog",
    blurb: "Articles, authors, comments and tags: the parts of a publication.",
  },
  {
    slug: "commerce",
    title: "Commerce",
    blurb: "Products, prices, baskets and plans: the parts of a shop.",
  },
  {
    slug: "buttons",
    title: "Buttons",
    blurb: "Buttons that do one more thing: copy, open a menu, show progress, sign in.",
  },
  {
    slug: "sliders",
    title: "Sliders",
    blurb: "A value from a range: marks, a live readout, and a number box beside it.",
  },
  {
    slug: "carousels",
    title: "Carousels",
    blurb: "A run of cards or images paged through on a scroll-snap track.",
  },
  {
    slug: "faq",
    title: "FAQ",
    blurb: "Questions and answers as native disclosures, alone or with a header and an image.",
  },
  {
    slug: "grids",
    title: "Grids",
    blurb: "Layouts in CSS grid: uneven columns, a leading item, and subgrid rows that line up.",
  },
  {
    slug: "errors",
    title: "Error pages",
    blurb: "What a visitor sees when something is missing or broken, with a way out.",
  },
];

export function getCategory(slug: string): ExampleCategory | undefined {
  return EXAMPLE_CATEGORIES.find((c) => c.slug === slug);
}
