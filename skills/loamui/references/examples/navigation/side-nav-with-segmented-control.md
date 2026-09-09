---
title: Side nav with segmented control
description: Vertical navigation in two sections, Account and Shop, switched by a segmented control above the list; the page holds which is shown.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Side nav with segmented control

Vertical navigation in two sections, Account and Shop, switched by a segmented control above the list; the page holds which is shown.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`, `SegmentedControl`
- Tags: sidebar, segmented control, radio, sections, switch
- Live: https://loamui.com/examples/navigation/side-nav-with-segmented-control

## Built to the pillars

- **Native CSS.** The switch is a native radio group in a fieldset, so the arrow keys move between Account and Shop as they do on any radios, and the chosen segment is drawn from the radio's own :checked.
- **Modern CSS.** The pill is core's, stretched across the column by two declarations from the example's own scope; the chosen state moves to the system highlight under forced colours in SegmentedControl's stylesheet, not here.
- **Composition.** SegmentedControl reports the choice through onValueChange and the example keeps it in state and maps it to a list of links; Nav renders whichever list it is given and knows nothing of the switch.
- **Accessible & gatekept.** The radio group is named Section by a legend that is read but not seen, the nav is named for the section it shows so a landmark list says which, and the current page stays marked in the Account list where it lives.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Nav, SegmentedControl } from "@loamui/core";
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

interface SectionLink {
  href: string;
  label: string;
  current?: boolean;
  glyph: ReactNode;
}

type Section = "account" | "shop";

const SECTIONS: Record<Section, { label: string; links: SectionLink[] }> = {
  account: {
    label: "Account",
    links: [
      {
        href: "/account",
        label: "Profile",
        current: true,
        glyph: (
          <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </>
        ),
      },
      {
        href: "/account/membership",
        label: "Membership",
        glyph: (
          <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 15h4M7 11h10" />
          </>
        ),
      },
      {
        href: "/account/orders",
        label: "Orders",
        glyph: (
          <>
            <path d="m3 8 9-5 9 5v8l-9 5-9-5z" />
            <path d="m3 8 9 5 9-5M12 13v8" />
          </>
        ),
      },
      {
        href: "/account/addresses",
        label: "Addresses",
        glyph: (
          <>
            <path d="M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.5" />
          </>
        ),
      },
      {
        href: "/account/notifications",
        label: "Notifications",
        glyph: (
          <>
            <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
            <path d="M10 21h4" />
          </>
        ),
      },
      {
        href: "/account/security",
        label: "Security",
        glyph: (
          <>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </>
        ),
      },
    ],
  },
  shop: {
    label: "Shop",
    links: [
      {
        href: "/shop/listings",
        label: "Listings",
        glyph: (
          <>
            <path d="M3 12V4h8l10 10-8 8z" />
            <circle cx="7.5" cy="8.5" r="1.5" />
          </>
        ),
      },
      {
        href: "/shop/stock",
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
        href: "/shop/pricing",
        label: "Pricing",
        glyph: (
          <>
            <path d="M8 19h9" />
            <path d="M7 12h6" />
            <path d="M16 5a4 4 0 0 0-7 3v11" />
          </>
        ),
      },
      {
        href: "/shop/delivery",
        label: "Delivery",
        glyph: (
          <>
            <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
          </>
        ),
      },
      {
        href: "/shop/payments",
        label: "Payments",
        glyph: (
          <>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M3 10h18" />
          </>
        ),
      },
      {
        href: "/shop/reviews",
        label: "Reviews",
        glyph: (
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z" />
        ),
      },
    ],
  },
};

const isSection = (value: string): value is Section => value in SECTIONS;

export default function Example() {
  const [section, setSection] = useState<Section>("account");
  const { label, links } = SECTIONS[section];
  return (
    <div className="side-nav-with-segmented-control">
      <SegmentedControl.Root
        name="section"
        value={section}
        onValueChange={(value) => {
          if (isSection(value)) setSection(value);
        }}
      >
        <SegmentedControl.Legend className="loam-VisuallyHidden">Section</SegmentedControl.Legend>
        <SegmentedControl.Item value="account">Account</SegmentedControl.Item>
        <SegmentedControl.Item value="shop">Shop</SegmentedControl.Item>
      </SegmentedControl.Root>
      <Nav.Root aria-label={label}>
        <Nav.List>
          {links.map((link) => (
            <Nav.Item key={link.href}>
              <Nav.Link href={link.href} current={link.current}>
                <svg {...icon}>{link.glyph}</svg>
                {link.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav.List>
      </Nav.Root>
    </div>
  );
}
```

## example.css

```css
/* The column: the switch above the Nav. The donut leaves both on their
   own styles; the switch is placed from a scope of its own below. */
@scope (.side-nav-with-segmented-control) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    inline-size: min(100%, 18rem);
  }
}

/* Core's SegmentedControl is an inline pill sized to its words; in a
   column it spans the width and the two segments share it, so each is
   half the pill and the chosen one reads as a tab across the top. The
   legend is hidden, so it takes no room in the row. */
@scope (.side-nav-with-segmented-control .loam-SegmentedControl) to ([class*="loam-"]) {
  :scope {
    display: block flex;
  }

  label.segment {
    flex: 1;
  }
}
```

