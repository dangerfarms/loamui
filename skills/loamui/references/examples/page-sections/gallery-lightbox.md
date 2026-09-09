---
title: Gallery with lightbox
description: Six photographs in a grid of figures, each a link to the full-size file that opens it in a Modal once JavaScript arrives.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Gallery with lightbox

Six photographs in a grid of figures, each a link to the full-size file that opens it in a Modal once JavaScript arrives.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Modal`
- Tags: photos, images, grid, modal, lightbox
- Live: https://loamui.com/examples/page-sections/gallery-lightbox

## Built to the pillars

- **Native CSS.** Every thumbnail is an a whose href is the full-size file, so the gallery works before hydration and a modified click still opens a new tab; the lightbox is a native dialog with its backdrop, Escape and focus restore.
- **Modern CSS.** An auto-fill grid of square, object-fit thumbnails answering its own width, and the Modal's width set through its public --loam-modal-size rather than a rule inside it.
- **Composition.** Modal.Root, Popup and Close are arranged in the markup; the example holds the open state and which photo, and reaches the dialog's insides from a second scope rooted at its own element.
- **Accessible & gatekept.** The dialog is named by the figure's caption, or the alt when there is none, so it is never an unnamed dialog; the list keeps role=list so the count survives list-style: none.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import { Modal } from "@loamui/core";
import "./example.css";

const PHOTOS = [
  {
    id: "beds",
    alt: "Raised beds of young lettuce under fleece",
    caption: "The trial beds in April",
  },
  { id: "tunnel", alt: "Tomato plants trained up strings inside a polytunnel" },
  {
    id: "drying",
    alt: "Bunches of onions hung to dry from a barn rafter",
    caption: "The drying barn",
  },
  { id: "packets", alt: "Hand-stamped seed packets laid out on a bench" },
  { id: "beans", alt: "A trellis of crimson-flowered broad beans in bloom" },
  {
    id: "openday",
    alt: "Visitors walking between rows of squash on an open day",
    caption: "Open day, September",
  },
];

const thumb = (id: string) => `https://picsum.photos/seed/hedgerow-${id}/600/600`;
const full = (id: string) => `https://picsum.photos/seed/hedgerow-${id}/1600/1067`;

/** What the lightbox shows. Kept after closing, so the dialog stays mounted and the image stays put while it leaves. */
interface Opened {
  src: string;
  alt: string;
  name: string;
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState<Opened | null>(null);

  function show(event: MouseEvent<HTMLAnchorElement>, photo: (typeof PHOTOS)[number]) {
    // A modified click (new tab, new window, download) keeps the link's own behaviour.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setOpened({ src: full(photo.id), alt: photo.alt, name: photo.caption ?? photo.alt });
    setOpen(true);
  }

  return (
    <div className="gallery-lightbox">
      <ul role="list">
        {PHOTOS.map((photo) => (
          <li key={photo.id}>
            <figure>
              <a href={full(photo.id)} onClick={(event) => show(event, photo)}>
                <img
                  src={thumb(photo.id)}
                  alt={photo.alt}
                  width="600"
                  height="600"
                  loading="lazy"
                />
              </a>
              {photo.caption && <figcaption>{photo.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      {opened && (
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Popup aria-label={opened.name}>
            <div className="lightbox">
              <img src={opened.src} alt={opened.alt} />
              <Modal.Close>Close</Modal.Close>
            </div>
          </Modal.Popup>
        </Modal.Root>
      )}
    </div>
  );
}
```

## example.css

```css
/* A grid of figures, each a real link to the full-size file, so every
   thumbnail works before JavaScript; once hydrated a click opens the
   file in a Modal instead. The list keeps its semantics through
   role="list" in the markup, since list-style: none drops them in some
   browsers. The Modal's width is its public knob, set here and inherited
   by the dialog: as wide as the viewport allows, capped so a large image
   is still one glance. */
@scope (.gallery-lightbox) to ([class*="loam-"]) {
  :scope {
    --loam-modal-size: min(100% - 2 * var(--loam-space-lg), 72rem);

    container-type: inline-size;
  }

  ul {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  figure {
    display: block grid;
    gap: var(--loam-space-xs);
    margin: 0;
  }

  /* The link is a block the size of its image, with the image's radius so
     the focus ring follows the corners. It lifts on hover only where a
     pointer can hover and motion is welcome. */
  a {
    border-radius: var(--loam-radius-md);
    display: block flow;

    @media (prefers-reduced-motion: no-preference) and (hover: hover) {
      transition: translate var(--loam-duration-md) var(--loam-ease);

      &:hover {
        translate: 0 -2px;
      }
    }
  }

  /* Square thumbnails, cropped rather than squashed, so a grid of mixed
     photographs reads as one grid. */
  img {
    aspect-ratio: 1;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    display: block flow;
    inline-size: 100%;
    object-fit: cover;
  }

  figcaption {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
  }
}

/* The lightbox's contents sit inside the Modal's Popup, which the donut
   above fences off, so they are reached from a second scope rooted at
   the example's own element in it. The Modal's look is untouched; this
   arranges the large image and the Close within it. The image keeps its
   own ratio and is capped at most of the viewport's block size, leaving
   room for the dialog's padding and the Close, so the dialog never
   scrolls to show the whole picture. */
@scope (.gallery-lightbox div.lightbox) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    justify-items: center;
  }

  img {
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: auto;
    max-block-size: 80dvb;
    max-inline-size: 100%;
  }
}
```

