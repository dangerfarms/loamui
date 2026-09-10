import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Banner with image",
  description:
    "A promotional banner: a photograph on one side and, on the other, an offer with its closing date as a Badge, a line and one place to go.",
  category: "page-sections",
  uses: ["Badge", "SignpostLink"],
  notes: {
    native:
      "A section named by its h2 with the photograph as an img carrying real alt text, because a picture of the trees on offer is content, not decoration.",
    modern:
      "The section is the container and the grid: one column with the picture on top, then a 2:3 split at 44rem of its own width where the picture grows to the height of the words and is cropped rather than letterboxed.",
    composition:
      "No Card: a Card pads every side and the picture runs to the edge, so the section paints its own surface and line from the same tokens; Badge and SignpostLink are dropped in as they come.",
    context:
      "The eyebrow declares --loam-context: warning, so the Badge with the closing date takes the warning colour without a prop: a deadline is a deadline, not a brand mark.",
    accessible:
      "Going somewhere is a SignpostLink, the closing date is in words as well as colour, and the surface keeps its own border, so forced colours have an edge to keep.",
  },
  tags: ["promotion", "offer", "sale", "banner", "photo"],
  order: 29,
};
