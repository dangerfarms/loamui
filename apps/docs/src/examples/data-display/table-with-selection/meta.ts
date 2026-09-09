import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Table with selection",
  description:
    "This week's orders as a Table with a Checkbox per row and one in the header that selects them all, the selected rows tinted and their count read out in a status line.",
  category: "data-display",
  uses: ["Checkbox", "Price", "Table", "Time"],
  notes: {
    native:
      "The boxes are native checkboxes, so Space toggles and a form would submit them; the header box is indeterminate when some rows are selected, which is the platform's own third state.",
    modern:
      "A selected row is detected with :has(input:checked) rather than declared with an attribute the page would have to keep in step; the figures are end-aligned in tabular numerals.",
    composition:
      "Checkbox.Control is the bare box, named by aria-label because there is no room for a visible label in the cell; the page holds the set of selected ids and derives all and some from it.",
    context:
      "The tint is the primary soft token, so a region around the table re-answers it; the box, not the tint, is what says selected.",
    accessible:
      "Each box is named for its row, Select order HW-1042, and the header's is Select all orders; the count of selected rows is a status region, so a reader hears it change without leaving the table.",
  },
  tags: ["table", "selection", "checkbox", "bulk", "orders", "select all"],
  order: 17,
};
