---
title: Subgrid rows
description: Three cards whose heading, description and action rows line up across the grid, whatever the length of the words, through grid-template-rows: subgrid.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Subgrid rows

Three cards whose heading, description and action rows line up across the grid, whatever the length of the words, through grid-template-rows: subgrid.

An example in **Grids**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`
- Tags: grid, subgrid, layout, cards, align
- Live: https://loamui.com/examples/grids/grid-subgrid

## Built to the pillars

- **Native CSS.** A list of three items, each a card named by its h3, so the row of workshops is a list to a screen reader and each card says what it is.
- **Modern CSS.** The list is the grid and each card spans three of its rows with grid-template-rows: subgrid, so the tallest description sets the row for all three and every button lands on one line without a fixed height or a JavaScript measure.
- **Composition.** Card is rendered as the list item through its render prop, which is what lets the Card be the grid item that subgrids; the Button inside is past the donut and the Card's padding becomes the gutter of its tracks.
- **Accessible & gatekept.** The date is set in the strong primary token, the pair the audit checks as text, and the action is a Button because booking does something rather than going somewhere; each card's button is in the same place three times.

## Example.tsx

```tsx
import { Button, Card } from "@loamui/core";
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
  return (
    <ul className="grid-subgrid" role="list">
      {WORKSHOPS.map((workshop) => (
        <Card
          key={workshop.slug}
          render={<li className="workshop" aria-labelledby={`grid-subgrid-${workshop.slug}`} />}
        >
          <div className="head">
            <h3 id={`grid-subgrid-${workshop.slug}`}>{workshop.title}</h3>
            <p className="when">{workshop.when}</p>
          </div>
          <p className="description">{workshop.description}</p>
          <div className="actions">
            <Button>Book a place</Button>
          </div>
        </Card>
      ))}
    </ul>
  );
}
```

## example.css

```css
/* Three cards whose rows line up across the grid: every heading on one
   line, every description starting on the next, every button on the
   last, however long the words are. The list is the grid, and each card
   spans three of its rows and adopts them with subgrid, so the tallest
   description in the row sets the row for all three. The markers go,
   and the markup keeps role="list" for the browsers that drop the
   semantics with the marker. */
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

/* Each card is a Card rendered as the list item, so the Card element is
   the grid item and this scope's root. It spans three rows and takes
   its rows from the list; the Card's own padding stays and becomes the
   gutter at the top and bottom of its tracks, and the surface, line
   and radius are left alone. */
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

  /* The action is on the last shared row, so the three buttons sit on
     one line without margin-block-start: auto; a grid with one cell
     keeps the Button at its natural width. */
  div.actions {
    align-self: end;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    padding-block-start: var(--loam-space-xs);
  }
}
```

