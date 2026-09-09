import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Header with mega menu",
  description:
    "A site header where Growing opens a wide panel: a grid of six guides with an icon, a title and a line each, and a strip at the foot pointing to the beginners' course.",
  category: "navigation",
  uses: ["Nav", "Popover", "SignpostLink"],
  notes: {
    native:
      "The panel is a native popover in the top layer, so light dismiss and Escape are the browser's, and every guide inside is a plain anchor; the panel opens on a press, not on hover, so a keyboard and a touch screen open the same thing.",
    modern:
      "The panel takes its width from Popover's public --loam-popover-size and the guides fill it with auto-fill columns, so two sit side by side where there is room and one where there is not; the foot strip spans edge to edge by giving the popup's padding back.",
    composition:
      "Popover.Trigger is substituted through render for a bare button dressed as the links beside it, and the panel is Title, Description and the example's own grid: the popup's surface, tether and dismissal stay Popover's.",
    accessible:
      "The panel is a dialog named by its Title and described by its Description, its trigger reports aria-expanded and aria-haspopup, and each guide is named by its title and text together, so a screen reader hears what a link leads to before following it.",
  },
  tags: ["site header", "mega menu", "popover", "guides", "navbar"],
  order: 16,
};
