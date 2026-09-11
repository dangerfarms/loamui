---
title: Tag list
description: The topics attached to an article: a named list of Badges, each a link to everything that shares the tag, with the current one ringed.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Tag list

The topics attached to an article: a named list of Badges, each a link to everything that shares the tag, with the current one ringed.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`
- Tags: topics, categories, labels, chips, pills
- Live: https://loamui.com/examples/blog/tag-list

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A ul of links, because a set of tags is a list and each tag goes somewhere; the current one carries aria-current="page", the platform's own word for it.
- **Modern CSS.** The list's markers go in CSS and its role is restored in the markup, and the ring on the current tag is drawn on the item with :has(), so the Badge itself is untouched.
- **Composition.** A tag looks like a Badge because it is one: core's Badge rendered as an anchor through render, so a --loam-context region tints a tag list the way it tints any Badge.
- **Accessible & gatekept.** The list is named Tags so its count is announced before the first tag, each link's name is the tag text alone, and the current tag is marked by a ring as well as its attribute; nothing is truncated to a hidden "+3 more".

## Example.tsx

```tsx
import { Badge } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <ul className="tag-list" role="list" aria-label="Tags">
      <li>
        <Badge size="lg" render={<a href="/tags/broad-beans">Broad beans</a>} />
      </li>
      <li>
        <Badge
          size="lg"
          render={
            <a href="/tags/autumn-sowing" aria-current="page">
              Autumn sowing
            </a>
          }
        />
      </li>
      <li>
        <Badge size="lg" render={<a href="/tags/legumes">Legumes</a>} />
      </li>
      <li>
        <Badge size="lg" render={<a href="/tags/overwintering">Overwintering</a>} />
      </li>
      <li>
        <Badge size="lg" render={<a href="/tags/pigeons">Pigeons</a>} />
      </li>
    </ul>
  );
}
```

## example.css

```css
@scope (.tag-list) to ([class*="loam-"]) {
  :scope {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    border-radius: var(--loam-radius-full);
    margin: 0;
  }

  /* Ringed, so the current tag is told apart by shape, not colour alone. */
  li:has(> [aria-current="page"]) {
    outline: var(--loam-ring-width) solid currentcolor;
    outline-offset: 2px;
  }

  /* Forced colours drop the pill's tint; the edge keeps it. */
  @media (forced-colors: active) {
    li {
      border: 1px solid CanvasText;
    }
  }
}
```

