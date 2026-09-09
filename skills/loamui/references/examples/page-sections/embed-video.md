---
title: Embed video
description: A hosted video in a sized frame: named for assistive technology, lazy until it is near, with a caption and a link to the source.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Embed video

A hosted video in a sized frame: named for assistive technology, lazy until it is near, with a caption and a link to the source.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: iframe, youtube, media, video
- Live: https://loamui.com/examples/page-sections/embed-video

## Built to the pillars

- **Native CSS.** A figure holding an iframe and a figcaption; the iframe's title is the only name a screen reader has for the frame, so it says what the video is and whose it is.
- **Modern CSS.** The frame is sized by aspect-ratio before anything loads, so the page never shifts, and the subtle background is its footprint until then.
- **Composition.** Element styles alone: what the frame shows is decided by its src, so a video needs no component.
- **Accessible & gatekept.** The frame loads lazily and sends a strict-origin referrer; the caption links to the video where it lives, so a reader who cannot use the frame still has a way to it.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <figure className="embed-video">
      <iframe
        src="https://www.youtube-nocookie.com/embed/22quk7oyIQM"
        title="How to sow broad beans and save bean seeds, from Organic Edible Garden"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
      />
      <figcaption>
        Sowing broad beans in autumn and keeping the best pods back for next year&rsquo;s seed, the
        way the bench does it.{" "}
        <a href="https://www.youtube.com/watch?v=22quk7oyIQM">Watch on YouTube</a>.
      </figcaption>
    </figure>
  );
}
```

## example.css

```css
/* A hosted video in a figure. The frame is sized by ratio before it
   loads, so the page never shifts when it does, and the subtle background
   is its footprint in the meantime. */
@scope (.embed-video) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-sm);
    margin: 0;
  }

  iframe {
    aspect-ratio: 16 / 9;
    background: var(--loam-color-bg-subtle);
    block-size: auto;
    border: 0;
    border-radius: var(--loam-radius-md);
    display: block flow;
    inline-size: 100%;

    /* Forced colours drop the background, so the footprint would vanish
       until the frame loads; a border in the text colour keeps it. */
    @media (forced-colors: active) {
      border: 1px solid CanvasText;
    }
  }

  figcaption {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
    max-inline-size: var(--loam-measure);
  }
}
```

