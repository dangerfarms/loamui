---
title: Asymmetric grid
description: A 2:1 grid: a tall lead card with a photograph in the wide column and two cards stacked beside it, all in one column when narrow.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Asymmetric grid

A 2:1 grid: a tall lead card with a photograph in the wide column and two cards stacked beside it, all in one column when narrow.

An example in **Grids**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `SignpostLink`
- Tags: grid, layout, cards, lead, columns
- Live: https://loamui.com/examples/grids/grid-asymmetric

## Built to the pillars

- **Native CSS.** A list of three articles, each named by its own h3, so the grid is a list to a screen reader and each card a named piece; no wrapper element exists only to be a column.
- **Modern CSS.** The list is the container and the grid: two columns at 2:1 from 44rem of its own width with the lead spanning both rows, so the stacked pair's height is the lead's, and one column in source order below that.
- **Composition.** Card is rendered as each article through its render prop; the example arranges the column inside, the SignpostLink is past the donut, and the Card's padding and line are left alone.
- **Accessible & gatekept.** The photograph carries real alt text because a picture of the bench is what the lead is about; the actions are links because each goes somewhere, and every card's action sits at its foot so the eye finds it in the same place three times.

## Example.tsx

```tsx
import { Card, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <ul className="grid-asymmetric" role="list">
      <li className="lead">
        <Card render={<article aria-labelledby="grid-asymmetric-lead" />}>
          <img
            className="media"
            src="https://picsum.photos/seed/hedgerow-september/1200/800"
            alt="The nursery bench in September, stacked with trays of perennials for the sale"
            width="1200"
            height="800"
          />
          <h3 id="grid-asymmetric-lead">September at the nursery</h3>
          <p>
            The plant sale opens on the first Saturday, the last of the summer seed comes off the
            bench, and the field walks move to the afternoon as the light shortens. Bare-root orders
            open on the fifteenth.
          </p>
          <div className="actions">
            <SignpostLink href="/news/september">Read the month’s notes</SignpostLink>
          </div>
        </Card>
      </li>
      <li>
        <Card render={<article aria-labelledby="grid-asymmetric-sale" />}>
          <h3 id="grid-asymmetric-sale">Plant sale</h3>
          <p>
            Member-grown perennials, herbs and the last vegetable plugs, on the bench from nine on
            Saturday 5 September.
          </p>
          <div className="actions">
            <SignpostLink href="/events/plant-sale">What is on the bench</SignpostLink>
          </div>
        </Card>
      </li>
      <li>
        <Card render={<article aria-labelledby="grid-asymmetric-swap" />}>
          <h3 id="grid-asymmetric-swap">Seed swap</h3>
          <p>
            Bring what you saved and take what you need, first Sunday of the month. Labels and
            envelopes are on the table.
          </p>
          <div className="actions">
            <SignpostLink href="/events/seed-swap">How the swap works</SignpostLink>
          </div>
        </Card>
      </li>
    </ul>
  );
}
```

## example.css

```css
/* A 2:1 grid: the lead card takes the wide column and both rows, and the
   two small cards stack beside it. The list is the container and the
   grid; the markers go, and the markup keeps role="list" for the
   browsers that drop the semantics with the marker. Narrow is one
   column in source order, so the lead still comes first. */
@scope (.grid-asymmetric) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: block grid;
    margin: 0;
  }

  /* Wide: two columns at 2:1 and the lead spanning both rows, so the
     small cards' combined height is the lead's height. */
  @container (inline-size >= 44rem) {
    :scope {
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    }

    li.lead {
      grid-row: span 2;
    }
  }
}

/* Each card is a Card rendered as the article, so the Card element is
   this scope's root: the column inside is reachable, the SignpostLink
   is fenced by the donut, and the Card's own surface, line, radius and
   padding are left alone. The item is a grid with one cell, so the
   Card stretches to the row without a height of its own. */
@scope (.grid-asymmetric article) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  img.media {
    aspect-ratio: 3 / 2;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    margin-block-end: var(--loam-space-xs);
    object-fit: cover;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  /* The action sits at the foot, however long the words above it. */
  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }
}
```

