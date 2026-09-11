---
title: Hero with bullets
description: A page-opening section that makes its case in three ticked points before one action, beside a photograph.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Hero with bullets

A page-opening section that makes its case in three ticked points before one action, beside a photograph.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`
- Tags: landing, marketing, benefits, checklist
- Live: https://loamui.com/examples/page-sections/hero-with-bullets

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its h1 and a real list for the three points, each a strong title over a line, so a screen reader announces three items where the eye sees three ticks.
- **Modern CSS.** The section is a container and the inner element the grid: one column below 48rem of its own width, then a 3:2 split with the picture in the smaller column; the tick is sized in em so it rides the fluid scale.
- **Composition.** One Button, because there is one thing to do; the section's rule stops at its root and the tick is the example's own markup, not a component.
- **Accessible & gatekept.** The ticks are aria-hidden glyphs with the meaning in the words, the list keeps role=list so its count survives list-style: none, and the tick's tint gets a border in forced colours.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Button } from "@loamui/core";
import "./example.css";

const POINTS = [
  {
    title: "Open-pollinated, every packet",
    description: "Save seed from this year's crop and it comes true next year.",
  },
  {
    title: "Grown within twenty miles",
    description: "Selected on member plots in the same soil and weather you sow into.",
  },
  {
    title: "Germination printed on the packet",
    description: "Every batch is tested before it is listed, with the rate and the harvest year.",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <section
      className="hero-with-bullets"
      aria-labelledby={`${instanceId}-hero-with-bullets-title`}
    >
      <div className="inner">
        <div className="text">
          <h1 id={`${instanceId}-hero-with-bullets-title`}>Seed that was grown here, for here.</h1>
          <p className="lede">
            Hedgerow is a nursery and seed co-op in the Shropshire hills. Everything in the
            catalogue was selected on a member plot, not bought in.
          </p>
          <ul className="points" role="list">
            {POINTS.map((point) => (
              <li key={point.title}>
                <span className="check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
                <div>
                  <strong>{point.title}</strong>
                  <p>{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="actions">
            <Button>Start an order</Button>
          </div>
        </div>
        <img
          className="media"
          src="https://picsum.photos/id/90/900/1000"
          alt="Bamboo canes capped with jam jars along a raised bed at the nursery"
          width="900"
          height="1000"
        />
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.hero-with-bullets) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    padding-block: var(--loam-space-xl);
  }

  /* The inner element is the grid: an element cannot answer its own
     container query. */
  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  h1 {
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 18ch;
    text-wrap: balance;
  }

  p.lede {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-lg);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  ul.points {
    display: block grid;
    gap: var(--loam-space-md);
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      align-items: start;
      display: block grid;
      gap: var(--loam-space-md);
      grid-template-columns: auto minmax(0, 1fr);
      margin: 0;
    }

    strong {
      color: var(--loam-color-fg-strong);
      display: block flow;
    }

    p {
      color: var(--loam-color-fg-muted);
      margin: 0;
      text-wrap: pretty;
    }
  }

  span.check {
    align-items: center;
    background: var(--loam-color-primary-soft);
    block-size: 1.75em;
    border-radius: var(--loam-radius-full);
    color: var(--loam-color-primary-strong);
    display: block flex;
    inline-size: 1.75em;
    justify-content: center;

    svg {
      block-size: 1em;
      inline-size: 1em;
    }
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
  }

  img.media {
    aspect-ratio: 9 / 10;
    block-size: auto;
    border-radius: var(--loam-radius-lg);
    inline-size: 100%;
    object-fit: cover;
  }

  @container (inline-size >= 48rem) {
    div.inner {
      align-items: center;
      grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    }
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    span.check {
      border: 1px solid CanvasText;
    }
  }
}
```

