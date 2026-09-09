---
title: Carousel with cards
description: Five journal articles as Cards on a Carousel track: a photo, a category Badge, a title and a Read article link each, with Previous and Next beside the title and a dot per article beneath.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Carousel with cards

Five journal articles as Cards on a Carousel track: a photo, a category Badge, a title and a Read article link each, with Previous and Next beside the title and a dot per article beneath.

An example in **Carousels**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`, `Carousel`, `SignpostLink`
- Tags: carousel, articles, cards, slider, journal
- Live: https://loamui.com/examples/carousels/carousel-with-cards

## Built to the pillars

- **Native CSS.** The track is an ordinary scroller with scroll snapping, so it pages with a wheel, a swipe, the arrow keys and no JavaScript; each item is a Card rendered as an article named by its heading.
- **Modern CSS.** The item width is the Carousel's public property set on the region, and the track's grid stretches every Card to one height, so an auto margin puts each link at the foot.
- **Composition.** Carousel.Root, Track, Item, Previous, Next and Indicators are arranged in the markup: the Buttons sit beside the title and the dots beneath, an arrangement the parts allow because they read one context rather than one layout.
- **Accessible & gatekept.** The region is named by its heading, the paging Buttons and the dots are named through labels, the status announces Article 2 of 5 once the track settles, and every Read article link finishes with the article's title in hidden text.

## Example.tsx

```tsx
"use client";

import { Badge, Card, Carousel, SignpostLink } from "@loamui/core";
import "./example.css";

const ARTICLES = [
  {
    slug: "autumn-broad-beans",
    category: "Growing guide",
    title: "Sowing broad beans in autumn",
    seed: "hedgerow-broad-beans",
  },
  {
    slug: "curing-winter-squash",
    category: "Harvest",
    title: "Curing winter squash for storage",
    seed: "hedgerow-squash-harvest",
  },
  {
    slug: "saving-tomato-seed",
    category: "Seed saving",
    title: "Saving tomato seed without the smell",
    seed: "hedgerow-tomato-seed",
  },
  {
    slug: "lifting-dahlias",
    category: "Winter jobs",
    title: "Lifting and storing dahlia tubers",
    seed: "hedgerow-dahlia-tubers",
  },
  {
    slug: "green-manures",
    category: "Soil",
    title: "Green manures for a bed you will not touch till March",
    seed: "hedgerow-green-manure",
  },
];

export default function Example() {
  return (
    <Carousel.Root
      className="carousel-with-cards"
      aria-labelledby="carousel-with-cards-title"
      labels={{
        previous: "Previous articles",
        next: "Next articles",
        indicator: (index, count) => `Go to article ${index} of ${count}`,
        status: (index, count) => `Article ${index} of ${count}`,
      }}
    >
      <div className="head">
        <h2 id="carousel-with-cards-title">From the growers’ journal</h2>
        <div className="controls">
          <Carousel.Previous />
          <Carousel.Next />
        </div>
      </div>
      <Carousel.Track>
        {ARTICLES.map((article) => (
          <Carousel.Item key={article.slug}>
            <Card
              render={
                <article
                  className="article"
                  aria-labelledby={`carousel-with-cards-${article.slug}`}
                />
              }
            >
              <img
                className="media"
                src={`https://picsum.photos/seed/${article.seed}/640/400`}
                alt=""
                width="640"
                height="400"
                loading="lazy"
              />
              <p className="meta">
                <Badge>{article.category}</Badge>
              </p>
              <h3 id={`carousel-with-cards-${article.slug}`}>{article.title}</h3>
              <div className="foot">
                <SignpostLink href={`/journal/${article.slug}`}>
                  Read article<span className="loam-VisuallyHidden"> – {article.title}</span>
                </SignpostLink>
              </div>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Indicators />
    </Carousel.Root>
  );
}
```

## example.css

```css
/* The Carousel's section is this scope's root: the head with its title
   and the paging Buttons is the example's own, and the track, the items,
   the Buttons and the dots keep the Carousel's recipe. The item width is
   the Carousel's public knob, set here so a card reads as a card. */
@scope (.carousel-with-cards) to ([class*="loam-"]) {
  :scope {
    --loam-carousel-item-size: 18rem;
  }

  /* Each link ends in hidden text, which is positioned, so the track must
     be its containing block: without this the hidden words of the items
     off to the end would widen the page instead of scrolling with the
     track. Placement only; the track's own recipe is untouched. */
  ul.track {
    position: relative;
  }

  /* The title at the start, Previous and Next at the end of the line. */
  div.head {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm) var(--loam-space-md);
    justify-content: space-between;
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
  }

  div.controls {
    display: block flex;
    gap: var(--loam-space-xs);
  }
}

/* Each article is a Card inside a Carousel item, and the Card is a limit
   of the donut above, so its parts are reached from a second scope
   rooted at it. The Card's surface, line, radius and padding are left as
   they are; the Badge and the SignpostLink are fenced again. */
@scope (.carousel-with-cards article.article) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  img.media {
    aspect-ratio: 16 / 10;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    margin: 0;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
    text-wrap: balance;
  }

  /* The link sits at the foot whatever the title's length, so the row
     of Cards the track has stretched to one height lines its links up. */
  div.foot {
    display: block flex;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }
}
```

