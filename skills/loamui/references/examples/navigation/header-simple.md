---
title: Simple header
description: A site header: the brand, a row of primary links with the current page marked, and one action at the end.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Simple header

A site header: the brand, a row of primary links with the current page marked, and one action at the end.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`, `SignpostLink`
- Tags: site header, top bar, navbar, brand
- Live: https://loamui.com/examples/navigation/header-simple

## Built to the pillars

- **Native CSS.** A header landmark holding a nav landmark named Primary; the brand is a plain link home, and going somewhere is a SignpostLink rather than a Button dressed as one.
- **Modern CSS.** The header is a container: the nav shares the row where there is room and drops beneath the brand and the action where there is not, decided by the header's own width.
- **Composition.** Nav is core's, with its own scope; the header asks one thing of it, a flex row on the List, and places the nav from a scope of its own rather than reaching through the donut.
- **Accessible & gatekept.** The current page is marked by aria-current on the link, and the stylesheet draws the marker from that attribute, so a router and a static site say it the same way.

## Example.tsx

```tsx
"use client";

import { Nav, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="header-simple">
      <a className="brand" href="/">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 19c0-7 4-13 14-14-1 10-7 14-14 14z" />
          <path d="M5 19c3-5 6-8 9-10" />
        </svg>
        Hedgerow
      </a>
      <Nav.Root aria-label="Primary">
        <Nav.List className="row">
          <Nav.Item>
            <Nav.Link href="/seeds" current>
              Seeds
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/plants">Plants</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/guides">Growing guides</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/events">Open days</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
      <div className="actions">
        <SignpostLink href="/membership/join">Join the co-op</SignpostLink>
      </div>
    </header>
  );
}
```

## example.css

```css
/* The header is the container: the brand, the nav and the action share a
   row where it has room, and the nav takes a row of its own beneath the
   other two where it has not. The donut leaves the Nav and the
   SignpostLink on their own styles. */
@scope (.header-simple) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm) var(--loam-space-lg);
    padding-block: var(--loam-space-md);
  }

  /* The brand is the link home, in the display face with no underline:
     the name is the affordance. */
  a.brand {
    align-items: center;
    color: var(--loam-color-fg-strong);
    display: inline flex;
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-lg);
    font-weight: 700;
    gap: var(--loam-space-xs);
    letter-spacing: -0.02em;
    text-decoration: none;

    svg {
      block-size: 1.25em;
      inline-size: 1.25em;
    }
  }

  div.actions {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    margin-inline-start: auto;
  }
}

/* The Nav is core's and keeps its own scope; a horizontal nav is the
   consumer's flex row on the List, which is the one thing asked of it
   here. Where the header is narrow the whole nav drops to a row of its
   own, after the action. */
@scope (.header-simple .loam-Nav) to ([class*="loam-"]) {
  ul.row {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
  }

  @container (inline-size < 48rem) {
    :scope {
      flex-basis: 100%;
      order: 1;
    }
  }
}
```

