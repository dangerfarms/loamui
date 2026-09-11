---
title: Mobile nav
description: Navigation for a narrow screen: a Menu button in the header opens a panel from the start edge holding the site's links, with the current page marked and a button to close it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Mobile nav

Navigation for a narrow screen: a Menu button in the header opens a panel from the start edge holding the site's links, with the current page marked and a button to close it.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Drawer`, `Nav`
- Tags: hamburger, drawer, off-canvas, mobile menu
- Live: https://loamui.com/examples/navigation/mobile-nav

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The panel is a native dialog opened with showModal(), so the top layer, focus containment, Escape and focus returning to the Menu button on close are the browser's, not a script's.
- **Modern CSS.** The links take a 2.75rem line through Nav's public --loam-nav-link-size, set on the panel and inherited: the smallest target a thumb hits reliably, without touching Nav's own rules.
- **Composition.** Drawer and Nav are assembled in the markup, title and close button in the panel's first row; the Drawer holds its own open state and its trigger reports it, so the example keeps none.
- **Accessible & gatekept.** The button says Menu in words and reports the panel with aria-expanded; the panel is named by its title, the nav inside by Primary, the close button by hidden text beside its icon, and the current page by aria-current.

## Example.tsx

```tsx
"use client";

import { Drawer, Nav } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="mobile-nav">
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
      <Drawer.Root>
        <Drawer.Trigger>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          Menu
        </Drawer.Trigger>
        <Drawer.Popup side="start">
          <div className="top">
            <Drawer.Title>Hedgerow</Drawer.Title>
            <Drawer.Close>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
              <span className="loam-VisuallyHidden">Close menu</span>
            </Drawer.Close>
          </div>
          <Nav.Root aria-label="Primary">
            <Nav.List>
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
                <Nav.Link href="/membership">Membership</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/events">Open days</Nav.Link>
              </Nav.Item>
            </Nav.List>
          </Nav.Root>
        </Drawer.Popup>
      </Drawer.Root>
    </header>
  );
}
```

## example.css

```css
@scope (.mobile-nav) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    border-block-end: 1px solid var(--loam-color-line);
    display: block flex;
    gap: var(--loam-space-md);
    justify-content: space-between;
    padding-block: var(--loam-space-sm);
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
}

@scope (.mobile-nav .loam-Drawer-popup) to ([class*="loam-"]) {
  :scope {
    --loam-nav-link-size: 2.75rem;
  }

  div.top {
    align-items: start;
    display: block flex;
    gap: var(--loam-space-sm);
    justify-content: space-between;
    margin-block-end: var(--loam-space-md);
  }
}
```

