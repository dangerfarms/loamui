"use client";

import { Button, SignpostLink } from "@loamui/core";
import { SectionHeader } from "@loamui/ui";
import type { Composition } from "./types";

const sectionHeader: Composition = {
  slug: "section-header",
  name: "Section header",
  category: "Page sections",
  description:
    "The intro a section opens with: an eyebrow, a title, a line of description and, beside them when there is room, a row of actions.",
  lead: "Five parts on a div, the top of a section you write rather than a section of its own: the title is an h2 your section's aria-labelledby points at. It reads start-aligned by default and centres when you say so on the Root, because alignment is the page's decision and not a prop; with actions and room for them the row sits beside the words, and the container decides, not a breakpoint.",
  importLine: `import { SectionHeader } from "@loamui/ui";`,
  parts: [
    {
      name: "SectionHeader.Root",
      description:
        "A div by default; pass render={<header />} at the top of a sectioning element. Declares its own container so the fluid tokens and the layout answer the section's width, and renders the grid as an inner element, because an element cannot answer its own container query. Set text-align and justify-items here to centre the parts.",
    },
    {
      name: "SectionHeader.Eyebrow",
      description:
        "A short line above the title, small, strong and in the strong primary colour: a category, a step, a Badge.",
    },
    {
      name: "SectionHeader.Title",
      description:
        "The section's name. An h2 by default; pass render={<h3 />} under a page's own headings. Give it an id and point your section's aria-labelledby at it.",
    },
    {
      name: "SectionHeader.Description",
      description:
        "One or two muted sentences on what the section holds, capped at a readable measure.",
    },
    {
      name: "SectionHeader.Actions",
      description:
        "Optional. A wrapping row for a link or a Button that belongs to the whole section. Beside the words where the container has room, beneath them where it does not.",
    },
  ],
  demos: [
    {
      title: "At the top of a section",
      description:
        "The section is yours and is named by the title. The action belongs to the whole section, so it sits in the header beside the words where there is room, and drops beneath them in a narrow column.",
      code: `<section aria-labelledby="guides">
  <SectionHeader.Root>
    <SectionHeader.Eyebrow>Guides</SectionHeader.Eyebrow>
    <SectionHeader.Title id="guides">Learn the three primitives</SectionHeader.Title>
    <SectionHeader.Description>
      Short reads on tokens, element styles and components, in the order you meet them.
    </SectionHeader.Description>
    <SectionHeader.Actions>
      <SignpostLink href="/guides">All guides</SignpostLink>
    </SectionHeader.Actions>
  </SectionHeader.Root>
  …
</section>`,
      render: () => (
        <section aria-labelledby="guides">
          <SectionHeader.Root>
            <SectionHeader.Eyebrow>Guides</SectionHeader.Eyebrow>
            <SectionHeader.Title id="guides">Learn the three primitives</SectionHeader.Title>
            <SectionHeader.Description>
              Short reads on tokens, element styles and components, in the order you meet them.
            </SectionHeader.Description>
            <SectionHeader.Actions>
              <SignpostLink href="/guides">All guides</SignpostLink>
            </SectionHeader.Actions>
          </SectionHeader.Root>
        </section>
      ),
    },
    {
      title: "Centred",
      description:
        "No prop: text-align and justify-items on the Root centre the parts, the way a marketing page opens a section. The header is rendered as a header element here, because it heads the section.",
      code: `<section aria-labelledby="pricing">
  <SectionHeader.Root render={<header />} style={{ textAlign: "center", justifyItems: "center" }}>
    <SectionHeader.Eyebrow>Pricing</SectionHeader.Eyebrow>
    <SectionHeader.Title id="pricing">One plan, no tiers</SectionHeader.Title>
    <SectionHeader.Description>
      Every feature and every seat for one price, billed monthly or yearly.
    </SectionHeader.Description>
  </SectionHeader.Root>
  …
</section>`,
      render: () => (
        <section aria-labelledby="pricing">
          <SectionHeader.Root
            render={<header />}
            style={{ textAlign: "center", justifyItems: "center" }}
          >
            <SectionHeader.Eyebrow>Pricing</SectionHeader.Eyebrow>
            <SectionHeader.Title id="pricing">One plan, no tiers</SectionHeader.Title>
            <SectionHeader.Description>
              Every feature and every seat for one price, billed monthly or yearly.
            </SectionHeader.Description>
          </SectionHeader.Root>
        </section>
      ),
    },
    {
      title: "In an application",
      description:
        "The same parts head a list in an app: no eyebrow, a title as an h3 under the page's own headings, and a Button in a primary region for the one thing the list is for.",
      code: `<section aria-labelledby="projects">
  <SectionHeader.Root>
    <SectionHeader.Title id="projects" render={<h3 />}>Projects</SectionHeader.Title>
    <SectionHeader.Description>Everything your team is working on.</SectionHeader.Description>
    <SectionHeader.Actions>
      <span style={{ "--loam-context": "primary" }}>
        <Button>New project</Button>
      </span>
    </SectionHeader.Actions>
  </SectionHeader.Root>
  …
</section>`,
      render: () => (
        <section aria-labelledby="projects">
          <SectionHeader.Root>
            <SectionHeader.Title id="projects" render={<h3 />}>
              Projects
            </SectionHeader.Title>
            <SectionHeader.Description>
              Everything your team is working on.
            </SectionHeader.Description>
            <SectionHeader.Actions>
              <span style={{ "--loam-context": "primary" } as React.CSSProperties}>
                <Button>New project</Button>
              </span>
            </SectionHeader.Actions>
          </SectionHeader.Root>
        </section>
      ),
    },
  ],
  whenToUse: [
    "The top of any section that needs more than a bare heading: a line on what the section holds, a category above it, or an action that belongs to the whole section rather than to one item in it.",
    "Wherever the same intro recurs down a page, so every section opens the same way and the reader learns the rhythm once.",
  ],
  whenNotToUse: [
    "The first thing on a page: that is a Hero, with an h1 and the page's primary action.",
    "A section whose heading says everything; a heading alone is a heading, and wrapping it adds nothing the reader can use.",
  ],
};

export default sectionHeader;
