import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Logo wall",
  description:
    "Six stockists' marks in a row under a small heading, sized to one shared height so marks of any shape read as one set.",
  category: "page-sections",
  uses: [],
  notes: {
    native:
      "A section named by its heading and a list of six items, so a screen reader announces how many organisations there are before reading each one's name.",
    modern:
      "A wrapping flex row, not a grid: the marks differ in width, so each keeps its own ratio at one shared block-size and the row centres whatever fits.",
    composition: "Element styles alone: inline svg marks in a list, with no component imported.",
    accessible:
      "Each mark is an svg with role=img and the organisation's name as its label, never the word logo, and the list keeps role=list so the count survives list-style: none.",
  },
  tags: ["logos", "partners", "stockists", "clients", "trust"],
  order: 11,
};
