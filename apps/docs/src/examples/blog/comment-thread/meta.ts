import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Comment thread",
  description:
    "A comment with two replies: the replies are a named list inside the parent, stepped in once and marked by a rule.",
  category: "blog",
  uses: ["Avatar", "Badge", "Button", "Time"],
  notes: {
    native:
      "Replies are articles nested inside the article they answer, in a ul named for what it holds; the nesting is the thread's structure, not a data attribute.",
    modern:
      "The rule down the replies is a border, so forced colours keep it as CanvasText where a background paint would vanish; one grid rule styles the parent and every reply alike.",
    composition:
      "Each comment is the Comment example's markup, parent and reply alike; the author's reply carries a Badge in its byline the way any Badge is dropped into a row.",
    accessible:
      "Every article is named by its author, the replies list announces its count and whose replies they are, and every Reply button says who it replies to.",
  },
  tags: ["discussion", "replies", "nested", "conversation"],
  order: 6,
};
