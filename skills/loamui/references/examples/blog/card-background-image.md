---
title: Card over a background image
description: An article teaser laid over a photo: a category Badge, the title, a line and a Read article link on a scrim that keeps the words readable whatever the picture.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card over a background image

An article teaser laid over a photo: a category Badge, the title, a line and a Read article link on a scrim that keeps the words readable whatever the picture.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`, `SignpostLink`
- Tags: teaser, hero card, overlay, scrim, image card
- Live: https://loamui.com/examples/blog/card-background-image

## Built to the pillars

- **Native CSS.** The picture is an img in the markup, not a CSS background, so it lazy-loads, prints and is swapped like any image; the Card is an article named by its heading.
- **Modern CSS.** The Card sets color-scheme: dark, so every light-dark() token inside resolves to its dark answer whatever the page's scheme: light words over a scrim mixed from the dark background token, with no second palette written for the card.
- **Composition.** The photo and the scrim are laid under the Card's padding box with position rather than by removing the Card's padding, so core's surface, line, radius and padding stay untouched; Badge and SignpostLink take the dark scheme as they come.
- **Contextualism.** The dark scheme is declared once on the Card and the Badge, the link and the text all answer it; the same Card in a light region needs no props changed.
- **Accessible & gatekept.** The scrim is heaviest where the words are, and in forced colours, which keep photographs but drop painted backgrounds, both the scrim and the photo are hidden so the words sit on the canvas.

## Example.tsx

```tsx
import { Badge, Card, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card
      render={
        <article className="card-background-image" aria-labelledby="card-background-image-title" />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/seed/hedgerow-walled-garden-dusk/900/600"
        alt=""
        width="900"
        height="600"
      />
      <div className="text">
        <p className="meta">
          <Badge>Members’ plots</Badge>
        </p>
        <h3 id="card-background-image-title">The walled garden after closing</h3>
        <p className="description">
          What the members who hold a plot inside the wall do with the hour after the gates shut,
          and why the co-op keeps that hour theirs.
        </p>
        <div className="actions">
          <SignpostLink href="/journal/walled-garden-after-closing">
            Read article
            <span className="loam-VisuallyHidden"> – The walled garden after closing</span>
          </SignpostLink>
        </div>
      </div>
    </Card>
  );
}
```

## example.css

```css
/* The Card is the article, so its element is this scope's root: core's
   surface, line, radius and padding stay as they are. The photo is laid
   under the padding box and a scrim over it, and the words sit in the
   Card's own padding above both. The Card declares its colour scheme
   dark whatever the page's, so every token inside resolves to its dark
   answer: light words, a dark scrim, and the contrast the pair is
   audited for. The Badge and the SignpostLink keep their recipes behind
   the donut and take the same scheme. */
@scope (.card-background-image) to ([class*="loam-"]) {
  :scope {
    align-content: end;
    color: var(--loam-color-fg);
    color-scheme: dark;
    container-type: inline-size;
    display: block grid;
    min-block-size: 20rem;
    overflow: clip;
    position: relative;

    /* The scrim: heavier at the foot, where the words are. */
    &::after {
      background: linear-gradient(
        to top,
        color-mix(in oklch, var(--loam-color-bg) 88%, transparent) 0%,
        color-mix(in oklch, var(--loam-color-bg) 64%, transparent) 55%,
        color-mix(in oklch, var(--loam-color-bg) 24%, transparent) 100%
      );
      content: "";
      inset: 0;
      position: absolute;
    }
  }

  img.media {
    block-size: 100%;
    inline-size: 100%;
    inset: 0;
    object-fit: cover;
    position: absolute;
  }

  /* Positioned and after the scrim in the stacking, so the words paint
     over it. */
  div.text {
    display: block grid;
    gap: var(--loam-space-sm);
    justify-items: start;
    position: relative;
    z-index: 1;
  }

  p.meta {
    margin: 0;
  }

  h3 {
    color: var(--loam-color-fg-strong);
    font-size: var(--loam-text-xl);
    margin: 0;
    text-wrap: balance;
  }

  p.description {
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    margin-block-start: var(--loam-space-xs);
  }

  /* Forced colours keep photographs but drop every painted background,
     so the scrim would go and the words would sit on the picture: the
     picture goes too, and the words sit on the canvas. */
  @media (forced-colors: active) {
    :scope::after {
      display: none;
    }

    img.media {
      display: none;
    }
  }
}
```

