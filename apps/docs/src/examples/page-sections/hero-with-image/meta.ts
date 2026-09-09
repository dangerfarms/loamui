import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Hero with image",
  description:
    "A page-opening section: an eyebrow, a headline, a lede and two actions beside a photograph.",
  category: "page-sections",
  uses: ["Badge", "Button", "SignpostLink"],
  notes: {
    native:
      "A section named by its own heading, an h1 because a hero opens the page; the type is the element styles' own.",
    modern:
      "The hero is a container: two columns where it has room, one where it has not, decided by its own width rather than the viewport.",
    composition:
      "Three components, three jobs: Badge marks the season, SignpostLink goes to the catalogue and Button starts the video, with the play glyph a child the Button detects and sizes.",
    context:
      "The eyebrow declares --loam-context: primary, so the Badge inside takes the brand colour without a prop.",
    accessible:
      "Going somewhere is a SignpostLink and doing something is a Button; the photograph carries real alt text.",
  },
  tags: ["landing", "marketing", "banner"],
  order: 1,
};
