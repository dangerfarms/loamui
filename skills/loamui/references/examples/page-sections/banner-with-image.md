---
title: Banner with image
description: A promotional banner: a photograph on one side and, on the other, an offer with its closing date as a Badge, a line and one place to go.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Banner with image

A promotional banner: a photograph on one side and, on the other, an offer with its closing date as a Badge, a line and one place to go.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `SignpostLink`
- Tags: promotion, offer, sale, banner, photo
- Live: https://loamui.com/examples/page-sections/banner-with-image

## Built to the pillars

- **Native CSS.** A section named by its h2 with the photograph as an img carrying real alt text, because a picture of the trees on offer is content, not decoration.
- **Modern CSS.** The section is the container and the grid: one column with the picture on top, then a 2:3 split at 44rem of its own width where the picture grows to the height of the words and is cropped rather than letterboxed.
- **Composition.** No Card: a Card pads every side and the picture runs to the edge, so the section paints its own surface and line from the same tokens; Badge and SignpostLink are dropped in as they come.
- **Contextualism.** The eyebrow declares --loam-context: warning, so the Badge with the closing date takes the warning colour without a prop: a deadline is a deadline, not a brand mark.
- **Accessible & gatekept.** Going somewhere is a SignpostLink, the closing date is in words as well as colour, and the surface keeps its own border, so forced colours have an edge to keep.

## Example.tsx

```tsx
import { Badge, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="banner-with-image" aria-labelledby="banner-with-image-title">
      <img
        className="media"
        src="https://picsum.photos/id/429/800/600"
        alt="A cup of freshly picked raspberries on the nursery bench"
        width="800"
        height="600"
      />
      <div className="text">
        <p className="eyebrow">
          <Badge>Until 30 November</Badge>
          <span>Bare-root season</span>
        </p>
        <h2 id="banner-with-image-title">Members take a fifth off fruit trees</h2>
        <p className="description">
          Apples, pears, plums and soft fruit on local rootstocks, lifted the week they are posted.
          Order before the end of November and the discount comes off at the basket.
        </p>
        <div className="actions">
          <SignpostLink href="/catalogue/fruit">See the fruit list</SignpostLink>
        </div>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.banner-with-image) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-surface);
    border: 1px solid var(--loam-color-line);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    display: block grid;
    overflow: clip;
  }

  img.media {
    aspect-ratio: 16 / 9;
    block-size: auto;
    inline-size: 100%;
    object-fit: cover;
  }

  div.text {
    align-content: center;
    display: block grid;
    gap: var(--loam-space-md);
    padding: var(--loam-space-xl);
  }

  p.eyebrow {
    --loam-context: warning;

    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    margin: 0;
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    max-inline-size: 22ch;
    text-wrap: balance;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
  }

  @container (inline-size >= 44rem) {
    :scope {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }

    img.media {
      aspect-ratio: auto;
      block-size: 100%;
      min-block-size: 0;
    }
  }
}
```

