import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Mini basket",
  description:
    "A basket button with a count that opens a Drawer holding the lines, an order summary and the way to checkout.",
  category: "commerce",
  uses: ["Badge", "Button", "Drawer", "Field", "Price", "QuantityInput", "SignpostLink"],
  notes: {
    native:
      "The panel is a native dialog opened with showModal(), so the top layer, focus containment, Escape and focus return come from the browser; the summary is a description list and going to checkout is a link.",
    modern:
      "The panel's width is one custom property set on the root, which the dialog inherits from its place in the DOM even though it paints in the top layer; no rule reaches past the Drawer's donut, so the basket's parts open their own scope inside it.",
    composition:
      "Drawer's parts, a Field around each QuantityInput, Prices, Badge and SignpostLink are arranged in the example's own markup; the two lines are the Cart Line example folded for a narrow panel.",
    accessible:
      'The trigger is named "Basket 2 items" through hidden text after the count, the close button is icon-only but named "Close basket", every quantity and remove control names its product, and the dialog is named by its title.',
  },
  tags: ["cart", "drawer", "checkout", "side panel", "basket"],
  order: 4,
};
