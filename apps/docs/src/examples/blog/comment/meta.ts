import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Comment",
  description:
    "One comment: who wrote it, how long ago, what they said, and a row of actions that each say which comment they belong to.",
  category: "blog",
  uses: ["Avatar", "Button", "Time"],
  notes: {
    native:
      "A comment is an article, self-contained and syndicable, with a header for the byline; the time is a time element whose dateTime is the exact moment whatever the words say.",
    modern:
      "The article is its own container, so the Buttons in the actions row take their size from the comment's width rather than the page's.",
    composition:
      "Time writes the distance against a moment the page passes in, never the clock, so a render on the server and the render that hydrates it write the same words.",
    accessible:
      "The article is named by its author, so a list of the page's articles reads the names; each action's name is completed with real hidden text (\"Reply to Priya Natarajan\") rather than an aria-label, so it translates and shows in reader mode.",
  },
  tags: ["discussion", "reply", "thread", "review"],
  order: 5,
};
