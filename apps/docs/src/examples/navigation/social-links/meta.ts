import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Social links",
  description:
    "A row of icon-only links to the co-op's profiles, each named by text that is read but not seen.",
  category: "navigation",
  uses: [],
  notes: {
    native:
      'A nav landmark named Social around a list of plain links; each link carries rel="me", the identity relation that says the profile is the site\'s own.',
    modern:
      "The icon is sized in em, so it follows whatever type surrounds the row, and every target is floored at 24px with a gap between neighbours, whatever size that makes the glyph.",
    composition:
      "Element styles alone: an anchor, an inline svg and core's .loam-VisuallyHidden are the whole recipe, so no component is imported.",
    accessible:
      "The name is real text hidden by .loam-VisuallyHidden, not an aria-label: it translates, it shows in reader mode, and the svg is aria-hidden so the name is heard once.",
  },
  tags: ["social", "icons", "profiles", "footer"],
  order: 8,
};
