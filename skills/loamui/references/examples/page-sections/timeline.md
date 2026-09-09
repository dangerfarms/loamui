---
title: Timeline
description: Five dated events in order, each with a marker, a date, a title and a line, joined by a hairline.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Timeline

Five dated events in order, each with a marker, a date, a title and a line, joined by a hairline.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: history, events, dates, changelog, milestones
- Live: https://loamui.com/examples/page-sections/timeline

## Built to the pillars

- **Native CSS.** An ol carries the order and a time element carries each date with its machine-readable value; the dots and the line are pseudo-elements, so nothing decorative is in the accessibility tree.
- **Modern CSS.** Each event is a grid with named areas, the dot centred on the date's line with lh, and the connector run across the list's gap with a negative margin rather than absolute positioning.
- **Composition.** Element styles alone: an ordered list, headings, paragraphs and time, so no component is imported and no Stepper is bent into a history.
- **Accessible & gatekept.** The list keeps role=list so its count survives list-style: none, and in forced colours the dot keeps an outline and the connector its ink where the fills would vanish.

## Example.tsx

```tsx
import "./example.css";

const EVENTS = [
  {
    date: "2014-04",
    label: "April 2014",
    title: "Three allotments and a kitchen table",
    description:
      "Five growers on the Ludlow allotments pool the seed they have saved and post packets to friends who ask.",
  },
  {
    date: "2016-01",
    label: "January 2016",
    title: "The first catalogue",
    description:
      "Forty varieties in a photocopied booklet, sold from a trestle table at the winter market.",
  },
  {
    date: "2019-03",
    label: "March 2019",
    title: "Registered as a co-operative",
    description:
      "Hedgerow becomes a community benefit society: one member, one vote, and the surplus goes back into growing.",
  },
  {
    date: "2022-05",
    label: "May 2022",
    title: "The nursery opens at Bromfield",
    description:
      "Two acres, a polytunnel and a drying barn, with trial beds any member can walk on open days.",
  },
  {
    date: "2025-09",
    label: "September 2025",
    title: "A thousand members",
    description:
      "The thousandth member joins the week the catalogue passes four hundred varieties.",
  },
];

export default function Example() {
  return (
    <ol className="timeline" role="list">
      {EVENTS.map((event) => (
        <li key={event.date}>
          <time dateTime={event.date}>{event.label}</time>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </li>
      ))}
    </ol>
  );
}
```

## example.css

```css
/* Dated events in order: an ol, so the order is the list's own, with a
   drawn dot for each event and a hairline between them. The dot and the
   line are pseudo-elements, decorative and never read; the date is a
   time element with its machine-readable value. The list keeps its
   semantics through role="list" in the markup, since list-style: none
   drops them in some browsers. */
@scope (.timeline) to ([class*="loam-"]) {
  :scope {
    --_dot: 0.875rem;
    --_gap: var(--loam-space-lg);

    container-type: inline-size;
    display: block grid;
    gap: var(--_gap);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* One event: the dot in a column of its own, spanning the date, the
     title and the description beside it. */
  li {
    display: block grid;
    gap: var(--loam-space-xs) var(--loam-space-md);
    grid-template-areas:
      "dot date"
      "dot title"
      "dot description";
    grid-template-columns: var(--_dot) minmax(0, 1fr);
    margin: 0;

    /* The dot, centred on the date's line: it takes the date's type so
       1lh is that line. Strong fill with a ring of the page, so it
       stands off the hairline that runs behind it. */
    &::before {
      background: var(--loam-color-primary-strong);
      block-size: var(--_dot);
      border-radius: var(--loam-radius-full);
      box-shadow: 0 0 0 3px var(--loam-color-bg);
      content: "";
      font-size: var(--loam-text-sm);
      grid-area: dot;
      inline-size: var(--_dot);
      margin-block-start: calc((1lh - var(--_dot)) / 2);
      z-index: 1;
    }

    /* The connector: a hairline from this dot to the next. It shares the
       dot's cell, centred on the column, and its negative end margin
       runs it across the list's gap. The last event has nothing to
       connect to. */
    &::after {
      border-inline-start: 1px solid var(--loam-color-line-strong);
      content: "";
      grid-area: dot;
      justify-self: center;
      margin-block: var(--_dot) calc(-1 * var(--_gap));
    }

    &:last-child::after {
      content: none;
    }
  }

  time {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    grid-area: date;
  }

  h3 {
    font-size: var(--loam-text-lg);
    grid-area: title;
    margin: 0;
  }

  p {
    color: var(--loam-color-fg-muted);
    grid-area: description;
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  /* Forced colours: the fill is background-painted and would vanish, so
     the dot keeps an outline and the line keeps its ink. */
  @media (forced-colors: active) {
    li {
      &::before {
        border: 2px solid CanvasText;
      }

      &::after {
        border-color: CanvasText;
      }
    }
  }
}
```

