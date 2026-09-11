import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Scheme toggle",
  description:
    "A three-way choice of colour scheme, System, Light or Dark, that sets data-theme on the root element and remembers the choice.",
  category: "forms",
  uses: ["SegmentedControl"],
  integration:
    "The control changes its whole document and remembers the choice under the color-scheme storage key. Use that same key in your application’s pre-paint theme script. The docs run this example in a separate document so its theme does not change the surrounding page.",
  notes: {
    native:
      "A native radio group in core's pill: the arrow keys move the choice, the legend names it, and choosing sets or removes data-theme on the root, which is the whole mechanism: color-scheme re-resolves and every light-dark() token follows.",
    modern:
      "No stylesheet of its own: the chosen segment, the focus ring and the forced-colours treatment are core's, and the theme change is one attribute the tokens already answer.",
    composition:
      "SegmentedControl.Root, Legend and Item as core ships them, with an icon and hidden words in each segment; the storage logic is the example's, in the same file, and drops into any page that reads the same key.",
    accessible:
      "The legend names the group and each segment carries its name in hidden text, so the icons are never the only label. Two toggles on one page and storage changes from another tab stay in step. The application can use a pre-paint script with the same storage key to prevent a flash of the wrong scheme.",
  },
  tags: ["theme", "dark mode", "colour scheme", "light-dark", "preference"],
  order: 11,
};
