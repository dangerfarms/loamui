import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Side nav with segmented control",
  description:
    "Vertical navigation in two sections, Account and Shop, switched by a segmented control above the list; the page holds which is shown.",
  category: "navigation",
  uses: ["Nav", "SegmentedControl"],
  notes: {
    native:
      "The switch is a native radio group in a fieldset, so the arrow keys move between Account and Shop as they do on any radios, and the chosen segment is drawn from the radio's own :checked.",
    modern:
      "The pill is core's, stretched across the column by two declarations from the example's own scope; the chosen state moves to the system highlight under forced colours in SegmentedControl's stylesheet, not here.",
    composition:
      "SegmentedControl reports the choice through onValueChange and the example keeps it in state and maps it to a list of links; Nav renders whichever list it is given and knows nothing of the switch.",
    accessible:
      "The radio group is named Section by a legend that is read but not seen, the nav is named for the section it shows so a landmark list says which, and the current page stays marked in the Account list where it lives.",
  },
  tags: ["sidebar", "segmented control", "radio", "sections", "switch"],
  order: 14,
};
