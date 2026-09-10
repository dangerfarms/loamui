---
title: Product card
description: One product in a listing: a picture, a linked name, its rating and review count, a reduced price with the old one struck through, and one action.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Product card

One product in a listing: a picture, a linked name, its rating and review count, a reduced price with the old one struck through, and one action.

An example in **Commerce**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Button`, `Card`, `Price`, `Rating`
- Tags: shop, listing, price, sale, add to basket
- Live: https://loamui.com/examples/commerce/product-card

## Built to the pillars

- **Native CSS.** The Card is rendered as an article named by its heading, the old price is an s element, and each price is a data element whose value is the number for machines.
- **Modern CSS.** A flex column with the action's auto margin taking the slack, so every button in a row of cards lands at the same foot; the picture is cropped square by aspect-ratio and object-fit.
- **Composition.** Card, Rating, Price, Badge and Button are used as they come; the Rating takes the row's small type and the Prices take the paragraph's, since neither sizes itself.
- **Contextualism.** The offer sits in a success region and the action in a primary one, so the Badge and the Button take their colours from where they are, not from a prop; primary is the brand slot, neutral until a theme fills it, so the row says where the action belongs rather than making it stand out.
- **Accessible & gatekept.** The name is the link and the card is not; the reduction is read as "Was £3.50 Now £2.80" through hidden words rather than left to the strike; the button's name is "Add Climbing bean ‘Blue Lake’ seeds to basket", so a listing of buttons tells them apart.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Badge, Button, Card, Price, Rating } from "@loamui/core";
import "./example.css";

export default function Example() {
  const title = useId();
  return (
    <Card render={<article className="product-card" aria-labelledby={title} />}>
      <img
        className="media"
        src="https://picsum.photos/id/627/600/600"
        alt="Freshly picked green pods heaped in a crate on the bench"
        width="600"
        height="600"
      />
      <p className="meta">
        <Badge>Save 20%</Badge>
      </p>
      <h3 id={title}>
        <a href="/seeds/climbing-bean-blue-lake">Climbing bean ‘Blue Lake’ seeds</a>
      </h3>
      <div className="rating">
        <Rating readOnly label="Average rating" value={4.5} />
        <span>
          (128<span className="loam-VisuallyHidden"> reviews</span>)
        </span>
      </div>
      <p className="price">
        <span className="loam-VisuallyHidden">Was </span>
        <s>
          <Price value={3.5} currency="GBP" locale="en-GB" />
        </s>{" "}
        <span className="loam-VisuallyHidden">Now </span>
        <Price value={2.8} currency="GBP" locale="en-GB" />
      </p>
      <div className="actions">
        <Button>
          Add<span className="loam-VisuallyHidden"> Climbing bean ‘Blue Lake’ seeds</span> to basket
        </Button>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.product-card) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
    max-inline-size: 22rem;
  }

  img.media {
    aspect-ratio: 1;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    --loam-context: success;

    margin: 0;
  }

  /* Underlined at rest, lightly: a link is known by more than its place. */
  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;

    a {
      color: inherit;
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

  div.rating {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs);
  }

  p.price {
    font-size: var(--loam-text-lg);
    font-weight: 700;
    margin: 0;

    s {
      color: var(--loam-color-fg-muted);
      font-weight: 400;
      margin-inline-end: var(--loam-space-xs);
    }
  }

  div.actions {
    --loam-context: primary;

    display: block grid;
    margin-block-start: auto;
  }
}
```

