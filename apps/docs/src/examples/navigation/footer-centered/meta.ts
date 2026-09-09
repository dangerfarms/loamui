import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Centred footer",
  description:
    "A site footer on the centre line: the brand, a row of links beneath it, and the small print last.",
  category: "navigation",
  uses: [],
  notes: {
    native:
      "A footer landmark holding one nav landmark named Footer, so a landmark list tells it apart from the header's Primary nav; the copyright and registration are a small element, which is what small is for.",
    modern:
      "A grid with its items centred and a flex row that wraps from the middle out, so a long list of links folds into even lines on a narrow screen without a breakpoint.",
    composition:
      "Element styles alone carry it: a link, a list and a small element need no component, so nothing is imported.",
    accessible:
      "The markers are stripped inside a nav, where every browser keeps the list's semantics, and the links inherit the muted colour rather than the link blue so the row reads as one line, underlining on hover.",
  },
  tags: ["site footer", "centred", "copyright", "small print"],
  order: 18,
};
