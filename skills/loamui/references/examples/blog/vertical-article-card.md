---
title: Vertical article card
description: A narrow Card for a column of teasers: a portrait picture, a category Badge, a linked title, and the author and date in a row at the foot.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Vertical article card

A narrow Card for a column of teasers: a portrait picture, a category Badge, a linked title, and the author and date in a row at the foot.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Card`, `Time`
- Tags: post, teaser, column, narrow, blog card
- Live: https://loamui.com/examples/blog/vertical-article-card

## Built to the pillars

- **Native CSS.** The Card is an article named by its heading, the author sits in an address with rel="author", and the date is a time with a machine-readable dateTime.
- **Modern CSS.** The picture is held to a portrait ratio so a column of these cards lines up whatever the files' shapes; the card caps its own width and a grid of them sets the columns.
- **Composition.** Card, Badge, Time and Avatar are used as they come; the avatar size is its public property, set on the author row rather than passed to the Avatar.
- **Accessible & gatekept.** The title is the link and the card is not, so the link's name is the title alone; the picture illustrates the title, so its alt is empty; the avatar is hidden because the name is printed beside it.

## Example.tsx

```tsx
import { Avatar, Badge, Card, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card
      render={
        <article className="vertical-article-card" aria-labelledby="vertical-article-card-title" />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/id/152/600/750"
        alt=""
        width="600"
        height="750"
      />
      <p className="meta">
        <Badge>Winter jobs</Badge>
      </p>
      <h3 id="vertical-article-card-title">
        <a href="/journal/lifting-dahlias">Lifting and storing dahlia tubers</a>
      </h3>
      <div className="author">
        <Avatar name="Amara Okonkwo" aria-hidden />
        <div className="byline">
          <address>
            <a href="/growers/amara-okonkwo" rel="author">
              Amara Okonkwo
            </a>
          </address>
          <Time value="2026-10-20" locale="en-GB" dateStyle="long" />
        </div>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.vertical-article-card) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
    max-inline-size: 18rem;
  }

  img.media {
    aspect-ratio: 4 / 5;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    margin: 0;
  }

  /* Underlined at rest, lightly: a link is known by more than its place. */
  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
    text-wrap: balance;

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

  div.author {
    --loam-avatar-size: 2rem;

    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }

  div.byline {
    color: var(--loam-color-fg-muted);
    display: block grid;
    font-size: var(--loam-text-xs);
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

