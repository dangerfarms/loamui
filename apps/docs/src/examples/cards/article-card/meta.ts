import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Article card",
  description:
    "One article in a Card: a picture, a category and date, a linked title, its opening lines and the author at the foot.",
  whenToUse:
    "Use to preview one article with its date, author and reading destination. Choose Article carousel when readers need to browse a collection horizontally.",
  category: "cards",
  uses: ["Avatar", "Badge", "Card", "Time"],
  integration:
    "Replace the sample article and author destinations with real routes. Keep heading levels appropriate to the surrounding page. Replace the decorative illustration and its responsive sources together; supply alt text if the image adds information beyond the title.",
  notes: {
    native:
      'The Card is rendered as an article named by its own heading, the author sits in an address element with rel="author", and the date is a time with a machine-readable dateTime.',
    modern:
      "Layered, donut-scoped CSS preserves the Card surface. A measured inner column resolves fluid type and spacing locally; an auto margin aligns bylines in equal-height cards without truncating the description. Responsive, lazy images reserve their aspect ratio.",
    composition:
      "Card, Badge, Time and Avatar are used as they come; the example's rule stops at each root and only arranges the column between them.",
    accessible:
      "The title is the link and the card is not, so the link's name is the title alone; the picture illustrates the title, so its alt is empty; the avatar is hidden because the name is printed beside it.",
  },
  tags: ["post", "news", "teaser", "blog card"],
  order: 1,
};
