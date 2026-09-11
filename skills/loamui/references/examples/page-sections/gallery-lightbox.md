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

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

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
    id: 955,
    alt: "Rows of the trial beds seen from the bank above",
    caption: "The trial beds in April",
  },
  { id: 400, alt: "Flower buds forming on a shrub in the stock beds" },
  {
    id: 112,
    alt: "Grass seed heads ripening in the meadow",
    caption: "Seed left to ripen",
  },
  { id: 627, alt: "Freshly picked green beans in a crate on the bench" },
  { id: 1080, alt: "Strawberries in punnets on the open-day stall" },
  {
    id: 17,
    alt: "Visitors on the meadow path on an open day",
    caption: "Open day, September",
  },
];

const url = (id: number, size: string) => `https://picsum.photos/id/${id}/${size}`;

/** What the lightbox shows; kept after closing so the image stays put while the dialog leaves. */
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
    setOpened({
      src: url(photo.id, "1600/1067"),
      alt: photo.alt,
      name: photo.caption ?? photo.alt,
    });
    setOpen(true);
  }

  return (
    <div className="gallery-lightbox">
      <ul role="list">
        {PHOTOS.map((photo) => (
          <li key={photo.id}>
            <figure>
              <a href={url(photo.id, "1600/1067")} onClick={(event) => show(event, photo)}>
                <img
                  src={url(photo.id, "600/600")}
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
@scope (.gallery-lightbox) to ([class*="loam-"]) {
  :scope {
    --loam-modal-size: min(100% - 2 * var(--loam-space-lg), 72rem);

    container-type: inline-size;
  }

  ul {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
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

    /* Short of the viewport, leaving room for the dialog's padding and the
       Close, so the dialog never scrolls. */
    max-block-size: 80dvb;
    max-inline-size: 100%;
  }
}
```

