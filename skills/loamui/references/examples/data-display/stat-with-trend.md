---
title: Stat with trend
description: One headline figure over its label, with the change since last week as a Badge and an eight-week sparkline beside it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Stat with trend

One headline figure over its label, with the change since last week as a Badge and an eight-week sparkline beside it.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`
- Tags: metrics, dashboard, kpi, sparkline, trend
- Live: https://loamui.com/examples/data-display/stat-with-trend

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A description list of one term and three descriptions: the label, the figure, and the trend, so the markup reads label then value while the screen leads with the figure.
- **Modern CSS.** The figure is set in tabular lining numerals from the display face, and the trend row wraps on its own when the tile is narrow; no breakpoint names a device.
- **Composition.** Card is the surface, rendered as a dl; the sparkline is an inline SVG polyline in the markup, not a chart library, so a reader changes the points as they would change the words.
- **Contextualism.** The trend row declares --loam-context: success. The Badge takes the status colour from it, and so does the sparkline, whose stroke is the primary token the region re-answers.
- **Accessible & gatekept.** The sparkline is an image named by its own title, which reads the eight values and says they are rising; the arrow in the Badge is hidden because the words already say up.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Badge, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <Card render={<dl className="stat-with-trend" />}>
      <dt>Orders posted this week</dt>
      <dd className="value">3,904</dd>
      <dd className="trend">
        <Badge>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M3 11l5-5 5 5" />
          </svg>
          Up 18% on last week
        </Badge>
        <svg
          className="sparkline"
          viewBox="0 0 80 24"
          preserveAspectRatio="none"
          role="img"
          aria-labelledby={`${instanceId}-stat-with-trend-sparkline`}
        >
          <title id={`${instanceId}-stat-with-trend-sparkline`}>
            Orders per week over the last eight weeks: 2,610, 2,780, 2,690, 2,950, 3,120, 3,080,
            3,310 and 3,904. Rising.
          </title>
          <polyline
            points="1,20 12,17 23,18 34,14 45,11 57,12 68,8 79,3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </dd>
    </Card>
  );
}
```

## example.css

```css
@scope (.stat-with-trend) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-xs);
    inline-size: min(100%, 24rem);
    margin: 0;
  }

  dt {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    order: 1;
  }

  dd.value {
    color: var(--loam-color-fg-strong);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-2xl);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;
  }

  dd.trend {
    --loam-context: success;

    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm) var(--loam-space-md);
    margin: 0;
    order: 2;
  }

  /* Stroked in currentColor, so it survives forced colours as text does. */
  svg.sparkline {
    block-size: 1.5rem;
    color: var(--loam-color-primary-strong);
    flex: 1 1 5rem;
    margin-inline-start: auto;
    max-inline-size: 10rem;
    overflow: visible;
  }
}
```

