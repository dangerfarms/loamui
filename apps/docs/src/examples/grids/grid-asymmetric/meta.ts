import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Asymmetric grid",
  description:
    "A 2:1 grid: a tall lead card with a photograph in the wide column and two cards stacked beside it, all in one column when narrow.",
  whenToUse:
    "Use to give one item prominence beside two supporting items while preserving reading order. Choose Subgrid rows when equal items need their content aligned.",
  category: "grids",
  uses: ["Card", "SignpostLink"],
  notes: {
    native:
      "A list of three articles, each named by its own h3, so the grid is a list to a screen reader and each card a named piece; no wrapper element exists only to be a column.",
    modern:
      "An outer region is the named container and the list is the grid: two columns at 2:1 from 44rem of its own width with the lead spanning both rows, so the stacked pair's height is the lead's, and one column in source order below that.",
    composition:
      "Card is rendered as each article through its render prop; the example arranges the column inside, the SignpostLink is past the donut, and the Card's padding and line are left alone.",
    accessible:
      "The photograph carries real alt text because a picture of the orchard is what the lead is about; the actions are links because each goes somewhere, and every card's action sits at its foot so the eye finds it in the same place three times.",
  },
  tags: ["grid", "layout", "cards", "lead", "columns"],
  order: 1,
};
