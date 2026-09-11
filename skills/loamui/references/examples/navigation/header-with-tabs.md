---
title: Header with tabs
description: An application header in two rows: the brand and the signed-in person's menu across the top, and beneath them the sections as a row of tabs with the current one underlined.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Header with tabs

An application header in two rows: the brand and the signed-in person's menu across the top, and beneath them the sections as a row of tabs with the current one underlined.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Menu`, `Nav`
- Tags: app header, tabs, account menu, avatar, top bar
- Live: https://loamui.com/examples/navigation/header-with-tabs

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The tabs are links in a nav, not a tablist: each goes to a page, so it is an anchor with an href and the current one carries aria-current; Sign out is a submit button in a method="post" form.
- **Modern CSS.** The underline is Nav's own marker moved from the link's start edge to its block end by one declaration, the public --loam-nav-current-edge on the header, which the Nav answers through a style query; the row sits on the header's line by a one-pixel overlap.
- **Composition.** Menu's trigger is the Button core renders, holding an Avatar, the name and a chevron the Button detects and lays out; Nav's List is given a class and a flex row; neither component is restyled, and no rule reaches a link or the Button.
- **Accessible & gatekept.** The account Button is named Account menu for Imogen Hartley by hidden words before the visible name, with the Avatar hidden so the name is heard once, and it brings its own focus ring and forced-colours edge; the current tab is a line and weight, not colour alone, and Nav names the line in the system highlight under forced colours.

## Example.tsx

```tsx
"use client";

import { Avatar, Menu, Nav } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="header-with-tabs">
      <div className="top">
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
        <Menu.Root>
          <Menu.Trigger>
            <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/96/96" aria-hidden />
            <span className="loam-VisuallyHidden">Account menu for </span>
            <span className="name">Imogen Hartley</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Menu.Trigger>
          <Menu.Popup>
            <Menu.Item href="/plot">Your plot</Menu.Item>
            <Menu.Item href="/orders">Orders</Menu.Item>
            <Menu.Item href="/settings">Settings</Menu.Item>
            <Menu.Separator />
            <form method="post" action="/sign-out">
              <Menu.Item render={<button type="submit">Sign out</button>} />
            </form>
          </Menu.Popup>
        </Menu.Root>
      </div>
      <Nav.Root aria-label="Nursery">
        <Nav.List className="tabs">
          <Nav.Item>
            <Nav.Link href="/nursery">Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/orders" current>
              Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/stock">Stock</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/growers">Growers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/open-days">Open days</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/settings">Settings</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
    </header>
  );
}
```

## example.css

```css
@scope (.header-with-tabs) to ([class*="loam-"]) {
  :scope {
    /* A style query is answered by ancestors, so the edge is declared here,
       never on the link. */
    --loam-nav-current-edge: block-end;

    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-sm);
    padding-block-start: var(--loam-space-sm);
  }

  div.top {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-md);
    justify-content: space-between;
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
      flex: none;
      inline-size: 1.25em;
    }
  }
}

@scope (.header-with-tabs .loam-Button) to ([class*="loam-"]) {
  svg {
    color: var(--loam-color-fg-muted);

    :scope[aria-expanded="true"] & {
      rotate: 180deg;
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: rotate var(--loam-duration-sm) var(--loam-ease);
    }
  }

  /* Hidden, not removed: the name stays in the button's accessible name. */
  @container (inline-size < 30rem) {
    span.name {
      block-size: 1px;
      clip-path: inset(50%);
      inline-size: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
    }
  }
}

@scope (.header-with-tabs .loam-Nav) to ([class*="loam-"]) {
  ul.tabs {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);

    /* One pixel down, so each link's marker sits on the header's line. */
    margin-block-end: -1px;
  }
}
```

