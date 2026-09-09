---
title: Hero with background image
description: A page-opening section over a full-bleed photograph: a headline, a lede and two actions on a scrim that holds their contrast in both schemes.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Hero with background image

A page-opening section over a full-bleed photograph: a headline, a lede and two actions on a scrim that holds their contrast in both schemes.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `SignpostLink`
- Tags: landing, marketing, photo, cover, dark
- Live: https://loamui.com/examples/page-sections/hero-background-image

## Built to the pillars

- **Native CSS.** A section named by its h1, with the photograph as an img rather than a background-image so it is fetched, sized and lazy-loadable like any picture; the scrim is a pseudo-element behind the words.
- **Modern CSS.** The section declares color-scheme: dark, so every light-dark() token inside re-resolves to the dark palette in both schemes: the scrim is the background token faded and the words the foreground token, the pair the audit checks.
- **Composition.** SignpostLink and Button as core ships them, inheriting the dark scheme from the region rather than being told about it.
- **Contextualism.** One declaration on the region decides the scheme for everything in it; the Button takes its dark-scheme paint without a prop.
- **Accessible & gatekept.** The photograph is decoration behind the words, so its alt is empty; in forced colours the picture is dropped and the words stand on Canvas inside a border, since no scrim survives there.

## Example.tsx

```tsx
import { Button, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="hero-background-image" aria-labelledby="hero-background-image-title">
      <img
        className="media"
        src="https://picsum.photos/seed/hedgerow-field/1600/900"
        alt=""
        width="1600"
        height="900"
      />
      <div className="inner">
        <h1 id="hero-background-image-title">A field of seed, saved by the people who sow it.</h1>
        <p className="lede">
          Hedgerow grows open-pollinated vegetables, herbs and flowers on member plots across
          Shropshire, and posts the seed the week you order it.
        </p>
        <div className="actions">
          <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
          <Button>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch the harvest
          </Button>
        </div>
      </div>
    </section>
  );
}
```

## example.css

```css
/* Words over a photograph. The section is a dark region in both schemes:
   color-scheme: dark re-resolves every light-dark() token inside it, so
   the text is the dark scheme's foreground and the scrim is the dark
   scheme's background, faded. The pair is the one the audit already
   checks; the photograph beneath only ever makes the scrim darker. The
   picture and the scrim are painted behind the words with a stacking
   context of their own, so nothing outside the section can slip between. */
@scope (.hero-background-image) to ([class*="loam-"]) {
  :scope {
    align-content: end;
    border-radius: var(--loam-radius-xl);
    color: var(--loam-color-fg);
    color-scheme: dark;
    container-type: inline-size;
    display: block grid;
    isolation: isolate;
    min-block-size: 28rem;
    overflow: clip;
    padding: var(--loam-space-xl);
    position: relative;
  }

  img.media {
    block-size: 100%;
    inline-size: 100%;
    inset: 0;
    object-fit: cover;
    position: absolute;
    z-index: -2;
  }

  /* The scrim: the background token, faded, strongest where the words
     sit. Two stops from one token, not a guess at a grey. */
  :scope::before {
    background: linear-gradient(
      to top,
      color-mix(in oklch, var(--loam-color-bg) 88%, transparent),
      color-mix(in oklch, var(--loam-color-bg) 40%, transparent)
    );
    content: "";
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  h1 {
    color: var(--loam-color-fg-strong);
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 20ch;
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

  /* Wide: taller, with the words at their own measure in the lower start
     corner rather than spread across the full width. */
  @container (inline-size >= 48rem) {
    :scope {
      min-block-size: 34rem;
      padding: calc(var(--loam-space-xl) * 1.5);
    }
  }

  /* Forced colours: no scrim survives, so the photograph goes too and the
     words stand on Canvas inside an edge. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }

    img.media {
      display: none;
    }
  }
}
```

