import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Card with icon features",
  description:
    "A plant collection in a Card: a photo, a title with a Badge saying it is new, a description, what you get as an icon list, the Price for the set, and a Button that adds it to the basket.",
  category: "app-cards",
  uses: ["Badge", "Button", "Card", "Price"],
  notes: {
    native:
      "The Card is an article named by its heading, the price is a data element whose value is the number for machines, and the features are a list named for what it lists.",
    modern:
      "The foot is a wrapping flex row, so the price and the Button share a line where there is room and stack where there is not; the icons are sized in em to the text beside them.",
    composition:
      "Price writes the amount and dresses the qualifier written as its child; Badge and Button come as they are, and the example only arranges the column between them.",
    context:
      "The flag is an info region, so the Badge takes the colour from where it sits, not from a prop; change the region to success for a sale and nothing else moves.",
    accessible:
      "The Button's name completes in hidden text to what it adds, so a page of these reads apart; the photo's alt says what is in it because the picture is the product; the icons are hidden because the words beside them already say it.",
  },
  tags: ["product", "shop", "features", "price", "plants"],
  order: 4,
};
