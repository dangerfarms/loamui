import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Input with tooltip",
  description:
    "A plot reference box with an information icon in its end section that opens a tooltip on hover and on keyboard focus, saying where the reference is printed.",
  category: "forms",
  uses: ["Field", "Input", "Tooltip"],
  notes: {
    native:
      "The trigger is a real button, so it is in the tab order and the tooltip opens on focus as well as hover; the bubble is a popover in the top layer where the browser has anchor positioning, and a wrapper-anchored span elsewhere.",
    modern:
      "The button's 24px target comes from padding pulled back by an equal negative margin, so the box keeps the derived control height it shares with buttons; the icon is sized in em from the box's type.",
    composition:
      "Tooltip.Root, Trigger, Popup and Arrow inside the Input's endSection, the one adornment slot core keeps; the trigger is substituted through render, because a core Button's padding belongs beside a box, not in it.",
    accessible:
      "The tooltip holds a hint, not the requirement: the label names the field and it works without the bubble, since hover is unavailable on touch. The button is named by hidden text and described by the bubble through aria-describedby, so a screen reader hears the hint on reaching the button; Escape dismisses the bubble without moving focus.",
  },
  tags: ["tooltip", "help", "hint", "info", "input", "icon button"],
  order: 18,
};
