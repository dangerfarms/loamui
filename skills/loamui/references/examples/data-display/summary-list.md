---
title: Summary list
description: Label and value rows of a member's account, each with a link to change it, named for what they summarise.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Summary list

Label and value rows of a member's account, each with a link to change it, named for what they summarise.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Time`
- Tags: account, check your answers, key value, details
- Live: https://loamui.com/examples/data-display/summary-list

## Built to the pillars

- **Native CSS.** A description list: each label is a term and its value the description, grouped in a div per row so the pair and its link stay together, under a heading that names the section.
- **Modern CSS.** The list is a three-column grid and every row a subgrid of it, so the change links share one column down the list and the values stay aligned whether or not a row has a link.
- **Composition.** Element styles carry the rows; the only component is Time, dropped into a value so the renewal date is machine-readable while the words are the page's own.
- **Accessible & gatekept.** Every link says what it changes, with the object visually hidden after the verb, so a screen reader's list of links reads Change name, Change plot, Add phone number rather than Change six times; a missing value is written as Not provided, never left blank.

## Example.tsx

```tsx
import { Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="summary-list" aria-labelledby="summary-list-title">
      <h2 id="summary-list-title">Your membership</h2>
      <dl>
        <div className="row">
          <dt>Name</dt>
          <dd className="value">Sarah Bloom</dd>
          <dd className="change">
            <a href="/account/name">
              Change<span className="loam-VisuallyHidden"> name</span>
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Email address</dt>
          <dd className="value">sarah.bloom@example.com</dd>
          <dd className="change">
            <a href="/account/email">
              Change<span className="loam-VisuallyHidden"> email address</span>
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Phone number</dt>
          <dd className="value">Not provided</dd>
          <dd className="change">
            <a href="/account/phone">
              Add<span className="loam-VisuallyHidden"> phone number</span>
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Plot</dt>
          <dd className="value">Bed 14, Ludlow field</dd>
          <dd className="change">
            <a href="/account/plot">
              Change<span className="loam-VisuallyHidden"> plot</span>
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Seed-swap interests</dt>
          <dd className="value">
            <ul>
              <li>Vegetables</li>
              <li>Herbs</li>
              <li>Cut flowers</li>
            </ul>
          </dd>
          <dd className="change">
            <a href="/account/interests">
              Change<span className="loam-VisuallyHidden"> seed-swap interests</span>
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Renews</dt>
          <dd className="value">
            <Time value="2027-03-01" locale="en-GB" dateStyle="long" />
          </dd>
          <dd className="change">
            <a href="/account/renewal">
              Change<span className="loam-VisuallyHidden"> renewal</span>
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
```

## example.css

```css
/* The section is the container and the list is the grid: three columns,
   the labels a share of the width with a floor so they never crush, the
   values the rest, the change links their own width. Each row is a subgrid
   of the list, so the link column is one width down the whole list and a
   row without a link leaves it empty; the values align on both sides. */
@scope (.summary-list) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin-block-end: var(--loam-space-sm);
  }

  dl {
    display: block grid;
    grid-template-columns: minmax(8rem, 30%) 1fr auto;
    margin: 0;
  }

  /* A rule between rows, not a box around them: the list reads as one
     thing. The row spans every column and lays its cells on the list's
     tracks. */
  div.row {
    border-block-end: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-xs) var(--loam-space-lg);
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    padding-block: var(--loam-space-sm);
  }

  dt {
    color: var(--loam-color-fg-strong);
    font-weight: 600;
  }

  /* A long value (an email, a reference) breaks rather than widening its
     column; nothing truncates. */
  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  /* A value that is several things: one per line, no markers, no indent. */
  dd.value {
    ul {
      display: block grid;
      gap: var(--loam-space-xs);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
    }
  }

  /* The link sits at the end of the row's first line and never wraps
     mid-word: its column is sized to it. */
  dd.change {
    grid-column: 3;
    grid-row: 1;
    text-align: end;
    white-space: nowrap;
  }

  /* Narrow: one column, label over value over link, the link at the start
     where the eye returns. The query sits on the rows because a container
     query is answered by an ancestor, never by the element that declares
     it. */
  @container (inline-size < 36rem) {
    div.row {
      grid-template-columns: 1fr;
    }

    dd.change {
      grid-column: 1;
      grid-row: auto;
      text-align: start;
    }
  }
}
```

