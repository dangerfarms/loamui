---
title: Asymmetric grid
description: A 2:1 grid: a tall lead card with a photograph in the wide column and two cards stacked beside it, all in one column when narrow.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Asymmetric grid

A 2:1 grid: a tall lead card with a photograph in the wide column and two cards stacked beside it, all in one column when narrow.

A recipe in **Grids**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `SignpostLink`
- Tags: grid, layout, cards, lead, columns
- Live: https://loamui.com/recipes/grids/grid-asymmetric

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## When to use

Use to give one item prominence beside two supporting items while preserving reading order. Choose Subgrid rows when equal items need their content aligned.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A list of three articles, each named by its own h3, so the grid is a list to a screen reader and each card a named piece; no wrapper element exists only to be a column.
- **Modern CSS.** An outer region is the named container and the list is the grid: two columns at 2:1 from 44rem of its own width with the lead spanning both rows, so the stacked pair's height is the lead's, and one column in source order below that.
- **Composition.** Card is rendered as each article through its render prop; the example arranges the column inside, the SignpostLink is past the donut, and the Card's padding and line are left alone.
- **Accessible & gatekept.** The photograph carries real alt text because a picture of the orchard is what the lead is about; the actions are links because each goes somewhere, and every card's action sits at its foot so the eye finds it in the same place three times.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Card, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <div className="grid-asymmetric">
      <ul role="list">
        <li className="lead">
          <Card render={<article aria-labelledby={`${instanceId}-grid-asymmetric-lead`} />}>
            <img
              className="media"
              src="https://picsum.photos/id/646/1200/800"
              alt="A member walking through the orchard in the September evening light"
              width="1200"
              height="800"
            />
            <h3 id={`${instanceId}-grid-asymmetric-lead`}>September at the nursery</h3>
            <p>
              The plant sale opens on the first Saturday, the last of the summer seed comes off the
              bench, and the field walks move to the afternoon as the light shortens. Bare-root
              orders open on the fifteenth.
            </p>
            <div className="actions">
              <SignpostLink href="/news/september">Read the month’s notes</SignpostLink>
            </div>
          </Card>
        </li>
        <li>
          <Card render={<article aria-labelledby={`${instanceId}-grid-asymmetric-sale`} />}>
            <h3 id={`${instanceId}-grid-asymmetric-sale`}>Plant sale</h3>
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
          <Card render={<article aria-labelledby={`${instanceId}-grid-asymmetric-swap`} />}>
            <h3 id={`${instanceId}-grid-asymmetric-swap`}>Seed swap</h3>
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
    </div>
  );
}
```

## example.css

```css
@scope (.grid-asymmetric) to ([class*="loam-"]) {
  :scope {
    container: grid-asymmetric / inline-size;
  }

  ul {
    display: block grid;
    gap: var(--loam-space-md);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: block grid;
    grid-template-columns: minmax(0, 1fr);
    margin: 0;
  }

  @container grid-asymmetric (inline-size < 44rem) {
    ul {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @container grid-asymmetric (inline-size >= 44rem) {
    ul {
      grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    }

    li.lead {
      grid-row: span 2;
    }
  }
}

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

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }
}
```

