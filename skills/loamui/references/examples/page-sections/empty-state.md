---
title: Empty state
description: What an orders page shows before there is anything in it: a picture, what the place is for, and one next step, in a Card.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Empty state

What an orders page shows before there is anything in it: a picture, what the place is for, and one next step, in a Card.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `SignpostLink`
- Tags: empty, no results, onboarding, orders
- Live: https://loamui.com/examples/page-sections/empty-state

## Built to the pillars

- **Native CSS.** A heading and a paragraph in a div: the Card already holds it, and a list that loaded empty is the page as it is, so there is no landmark and no live region to announce nothing happening.
- **Modern CSS.** One centred grid column with the paragraph capped at the measure token; the Card decides the width and the fluid tokens answer it.
- **Composition.** Card is rendered as the root div through render, so the surface and the column are one element, and SignpostLink is the one next step; neither's own styles are touched.
- **Accessible & gatekept.** The picture is aria-hidden because the title already says what it shows, and the next step is a single link rather than a menu of them.

## Example.tsx

```tsx
import { Card, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<div className="empty-state" />}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 14h32v38H16Z" />
        <path d="m16 14 16 10 16-10" />
        <path d="M32 46V32" />
        <path d="M32 36c0-4 3-7 8-7 0 4-3 7-8 7Z" />
        <path d="M32 40c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
      </svg>
      <h2>No orders yet</h2>
      <p>
        When you place an order it appears here, with its progress from the packing bench to your
        door and the growing guide for everything in it.
      </p>
      <div className="actions">
        <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
      </div>
    </Card>
  );
}
```

## example.css

```css
/* An empty state on a Card: a centred column of picture, title, a line
   on why it is empty and one next step. The Card is rendered as a div,
   because a section would be one landmark too many for a list that is
   simply empty; it is the scope root, so its own surface, line, radius
   and padding are left alone, and the SignpostLink inside stays behind
   the donut. The Card decides the width and the fluid tokens answer it. */
@scope (.empty-state) to ([class*="loam-"]) {
  :scope {
    align-content: center;
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    justify-items: center;
    padding-block: var(--loam-space-xl);
    text-align: center;
  }

  /* The picture is decorative and set dim, so it sits behind the title
     rather than competing with it. */
  svg {
    block-size: 4rem;
    color: var(--loam-color-fg-dim);
    inline-size: 4rem;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin: 0;
  }

  p {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    justify-content: center;
  }
}
```

