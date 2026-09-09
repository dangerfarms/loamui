import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Header with menus",
  description:
    "A site header whose primary row mixes plain links with two menus, Learn and Support, that drop down lists of pages; a sign-in link and a signpost to join sit at the end.",
  category: "navigation",
  uses: ["Menu", "Nav", "SignpostLink"],
  notes: {
    native:
      "Every item in the two menus is an anchor with an href, and a menu opens on click, Enter or an arrow key rather than on hover alone, so a keyboard, a touch screen and a pointer all reach the same pages; going somewhere is a link or a SignpostLink, never a Button.",
    modern:
      "One flex row that reflows by the header's own width, the nav dropping to a row of its own where the header is narrow; each popup tethers to its trigger by anchor positioning in the top layer where the browser has it.",
    composition:
      "Each Menu sits in a Nav.Item with its trigger substituted through render for a bare button dressed as the links beside it, so the row reads as one nav while the popups, their keys and their dismissal stay Menu's.",
    accessible:
      "A trigger reports its state with aria-expanded and the chevron turns from that same attribute; inside a menu, arrow keys, typeahead, Escape and focus return are Menu's own, and the current page carries aria-current on its link.",
  },
  tags: ["site header", "dropdown", "menu", "navbar", "primary nav"],
  order: 15,
};
