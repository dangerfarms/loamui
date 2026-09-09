import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Banner",
  description: "A one-line announcement bar for the top of a page: a message and a link beside it.",
  category: "page-sections",
  uses: [],
  notes: {
    native:
      "A div with no role, because a bar that is in the page from the first paint is content; only a bar a script injects later is news and would take role status.",
    modern:
      "A wrapping flex row: the paragraph takes the slack with a basis of 24ch, and the link keeps its width and drops beneath when the bar is narrower than both.",
    composition:
      "Element styles alone: a paragraph and a link on the subtle background, so no component is imported.",
    accessible:
      "Going somewhere is a link, not a button, and in forced colours the bar keeps a border on every side where its tint would otherwise vanish.",
  },
  tags: ["announcement", "notice", "top bar"],
  order: 5,
};
