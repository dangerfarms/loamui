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

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A header landmark holding a nav landmark named Primary; the brand is a plain link home, and going somewhere is a SignpostLink rather than a Button dressed as one.
- **Modern CSS.** The header is a container: the nav shares the row where there is room and drops beneath the brand and the action where there is not, decided by the header's own width.
- **Composition.** Nav is core's, with its own scope; the header asks two things of it, a flex row on the List and its public --loam-nav-current-edge on the Root, and places the nav from a scope of its own rather than reaching through the donut to a link.
- **Accessible & gatekept.** The current page is marked by aria-current on the link, and the stylesheet draws the marker from that attribute, a line under the link and weight, so a router and a static site say it the same way.

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
          strokeLinecap="round"
          strokeLinejoin="round"
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

@scope (.header-simple .loam-Nav) to ([class*="loam-"]) {
  :scope {
    /* A style query is answered by ancestors, so the edge is declared here,
       never on the link. */
    --loam-nav-current-edge: block-end;
  }

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

