---
title: Service unavailable
description: A 503 page: the code, All our servers are busy, one line on what is happening and what to do, and a Button that refreshes the page.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Service unavailable

A 503 page: the code, All our servers are busy, one line on what is happening and what to do, and a Button that refreshes the page.

An example in **Error pages**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`
- Tags: 503, busy, unavailable, maintenance, error page, refresh
- Live: https://loamui.com/examples/errors/error-503

## Built to the pillars

- **Native CSS.** A section named by its own h1; the way out is a button rather than a link, because refreshing is an action on this page and goes nowhere new.
- **Modern CSS.** The page is a container so its type answers its own width, the title balances its lines and the description wraps prettily; nothing here is sized to a viewport.
- **Composition.** Button is dropped in as it comes; the reload is the page's one line of behaviour, on the Button's own onClick.
- **Contextualism.** The actions row is a primary region, so the Button takes the primary colour from where it sits rather than from a prop; primary is the brand slot, neutral until a theme fills it, and the row declares where the one action belongs.
- **Accessible & gatekept.** The copy says what is happening and that the basket is safe before it says what to do, and the button says what it does in full: Refresh the page, not Retry.

## Example.tsx

```tsx
"use client";

import { Button } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="error-503" aria-labelledby="error-503-title">
      <p className="code">503</p>
      <h1 id="error-503-title">All our servers are busy</h1>
      <p className="description">
        More people are ordering seed than the shop can serve at once. Your basket is safe where it
        is: wait a minute, then refresh the page.
      </p>
      <div className="actions">
        <Button onClick={() => window.location.reload()}>Refresh the page</Button>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.error-503) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    container-type: inline-size;
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-md);
    justify-content: center;
    min-block-size: 24rem;
    padding-block: var(--loam-space-xl);
    text-align: center;
  }

  p.code {
    color: var(--loam-color-fg-dim);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-xl);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 1;
    margin: 0;
  }

  h1 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    text-wrap: balance;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    --loam-context: primary;

    display: block flex;
    justify-content: center;
    margin-block-start: var(--loam-space-sm);
  }
}
```

