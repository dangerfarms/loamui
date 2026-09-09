import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Footer with social links",
  description:
    "A site footer in two rows: the brand and a line about the co-op at the start with its social profiles as icons at the end, then the small print and the legal links beneath a lighter line.",
  category: "navigation",
  uses: [],
  notes: {
    native:
      'A footer landmark holding two nav landmarks, Social and Legal, so a landmark list names each; every social link carries rel="me", the identity relation that says the profile is the site\'s own.',
    modern:
      "Two flex rows that put their ends apart where there is room and wrap where there is not, decided by the footer's own width; the icons are sized in em so they follow the footer's small type.",
    composition:
      "Element styles alone: anchors, lists, an svg each and core's .loam-VisuallyHidden are the whole recipe, so nothing is imported.",
    accessible:
      "Each icon link is named by real text hidden by .loam-VisuallyHidden, not an aria-label, with the svg aria-hidden so the name is heard once, and every target is floored at 24px with a gap between neighbours.",
  },
  tags: ["site footer", "social", "icons", "legal", "copyright"],
  order: 19,
};
