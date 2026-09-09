---
title: Table of reviews
description: The most-grown varieties as a Table: a Rating and the review count per row, and a two-colour bar of how many would grow it again, with both shares written either side of it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Table of reviews

The most-grown varieties as a Table: a Rating and the review count per row, and a two-colour bar of how many would grow it again, with both shares written either side of it.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Rating`, `Table`
- Tags: reviews, ratings, table, distribution, split bar, would grow again
- Live: https://loamui.com/examples/data-display/table-reviews

## Built to the pillars

- **Native CSS.** A real table with a caption, column headers and a row header per variety; each rating is a Rating in display mode, one named picture of the value rather than five decorative stars.
- **Modern CSS.** The split cell is a flex row with both figures at fixed widths in tabular numerals, so the bars line up down the column; the bar's fill is sized by the row in an inline style, the one number that is data.
- **Composition.** Table rules the rows and the header and Rating draws the stars; the example adds only the split cell, and reaches into neither.
- **Accessible & gatekept.** The bar is hidden and the two shares are text that finishes in hidden words, so a reader hears 91% would, 9% would not; in forced colours the bar keeps an edge and its fill is painted in the text colour.

## Example.tsx

```tsx
import { Rating, Table } from "@loamui/core";
import "./example.css";

const VARIETIES = [
  { variety: "Broad bean ‘Crimson Flowered’", since: 2019, rating: 4.7, reviews: 212, again: 91 },
  { variety: "Beetroot ‘Bull’s Blood’", since: 2017, rating: 4.4, reviews: 158, again: 84 },
  { variety: "Kale ‘Ragged Jack’", since: 2021, rating: 4.1, reviews: 96, again: 72 },
  { variety: "Lettuce ‘Bronze Arrow’", since: 2018, rating: 4.6, reviews: 187, again: 88 },
  { variety: "Tomato ‘Gardener’s Delight’", since: 2015, rating: 4.8, reviews: 341, again: 95 },
  { variety: "Squash ‘Crown Prince’", since: 2020, rating: 4.3, reviews: 121, again: 79 },
];

export default function Example() {
  return (
    <Table className="table-reviews" highlightOnHover>
      <caption>
        Member reviews of the most-grown varieties, to 8 September 2026: the rating, the count, and
        how many would grow it again.
      </caption>
      <thead>
        <tr>
          <th scope="col">Variety</th>
          <th scope="col" className="number">
            Listed since
          </th>
          <th scope="col">Rating</th>
          <th scope="col" className="number">
            Reviews
          </th>
          <th scope="col" className="split">
            Would grow again
          </th>
        </tr>
      </thead>
      <tbody>
        {VARIETIES.map((row) => (
          <tr key={row.variety}>
            <th scope="row">{row.variety}</th>
            <td className="number">{row.since}</td>
            <td>
              <Rating readOnly label="Average rating" value={row.rating} />
            </td>
            <td className="number">{row.reviews.toLocaleString("en")}</td>
            <td className="split">
              <span className="yes">
                {row.again}%<span className="loam-VisuallyHidden"> would</span>
              </span>
              <div className="bar" aria-hidden="true">
                <span style={{ inlineSize: `${row.again}%` }} />
              </div>
              <span className="no">
                {100 - row.again}%<span className="loam-VisuallyHidden"> would not</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
```

## example.css

```css
/* The Table's own element is the scroll wrapper, so it is this scope's
   root: the table and its cells are reachable, and the Ratings inside
   are fenced by the donut. The Table already rules the rows and the
   header; this aligns the figures and draws the split. */
@scope (.table-reviews) to ([class*="loam-"]) {
  /* The hidden words in the split cells are positioned, so the scroller
     must be their containing block, or they would widen the page instead
     of scrolling with the table. */
  :scope {
    position: relative;
  }

  th.number,
  td.number {
    text-align: end;
  }

  td.number {
    font-variant-numeric: lining-nums tabular-nums;
    white-space: nowrap;
  }

  /* A variety is a name: it holds one line and the table scrolls, rather
     than breaking mid-word to fit. */
  tbody th {
    font-weight: 500;
    white-space: nowrap;
  }

  th.split {
    min-inline-size: 14rem;
  }

  /* The share that would, the bar, the share that would not: the
     figures at fixed widths so the bars line up down the column. */
  td.split {
    align-items: center;
    display: block flex;
    font-variant-numeric: lining-nums tabular-nums;
    gap: var(--loam-space-sm);
  }

  span.yes,
  span.no {
    flex: none;
    min-inline-size: 3.5ch;
  }

  span.yes {
    color: var(--loam-color-success-strong);
    font-weight: 600;
    text-align: end;
  }

  span.no {
    color: var(--loam-color-danger-strong);
  }

  /* The bar is decoration for the two figures beside it: the track is
     the would-not colour and the span over it the would colour, sized
     by the row. */
  div.bar {
    background: var(--loam-color-danger-strong);
    block-size: 0.5rem;
    border-radius: var(--loam-radius-full);
    display: block flex;
    flex: 1;
    min-inline-size: 4rem;
    overflow: clip;

    > span {
      background: var(--loam-color-success-strong);
      block-size: 100%;
    }
  }

  /* Forced colours drop both fills, so the bar keeps an edge and the
     would-share is painted in the text colour against the canvas. */
  @media (forced-colors: active) {
    div.bar {
      background: Canvas;
      border: 1px solid CanvasText;

      > span {
        background: CanvasText;
        forced-color-adjust: none;
      }
    }
  }
}
```

