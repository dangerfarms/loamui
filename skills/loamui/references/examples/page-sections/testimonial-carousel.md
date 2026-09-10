---
title: Testimonial carousel
description: Three quotations in Cards riding a Carousel, with Previous and Next, dots and a heading that names the region.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Testimonial carousel

Three quotations in Cards riding a Carousel, with Previous and Next, dots and a heading that names the region.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Card`, `Carousel`
- Tags: quotes, reviews, slider, social proof
- Live: https://loamui.com/examples/page-sections/testimonial-carousel

## Built to the pillars

- **Native CSS.** The track is a native scroller with snap points, so a wheel, a swipe and the arrow keys all work before any script; each quote is a figure with a blockquote and a figcaption.
- **Modern CSS.** The item width is the Carousel's public --loam-carousel-item-size, set on the region, and the caption sits at the foot with an auto margin so a row of stretched Cards lines up.
- **Composition.** Carousel, Card and Avatar are assembled from their parts; the example writes the heading and the control row and reaches the figure's insides from a second scope rooted at the Card.
- **Accessible & gatekept.** The region is named by the visible heading through aria-labelledby, and Previous and Next carry their names as visually hidden text beside the chevrons rather than as a label prop.

## Example.tsx

```tsx
"use client";

import { Avatar, Card, Carousel } from "@loamui/core";
import "./example.css";

const TESTIMONIALS = [
  {
    quote:
      "I joined for the seed and stayed for the people. Every packet I have grown from has come true, and the guides read like a neighbour talking you through it.",
    name: "Mari Hughes",
    role: "Member since 2019, Ludlow",
  },
  {
    quote:
      "We run a school garden on a shoestring. The trade prices and the germination rates on every packet mean nothing we sow with the children is a gamble.",
    name: "Dafydd Rees",
    role: "Teacher, Clun",
  },
  {
    quote:
      "The Crimson Flowered broad bean I bought in 2021 has been my own seed ever since. That is what open-pollinated means, and Hedgerow told me so on the packet.",
    name: "Amara Okonkwo",
    role: "Allotment holder, Shrewsbury",
  },
];

function Chevron({ direction }: { direction: -1 | 1 }) {
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
      <polyline points={direction === -1 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export default function Example() {
  return (
    <Carousel.Root className="testimonial-carousel" aria-labelledby="testimonial-carousel-title">
      <h2 id="testimonial-carousel-title">What members say</h2>
      <Carousel.Track>
        {TESTIMONIALS.map((testimonial) => (
          <Carousel.Item key={testimonial.name}>
            <Card render={<figure className="quote" />}>
              <blockquote>
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption>
                <Avatar name={testimonial.name} aria-hidden="true" />
                <div className="author">
                  <span className="name">{testimonial.name}</span>
                  <span className="role">{testimonial.role}</span>
                </div>
              </figcaption>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <div className="controls">
        <Carousel.Previous>
          <Chevron direction={-1} />
          <span className="loam-VisuallyHidden">Previous</span>
        </Carousel.Previous>
        <Carousel.Indicators />
        <Carousel.Next>
          <Chevron direction={1} />
          <span className="loam-VisuallyHidden">Next</span>
        </Carousel.Next>
      </div>
    </Carousel.Root>
  );
}
```

## example.css

```css
@scope (.testimonial-carousel) to ([class*="loam-"]) {
  :scope {
    --loam-carousel-item-size: 24rem;
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
  }

  div.controls {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-md);
    justify-content: center;

    svg {
      block-size: auto;
      inline-size: 1.25em;
    }
  }
}

@scope (.testimonial-carousel figure.quote) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    margin: 0;
  }

  blockquote {
    border-inline-start: 0;
    color: var(--loam-color-fg);
    font-size: var(--loam-text-lg);
    margin: 0;
    padding-inline-start: 0;
    text-wrap: pretty;

    > p {
      margin: 0;
    }
  }

  figcaption {
    align-items: center;
    display: block flex;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    margin: auto 0 0;
  }

  div.author {
    display: block grid;
  }

  span.name {
    color: var(--loam-color-fg-strong);
    font-weight: 600;
  }

  span.role {
    color: var(--loam-color-fg-muted);
  }
}
```

