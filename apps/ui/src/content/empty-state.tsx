"use client";

import { Button, Card } from "@loamui/core";
import { EmptyState } from "@loamui/ui";
import type { Composition } from "./types";

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M4 14h5l1 2h4l1-2h5" />
    </svg>
  );
}

const emptyState: Composition = {
  slug: "empty-state",
  name: "Empty state",
  category: "Page sections",
  description:
    "The screen shown when a list, a search or a section has nothing in it yet: what the place is for, why it is empty and one clear next action.",
  lead: 'Five parts on a native section named by its title, centred in whatever holds it. It is not a live region by default, because a list that loaded empty is the page as it is and nothing happened; when it replaces results after a search the reader is waiting to hear, so the consumer passes role="status" and it is announced. The picture is hidden because the title already says what it shows, and the next step is one Button or SignpostLink, never a menu of them.',
  importLine: `import { EmptyState } from "@loamui/ui";`,
  parts: [
    {
      name: "EmptyState.Root",
      description:
        'The section: a centred grid, named by its Title unless you pass aria-label or aria-labelledby. Declares its own container so the fluid tokens answer its width. Pass role="status" when it replaces results after a search; pass render={<div />} where a section would be one landmark too many.',
    },
    {
      name: "EmptyState.Media",
      description:
        "Optional. An icon or a small illustration above the title, hidden from assistive technology: an svg is set at 3rem in the dim foreground, an img is capped at 16rem.",
    },
    {
      name: "EmptyState.Title",
      description:
        "What is empty, in a few words. An h2 by default; pass render={<h3 />} under a page's own headings. It names the Root while it is present.",
    },
    {
      name: "EmptyState.Description",
      description:
        "One or two muted sentences on why it is empty and what to do, capped at a readable measure.",
    },
    {
      name: "EmptyState.Actions",
      description:
        "A centred, wrapping flex row: one Button or SignpostLink for the next step, at most one plain link beside it.",
    },
  ],
  demos: [
    {
      title: "Nothing yet",
      description:
        "The place has never had anything in it. The copy says what it is for and how to start, and the next step is one Button in a primary region; the icon is decorative and the title carries the meaning.",
      code: `<EmptyState.Root>
  <EmptyState.Media>
    <FolderIcon />
  </EmptyState.Media>
  <EmptyState.Title>No projects yet</EmptyState.Title>
  <EmptyState.Description>
    Projects hold your pages, assets and settings in one place. Create your first project to
    start.
  </EmptyState.Description>
  <EmptyState.Actions>
    <span style={{ "--loam-context": "primary" }}>
      <Button>Create a project</Button>
    </span>
  </EmptyState.Actions>
</EmptyState.Root>`,
      render: () => (
        <EmptyState.Root>
          <EmptyState.Media>
            <FolderIcon />
          </EmptyState.Media>
          <EmptyState.Title>No projects yet</EmptyState.Title>
          <EmptyState.Description>
            Projects hold your pages, assets and settings in one place. Create your first project to
            start.
          </EmptyState.Description>
          <EmptyState.Actions>
            <span style={{ "--loam-context": "primary" } as React.CSSProperties}>
              <Button>Create a project</Button>
            </span>
          </EmptyState.Actions>
        </EmptyState.Root>
      ),
    },
    {
      title: "No results",
      description:
        'The empty state replaced a list after a search, so the root takes role="status" and a screen reader hears the outcome. The copy quotes what was looked for and says how to look again; the way out is a link, because clearing the search is navigation.',
      code: `<EmptyState.Root role="status">
  <EmptyState.Title>No results for "loam"</EmptyState.Title>
  <EmptyState.Description>
    Check the spelling or try a broader search.
  </EmptyState.Description>
  <EmptyState.Actions>
    <a href="/search">Clear the search</a>
  </EmptyState.Actions>
</EmptyState.Root>`,
      render: () => (
        <EmptyState.Root role="status">
          <EmptyState.Title>No results for &quot;loam&quot;</EmptyState.Title>
          <EmptyState.Description>
            Check the spelling or try a broader search.
          </EmptyState.Description>
          <EmptyState.Actions>
            <a href="/search">Clear the search</a>
          </EmptyState.Actions>
        </EmptyState.Root>
      ),
    },
    {
      title: "Inside a Card",
      description:
        "The unit sits in a Card, rendered as a div so the Card does not gain a landmark, with the title one level under the Card's own headings. The Card decides the width; the fluid tokens answer it.",
      code: `<Card>
  <EmptyState.Root render={<div />}>
    <EmptyState.Media>
      <InboxIcon />
    </EmptyState.Media>
    <EmptyState.Title render={<h3 />}>No messages</EmptyState.Title>
    <EmptyState.Description>
      Messages from your team appear here as they arrive.
    </EmptyState.Description>
  </EmptyState.Root>
</Card>`,
      render: () => (
        <Card>
          <EmptyState.Root render={<div />}>
            <EmptyState.Media>
              <InboxIcon />
            </EmptyState.Media>
            <EmptyState.Title render={<h3 />}>No messages</EmptyState.Title>
            <EmptyState.Description>
              Messages from your team appear here as they arrive.
            </EmptyState.Description>
          </EmptyState.Root>
        </Card>
      ),
    },
  ],
  whenToUse: [
    "A list, a table or a section that has nothing in it yet: the reader arrived at a place built for content and owes them a line on what it is for and how to fill it, not a blank.",
    'A search or a filter that matched nothing. Pass role="status" so the outcome is announced, quote what was looked for, and give one way to look again.',
  ],
  whenNotToUse: [
    "Something went wrong. A place that is empty because a request failed is an ErrorPage when the whole view is lost, or an Alert with a retry Button when the reader can stay where they are.",
    "The content is still on its way. A Skeleton holds the shape while it loads; an empty state that appears and then fills is a false statement.",
  ],
};

export default emptyState;
