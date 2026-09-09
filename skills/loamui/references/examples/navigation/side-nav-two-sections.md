---
title: Side nav with two sections
description: Vertical navigation for an application in two lists: the main pages at the top and, pinned to the foot of the column, settings and a sign-out that posts a form.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav with two sections

Vertical navigation for an application in two lists: the main pages at the top and, pinned to the foot of the column, settings and a sign-out that posts a form.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`
- Tags: sidebar, app shell, vertical nav, sign out, settings
- Live: https://loamui.com/examples/navigation/side-nav-two-sections

## Built to the pillars

- **Native CSS.** Sign out is a submit button in a method="post" form, because ending a session changes state on the server; it is rendered through Nav.Link so it sits in the list as a line like the others, and the other five are real anchors.
- **Modern CSS.** The Nav's title and two lists are three grid rows, the middle one 1fr, so the account list sits at the block end however tall the column is; nothing is positioned, and the separator is a border on the second list.
- **Composition.** Two Lists in one Root: Nav has no footer part, because a second List and a row track are all the pinning needs; the example places the Nav from a scope of its own and never reaches inside a link.
- **Accessible & gatekept.** One landmark named Nursery holds both lists, so a reader finds settings and sign out under the same name; the current page carries aria-current and the sign-out button keeps its own semantics inside the list.

## Example.tsx

```tsx
"use client";

import { Nav } from "@loamui/core";
import "./example.css";

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function Example() {
  return (
    <div className="side-nav-two-sections">
      <a className="brand" href="/">
        <svg {...icon}>
          <path d="M5 19c0-7 4-13 14-14-1 10-7 14-14 14z" />
          <path d="M5 19c3-5 6-8 9-10" />
        </svg>
        Hedgerow
      </a>
      <Nav.Root>
        <Nav.Title>Nursery</Nav.Title>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/nursery">
              <svg {...icon}>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Overview
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/orders" current>
              <svg {...icon}>
                <path d="m3 8 9-5 9 5v8l-9 5-9-5z" />
                <path d="m3 8 9 5 9-5M12 13v8" />
              </svg>
              Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/stock">
              <svg {...icon}>
                <path d="M12 21v-8" />
                <path d="M12 13c0-4 3-7 8-7-1 5-4 7-8 7z" />
                <path d="M12 13c0-3-2-5-6-5 1 4 3 5 6 5z" />
              </svg>
              Stock
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/growers">
              <svg {...icon}>
                <circle cx="9" cy="8" r="3.5" />
                <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
              </svg>
              Growers
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/nursery/open-days">
              <svg {...icon}>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              Open days
            </Nav.Link>
          </Nav.Item>
        </Nav.List>
        <Nav.List className="account">
          <Nav.Item>
            <Nav.Link href="/nursery/settings">
              <svg {...icon}>
                <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h10M18 17h2" />
                <circle cx="16" cy="7" r="2" />
                <circle cx="8" cy="12" r="2" />
                <circle cx="16" cy="17" r="2" />
              </svg>
              Settings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <form method="post" action="/sign-out">
              <Nav.Link render={<button type="submit" />}>
                <svg {...icon}>
                  <path d="M12 3v9" />
                  <path d="M6.3 6.3a8 8 0 1 0 11.4 0" />
                </svg>
                Sign out
              </Nav.Link>
            </form>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
    </div>
  );
}
```

## example.css

```css
/* The column the nav lives in: the brand in the first row and the Nav
   stretched through the second. In an app shell the column is as tall as
   the viewport; here it is given a height so the pinning shows. */
@scope (.side-nav-two-sections) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-rows: auto 1fr;
    inline-size: min(100%, 18rem);
    min-block-size: 32rem;
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
    padding-inline: var(--loam-space-sm);
    text-decoration: none;

    svg {
      block-size: 1.25em;
      inline-size: 1.25em;
    }
  }
}

/* Core's Nav, placed from its own scope. Its three children, the title
   and two lists, are three rows; the middle one takes the free space, so
   the account list sits at the block end however tall the column is. */
@scope (.side-nav-two-sections .loam-Nav) to ([class*="loam-"]) {
  :scope {
    grid-template-rows: auto 1fr auto;
  }

  ul.account {
    border-block-start: 1px solid var(--loam-color-line);
    padding-block-start: var(--loam-space-sm);
  }

  /* The form is plumbing around the sign-out line and has no box. */
  form {
    margin: 0;
  }

  /* Sign out is a button rendered through Nav.Link, so it wears the
     link's class and the Nav's line styles; the elements layer's button
     dressing, the raised pill, is set aside so it reads as one line among
     the links. The marker border on the start side is the Nav's own. */
  button.link {
    background: none;
    border-block: 0;
    border-inline-end: 0;
    box-shadow: none;
    inline-size: 100%;
    text-align: start;
  }
}
```

