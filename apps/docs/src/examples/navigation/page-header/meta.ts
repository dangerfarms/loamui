import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Page header",
  description:
    "The top of a page inside an application: where it sits, what it is, a line about it, a row of facts and the actions that act on the whole page.",
  category: "navigation",
  uses: ["Badge", "Breadcrumbs", "Button", "Time"],
  notes: {
    native:
      "A header named by the page's one h1 through aria-labelledby, so a landmark list says which page's header it is; the date is a time element with a machine-readable dateTime.",
    modern:
      "A two-column grid answered by the header's own width: the text is pinned to the first column and the actions flow beside it where there is room, beneath it where there is not.",
    composition:
      "Breadcrumbs, Badge, Time and Button are dropped in as they come, and the grid places the Breadcrumbs by flow rather than by reaching into their root.",
    context:
      "The status fact is a success region and Request seed sits in a primary one, so the Badge and the Button take their colours from where they sit without a prop between them; primary is the brand slot, neutral until a theme fills it, so the main action is told by its place, last in the row, not by colour.",
    accessible:
      "Breadcrumbs come first because where the page sits is read before what it is; the facts are a list, not headings; the actions come last, beside the title only visually.",
  },
  tags: ["breadcrumbs", "title", "actions", "app shell", "record"],
  order: 9,
};
