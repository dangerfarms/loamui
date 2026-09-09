---
title: Side nav rail with tooltips
description: A narrow rail of icon-only links, each named by text that is read but not seen and shown in a tooltip on hover and on keyboard focus.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav rail with tooltips

A narrow rail of icon-only links, each named by text that is read but not seen and shown in a tooltip on hover and on keyboard focus.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Tooltip`
- Tags: sidebar, rail, icons, tooltip, compact
- Live: https://loamui.com/examples/navigation/side-nav-rail

## Built to the pillars

- **Native CSS.** Real anchors in a nav landmark, each named by hidden text beside its icon rather than a title attribute, so the name is there for a screen reader, a search and a touch screen where hover never happens.
- **Modern CSS.** The bubble is a native popover tethered by anchor positioning; side="right" is written with logical insets in Tooltip's stylesheet, so the bubble sits at the inline end and moves to the other side under right-to-left.
- **Composition.** Tooltip.Trigger is rendered as the anchor, so one element is the link, the trigger and the bubble's anchor at once, and Tooltip.Provider around the rail lets a neighbour's bubble open at once after the first. Nav is left out: Tooltip.Root wraps each link in an element of its own that Nav's donut stops at, so a Nav.Link inside a tooltip would get none of Nav's rules, and the rail draws its squares itself from the tokens Nav uses.
- **Accessible & gatekept.** The tooltip opens on keyboard focus as well as hover, stays while hovered, and closes on Escape without moving focus; it describes the link, whose name is the hidden text, so nothing depends on the bubble; the current page carries aria-current.

## Example.tsx

```tsx
"use client";

import type { ReactNode } from "react";
import { Tooltip } from "@loamui/core";
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

interface RailLink {
  href: string;
  label: string;
  current?: boolean;
  glyph: ReactNode;
}

const LINKS: RailLink[] = [
  {
    href: "/nursery",
    label: "Overview",
    glyph: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    href: "/nursery/orders",
    label: "Orders",
    current: true,
    glyph: (
      <>
        <path d="m3 8 9-5 9 5v8l-9 5-9-5z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </>
    ),
  },
  {
    href: "/nursery/stock",
    label: "Stock",
    glyph: (
      <>
        <path d="M12 21v-8" />
        <path d="M12 13c0-4 3-7 8-7-1 5-4 7-8 7z" />
        <path d="M12 13c0-3-2-5-6-5 1 4 3 5 6 5z" />
      </>
    ),
  },
  {
    href: "/nursery/growers",
    label: "Growers",
    glyph: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
      </>
    ),
  },
  {
    href: "/nursery/open-days",
    label: "Open days",
    glyph: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    href: "/nursery/settings",
    label: "Settings",
    glyph: (
      <>
        <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h10M18 17h2" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="17" r="2" />
      </>
    ),
  },
];

export default function Example() {
  return (
    <div className="side-nav-rail">
      <a className="brand" href="/">
        <svg {...icon}>
          <path d="M5 19c0-7 4-13 14-14-1 10-7 14-14 14z" />
          <path d="M5 19c3-5 6-8 9-10" />
        </svg>
        <span className="loam-VisuallyHidden">Hedgerow</span>
      </a>
      <Tooltip.Provider>
        <nav aria-label="Nursery">
          <ul role="list">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Tooltip.Root>
                  <Tooltip.Trigger
                    render={<a href={link.href} aria-current={link.current ? "page" : undefined} />}
                  >
                    <svg {...icon}>{link.glyph}</svg>
                    <span className="loam-VisuallyHidden">{link.label}</span>
                  </Tooltip.Trigger>
                  <Tooltip.Popup side="right">
                    {link.label}
                    <Tooltip.Arrow />
                  </Tooltip.Popup>
                </Tooltip.Root>
              </li>
            ))}
          </ul>
        </nav>
      </Tooltip.Provider>
    </div>
  );
}
```

## example.css

```css
/* A rail: one column as wide as its squares, the brand at the top and
   the links beneath. There is no Nav here on purpose: Tooltip.Root wraps
   each link in an element of its own, which is a limit of Nav's donut, so
   a Nav.Link inside a tooltip would never receive Nav's rules. The links
   are plain anchors in a plain nav, and the rail draws them itself from
   the same tokens Nav uses: a 2.75rem square, the target a thumb or a
   pointer hits reliably when there are no words to aim at, and the
   current page marked by a line and weight as well as a background. The
   Tooltips and their popups are core's, past the donut. */
@scope (.side-nav-rail) to ([class*="loam-"]) {
  :scope {
    --_square: 2.75rem;

    border-inline-end: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-md);
    inline-size: fit-content;
    justify-items: center;
    padding-block: var(--loam-space-md);
    padding-inline: var(--loam-space-sm);
  }

  /* The brand is the icon alone, named by hidden text, in a square the
     size of the links below so the column lines up. */
  a.brand {
    align-items: center;
    block-size: var(--_square);
    border-radius: var(--loam-radius-md);
    color: var(--loam-color-primary-strong);
    display: inline flex;
    inline-size: var(--_square);
    justify-content: center;

    svg {
      block-size: 1.75rem;
      inline-size: 1.75rem;
    }
  }

  /* The markers go; inside a nav every browser keeps the list's
     semantics, and the markup keeps role="list" besides. */
  ul {
    display: block grid;
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }
}

/* Each link sits inside a Tooltip.Root, core's span and a limit of the
   scope above, so the link is placed from the Tooltip's own scope: the
   wrapper a block so the line has no descender gap, and the link a
   square with the icon centred and a transparent start edge where the
   marker will go. */
@scope (.side-nav-rail .loam-Tooltip) to ([class*="loam-"]) {
  :scope {
    display: block flow;
  }

  a {
    align-items: center;
    block-size: var(--_square);
    border-inline-start: 2px solid transparent;
    border-radius: var(--loam-radius-md);
    color: var(--loam-color-fg);
    display: block flex;
    inline-size: var(--_square);
    justify-content: center;

    svg {
      block-size: auto;
      flex: none;
      inline-size: 1.25rem;
    }

    /* The current page: a line in the strong token and a background, so
       the state survives a flattened background; the line takes the
       system highlight in forced colours. */
    &[aria-current] {
      background: var(--loam-color-bg-subtle);
      border-color: var(--loam-color-primary-strong);
      color: var(--loam-color-fg-strong);

      @media (forced-colors: active) {
        border-color: Highlight;
      }
    }

    @media (hover: hover) {
      &:hover {
        background: var(--loam-color-bg-subtle);
        color: var(--loam-color-fg-strong);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      transition:
        background var(--loam-duration-sm) var(--loam-ease),
        border-color var(--loam-duration-sm) var(--loam-ease),
        color var(--loam-duration-sm) var(--loam-ease);
    }
  }
}
```

