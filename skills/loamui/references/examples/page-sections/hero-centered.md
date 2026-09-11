---
title: Hero centred
description: A page-opening section with no picture: an eyebrow, a headline, a lede and two actions, centred.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Hero centred

A page-opening section with no picture: an eyebrow, a headline, a lede and two actions, centred.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `SignpostLink`
- Tags: landing, marketing, membership, centred
- Live: https://loamui.com/examples/page-sections/hero-centered

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its own h1, so it is a region in a screen reader's landmark list; the type is the element styles' own, at the top of the fluid scale.
- **Modern CSS.** One grid column with justify-items and text-align centring every part; the headline is balanced and the lede capped at the measure token so neither runs long.
- **Composition.** Badge in the eyebrow and SignpostLink in the actions, as they come; nothing here is a Button, because both paths lead to a page.
- **Contextualism.** The eyebrow declares --loam-context: primary, so the Badge takes the brand colour without a prop; primary is the brand slot, neutral until a theme fills it, and the eyebrow reads as one by its place above the heading.
- **Accessible & gatekept.** The primary path is a SignpostLink and the alternative a plain link, both going somewhere; nothing here is a button pretending to be one.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Badge, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <section className="hero-centered" aria-labelledby={`${instanceId}-hero-centered-title`}>
      <p className="eyebrow">
        <Badge>Membership</Badge>
        <span>From £3 a month</span>
      </p>
      <h1 id={`${instanceId}-hero-centered-title`}>Join the co-op that grows its own seed.</h1>
      <p className="lede">
        Members get first pick of every catalogue, a share of the seed we save each autumn and a
        vote on what the nursery grows next year.
      </p>
      <div className="actions">
        <SignpostLink href="/membership/join">Become a member</SignpostLink>
        <a href="/membership#tiers">Compare the tiers</a>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.hero-centered) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-lg);
    justify-items: center;
    padding-block: var(--loam-space-xl);
    text-align: center;
  }

  p.eyebrow {
    --loam-context: primary;

    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    justify-content: center;
    margin: 0;
  }

  h1 {
    font-size: var(--loam-text-3xl);
    margin: 0;
    max-inline-size: 20ch;
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
    gap: var(--loam-space-md);
    justify-content: center;
  }
}
```

