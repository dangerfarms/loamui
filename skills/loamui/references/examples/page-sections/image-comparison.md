---
title: Image comparison
description: Black-and-white and colour treatments of the same photograph in one frame, the second revealed by a Range the reader drags or moves with the arrow keys.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Image comparison

Black-and-white and colour treatments of the same photograph in one frame, the second revealed by a Range the reader drags or moves with the arrow keys.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Range`
- Tags: before, after, slider, reveal, photos
- Live: https://loamui.com/examples/page-sections/image-comparison

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The handle is a real range input, so the comparison can be worked with a keyboard and is announced with a name and a value, not a pointer-only drag; the whole thing is a figure with a caption.
- **Modern CSS.** Before, after and the divider share one grid cell in DOM order, the top image is cut with clip-path from a custom property, and the physical inset flips under :dir(rtl) where the Range runs the other way.
- **Composition.** Range is dropped in as it comes; the example holds the value in state and writes it onto the figure as a custom property the stylesheet reads.
- **Accessible & gatekept.** Both images carry real alt text describing what each shows, the fallback position of 50% shows half of each before any script runs, and the divider keeps its ink in forced colours.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Range } from "@loamui/core";
import "./example.css";

export default function Example() {
  const [position, setPosition] = useState(50);
  return (
    <figure className="image-comparison" style={{ "--_position": `${position}%` } as CSSProperties}>
      <div className="before">
        <img
          src="https://picsum.photos/id/59/1200/675"
          alt="Black-and-white photograph of wooden fence posts and wire above long grass"
          width="1200"
          height="675"
        />
      </div>
      <div className="after">
        <img
          src="https://picsum.photos/id/59/1200/675"
          alt="The same fence photograph in colour: weathered brown posts above golden grass"
          width="1200"
          height="675"
        />
      </div>
      <Range
        aria-label="Reveal the colour photograph"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
      />
      <figcaption>
        One photograph in black and white and colour. Move the slider to compare the treatments.
      </figcaption>
    </figure>
  );
}
```

## example.css

```css
@scope (.image-comparison) to ([class*="loam-"]) {
  :scope {
    /* The script writes the position onto the figure; 50% is the fallback
       before it runs. */
    --_position: 50%;
    --_ratio: 16 / 9;

    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr);
    margin: 0;

    &::after {
      background: var(--loam-color-on-strong);
      box-shadow: 0 0 0 1px var(--loam-color-fg);
      content: "";
      grid-area: 1 / 1;
      inline-size: var(--loam-ring-width);
      justify-self: start;
      margin-inline-start: calc(var(--_position) - var(--loam-ring-width) / 2);
      pointer-events: none;

      @media (forced-colors: active) {
        background: CanvasText;
        forced-color-adjust: none;
      }
    }
  }

  div.before,
  /* The inset is physical, so it flips under :dir(rtl), where the Range runs
     the other way. */
  div.after {
    aspect-ratio: var(--_ratio);
    border-radius: var(--loam-radius-md);
    grid-area: 1 / 1;
    inline-size: 100%;
    overflow: hidden;

    img {
      block-size: 100%;
      display: block flow;
      inline-size: 100%;
      object-fit: cover;
    }
  }

  div.before img {
    filter: grayscale(1);
  }

  div.after {
    clip-path: inset(0 calc(100% - var(--_position)) 0 0);

    &:dir(rtl) {
      clip-path: inset(0 0 0 calc(100% - var(--_position)));
    }
  }

  figcaption {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
  }
}
```

