"use client";

import { useState } from "react";
import { Button } from "@loamui/core";
import { Banner } from "@loamui/ui";
import type { Composition } from "./types";

/** A consumer's wrapper: the dismissed state lives here, not in the Banner. */
function DismissibleBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <Banner.Root>
      <Banner.Message>
        We are moving to a new domain on 1 October. Bookmarks will redirect.
      </Banner.Message>
      <Banner.Actions>
        <Button onClick={() => setOpen(false)}>Dismiss</Button>
      </Banner.Actions>
    </Banner.Root>
  );
}

const banner: Composition = {
  slug: "banner",
  name: "Banner",
  category: "Page sections",
  description:
    "A one-line announcement bar for the top of a page: a message and, beside it, a Button or a link.",
  lead: "Three parts on a div with role status. The bar is neutral by default; wrap it in a --loam-context region and the parts inside recolour while the bar's own surface takes that status's soft tint, and there is no dismiss button because dismissal needs state the bar does not hold.",
  importLine: `import { Banner } from "@loamui/ui";`,
  parts: [
    {
      name: "Banner.Root",
      description:
        "A div with role status: a live region, so a message that appears after load is announced. A flex row on the subtle background with a line beneath it; declares its own container.",
    },
    {
      name: "Banner.Message",
      description: "The announcement, a paragraph that takes the row's slack.",
    },
    {
      name: "Banner.Actions",
      description:
        "A flex row at the end of the bar for a Button or a link. The actions keep their width and wrap under the message when the bar is narrow.",
    },
  ],
  demos: [
    {
      title: "Neutral",
      description:
        "A message and a link. The bar takes the subtle background and a line beneath it.",
      code: `<Banner.Root>
  <Banner.Message>Version 2 is out. Read what changed before you upgrade.</Banner.Message>
  <Banner.Actions>
    <a href="/changelog">Read the changelog</a>
  </Banner.Actions>
</Banner.Root>`,
      render: () => (
        <Banner.Root>
          <Banner.Message>Version 2 is out. Read what changed before you upgrade.</Banner.Message>
          <Banner.Actions>
            <a href="/changelog">Read the changelog</a>
          </Banner.Actions>
        </Banner.Root>
      ),
    },
    {
      title: "In a warning region",
      description:
        "The same markup inside a warning region. The Button answers the context through the tokens, and the bar's own surface takes the warning tint.",
      code: `<div style={{ "--loam-context": "warning" }}>
  <Banner.Root>
    <Banner.Message>Maintenance on Saturday from 08:00 to 10:00 UTC.</Banner.Message>
    <Banner.Actions>
      <Button>See the status page</Button>
    </Banner.Actions>
  </Banner.Root>
</div>`,
      render: () => (
        <div style={{ "--loam-context": "warning" } as React.CSSProperties}>
          <Banner.Root>
            <Banner.Message>Maintenance on Saturday from 08:00 to 10:00 UTC.</Banner.Message>
            <Banner.Actions>
              <Button>See the status page</Button>
            </Banner.Actions>
          </Banner.Root>
        </div>
      ),
    },
    {
      title: "Dismissed by the consumer",
      description:
        "The Banner has no dismiss button because the dismissed state is yours to keep: a wrapper holds an open flag and renders nothing once it is false.",
      code: `function DismissibleBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <Banner.Root>
      <Banner.Message>
        We are moving to a new domain on 1 October. Bookmarks will redirect.
      </Banner.Message>
      <Banner.Actions>
        <Button onClick={() => setOpen(false)}>Dismiss</Button>
      </Banner.Actions>
    </Banner.Root>
  );
}`,
      render: () => <DismissibleBanner />,
    },
  ],
  whenToUse: [
    "One announcement that applies to every page, such as a release, a maintenance window or a move, where a line at the top is enough and nothing needs a decision.",
    "A status the reader should see before the page's own content, with a region declaring warning or info so the bar reads as that status without a prop.",
  ],
  whenNotToUse: [
    "A message about one form or one section: an Alert sits beside the thing it describes; a bar at the top of the page is for the whole page.",
    "Anything that needs more than a line, or that changes while the reader is on the page: a bar is a live region, and a stream of updates there belongs in a Toast.",
  ],
};

export default banner;
