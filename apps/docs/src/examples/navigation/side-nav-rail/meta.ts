import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Side nav rail with tooltips",
  description:
    "A narrow rail of icon-only links, each named by text that is read but not seen and shown in a tooltip on hover and on keyboard focus.",
  category: "navigation",
  uses: ["Nav", "Tooltip"],
  notes: {
    native:
      "Real anchors in a nav landmark named Nursery, each named by hidden text beside its icon rather than a title attribute, so the name is there for a screen reader, a search and a touch screen where hover never happens.",
    modern:
      "The bubble is a native popover tethered by anchor positioning; side=\"right\" is written with logical insets in Tooltip's stylesheet, so the bubble sits at the inline end and moves to the other side under right-to-left; the square is Nav's public --loam-nav-link-size, declared once on the rail and inherited by every line.",
    composition:
      "The rail is a Nav: Root, List and Items, with each Tooltip.Trigger rendered as a Nav.Link, so one anchor is the link, the trigger and the bubble's anchor at once. Nav sets its lines from the link itself rather than from the landmark, so a link inside the Tooltip's own wrapper is still one of Nav's lines, and the example draws nothing by hand: it sizes the square, sizes its icon and makes the wrapper a block.",
    accessible:
      "The tooltip opens on keyboard focus as well as hover, stays while hovered, and closes on Escape without moving focus; it describes the link, whose name is the hidden text, so nothing depends on the bubble; the current page carries aria-current and Nav marks it by a line and weight as well as a background.",
  },
  tags: ["sidebar", "rail", "icons", "tooltip", "compact"],
  order: 12,
};
