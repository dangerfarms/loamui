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
