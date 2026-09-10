---
title: Page header
description: The top of a page inside an application: where it sits, what it is, a line about it, a row of facts and the actions that act on the whole page.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Page header

The top of a page inside an application: where it sits, what it is, a line about it, a row of facts and the actions that act on the whole page.

An example in **Navigation**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Breadcrumbs`, `Button`, `Time`
- Tags: breadcrumbs, title, actions, app shell, record
- Live: https://loamui.com/examples/navigation/page-header

## Built to the pillars

- **Native CSS.** A header named by the page's one h1 through aria-labelledby, so a landmark list says which page's header it is; the date is a time element with a machine-readable dateTime.
- **Modern CSS.** A two-column grid answered by the header's own width: the text is pinned to the first column and the actions flow beside it where there is room, beneath it where there is not.
- **Composition.** Breadcrumbs, Badge, Time and Button are dropped in as they come, and the grid places the Breadcrumbs by flow rather than by reaching into their root.
- **Contextualism.** The status fact is a success region and Request seed sits in a primary one, so the Badge and the Button take their colours from where they sit without a prop between them; primary is the brand slot, neutral until a theme fills it, so the main action is told by its place, last in the row, not by colour.
- **Accessible & gatekept.** Breadcrumbs come first because where the page sits is read before what it is; the facts are a list, not headings; the actions come last, beside the title only visually.

## Example.tsx

```tsx
"use client";

import { Badge, Breadcrumbs, Button, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <header className="page-header" aria-labelledby="page-header-title">
      <Breadcrumbs.Root>
        <Breadcrumbs.Item href="/library">Seed library</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/library/tomatoes">Tomatoes</Breadcrumbs.Item>
        <Breadcrumbs.Item current>Gardener&rsquo;s Delight</Breadcrumbs.Item>
      </Breadcrumbs.Root>
      <div className="text">
        <h1 id="page-header-title">Gardener&rsquo;s Delight</h1>
        <p className="description">
          An open-pollinated cherry tomato, sweet and heavy-cropping, saved on the Lower Field plot
          since 2019 and offered to members every spring.
        </p>
        <ul className="meta" role="list">
          <li className="status">
            <Badge>Accepted into the library</Badge>
          </li>
          <li>
            Updated <Time value="2026-09-01" locale="en-GB" />
          </li>
          <li>Steward: Bryn Powell</li>
        </ul>
      </div>
      <div className="actions">
        <Button>Print label</Button>
        <span className="primary">
          <Button>Request seed</Button>
        </span>
      </div>
    </header>
  );
}
```

## example.css

```css
@scope (.page-header) to ([class*="loam-"]) {
  :scope {
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md) var(--loam-space-lg);
    grid-template-columns: minmax(0, 1fr);
    padding-block-end: var(--loam-space-lg);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-xs);
    grid-column: 1;
  }

  h1 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    overflow-wrap: anywhere;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
  }

  ul.meta {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs) var(--loam-space-md);
    list-style: none;
    margin-block: var(--loam-space-xs) 0;
    margin-inline: 0;
    padding: 0;

    li {
      margin: 0;
    }
  }

  li.status {
    --loam-context: success;
  }

  div.actions {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
  }

  span.primary {
    --loam-context: primary;
  }

  @container (inline-size > 40rem) {
    :scope {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    div.actions {
      align-self: start;
      grid-column: 2;
      justify-content: end;
    }
  }
}
```

