import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "FAQ",
  description:
    "Four questions as one exclusive set of disclosures on a subtle surface, centred under a heading with room that grows with the section's width.",
  whenToUse:
    "Use for independent questions whose answers can be disclosed on demand. Keep information needed to complete the current task visible instead.",
  category: "content",
  uses: ["Details"],
  notes: {
    native:
      "A section named by its h2 with a header for the intro and a details element per question; the shared name makes them exclusive without a line of script.",
    modern:
      "The section paints the subtle surface and is its own container: the questions are capped at 44rem and centred, and the padding doubles at 48rem of the section's width, not the viewport's.",
    composition:
      "Four Details on one surface: the tint, the radius and the padding are the section's, and each question keeps the Details' own surface, line and chevron untouched.",
    context:
      "The block is a plain neutral surface, not a --loam-context region: questions carry no status, so nothing inside should take a status colour.",
    accessible:
      "The tint gets a border in forced colours so the block still reads as a block, and each Details keeps its own edge either way.",
  },
  tags: ["faq", "accordion", "questions", "surface", "help"],
  order: 2,
};
