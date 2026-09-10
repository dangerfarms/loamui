---
title: Card with icon features
description: A plant collection in a Card: a photo, a title with a Badge saying it is new, a description, what you get as an icon list, the Price for the set, and a Button that adds it to the basket.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card with icon features

A plant collection in a Card: a photo, a title with a Badge saying it is new, a description, what you get as an icon list, the Price for the set, and a Button that adds it to the basket.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Button`, `Card`, `Price`
- Tags: product, shop, features, price, plants
- Live: https://loamui.com/examples/app-cards/card-icon-features

## Built to the pillars

- **Native CSS.** The Card is an article named by its heading, the price is a data element whose value is the number for machines, and the features are a list named for what it lists.
- **Modern CSS.** The foot is a wrapping flex row, so the price and the Button share a line where there is room and stack where there is not; the icons are sized in em to the text beside them.
- **Composition.** Price writes the amount and dresses the qualifier written as its child; Badge and Button come as they are, and the example only arranges the column between them.
- **Contextualism.** The flag is an info region, so the Badge takes the colour from where it sits, not from a prop; change the region to success for a sale and nothing else moves.
- **Accessible & gatekept.** The Button's name completes in hidden text to what it adds, so a page of these reads apart; the photo's alt says what is in it because the picture is the product; the icons are hidden because the words beside them already say it.

## Example.tsx

```tsx
import { Badge, Button, Card, Price } from "@loamui/core";
import "./example.css";

// One stroked path per feature, drawn on a 24-unit grid in currentColor.
const FEATURES = [
  {
    name: "Six plants, hardened off",
    d: "M12 21V9M12 9C9 9 6 7 6 3c4 0 6 2 6 6zM12 13c0-4 2-6 6-6 0 4-3 6-6 6z",
  },
  {
    name: "Posted in the second week of May",
    d: "M2 7h11v9H2zM13 10h4l3 3v3h-7M5 19a2 2 0 1 0 .01 0M18 19a2 2 0 1 0 .01 0",
  },
  { name: "Peat-free compost", d: "M4 20h16M6 20V10l6-6 6 6v10M9 20v-4h6v4" },
  {
    name: "Raised from the co-op’s own seed",
    d: "M4 20c0-8 6-12 16-12-2 8-8 12-16 12zM4 20c4-4 8-6 12-8",
  },
];

export default function Example() {
  return (
    <Card
      render={<article className="card-icon-features" aria-labelledby="card-icon-features-title" />}
    >
      <img
        className="media"
        src="https://picsum.photos/id/530/800/500"
        alt="Succulents and young plants in a glass propagation case on the greenhouse bench"
        width="800"
        height="500"
      />
      <div className="head">
        <h3 id="card-icon-features-title">Tomato ‘Gardener’s Delight’ plant collection</h3>
        <p className="flag">
          <Badge>New for 2027</Badge>
        </p>
      </div>
      <p className="description">
        Six cordon plants, potted on twice and hardened off in the yard before they leave, so they
        go straight into a greenhouse border or a grow bag.
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
            for six plants
          </Price>
        </p>
        <div className="actions">
          <Button>
            Add<span className="loam-VisuallyHidden"> the Gardener’s Delight collection</span> to
            basket
          </Button>
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

