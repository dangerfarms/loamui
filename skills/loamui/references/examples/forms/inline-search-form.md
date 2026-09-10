---
title: Inline search form
description: A site search as it sits in a header: the search landmark with a box and an icon button on one line.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Inline search form

A site search as it sits in a header: the search landmark with a box and an icon button on one line.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Search`
- Tags: search, header, site search, landmark
- Live: https://loamui.com/examples/forms/inline-search-form

## Built to the pillars

- **Native CSS.** A native <search> landmark around a native form: Enter in the box or the button submits a GET to the action with the query under q, and type="search" keeps the platform's own clear affordance.
- **Modern CSS.** The landmark's own grid puts the box and the button on one row; the example adds a width cap that shrinks with the header rather than a breakpoint.
- **Composition.** Search.Root, Label, Input and Button as core ships them; the icon and its hidden word are ordinary children the Button detects as icon-only.
- **Accessible & gatekept.** The box is named by a label that is read but not seen, so the placeholder is a hint and never the name; the landmark is named "Search the catalogue" so a second search on the page is told apart in a landmark list; the button's name is hidden text, not the icon.

## Example.tsx

```tsx
"use client";

import { Search } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Search.Root className="inline-search-form" action="/search" aria-label="Search the catalogue">
      <Search.Label>Search the catalogue</Search.Label>
      <Search.Input placeholder="Seeds, plants, growers" autoComplete="off" />
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
  );
}
```

## example.css

```css
@scope (.inline-search-form) to ([class*="loam-"]) {
  :scope {
    inline-size: min(100%, 22rem);
  }
}
```

