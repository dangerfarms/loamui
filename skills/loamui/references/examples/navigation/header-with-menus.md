---
title: Header with menus
description: A site header whose primary row mixes plain links with two menus, Learn and Support, that drop down lists of pages; a sign-in link and a signpost to join sit at the end.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Header with menus

A site header whose primary row mixes plain links with two menus, Learn and Support, that drop down lists of pages; a sign-in link and a signpost to join sit at the end.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Menu`, `Nav`, `SignpostLink`
- Tags: site header, dropdown, menu, navbar, primary nav
- Live: https://loamui.com/examples/navigation/header-with-menus

## Built to the pillars

- **Native CSS.** Every item in the two menus is an anchor with an href, and a menu opens on click, Enter or an arrow key rather than on hover alone, so a keyboard, a touch screen and a pointer all reach the same pages; going somewhere is a link or a SignpostLink, never a Button.
- **Modern CSS.** One flex row that reflows by the header's own width, the nav dropping to a row of its own where the header is narrow; each popup tethers to its trigger by anchor positioning in the top layer where the browser has it.
- **Composition.** Each Menu sits in a Nav.Item with its trigger substituted through render for a bare button dressed as the links beside it, so the row reads as one nav while the popups, their keys and their dismissal stay Menu's.
- **Accessible & gatekept.** A trigger reports its state with aria-expanded and the chevron turns from that same attribute; inside a menu, arrow keys, typeahead, Escape and focus return are Menu's own, and the current page carries aria-current on its link.

## Example.tsx

```tsx
"use client";

import { Menu, Nav, SignpostLink } from "@loamui/core";
import "./example.css";

function Chevron() {
  return (
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
  );
}

export default function Example() {
  return (
    <header className="header-with-menus">
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
            <Menu.Root>
              <Menu.Trigger render={<button type="button" className="trigger" />}>
                Learn
                <Chevron />
              </Menu.Trigger>
              <Menu.Popup>
                <Menu.Item href="/guides">Growing guides</Menu.Item>
                <Menu.Item href="/guides/sowing-calendar">Sowing calendar</Menu.Item>
                <Menu.Item href="/guides/seed-saving">Seed saving</Menu.Item>
                <Menu.Item href="/courses">Courses</Menu.Item>
              </Menu.Popup>
            </Menu.Root>
          </Nav.Item>
          <Nav.Item>
            <Menu.Root>
              <Menu.Trigger render={<button type="button" className="trigger" />}>
                Support
                <Chevron />
              </Menu.Trigger>
              <Menu.Popup>
                <Menu.Item href="/help">Help centre</Menu.Item>
                <Menu.Item href="/help/delivery">Delivery and returns</Menu.Item>
                <Menu.Item href="/contact">Contact us</Menu.Item>
                <Menu.Separator />
                <Menu.Item href="/accessibility">Accessibility</Menu.Item>
              </Menu.Popup>
            </Menu.Root>
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
   other two where it has not. The donut leaves the Nav, the Menus and the
   SignpostLink on their own styles. */
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

    /* Sign in is a plain link set in the page's text colour: it sits
       beside the signpost, and the row reads as two ways in. */
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
@scope (.header-with-menus .loam-Nav) to ([class*="loam-"]) {
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

/* Each Menu's trigger is a bare button, past the Nav's donut, dressed as
   the links beside it: the elements layer's raised pill is set aside for
   the line the Nav gives a link, with the same line height through Nav's public --loam-nav-link-size, type and radius,
   and a transparent border on the start side where a link keeps its
   marker, so the row lines up. An open menu is said by aria-expanded,
   which the chevron turns on; the popup keeps Menu's own styles. */
@scope (.header-with-menus .loam-Menu) to ([class*="loam-"]) {
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
```

