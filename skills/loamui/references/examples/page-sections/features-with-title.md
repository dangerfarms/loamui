---
title: Features with title
description: A two-column section: a heading, a paragraph and a link on one side, and four features with icons on the other.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Features with title

A two-column section: a heading, a paragraph and a link on one side, and four features with icons on the other.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SignpostLink`
- Tags: features, benefits, split, icons, about
- Live: https://loamui.com/examples/page-sections/features-with-title

## Built to the pillars

- **Native CSS.** A section named by its h2, with the four points as a list of h3 headings, so the outline holds the argument and its evidence in order.
- **Modern CSS.** Two grids, each answering the section's own width: the inner element splits 2:3 at 48rem, and the list of points fits two across whenever its column has 28rem to give them.
- **Composition.** One SignpostLink to the fuller account; the points are the example's own markup, an icon, a heading and a line, with no component between.
- **Accessible & gatekept.** The icons are aria-hidden because the headings carry the meaning, the list keeps role=list so its count survives list-style: none, and the tint behind each glyph gets a border in forced colours.

## Example.tsx

```tsx
import { SignpostLink } from "@loamui/core";
import "./example.css";

const FEATURES = [
  {
    title: "Comes true from saved seed",
    description:
      "No hybrids. Save from the best plants and the variety improves on your plot year on year.",
    icon: (
      <>
        <path d="M12 22V12" />
        <path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7Z" />
        <path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
      </>
    ),
  },
  {
    title: "Selected for this climate",
    description:
      "Grown on member plots in the Shropshire hills, so it has already met the wind and the wet.",
    icon: (
      <>
        <path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18Z" />
        <path d="M9 21v-1M13 21v-1M11 23v-1" />
      </>
    ),
  },
  {
    title: "Tested before it is listed",
    description:
      "The germination rate on the packet is from this batch, checked in the month it was packed.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Fair to the grower",
    description:
      "Half of every packet's price goes to the member who grew it, and the rest runs the bench.",
    icon: (
      <>
        <path d="M12 3v18" />
        <path d="M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7" />
      </>
    ),
  },
];

export default function Example() {
  return (
    <section className="features-with-title" aria-labelledby="features-with-title-title">
      <div className="inner">
        <div className="text">
          <h2 id="features-with-title-title">Why seed from a co-op is different</h2>
          <p>
            A packet from a seed company was bred somewhere warmer, flatter and drier than your
            plot. A packet from Hedgerow was grown twenty miles away by someone who eats what they
            sow, and it goes back into the ground the year after with nothing lost.
          </p>
          <div className="actions">
            <SignpostLink href="/about/seed">How we save seed</SignpostLink>
          </div>
        </div>
        <ul role="list">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

## example.css

```css
/* A title and its argument on one side, the four points that back it on
   the other. The section is the container and the inner element the
   grid, because an element cannot answer its own container query. The
   points are their own small grid, two across when the column allows
   and one otherwise, and the markup keeps role="list" for the browsers
   that drop the semantics with the marker. */
@scope (.features-with-title) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    padding-block: var(--loam-space-xl);
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
  }

  ul {
    display: block grid;
    gap: var(--loam-space-lg);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    align-content: start;
    display: block grid;
    gap: var(--loam-space-xs);
    margin: 0;

    > p {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-sm);
      margin: 0;
      text-wrap: pretty;
    }
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
    font-size: var(--loam-text-md);
    inline-size: 2.25em;
    justify-content: center;
    margin-block-end: var(--loam-space-xs);

    svg {
      block-size: auto;
      inline-size: 1em;
    }
  }

  h3 {
    font-size: var(--loam-text-md);
    margin: 0;
  }

  div.text {
    align-content: start;
    display: block grid;
    gap: var(--loam-space-md);

    > p {
      color: var(--loam-color-fg-muted);
      margin: 0;
      max-inline-size: var(--loam-measure);
      text-wrap: pretty;
    }
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    max-inline-size: 22ch;
    text-wrap: balance;
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
  }

  /* Wide: the argument in the smaller column and the points in the
     larger one, where their own grid has room for two across. */
  @container (inline-size >= 48rem) {
    div.inner {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }
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

