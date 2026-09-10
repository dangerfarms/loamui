"use client";

import { SignpostLink } from "@loamui/core";
import { CallToAction } from "@loamui/ui";
import type { Composition } from "./types";

const callToAction: Composition = {
  slug: "call-to-action",
  name: "Call to action",
  category: "Page sections",
  description:
    "A closing section: a title, one sentence and a row of actions, centred on a subtle surface.",
  lead: "Four parts on a native section. The surface is the subtle background token with a large radius, so the block reads as the page's last word without a border or a colour of its own; a --loam-context region recolours the signpost inside.",
  importLine: `import { CallToAction } from "@loamui/ui";`,
  parts: [
    {
      name: "CallToAction.Root",
      description:
        "The section: a subtle surface with a large radius. Declares its own container so the fluid tokens answer the section's width.",
    },
    {
      name: "CallToAction.Title",
      description: 'The headline. An h2 by default; pass render="h3" under a page\'s own headings.',
    },
    {
      name: "CallToAction.Body",
      description:
        "One sentence that says what happens next, muted and capped at a readable measure.",
    },
    {
      name: "CallToAction.Actions",
      description:
        "A centred, wrapping flex row: a SignpostLink for the primary path, a plain link beside it.",
    },
  ],
  demos: [
    {
      title: "Closing block",
      description:
        "One primary path and one alternative. The signpost is a link, because starting is navigation, not an action.",
      code: `<CallToAction.Root>
  <CallToAction.Title>Start building</CallToAction.Title>
  <CallToAction.Body>
    Install the package, import one stylesheet and start with any component.
  </CallToAction.Body>
  <CallToAction.Actions>
    <SignpostLink href="/docs">Read the docs</SignpostLink>
    <a href="/docs/components">Browse components</a>
  </CallToAction.Actions>
</CallToAction.Root>`,
      render: () => (
        <CallToAction.Root>
          <CallToAction.Title>Start building</CallToAction.Title>
          <CallToAction.Body>
            Install the package, import one stylesheet and start with any component.
          </CallToAction.Body>
          <CallToAction.Actions>
            <SignpostLink href="/docs">Read the docs</SignpostLink>
            <a href="/docs/components">Browse components</a>
          </CallToAction.Actions>
        </CallToAction.Root>
      ),
    },
  ],
  whenToUse: [
    "The last section of a landing or marketing page, where the reader has read the case and needs one clear next step.",
    "The end of a guide, pointing to the one thing to do next, with the title rendered as an h3 under the page's own headings.",
  ],
  whenNotToUse: [
    "In the middle of a page, or more than once: the block earns its surface by being the close, and a repeated call to action reads as noise.",
    "For a choice between several equal paths: a Features grid or a list of links serves a set of options; this section carries one primary action and at most one alternative.",
  ],
};

export default callToAction;
