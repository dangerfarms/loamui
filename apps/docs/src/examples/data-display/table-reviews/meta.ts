import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Table of reviews",
  description:
    "The most-grown varieties as a Table: a Rating and the review count per row, and a two-colour bar of how many would grow it again, with both shares written either side of it.",
  category: "data-display",
  uses: ["Rating", "Table"],
  notes: {
    native:
      "A real table with a caption, column headers and a row header per variety; each rating is a Rating in display mode, one named picture of the value rather than five decorative stars.",
    modern:
      "The split cell is a flex row with both figures at fixed widths in tabular numerals, so the bars line up down the column; the bar's fill is sized by the row in an inline style, the one number that is data.",
    composition:
      "Table rules the rows and the header and Rating draws the stars; the example adds only the split cell, and reaches into neither.",
    accessible:
      "The bar is hidden and the two shares are text that finishes in hidden words, so a reader hears 91% would, 9% would not; in forced colours the bar keeps an edge and its fill is painted in the text colour.",
  },
  tags: ["reviews", "ratings", "table", "distribution", "split bar", "would grow again"],
  order: 15,
};
