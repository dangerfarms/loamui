---
title: User card
description: One member on a card: their picture over their name and role, three figures about them, and a button to follow.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# User card

One member on a card: their picture over their name and role, three figures about them, and a button to follow.

An example in **Users**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Button`, `Card`
- Tags: profile, member, avatar, stats, follow
- Live: https://loamui.com/examples/users/user-card

## Built to the pillars

- **Native CSS.** The card is an article named by its heading, and the figures are a description list of three pairs, so the markup reads label then value while the screen shows value over label.
- **Modern CSS.** The avatar's size is Avatar's public --loam-avatar-size, set on the card and inherited, and the figures are set in tabular lining numerals so the three line up.
- **Composition.** Card is the surface, rendered as the article; the example arranges the column inside it and never touches the Card's own border, radius or padding.
- **Contextualism.** The action row is a primary region, so the one Button takes the brand colour from where it sits, and the grid region stretches it to the card's width without a prop; primary is the brand slot, neutral until a theme fills it.
- **Accessible & gatekept.** The Avatar is hidden because the name is printed beneath it, so a screen reader hears the person once; the figures carry their labels in the markup, not in a tooltip.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Avatar, Button, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  const name = useId();
  return (
    <Card render={<article className="user-card" aria-labelledby={name} />}>
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
          <dd>212</dd>
        </div>
      </dl>
      <div className="actions">
        <Button>Follow</Button>
      </div>
    </Card>
  );
}
```

## example.css

```css
@scope (.user-card) to ([class*="loam-"]) {
  :scope {
    --loam-avatar-size: 5rem;

    display: block grid;
    gap: var(--loam-space-xs);
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
    inline-size: 100%;
  }
}
```

