---
title: Card with switches
description: Notification preferences in a Card: a Fieldset of rows, each a label and a line of description beside a Switch that the label names.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Card with switches

Notification preferences in a Card: a Fieldset of rows, each a label and a line of description beside a Switch that the label names.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Fieldset`, `Switch`
- Tags: settings, preferences, notifications, toggles, switch
- Live: https://loamui.com/examples/app-cards/card-with-switches

## Built to the pillars

- **Native CSS.** The group is a fieldset with a legend, so the switches are announced as Notifications; each toggle is a native checkbox with role switch, named by a real label element and described by the paragraph beside it.
- **Modern CSS.** Each row is a two-column grid with the words taking the slack and the toggle centred on them; the lines between rows are borders, so they survive forced colours.
- **Composition.** Switch.Control is the bare toggle, wired to its own label and description by id, because the row's layout is the example's rather than the labelled row Switch draws on its own.
- **Accessible & gatekept.** A switch says on or off, so a reader hears Order updates, switch, on; the description is joined by aria-describedby rather than sitting loose under the label.

## Example.tsx

```tsx
"use client";

import { Card, Fieldset, Switch } from "@loamui/core";
import "./example.css";

const PREFERENCES = [
  {
    id: "orders",
    name: "orderUpdates",
    label: "Order updates",
    description: "An email when an order is packed and again when it is posted.",
    on: true,
  },
  {
    id: "sowing",
    name: "sowingReminders",
    label: "Sowing reminders",
    description: "What to sow this month, for the seed you have bought.",
    on: true,
  },
  {
    id: "swaps",
    name: "swapRequests",
    label: "Seed swap requests",
    description: "When a member asks for a variety you have listed.",
    on: false,
  },
  {
    id: "newsletter",
    name: "newsletter",
    label: "Seasonal newsletter",
    description: "News from the co-op, four times a year.",
    on: false,
  },
];

export default function Example() {
  return (
    <Card className="card-with-switches">
      <Fieldset.Root className="preferences">
        <Fieldset.Legend>Notifications</Fieldset.Legend>
        <p className="description">
          Which messages Hedgerow sends you. Each one is off until you turn it on.
        </p>
        <div className="rows">
          {PREFERENCES.map((preference) => {
            const id = `card-with-switches-${preference.id}`;
            return (
              <div className="row" key={preference.id}>
                <div className="text">
                  <label htmlFor={id}>{preference.label}</label>
                  <p id={`${id}-description`}>{preference.description}</p>
                </div>
                <Switch.Control
                  id={id}
                  name={preference.name}
                  aria-describedby={`${id}-description`}
                  defaultChecked={preference.on}
                />
              </div>
            );
          })}
        </div>
      </Fieldset.Root>
    </Card>
  );
}
```

## example.css

```css
/* The Card is the surface and the Fieldset inside it is core's, so the
   Card's own scope reaches nothing: it only declares the container the
   rows answer. */
@scope (.card-with-switches) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }
}

/* The Fieldset is a limit of the donut above, so the rows inside it are
   reached from a second scope rooted at it. The Fieldset keeps its own
   reset and legend; this scope lays out the description and the rows,
   and each Switch.Control past the donut keeps its track and thumb. */
@scope (.card-with-switches fieldset.preferences) to ([class*="loam-"]) {
  p.description {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0 0 var(--loam-space-sm);
  }

  div.rows {
    display: block grid;
  }

  /* The words in the first column, the toggle in the second, centred on
     them; a line under each row separates it from the next. */
  div.row {
    align-items: center;
    border-block-start: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-lg);
    grid-template-columns: minmax(0, 1fr) auto;
    padding-block: var(--loam-space-md);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-xs);

    label {
      color: var(--loam-color-fg-strong);
      font-weight: 500;
    }

    p {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-sm);
      margin: 0;
    }
  }
}
```

