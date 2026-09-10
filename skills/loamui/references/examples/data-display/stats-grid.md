---
title: Stats grid
description: Three headline figures in a row of Card tiles, a large value over its label and nothing else: the top line of a dashboard.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Stats grid

Three headline figures in a row of Card tiles, a large value over its label and nothing else: the top line of a dashboard.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`
- Tags: metrics, dashboard, kpi, figures
- Live: https://loamui.com/examples/data-display/stats-grid

## Built to the pillars

- **Native CSS.** Each tile is a description list of one pair: the label is the term and the figure its description, so the markup reads label then value while the screen shows value over label.
- **Modern CSS.** The row is an auto-fit grid answering its own width, and the figures are set in tabular lining numerals from the display face so a row of them shares a baseline and a width per digit.
- **Composition.** Card is the surface, rendered as a dl; the example only arranges the pair inside it and never touches the Card's own border, radius or padding.
- **Contextualism.** The tiles declare no region: a figure is a fact, not a status, so nothing here is green or red, and a tile dropped into a success region would stay plain because no Badge or Button inside it answers one.
- **Accessible & gatekept.** The group is named for what the figures summarise, so a reader arriving by landmark hears This season at a glance before the first label, and every figure is text that selects, copies and scales.

## Example.tsx

```tsx
import { Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="stats-grid" role="group" aria-label="This season at a glance">
      <Card render={<dl className="stat" />}>
        <dt>Varieties in the catalogue</dt>
        <dd className="value">412</dd>
      </Card>
      <Card render={<dl className="stat" />}>
        <dt>Member growers</dt>
        <dd className="value">1,280</dd>
      </Card>
      <Card render={<dl className="stat" />}>
        <dt>Packets posted this year</dt>
        <dd className="value">38,610</dd>
      </Card>
    </div>
  );
}
```

## example.css

```css
@scope (.stats-grid) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  }
}

@scope (.stats-grid dl.stat) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-xs);
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
}
```

