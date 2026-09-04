"use client";

import { Badge, SignpostLink } from "@loamui/core";
import { Hero } from "@loamui/ui";
import type { Composition } from "./types";

const hero: Composition = {
  slug: "hero",
  name: "Hero",
  category: "Page sections",
  description: "A page-opening section: eyebrow, title, lede and a row of actions.",
  lead: "Four parts on a native section. The type comes from the element styles and the fluid scale, so the hero reads the same in a marketing page and a dashboard header; a --loam-context region recolours the badge and the signpost inside.",
  importLine: `import { Hero } from "@loamui/ui";`,
  parts: [
    {
      name: "Hero.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the hero's width.",
    },
    {
      name: "Hero.Eyebrow",
      description: "A short line above the title: a Badge, a category, a date.",
    },
    {
      name: "Hero.Title",
      description: 'The headline. An h1 by default; pass render="h2" inside a page.',
    },
    {
      name: "Hero.Lede",
      description: "One paragraph that says what the page is for, capped at a readable measure.",
    },
    {
      name: "Hero.Actions",
      description:
        "A wrapping flex row: a SignpostLink for the primary path, plain links beside it.",
    },
  ],
  demos: [
    {
      title: "Landing page",
      code: `<Hero.Root>
  <Hero.Eyebrow>
    <span style={{ "--loam-context": "primary" }}>
      <Badge>New</Badge>
    </span>
  </Hero.Eyebrow>
  <Hero.Title>Modern UI primitives for agent-assisted developers.</Hero.Title>
  <Hero.Lede>
    Three primitives your agent builds from, steeped in UX best practice and checked by
    deterministic gates.
  </Hero.Lede>
  <Hero.Actions>
    <SignpostLink href="/docs">Get started</SignpostLink>
    <a href="https://github.com/dangerfarms/loamui">Star on GitHub</a>
  </Hero.Actions>
</Hero.Root>`,
      render: () => (
        <Hero.Root>
          <Hero.Eyebrow>
            <span style={{ "--loam-context": "primary" } as React.CSSProperties}>
              <Badge>New</Badge>
            </span>
          </Hero.Eyebrow>
          <Hero.Title>Modern UI primitives for agent-assisted developers.</Hero.Title>
          <Hero.Lede>
            Three primitives your agent builds from, steeped in UX best practice and checked by
            deterministic gates.
          </Hero.Lede>
          <Hero.Actions>
            <SignpostLink href="/docs">Get started</SignpostLink>
            <a href="https://github.com/dangerfarms/loamui">Star on GitHub</a>
          </Hero.Actions>
        </Hero.Root>
      ),
    },
  ],
  whenToUse: [
    "The first thing on a page, when the page has one job the visitor should understand at a glance.",
    "A section opener inside a long page, with the title rendered as an h2.",
  ],
  whenNotToUse: [
    "Above content that is already self-explanatory: a settings page needs a heading, not a hero.",
    "As a container for a form or a carousel; those are their own compositions.",
  ],
};

export default hero;
