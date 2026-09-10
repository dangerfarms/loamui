---
title: Header with search
description: A site header with a search box: the brand, a few primary links, the site's search and the signed-in person's avatar linking to their account.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Header with search

A site header with a search box: the brand, a few primary links, the site's search and the signed-in person's avatar linking to their account.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Nav`, `Search`
- Tags: site header, search, avatar, account
- Live: https://loamui.com/examples/navigation/header-with-search

## Built to the pillars

- **Native CSS.** Search renders the search landmark around a real form, so Enter, the button and a GET to /search are the browser's; the account is a link because it goes somewhere.
- **Modern CSS.** One flex row that reflows by the header's own width: the search grows between the nav and the account where there is room, and each takes a row of its own where there is not.
- **Composition.** Nav, Search and Avatar come as they are; the header places the two landmarks from scopes of their own, moves Nav's current marker under the link by its public --loam-nav-current-edge, and never reaches inside them.
- **Accessible & gatekept.** The search box is named by a label that is read but not seen, the search button by hidden text beside its icon, and the account link the same way with the Avatar hidden, so nothing is announced twice.

## Example.tsx

```tsx
"use client";

import { Avatar, Nav, Search } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="header-with-search">
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
            <Nav.Link href="/guides">Guides</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>
      <Search.Root action="/search">
        <Search.Label>Search the catalogue</Search.Label>
        <Search.Input placeholder="Seeds, plants, guides" />
        <Search.Button>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="loam-VisuallyHidden">Search</span>
        </Search.Button>
      </Search.Root>
      <a className="account" href="/account">
        <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/96/96" aria-hidden />
        <span className="loam-VisuallyHidden">Your account</span>
      </a>
    </header>
  );
}
```

## example.css

```css
@scope (.header-with-search) to ([class*="loam-"]) {
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

  a.account {
    border-radius: var(--loam-radius-full);
    display: inline flex;
    margin-inline-start: auto;
  }
}

@scope (.header-with-search .loam-Nav) to ([class*="loam-"]) {
  :scope {
    /* A style query is answered by ancestors, so the edge is declared here,
       never on the link. */
    --loam-nav-current-edge: block-end;
  }

  ul.row {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
  }

  @container (inline-size < 48rem) {
    :scope {
      flex-basis: 100%;
      order: 2;
    }
  }
}

@scope (.header-with-search .loam-Search) to ([class*="loam-"]) {
  :scope {
    flex: 1 1 14rem;
    margin-inline-start: auto;
    max-inline-size: 24rem;
  }

  @container (inline-size < 48rem) {
    :scope {
      flex-basis: 100%;
      max-inline-size: none;
      order: 1;
    }
  }
}
```

