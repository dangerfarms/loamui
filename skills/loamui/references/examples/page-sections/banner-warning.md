---
title: Banner warning
description: The announcement bar as a warning: a glyph, a message that says its status in hidden words, and a link.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Banner warning

The announcement bar as a warning: a glyph, a message that says its status in hidden words, and a link.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: announcement, notice, status, warning
- Live: https://loamui.com/examples/page-sections/banner-warning

## Built to the pillars

- **Native CSS.** Still a div with no role: a warning in the page from the start is content the reader meets in order, and only news injected later would announce itself.
- **Modern CSS.** The glyph is an inline svg sized in em on the message's type, so it rides the fluid scale with the words beside it.
- **Contextualism.** The bar declares --loam-context: warning so a Button or Badge dropped into it answers; its own surface takes the warning tokens directly, since the remap serves the library's components rather than an element of the page's own.
- **Accessible & gatekept.** The svg is aria-hidden and a visually hidden Warning: opens the sentence, so a screen reader hears the status the glyph shows; the strong glyph on the soft tint is the pair the contrast audit checks.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <div className="banner-warning">
      <svg
        className="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3 2 20h20L12 3Z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
      <p>
        <span className="loam-VisuallyHidden">Warning: </span>
        Postal strikes are delaying seed orders by three to five days. Plants and tools are
        unaffected.
      </p>
      <a href="/orders">Track your order</a>
    </div>
  );
}
```

## example.css

```css
/* The same bar as a warning. The root declares the context so any core
   control dropped into it answers, and the bar's own surface and glyph
   take the warning tokens directly, because the context remaps tokens
   for the library's components, not for an element of the page's own.
   Colour is never the only carrier: the glyph shows the status and the
   hidden word in the message says it. */
@scope (.banner-warning) to ([class*="loam-"]) {
  :scope {
    --loam-context: warning;

    align-items: center;
    background: var(--loam-color-warning-soft);
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm) var(--loam-space-lg);
    padding-block: var(--loam-space-sm);
    padding-inline: var(--loam-space-lg);
  }

  /* The glyph is the strong token on the soft tint, the pair the audit
     checks as a glyph, and sized on the text so it rides the scale. */
  svg.icon {
    block-size: auto;
    color: var(--loam-color-warning-strong);
    flex: none;
    inline-size: 1.25em;
  }

  p {
    flex: 1 1 24ch;
    margin: 0;
  }

  a {
    font-weight: 600;
    white-space: nowrap;
  }

  /* Forced colours: the tint goes, so the bar keeps an edge on every side
     and the glyph takes the system text colour through currentColor. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }
  }
}
```

