---
title: Card with badges
description: A place in a Card: a photo, its name with a Badge for where and when, a description, the amenities on site as an icon list, and a way to plan a visit.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card with badges

A place in a Card: a photo, its name with a Badge for where and when, a description, the amenities on site as an icon list, and a way to plan a visit.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`, `SignpostLink`
- Tags: place, venue, listing, amenities, location
- Live: https://loamui.com/examples/app-cards/card-with-badges

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The Card is an article named by its heading; the badges and the amenities are lists, each named for what it lists, so a reader can jump to On site and hear five items.
- **Modern CSS.** The amenities are an auto-fill grid over a minimum width, so a narrow Card stacks them and a wide one runs them across; the icons are sized in em to the text beside them.
- **Composition.** Badge and SignpostLink are dropped in as they come; the example arranges the column between them and never restyles a pill or the arrow.
- **Accessible & gatekept.** The photo has an empty alt because the heading names the place; each amenity is a word beside a hidden icon, so nothing is said by picture alone; the call to action is a link because it goes somewhere.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Badge, Card, SignpostLink } from "@loamui/core";
import "./example.css";

// One stroked path per amenity, drawn on a 24-unit grid in currentColor.
const AMENITIES = [
  { name: "Car park", d: "M5 11l2-5h10l2 5M4 11h16v6H4zM7 17v2M17 17v2M8 14h.01M16 14h.01" },
  {
    name: "Yard café",
    d: "M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 10h2a2 2 0 0 1 0 4h-2M4 21h14",
  },
  {
    name: "Step-free access",
    d: "M12 4a1.5 1.5 0 1 0 .01 0M11 7v6h5l3 5M11 13l-3 3M9 12a5 5 0 1 0 6 6",
  },
  { name: "Dogs on leads", d: "M4 10l4-4 4 3h5l3 3v3h-3l-2 5h-2l-1-4H8l-2 4H4z" },
  {
    name: "Toilets",
    d: "M8 4a2 2 0 1 0 .01 0M6 10h4v5H9v5H7v-5H6zM16 4a2 2 0 1 0 .01 0M14 10h4l1 5h-1v5h-4v-5h-1z",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <Card
      render={
        <article
          className="card-with-badges"
          aria-labelledby={`${instanceId}-card-with-badges-title`}
        />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/id/17/800/500"
        alt=""
        width="800"
        height="500"
      />
      <div className="head">
        <h3 id={`${instanceId}-card-with-badges-title`}>Hedgerow Nursery, Ludlow</h3>
        <ul className="tags" role="list" aria-label="Where and when">
          <li>
            <Badge>Shropshire</Badge>
          </li>
          <li>
            <Badge>Open Tuesday to Saturday</Badge>
          </li>
        </ul>
      </div>
      <p className="description">
        Four acres on the edge of Mortimer Forest: the seed house, two acres of stock beds, a walled
        garden that members can walk after closing, and a yard café that does a good bacon roll.
      </p>
      <p className="lead" id={`${instanceId}-card-with-badges-amenities`}>
        On site
      </p>
      <ul
        className="amenities"
        role="list"
        aria-labelledby={`${instanceId}-card-with-badges-amenities`}
      >
        {AMENITIES.map((amenity) => (
          <li key={amenity.name}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={amenity.d} />
            </svg>
            {amenity.name}
          </li>
        ))}
      </ul>
      <div className="actions">
        <SignpostLink href="/visit">Plan a visit</SignpostLink>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.card-with-badges) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-md);
    max-inline-size: 36rem;
  }

  img.media {
    aspect-ratio: 16 / 10;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  div.head {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  ul.tags {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      margin: 0;
    }
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  p.lead {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-xs);
    font-weight: 600;
    letter-spacing: 0.03em;
    margin: 0;
    text-transform: uppercase;
  }

  ul.amenities {
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs) var(--loam-space-md);
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      align-items: center;
      display: block flex;
      gap: var(--loam-space-xs);
      margin: 0;
    }

    svg {
      block-size: auto;
      color: var(--loam-color-fg-muted);
      flex: none;
      inline-size: 1.25em;
    }
  }

  div.actions {
    display: block flex;
    margin-block-start: var(--loam-space-xs);
  }
}
```

