"use client";

import { Features } from "@loamui/ui";
import type { Composition } from "./types";

function LayersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const features: Composition = {
  slug: "features",
  name: "Features",
  category: "Page sections",
  description:
    "A grid of feature tiles: an icon, a title and a line of body text, separated by space alone.",
  lead: "Six parts on a native section and list. There are no cards: a feature list is scanned, not compared, so the tiles are set apart by space and each one is an icon, a heading and a muted line, with the grid deciding how many sit across.",
  importLine: `import { Features } from "@loamui/ui";`,
  parts: [
    {
      name: "Features.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the section's width.",
    },
    {
      name: "Features.Grid",
      description: "The list of tiles: an auto-fit grid of columns at least 16rem wide.",
    },
    { name: "Features.Item", description: "One tile: a stacked grid of icon, title and body." },
    {
      name: "Features.Icon",
      description:
        "A small square around your svg, sized on the title's type. Decorative: it is hidden from assistive technology.",
    },
    { name: "Features.Title", description: "The feature's name, an h3." },
    {
      name: "Features.Body",
      description: "One or two muted sentences on what the feature does for the reader.",
    },
  ],
  demos: [
    {
      title: "Three features",
      code: `<Features.Root>
  <h2>Why LoamUI</h2>
  <Features.Grid>
    <Features.Item>
      <Features.Icon>
        <LayersIcon />
      </Features.Icon>
      <Features.Title>Three primitives</Features.Title>
      <Features.Body>
        Tokens, element styles and components. Everything else is composed from them, in your
        own markup.
      </Features.Body>
    </Features.Item>
    <Features.Item>
      <Features.Icon>
        <BoltIcon />
      </Features.Icon>
      <Features.Title>Nothing at runtime</Features.Title>
      <Features.Body>
        One static stylesheet, ordinary React. No styling engine ships to your users.
      </Features.Body>
    </Features.Item>
    <Features.Item>
      <Features.Icon>
        <ShieldIcon />
      </Features.Icon>
      <Features.Title>Gatekept accessibility</Features.Title>
      <Features.Body>
        Every token pair is contrast-audited and every component has an axe test, so what a
        tool can verify, a tool verifies.
      </Features.Body>
    </Features.Item>
  </Features.Grid>
</Features.Root>`,
      render: () => (
        <Features.Root>
          <h2>Why LoamUI</h2>
          <Features.Grid>
            <Features.Item>
              <Features.Icon>
                <LayersIcon />
              </Features.Icon>
              <Features.Title>Three primitives</Features.Title>
              <Features.Body>
                Tokens, element styles and components. Everything else is composed from them, in
                your own markup.
              </Features.Body>
            </Features.Item>
            <Features.Item>
              <Features.Icon>
                <BoltIcon />
              </Features.Icon>
              <Features.Title>Nothing at runtime</Features.Title>
              <Features.Body>
                One static stylesheet, ordinary React. No styling engine ships to your users.
              </Features.Body>
            </Features.Item>
            <Features.Item>
              <Features.Icon>
                <ShieldIcon />
              </Features.Icon>
              <Features.Title>Gatekept accessibility</Features.Title>
              <Features.Body>
                Every token pair is contrast-audited and every component has an axe test, so what a
                tool can verify, a tool verifies.
              </Features.Body>
            </Features.Item>
          </Features.Grid>
        </Features.Root>
      ),
    },
  ],
  whenToUse: [
    "Three to six points of equal weight that a visitor scans on the way down a page, each summed up in a title and a sentence.",
    "When the points need no action of their own: a tile has no Button, so the page's one call to action stays where the Hero put it.",
  ],
  whenNotToUse: [
    "Points that each need their own action or link; those are Cards, or a list of SignpostLinks.",
    "A long list of capabilities or a specification: readers look those up rather than scan them, so a table or a definition list serves them better.",
  ],
};

export default features;
