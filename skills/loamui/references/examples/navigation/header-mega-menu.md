---
title: Header with mega menu
description: A site header where Growing opens a wide panel: a grid of six guides with an icon, a title and a line each, and a strip at the foot pointing to the beginners' course.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Header with mega menu

A site header where Growing opens a wide panel: a grid of six guides with an icon, a title and a line each, and a strip at the foot pointing to the beginners' course.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`, `SignpostLink`
- Tags: site header, mega menu, dropdown, guides, navbar
- Live: https://loamui.com/examples/navigation/header-mega-menu

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The panel is a native popover in the top layer, so light dismiss and Escape are the browser's, and every guide inside is an anchor in a list; the panel opens on a press, not on hover, so a keyboard and a touch screen open the same thing.
- **Modern CSS.** The panel's width is Nav's public --loam-nav-dropdown-size, raised to 32rem on the Root where the panel reads it, and the guides fill it with auto-fill columns, so two sit side by side where there is room and one where there is not; the strip at the foot is a box with its own padding inside the panel's.
- **Composition.** The wide panel is Nav's own disclosure: a Dropdown in an Item holds a DropdownTrigger, set like the links beside it, and a DropdownPanel holding a List of Links; each guide is a Nav.Link with the example's own icon and two lines of words inside, so the grid, the words and the foot are the example's and the lines, the surface, the tether and the dismissal stay Nav's.
- **Accessible & gatekept.** A panel of pages is a disclosure, not a menu or a dialog: the trigger is a button reporting aria-expanded and aria-controls, and the panel holds plain links Tab walks like any others, with no menu roles to learn; it opens on click and never on hover, and each guide is named by its title and text together, so a screen reader hears what a link leads to before following it.

## Example.tsx

```tsx
"use client";

import type { ReactNode } from "react";
import { Nav, SignpostLink } from "@loamui/core";
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

interface Guide {
  href: string;
  title: string;
  text: string;
  glyph: ReactNode;
}

const GUIDES: Guide[] = [
  {
    href: "/growing/sowing-calendar",
    title: "Sowing calendar",
    text: "What to sow this month, by crop and by region.",
    glyph: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    href: "/growing/seed-saving",
    title: "Seed saving",
    text: "Keep a variety going: isolation, harvest and storage.",
    glyph: <path d="M12 3c4 4 6 7 6 11a6 6 0 0 1-12 0c0-4 2-7 6-11z" />,
  },
  {
    href: "/growing/soil",
    title: "Soil and compost",
    text: "Feed the ground the plants grow in, and make your own.",
    glyph: (
      <>
        <path d="M3 9h18M3 13h18M3 17h18" />
        <path d="M12 3v6" />
      </>
    ),
  },
  {
    href: "/growing/pests",
    title: "Pests and diseases",
    text: "Spot trouble early and deal with it without a spray.",
    glyph: (
      <>
        <circle cx="12" cy="13" r="6" />
        <path d="M12 7V4M8 9 5 6M16 9l3-3M4 14h4M16 14h4M6 20l3-3M18 20l-3-3" />
      </>
    ),
  },
  {
    href: "/growing/plot-planning",
    title: "Plot planning",
    text: "Rotations, companions and what fits in a small space.",
    glyph: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18M12 3v18" />
      </>
    ),
  },
  {
    href: "/growing/watering",
    title: "Watering",
    text: "How much, how often, and when to leave it alone.",
    glyph: (
      <>
        <path d="M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3z" />
        <path d="M4 20h16" />
      </>
    ),
  },
];

export default function Example() {
  return (
    <header className="header-mega-menu">
      <a className="brand" href="/">
        <svg {...icon}>
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
            <Nav.Dropdown>
              <Nav.DropdownTrigger>Growing</Nav.DropdownTrigger>
              <Nav.DropdownPanel>
                <Nav.List className="guides">
                  {GUIDES.map((guide) => (
                    <Nav.Item key={guide.href}>
                      <Nav.Link href={guide.href}>
                        <svg {...icon}>{guide.glyph}</svg>
                        <span className="text">
                          <strong>{guide.title}</strong>
                          <span>{guide.text}</span>
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav.List>
                <div className="foot">
                  <p>
                    <strong>New to growing?</strong> The beginners&rsquo; course runs every spring
                    on the Lower Field plot.
                  </p>
                  <SignpostLink href="/courses/beginners">See the course</SignpostLink>
                </div>
              </Nav.DropdownPanel>
            </Nav.Dropdown>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/events">Open days</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
      <div className="actions">
        <a href="/sign-in">Sign in</a>
        <SignpostLink href="/membership/join">Join the co-op</SignpostLink>
      </div>
    </header>
  );
}
```

## example.css

```css
@scope (.header-mega-menu) to ([class*="loam-"]) {
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
    gap: var(--loam-space-md);
    margin-inline-start: auto;

    /* Underlined at rest, lightly: a link is known by more than its place. */
    > a {
      color: var(--loam-color-fg);
      font-size: var(--loam-text-sm);
      font-weight: 500;
      text-decoration-color: var(--loam-color-line-strong);

      &:focus-visible {
        text-decoration-color: currentcolor;
      }

      @media (hover: hover) {
        &:hover {
          text-decoration-color: var(--loam-color-primary);
        }
      }
    }
  }
}

@scope (.header-mega-menu .loam-Nav) to ([class*="loam-"]) {
  :scope {
    /* Both are read by descendants (a style query, the panel's width), so
       they are declared here, never on a link or the panel. */
    --loam-nav-current-edge: block-end;
    --loam-nav-dropdown-size: 32rem;
  }

  ul.row {
    align-items: center;
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

/* The panel is a loam- root of its own, so what the example lays inside
   it has a scope of its own: the grid on the List, the words inside each
   link, and the strip at the foot. The links themselves are Nav's lines. */
@scope (.header-mega-menu .loam-Nav-dropdown) to ([class*="loam-"]) {
  ul.guides {
    gap: var(--loam-space-xs);
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));

    svg {
      align-self: start;
      color: var(--loam-color-primary-strong);
    }
  }

  span.text {
    display: block grid;
    gap: calc(var(--loam-space-xs) / 2);

    > span {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-xs);
    }

    strong {
      color: var(--loam-color-fg-strong);
      font-size: var(--loam-text-sm);
      font-weight: 600;
    }
  }

  div.foot {
    align-items: center;
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-sm);
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm) var(--loam-space-md);
    justify-content: space-between;
    margin-block-start: var(--loam-space-xs);
    padding-block: var(--loam-space-sm);
    padding-inline: var(--loam-space-md);

    p {
      color: var(--loam-color-fg-muted);
      flex: 1 1 16rem;
      font-size: var(--loam-text-sm);
      margin: 0;

      strong {
        color: var(--loam-color-fg-strong);
      }
    }
  }
}
```

