---
title: Card with stats
description: A campaign in a Card: a photo, a title and description, a Progress toward the target with the count and the target beneath it, and three figures in columns at the foot.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card with stats

A campaign in a Card: a photo, a title and description, a Progress toward the target with the count and the target beneath it, and three figures in columns at the foot.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Progress`
- Tags: campaign, goal, progress, figures, dashboard
- Live: https://loamui.com/examples/app-cards/card-with-stats

## Built to the pillars

- **Native CSS.** The bar is the native progress element named by its label, and the three figures are one description list whose terms follow their values on screen while the markup reads term first.
- **Modern CSS.** The figures are tabular lining numerals so the count and the target line up under the bar; the three columns are a grid divided by lines, with the first column's inset dropped so the row starts flush.
- **Composition.** Card and Progress are dropped in as they come; the example writes the figures and the list around them and never reaches into the bar.
- **Accessible & gatekept.** The bar speaks its value as 64% of the target through labels.value, and the count so far and the target are written out rather than left to the fill; the photo is decorative, so its alt is empty.

## Example.tsx

```tsx
"use client";

import { Card, Progress } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<article className="card-with-stats" aria-labelledby="card-with-stats-title" />}>
      <img
        className="media"
        src="https://picsum.photos/id/112/800/450"
        alt=""
        width="800"
        height="450"
      />
      <h3 id="card-with-stats-title">Autumn seed-saving drive</h3>
      <p className="description">
        Members save seed from this year’s plots and send it in for next year’s catalogue. Every
        packet is grown out and germination-tested before it is listed.
      </p>
      <div className="goal">
        <Progress value={64} labels={{ value: (n) => `${n}% of the target` }}>
          Packets sent in
        </Progress>
        <p className="figures">
          <span className="count">1,280 packets</span>
          <span className="target">Target 2,000</span>
        </p>
      </div>
      <dl className="stats">
        <div>
          <dt>Growers taking part</dt>
          <dd>214</dd>
        </div>
        <div>
          <dt>Varieties saved</dt>
          <dd>96</dd>
        </div>
        <div>
          <dt>Days left</dt>
          <dd>83</dd>
        </div>
      </dl>
    </Card>
  );
}
```

## example.css

```css
@scope (.card-with-stats) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-md);
    max-inline-size: 36rem;
  }

  img.media {
    aspect-ratio: 16 / 9;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  div.goal {
    display: block grid;
    gap: var(--loam-space-xs);
  }

  p.figures {
    display: block flex;
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    justify-content: space-between;
    margin: 0;

    span.count {
      color: var(--loam-color-fg-strong);
      font-weight: 600;
    }

    span.target {
      color: var(--loam-color-fg-muted);
    }
  }

  dl.stats {
    border-block-start: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    padding-block-start: var(--loam-space-md);

    > div {
      display: block grid;
      gap: var(--loam-space-xs);
      padding-inline-start: var(--loam-space-md);

      &:first-child {
        padding-inline-start: 0;
      }

      + div {
        border-inline-start: 1px solid var(--loam-color-line);
      }
    }

    dt {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-xs);
      order: 1;
    }

    dd {
      color: var(--loam-color-fg-strong);
      font-family: var(--loam-font-display);
      font-size: var(--loam-text-xl);
      font-variant-numeric: lining-nums tabular-nums;
      font-weight: 700;
      line-height: 1.1;
      margin: 0;
    }
  }
}
```

