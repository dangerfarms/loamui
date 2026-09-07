"use client";

import type { CSSProperties } from "react";
import { TagList } from "@loamui/ui";
import type { Composition } from "./types";

const success = { "--loam-context": "success" } as CSSProperties;

const tagList: Composition = {
  slug: "tag-list",
  name: "Tag list",
  category: "Blog",
  description: "The topics attached to something, each a link to everything that shares it.",
  lead: "A tag looks like a Badge but is not one: a Badge is a span and never interactive, and a tag leads somewhere, so each tag is a link drawn as the same pill, named by its own text. The set is a ul named Tags, with role list restored because the markers are gone, so a screen reader announces the count before the first tag; the current tag on its own page is set heavier and underlined rather than told apart by colour; every target is floored at 24px; and long lists wrap rather than hiding tags behind a count, because a hidden tag is one the reader cannot follow.",
  importLine: `import { TagList } from "@loamui/ui";`,
  parts: [
    {
      name: "TagList.Root",
      description:
        'A ul with role list, named "Tags" unless you pass aria-label, or aria-labelledby pointing at a heading. Declares its own container and wraps its items.',
    },
    {
      name: "TagList.Item",
      description:
        "One tag: an li holding a link named by its text when it has an href, or a render for a router's link; a plain span in the same pill when it has neither. The props are the link's: rel, target and aria-current=\"page\" on the tag's own page land on the a, not the li.",
    },
  ],
  demos: [
    {
      title: "An article's tags",
      description:
        "Five links, each to the page listing everything with that tag. The list is announced as Tags with its count, and the row wraps where the container runs out of room.",
      code: `<TagList.Root>
  <TagList.Item href="/tags/css">CSS</TagList.Item>
  <TagList.Item href="/tags/accessibility">Accessibility</TagList.Item>
  <TagList.Item href="/tags/react">React</TagList.Item>
  <TagList.Item href="/tags/design-systems">Design systems</TagList.Item>
  <TagList.Item href="/tags/container-queries">Container queries</TagList.Item>
</TagList.Root>`,
      render: () => (
        <TagList.Root>
          <TagList.Item href="/tags/css">CSS</TagList.Item>
          <TagList.Item href="/tags/accessibility">Accessibility</TagList.Item>
          <TagList.Item href="/tags/react">React</TagList.Item>
          <TagList.Item href="/tags/design-systems">Design systems</TagList.Item>
          <TagList.Item href="/tags/container-queries">Container queries</TagList.Item>
        </TagList.Root>
      ),
    },
    {
      title: "With the current tag",
      description:
        'On the Accessibility tag\'s own page, that tag carries aria-current="page": heavier and underlined, so it reads as current without relying on colour, and still a link, since the page it points to is this one.',
      code: `<TagList.Root>
  <TagList.Item href="/tags/css">CSS</TagList.Item>
  <TagList.Item href="/tags/accessibility" aria-current="page">
    Accessibility
  </TagList.Item>
  <TagList.Item href="/tags/react">React</TagList.Item>
</TagList.Root>`,
      render: () => (
        <TagList.Root>
          <TagList.Item href="/tags/css">CSS</TagList.Item>
          <TagList.Item href="/tags/accessibility" aria-current="page">
            Accessibility
          </TagList.Item>
          <TagList.Item href="/tags/react">React</TagList.Item>
        </TagList.Root>
      ),
    },
    {
      title: "In a context",
      description:
        "Inside a success region the pills take the status colour through the same tint recipe as a Badge, links and plain tags alike. The last tag has no href and is plain text in the same pill.",
      code: `<div style={{ "--loam-context": "success" }}>
  <TagList.Root aria-label="Categories">
    <TagList.Item href="/categories/shipped">Shipped</TagList.Item>
    <TagList.Item href="/categories/stable">Stable</TagList.Item>
    <TagList.Item>Verified</TagList.Item>
  </TagList.Root>
</div>`,
      render: () => (
        <div style={success}>
          <TagList.Root aria-label="Categories">
            <TagList.Item href="/categories/shipped">Shipped</TagList.Item>
            <TagList.Item href="/categories/stable">Stable</TagList.Item>
            <TagList.Item>Verified</TagList.Item>
          </TagList.Root>
        </div>
      ),
    },
  ],
  whenToUse: [
    "The topics an article, a product or a project is filed under, each leading to the page that lists everything filed the same way.",
    "A row of categories at the head or foot of a post, where the reader might follow one to more of the same.",
  ],
  whenNotToUse: [
    "A single status such as Draft or New. That is a Badge, and a Badge is never a link.",
    "Filters the reader switches on and off. A control that toggles is a checkbox in a fieldset, not a link, however much it looks like a pill.",
  ],
};

export default tagList;
