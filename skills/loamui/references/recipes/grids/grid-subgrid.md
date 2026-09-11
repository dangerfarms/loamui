---
title: Subgrid rows
description: Three cards whose heading, description and action rows line up across the grid, whatever the length of the words, through grid-template-rows: subgrid.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Subgrid rows

Three cards whose heading, description and action rows line up across the grid, whatever the length of the words, through grid-template-rows: subgrid.

A recipe in **Grids**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `SignpostLink`
- Tags: grid, subgrid, layout, cards, align
- Live: https://loamui.com/recipes/grids/grid-subgrid

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## When to use

Use when cards with different amounts of text need aligned headings, descriptions and actions. Choose Asymmetric grid when one item should lead.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A list of three items, each a card named by its h3, so the row of workshops is a list to a screen reader and each card says what it is.
- **Modern CSS.** The list is the grid and each card spans three of its rows with grid-template-rows: subgrid, so the tallest description sets the row for all three and every action lands on one line without a fixed height or a JavaScript measure.
- **Composition.** Card is rendered as the list item through its render prop, which is what lets the Card be the grid item that subgrids; the SignpostLink inside is past the donut and the Card's padding becomes the gutter of its tracks.
- **Accessible & gatekept.** The date is set in the strong primary token, the pair the audit checks as text, and the action is a SignpostLink to the workshop’s booking page; each card’s link is in the same place three times.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Card, SignpostLink } from "@loamui/core";
import "./example.css";

const WORKSHOPS = [
  {
    slug: "seed-saving",
    title: "Seed saving",
    when: "Saturday 19 September, 10am",
    description:
      "Which crops to save from first, isolation distances, and cleaning, drying and storing what you gather. Bring a crop you want to keep.",
  },
  {
    slug: "grafting",
    title: "Grafting fruit trees",
    when: "Saturday 6 February, 10am",
    description:
      "Whip-and-tongue grafting onto local rootstocks. Everyone takes home two trees on the rootstock of their choice, labelled and wrapped.",
  },
  {
    slug: "winter-pruning",
    title: "Winter pruning",
    when: "Sunday 17 January, 1pm",
    description: "Apples and pears in the member orchard, in the cold, with a flask.",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <ul className="grid-subgrid" role="list">
      {WORKSHOPS.map((workshop) => (
        <Card
          key={workshop.slug}
          render={
            <li
              className="workshop"
              aria-labelledby={`${instanceId}-grid-subgrid-${workshop.slug}`}
            />
          }
        >
          <div className="head">
            <h3 id={`${instanceId}-grid-subgrid-${workshop.slug}`}>{workshop.title}</h3>
            <p className="when">{workshop.when}</p>
          </div>
          <p className="description">{workshop.description}</p>
          <div className="actions">
            <SignpostLink href={`/workshops/${workshop.slug}`}>
              Book a place<span className="loam-VisuallyHidden"> – {workshop.title}</span>
            </SignpostLink>
          </div>
        </Card>
      ))}
    </ul>
  );
}
```

## example.css

```css
@scope (.grid-subgrid) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

@scope (.grid-subgrid li.workshop) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    grid-row: span 3;
    grid-template-rows: subgrid;
    margin: 0;
    row-gap: var(--loam-space-sm);
  }

  div.head {
    display: block grid;
    gap: var(--loam-space-xs);
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p.when {
    color: var(--loam-color-primary-strong);
    font-size: var(--loam-text-sm);
    font-weight: 600;
    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  div.actions {
    align-self: end;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    padding-block-start: var(--loam-space-xs);
  }
}
```

