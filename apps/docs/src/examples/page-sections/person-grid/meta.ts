import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Person grid",
  description:
    "Four people under a section header, each an avatar, a name and a role in a centred column.",
  category: "page-sections",
  uses: ["Avatar"],
  notes: {
    native:
      "A section named by its h2, a header for the intro and a list of four items whose names are h3 headings, so the outline lists the people.",
    modern:
      "An auto-fit grid answering the section's own width, and the Avatar sized through its public --loam-avatar-size on the list item rather than a rule inside it.",
    composition:
      "Avatar is dropped in first in each item, taking its initials from the name; the example writes the column around it and stops at its root.",
    accessible:
      "Each Avatar is aria-hidden because the name is printed beneath it, so a screen reader hears each person once, and the ul carries role=list in the markup because the markers are gone.",
  },
  tags: ["team", "people", "about", "growers", "staff"],
  order: 20,
};
