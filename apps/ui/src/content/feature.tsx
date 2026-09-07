"use client";

import { Feature } from "@loamui/ui";
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

const feature: Composition = {
  slug: "feature",
  name: "Feature",
  category: "Page sections",
  description:
    "One feature: an icon, a title and a line on what it does, alone or in a grid you write.",
  lead: "Four parts on one feature. There is no card: a run of features is scanned, not compared, so each one is an icon, a heading and a muted line set apart by space, and the grid you write decides how many sit across.",
  importLine: `import { Feature } from "@loamui/ui";`,
  parts: [
    {
      name: "Feature.Root",
      description:
        "The tile: a stacked grid of icon, title and description. A div by default; pass render={<li />} inside a list. Declares its own container.",
    },
    {
      name: "Feature.Icon",
      description:
        "A small square around your svg, sized on the title's type. Decorative: it is hidden from assistive technology.",
    },
    {
      name: "Feature.Title",
      description:
        "The feature's name. An h3 by default; pass render={<h4 />} under a page's own h3s.",
    },
    {
      name: "Feature.Description",
      description: "One or two muted sentences on what the feature does for the reader.",
    },
  ],
  demos: [
    {
      title: "One feature",
      description: "A tile needs no list. Drop one beside a paragraph or into a Card.",
      code: `<Feature.Root>
  <Feature.Icon>
    <BoltIcon />
  </Feature.Icon>
  <Feature.Title>Nothing at runtime</Feature.Title>
  <Feature.Description>
    One static stylesheet, ordinary React. No styling engine ships to your users.
  </Feature.Description>
</Feature.Root>`,
      render: () => (
        <Feature.Root>
          <Feature.Icon>
            <BoltIcon />
          </Feature.Icon>
          <Feature.Title>Nothing at runtime</Feature.Title>
          <Feature.Description>
            One static stylesheet, ordinary React. No styling engine ships to your users.
          </Feature.Description>
        </Feature.Root>
      ),
    },
    {
      title: "Three features",
      description:
        "Three tiles in a list. The grid is yours: a ul with repeat(auto-fit, minmax(min(16rem, 100%), 1fr)), each tile rendered as a li.",
      code: `<section aria-labelledby="why">
  <h2 id="why">Why LoamUI</h2>
  <ul style={{ display: "grid", gap: "2rem 1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(16rem, 100%), 1fr))", listStyle: "none", margin: 0, padding: 0 }}>
    <Feature.Root render={<li />}>
      <Feature.Icon>
        <LayersIcon />
      </Feature.Icon>
      <Feature.Title>Three primitives</Feature.Title>
      <Feature.Description>
        Tokens, element styles and components. Everything else is composed from them, in your
        own markup.
      </Feature.Description>
    </Feature.Root>
    <Feature.Root render={<li />}>
      <Feature.Icon>
        <BoltIcon />
      </Feature.Icon>
      <Feature.Title>Nothing at runtime</Feature.Title>
      <Feature.Description>
        One static stylesheet, ordinary React. No styling engine ships to your users.
      </Feature.Description>
    </Feature.Root>
    <Feature.Root render={<li />}>
      <Feature.Icon>
        <ShieldIcon />
      </Feature.Icon>
      <Feature.Title>Gatekept accessibility</Feature.Title>
      <Feature.Description>
        Every token pair is contrast-audited and every component has an axe test, so what a
        tool can verify, a tool verifies.
      </Feature.Description>
    </Feature.Root>
  </ul>
</section>`,
      render: () => (
        <section aria-labelledby="why">
          <h2 id="why">Why LoamUI</h2>
          <ul
            style={{
              display: "grid",
              gap: "2rem 1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(16rem, 100%), 1fr))",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <Feature.Root render={<li />}>
              <Feature.Icon>
                <LayersIcon />
              </Feature.Icon>
              <Feature.Title>Three primitives</Feature.Title>
              <Feature.Description>
                Tokens, element styles and components. Everything else is composed from them, in
                your own markup.
              </Feature.Description>
            </Feature.Root>
            <Feature.Root render={<li />}>
              <Feature.Icon>
                <BoltIcon />
              </Feature.Icon>
              <Feature.Title>Nothing at runtime</Feature.Title>
              <Feature.Description>
                One static stylesheet, ordinary React. No styling engine ships to your users.
              </Feature.Description>
            </Feature.Root>
            <Feature.Root render={<li />}>
              <Feature.Icon>
                <ShieldIcon />
              </Feature.Icon>
              <Feature.Title>Gatekept accessibility</Feature.Title>
              <Feature.Description>
                Every token pair is contrast-audited and every component has an axe test, so what a
                tool can verify, a tool verifies.
              </Feature.Description>
            </Feature.Root>
          </ul>
        </section>
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

export default feature;
