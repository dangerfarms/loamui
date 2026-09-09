import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Section header",
  description:
    "The intro a section opens with: an eyebrow, a heading, a line of description and an action beside them when there is room.",
  category: "page-sections",
  uses: ["SignpostLink"],
  notes: {
    native:
      "A div, not a section: this is the top of a section you write, and the h2 carries an id for that section's aria-labelledby, so the landmark is yours and named by this heading.",
    modern:
      "The wrapper is the container and the inner element the grid; at 40rem of its own width the actions move into a second column through named areas, so a part left out leaves no hole.",
    composition: "One SignpostLink in the action row; the example's rule stops at its root.",
    accessible:
      "The eyebrow is set in the strong primary token, the pair the contrast audit checks as text, rather than the raw hue.",
  },
  tags: ["heading", "intro", "eyebrow", "section"],
  order: 7,
};
