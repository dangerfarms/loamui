---
title: Pricing table
description: Three membership tiers side by side, each a Card with its name, price, features and a button that chooses it, with the middle one recommended.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Pricing table

Three membership tiers side by side, each a Card with its name, price, features and a button that chooses it, with the middle one recommended.

An example in **Commerce**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Button`, `Card`, `Price`
- Tags: pricing, tiers, plans, membership, compare, commerce
- Live: https://loamui.com/examples/commerce/pricing-table

## Built to the pillars

- **Native CSS.** A list named Membership plans, one item per tier, each an article named by its own heading, so the page's articles list as Seedling, Grower, Plot-holder and the list announces how many there are.
- **Modern CSS.** The list is an auto-fit grid answering its own width: three across where there is room, fewer where there is not, and the tiers share a height so the buttons sit level across the row; the recommended tier's ring is an outline on the list item, rounded to the Card's radius so it hugs the surface.
- **Composition.** One tier's markup is written three times; Card is the surface and Badge, Price and Button are dropped in as they come, and the table only writes the grid around them.
- **Contextualism.** The recommended tier's list item declares --loam-context: primary, and the Badge, the name, the figure and the Button inside its Card all answer it; primary is the brand slot, neutral until a theme fills it, which is why the tier is also ringed and named Most popular in words rather than left to colour.
- **Accessible & gatekept.** Every button says which tier it chooses, so a row of three reads apart; an excluded feature is struck and prefixed by hidden words; and the recommendation is a ring on the item as well as the Badge's words, so it is told apart by shape and survives forced colours.

## Example.tsx

```tsx
import { Badge, Button, Card, Price } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <ul className="pricing-table" role="list" aria-label="Membership plans">
      <li>
        <Card render={<article className="plan" aria-labelledby="pricing-table-seedling" />}>
          <p className="eyebrow">
            <Badge>Starter</Badge>
          </p>
          <h3 id="pricing-table-seedling">Seedling</h3>
          <p className="description">For a windowsill, a balcony or a first raised bed.</p>
          <p className="price">
            <Price value={24} currency="GBP">
              a year
            </Price>
          </p>
          <ul className="features" role="list">
            <li className="feature">Six packets a year from the catalogue</li>
            <li className="feature">Sowing calendar and growing guides</li>
            <li className="exclusion">
              <span className="loam-VisuallyHidden">Not included: </span>
              <s>The seed-swap table at every open day</s>
            </li>
            <li className="exclusion">
              <span className="loam-VisuallyHidden">Not included: </span>
              <s>A bed on a member field</s>
            </li>
          </ul>
          <div className="actions">
            <Button>Choose Seedling</Button>
          </div>
        </Card>
      </li>
      <li className="recommended">
        <Card render={<article className="plan" aria-labelledby="pricing-table-grower" />}>
          <p className="eyebrow">
            <Badge>Most popular</Badge>
          </p>
          <h3 id="pricing-table-grower">Grower</h3>
          <p className="description">For a household that sows most of what it eats.</p>
          <p className="price">
            <Price value={48} currency="GBP">
              a year
            </Price>
          </p>
          <ul className="features" role="list">
            <li className="feature">Twelve packets a year from the catalogue</li>
            <li className="feature">Sowing calendar and growing guides</li>
            <li className="feature">The seed-swap table at every open day</li>
            <li className="exclusion">
              <span className="loam-VisuallyHidden">Not included: </span>
              <s>A bed on a member field</s>
            </li>
          </ul>
          <div className="actions">
            <Button>Choose Grower</Button>
          </div>
        </Card>
      </li>
      <li>
        <Card render={<article className="plan" aria-labelledby="pricing-table-plot-holder" />}>
          <p className="eyebrow">
            <Badge>With a bed</Badge>
          </p>
          <h3 id="pricing-table-plot-holder">Plot-holder</h3>
          <p className="description">For a grower who wants ground of their own.</p>
          <p className="price">
            <Price value={120} currency="GBP">
              a year
            </Price>
          </p>
          <ul className="features" role="list">
            <li className="feature">Twenty-four packets a year from the catalogue</li>
            <li className="feature">Sowing calendar and growing guides</li>
            <li className="feature">The seed-swap table at every open day</li>
            <li className="feature">A ten square metre bed on a member field</li>
          </ul>
          <div className="actions">
            <Button>Choose Plot-holder</Button>
          </div>
        </Card>
      </li>
    </ul>
  );
}
```

## example.css

```css
@scope (.pricing-table) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: block grid;
    margin: 0;

    &.recommended {
      --loam-context: primary;

      border-radius: var(--loam-radius-lg);
      outline: var(--loam-ring-width) solid var(--loam-color-primary-strong);
      outline-offset: 3px;
    }
  }
}

@scope (.pricing-table article.plan) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  p.eyebrow {
    margin: 0;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
  }

  p.price {
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-2xl);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
  }

  ul.features {
    display: block grid;
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      display: block grid;
      gap: var(--loam-space-sm);
      grid-template-columns: 1.25em 1fr;
      margin: 0;

      &::before {
        font-weight: 700;
        text-align: center;
      }
    }

    li.feature::before {
      color: var(--loam-color-success-strong);
      content: "✓" / "";
    }

    li.exclusion {
      color: var(--loam-color-fg-muted);

      &::before {
        content: "–" / "";
      }
    }
  }

  div.actions {
    display: block grid;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }

  /* Answered by the list item, an ancestor of both. */
  @container (style(--loam-context: primary)) {
    h3,
    p.price {
      color: var(--loam-color-primary-strong);
    }
  }
}
```

