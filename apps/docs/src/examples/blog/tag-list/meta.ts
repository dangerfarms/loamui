import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Tag list",
  description:
    "The topics attached to an article: a named list of Badges, each a link to everything that shares the tag, with the current one ringed.",
  category: "blog",
  uses: ["Badge"],
  notes: {
    native:
      'A ul of links, because a set of tags is a list and each tag goes somewhere; the current one carries aria-current="page", the platform\'s own word for it.',
    modern:
      "The list's markers go in CSS and its role is restored in the markup, and the ring on the current tag is drawn on the item with :has(), so the Badge itself is untouched.",
    composition:
      "A tag looks like a Badge because it is one: core's Badge rendered as an anchor through render, so a --loam-context region tints a tag list the way it tints any Badge.",
    accessible:
      'The list is named Tags so its count is announced before the first tag, each link\'s name is the tag text alone, and the current tag is marked by a ring as well as its attribute; nothing is truncated to a hidden "+3 more".',
  },
  tags: ["topics", "categories", "labels", "chips", "pills"],
  order: 7,
};
