---
title: Logo wall
description: Six stockists' marks in a row under a small heading, sized to one shared height so marks of any shape read as one set.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Logo wall

Six stockists' marks in a row under a small heading, sized to one shared height so marks of any shape read as one set.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: logos, partners, stockists, clients, trust
- Live: https://loamui.com/examples/page-sections/logo-wall

## Built to the pillars

- **Native CSS.** A section named by its heading and a list of six items, so a screen reader announces how many organisations there are before reading each one's name.
- **Modern CSS.** A wrapping flex row, not a grid: the marks differ in width, so each keeps its own ratio at one shared block-size and the row centres whatever fits.
- **Composition.** Element styles alone: inline svg marks in a list, with no component imported.
- **Accessible & gatekept.** Each mark is an svg with role=img and the organisation's name as its label, never the word logo, and the list keeps role=list so the count survives list-style: none.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <section className="logo-wall" aria-labelledby="logo-wall-title">
      <h2 id="logo-wall-title">Stocked by</h2>
      <ul role="list">
        <li>
          <svg role="img" aria-label="Teme Valley Growers" viewBox="0 0 40 40" fill="currentColor">
            <path d="M4 4h32v32H4Z" fillOpacity=".12" />
            <path d="M20 8c6 0 10 5 10 11 0 4-2 7-5 9l-5 4-5-4c-3-2-5-5-5-9 0-6 4-11 10-11Zm0 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
          </svg>
        </li>
        <li>
          <svg
            role="img"
            aria-label="Clun Allotment Society"
            viewBox="0 0 96 40"
            fill="currentColor"
          >
            <circle cx="20" cy="20" r="14" fillOpacity=".12" />
            <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
            <path
              d="M14 26h12M20 26V14M16 18l4-4 4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <text x="42" y="28" fontSize="22" fontWeight="700">
              CAS
            </text>
          </svg>
        </li>
        <li>
          <svg role="img" aria-label="The Potting Shed" viewBox="0 0 140 40" fill="currentColor">
            <text x="70" y="28" fontSize="22" fontWeight="700" textAnchor="middle">
              Potting Shed
            </text>
          </svg>
        </li>
        <li>
          <svg
            role="img"
            aria-label="Wenlock Edge Farm Shop"
            viewBox="0 0 60 40"
            fill="currentColor"
          >
            <path d="M6 30 30 8l24 22Z" fillOpacity=".12" />
            <path d="M14 30 30 16l16 14Z" />
          </svg>
        </li>
        <li>
          <svg role="img" aria-label="Border Bees" viewBox="0 0 120 40" fill="currentColor">
            <path d="m18 6 12 7v14l-12 7-12-7V13Z" fillOpacity=".12" />
            <path d="m18 12 7 4v8l-7 4-7-4v-8Z" />
            <text x="40" y="28" fontSize="22" fontWeight="700">
              Border
            </text>
          </svg>
        </li>
        <li>
          <svg role="img" aria-label="Corve Dale Schools" viewBox="0 0 200 40" fill="currentColor">
            <text
              x="100"
              y="28"
              fontSize="20"
              fontWeight="600"
              letterSpacing="6"
              textAnchor="middle"
            >
              CORVE DALE
            </text>
          </svg>
        </li>
      </ul>
    </section>
  );
}
```

## example.css

```css
/* A row of marks under a small heading. A wrapping flex row rather than
   a grid: the marks differ in width, and equal columns would leave the
   narrow ones swimming. Every mark shares one height and its width
   follows from its own aspect ratio, so a square mark and a wide
   wordmark read as one set. The list keeps its semantics through
   role="list" in the markup, since list-style: none drops them in some
   browsers. */
@scope (.logo-wall) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-lg);
    justify-items: center;
  }

  h2 {
    color: var(--loam-color-fg-muted);
    font-family: var(--loam-font);
    font-size: var(--loam-text-sm);
    font-weight: 600;
    letter-spacing: 0.04em;
    margin: 0;
    text-transform: uppercase;
  }

  ul {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-lg) var(--loam-space-xl);
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    flex: none;
    margin: 0;
  }

  /* Placeholder marks in one ink: a real page puts an img with the
     organisation's name as its alt here, in the brand's own colour. A
     mark is a picture, so the letters in it keep their order under
     right-to-left text, as the letters in an img would. */
  svg {
    block-size: 2.5rem;
    color: var(--loam-color-fg-muted);
    direction: ltr;
    display: block flow;
    font-family: var(--loam-font-display);
    inline-size: auto;
    max-inline-size: 100%;
  }
}
```

