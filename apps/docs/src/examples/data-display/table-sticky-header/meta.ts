import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Table with a sticky header",
  description:
    "Twelve lines of seed stock in a Table inside a scroller of fixed height, the column headers staying in view as the rows pass under them.",
  category: "data-display",
  uses: ["Table"],
  notes: {
    native:
      "A real table with a caption and row headers; the header sticks with position: sticky on the header cells themselves, which is what the platform provides, so nothing is cloned or measured.",
    modern:
      "The Table is capped in block-size with overscroll contained, so a wheel at its end does not carry the page away; the header's rule is a box-shadow, because a collapsed border does not travel with a sticky cell.",
    composition:
      "The Table's own element is the scroller, so the example caps its height there rather than wrapping it: a sticky header sticks to the nearest scrollport, and a wrapper of its own would carry the header away with the rows; the edge round it is the example's div.",
    accessible:
      "A scroller that only a pointer can move is out of reach of a keyboard, so the Table is declared a region named by its caption with a tab stop, which is what the Table would measure for itself once it overflows, and the focus ring marks it.",
  },
  tags: ["table", "sticky", "scroll", "stock", "inventory", "long list"],
  order: 16,
};
