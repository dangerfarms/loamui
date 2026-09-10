import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Simple header",
  description:
    "A site header: the brand, a row of primary links with the current page marked, and one action at the end.",
  category: "navigation",
  uses: ["Nav", "SignpostLink"],
  notes: {
    native:
      "A header landmark holding a nav landmark named Primary; the brand is a plain link home, and going somewhere is a SignpostLink rather than a Button dressed as one.",
    modern:
      "The header is a container: the nav shares the row where there is room and drops beneath the brand and the action where there is not, decided by the header's own width.",
    composition:
      "Nav is core's, with its own scope; the header asks two things of it, a flex row on the List and its public --loam-nav-current-edge on the Root, and places the nav from a scope of its own rather than reaching through the donut to a link.",
    accessible:
      "The current page is marked by aria-current on the link, and the stylesheet draws the marker from that attribute, a line under the link and weight, so a router and a static site say it the same way.",
  },
  tags: ["site header", "top bar", "navbar", "brand"],
  order: 1,
};
