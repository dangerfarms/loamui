---
title: Stats with change
description: Four figures in a row of Card tiles, each with its change on last month: an up or down glyph, the percentage in the direction's colour, and the direction as a word.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Stats with change

Four figures in a row of Card tiles, each with its change on last month: an up or down glyph, the percentage in the direction's colour, and the direction as a word.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Price`
- Tags: metrics, kpi, change, trend, dashboard, comparison
- Live: https://loamui.com/examples/data-display/stats-with-diff

## Built to the pillars

- **Native CSS.** Each tile is a description list: the label is the term, the figure and its change are descriptions; the sales figure is a data element whose value is the number.
- **Modern CSS.** The row is an auto-fit grid answering its own width; the figures and the percentages are set in tabular lining numerals so the tiles line up.
- **Composition.** Card is the surface, rendered as a dl, and Price writes the amount; the example only arranges the pairs inside and never touches the Card's own border, radius or padding.
- **Contextualism.** The direction's colour is the success or danger text token on the glyph and the figure, so it holds contrast in both schemes; a region could re-answer it, but the direction is data, not the region's status.
- **Accessible & gatekept.** The arrow is hidden and the direction is written as a word, so a reader hears Up 9% on August and forced colours lose nothing: the arrow is a stroke in currentColor and the word is text.

## Example.tsx

```tsx
import type { ReactNode } from "react";
import { Card, Price } from "@loamui/core";
import "./example.css";

interface Stat {
  label: string;
  value: ReactNode;
  /** The change on August, as a whole percentage; negative is down. */
  change: number;
}

const STATS: Stat[] = [
  { label: "Sales", value: <Price value={24145} currency="GBP" locale="en-GB" />, change: 9 },
  { label: "Orders posted", value: "2,318", change: 12 },
  { label: "New members", value: "186", change: -4 },
  { label: "Seed swaps", value: "57", change: 31 },
];

export default function Example() {
  return (
    <div className="stats-with-diff" role="group" aria-label="September so far, against August">
      {STATS.map((stat) => {
        const up = stat.change >= 0;
        return (
          <Card key={stat.label} render={<dl className="stat" />}>
            <dt>{stat.label}</dt>
            <dd className="value">{stat.value}</dd>
            <dd className="diff" data-direction={up ? "up" : "down"}>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={up ? "M3 11l5-5 5 5" : "M3 5l5 5 5-5"} />
              </svg>
              <span className="loam-VisuallyHidden">{up ? "Up" : "Down"}</span>{" "}
              <span className="change">{Math.abs(stat.change)}%</span> on August
            </dd>
          </Card>
        );
      })}
    </div>
  );
}
```

## example.css

```css
/* The row: a container that fits as many tiles across as it has room for. */
@scope (.stats-with-diff) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  }
}

/* A tile is a Card hosting the example's own pairs, so the Card element
   is this scope's root: the pairs are reachable, the Price inside is
   still fenced by the donut, and the Card's surface, line, radius and
   padding are left as they are. */
@scope (.stats-with-diff dl.stat) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-xs);
    margin: 0;
  }

  dt {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
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

  /* The change: a glyph and the figure in the direction's colour, the
     comparison in muted text after them. The direction is also a word,
     so the colour and the arrow are never the only things saying it. */
  dd.diff {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    gap: var(--loam-space-xs);
    margin: 0;

    svg {
      block-size: auto;
      inline-size: 1em;
    }

    span.change {
      font-weight: 600;
    }

    &[data-direction="up"] {
      svg,
      span.change {
        color: var(--loam-color-success-strong);
      }
    }

    &[data-direction="down"] {
      svg,
      span.change {
        color: var(--loam-color-danger-strong);
      }
    }
  }
}
```

