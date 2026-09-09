---
title: Call to action
description: A closing section on a subtle surface: a title, one sentence and two actions, centred.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Call to action

A closing section on a subtle surface: a title, one sentence and two actions, centred.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SignpostLink`
- Tags: landing, marketing, closing, cta
- Live: https://loamui.com/examples/page-sections/call-to-action

## Built to the pillars

- **Native CSS.** A section named by its h2, so the close of the page is a landmark a screen reader can jump to, not a styled div.
- **Modern CSS.** The surface is the subtle background token with the large radius, and the words are centred by the grid, so nothing here is a colour or a size of the section's own.
- **Composition.** One SignpostLink for the primary path and a plain link beside it; the section only spaces them, and its rule stops at the SignpostLink's root.
- **Accessible & gatekept.** Both actions go somewhere, so both are links; the block keeps a border in forced colours, where its tint would otherwise vanish.

## Example.tsx

```tsx
import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="call-to-action" aria-labelledby="call-to-action-title">
      <h2 id="call-to-action-title">Ready to sow?</h2>
      <p className="lede">
        Order by Thursday and your packets are posted the same week, with a growing guide in every
        envelope.
      </p>
      <div className="actions">
        <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
        <a href="/calendar">What to sow this month</a>
      </div>
    </section>
  );
}
```

## example.css

```css
/* The closing block: a subtle surface with a large radius, so it reads as
   the page's last word without a border or a colour of its own. The words
   are centred and capped at their measures; the donut keeps the
   SignpostLink on its own styles. */
@scope (.call-to-action) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-lg);
    justify-items: center;
    padding: var(--loam-space-xl);
    text-align: center;
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    max-inline-size: 22ch;
    text-wrap: balance;
  }

  p.lede {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-lg);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-lg);
    justify-content: center;
  }

  /* Forced colours drop the tint, so the block keeps an edge that says
     where it starts and ends. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }
  }
}
```

