import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Subgrid rows",
  description:
    "Three cards whose heading, description and action rows line up across the grid, whatever the length of the words, through grid-template-rows: subgrid.",
  whenToUse:
    "Use when cards with different amounts of text need aligned headings, descriptions and actions. Choose Asymmetric grid when one item should lead.",
  category: "grids",
  uses: ["Card", "SignpostLink"],
  integration:
    "Replace the sample workshops and booking destinations, including the dates and local times. State the venue and time zone in the surrounding event information. Use heading levels appropriate to that page.",
  notes: {
    native:
      "A list of three items, each a card named by its h3, so the row of workshops is a list to a screen reader and each card says what it is.",
    modern:
      "A measuring wrapper contains an intrinsic grid. Each Card spans three parent rows and inherits them with subgrid, including the shared row gaps. The three content regions measure their own text; the subgrid itself has no size containment, which would break row sharing. No fixed heights or JavaScript measurements are needed.",
    composition:
      "Card is rendered as the list item through its render prop, which is what lets the Card be the grid item that subgrids; the SignpostLink inside is past the donut and the Card's padding becomes the gutter of its tracks.",
    accessible:
      "Workshops have named list items, dates with machine-readable local date-times and booking links that include the workshop title in their accessible names. Source order stays heading, description, then action as the grid reflows.",
  },
  tags: ["grid", "subgrid", "layout", "cards", "align"],
  order: 3,
};
