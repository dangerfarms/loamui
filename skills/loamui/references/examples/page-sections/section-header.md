---
title: Section header
description: The intro a section opens with: an eyebrow, a heading, a line of description and an action beside them when there is room.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Section header

The intro a section opens with: an eyebrow, a heading, a line of description and an action beside them when there is room.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SignpostLink`
- Tags: heading, intro, eyebrow, section
- Live: https://loamui.com/examples/page-sections/section-header

## Built to the pillars

- **Native CSS.** A div, not a section: this is the top of a section you write, and the h2 carries an id for that section's aria-labelledby, so the landmark is yours and named by this heading.
- **Modern CSS.** The wrapper is the container and the inner element the grid; at 40rem of its own width the actions move into a second column through named areas, so a part left out leaves no hole.
- **Composition.** One SignpostLink in the action row; the example's rule stops at its root.
- **Accessible & gatekept.** The eyebrow is set in the strong primary token, the pair the contrast audit checks as text, rather than the raw hue.

## Example.tsx

```tsx
import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="section-header">
      <div className="inner">
        <p className="eyebrow">Growing guides</p>
        <h2 id="section-header-title">Learn to grow from seed</h2>
        <p className="description">
          Short guides on sowing, pricking out and hardening off, written by the growers who supply
          the packets.
        </p>
        <div className="actions">
          <SignpostLink href="/guides">All guides</SignpostLink>
        </div>
      </div>
    </div>
  );
}
```

## example.css

```css
/* The intro at the top of a section you write: the heading carries an id
   for your section's aria-labelledby. The root is only the container and
   the inner element is the grid, because an element cannot answer its
   own container query. Narrow stacks the actions beneath the words; wide
   puts them beside, in a column of their own, centred against the text. */
@scope (.section-header) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  /* Small and strong, in the strong token so it holds as text. */
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

  div.actions {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
  }

  /* Wide: each text part has a named row in the first column and the
     actions span them all in the second. Rows are named rather than
     counted, so a part left out leaves no hole. */
  @container (inline-size >= 40rem) {
    div.inner {
      align-items: center;
      column-gap: var(--loam-space-lg);
      grid-template-areas:
        "eyebrow actions"
        "title actions"
        "description actions";
      grid-template-columns: minmax(0, 1fr) auto;
    }

    p.eyebrow {
      grid-area: eyebrow;
    }

    h2 {
      grid-area: title;
    }

    p.description {
      grid-area: description;
    }

    div.actions {
      grid-area: actions;
    }
  }
}
```

