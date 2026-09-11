import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Subgrid rows",
  description:
    "Three cards whose heading, description and action rows line up across the grid, whatever the length of the words, through grid-template-rows: subgrid.",
  whenToUse:
    "Use when cards with different amounts of text need aligned headings, descriptions and actions. Choose Asymmetric grid when one item should lead.",
  category: "grids",
  uses: ["Card", "SignpostLink"],
  notes: {
    native:
      "A list of three items, each a card named by its h3, so the row of workshops is a list to a screen reader and each card says what it is.",
    modern:
      "The list is the grid and each card spans three of its rows with grid-template-rows: subgrid, so the tallest description sets the row for all three and every action lands on one line without a fixed height or a JavaScript measure.",
    composition:
      "Card is rendered as the list item through its render prop, which is what lets the Card be the grid item that subgrids; the SignpostLink inside is past the donut and the Card's padding becomes the gutter of its tracks.",
    accessible:
      "The date is set in the strong primary token, the pair the audit checks as text, and the action is a SignpostLink to the workshop’s booking page; each card’s link is in the same place three times.",
  },
  tags: ["grid", "subgrid", "layout", "cards", "align"],
  order: 3,
};
