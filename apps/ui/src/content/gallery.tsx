"use client";

import { Gallery } from "@loamui/ui";
import type { Composition } from "./types";

const gallery: Composition = {
  slug: "gallery",
  name: "Gallery",
  category: "Page sections",
  description:
    "A grid of figures, each an image that opens larger: a real link to the full-size file, a lightbox once JavaScript arrives.",
  lead: "The unit is the figure: a link around your img and an optional figcaption, valid on its own in an article. The link's href is the full-size image, so every thumbnail works without JavaScript; once hydrated a click opens that image in a core Modal instead, and the native dialog brings the backdrop, Escape and focus restore with it. The optional Root is a list, so the count is announced, laid out as many columns as fit.",
  importLine: `import { Gallery } from "@loamui/ui";`,
  parts: [
    {
      name: "Gallery.Item",
      description:
        "One image: a figure holding a Link and an optional Caption. Inside a Root it is wrapped in a list item; on its own it is just the figure. Thumbnails are square; set another aspect-ratio on the img in your own CSS.",
    },
    {
      name: "Gallery.Root",
      description:
        "Optional. A list of items laid out as an auto-fill grid of 12rem columns; declares its own container. Override the columns in your own CSS, or leave the Root out and place items in a layout of your own.",
    },
    {
      name: "Gallery.Link",
      description:
        "The link around your img. href is the full-size image: where the link goes without JavaScript, and what the lightbox shows with it. A modified click (new tab) stays a link. Pass closeLabel to translate the lightbox's Close.",
    },
    {
      name: "Gallery.Caption",
      description: "Optional. The figcaption under the image, muted and small.",
    },
  ],
  demos: [
    {
      title: "A photo grid",
      description:
        "Six figures in a Root. Each thumbnail links to the 1600px file; click one to open it in the lightbox, or open it in a new tab as you would any link. Two carry captions.",
      code: `<Gallery.Root>
  <Gallery.Item>
    <Gallery.Link href="https://picsum.photos/seed/11/1600/1600">
      <img src="https://picsum.photos/seed/11/800/800" alt="A mountain ridge under low cloud" />
    </Gallery.Link>
    <Gallery.Caption>The ridge, early morning</Gallery.Caption>
  </Gallery.Item>
  <Gallery.Item>
    <Gallery.Link href="https://picsum.photos/seed/12/1600/1600">
      <img src="https://picsum.photos/seed/12/800/800" alt="A pier reaching into a still lake" />
    </Gallery.Link>
  </Gallery.Item>
  <Gallery.Item>
    <Gallery.Link href="https://picsum.photos/seed/13/1600/1600">
      <img src="https://picsum.photos/seed/13/800/800" alt="Dry grass in a field at dusk" />
    </Gallery.Link>
  </Gallery.Item>
  <Gallery.Item>
    <Gallery.Link href="https://picsum.photos/seed/14/1600/1600">
      <img src="https://picsum.photos/seed/14/800/800" alt="A city street in the rain" />
    </Gallery.Link>
    <Gallery.Caption>Rain on the high street</Gallery.Caption>
  </Gallery.Item>
  <Gallery.Item>
    <Gallery.Link href="https://picsum.photos/seed/15/1600/1600">
      <img src="https://picsum.photos/seed/15/800/800" alt="Waves breaking on a shingle beach" />
    </Gallery.Link>
  </Gallery.Item>
  <Gallery.Item>
    <Gallery.Link href="https://picsum.photos/seed/16/1600/1600">
      <img src="https://picsum.photos/seed/16/800/800" alt="A forest path between tall pines" />
    </Gallery.Link>
  </Gallery.Item>
</Gallery.Root>`,
      render: () => (
        <Gallery.Root>
          <Gallery.Item>
            <Gallery.Link href="https://picsum.photos/seed/11/1600/1600">
              <img
                src="https://picsum.photos/seed/11/800/800"
                alt="A mountain ridge under low cloud"
              />
            </Gallery.Link>
            <Gallery.Caption>The ridge, early morning</Gallery.Caption>
          </Gallery.Item>
          <Gallery.Item>
            <Gallery.Link href="https://picsum.photos/seed/12/1600/1600">
              <img
                src="https://picsum.photos/seed/12/800/800"
                alt="A pier reaching into a still lake"
              />
            </Gallery.Link>
          </Gallery.Item>
          <Gallery.Item>
            <Gallery.Link href="https://picsum.photos/seed/13/1600/1600">
              <img src="https://picsum.photos/seed/13/800/800" alt="Dry grass in a field at dusk" />
            </Gallery.Link>
          </Gallery.Item>
          <Gallery.Item>
            <Gallery.Link href="https://picsum.photos/seed/14/1600/1600">
              <img src="https://picsum.photos/seed/14/800/800" alt="A city street in the rain" />
            </Gallery.Link>
            <Gallery.Caption>Rain on the high street</Gallery.Caption>
          </Gallery.Item>
          <Gallery.Item>
            <Gallery.Link href="https://picsum.photos/seed/15/1600/1600">
              <img
                src="https://picsum.photos/seed/15/800/800"
                alt="Waves breaking on a shingle beach"
              />
            </Gallery.Link>
          </Gallery.Item>
          <Gallery.Item>
            <Gallery.Link href="https://picsum.photos/seed/16/1600/1600">
              <img
                src="https://picsum.photos/seed/16/800/800"
                alt="A forest path between tall pines"
              />
            </Gallery.Link>
          </Gallery.Item>
        </Gallery.Root>
      ),
    },
    {
      title: "Without a grid",
      description:
        "One figure in running text, no Root. It is a figure, so it is valid wherever a figure is; the width comes from your own layout, here a max inline size on the item.",
      code: `<p>
  The harbour wall was rebuilt in 1911 after the winter storms took the old
  one, and the granite blocks still carry the masons' marks.
</p>
<Gallery.Item style={{ maxInlineSize: "18rem" }}>
  <Gallery.Link href="https://picsum.photos/seed/17/1600/1600">
    <img src="https://picsum.photos/seed/17/800/800" alt="Granite blocks of a harbour wall" />
  </Gallery.Link>
  <Gallery.Caption>A mason's mark on the third course</Gallery.Caption>
</Gallery.Item>
<p>
  The marks were a tally: each mason was paid by the block, and the mark
  said whose it was.
</p>`,
      render: () => (
        <>
          <p>
            The harbour wall was rebuilt in 1911 after the winter storms took the old one, and the
            granite blocks still carry the masons&rsquo; marks.
          </p>
          <Gallery.Item style={{ maxInlineSize: "18rem" }}>
            <Gallery.Link href="https://picsum.photos/seed/17/1600/1600">
              <img
                src="https://picsum.photos/seed/17/800/800"
                alt="Granite blocks of a harbour wall"
              />
            </Gallery.Link>
            <Gallery.Caption>A mason&rsquo;s mark on the third course</Gallery.Caption>
          </Gallery.Item>
          <p>
            The marks were a tally: each mason was paid by the block, and the mark said whose it
            was.
          </p>
        </>
      ),
    },
  ],
  whenToUse: [
    "A set of images that belong together and are worth seeing larger: a project's photographs, an event, a portfolio page. The list announces how many there are, and each opens in place.",
    "Images in an article that the reader may want closer: one Gallery.Item in the prose gives a figure, a caption and a lightbox without a grid around it.",
  ],
  whenNotToUse: [
    "A single hero image or a decorative illustration. That is an img in your layout, or a Hero; a lightbox for one picture is a click that gains nothing.",
    "A product's image set with zoom, thumbnails that swap the main view, or a slideshow with previous and next. Those are their own compositions; a Carousel carries a slideshow.",
  ],
};

export default gallery;
