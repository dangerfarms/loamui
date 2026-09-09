import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Side nav with two sections",
  description:
    "Vertical navigation for an application in two lists: the main pages at the top and, pinned to the foot of the column, settings and a sign-out that posts a form.",
  category: "navigation",
  uses: ["Nav"],
  notes: {
    native:
      'Sign out is a submit button in a method="post" form, because ending a session changes state on the server; it is rendered through Nav.Link so it sits in the list as a line like the others, and the other five are real anchors.',
    modern:
      "The Nav's title and two lists are three grid rows, the middle one 1fr, so the account list sits at the block end however tall the column is; nothing is positioned, and the separator is a border on the second list.",
    composition:
      "Two Lists in one Root: Nav has no footer part, because a second List and a row track are all the pinning needs; the example places the Nav from a scope of its own and never reaches inside a link.",
    accessible:
      "One landmark named Nursery holds both lists, so a reader finds settings and sign out under the same name; the current page carries aria-current and the sign-out button keeps its own semantics inside the list.",
  },
  tags: ["sidebar", "app shell", "vertical nav", "sign out", "settings"],
  order: 10,
};
