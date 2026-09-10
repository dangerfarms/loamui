// The component manifest: each component's identity (name, slug, category,
// description) lives here once, in curated sidebar order. The registry
// joins page content onto these entries by slug. JSX-free, so the sidebar
// and command menu can import it without pulling in demo code.

import type { Category } from "@/renderer/types";

export interface NavItem {
  name: string;
  slug: string;
  category: Category;
  description: string;
}

export const GETTING_STARTED: { name: string; href: string }[] = [
  { name: "Introduction", href: "/docs" },
  { name: "Installation", href: "/docs/installation" },
  { name: "Contextualism", href: "/docs/contextualism" },
  { name: "Composing components", href: "/docs/composing" },
  { name: "Layout", href: "/docs/layout" },
  { name: "Typography", href: "/docs/typography" },
  { name: "Accessibility", href: "/docs/accessibility" },
];

// The two style primitives sit at the head of the Primitives section, above
// the three primitives, in reading order. Moved out of Getting started so the
// sidebar reads tokens → element styles → components, primitive to primitive.
// Components is a peer destination (its own overview page); the component
// categories nest beneath it in the sidebar.
export const PRIMITIVES: { name: string; href: string }[] = [
  { name: "Tokens", href: "/docs/tokens" },
  { name: "Element styles", href: "/docs/element-styles" },
  { name: "Components", href: "/docs/components" },
];

export const CATEGORY_ORDER = [
  "Inputs",
  "Data display",
  "Feedback",
  "Disclosures",
  "Navigation",
] as const;

export const COMPONENTS: NavItem[] = [
  // Inputs
  {
    name: "Field",
    slug: "field",
    category: "Inputs",
    description: "Composable form-field primitive.",
  },
  {
    name: "Fieldset",
    slug: "fieldset",
    category: "Inputs",
    description: "Group controls under a semantic label.",
  },
  {
    name: "ErrorSummary",
    slug: "error-summary",
    category: "Inputs",
    description: "List form errors as links to their fields.",
  },
  {
    name: "Button",
    slug: "button",
    category: "Inputs",
    description: "Trigger an action or event.",
  },
  {
    name: "Input",
    slug: "input",
    category: "Inputs",
    description: "A labelled text field.",
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "Inputs",
    description: "Multi-line text input.",
  },
  {
    name: "Select",
    slug: "select",
    category: "Inputs",
    description: "Choose one option from a list.",
  },
  {
    name: "DateInput",
    slug: "date-input",
    category: "Inputs",
    description: "Labelled fields for a memorable date.",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "Inputs",
    description: "Toggle a single option on or off.",
  },
  {
    name: "Radio",
    slug: "radio",
    category: "Inputs",
    description: "Choose one option from a set.",
  },
  {
    name: "Switch",
    slug: "switch",
    category: "Inputs",
    description: "An on/off toggle switch.",
  },
  {
    name: "Range",
    slug: "range",
    category: "Inputs",
    description: "Pick a numeric value from a range.",
  },
  // Data display
  {
    name: "Badge",
    slug: "badge",
    category: "Data display",
    description: "Compact status or label pill.",
  },
  {
    name: "Card",
    slug: "card",
    category: "Data display",
    description: "A flexible surface container.",
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "Data display",
    description: "Represent a user with an image or initials.",
  },
  {
    name: "Table",
    slug: "table",
    category: "Data display",
    description: "Display rows and columns of data.",
  },
  {
    name: "Separator",
    slug: "separator",
    category: "Data display",
    description: "A rule between groups of content.",
  },
  // Feedback
  {
    name: "Alert",
    slug: "alert",
    category: "Feedback",
    description: "Draw attention to an important message.",
  },
  {
    name: "Progress",
    slug: "progress",
    category: "Feedback",
    description: "Show completion of a task.",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "Feedback",
    description: "Placeholder while content loads.",
  },
  {
    name: "Loader",
    slug: "loader",
    category: "Feedback",
    description: "Indicate an ongoing process.",
  },
  {
    name: "Toast",
    slug: "toast",
    category: "Feedback",
    description: "Transient notifications.",
  },
  // Disclosures
  {
    name: "Details",
    slug: "details",
    category: "Disclosures",
    description: "Native disclosure for secondary content.",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "Disclosures",
    description: "Reveal info on hover or focus.",
  },
  {
    name: "Modal",
    slug: "modal",
    category: "Disclosures",
    description: "A focused dialog over the page.",
  },
  {
    name: "Drawer",
    slug: "drawer",
    category: "Disclosures",
    description: "An edge-anchored panel that slides in.",
  },
  {
    name: "Popover",
    slug: "popover",
    category: "Disclosures",
    description: "Floating content anchored to a trigger.",
  },
  {
    name: "Menu",
    slug: "menu",
    category: "Disclosures",
    description: "A list of actions opened from a trigger.",
  },
  // Navigation
  {
    name: "Tabs",
    slug: "tabs",
    category: "Navigation",
    description: "Switch between related views.",
  },
  {
    name: "SignpostLink",
    slug: "signpost-link",
    category: "Navigation",
    description: "Signpost the way into a task.",
  },
  {
    name: "SkipLink",
    slug: "skip-link",
    category: "Navigation",
    description: "Jump straight to the main content.",
  },
  {
    name: "Breadcrumbs",
    slug: "breadcrumbs",
    category: "Navigation",
    description: "Show the current page's location.",
  },
  {
    name: "Pagination",
    slug: "pagination",
    category: "Navigation",
    description: "Navigate between pages of content.",
  },
];

export function componentsByCategory() {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: COMPONENTS.filter((c) => c.category === category),
  })).filter((g) => g.items.length > 0);
}
