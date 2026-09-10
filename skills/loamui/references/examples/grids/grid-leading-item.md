---
title: Grid with leading item
description: A three-column grid whose lead item spans two columns above a row of three, with a narrower item beside the lead; two columns, then one, as the room goes.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Grid with leading item

A three-column grid whose lead item spans two columns above a row of three, with a narrower item beside the lead; two columns, then one, as the room goes.

An example in **Grids**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`, `SignpostLink`
- Tags: grid, layout, cards, lead, featured, columns
- Live: https://loamui.com/examples/grids/grid-leading-item

## Built to the pillars

- **Native CSS.** A list of five articles, each named by its h3, in an order that reads as the layout does: the lead first, then the side note, then the three guides.
- **Modern CSS.** The list is the container and the grid, and each width owns its layout outright: one column, two from 36rem with the lead across both, three from 56rem with the lead across two, so no rule of one width overrides another.
- **Composition.** Card is rendered as each article through its render prop; the lead's larger type comes from a scope of its own on the lead's card, not a prop, and the Badge and SignpostLink are past the donut.
- **Contextualism.** The lead's eyebrow declares --loam-context: primary, so the Badge takes the brand colour from the region rather than a prop; primary is the brand slot, neutral until a theme fills it, and the lead is the lead by its span, its type and the Badge's words.
- **Accessible & gatekept.** Every card's action is a link at its foot, in the same place five times; the lead is the lead by its type and span, with the Badge's words saying so for anyone who cannot see either.

## Example.tsx

```tsx
import { Badge, Card, SignpostLink } from "@loamui/core";
import "./example.css";

const GUIDES = [
  {
    slug: "broad-beans",
    title: "Broad beans",
    description: "Sow in autumn for the earliest crop, or in February under a cloche.",
  },
  {
    slug: "tomatoes",
    title: "Tomatoes",
    description: "Start on a warm sill in March; pot on twice before they go out in June.",
  },
  {
    slug: "lettuce",
    title: "Lettuce",
    description: "A pinch every fortnight from March keeps a row coming until the frost.",
  },
];

export default function Example() {
  return (
    <ul className="grid-leading-item" role="list">
      <li className="lead">
        <Card render={<article aria-labelledby="grid-leading-item-lead" />}>
          <p className="eyebrow">
            <Badge>Start here</Badge>
          </p>
          <h3 id="grid-leading-item-lead">Your first year of seed saving</h3>
          <p>
            Which crops to save from first, how far apart to keep them from their relatives, and how
            to clean, dry and store what you gather. Written for a plot of any size, by the growers
            who supply the bench, and enough to bring your own packet to the swap next year.
          </p>
          <div className="actions">
            <SignpostLink href="/guides/first-year">Read the guide</SignpostLink>
          </div>
        </Card>
      </li>
      <li className="side">
        <Card render={<article aria-labelledby="grid-leading-item-side" />}>
          <h3 id="grid-leading-item-side">Sowing this week</h3>
          <p>
            Winter lettuce, spinach and spring onions outside; hardy peas under a cloche for May.
          </p>
          <div className="actions">
            <SignpostLink href="/calendar">Open the calendar</SignpostLink>
          </div>
        </Card>
      </li>
      {GUIDES.map((guide) => (
        <li key={guide.slug}>
          <Card render={<article aria-labelledby={`grid-leading-item-${guide.slug}`} />}>
            <h3 id={`grid-leading-item-${guide.slug}`}>{guide.title}</h3>
            <p>{guide.description}</p>
            <div className="actions">
              <SignpostLink href={`/guides/${guide.slug}`}>How to grow</SignpostLink>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
```

## example.css

```css
@scope (.grid-leading-item) to ([class*="loam-"]) {
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

  @container (inline-size >= 36rem) {
    :scope {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    li.lead {
      grid-column: span 2;
    }
  }

  @container (inline-size >= 56rem) {
    :scope {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}

@scope (.grid-leading-item article) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  p.eyebrow {
    --loam-context: primary;

    margin: 0;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;

    li.lead :scope & {
      font-size: var(--loam-text-xl);
      max-inline-size: 24ch;
      text-wrap: balance;
    }
  }

  p {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;

    li.lead :scope & {
      max-inline-size: var(--loam-measure);
    }
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

