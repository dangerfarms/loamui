---
title: Testimonial
description: One quotation in a Card: the words, then who said it with an avatar, a name and a role.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Testimonial

One quotation in a Card: the words, then who said it with an avatar, a name and a role.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Card`
- Tags: quote, review, social proof
- Live: https://loamui.com/examples/page-sections/testimonial

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A figure whose quote is a blockquote and whose author is the figcaption, so the platform ties the attribution to the words rather than a layout implying it.
- **Modern CSS.** The blockquote drops the element style's rule and muted colour because here it is the main text, not an aside; everything else is the figure's gap.
- **Composition.** Card is the surface, rendered as the figure through its render prop; the example arranges the quote and caption inside and never touches the Card's own border, radius or padding.
- **Accessible & gatekept.** The Avatar is aria-hidden with the name for its initials, because the name is printed beside it and a screen reader should hear each person once.

## Example.tsx

```tsx
import { Avatar, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<figure className="testimonial" />}>
      <blockquote>
        <p>
          I joined for the seed and stayed for the people. Every packet I have grown from has come
          true, and the guides read like a neighbour talking you through it over the fence.
        </p>
      </blockquote>
      <figcaption>
        <Avatar name="Mari Hughes" aria-hidden="true" />
        <div className="author">
          <span className="name">Mari Hughes</span>
          <span className="role">Member since 2019, Ludlow</span>
        </div>
      </figcaption>
    </Card>
  );
}
```

## example.css

```css
@scope (.testimonial) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
    margin: 0;
  }

  blockquote {
    border-inline-start: 0;
    color: var(--loam-color-fg);
    font-size: var(--loam-text-lg);
    margin: 0;
    padding-inline-start: 0;
    text-wrap: pretty;

    > p {
      margin: 0;
    }
  }

  figcaption {
    align-items: center;
    display: block flex;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    margin: 0;
  }

  div.author {
    display: block grid;
  }

  span.name {
    color: var(--loam-color-fg-strong);
    font-weight: 600;
  }

  span.role {
    color: var(--loam-color-fg-muted);
  }
}
```

