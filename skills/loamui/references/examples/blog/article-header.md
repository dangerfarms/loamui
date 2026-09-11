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

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The title is the page's one h1, the category above it is a link rather than a heading, the standfirst is a paragraph rather than an h2, and the picture is a figure whose credit is its figcaption.
- **Modern CSS.** The article declares itself a container so the fluid type scale answers its column; the byline's dots are generated content with an empty alternative, so only the CSS knows the order of the parts.
- **Composition.** The byline and the tag list are the Byline and Tag List examples pasted in; the Badges are rendered as links through render, so a tag is a Badge that happens to go somewhere.
- **Accessible & gatekept.** The article is named by its title, the author's name is in an address with rel="author", both dates are Times with a machine-readable dateTime and the second says Updated in words, and the tag list is named Tags so its count is announced.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Avatar, Badge, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <article className="article-header" aria-labelledby={`${instanceId}-article-header-title`}>
      <header>
        <p className="eyebrow">
          <a href="/guides">Growing guides</a>
        </p>
        <h1 id={`${instanceId}-article-header-title`}>Sowing broad beans in autumn</h1>
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
            src="https://picsum.photos/id/627/1200/675"
            alt="A crate of freshly picked beans on the packing bench"
            width="1200"
            height="675"
          />
          <figcaption>
            The first picking from the autumn-sown row on the Ludlow plot. Photograph: Nia Prosser
          </figcaption>
        </figure>
      </header>
    </article>
  );
}
```

## example.css

```css
@scope (.article-header) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }

  header {
    display: block grid;
    gap: var(--loam-space-md);
  }

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

    /* The empty alternative keeps the dot out of the accessibility tree. */
    address ~ span::before {
      content: "·" / "";
      margin-inline-end: var(--loam-space-sm);
    }
  }

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

  figure {
    margin-block: var(--loam-space-sm) 0;
    margin-inline: 0;

    img {
      block-size: auto;
      border-radius: var(--loam-radius-md);
      inline-size: 100%;
    }
  }

  /* Forced colours drop the pills' tint; the edge keeps each tag. */
  @media (forced-colors: active) {
    ul.tags li {
      border: 1px solid CanvasText;
    }
  }
}
```

