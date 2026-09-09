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

## Built to the pillars

- **Native CSS.** The tabs are links in a nav, not a tablist: each goes to a page, so it is an anchor with an href and the current one carries aria-current; Sign out is a submit button in a method="post" form.
- **Modern CSS.** The underline is Nav's own marker moved from the link's start edge to its block end by one declaration, the public --loam-nav-current-edge on the header, which the Nav answers through a style query; the row sits on the header's line by a one-pixel overlap.
- **Composition.** Menu's trigger is substituted through render for a bare button around an Avatar and the name; Nav's List is given a class and a flex row; neither component is restyled, and no rule reaches a link.
- **Accessible & gatekept.** The account button is named Account menu for Imogen Hartley by hidden words before the visible name, with the Avatar hidden so the name is heard once; the current tab is a line and weight, not colour alone, and Nav names the line in the system highlight under forced colours.

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
          <Menu.Trigger render={<button type="button" className="user" />}>
            <Avatar
              name="Imogen Hartley"
              src="https://picsum.photos/seed/hedgerow-imogen/96/96"
              aria-hidden
            />
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
/* Two rows: the brand and the account menu across the top, the tabs
   beneath on the header's bottom line. The header declares Nav's public
   --loam-nav-current-edge, so the current tab's marker runs under the
   link rather than beside it; a style query is answered by ancestors, so
   the declaration sits here, above the Nav, never on the link. The donut
   leaves the Menu, the Avatar and the Nav on their own styles. */
@scope (.header-with-tabs) to ([class*="loam-"]) {
  :scope {
    --loam-nav-current-edge: block-end;

    border-block-end: 1px solid var(--loam-color-line);
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

    /* The top row never wraps, so the leaf is told not to give way. */
    svg {
      block-size: 1.25em;
      flex: none;
      inline-size: 1.25em;
    }
  }
}

/* The account control is a bare button, past the header's donut: the
   elements layer's raised pill is set aside for a row of avatar, name
   and chevron in ordinary text. The border stays, transparent, so forced
   colours keep an edge; aria-expanded turns the chevron. */
@scope (.header-with-tabs .loam-Menu) to ([class*="loam-"]) {
  button.user {
    align-items: center;
    background: none;
    border: 1px solid transparent;
    border-radius: var(--loam-radius-full);
    box-shadow: none;
    color: var(--loam-color-fg);
    display: inline flex;
    font-size: var(--loam-text-sm);
    font-weight: 500;
    gap: var(--loam-space-sm);
    padding-block: calc(var(--loam-space-xs) / 2);
    padding-inline: calc(var(--loam-space-xs) / 2) var(--loam-space-sm);

    svg {
      block-size: 1em;
      color: var(--loam-color-fg-muted);
      inline-size: 1em;

      @media (prefers-reduced-motion: no-preference) {
        transition: rotate var(--loam-duration-sm) var(--loam-ease);
      }
    }

    &[aria-expanded="true"] {
      background: var(--loam-color-bg-subtle);

      svg {
        rotate: 180deg;
      }
    }

    @media (hover: hover) {
      &:hover {
        background: var(--loam-color-bg-subtle);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      transition: background var(--loam-duration-sm) var(--loam-ease);
    }
  }
}

/* Core's Nav as a row of tabs, placed from its own scope: a flex row on
   the List, pulled down one pixel so each link's marker sits on the
   header's line. The marker itself, its weight and its forced-colours
   treatment are Nav's, answering the edge declared on the header. */
@scope (.header-with-tabs .loam-Nav) to ([class*="loam-"]) {
  ul.tabs {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
    margin-block-end: -1px;
  }
}
```

