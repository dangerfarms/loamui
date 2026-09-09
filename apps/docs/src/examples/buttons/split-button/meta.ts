import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Split button",
  description:
    "Add to basket with a chevron beside it that opens the other ways to add: one group with a shared edge, every choice a real submit of the same form.",
  category: "buttons",
  uses: ["Button", "Menu"],
  notes: {
    native:
      "One form: the main button submits it, and each menu item is a submit button with its own name and value, so the server learns which way was chosen and nothing needs JavaScript to post. The menu is a native popover with light dismiss and Escape.",
    modern:
      "The shared edge is --loam-button-radius, the public hook Button reads, set on the group for the trigger and on the main cell for its button; :dir(rtl) swaps the two values because border-radius is physical, and a one-pixel negative margin lays the two borders on one line.",
    composition:
      "Button and Menu.Root, Trigger, Popup and Item as core ships them; the items substitute submit buttons through render, and the primary look comes from the form being a primary region, not from a prop on either button.",
    accessible:
      "The main button is named for its action and the trigger for its purpose, More ways to add, by hidden words beside the chevron, with aria-haspopup so the menu is expected; the arrows open and move through the items, and choosing one submits. The two are separate tab stops, so a keyboard user can take the main action without opening the menu.",
  },
  tags: ["split button", "menu", "basket", "actions", "group", "dropdown"],
  order: 5,
};
