import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "FAQ with image",
  description:
    "Four questions as one exclusive set of disclosures beside an illustration, which drops below them when there is no room.",
  category: "faq",
  uses: ["Details"],
  notes: {
    native:
      "A section named by its h2 with a details element per question; the illustration is inline SVG in currentColor, so it needs no image file and takes the scheme with the words.",
    modern:
      "One column below 48rem of the section's own width with the picture ordered last, then a 1:2 split with the picture first and sticky at the top, so it keeps the questions company as they open.",
    composition:
      "The picture is the only thing added: an inline svg the grid places beside four Details that keep every rule core gives them.",
    accessible:
      "The illustration is aria-hidden and comes after the questions in source, so a screen reader and a narrow screen both meet the questions first; in forced colours the fills go to Canvas and the lines to CanvasText.",
  },
  tags: ["faq", "accordion", "questions", "illustration", "help"],
  order: 3,
};
