---
title: Person grid
description: Four people under a section header, each an avatar, a name and a role in a centred column.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Person grid

Four people under a section header, each an avatar, a name and a role in a centred column.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`
- Tags: team, people, about, growers, staff
- Live: https://loamui.com/examples/page-sections/person-grid

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its h2, a header for the intro and a list of four items whose names are h3 headings, so the outline lists the people.
- **Modern CSS.** An auto-fit grid answering the section's own width, and the Avatar sized through its public --loam-avatar-size on the list item rather than a rule inside it.
- **Composition.** Avatar is dropped in first in each item, taking its initials from the name; the example writes the column around it and stops at its root.
- **Accessible & gatekept.** Each Avatar is aria-hidden because the name is printed beneath it, so a screen reader hears each person once, and the ul carries role=list in the markup because the markers are gone.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Avatar } from "@loamui/core";
import "./example.css";

const PEOPLE = [
  { name: "Mari Hughes", role: "Head grower, brassicas and leaf crops" },
  { name: "Dafydd Rees", role: "Legumes and the drying barn" },
  { name: "Amara Okonkwo", role: "Tomatoes, peppers and the polytunnel" },
  { name: "Tom Price", role: "Roots, alliums and germination testing" },
];

export default function Example() {
  const instanceId = useId();
  return (
    <section className="person-grid" aria-labelledby={`${instanceId}-person-grid-title`}>
      <header>
        <p className="eyebrow">The growers</p>
        <h2 id={`${instanceId}-person-grid-title`}>Who grows your seed</h2>
        <p className="description">
          Every variety in the catalogue is grown, selected and saved by a member. These four look
          after the trial beds at the nursery.
        </p>
      </header>
      <ul role="list">
        {PEOPLE.map((person) => (
          <li key={person.name}>
            <Avatar name={person.name} aria-hidden="true" />
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

## example.css

```css
@scope (.person-grid) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-xl);
  }

  header {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  p.eyebrow {
    color: var(--loam-color-primary-strong);
    font-size: var(--loam-text-sm);
    font-weight: 600;
    letter-spacing: 0.04em;
    margin: 0;
    text-transform: uppercase;
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    max-inline-size: 30ch;
    text-wrap: balance;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  ul {
    display: block grid;
    gap: var(--loam-space-xl) var(--loam-space-lg);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    --loam-avatar-size: 5rem;

    align-items: center;
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-xs);
    margin: 0;
    text-align: center;

    > p {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-sm);
      margin: 0;
      text-wrap: balance;
    }
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin-block: var(--loam-space-sm) 0;
  }
}
```

