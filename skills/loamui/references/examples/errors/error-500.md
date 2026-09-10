---
title: Something went wrong
description: A 500 page: the code, what happened in plain words, a button that tries the page again, and a way to tell someone.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Something went wrong

A 500 page: the code, what happened in plain words, a button that tries the page again, and a way to tell someone.

An example in **Error pages**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`
- Tags: 500, server error, try again, error page
- Live: https://loamui.com/examples/errors/error-500

## Built to the pillars

- **Native CSS.** A section named by its own h1, because the error is the page; trying again is a button, because it does something, and telling someone is a link, because it goes somewhere.
- **Modern CSS.** The page is a container so its type answers its own width, the title balances its lines and the description wraps prettily; nothing here is sized to a viewport.
- **Composition.** The illustration is an inline SVG in the markup, stroked in currentColor with two coloured parts, so a reader recolours or redraws it in place; Button is dropped in as it comes.
- **Contextualism.** The row of ways out declares --loam-context: primary, so the Button is the main action without a prop; primary is the brand slot, neutral until a theme fills it, and the Button is told from the plain link beside it by being a Button, not by its colour.
- **Accessible & gatekept.** The copy says it was not the reader's doing and that nothing is lost before it asks them to try again; the illustration is hidden because the words already say it.

## Example.tsx

```tsx
"use client";

import { Button } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="error-500" aria-labelledby="error-500-title">
      <svg
        className="illustration"
        viewBox="0 0 120 96"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M28 46h56l-6 40H34z" />
        <rect x="22" y="38" width="68" height="8" rx="2" />
        <path d="M58 46l4 10-5 9 6 11" />
        <path d="M72 38c0-10-2-18 8-24" />
        <path className="leaf" d="M80 14c8-6 16-3 14 6-6 3-11 1-14-6z" />
        <circle className="seed" cx="96" cy="84" r="2" />
        <circle className="seed" cx="104" cy="80" r="2" />
        <circle className="seed" cx="102" cy="88" r="2" />
      </svg>
      <p className="code">500</p>
      <h1 id="error-500-title">Something went wrong on our side</h1>
      <p className="description">
        The catalogue did not answer, and it is not anything you did. Nothing in your basket is
        lost. Try the page again; if it keeps happening, tell us and quote the time.
      </p>
      <div className="actions">
        <Button onClick={() => window.location.reload()}>Try again</Button>
        <a href="/contact">Tell us what happened</a>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.error-500) to ([class*="loam-"]) {
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

  svg.illustration {
    block-size: auto;
    color: var(--loam-color-fg-dim);
    inline-size: 7.5rem;

    path.leaf {
      fill: var(--loam-color-success-soft);
      stroke: var(--loam-color-success-strong);
    }

    circle.seed {
      fill: var(--loam-color-warning-soft);
      stroke: var(--loam-color-warning-strong);
    }
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

    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md) var(--loam-space-lg);
    justify-content: center;
    margin-block-start: var(--loam-space-sm);
  }
}
```

