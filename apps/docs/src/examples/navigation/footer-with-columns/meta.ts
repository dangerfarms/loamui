import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Footer with columns",
  description:
    "A site footer: the brand and a line about it, three columns of links, and a row of small print.",
  category: "navigation",
  uses: [],
  notes: {
    native:
      "A footer landmark holding four nav landmarks, three named by their headings and the fourth Legal, so a screen reader's landmark list reads Shop, Grow, Co-op, Legal.",
    modern:
      "The columns are an auto-fit grid and the brand joins the row only where the footer's own width allows; no breakpoint names a device.",
    composition:
      "Element styles alone: links, headings and a small element carry the footer, so no component is imported.",
    accessible:
      "The markers are stripped inside a nav, where every browser keeps the list's semantics, and the legal links sit in the same row as the copyright they belong to, wrapping beneath it as one list rather than one link at a time.",
  },
  tags: ["site map", "legal", "small print"],
  order: 1,
};
