---
title: Banner
description: A one-line announcement bar for the top of a page: a message and a link beside it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Banner

A one-line announcement bar for the top of a page: a message and a link beside it.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: announcement, notice, top bar
- Live: https://loamui.com/examples/page-sections/banner

## Built to the pillars

- **Native CSS.** A div with no role, because a bar that is in the page from the first paint is content; only a bar a script injects later is news and would take role status.
- **Modern CSS.** A wrapping flex row: the paragraph takes the slack with a basis of 24ch, and the link keeps its width and drops beneath when the bar is narrower than both.
- **Composition.** Element styles alone: a paragraph and a link on the subtle background, so no component is imported.
- **Accessible & gatekept.** Going somewhere is a link, not a button, and in forced colours the bar keeps a border on every side where its tint would otherwise vanish.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <div className="banner">
      <p>
        The spring catalogue is out. Members order from Monday 2 March, everyone else from the 9th.
      </p>
      <a href="/catalogue">Read the catalogue</a>
    </div>
  );
}
```

## example.css

```css
@scope (.banner) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    background: var(--loam-color-bg-subtle);
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm) var(--loam-space-lg);
    padding-block: var(--loam-space-sm);
    padding-inline: var(--loam-space-lg);
  }

  p {
    flex: 1 1 24ch;
    margin: 0;
  }

  a {
    font-weight: 600;
    white-space: nowrap;
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }
  }
}
```

