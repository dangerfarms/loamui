---
title: Header with dropdowns
description: A site header whose primary row mixes plain links with two dropdowns, Learn and Support, that open lists of pages; a sign-in link and a signpost to join sit at the end.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Header with dropdowns

A site header whose primary row mixes plain links with two dropdowns, Learn and Support, that open lists of pages; a sign-in link and a signpost to join sit at the end.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Nav`, `SignpostLink`
- Tags: site header, dropdown, disclosure, navbar, primary nav
- Live: https://loamui.com/examples/navigation/header-with-menus

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** Every page in the two dropdowns is an anchor with an href in a list, and each panel is a native popover, so the top layer, light dismiss and Escape are the browser's; going somewhere is a link or a SignpostLink, never a Button.
- **Modern CSS.** One flex row that reflows by the header's own width, the nav dropping to a row of its own where the header is narrow; each panel tethers to its trigger by anchor positioning where the browser has it, and the marker's edge is set on the Root as a style query the links answer.
- **Composition.** The dropdowns are Nav's own disclosure: a Dropdown in an Item holds a DropdownTrigger, set like the links beside it, and a DropdownPanel holding a List of Links, so the example writes the row on the List and nothing else; there is no Menu here, and nothing is reached into.
- **Accessible & gatekept.** A dropdown of pages is a disclosure, not a menu: the trigger is a button reporting aria-expanded and aria-controls, and the panel holds plain links Tab walks like any others, with no menu roles or arrow-key model to learn; it opens on click and never on hover, so a keyboard and a touch screen open the same thing, and the current page carries aria-current on its link.

## Example.tsx

```tsx
"use client";

import { Nav, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="header-with-menus">
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
              <Nav.DropdownTrigger>Learn</Nav.DropdownTrigger>
              <Nav.DropdownPanel>
                <Nav.List>
                  <Nav.Item>
                    <Nav.Link href="/guides">Growing guides</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/guides/sowing-calendar">Sowing calendar</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/guides/seed-saving">Seed saving</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/courses">Courses</Nav.Link>
                  </Nav.Item>
                </Nav.List>
              </Nav.DropdownPanel>
            </Nav.Dropdown>
          </Nav.Item>
          <Nav.Item>
            <Nav.Dropdown>
              <Nav.DropdownTrigger>Support</Nav.DropdownTrigger>
              <Nav.DropdownPanel>
                <Nav.List>
                  <Nav.Item>
                    <Nav.Link href="/help">Help centre</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/help/delivery">Delivery and returns</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/contact">Contact us</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/accessibility">Accessibility</Nav.Link>
                  </Nav.Item>
                </Nav.List>
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
@scope (.header-with-menus) to ([class*="loam-"]) {
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

@scope (.header-with-menus .loam-Nav) to ([class*="loam-"]) {
  :scope {
    /* A style query is answered by ancestors, so the edge is declared here,
       never on the link. */
    --loam-nav-current-edge: block-end;
  }

  ul.row {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
  }

  @container (inline-size < 52rem) {
    :scope {
      flex-basis: 100%;
      order: 1;
    }
  }
}
```

