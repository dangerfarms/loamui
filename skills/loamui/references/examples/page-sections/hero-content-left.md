---
title: Hero with content left
description: A page-opening section with the headline, lede and actions on the start side and an illustration on the end side that drops below when there is no room.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Hero with content left

A page-opening section with the headline, lede and actions on the start side and an illustration on the end side that drops below when there is no room.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `SignpostLink`
- Tags: landing, marketing, illustration, split
- Live: https://loamui.com/examples/page-sections/hero-content-left

## Built to the pillars

- **Native CSS.** A section named by its h1; the illustration is inline SVG drawn in currentColor, so it is styled by the same cascade as the words and needs no image file.
- **Modern CSS.** The section is a container and the inner element the grid: one column with the picture last, two columns at 48rem of the section's own width, decided by the section rather than the viewport.
- **Composition.** Button for the thing to do and SignpostLink for the place to go; the illustration is the example's own svg, so no component is bent into a picture.
- **Contextualism.** The drawing's lines are the strong primary token and its fills the soft one, so a themed primary re-colours the picture along with everything else.
- **Accessible & gatekept.** The illustration is aria-hidden because the headline says what it shows, and in forced colours the fills go to Canvas and the lines to CanvasText so the drawing stays a drawing.

## Example.tsx

```tsx
import { Button, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="hero-content-left" aria-labelledby="hero-content-left-title">
      <div className="inner">
        <div className="text">
          <h1 id="hero-content-left-title">Grow a variety you can keep.</h1>
          <p className="lede">
            Every packet from Hedgerow is open-pollinated and comes true from saved seed, so the
            beans you sow this spring are the beans your children sow. Members pick twelve packets a
            year and swap the rest at the bench.
          </p>
          <div className="actions">
            <Button>Join the co-op</Button>
            <SignpostLink href="/how-it-works">How membership works</SignpostLink>
          </div>
        </div>
        <svg
          className="illustration"
          viewBox="0 0 320 240"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle className="fill" cx="252" cy="64" r="28" />
          <path d="M252 20v8M252 100v8M208 64h8M288 64h8M221 33l6 6M277 89l6 6M283 33l-6 6M227 89l-6 6" />
          <path d="M20 196h280" />
          <path className="fill" d="M102 128h116l-10 76H112Z" />
          <rect className="fill" x="94" y="114" width="132" height="16" rx="4" />
          <path d="M160 114V64" />
          <path className="fill" d="M160 96c0-22 16-36 40-36 0 22-16 36-40 36Z" />
          <path className="fill" d="M160 110c0-16-12-28-32-28 0 16 12 28 32 28Z" />
          <path d="M40 196c0-10 8-18 18-18M62 196c0-6 5-11 11-11M270 196c0-8-6-14-14-14" />
        </svg>
      </div>
    </section>
  );
}
```

## example.css

```css
/* Words on the start side, a picture on the end side. The section is the
   container and the inner element the grid, because an element cannot
   answer its own container query. Narrow is one column with the picture
   last; wide is two columns centred on the shared axis. The picture is a
   line drawing in the current colour, with its fills in the soft primary
   tint, so it takes the scheme and the region's context like the text. */
@scope (.hero-content-left) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    padding-block: var(--loam-space-xl);
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  h1 {
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 16ch;
    text-wrap: balance;
  }

  p.lede {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-lg);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
  }

  svg.illustration {
    block-size: auto;
    color: var(--loam-color-primary-strong);
    inline-size: 100%;
    justify-self: center;
    max-inline-size: 24rem;

    .fill {
      fill: var(--loam-color-primary-soft);
    }
  }

  /* Wide: the words take the larger share and the picture the rest,
     which is what keeps the headline short enough to balance. */
  @container (inline-size >= 48rem) {
    div.inner {
      align-items: center;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    }

    svg.illustration {
      justify-self: end;
    }
  }

  /* Forced colours: the tint goes; the drawing is its lines, in the
     system text colour, which is all it ever needed. */
  @media (forced-colors: active) {
    svg.illustration {
      color: CanvasText;

      .fill {
        fill: Canvas;
      }
    }
  }
}
```

