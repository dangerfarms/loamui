---
title: Embed map
description: A map in a squarer frame: named for what it shows, lazy until it is near, with directions in words and a link to the full map.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Embed map

A map in a squarer frame: named for what it shows, lazy until it is near, with directions in words and a link to the full map.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: iframe, openstreetmap, location, directions
- Live: https://loamui.com/examples/page-sections/embed-map

## Built to the pillars

- **Native CSS.** The same figure and iframe as the video, with a src that happens to be a map; the title says what the map shows, since that is the only name the frame has.
- **Modern CSS.** A 4 / 3 aspect-ratio on the frame, because a map reads better squarer than a video; nothing else changes between the two embeds.
- **Composition.** Element styles alone: what the frame shows is decided by its src, so a map needs no component.
- **Accessible & gatekept.** The caption gives the directions in words and links to the full map, so a reader who cannot use the frame is not left with a picture of a place.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <figure className="embed-map">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-2.80%2C52.36%2C-2.70%2C52.41&layer=mapnik&marker=52.385%2C-2.755"
        title="Map showing the Hedgerow nursery at Bromfield, north of Ludlow"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <figcaption>
        The nursery is on the A49 at Bromfield, two miles north of Ludlow; the entrance is beside
        the farm shop.{" "}
        <a href="https://www.openstreetmap.org/?mlat=52.385&mlon=-2.755#map=14/52.385/-2.755">
          Open in OpenStreetMap
        </a>
        .
      </figcaption>
    </figure>
  );
}
```

## example.css

```css
@scope (.embed-map) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-sm);
    margin: 0;
  }

  iframe {
    aspect-ratio: 4 / 3;
    background: var(--loam-color-bg-subtle);
    block-size: auto;
    border: 0;
    border-radius: var(--loam-radius-md);
    display: block flow;
    inline-size: 100%;

    /* Forced colours drop the footprint; the border keeps it until the frame
       loads. */
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

