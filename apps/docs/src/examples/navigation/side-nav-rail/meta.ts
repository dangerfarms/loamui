import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Side nav rail with tooltips",
  description:
    "A narrow rail of icon-only links, each named by text that is read but not seen and shown in a tooltip on hover and on keyboard focus.",
  category: "navigation",
  uses: ["Tooltip"],
  notes: {
    native:
      "Real anchors in a nav landmark, each named by hidden text beside its icon rather than a title attribute, so the name is there for a screen reader, a search and a touch screen where hover never happens.",
    modern:
      'The bubble is a native popover tethered by anchor positioning; side="right" is written with logical insets in Tooltip\'s stylesheet, so the bubble sits at the inline end and moves to the other side under right-to-left.',
    composition:
      "Tooltip.Trigger is rendered as the anchor, so one element is the link, the trigger and the bubble's anchor at once, and Tooltip.Provider around the rail lets a neighbour's bubble open at once after the first. Nav is left out: Tooltip.Root wraps each link in an element of its own that Nav's donut stops at, so a Nav.Link inside a tooltip would get none of Nav's rules, and the rail draws its squares itself from the tokens Nav uses.",
    accessible:
      "The tooltip opens on keyboard focus as well as hover, stays while hovered, and closes on Escape without moving focus; it describes the link, whose name is the hidden text, so nothing depends on the bubble; the current page carries aria-current.",
  },
  tags: ["sidebar", "rail", "icons", "tooltip", "compact"],
  order: 12,
};
