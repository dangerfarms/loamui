---
title: Article carousel
description: Five journal articles as Cards on a Carousel track: a photo, a category Badge, a title and a Read article link each, with Previous and Next beside the title and a dot per article beneath.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Article carousel

Five journal articles as Cards on a Carousel track: a photo, a category Badge, a title and a Read article link each, with Previous and Next beside the title and a dot per article beneath.

A recipe in **Media**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Card`, `Carousel`, `SignpostLink`
- Tags: carousel, articles, cards, slider, journal
- Live: https://loamui.com/recipes/media/article-carousel

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## When to use

Use when readers need to browse several articles in a horizontal collection. Choose a grid when seeing and comparing the items together is more useful.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The track is an ordinary scroller with scroll snapping, so it pages with a wheel, a swipe, the arrow keys and no JavaScript; each item is a Card rendered as an article named by its heading.
- **Modern CSS.** The item width is the Carousel's public property set on the region, and the track's grid stretches every Card to one height, so an auto margin puts each link at the foot.
- **Composition.** Carousel.Root, Track, Item, Previous, Next and Indicators are arranged in the markup: the Buttons sit beside the title and the dots beneath, an arrangement the parts allow because they read one context rather than one layout.
- **Accessible & gatekept.** The region is named by its heading, the paging Buttons and the dots are named through labels, the status announces Article 2 of 5 once the track settles, and every Read article link finishes with the article's title in hidden text.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Badge, Card, Carousel, SignpostLink } from "@loamui/core";
import "./example.css";

const ARTICLES = [
  {
    slug: "picking-french-beans",
    category: "Growing guide",
    title: "Picking French beans at their best",
    seed: 627,
  },
  {
    slug: "haymaking",
    category: "Harvest",
    title: "Haymaking on the member fields",
    seed: 729,
  },
  {
    slug: "spring-buds",
    category: "Plant life",
    title: "A closer look at spring buds",
    seed: 400,
  },
  {
    slug: "woodland-tulips",
    category: "Spring colour",
    title: "Tulips at the woodland edge",
    seed: 976,
  },
  {
    slug: "changing-weather",
    category: "Field notes",
    title: "Reading the weather over the fields",
    seed: 542,
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <Carousel.Root
      className="article-carousel"
      aria-labelledby={`${instanceId}-article-carousel-title`}
      labels={{
        previous: "Previous articles",
        next: "Next articles",
        indicator: (index, count) => `Go to article ${index} of ${count}`,
        status: (index, count) => `Article ${index} of ${count}`,
      }}
    >
      <div className="head">
        <h2 id={`${instanceId}-article-carousel-title`}>From the growers’ journal</h2>
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
                  aria-labelledby={`${instanceId}-article-carousel-${article.slug}`}
                />
              }
            >
              <img
                className="media"
                src={`https://picsum.photos/id/${article.seed}/640/400`}
                alt=""
                width="640"
                height="400"
                loading="lazy"
              />
              <p className="meta">
                <Badge>{article.category}</Badge>
              </p>
              <h3 id={`${instanceId}-article-carousel-${article.slug}`}>{article.title}</h3>
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
@scope (.article-carousel) to ([class*="loam-"]) {
  :scope {
    --loam-carousel-item-size: 18rem;
  }

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

@scope (.article-carousel article.article) to ([class*="loam-"]) {
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

  div.foot {
    display: block flex;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }
}
```

