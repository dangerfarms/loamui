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
- **Composition.** One tier's markup is written three times from one array; Card is the surface and Badge, Price and Button are dropped in as they come, and the table only writes the grid around them.
- **Contextualism.** The recommended tier's list item declares --loam-context: primary, and the Badge, the name, the figure and the Button inside its Card all answer it; the other two declare nothing and stay neutral.
- **Accessible & gatekept.** Every button says which tier it chooses, so a row of three reads apart; an excluded feature is struck and prefixed by hidden words; and the recommendation is a ring on the item as well as the Badge's words, so it is told apart by shape and survives forced colours.

## Example.tsx

```tsx
import { Badge, Button, Card, Price } from "@loamui/core";
import "./example.css";

const PLANS = [
  {
    slug: "seedling",
    name: "Seedling",
    eyebrow: "Starter",
    description: "For a windowsill, a balcony or a first raised bed.",
    price: 24,
    features: [
      { text: "Six packets a year from the catalogue", included: true },
      { text: "Sowing calendar and growing guides", included: true },
      { text: "The seed-swap table at every open day", included: false },
      { text: "A bed on a member field", included: false },
    ],
  },
  {
    slug: "grower",
    name: "Grower",
    eyebrow: "Most popular",
    description: "For a household that sows most of what it eats.",
    price: 48,
    recommended: true,
    features: [
      { text: "Twelve packets a year from the catalogue", included: true },
      { text: "Sowing calendar and growing guides", included: true },
      { text: "The seed-swap table at every open day", included: true },
      { text: "A bed on a member field", included: false },
    ],
  },
  {
    slug: "plot-holder",
    name: "Plot-holder",
    eyebrow: "With a bed",
    description: "For a grower who wants ground of their own.",
    price: 120,
    features: [
      { text: "Twenty-four packets a year from the catalogue", included: true },
      { text: "Sowing calendar and growing guides", included: true },
      { text: "The seed-swap table at every open day", included: true },
      { text: "A ten square metre bed on a member field", included: true },
    ],
  },
];

export default function Example() {
  return (
    <ul className="pricing-table" role="list" aria-label="Membership plans">
      {PLANS.map((plan) => (
        <li key={plan.slug} className={plan.recommended ? "recommended" : undefined}>
          <Card
            render={<article className="plan" aria-labelledby={`pricing-table-${plan.slug}`} />}
          >
            <p className="eyebrow">
              <Badge>{plan.eyebrow}</Badge>
            </p>
            <h3 id={`pricing-table-${plan.slug}`}>{plan.name}</h3>
            <p className="description">{plan.description}</p>
            <p className="price">
              <Price value={plan.price} currency="GBP">
                a year
              </Price>
            </p>
            <ul className="features" role="list">
              {plan.features.map((feature) =>
                feature.included ? (
                  <li key={feature.text} className="feature">
                    {feature.text}
                  </li>
                ) : (
                  <li key={feature.text} className="exclusion">
                    <span className="loam-VisuallyHidden">Not included: </span>
                    <s>{feature.text}</s>
                  </li>
                ),
              )}
            </ul>
            <div className="actions">
              <Button>Choose {plan.name}</Button>
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
/* The table is a list that declares its container and fits as many tiers
   across as it has room for; the tiers stretch to one height. The
   recommended tier is a primary region declared on its list item, which
   is the Card's ancestor, so everything inside the Card answers it. */
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
  }

  /* The recommended tier is a primary region, and it is ringed on the
     item around its Card, so it is told apart by shape as well as colour
     and the ring survives forced colours; the radius matches the Card's
     so the ring hugs it. */
  li.recommended {
    --loam-context: primary;

    border-radius: var(--loam-radius-lg);
    outline: 2px solid var(--loam-color-primary-strong);
    outline-offset: 3px;
  }
}

/* One tier: the same column as the Plan example. The Card is this scope's
   root, so the parts inside are reachable while the Badge, the Price and
   the Button are fenced by the donut; the Card's own surface, line, radius
   and padding are left as they are. */
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

  /* The features: markers replaced by a tick and a dash drawn as generated
     content with an empty alt, so they stay out of the accessibility tree;
     the words, and the exclusion's hidden prefix, carry the meaning. */
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

  /* The action sits at the foot of every tier, level across the row
     because the tiers share a height, and fills the width. */
  div.actions {
    display: block grid;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }

  /* In the recommended tier the name and the figure take the brand colour;
     the query is answered by the list item, an ancestor of both. The Badge
     says Most popular in words, so the choice survives forced colours. */
  @container (style(--loam-context: primary)) {
    h3,
    p.price {
      color: var(--loam-color-primary-strong);
    }
  }
}
```

