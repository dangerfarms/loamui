import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "FAQ with page header",
  description:
    "A help page: a header with the ways to reach a person and the hours they keep, then five questions as one exclusive set of disclosures.",
  category: "faq",
  uses: ["Details"],
  notes: {
    native:
      "A section named by its h1, because this opens a page; the ways to reach us are an address element with mailto and tel links, and each question is a details element sharing one name.",
    modern:
      "The section is the container: at 44rem of its own width the header becomes two columns and the contact block sits beside the intro at its own width, ending at the header's end edge in either writing direction.",
    composition:
      "Five Details and no other component: the header is the example's own markup, an intro beside an address that holds a list of links and the opening hours.",
    accessible:
      "The contact block comes before the questions so the way to a person is not hidden below five closed answers; the glyphs are aria-hidden beside links that say what they are, and the tint gets a border in forced colours.",
  },
  tags: ["faq", "help", "support", "contact", "page header"],
  order: 4,
};
