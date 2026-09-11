import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Image comparison",
  description:
    "Black-and-white and colour treatments of the same photograph in one frame, the second revealed by a Range the reader drags or moves with the arrow keys.",
  whenToUse:
    "Use to compare two views of the same subject with a labelled, keyboard-operable reveal control. Choose a gallery when the images are separate subjects.",
  category: "media",
  uses: ["Range"],
  notes: {
    native:
      "The handle is a real range input, so the comparison can be worked with a keyboard and is announced with a name and a value, not a pointer-only drag; the whole thing is a figure with a caption.",
    modern:
      "Before, after and the divider share one grid cell in DOM order, the top image is cut with clip-path from a custom property, and the physical inset flips under :dir(rtl) where the Range runs the other way.",
    composition:
      "Range is dropped in as it comes; the example holds the value in state and writes it onto the figure as a custom property the stylesheet reads.",
    accessible:
      "Both images carry real alt text describing what each shows, the fallback position of 50% shows half of each before any script runs, and the divider keeps its ink in forced colours.",
  },
  tags: ["before", "after", "slider", "reveal", "photos"],
  order: 13,
};
