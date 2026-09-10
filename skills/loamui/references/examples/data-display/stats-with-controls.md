---
title: Stats with controls
description: A day's figures from the packing shed: Previous and Next Buttons around the date, and three Meters showing where each figure sits against the day's capacity.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Stats with controls

A day's figures from the packing shed: Previous and Next Buttons around the date, and three Meters showing where each figure sits against the day's capacity.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Meter`, `Time`
- Tags: daily, metrics, meter, capacity, date picker, dashboard
- Live: https://loamui.com/examples/data-display/stats-with-controls

## Built to the pillars

- **Native CSS.** The bars are native meter elements, because each figure sits within a known range rather than progressing toward an end; the date is a time element and the tiles are one description list.
- **Modern CSS.** The tiles are an auto-fit grid answering the section's width; the figures are tabular lining numerals so they hold their width as the day changes under them, and the Meter's track reads because it sits on the Card's surface rather than a tinted tile.
- **Composition.** The page holds the day in state and hands each Meter its value and the capacity as max; each tile is a Card rendered as the list's grouping div, and the Meters, the Buttons and the Time are dropped in as they come.
- **Accessible & gatekept.** The buttons at the ends of the range are aria-disabled rather than disabled, so the one just pressed keeps focus; each meter is named for what it measures and each figure is written out with its capacity.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Button, Card, Meter, Time } from "@loamui/core";
import "./example.css";

interface Day {
  date: string;
  posted: number;
  picked: number;
  deliveries: number;
}

// What the packing shed can do in a day: the range each figure sits in.
const CAPACITY = { posted: 200, picked: 1200, deliveries: 16 };

// The day shown first is today, so Next has nowhere to go until tomorrow's
// figures exist; Previous walks back through the days the shed has logged.
const TODAY: Day = { date: "2026-09-08", posted: 84, picked: 520, deliveries: 11 };

const DAYS: Day[] = [
  { date: "2026-09-03", posted: 118, picked: 760, deliveries: 12 },
  { date: "2026-09-04", posted: 96, picked: 640, deliveries: 9 },
  { date: "2026-09-07", posted: 132, picked: 910, deliveries: 14 },
  TODAY,
];

function Chevron({ direction }: { direction: -1 | 1 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points={direction === -1 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

export default function Example() {
  const [day, setDay] = useState<Day>(TODAY);
  const at = DAYS.indexOf(day);
  const previous = DAYS[at - 1];
  const next = DAYS[at + 1];

  return (
    <section className="stats-with-controls" aria-labelledby="stats-with-controls-title">
      <div className="controls">
        <Button
          aria-disabled={previous ? undefined : true}
          onClick={() => {
            if (previous) setDay(previous);
          }}
        >
          <Chevron direction={-1} />
          <span className="loam-VisuallyHidden">Previous day</span>
        </Button>
        <h2 id="stats-with-controls-title">
          <Time value={day.date} locale="en-GB" dateStyle="full" />
        </h2>
        <Button
          aria-disabled={next ? undefined : true}
          onClick={() => {
            if (next) setDay(next);
          }}
        >
          <Chevron direction={1} />
          <span className="loam-VisuallyHidden">Next day</span>
        </Button>
      </div>
      <dl className="figures">
        <Card render={<div className="figure" />}>
          <dt>Orders posted</dt>
          <dd className="value">
            {day.posted} <span className="of">of {CAPACITY.posted}</span>
          </dd>
          <dd className="bar">
            <Meter value={day.posted} max={CAPACITY.posted} label="Orders posted, of capacity" />
          </dd>
        </Card>
        <Card render={<div className="figure" />}>
          <dt>Packets picked</dt>
          <dd className="value">
            {day.picked.toLocaleString("en")}{" "}
            <span className="of">of {CAPACITY.picked.toLocaleString("en")}</span>
          </dd>
          <dd className="bar">
            <Meter value={day.picked} max={CAPACITY.picked} label="Packets picked, of capacity" />
          </dd>
        </Card>
        <Card render={<div className="figure" />}>
          <dt>Deliveries out</dt>
          <dd className="value">
            {day.deliveries} <span className="of">of {CAPACITY.deliveries}</span>
          </dd>
          <dd className="bar">
            <Meter
              value={day.deliveries}
              max={CAPACITY.deliveries}
              label="Deliveries out, of capacity"
            />
          </dd>
        </Card>
      </dl>
    </section>
  );
}
```

## example.css

```css
@scope (.stats-with-controls) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
  }

  div.controls {
    align-items: center;
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  h2 {
    font-size: var(--loam-text-lg);
    margin: 0;
    text-align: center;
  }

  dl.figures {
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    margin: 0;
  }
}

@scope (.stats-with-controls div.figure) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-xs);
  }

  dt {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
  }

  dd.value {
    color: var(--loam-color-fg-strong);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-2xl);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;

    span.of {
      color: var(--loam-color-fg-muted);
      font-family: var(--loam-font);
      font-size: var(--loam-text-sm);
      font-weight: 400;
      letter-spacing: 0;
    }
  }

  dd.bar {
    margin: 0;
  }
}
```

