import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Pricing table",
  description:
    "Three membership tiers side by side, each a Card with its name, price, features and a button that chooses it, with the middle one recommended.",
  category: "commerce",
  uses: ["Badge", "Button", "Card", "Price"],
  notes: {
    native:
      "A list named Membership plans, one item per tier, each an article named by its own heading, so the page's articles list as Seedling, Grower, Plot-holder and the list announces how many there are.",
    modern:
      "The list is an auto-fit grid answering its own width: three across where there is room, fewer where there is not, and the tiers share a height so the buttons sit level across the row; the recommended tier's ring is an outline on the list item, rounded to the Card's radius so it hugs the surface.",
    composition:
      "One tier's markup is written three times from one array; Card is the surface and Badge, Price and Button are dropped in as they come, and the table only writes the grid around them.",
    context:
      "The recommended tier's list item declares --loam-context: primary, and the Badge, the name, the figure and the Button inside its Card all answer it; the other two declare nothing and stay neutral.",
    accessible:
      "Every button says which tier it chooses, so a row of three reads apart; an excluded feature is struck and prefixed by hidden words; and the recommendation is a ring on the item as well as the Badge's words, so it is told apart by shape and survives forced colours.",
  },
  tags: ["pricing", "tiers", "plans", "membership", "compare", "commerce"],
  order: 6,
};
