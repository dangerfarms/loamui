---
title: Card with icon features
description: A succulent bowl in a Card: a photograph, a gift Badge, a feature list, a Price and a link to the product page.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card with icon features

A succulent bowl in a Card: a photograph, a gift Badge, a feature list, a Price and a link to the product page.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`, `Price`, `SignpostLink`
- Tags: product, shop, features, price, plants
- Live: https://loamui.com/examples/app-cards/card-icon-features

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The Card is an article named by its heading, the price is a data element whose value is the number for machines, and the features are a list named for what it lists.
- **Modern CSS.** The foot is a wrapping flex row, so the price and the SignpostLink share a line where there is room and stack where there is not; the icons are sized in em to the text beside them.
- **Composition.** Price writes the amount and dresses the qualifier written as its child; Badge and SignpostLink come as they are, and the example only arranges the column between them.
- **Contextualism.** The flag is an info region, so the Badge takes the colour from where it sits, not from a prop; change the region to success for a sale and nothing else moves.
- **Accessible & gatekept.** The product link names its destination, the photo describes the actual planting, and decorative feature icons are hidden from assistive technology.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Badge, Card, Price, SignpostLink } from "@loamui/core";
import "./example.css";

// One stroked path per feature, drawn on a 24-unit grid in currentColor.
const FEATURES = [
  {
    name: "Mixed succulent plants",
    d: "M12 21V9M12 9C9 9 6 7 6 3c4 0 6 2 6 6zM12 13c0-4 2-6 6-6 0 4-3 6-6 6z",
  },
  {
    name: "Collection from the nursery",
    d: "M4 20h16M6 20V10l6-6 6 6v10M9 20v-4h6v4",
  },
  { name: "Glass bowl included", d: "M4 7h16M4 7c0 8 3 13 8 13s8-5 8-13M4 7c0-2 4-4 8-4s8 2 8 4" },
  {
    name: "Gift message available",
    d: "M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 8h10M7 12h7",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <Card
      render={
        <article
          className="card-icon-features"
          aria-labelledby={`${instanceId}-card-icon-features-title`}
        />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/id/530/800/500"
        alt="Rosette and trailing succulents planted in a clear glass bowl"
        width="800"
        height="500"
      />
      <div className="head">
        <h3 id={`${instanceId}-card-icon-features-title`}>Succulent bowl</h3>
        <p className="flag">
          <Badge>Gift idea</Badge>
        </p>
      </div>
      <p className="description">
        A mixed planting of rosette and trailing succulents in a clear glass bowl. Ready to display
        or give as a gift.
      </p>
      <ul className="features" role="list" aria-label="What you get">
        {FEATURES.map((feature) => (
          <li key={feature.name}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={feature.d} />
            </svg>
            {feature.name}
          </li>
        ))}
      </ul>
      <div className="foot">
        <p className="price">
          <Price value={18.5} currency="GBP" locale="en-GB">
            per bowl
          </Price>
        </p>
        <div className="actions">
          <SignpostLink href="/shop/succulent-bowl">View succulent bowl</SignpostLink>
        </div>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.card-icon-features) to ([class*="loam-"]) {
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
    align-items: start;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    justify-content: space-between;
  }

  h3 {
    flex: 1 1 14rem;
    font-size: var(--loam-text-lg);
    margin: 0;
    text-wrap: balance;
  }

  p.flag {
    --loam-context: info;

    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  ul.features {
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      align-items: center;
      display: block flex;
      gap: var(--loam-space-sm);
      margin: 0;
    }

    svg {
      block-size: auto;
      color: var(--loam-color-primary-strong);
      flex: none;
      inline-size: 1.25em;
    }
  }

  div.foot {
    align-items: center;
    border-block-start: 1px solid var(--loam-color-line);
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
    justify-content: space-between;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-md);
  }

  p.price {
    color: var(--loam-color-fg-strong);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-xl);
    font-weight: 700;
    margin: 0;
  }

  div.actions {
    display: block grid;
    flex: 1 1 12rem;
  }
}
```

