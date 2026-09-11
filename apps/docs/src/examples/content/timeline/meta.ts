import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Timeline",
  description:
    "Five dated events in order, each with a marker, a date, a title and a line, joined by a hairline.",
  whenToUse:
    "Use for dated events in chronological order. Choose the Stepper component for progress through a task rather than adapting this history layout.",
  category: "content",
  uses: [],
  notes: {
    native:
      "An ol carries the order and a time element carries each date with its machine-readable value; the dots and the line are pseudo-elements, so nothing decorative is in the accessibility tree.",
    modern:
      "Each event is a grid with named areas, the dot centred on the date's line with lh, and the connector run across the list's gap with a negative margin rather than absolute positioning.",
    composition:
      "Element styles alone: an ordered list, headings, paragraphs and time, so no component is imported and no Stepper is bent into a history.",
    accessible:
      "The list keeps role=list so its count survives list-style: none, and in forced colours the dot keeps an outline and the connector its ink where the fills would vanish.",
  },
  tags: ["history", "events", "dates", "changelog", "milestones"],
  order: 19,
};
