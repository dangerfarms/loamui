---
title: Stats card with progress
description: One figure in a Card: the count of orders packed this week over the total, a thick Progress that says how far along it is, and what is left in words.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Stats card with progress

One figure in a Card: the count of orders packed this week over the total, a thick Progress that says how far along it is, and what is left in words.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Progress`
- Tags: progress, kpi, figure, dashboard, goal
- Live: https://loamui.com/examples/app-cards/stats-card-progress

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The bar is the native progress element with its label as its accessible name, and the count is text a reader can select and copy, not a number drawn into a canvas.
- **Modern CSS.** The count is set in tabular lining numerals from the display face so it holds its width as it changes; the thick track is the Progress's own large size, the one size a track can carry.
- **Composition.** Card and Progress are dropped in as they come; the example writes the figures around the bar and never reaches into it.
- **Accessible & gatekept.** The bar speaks 70% packed through labels.value, and the count, the total and what is left are all written out, so the fill is never the only thing saying how far along the week is.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Card, Progress } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <Card
      render={
        <section
          className="stats-card-progress"
          aria-labelledby={`${instanceId}-stats-card-progress-title`}
        />
      }
    >
      <p className="lead">This week</p>
      <h3 id={`${instanceId}-stats-card-progress-title`}>Orders packed</h3>
      <p className="value">
        1,120 <span>of 1,600 orders</span>
      </p>
      <Progress value={70} size="lg" labels={{ value: (n) => `${n}% packed` }}>
        Packed so far
      </Progress>
      <p className="note">70% packed. 480 to go before Friday’s post.</p>
    </Card>
  );
}
```

## example.css

```css
@scope (.stats-card-progress) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  p.lead {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-xs);
    font-weight: 600;
    letter-spacing: 0.03em;
    margin: 0;
    text-transform: uppercase;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p.value {
    color: var(--loam-color-fg-strong);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-3xl);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;

    span {
      color: var(--loam-color-fg-muted);
      font-family: var(--loam-font);
      font-size: var(--loam-text-sm);
      font-weight: 400;
      letter-spacing: 0;
    }
  }

  p.note {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    margin: 0;
  }
}
```

