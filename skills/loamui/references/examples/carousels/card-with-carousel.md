---
title: Card with a carousel
description: A stay in a Card: a Carousel of three photos with its controls beneath, the name and a Rating with the review count, a description and the Price per night.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card with a carousel

A stay in a Card: a Carousel of three photos with its controls beneath, the name and a Rating with the review count, a description and the Price per night.

An example in **Carousels**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Carousel`, `Price`, `Rating`
- Tags: carousel, booking, stay, gallery, photos, rating
- Live: https://loamui.com/examples/carousels/card-with-carousel

## Built to the pillars

- **Native CSS.** The photos scroll on an ordinary scroll-snap track, so a swipe or the arrow keys page them with no JavaScript; the rating is one picture named 4.8 out of 5 and the price is a data element whose value is the number.
- **Modern CSS.** The Carousel's item width is its public property, set to 100% on the Card so it inherits down and each photo fills the track; the price takes the display face from the paragraph around it.
- **Composition.** A Carousel sits inside a Card the way any content would, its own region inside the article; Rating and Price are dropped in as they come, and the example reaches into none of them.
- **Accessible & gatekept.** The carousel is named Photos of the Orchard Cabin and every photo has an alt that says what is in it, because here the pictures are the content; the controls and the dots are named through labels, and the review count finishes in a hidden word.

## Example.tsx

```tsx
"use client";

import { Card, Carousel, Price, Rating } from "@loamui/core";
import "./example.css";

const PHOTOS = [
  {
    seed: 206,
    alt: "The cabin at the edge of the orchard in evening light",
  },
  {
    seed: 225,
    alt: "A pot of tea and a cup on the cabin’s kitchen table",
  },
  {
    seed: 33,
    alt: "The meadow beside the cabin at dusk, seen from the porch",
  },
];

export default function Example() {
  return (
    <Card
      render={<article className="card-with-carousel" aria-labelledby="card-with-carousel-title" />}
    >
      <Carousel.Root
        className="photos"
        labels={{
          region: "Photos of the Orchard Cabin",
          previous: "Previous photo",
          next: "Next photo",
          indicator: (index, count) => `Go to photo ${index} of ${count}`,
          status: (index, count) => `Photo ${index} of ${count}`,
        }}
      >
        <Carousel.Track>
          {PHOTOS.map((photo) => (
            <Carousel.Item key={photo.seed}>
              <img
                src={`https://picsum.photos/id/${photo.seed}/640/400`}
                alt={photo.alt}
                width="640"
                height="400"
                loading="lazy"
              />
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <div className="controls">
          <Carousel.Previous />
          <Carousel.Indicators />
          <Carousel.Next />
        </div>
      </Carousel.Root>
      <div className="head">
        <h3 id="card-with-carousel-title">The Orchard Cabin</h3>
        <p className="rating">
          <Rating readOnly label="Average rating" value={4.8} />
          <span>
            (63<span className="loam-VisuallyHidden"> reviews</span>)
          </span>
        </p>
      </div>
      <p className="description">
        Two nights at the nursery, sleeping four, with the walled garden to yourselves once the
        gates close and breakfast from the yard café.
      </p>
      <p className="price">
        <Price value={145} currency="GBP" locale="en-GB">
          per night
        </Price>
      </p>
    </Card>
  );
}
```

## example.css

```css
@scope (.card-with-carousel) to ([class*="loam-"]) {
  :scope {
    --loam-carousel-item-size: 100%;

    display: block grid;
    gap: var(--loam-space-sm);
    max-inline-size: 36rem;
  }

  div.head {
    align-items: baseline;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs) var(--loam-space-md);
    justify-content: space-between;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p.rating {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    gap: var(--loam-space-xs);
    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  p.price {
    color: var(--loam-color-fg-strong);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-xl);
    font-weight: 700;
    margin: 0;
  }
}

@scope (.card-with-carousel section.photos) to ([class*="loam-"]) {
  img {
    aspect-ratio: 16 / 10;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  div.controls {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    justify-content: center;
  }
}
```

