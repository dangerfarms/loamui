import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Profile card",
  description:
    "One member on a card: initials, a name and role, three labelled figures, and a link to their profile.",
  whenToUse:
    "Use to introduce one person with labelled statistics and a clear destination for their full profile.",
  category: "cards",
  uses: ["Avatar", "Card", "SignpostLink"],
  integration:
    "Replace the sample person, figures and profile destination with application data. The link navigates to the profile; there is no simulated account relationship or persistence. If this card appears below a section heading, adjust its heading level accordingly.",
  notes: {
    native:
      "The card is an article named by its heading, and the figures are a description list of three pairs, so the markup reads label then value while the screen shows value over label.",
    modern:
      "A local inline-size container resolves the body’s fluid tokens. The statistics use an intrinsic grid that can wrap as available space changes. Avatar size comes from the public --loam-avatar-size hook.",
    composition:
      "Card is the surface, rendered as the article; the example arranges the column inside it and never touches the Card's own border, radius or padding.",
    context:
      "A profile has no status meaning, so it keeps the neutral surface and ordinary link treatment rather than inventing a primary or success region.",
    accessible:
      "The Avatar is hidden because the name is printed beneath it, so a screen reader hears the person once; the figures carry their labels in the markup, not in a tooltip.",
  },
  tags: ["profile", "member", "avatar", "stats"],
  order: 2,
};
