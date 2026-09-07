"use client";

import { Badge, Breadcrumbs, Button, Time } from "@loamui/core";
import { PageHeader } from "@loamui/ui";
import type { Composition } from "./types";

const pageHeader: Composition = {
  slug: "page-header",
  name: "Page header",
  category: "Navigation",
  description:
    "The top of a page inside an application: breadcrumbs, the title, a line on it, a row of facts and the actions that act on the whole page.",
  lead: "Six parts on a native header, in a fixed reading order: where the page sits, what it is, a line about it, its facts, then its actions. The Title is the page's one h1 and names the header from the first render, so a screen reader's list of landmarks says which page's header it is. The Actions are real Buttons, last in the reading order, and sit beside the title only when the container is wider than 40rem, by a container query and not a breakpoint. Every part but the Title is optional, and each brings its own spacing, so a header with only a title has no gap where the rest would be.",
  importLine: `import { PageHeader } from "@loamui/ui";\nimport { Badge, Breadcrumbs, Button, Time } from "@loamui/core";`,
  parts: [
    {
      name: "PageHeader.Root",
      description:
        "The header element, a grid of named areas, named by its Title with aria-labelledby; an aria-label or aria-labelledby you pass wins. Declares its own container so the actions move by the header's width. Pass render={<div />} where the page already has a header landmark.",
    },
    {
      name: "PageHeader.Breadcrumbs",
      description:
        "The slot for core Breadcrumbs, first, because where the page sits is read before what it is. Leave it out on a top-level page.",
    },
    {
      name: "PageHeader.Title",
      description:
        "The page's title: its one h1, and the header's accessible name. Its id is generated unless you give it one. Pass render={<h2 />} for a header that opens a section rather than the page.",
    },
    {
      name: "PageHeader.Description",
      description:
        "One line under the title on what the page is, in the muted colour, capped at a readable measure.",
    },
    {
      name: "PageHeader.Meta",
      description:
        "A wrapping row of small facts about the page: a core Badge for its status, a Time for when it changed, who owns it. Facts, not headings, and not actions.",
    },
    {
      name: "PageHeader.Actions",
      description:
        "The actions that act on the whole page, as core Buttons: last in the reading order, and beside the title, level with it, when the container is wider than 40rem.",
    },
  ],
  demos: [
    {
      title: "A project page",
      description:
        "Every part in place. The breadcrumbs say where the page sits, the h1 says what it is, the description says what it is for, the meta row carries a status Badge and a Time, and the two actions act on the whole project. Narrow the column and the actions drop beneath the text, in the order a screen reader already reads them; widen it and they move up beside the title.",
      code: `<PageHeader.Root>
  <PageHeader.Breadcrumbs>
    <Breadcrumbs.Root>
      <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Loam</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  </PageHeader.Breadcrumbs>
  <PageHeader.Title>Loam</PageHeader.Title>
  <PageHeader.Description>
    Modern UI primitives for agent-assisted developers, and the compositions built from them.
  </PageHeader.Description>
  <PageHeader.Meta>
    <Badge>Active</Badge>
    <span>
      Updated <Time value="2026-09-01" />
    </span>
    <span>Owned by Imogen Hartley</span>
  </PageHeader.Meta>
  <PageHeader.Actions>
    <Button>Share</Button>
    <Button style={{ "--loam-context": "primary" }}>Edit project</Button>
  </PageHeader.Actions>
</PageHeader.Root>`,
      render: () => (
        <PageHeader.Root>
          <PageHeader.Breadcrumbs>
            <Breadcrumbs.Root>
              <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
              <Breadcrumbs.Item current>Loam</Breadcrumbs.Item>
            </Breadcrumbs.Root>
          </PageHeader.Breadcrumbs>
          <PageHeader.Title>Loam</PageHeader.Title>
          <PageHeader.Description>
            Modern UI primitives for agent-assisted developers, and the compositions built from
            them.
          </PageHeader.Description>
          <PageHeader.Meta>
            <Badge>Active</Badge>
            <span>
              Updated <Time value="2026-09-01" />
            </span>
            <span>Owned by Imogen Hartley</span>
          </PageHeader.Meta>
          <PageHeader.Actions>
            <Button>Share</Button>
            <Button style={{ "--loam-context": "primary" } as React.CSSProperties}>
              Edit project
            </Button>
          </PageHeader.Actions>
        </PageHeader.Root>
      ),
    },
    {
      title: "A title alone",
      description:
        "A settings page needs no breadcrumbs, no facts and no actions: the header is the h1 and nothing else, with no gap where the other parts would have been, because each part brings its own margin and the grid's rows carry none.",
      code: `<PageHeader.Root>
  <PageHeader.Title>Settings</PageHeader.Title>
</PageHeader.Root>`,
      render: () => (
        <PageHeader.Root>
          <PageHeader.Title>Settings</PageHeader.Title>
        </PageHeader.Root>
      ),
    },
    {
      title: "Opening a section",
      description:
        "Inside a page that has its h1, a section's header takes the same shape one level down: the Root rendered as a div, since the page's header landmark is taken, and the Title as an h2. The wiring holds: the div is still named by the heading.",
      code: `<PageHeader.Root render={<div />}>
  <PageHeader.Title render={<h2 />}>Members</PageHeader.Title>
  <PageHeader.Description>Everyone with access to this project.</PageHeader.Description>
  <PageHeader.Actions>
    <Button>Invite</Button>
  </PageHeader.Actions>
</PageHeader.Root>`,
      render: () => (
        <PageHeader.Root render={<div />}>
          <PageHeader.Title render={<h2 />}>Members</PageHeader.Title>
          <PageHeader.Description>Everyone with access to this project.</PageHeader.Description>
          <PageHeader.Actions>
            <Button>Invite</Button>
          </PageHeader.Actions>
        </PageHeader.Root>
      ),
    },
  ],
  whenToUse: [
    "The top of every page inside an application shell: a record, a project, a settings page. One shape across the app, so the visitor always finds the title, the way back and the actions in the same place.",
    "A documentation page with a breadcrumb trail and a last-updated date: the same parts, with no actions.",
  ],
  whenNotToUse: [
    "The opening of a marketing page. That is a Hero: an eyebrow, a large title, a lede and a row of calls to action, set to persuade rather than to orient.",
    "The site's own header with the brand and the primary navigation. That is Header; a page header sits beneath it, inside the page's main content.",
  ],
};

export default pageHeader;
