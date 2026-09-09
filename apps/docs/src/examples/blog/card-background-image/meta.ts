import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Card over a background image",
  description:
    "An article teaser laid over a photo: a category Badge, the title, a line and a Read article link on a scrim that keeps the words readable whatever the picture.",
  category: "blog",
  uses: ["Badge", "Card", "SignpostLink"],
  notes: {
    native:
      "The picture is an img in the markup, not a CSS background, so it lazy-loads, prints and is swapped like any image; the Card is an article named by its heading.",
    modern:
      "The Card sets color-scheme: dark, so every light-dark() token inside resolves to its dark answer whatever the page's scheme: light words over a scrim mixed from the dark background token, with no second palette written for the card.",
    composition:
      "The photo and the scrim are laid under the Card's padding box with position rather than by removing the Card's padding, so core's surface, line, radius and padding stay untouched; Badge and SignpostLink take the dark scheme as they come.",
    context:
      "The dark scheme is declared once on the Card and the Badge, the link and the text all answer it; the same Card in a light region needs no props changed.",
    accessible:
      "The scrim is heaviest where the words are, and in forced colours, which keep photographs but drop painted backgrounds, both the scrim and the photo are hidden so the words sit on the canvas.",
  },
  tags: ["teaser", "hero card", "overlay", "scrim", "image card"],
  order: 9,
};
