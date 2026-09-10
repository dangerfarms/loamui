---
title: Feature grid
description: Six features under a section header: an icon, a heading and a line each, in a grid that fits as many across as it has room for.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Feature grid

Six features under a section header: an icon, a heading and a line each, in a grid that fits as many across as it has room for.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: features, benefits, grid, icons, marketing
- Live: https://loamui.com/examples/page-sections/feature-grid

## Built to the pillars

- **Native CSS.** A section named by its h2, a header for the intro and a list of six items with h3 headings, so the outline reads the way the page looks.
- **Modern CSS.** The list is an auto-fit grid answering the section's own width, and the icon square is sized in em on the heading's type so it rides the fluid scale.
- **Composition.** No card and no component: a feature is scanned, not compared, so each is an icon, a heading and a muted line set apart by space.
- **Accessible & gatekept.** The icons are aria-hidden because the headings carry the meaning, and the list keeps role=list so the count survives list-style: none in every browser.

## Example.tsx

```tsx
import "./example.css";

const FEATURES = [
  {
    title: "Open-pollinated only",
    description:
      "Every variety comes true from saved seed, so the packet you buy this year can be the last one you need.",
    icon: (
      <>
        <path d="M12 22V12" />
        <path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7Z" />
        <path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />
      </>
    ),
  },
  {
    title: "Grown on member plots",
    description:
      "Selected and harvested on allotments within twenty miles of the nursery, by people who eat what they grow.",
    icon: (
      <>
        <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    title: "Packed the week you order",
    description:
      "Seed is dried and stored whole, then packed to order, so nothing sits in a warehouse losing its vigour.",
    icon: (
      <>
        <path d="m3 7 9-4 9 4v10l-9 4-9-4Z" />
        <path d="m3 7 9 4 9-4" />
        <path d="M12 11v10" />
      </>
    ),
  },
  {
    title: "A guide in every packet",
    description:
      "Sowing depth, spacing and timing on the back, and a longer guide online, written by the grower.",
    icon: (
      <>
        <path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4Z" />
        <path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7Z" />
      </>
    ),
  },
  {
    title: "Germination tested",
    description:
      "Every batch is tested before it is listed, and the rate is printed on the packet beside the harvest year.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Workshops all year",
    description:
      "Seed saving, grafting and winter pruning at the nursery, free to members and open to everyone.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 3v4M16 3v4" />
      </>
    ),
  },
];

export default function Example() {
  return (
    <section className="feature-grid" aria-labelledby="feature-grid-title">
      <header>
        <p className="eyebrow">Why Hedgerow</p>
        <h2 id="feature-grid-title">Seed you can save again</h2>
        <p className="description">
          Everything in the catalogue is grown for flavour and for saving, so a packet is the start
          of a variety you keep, not a purchase you repeat.
        </p>
      </header>
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
    </section>
  );
}
```

## example.css

```css
@scope (.feature-grid) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-xl);
  }

  header {
    display: block grid;
    gap: var(--loam-space-sm);
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
    max-inline-size: 30ch;
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
    gap: var(--loam-space-xl) var(--loam-space-lg);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    align-content: start;
    display: block grid;
    gap: var(--loam-space-sm);
    margin: 0;

    > p {
      color: var(--loam-color-fg-muted);
      margin: 0;
      text-wrap: pretty;
    }
  }

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

    svg {
      block-size: auto;
      inline-size: 1em;
    }
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    div.icon {
      border: 1px solid CanvasText;
    }
  }
}
```

