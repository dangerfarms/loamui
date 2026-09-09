import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Side nav with groups",
  description:
    "Vertical navigation for an admin area: a dashboard link, then four groups with an icon each that fold their pages away, the group holding the current page open on arrival.",
  category: "navigation",
  uses: ["Nav"],
  notes: {
    native:
      "Each group is a native details element, so it opens and closes before any script runs and its state is the browser's; the groups share no name, so two areas can stay open while an administrator works across them. Give them one name and the browser keeps a single group open instead.",
    modern:
      "The nested lists are indented through Nav's public --loam-nav-indent, computed from the icon's width and the gap after it, so the words of a nested link sit under the words of its group title rather than under the icon.",
    composition:
      "A Group is an Item holding a GroupTitle, with an svg before its words like any link, and a nested List; the icon is a detected child, sized on the text by Nav's own rule, not a slot.",
    accessible:
      "The group holding the current page is opened on arrival and its title takes the current weight; the chevron is drawn from two borders in the text colour, so forced colours keep it, and each icon is aria-hidden so a title is named by its words.",
  },
  tags: ["sidebar", "collapsible", "nested", "details", "admin", "icons"],
  order: 6,
};
