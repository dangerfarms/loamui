import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Product card",
  description:
    "One product in a listing: a picture, a linked name, its rating and review count, a reduced price with the old one struck through, and one action.",
  category: "commerce",
  uses: ["Badge", "Button", "Card", "Price", "Rating"],
  notes: {
    native:
      "The Card is rendered as an article named by its heading, the old price is an s element, and each price is a data element whose value is the number for machines.",
    modern:
      "A flex column with the action's auto margin taking the slack, so every button in a row of cards lands at the same foot; the picture is cropped square by aspect-ratio and object-fit.",
    composition:
      "Card, Rating, Price, Badge and Button are used as they come; the Rating takes the row's small type and the Prices take the paragraph's, since neither sizes itself.",
    context:
      "The offer sits in a success region and the action in a primary one, so the Badge and the Button take their colours from where they are, not from a prop.",
    accessible:
      'The name is the link and the card is not; the reduction is read as "Was £3.50 Now £2.80" through hidden words rather than left to the strike; the button\'s name is "Add Sweet pea ‘Cupani’ seeds to basket", so a listing of buttons tells them apart.',
  },
  tags: ["shop", "listing", "price", "sale", "add to basket"],
  order: 1,
};
