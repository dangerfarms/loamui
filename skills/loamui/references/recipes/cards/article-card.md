---
title: Article card
description: One article in a Card: a picture, a category and date, a linked title, its opening lines and the author at the foot.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Article card

One article in a Card: a picture, a category and date, a linked title, its opening lines and the author at the foot.

A recipe in **Cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Card`, `Time`
- Tags: post, news, teaser, blog card
- Live: https://loamui.com/recipes/cards/article-card

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## When to use

Use to preview one article with its date, author and reading destination. Choose Article carousel when readers need to browse a collection horizontally.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The Card is rendered as an article named by its own heading, the author sits in an address element with rel="author", and the date is a time with a machine-readable dateTime.
- **Modern CSS.** A flex column whose foot takes the slack with an auto margin, so in a row of cards the byline lands at the bottom of each; the description is clamped only where line-clamp exists.
- **Composition.** Card, Badge, Time and Avatar are used as they come; the example's rule stops at each root and only arranges the column between them.
- **Accessible & gatekept.** The title is the link and the card is not, so the link's name is the title alone; the picture illustrates the title, so its alt is empty; the avatar is hidden because the name is printed beside it.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Avatar, Badge, Card, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  const title = useId();
  return (
    <Card render={<article className="article-card" aria-labelledby={title} />}>
      <img
        className="media"
        src="https://picsum.photos/id/292/800/450"
        alt=""
        width="800"
        height="450"
      />
      <p className="meta">
        <Badge>Growing guide</Badge>
        <Time value="2026-09-01" locale="en-GB" dateStyle="long" />
      </p>
      <h3 id={title}>
        <a href="/guides/overwintering-onions">Overwintering onions from sets</a>
      </h3>
      <p className="description">
        Sets planted in the last week of September root before the frosts and bulb up six weeks
        ahead of a spring planting. Which varieties hold through a wet winter, how far apart to set
        them, and what to do about the ones that bolt.
      </p>
      <div className="foot">
        <Avatar name="Rhiannon Vaughan" aria-hidden />
        <address>
          <a href="/growers/rhiannon-vaughan" rel="author">
            Rhiannon Vaughan
          </a>
        </address>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.article-card) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
    max-inline-size: 36rem;
  }

  img.media {
    aspect-ratio: 16 / 9;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    margin: 0;
  }

  /* Underlined at rest, lightly: a link is known by more than its place. */
  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;

    a {
      color: inherit;
      text-decoration-color: var(--loam-color-line-strong);

      &:focus-visible {
        text-decoration-color: currentcolor;
      }

      @media (hover: hover) {
        &:hover {
          text-decoration-color: var(--loam-color-primary);
        }
      }
    }
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;

    @supports (line-clamp: 3) {
      line-clamp: 3;
    }
  }

  div.foot {
    --loam-avatar-size: 2rem;

    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }

  address {
    font-size: var(--loam-text-sm);
    font-style: normal;
    font-weight: 600;

    a {
      color: var(--loam-color-fg-strong);
    }
  }
}
```

