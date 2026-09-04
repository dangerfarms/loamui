"use client";

import { Button } from "@loamui/core";
import { Header } from "@loamui/ui";
import type { Composition } from "./types";

const header: Composition = {
  slug: "header",
  name: "Header",
  category: "Navigation",
  description: "A site header: brand, primary navigation and a row of actions.",
  lead: "Four parts on a native header. The nav is a plain list of links you write, so a router or a static site drives it the same way; in a narrow container the list wraps beneath the brand row by CSS alone, with no script and no hamburger to manage.",
  importLine: `import { Header } from "@loamui/ui";`,
  parts: [
    {
      name: "Header.Root",
      description:
        "The header landmark. Declares its own container so the nav wraps by the header's width. Make it sticky with your own CSS if the page wants that.",
    },
    { name: "Header.Brand", description: "The logo or name as a link home. Always an anchor." },
    {
      name: "Header.Nav",
      description:
        'A nav landmark wrapping a ul of your li > a items. Give it an aria-label and mark the current page with aria-current="page".',
    },
    {
      name: "Header.Actions",
      description: "A flex row at the end: a Button, a theme toggle, an avatar.",
    },
  ],
  demos: [
    {
      title: "Site header",
      description:
        "The current page is marked in the markup, not with a prop, and the header styles it. Narrow the preview and the nav drops beneath the brand row.",
      code: `<Header.Root>
  <Header.Brand href="/">Loam</Header.Brand>
  <Header.Nav aria-label="Primary">
    <li>
      <a href="/docs" aria-current="page">Docs</a>
    </li>
    <li>
      <a href="/components">Components</a>
    </li>
    <li>
      <a href="/pricing">Pricing</a>
    </li>
    <li>
      <a href="/blog">Blog</a>
    </li>
  </Header.Nav>
  <Header.Actions>
    <Button>Sign in</Button>
    <span style={{ "--loam-context": "primary" }}>
      <Button>Get started</Button>
    </span>
  </Header.Actions>
</Header.Root>`,
      render: () => (
        <Header.Root>
          <Header.Brand href="/">Loam</Header.Brand>
          <Header.Nav aria-label="Primary">
            <li>
              <a href="/docs" aria-current="page">
                Docs
              </a>
            </li>
            <li>
              <a href="/components">Components</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </Header.Nav>
          <Header.Actions>
            <Button>Sign in</Button>
            <span style={{ "--loam-context": "primary" } as React.CSSProperties}>
              <Button>Get started</Button>
            </span>
          </Header.Actions>
        </Header.Root>
      ),
    },
  ],
  whenToUse: [
    "The top of every page of a site with a handful of destinations, where the visitor should always see where they are and where else they can go.",
    "A product shell whose actions (sign in, theme, account) belong beside the navigation rather than inside the page.",
  ],
  whenNotToUse: [
    "A site with more sections than fit on one row; a header that needs a hamburger and a drawer is a different composition with different keyboard and focus work.",
    "Navigation within a page, such as tabs between views of one record. That is a nav inside the content, not the site header.",
  ],
};

export default header;
