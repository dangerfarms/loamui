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
    description: "One testimonial: a quotation and who said it, alone, in a Card or in a Carousel.",
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
    description: "One column of fields and a row of actions on a native form.",
  },
  {
    slug: "account-form",
    name: "Account form",
    category: "Forms",
    description:
      "The card an account form lives in: a title, one column of fields, a stretched action and a footer link. One shell for signing in, creating an account and resetting a password.",
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
  {
    slug: "image-comparison",
    name: "Image comparison",
    category: "Page sections",
    description:
      "A before/after comparison: two images in one frame, the second revealed by a slider.",
  },
  {
    slug: "embed",
    name: "Embed",
    category: "Page sections",
    description:
      "A third-party frame in the page: a video, a map, sized before it loads and named for assistive technology.",
  },
  {
    slug: "social-links",
    name: "Social links",
    category: "Navigation",
    description: "A row of icon-only links to profiles, each named by hidden text.",
  },
  {
    slug: "contact-details",
    name: "Contact details",
    category: "Data display",
    description:
      "How to reach an organisation or person: phone, email, postal address, hours, or a labelled list of links.",
  },
  {
    slug: "task-list",
    name: "Task list",
    category: "Data display",
    description:
      "The things a person must complete across a multi-step process, each with its status: a title that is a link when the task can be started, a description of what it needs and a Badge for where it stands.",
  },
  {
    slug: "summary-list",
    name: "Summary list",
    category: "Data display",
    description:
      "Label/value rows, each with an optional note and action: the answers about to be submitted, an order's details and its money lines, the facts of an account.",
  },
  {
    slug: "empty-state",
    name: "Empty state",
    category: "Page sections",
    description:
      "The screen shown when a list, a search or a section has nothing in it yet: what the place is for, why it is empty and one clear next action.",
  },
  {
    slug: "cookie-banner",
    name: "Cookie banner",
    category: "Page sections",
    description:
      "A cookie consent banner: a title, a paragraph or two, and the choices as real buttons, then a confirmation the reader can hide.",
  },
  {
    slug: "tag-list",
    name: "Tag list",
    category: "Blog",
    description: "The topics attached to something, each a link to everything that shares it.",
  },
  {
    slug: "setting-row",
    name: "Setting row",
    category: "Forms",
    description: "A label, a line explaining it, and the control that sets it, in one row.",
  },
  {
    slug: "side-nav",
    name: "Side navigation",
    category: "Navigation",
    description:
      "Vertical navigation for an application or a documentation site: lists of links, the current page marked, related pages folded into groups.",
  },
  {
    slug: "address-fields",
    name: "Address fields",
    category: "Forms",
    description:
      "The fields for a postal address: a Fieldset with one labelled line per part, each carrying its autofill purpose.",
  },
  {
    slug: "user-menu",
    name: "User menu",
    category: "Navigation",
    description:
      "The signed-in person's menu: an avatar button that opens their name, email and account actions, ending with sign out.",
  },
  {
    slug: "password-field",
    name: "Password field",
    category: "Forms",
    description:
      "A field for making up a password: the input, a strength meter and the rules in plain words, ticked as they are met.",
  },
  {
    slug: "selectable-card",
    name: "Selectable card",
    category: "Forms",
    description:
      "A choice presented as a card: a plan, a delivery option, a template. The whole card is the label of a real checkbox or radio.",
  },
  {
    slug: "byline",
    name: "Byline",
    category: "Blog",
    description:
      "Who wrote an article and when, at the top of it: an avatar, the author linked to their profile, the dates and the reading time on one line.",
  },
  {
    slug: "comment",
    name: "Comment",
    category: "Blog",
    description:
      "One comment in a discussion: who wrote it, when, and what they said, with its replies.",
  },
  {
    slug: "cart-line",
    name: "Cart line",
    category: "Data display",
    description:
      "One item in a basket: image, linked title, the options chosen, a slot for your QuantityInput, the line total with the unit price under it, and a remove action.",
  },
  {
    slug: "product-card",
    name: "Product card",
    category: "Data display",
    description:
      "One product in a listing: an image, a linked title, a rating, a price and one action, in an article inside a core Card.",
  },
];

export function metaBySlug(slug: string): CompositionMeta | undefined {
  return MANIFEST.find((c) => c.slug === slug);
}
