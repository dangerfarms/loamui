"use client";

import { Badge, SignpostLink } from "@loamui/core";
import { Hero } from "@loamui/ui";
import type { Composition } from "./types";

const hero: Composition = {
  slug: "hero",
  name: "Hero",
  category: "Page sections",
  description:
    "A page-opening section: eyebrow, title, lede, a row of actions and, when the page has one, media beside them.",
  lead: "Five parts on a native section. The type comes from the element styles and the fluid scale, so the hero reads the same in a marketing page and a dashboard header; a --loam-context region recolours the badge and the signpost inside. Media is optional: with it the hero becomes two columns where the container has room, and the container decides, not a prop.",
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
      description: "The headline. An h1 by default; pass render={<h2 />} inside a page.",
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
    {
      name: "Hero.Media",
      description:
        "Optional. What the page opens with: an image, a video, a Carousel. With it the hero is two columns where there is room and stacks where there is not.",
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
    {
      title: "With media",
      description:
        "Add Hero.Media and the hero becomes two columns where the container is wide enough; narrow it and the media stacks beneath. Nothing was configured: the container decided.",
      code: `<Hero.Root>
  <Hero.Eyebrow>
    <Badge>Case study</Badge>
  </Hero.Eyebrow>
  <Hero.Title render={<h2 />}>A bespoke design system in a week.</Hero.Title>
  <Hero.Lede>How a two-person studio shipped a themed product on three primitives.</Hero.Lede>
  <Hero.Actions>
    <SignpostLink href="/case-studies/studio">Read the story</SignpostLink>
  </Hero.Actions>
  <Hero.Media>
    <img src="https://picsum.photos/seed/loam-hero/1200/800" alt="A desk with printed component sheets pinned above it" width="1200" height="800" />
  </Hero.Media>
</Hero.Root>`,
      render: () => (
        <Hero.Root>
          <Hero.Eyebrow>
            <Badge>Case study</Badge>
          </Hero.Eyebrow>
          <Hero.Title render={<h2 />}>A bespoke design system in a week.</Hero.Title>
          <Hero.Lede>
            How a two-person studio shipped a themed product on three primitives.
          </Hero.Lede>
          <Hero.Actions>
            <SignpostLink href="/case-studies/studio">Read the story</SignpostLink>
          </Hero.Actions>
          <Hero.Media>
            <img
              src="https://picsum.photos/seed/loam-hero/1200/800"
              alt="A desk with printed component sheets pinned above it"
              width="1200"
              height="800"
            />
          </Hero.Media>
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
    "As a container for a form; that is a ContactForm or a SignInForm. A Carousel of images belongs inside Hero.Media, not around the hero.",
  ],
};

export default hero;
