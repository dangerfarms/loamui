---
title: Features with cards
description: A centred intro, then six features on cards in a grid that fits as many across as it has room for: an icon, a heading and a line each.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Features with cards

A centred intro, then six features on cards in a grid that fits as many across as it has room for: an icon, a heading and a line each.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`
- Tags: features, services, cards, grid, icons
- Live: https://loamui.com/examples/page-sections/features-with-cards

## Built to the pillars

- **Native CSS.** A section named by its h2, a header for the intro and a list of six cards with h3 headings, so the outline reads the way the page looks.
- **Modern CSS.** The list is an auto-fit grid answering the section's own width, and each card is scoped from its own root so the section's rule never reaches inside a Card.
- **Composition.** Card is rendered as the list item through its render prop, so the surface and the semantics are one element and the example never touches the Card's own padding or line.
- **Contextualism.** The icon square is the soft primary tint with the strong token for the glyph, so a --loam-context region around the section re-colours every icon at once.
- **Accessible & gatekept.** The icons are aria-hidden because the headings carry the meaning, the list keeps role=list so the count survives list-style: none, and the tint gets a border in forced colours.

## Example.tsx

```tsx
import { Card } from "@loamui/core";
import "./example.css";

const FEATURES = [
  {
    title: "Seed packets",
    description:
      "Two hundred open-pollinated varieties of vegetable, herb and flower, each with the grower's guide on the back.",
    icon: (
      <>
        <path d="M6 3h12l2 4v14H4V7Z" />
        <path d="M4 7h16" />
        <path d="M12 11c0-2.5 2-4.5 5-4.5 0 2.5-2 4.5-5 4.5Z" />
        <path d="M12 16V11" />
      </>
    ),
  },
  {
    title: "Bare-root fruit",
    description:
      "Apples, pears and soft fruit on local rootstocks, lifted in November and posted the same week.",
    icon: (
      <>
        <path d="M12 21V9" />
        <path d="M12 9c-4 0-7-3-7-7 4 0 7 3 7 7Z" />
        <path d="M12 9c4 0 7-3 7-7-4 0-7 3-7 7Z" />
        <path d="M7 21c0-3 2-5 5-5s5 2 5 5" />
      </>
    ),
  },
  {
    title: "Plant sales",
    description:
      "Member-grown perennials and vegetable plugs on the nursery bench every Saturday from March.",
    icon: (
      <>
        <path d="M5 10h14l-1.5 10h-11Z" />
        <path d="M12 10V4" />
        <path d="M12 7c0-2 1.5-3 4-3 0 2-1.5 3-4 3Z" />
      </>
    ),
  },
  {
    title: "Seed swap",
    description:
      "Bring what you saved, take what you need. The bench is open to everyone on the first Sunday of the month.",
    icon: (
      <>
        <path d="M4 8h13l-3-3" />
        <path d="M20 16H7l3 3" />
      </>
    ),
  },
  {
    title: "Workshops",
    description:
      "Seed saving, grafting and winter pruning, taught by the growers, free to members and open to all.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    title: "Growing guides",
    description:
      "Sowing, pricking out, hardening off and saving, written by the person who grew the packet.",
    icon: (
      <>
        <path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4Z" />
        <path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7Z" />
      </>
    ),
  },
];

export default function Example() {
  return (
    <section className="features-with-cards" aria-labelledby="features-with-cards-title">
      <header>
        <p className="eyebrow">What we do</p>
        <h2 id="features-with-cards-title">Everything a grower needs, from one bench</h2>
        <p className="description">
          Hedgerow sells seed and plants, but the co-op is the swap bench, the workshops and the
          guides that come with them.
        </p>
      </header>
      <ul role="list">
        {FEATURES.map((feature) => (
          <Card key={feature.title} render={<li className="feature" />}>
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {feature.icon}
              </svg>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </ul>
    </section>
  );
}
```

## example.css

```css
/* Features on cards: each one is a surface of its own because these are
   things a visitor picks between, not a list to scan. The section is the
   container; the list is the grid, fitting as many cards across as the
   section's own width allows, and the markup keeps role="list" for the
   browsers that drop the semantics with the marker. */
@scope (.features-with-cards) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-xl);
  }

  header {
    display: block grid;
    gap: var(--loam-space-sm);
    justify-items: center;
    text-align: center;
  }

  p.eyebrow {
    color: var(--loam-color-primary-strong);
    font-size: var(--loam-text-sm);
    font-weight: 600;
    letter-spacing: 0.04em;
    margin: 0;
    text-transform: uppercase;
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    max-inline-size: 26ch;
    text-wrap: balance;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  ul {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

/* Each card is a Card rendered as the list item, so the Card element is
   this scope's root: the icon, heading and line inside are reachable,
   and the Card's own surface, line, radius and padding are left alone. */
@scope (.features-with-cards li.feature) to ([class*="loam-"]) {
  :scope {
    align-content: start;
    display: block grid;
    gap: var(--loam-space-sm);
    margin: 0;
  }

  /* The square is sized in em on the title's size, so it rides the fluid
     scale with the text beside it. The glyph is the strong token on the
     soft tint, the pair the audit checks as a glyph. */
  div.icon {
    align-items: center;
    background: var(--loam-color-primary-soft);
    block-size: 2.25em;
    border-radius: var(--loam-radius-md);
    color: var(--loam-color-primary-strong);
    display: block flex;
    font-size: var(--loam-text-lg);
    inline-size: 2.25em;
    justify-content: center;
    margin-block-end: var(--loam-space-xs);

    svg {
      block-size: auto;
      inline-size: 1em;
    }
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

  /* Forced colours: the tint behind the glyph goes, so the square keeps
     an edge and the glyph takes the system text colour. */
  @media (forced-colors: active) {
    div.icon {
      border: 1px solid CanvasText;
    }
  }
}
```

