---
title: Profile card
description: One member on a card: their picture over their name and role, three figures about them, and a Follow toggle that updates the displayed follower count.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Profile card

One member on a card: their picture over their name and role, three figures about them, and a Follow toggle that updates the displayed follower count.

A recipe in **Cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Button`, `Card`
- Tags: profile, member, avatar, stats, follow
- Live: https://loamui.com/recipes/cards/profile-card

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Follow is a local toggle for this demonstration. In an account-based application, load the initial relationship and persist changes through your follow service, including pending and failure states.

## When to use

Use to introduce one person with labelled statistics and a follow action. Connect the local demonstration state to your application before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The card is an article named by its heading, and the figures are a description list of three pairs, so the markup reads label then value while the screen shows value over label.
- **Modern CSS.** The avatar's size is Avatar's public --loam-avatar-size, set on the card and inherited, and the figures are set in tabular lining numerals so the three line up.
- **Composition.** Card is the surface, rendered as the article; the example arranges the column inside it and never touches the Card's own border, radius or padding.
- **Contextualism.** The action row is a primary region, so the one Button takes the brand colour from where it sits, and the grid region stretches it to the card's width without a prop; primary is the brand slot, neutral until a theme fills it.
- **Accessible & gatekept.** The Avatar is hidden because the name is printed beneath it, so a screen reader hears the person once; the figures carry their labels in the markup, not in a tooltip.

## Example.tsx

```tsx
"use client";

import { useId, useState } from "react";
import { Avatar, Button, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  const name = useId();
  const [following, setFollowing] = useState(false);
  return (
    <Card render={<article className="profile-card" aria-labelledby={name} />}>
      <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/240/240" aria-hidden />
      <h2 id={name}>Imogen Hartley</h2>
      <p className="role">Steward, Lower Field plot</p>
      <dl className="stats">
        <div>
          <dt>Varieties saved</dt>
          <dd>38</dd>
        </div>
        <div>
          <dt>Seasons</dt>
          <dd>7</dd>
        </div>
        <div>
          <dt>Followers</dt>
          <dd>{following ? 213 : 212}</dd>
        </div>
      </dl>
      <div className="actions">
        <Button aria-pressed={following} onClick={() => setFollowing(!following)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={following ? "M5 12l4 4L19 6" : "M12 5v14M5 12h14"} />
          </svg>
          Follow
        </Button>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.profile-card) to ([class*="loam-"]) {
  :scope {
    --loam-avatar-size: 5rem;

    display: block grid;
    gap: var(--loam-space-xs);
    grid-template-columns: minmax(0, 1fr);
    inline-size: min(100%, 20rem);
    justify-items: center;
    text-align: center;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin-block: var(--loam-space-sm) 0;
  }

  p.role {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
  }

  dl.stats {
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    inline-size: 100%;
    margin-block: var(--loam-space-md) var(--loam-space-sm);

    div {
      display: block grid;
      gap: calc(var(--loam-space-xs) / 2);
      grid-template-columns: minmax(0, 1fr);
    }

    dt {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-xs);
      order: 1;
    }

    dd {
      color: var(--loam-color-fg-strong);
      font-family: var(--loam-font-display);
      font-size: var(--loam-text-lg);
      font-variant-numeric: lining-nums tabular-nums;
      font-weight: 700;
      line-height: 1.1;
      margin: 0;
    }
  }

  div.actions {
    --loam-context: primary;

    display: block grid;
    grid-template-columns: minmax(0, 1fr);
    inline-size: 100%;
  }
}
```

