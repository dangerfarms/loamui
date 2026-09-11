---
title: Page not found
description: A 404 page in words alone: the code, what happened, one line on what to do, and two ways out, centred.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Page not found

A 404 page in words alone: the code, what happened, one line on what to do, and two ways out, centred.

An example in **Error pages**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SignpostLink`
- Tags: 404, not found, missing, error page, text only
- Live: https://loamui.com/examples/errors/error-404

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its own h1, because the error is the page; the code is a paragraph, not a heading, so the outline reads Page not found and not 404.
- **Modern CSS.** The page is a container so its type answers its own width, the title balances its lines and the description wraps prettily; nothing here is sized to a viewport.
- **Composition.** Element styles carry the code, the title and the line; SignpostLink is the one component, dropped in as it comes beside a plain link, and the example only stacks and centres them.
- **Accessible & gatekept.** Nothing to decode: no picture, no icon, so the page reads the same to a screen reader as to anyone; the main way out is a SignpostLink because it goes somewhere, the second a plain link, and the copy says what to do without blaming the reader.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <section className="error-404" aria-labelledby={`${instanceId}-error-404-title`}>
      <p className="code">404</p>
      <h1 id={`${instanceId}-error-404-title`}>Page not found</h1>
      <p className="description">
        The page may have moved when the catalogue was reorganised, or the address may have a typo.
        Check the address, or start again from the home page.
      </p>
      <div className="actions">
        <SignpostLink href="/">Back to the home page</SignpostLink>
        <a href="/catalogue">Browse the catalogue</a>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.error-404) to ([class*="loam-"]) {
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
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md) var(--loam-space-lg);
    justify-content: center;
    margin-block-start: var(--loam-space-sm);
  }
}
```

