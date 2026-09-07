"use client";

import { Card } from "@loamui/core";
import { Carousel } from "@loamui/ui";
import type { Composition } from "./types";

const carousel: Composition = {
  slug: "carousel",
  name: "Carousel",
  category: "Page sections",
  description:
    "A scroll-snap track for any run of content, cards, images or quotes, with a pair of Buttons that page through it.",
  lead: "Four parts on a native section and list. The track is an ordinary scroller with snap points, so it works with a wheel, a swipe, a keyboard and no JavaScript at all: it is in the tab order and named, because a scroller a keyboard cannot reach cannot be scrolled by one. Each item hosts whatever you put in it, sized by the public --loam-carousel-item-size, and the Controls only add two Buttons that page the track by one width.",
  importLine: `import { Carousel } from "@loamui/ui";`,
  parts: [
    {
      name: "Carousel.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the carousel's width, and hands the Track to the Controls, so they page it from wherever inside the Root you place them.",
    },
    {
      name: "Carousel.Track",
      description:
        'The scroller: a ul with role="list", because stripping the markers drops the list semantics in some browsers. In the tab order (tabIndex 0, yours to change) and named "Carousel" through labels.track unless you pass aria-label or aria-labelledby, so Tab reaches it and the arrow keys scroll it, the snap points settling it on an item. A column grid with inline scroll snapping and room for the focus ring inside the scrollport; each column is --loam-carousel-item-size, 20rem by default and never wider than the track, so set it on the Root for wider or narrower items.',
    },
    {
      name: "Carousel.Item",
      description:
        "One item, an li: a snap point that hosts your content, a Card, an image, a figure or a quote. A grid, so the content stretches to the row's height.",
    },
    {
      name: "Carousel.Controls",
      description:
        "Two Buttons, Previous and Next, that page the Track by one width; pass previousLabel and nextLabel to translate them. Place them anywhere inside the Root, which hands them the Track.",
    },
  ],
  demos: [
    {
      title: "Three cards",
      description:
        'Scroll the track, or page it with the Buttons; each card snaps into place. Tab reaches the track and the arrow keys scroll it. The cards are ordinary core Cards with a heading and a paragraph; the heading names the section and, through aria-labelledby, the track too, in place of the default "Carousel".',
      code: `<Carousel.Root aria-labelledby="primitives">
  <h2 id="primitives">The three primitives</h2>
  <Carousel.Track aria-labelledby="primitives">
    <Carousel.Item>
      <Card>
        <h3>Tokens</h3>
        <p>
          Four hues, eight neutrals and two fluid scales; everything else is derived by
          recipe and audited in CI.
        </p>
      </Card>
    </Carousel.Item>
    <Carousel.Item>
      <Card>
        <h3>Element styles</h3>
        <p>
          Native HTML, styled page-wide, so plain markup is presentable before any component
          appears.
        </p>
      </Card>
    </Carousel.Item>
    <Carousel.Item>
      <Card>
        <h3>Components</h3>
        <p>
          A small set of contextually styled parts. No size, variant or colour props; a
          region declares what it means.
        </p>
      </Card>
    </Carousel.Item>
  </Carousel.Track>
  <Carousel.Controls />
</Carousel.Root>`,
      render: () => (
        <Carousel.Root aria-labelledby="primitives">
          <h2 id="primitives">The three primitives</h2>
          <Carousel.Track aria-labelledby="primitives">
            <Carousel.Item>
              <Card>
                <h3>Tokens</h3>
                <p>
                  Four hues, eight neutrals and two fluid scales; everything else is derived by
                  recipe and audited in CI.
                </p>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card>
                <h3>Element styles</h3>
                <p>
                  Native HTML, styled page-wide, so plain markup is presentable before any component
                  appears.
                </p>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card>
                <h3>Components</h3>
                <p>
                  A small set of contextually styled parts. No size, variant or colour props; a
                  region declares what it means.
                </p>
              </Card>
            </Carousel.Item>
          </Carousel.Track>
          <Carousel.Controls />
        </Carousel.Root>
      ),
    },
  ],
  whenToUse: [
    "A run of similar items, cards, images or quotes, where the reader is invited to browse and any one of them is a fine place to stop.",
    "When the page must work without JavaScript: the track is a native scroller, and the Buttons are an extra, not a dependency.",
  ],
  whenNotToUse: [
    "A list nobody scrolls: three items that fit side by side belong in a grid, where all of them are visible without paging.",
    "Content that must all be seen, such as steps, terms or the plans on a pricing page: a carousel hides everything past the first page, and most readers never page.",
  ],
};

export default carousel;
