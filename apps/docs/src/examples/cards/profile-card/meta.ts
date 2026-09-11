import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Profile card",
  description:
    "One member on a card: their picture over their name and role, three figures about them, and a Follow toggle that updates the displayed follower count.",
  whenToUse:
    "Use to introduce one person with labelled statistics and a follow action. Connect the local demonstration state to your application before shipping.",
  category: "cards",
  uses: ["Avatar", "Button", "Card"],
  integration:
    "Follow is a local toggle for this demonstration. In an account-based application, load the initial relationship and persist changes through your follow service, including pending and failure states.",
  notes: {
    native:
      "The card is an article named by its heading, and the figures are a description list of three pairs, so the markup reads label then value while the screen shows value over label.",
    modern:
      "The avatar's size is Avatar's public --loam-avatar-size, set on the card and inherited, and the figures are set in tabular lining numerals so the three line up.",
    composition:
      "Card is the surface, rendered as the article; the example arranges the column inside it and never touches the Card's own border, radius or padding.",
    context:
      "The action row is a primary region, so the one Button takes the brand colour from where it sits, and the grid region stretches it to the card's width without a prop; primary is the brand slot, neutral until a theme fills it.",
    accessible:
      "The Avatar is hidden because the name is printed beneath it, so a screen reader hears the person once; the figures carry their labels in the markup, not in a tooltip.",
  },
  tags: ["profile", "member", "avatar", "stats", "follow"],
  order: 2,
};
