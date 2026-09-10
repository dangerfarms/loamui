import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Article card",
  description:
    "One article in a Card: a picture, a category and date, a linked title, its opening lines and the author at the foot.",
  category: "blog",
  uses: ["Avatar", "Badge", "Card", "Time"],
  notes: {
    native:
      'The Card is rendered as an article named by its own heading, the author sits in an address element with rel="author", and the date is a time with a machine-readable dateTime.',
    modern:
      "A flex column whose foot takes the slack with an auto margin, so in a row of cards the byline lands at the bottom of each; the description is clamped only where line-clamp exists.",
    composition:
      "Card, Badge, Time and Avatar are used as they come; the example's rule stops at each root and only arranges the column between them.",
    accessible:
      "The title is the link and the card is not, so the link's name is the title alone; the picture illustrates the title, so its alt is empty; the avatar is hidden because the name is printed beside it.",
  },
  tags: ["post", "news", "teaser", "blog card"],
  order: 1,
};
