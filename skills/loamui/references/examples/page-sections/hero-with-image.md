---
title: Hero with image
description: A page-opening section: an eyebrow, a headline, a lede and two actions beside a photograph.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Hero with image

A page-opening section: an eyebrow, a headline, a lede and two actions beside a photograph.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Button`, `SignpostLink`
- Tags: landing, marketing, banner
- Live: https://loamui.com/examples/page-sections/hero-with-image

## Built to the pillars

- **Native CSS.** A section named by its own heading, an h1 because a hero opens the page; the type is the element styles' own.
- **Modern CSS.** The hero is a container: two columns where it has room, one where it has not, decided by its own width rather than the viewport.
- **Composition.** Three components, three jobs: Badge marks the season, SignpostLink goes to the catalogue and Button starts the video, with the play glyph a child the Button detects and sizes.
- **Contextualism.** The eyebrow declares --loam-context: primary, so the Badge inside takes the brand colour without a prop; primary is the brand slot, neutral until a theme fills it, and the eyebrow reads as one by its place above the heading.
- **Accessible & gatekept.** Going somewhere is a SignpostLink and doing something is a Button; the photograph carries real alt text.

## Example.tsx

```tsx
import { Badge, Button, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="hero-with-image" aria-labelledby="hero-with-image-title">
      <div className="inner">
        <div className="text">
          <p className="eyebrow">
            <Badge>Spring catalogue</Badge>
            <span>Sowing from March</span>
          </p>
          <h1 id="hero-with-image-title">Seed saved by growers, for growers.</h1>
          <p className="lede">
            Hedgerow is a nursery and seed co-op. Every packet is an open-pollinated variety grown
            on a member plot, dried and packed by hand, and posted the week you order it.
          </p>
          <div className="actions">
            <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
            <Button>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch how we save seed
            </Button>
          </div>
        </div>
        <img
          className="media"
          src="https://picsum.photos/id/785/1200/900"
          alt="A grower's cupped hands holding a bundle of green shoots"
          width="1200"
          height="900"
        />
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.hero-with-image) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    padding-block: var(--loam-space-xl);
  }

  /* The inner element is the grid: an element cannot answer its own
     container query. */
  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  p.eyebrow {
    --loam-context: primary;

    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    margin: 0;
  }

  h1 {
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 18ch;
    text-wrap: balance;
  }

  p.lede {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-lg);
    margin: 0;
    max-inline-size: var(--loam-measure);
  }

  div.actions {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
  }

  img.media {
    block-size: auto;
    border-radius: var(--loam-radius-lg);
    inline-size: 100%;
  }

  @container (inline-size >= 48rem) {
    div.inner {
      align-items: center;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    }
  }
}
```

