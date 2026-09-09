---
title: Side nav
description: Vertical navigation for an application: a titled list of links with an icon before each and the current page marked.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav

Vertical navigation for an application: a titled list of links with an icon before each and the current page marked.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`
- Tags: sidebar, app shell, vertical nav, icons
- Live: https://loamui.com/examples/navigation/side-nav

## Built to the pillars

- **Native CSS.** A nav landmark named by its own Title, Nursery, so the words are written once; the links are real anchors and the icons inline svgs before their text.
- **Composition.** Nav's parts are arranged in the markup and nothing else is written: the column around it sets a width and the example's stylesheet is a single rule.
- **Accessible & gatekept.** The current page carries aria-current and is marked by a line and weight as well as a background, so it survives forced colours; each icon is aria-hidden so a link is named by its words alone.

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
    <div className="side-nav">
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
        </Nav.List>
      </Nav.Root>
    </div>
  );
}
```

## example.css

```css
/* The column the nav lives in. Width is the layout's decision, here a
   column of 18rem or the space available; the Nav inside takes whatever
   its column gives it and keeps its own styles behind the donut. */
@scope (.side-nav) to ([class*="loam-"]) {
  :scope {
    inline-size: min(100%, 18rem);
  }
}
```

