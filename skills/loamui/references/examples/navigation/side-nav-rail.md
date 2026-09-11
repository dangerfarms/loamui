---
title: Side nav rail with tooltips
description: A narrow rail of icon-only links, each named by text that is read but not seen and shown in a tooltip on hover and on keyboard focus.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav rail with tooltips

A narrow rail of icon-only links, each named by text that is read but not seen and shown in a tooltip on hover and on keyboard focus.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`, `Tooltip`
- Tags: sidebar, rail, icons, tooltip, compact
- Live: https://loamui.com/examples/navigation/side-nav-rail

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** Real anchors in a nav landmark named Nursery, each named by hidden text beside its icon rather than a title attribute, so the name is there for a screen reader, a search and a touch screen where hover never happens.
- **Modern CSS.** The bubble is a native popover tethered by anchor positioning; side="right" is written with logical insets in Tooltip's stylesheet, so the bubble sits at the inline end and moves to the other side under right-to-left; the square is Nav's public --loam-nav-link-size, declared once on the rail and inherited by every line.
- **Composition.** The rail is a Nav: Root, List and Items, with each Tooltip.Trigger rendered as a Nav.Link, so one anchor is the link, the trigger and the bubble's anchor at once. Nav sets its lines from the link itself rather than from the landmark, so a link inside the Tooltip's own wrapper is still one of Nav's lines, and the example draws nothing by hand: it sizes the square, sizes its icon and makes the wrapper a block.
- **Accessible & gatekept.** The tooltip opens on keyboard focus as well as hover, stays while hovered, and closes on Escape without moving focus; it describes the link, whose name is the hidden text, so nothing depends on the bubble; the current page carries aria-current and Nav marks it by a line and weight as well as a background.

## Example.tsx

```tsx
"use client";

import type { ReactNode } from "react";
import { Nav, Tooltip } from "@loamui/core";
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
        <Nav.Root aria-label="Nursery">
          <Nav.List>
            {LINKS.map((link) => (
              <Nav.Item key={link.href}>
                <Tooltip.Root>
                  <Tooltip.Trigger render={<Nav.Link href={link.href} current={link.current} />}>
                    <svg {...icon}>{link.glyph}</svg>
                    <span className="loam-VisuallyHidden">{link.label}</span>
                  </Tooltip.Trigger>
                  <Tooltip.Popup side="right">
                    {link.label}
                    <Tooltip.Arrow />
                  </Tooltip.Popup>
                </Tooltip.Root>
              </Nav.Item>
            ))}
          </Nav.List>
        </Nav.Root>
      </Tooltip.Provider>
    </div>
  );
}
```

## example.css

```css
@scope (.side-nav-rail) to ([class*="loam-"]) {
  :scope {
    /* Nav's public line height, inherited by every link: a square a thumb
       hits reliably when there are no words to aim at. */
    --loam-nav-link-size: 2.75rem;

    border-inline-end: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-md);
    inline-size: fit-content;
    justify-items: center;
    padding-block: var(--loam-space-md);
    padding-inline: var(--loam-space-sm);
  }

  a.brand {
    align-items: center;
    block-size: var(--loam-nav-link-size);
    border-radius: var(--loam-radius-md);
    color: var(--loam-color-primary-strong);
    display: inline flex;
    inline-size: var(--loam-nav-link-size);
    justify-content: center;

    svg {
      block-size: 1.75rem;
      inline-size: 1.75rem;
    }
  }
}

/* Tooltip.Root is a span around each link; a block here, so the column is
   the links alone with no line box under each. The icon is the example's
   own, sized to fill the square. */
@scope (.side-nav-rail .loam-Tooltip) to ([class*="loam-"]) {
  :scope {
    display: block flow;
  }

  svg {
    inline-size: 1.75rem;
  }
}
```

