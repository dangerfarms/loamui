---
title: Call to action with media
description: A closing section with a photograph beside the words: two columns where there is room, one where there is not.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Call to action with media

A closing section with a photograph beside the words: two columns where there is room, one where there is not.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SignpostLink`
- Tags: landing, marketing, closing, cta, image
- Live: https://loamui.com/examples/page-sections/call-to-action-with-media

## Built to the pillars

- **Native CSS.** A section named by its h2 holding a plain img with real alt text and its intrinsic size, so the layout has the picture's shape before it loads.
- **Modern CSS.** The section is the container and the inner element the grid; two columns arrive from the section's own width, never from the viewport.
- **Composition.** One SignpostLink is the whole action row; the example's rule stops at its root and the picture is just an img in a grid cell.
- **Accessible & gatekept.** The words come first in the markup on every width, so the reading order matches what a sighted reader gets even when the picture stacks beneath.

## Example.tsx

```tsx
import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section
      className="call-to-action-with-media"
      aria-labelledby="call-to-action-with-media-title"
    >
      <div className="inner">
        <div className="text">
          <h2 id="call-to-action-with-media-title">Sow along with us this spring</h2>
          <p className="lede">
            The sowing calendar tells you what to start each week, indoors or out, and the guide in
            every packet picks up where it leaves off.
          </p>
          <div className="actions">
            <SignpostLink href="/calendar">Open the sowing calendar</SignpostLink>
          </div>
        </div>
        <img
          className="media"
          src="https://picsum.photos/seed/hedgerow-sowing/800/600"
          alt="Hands pressing seeds into a tray of compost on a potting bench"
          width="800"
          height="600"
        />
      </div>
    </section>
  );
}
```

## example.css

```css
/* The closing block beside a photograph. The section carries the surface
   and is the container; the inner element is the grid, because an
   element cannot answer its own container query. Beside media the words
   align start, since a centred column next to a picture reads as two
   things rather than one. */
@scope (.call-to-action-with-media) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    padding: var(--loam-space-xl);
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    max-inline-size: 22ch;
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
    gap: var(--loam-space-lg);
  }

  img.media {
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
  }

  /* Wide: the words and the picture side by side, centred on the shared
     axis. Narrow keeps the single column above, picture last. */
  @container (inline-size >= 48rem) {
    div.inner {
      align-items: center;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
  }

  /* Forced colours drop the tint, so the block keeps an edge. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }
  }
}
```

