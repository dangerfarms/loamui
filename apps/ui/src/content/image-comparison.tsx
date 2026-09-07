"use client";

import { ImageComparison } from "@loamui/ui";
import type { Composition } from "./types";

const imageComparison: Composition = {
  slug: "image-comparison",
  name: "Image comparison",
  category: "Page sections",
  description:
    "A before/after comparison: two images in one frame, the second revealed by a slider.",
  lead: "The control is a real range input, so the comparison can be worked with a keyboard and is announced with a name and a value, not a pointer-only drag handle; the position defaults to 50%, so with no JavaScript the frame still shows half of each image; both images need real alt text and share one aspect ratio set on the frame.",
  importLine: `import { ImageComparison } from "@loamui/ui";`,
  parts: [
    {
      name: "ImageComparison.Root",
      description:
        "A figure that holds the frame, the Handle and the Caption. Set --loam-comparison-ratio here to change the frame's aspect ratio (default 16 / 9).",
    },
    {
      name: "ImageComparison.Before",
      description:
        "The underlying image's slot. Write it first; put your img with alt text inside.",
    },
    {
      name: "ImageComparison.After",
      description:
        "The top image's slot, clipped at the Handle's position. Write it second; put your img with alt text inside.",
    },
    {
      name: "ImageComparison.Handle",
      description:
        "Core's Range, 0 to 100 starting at 50. The required label names the slider; each move sets the position on the Root.",
    },
    {
      name: "ImageComparison.Caption",
      description: "Optional. A figcaption saying what the two images show.",
    },
  ],
  demos: [
    {
      title: "Before and after",
      description:
        "Two photographs in a 16:9 frame. Drag the slider, or focus it and use the arrow keys, to reveal the second image.",
      code: `<ImageComparison.Root>
  <ImageComparison.Before>
    <img src="https://picsum.photos/seed/before/1200/675" alt="The garden before planting, bare soil" />
  </ImageComparison.Before>
  <ImageComparison.After>
    <img src="https://picsum.photos/seed/after/1200/675" alt="The garden after planting, in full growth" />
  </ImageComparison.After>
  <ImageComparison.Handle label="Reveal the after image" />
  <ImageComparison.Caption>The garden, before and after planting.</ImageComparison.Caption>
</ImageComparison.Root>`,
      render: () => (
        <ImageComparison.Root>
          <ImageComparison.Before>
            <img
              src="https://picsum.photos/seed/before/1200/675"
              alt="The garden before planting, bare soil"
            />
          </ImageComparison.Before>
          <ImageComparison.After>
            <img
              src="https://picsum.photos/seed/after/1200/675"
              alt="The garden after planting, in full growth"
            />
          </ImageComparison.After>
          <ImageComparison.Handle label="Reveal the after image" />
          <ImageComparison.Caption>The garden, before and after planting.</ImageComparison.Caption>
        </ImageComparison.Root>
      ),
    },
    {
      title: "Square frame",
      description:
        "The frame's ratio is the public --loam-comparison-ratio, set on the Root. Both images are cropped to it, so a portrait and a landscape still line up.",
      code: `<ImageComparison.Root style={{ "--loam-comparison-ratio": "1" }}>
  <ImageComparison.Before>
    <img src="https://picsum.photos/seed/before/900/900" alt="The workshop before the tidy-up" />
  </ImageComparison.Before>
  <ImageComparison.After>
    <img src="https://picsum.photos/seed/after/900/900" alt="The workshop after the tidy-up" />
  </ImageComparison.After>
  <ImageComparison.Handle label="Reveal the after image" />
  <ImageComparison.Caption>The workshop, before and after.</ImageComparison.Caption>
</ImageComparison.Root>`,
      render: () => (
        <ImageComparison.Root style={{ "--loam-comparison-ratio": "1" } as React.CSSProperties}>
          <ImageComparison.Before>
            <img
              src="https://picsum.photos/seed/before/900/900"
              alt="The workshop before the tidy-up"
            />
          </ImageComparison.Before>
          <ImageComparison.After>
            <img
              src="https://picsum.photos/seed/after/900/900"
              alt="The workshop after the tidy-up"
            />
          </ImageComparison.After>
          <ImageComparison.Handle label="Reveal the after image" />
          <ImageComparison.Caption>The workshop, before and after.</ImageComparison.Caption>
        </ImageComparison.Root>
      ),
    },
  ],
  whenToUse: [
    "Two versions of the same view, framed the same way, where the point is the difference: a renovation, a retouch, a redesign, a satellite image a year apart.",
    "A comparison that must still make sense to a reader without a pointer or without script; the slider is keyboard-operable and the default position shows half of each image.",
  ],
  whenNotToUse: [
    "Two unrelated images, or two views framed differently. Sliding one over the other only reveals a mismatch; put them side by side in your own grid instead.",
    "A sequence of images to page through. That is a Carousel, not a comparison; the slider here reveals, it does not navigate.",
  ],
};

export default imageComparison;
