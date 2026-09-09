---
title: Grouped stats
description: Three figures from one event on one Card, each with a sentence saying what it counts and a line comparing it with last year, divided by lines rather than split into tiles.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Grouped stats

Three figures from one event on one Card, each with a sentence saying what it counts and a line comparing it with last year, divided by lines rather than split into tiles.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Price`
- Tags: metrics, kpi, summary, comparison, event, dashboard
- Live: https://loamui.com/examples/data-display/grouped-stats

## Built to the pillars

- **Native CSS.** The Card is a section named by its heading, and the three figures are one description list: each term has its figure, its sentence and its comparison as descriptions.
- **Modern CSS.** The Card is a container: stacked with a line above each figure where it is narrow, a row divided by lines where it is wide, with the end insets dropped so the row sits flush.
- **Composition.** Card is rendered as the section and Price writes the amount; the example only arranges the list inside and never touches the Card's own border, radius or padding.
- **Accessible & gatekept.** Each comparison is a sentence, Up 22% on last year's open day, rather than an arrow and a number, so the direction is said and nothing depends on colour.

## Example.tsx

```tsx
import { Card, Price } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<section className="grouped-stats" aria-labelledby="grouped-stats-title" />}>
      <h2 id="grouped-stats-title">Open day, 5 September</h2>
      <dl className="groups">
        <div className="group">
          <dt>Visitors</dt>
          <dd className="value">1,840</dd>
          <dd className="sentence">Through the gate between nine and four.</dd>
          <dd className="compare">Up 22% on last year’s open day.</dd>
        </div>
        <div className="group">
          <dt>Plant sales</dt>
          <dd className="value">
            <Price value={6320} currency="GBP" locale="en-GB" />
          </dd>
          <dd className="sentence">Perennials, herbs and plugs off the nursery bench.</dd>
          <dd className="compare">Up 15% on last year.</dd>
        </div>
        <div className="group">
          <dt>New members</dt>
          <dd className="value">38</dd>
          <dd className="sentence">Signed up at the table by the gate.</dd>
          <dd className="compare">Three fewer than last year.</dd>
        </div>
      </dl>
    </Card>
  );
}
```

## example.css

```css
/* One Card holding three figures, each with a sentence and a comparison.
   The Card is the section, so its element is this scope's root: core's
   surface, line, radius and padding stay; the Card is the container and
   the list inside answers it. The Price keeps its recipe behind the donut. */
@scope (.grouped-stats) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
  }

  h2 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  /* Stacked with a line between each; wide, a row divided by lines. */
  dl.groups {
    display: block grid;
    margin: 0;
  }

  div.group {
    border-block-start: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-xs);
    padding-block: var(--loam-space-md);

    &:last-child {
      padding-block-end: 0;
    }
  }

  dt {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
  }

  dd {
    margin: 0;

    &.value {
      color: var(--loam-color-fg-strong);
      font-family: var(--loam-font-display);
      font-size: var(--loam-text-2xl);
      font-variant-numeric: lining-nums tabular-nums;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    &.sentence {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-sm);
      text-wrap: pretty;
    }

    &.compare {
      font-size: var(--loam-text-sm);
      font-variant-numeric: lining-nums tabular-nums;
      font-weight: 500;
    }
  }

  @container (inline-size >= 40rem) {
    dl.groups {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    /* The sentence's row takes the slack, so the three comparisons sit on
       one line at the foot however long the sentences above them run. */
    div.group {
      border-block-start: 0;
      grid-template-rows: auto auto 1fr auto;
      padding-block: 0;
      padding-inline: var(--loam-space-lg);

      &:first-child {
        padding-inline-start: 0;
      }

      &:last-child {
        padding-inline-end: 0;
      }

      + div.group {
        border-inline-start: 1px solid var(--loam-color-line);
      }
    }
  }
}
```

