---
title: Article header
description: The top of an article: its category, the title as the page's h1, a standfirst, the byline, its tags and the lead image with a credit.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Article header

The top of an article: its category, the title as the page's h1, a standfirst, the byline, its tags and the lead image with a credit.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Time`
- Tags: post, title, standfirst, lead image, masthead
- Live: https://loamui.com/examples/blog/article-header

## Built to the pillars

- **Native CSS.** The title is the page's one h1, the category above it is a link rather than a heading, the standfirst is a paragraph rather than an h2, and the picture is a figure whose credit is its figcaption.
- **Modern CSS.** The article declares itself a container so the fluid type scale answers its column; the byline's dots are generated content with an empty alternative, so only the CSS knows the order of the parts.
- **Composition.** The byline and the tag list are the Byline and Tag List examples pasted in; the Badges are rendered as links through render, so a tag is a Badge that happens to go somewhere.
- **Accessible & gatekept.** The article is named by its title, the author's name is in an address with rel="author", both dates are Times with a machine-readable dateTime and the second says Updated in words, and the tag list is named Tags so its count is announced.

## Example.tsx

```tsx
import { Avatar, Badge, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <article className="article-header" aria-labelledby="article-header-title">
      <header>
        <p className="eyebrow">
          <a href="/guides">Growing guides</a>
        </p>
        <h1 id="article-header-title">Sowing broad beans in autumn</h1>
        <p className="standfirst">
          An October sowing of ‘Aquadulce Claudia’ overwinters in the open ground and crops a month
          before anything sown in spring. Which plots it suits, how deep to sow, and how to keep the
          pigeons off.
        </p>
        <div className="byline">
          <Avatar name="Nia Prosser" aria-hidden />
          <address>
            <a href="/growers/nia-prosser" rel="author">
              Nia Prosser
            </a>
          </address>
          <span>
            <Time value="2026-08-28" locale="en-GB" dateStyle="long" />
          </span>
          <span>
            Updated <Time value="2026-09-04" locale="en-GB" dateStyle="long" />
          </span>
          <span>6 min read</span>
        </div>
        <ul className="tags" role="list" aria-label="Tags">
          <li>
            <Badge size="lg" render={<a href="/tags/broad-beans">Broad beans</a>} />
          </li>
          <li>
            <Badge size="lg" render={<a href="/tags/autumn-sowing">Autumn sowing</a>} />
          </li>
          <li>
            <Badge size="lg" render={<a href="/tags/legumes">Legumes</a>} />
          </li>
        </ul>
        <figure>
          <img
            src="https://picsum.photos/seed/hedgerow-broad-beans-lead/1200/675"
            alt="Rows of young broad bean plants in a raised bed, netted against pigeons"
            width="1200"
            height="675"
          />
          <figcaption>
            Autumn-sown ‘Aquadulce Claudia’ on the Ludlow plot in February. Photograph: Nia Prosser
          </figcaption>
        </figure>
      </header>
    </article>
  );
}
```

## example.css

```css
/* The article is the container, so the fluid type answers the article's
   column rather than the page; the header inside it is the grid. The
   donut keeps the Avatar, the Times and the Badges on their own styles. */
@scope (.article-header) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }

  header {
    display: block grid;
    gap: var(--loam-space-md);
  }

  /* The category, small and strong above the title: a link, in the page's
     link colour, which is the affordance. */
  p.eyebrow {
    font-size: var(--loam-text-sm);
    font-weight: 600;
    letter-spacing: 0.02em;
    margin: 0;
    text-transform: uppercase;
  }

  h1 {
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 26ch;
    text-wrap: balance;
  }

  p.standfirst {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-lg);
    margin: 0;
    max-inline-size: var(--loam-measure);
  }

  /* Who wrote it and when, on one line that wraps: the Byline example. */
  div.byline {
    --loam-avatar-size: 2rem;

    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs) var(--loam-space-sm);

    address {
      color: var(--loam-color-fg-strong);
      font-style: normal;
      font-weight: 600;

      a {
        color: inherit;
      }
    }

    /* A middle dot before every part after the author, drawn as generated
       content with an empty alternative so it stays out of the
       accessibility tree. */
    address ~ span::before {
      content: "·" / "";
      margin-inline-end: var(--loam-space-sm);
    }
  }

  /* The tags: the Tag List example. The markers go; the markup keeps the
     list's role with role="list", since list-style: none drops it in some
     browsers. */
  ul.tags {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      border-radius: var(--loam-radius-full);
      margin: 0;
    }
  }

  /* The lead image takes the header's width and keeps its own ratio; the
     caption is the element styles' figcaption. */
  figure {
    margin-block: var(--loam-space-sm) 0;
    margin-inline: 0;

    img {
      block-size: auto;
      border-radius: var(--loam-radius-md);
      inline-size: 100%;
    }
  }

  /* Forced colours drop the pills' tint, so each item draws an edge round
     its tag; the link inside keeps LinkText. */
  @media (forced-colors: active) {
    ul.tags li {
      border: 1px solid CanvasText;
    }
  }
}
```

