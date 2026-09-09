---
title: Article card with a footer
description: One article in a Card with a footer: a picture, a category Badge, a linked title and its opening lines, then the author, the date and the count of likes in a row at the foot.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Article card with a footer

One article in a Card with a footer: a picture, a category Badge, a linked title and its opening lines, then the author, the date and the count of likes in a row at the foot.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Card`, `Time`
- Tags: post, news, teaser, blog card, likes
- Live: https://loamui.com/examples/blog/article-card-footer

## Built to the pillars

- **Native CSS.** The Card is an article with a footer element for its byline; the author is an address with rel="author", and the date is a time with a machine-readable dateTime.
- **Modern CSS.** A flex column whose footer takes the slack with an auto margin, so in a row of cards the byline lands at the bottom of each; the likes count is set in tabular numerals so it holds its width.
- **Composition.** Card, Badge, Time and Avatar are used as they come; the avatar size is its public property set on the footer, and the example's rule stops at each root.
- **Accessible & gatekept.** The title is the link and the card is not, so the link's name is the title alone; the heart is hidden and the count finishes in a hidden word, so a reader hears 124 likes.

## Example.tsx

```tsx
import { Avatar, Badge, Card, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card
      render={
        <article className="article-card-footer" aria-labelledby="article-card-footer-title" />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/seed/hedgerow-squash-harvest/800/450"
        alt=""
        width="800"
        height="450"
      />
      <p className="meta">
        <Badge>Harvest</Badge>
      </p>
      <h3 id="article-card-footer-title">
        <a href="/journal/curing-winter-squash">Curing winter squash for storage</a>
      </h3>
      <p className="description">
        Ten days somewhere warm and dry hardens the skin; after that a cool shed keeps a ‘Crown
        Prince’ until March.
      </p>
      <footer>
        <div className="author">
          <Avatar name="Dafydd Rees" aria-hidden />
          <div className="byline">
            <address>
              <a href="/growers/dafydd-rees" rel="author">
                Dafydd Rees
              </a>
            </address>
            <Time value="2026-09-02" locale="en-GB" dateStyle="medium" />
          </div>
        </div>
        <p className="likes">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21s-7-4.5-9.5-9C1 8.5 3 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6 4 4.5 7.5C19 16.5 12 21 12 21z" />
          </svg>
          124<span className="loam-VisuallyHidden"> likes</span>
        </p>
      </footer>
    </Card>
  );
}
```

## example.css

```css
/* The Card is the article, rendered through its own render prop, so the
   scope's root is the Card element: core's surface, line, radius and
   padding stay as they are, and this scope arranges the column inside.
   The donut keeps the Badge, the Time and the Avatar on their own styles. */
@scope (.article-card-footer) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  img.media {
    aspect-ratio: 16 / 9;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    inline-size: 100%;
    object-fit: cover;
  }

  p.meta {
    margin: 0;
  }

  /* The title is the link. It keeps the heading's colour and drops the
     underline at rest; the underline returns on hover and focus. */
  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;

    a {
      color: inherit;
      text-decoration: none;

      &:focus-visible {
        text-decoration: underline;
      }

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--loam-color-primary);
        }
      }
    }
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
  }

  /* The foot's auto margin takes the column's slack; a line above it
     separates it from the body, and the author sits at the start with
     the likes at the end. */
  footer {
    --loam-avatar-size: 2rem;

    align-items: center;
    border-block-start: 1px solid var(--loam-color-line);
    display: block flex;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    justify-content: space-between;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }

  div.author {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
  }

  div.byline {
    color: var(--loam-color-fg-muted);
    display: block grid;
    font-size: var(--loam-text-xs);
  }

  /* The address element is italic by default in every browser; upright
     here, since that convention reads as emphasis in a byline. */
  address {
    font-size: var(--loam-text-sm);
    font-style: normal;
    font-weight: 600;

    a {
      color: var(--loam-color-fg-strong);
    }
  }

  p.likes {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    font-variant-numeric: lining-nums tabular-nums;
    gap: var(--loam-space-xs);
    margin: 0;

    svg {
      block-size: auto;
      color: var(--loam-color-danger-strong);
      inline-size: 1.125em;
    }
  }
}
```

