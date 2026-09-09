---
title: Header with mega menu
description: A site header where Growing opens a wide panel: a grid of six guides with an icon, a title and a line each, and a strip at the foot pointing to the beginners' course.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Header with mega menu

A site header where Growing opens a wide panel: a grid of six guides with an icon, a title and a line each, and a strip at the foot pointing to the beginners' course.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`, `Popover`, `SignpostLink`
- Tags: site header, mega menu, popover, guides, navbar
- Live: https://loamui.com/examples/navigation/header-mega-menu

## Built to the pillars

- **Native CSS.** The panel is a native popover in the top layer, so light dismiss and Escape are the browser's, and every guide inside is a plain anchor; the panel opens on a press, not on hover, so a keyboard and a touch screen open the same thing.
- **Modern CSS.** The panel takes its width from Popover's public --loam-popover-size and the guides fill it with auto-fill columns, so two sit side by side where there is room and one where there is not; the foot strip spans edge to edge by giving the popup's padding back.
- **Composition.** Popover.Trigger is substituted through render for a bare button dressed as the links beside it, and the panel is Title, Description and the example's own grid: the popup's surface, tether and dismissal stay Popover's.
- **Accessible & gatekept.** The panel is a dialog named by its Title and described by its Description, its trigger reports aria-expanded and aria-haspopup, and each guide is named by its title and text together, so a screen reader hears what a link leads to before following it.

## Example.tsx

```tsx
"use client";

import type { ReactNode } from "react";
import { Nav, Popover, SignpostLink } from "@loamui/core";
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
            <Popover.Root>
              <Popover.Trigger render={<button type="button" className="trigger" />}>
                Growing
                <svg {...icon}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Popover.Trigger>
              <Popover.Popup>
                <Popover.Title>Growing with Hedgerow</Popover.Title>
                <Popover.Description>
                  Guides written by the co-op&rsquo;s growers, free to read.
                </Popover.Description>
                <ul className="guides" role="list">
                  {GUIDES.map((guide) => (
                    <li key={guide.href}>
                      <a href={guide.href}>
                        <svg {...icon}>{guide.glyph}</svg>
                        <span className="text">
                          <strong>{guide.title}</strong>
                          <span>{guide.text}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="foot">
                  <p>
                    <strong>New to growing?</strong> The beginners&rsquo; course runs every spring
                    on the Lower Field plot.
                  </p>
                  <SignpostLink href="/courses/beginners">See the course</SignpostLink>
                </div>
              </Popover.Popup>
            </Popover.Root>
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
/* The header is the container: the brand, the nav and the actions share
   a row where it has room, and the nav takes a row of its own beneath the
   other two where it has not. The donut leaves the Nav, the Popover and
   the SignpostLinks on their own styles. */
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

    > a {
      color: var(--loam-color-fg);
      font-size: var(--loam-text-sm);
      font-weight: 500;
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* Core's Nav, placed from its own scope: a flex row on the List, and the
   last row of the header where it is narrow. */
@scope (.header-mega-menu .loam-Nav) to ([class*="loam-"]) {
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

/* The Popover's trigger is a bare button, past the Nav's donut, dressed
   as the links beside it: the elements layer's raised pill is set aside
   for the line the Nav gives a link, with a transparent border on the
   start side where a link keeps its marker. aria-expanded turns the
   chevron. */
@scope (.header-mega-menu .loam-Popover) to ([class*="loam-"]) {
  button.trigger {
    align-items: center;
    background: none;
    border: 0;
    border-inline-start: 2px solid transparent;
    border-radius: var(--loam-radius-md);
    box-shadow: none;
    color: var(--loam-color-fg);
    display: block flex;
    font-size: var(--loam-text-md);
    font-weight: 400;
    gap: var(--loam-space-xs);
    line-height: 1.4;
    min-block-size: var(--loam-nav-link-size, 2.25rem);
    padding-block: var(--loam-space-xs);
    padding-inline: var(--loam-space-sm);

    svg {
      block-size: auto;
      inline-size: 1em;

      @media (prefers-reduced-motion: no-preference) {
        transition: rotate var(--loam-duration-sm) var(--loam-ease);
      }
    }

    &[aria-expanded="true"] {
      background: var(--loam-color-bg-subtle);
      color: var(--loam-color-fg-strong);

      svg {
        rotate: 180deg;
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
        color var(--loam-duration-sm) var(--loam-ease);
    }
  }
}

/* The panel is core's popup and carries its own class, so its contents
   have a scope of their own. It is widened through Popover's public
   --loam-popover-size and given that width outright, rather than sized
   to its content, so the grid of guides knows how many columns fit: two
   at the full width, one where the viewport is too narrow for two. */
@scope (.header-mega-menu .loam-Popover-popup) to ([class*="loam-"]) {
  :scope {
    --loam-popover-size: 38rem;

    inline-size: min(var(--loam-popover-size), 90vi);
  }

  /* Each guide is one link: an icon in the brand colour beside a title
     over a line of description, on a line that lights when hovered. */
  ul.guides {
    display: block grid;
    gap: var(--loam-space-xs);
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    list-style: none;
    margin-block: var(--loam-space-md) 0;
    margin-inline: 0;
    padding: 0;

    li {
      margin: 0;
    }

    a {
      align-items: start;
      border-radius: var(--loam-radius-md);
      color: var(--loam-color-fg);
      display: block flex;
      gap: var(--loam-space-sm);
      padding: var(--loam-space-sm);
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          background: var(--loam-color-bg-subtle);
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        transition: background var(--loam-duration-sm) var(--loam-ease);
      }
    }

    svg {
      block-size: 1.25em;
      color: var(--loam-color-primary-strong);
      flex: none;
      inline-size: 1.25em;
      margin-block-start: calc(var(--loam-space-xs) / 2);
    }

    span.text {
      display: block grid;
      gap: calc(var(--loam-space-xs) / 2);

      > span {
        color: var(--loam-color-fg-muted);
        font-size: var(--loam-text-xs);
      }
    }

    strong {
      color: var(--loam-color-fg-strong);
      font-size: var(--loam-text-sm);
      font-weight: 600;
    }
  }

  /* The strip at the foot spans the panel edge to edge, the way a
     separator would: the popup's padding is given back on three sides
     and the panel's radius is followed on the two bottom corners. */
  div.foot {
    align-items: center;
    background: var(--loam-color-bg-subtle);
    border-block-start: 1px solid var(--loam-color-line);
    border-end-end-radius: calc(var(--loam-radius-md) - 1px);
    border-end-start-radius: calc(var(--loam-radius-md) - 1px);
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm) var(--loam-space-md);
    justify-content: space-between;
    margin-block: var(--loam-space-md) calc(-1 * var(--loam-space-md));
    margin-inline: calc(-1 * var(--loam-space-md));
    padding: var(--loam-space-md);

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

