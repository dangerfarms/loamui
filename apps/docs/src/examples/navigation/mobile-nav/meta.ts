import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Mobile nav",
  description:
    "Navigation for a narrow screen: a Menu button in the header opens a panel from the start edge holding the site's links, with the current page marked and a button to close it.",
  category: "navigation",
  uses: ["Drawer", "Nav"],
  notes: {
    native:
      "The panel is a native dialog opened with showModal(), so the top layer, focus containment, Escape and focus returning to the Menu button on close are the browser's, not a script's.",
    modern:
      "The links take a 2.75rem line through Nav's public --loam-nav-link-size, set on the panel and inherited: the smallest target a thumb hits reliably, without touching Nav's own rules.",
    composition:
      "Drawer and Nav are assembled in the markup, title and close button in the panel's first row, and the example holds the open state only so the trigger can say it.",
    accessible:
      "The button says Menu in words and reports the panel with aria-expanded; the panel is named by its title, the nav inside by Primary, the close button by hidden text beside its icon, and the current page by aria-current.",
  },
  tags: ["hamburger", "drawer", "off-canvas", "mobile menu"],
  order: 4,
};
