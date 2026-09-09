---
title: Choice cards with checkboxes
description: Add-ons as cards, any number of which can be ticked, each with a line saying what it includes and costs; one is not on offer.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Choice cards with checkboxes

Add-ons as cards, any number of which can be ticked, each with a line saying what it includes and costs; one is not on offer.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Checkbox`, `Fieldset`
- Tags: add-ons, extras, checkbox cards, options, membership
- Live: https://loamui.com/examples/forms/choice-cards-checkbox

## Built to the pillars

- **Native CSS.** A fieldset names the set and each card is a <label> around a native checkbox sharing one name, so the form submits every ticked value under it and the whole surface is the click target.
- **Modern CSS.** Checked and disabled are detected from the input with :has(), never declared on the card; the disabled option fades its words while the Card keeps its line, so it still reads as one of the set.
- **Composition.** Card is rendered as each label through render and Checkbox.Control is the bare control a Field would otherwise wire; the example puts the three parts on a two-column grid and adds the checked edge, nothing of the Card's own.
- **Contextualism.** The checked edge uses the -strong primary so it holds 3:1 in both schemes, and moves to the system Highlight in forced colours, where the disabled words go to GrayText instead of fading.
- **Accessible & gatekept.** Each checkbox is named by its title alone through aria-labelledby and described by the detail through aria-describedby, so a screen reader hears the option and then what it costs; the option that cannot be chosen says why in its description rather than vanishing.

## Example.tsx

```tsx
"use client";

import { Card, Checkbox, Fieldset } from "@loamui/core";
import "./example.css";

const ADDONS = [
  {
    value: "seed-of-the-month",
    title: "Seed of the month",
    description: "A packet chosen for the season, posted on the first of each month. £4 a month.",
    defaultChecked: true,
  },
  {
    value: "calendar",
    title: "Printed sowing calendar",
    description: "The year's sowing and planting dates for your plot, on the wall. £6, once.",
  },
  {
    value: "open-days",
    title: "Open-day pass",
    description: "Included with Grower and Household membership.",
    disabled: true,
  },
];

export default function Example() {
  return (
    <Fieldset.Root className="choice-cards-checkbox">
      <Fieldset.Legend>Add-ons</Fieldset.Legend>
      <div className="cards">
        {ADDONS.map((addon) => {
          const id = `addon-${addon.value}`;
          return (
            <Card key={addon.value} render={<label className="card" htmlFor={id} />}>
              <span className="control">
                <Checkbox.Control
                  id={id}
                  name="addon"
                  value={addon.value}
                  defaultChecked={addon.defaultChecked}
                  disabled={addon.disabled}
                  aria-labelledby={`${id}-title`}
                  aria-describedby={`${id}-description`}
                />
              </span>
              <span className="title" id={`${id}-title`}>
                {addon.title}
              </span>
              <span className="description" id={`${id}-description`}>
                {addon.description}
              </span>
            </Card>
          );
        })}
      </div>
    </Fieldset.Root>
  );
}
```

## example.css

```css
/* The root is the core Fieldset, which keeps its own reset, legend and
   column. The cards sit in a grid of the example's own that fits as many
   across as the group has room for. */
@scope (.choice-cards-checkbox) to ([class*="loam-"]) {
  div.cards {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  }
}

/* Each card is a core Card rendered as the label, so it is this scope's
   root: the checked edge is an outline drawn in the Card's own line's
   place, and the focus ring and the pointer sit on the same root; the
   Card's surface, padding and radius are left as they are. The checkbox
   inside is a core control past the donut. */
@scope (.choice-cards-checkbox label.card) to ([class*="loam-"]) {
  :scope {
    align-content: start;
    align-items: start;

    /* The whole surface is the label, so the cursor says so everywhere
       on it, padding included. */
    cursor: pointer;
    display: block grid;
    gap: var(--loam-space-xs) var(--loam-space-md);
    grid-template-columns: auto minmax(0, 1fr);

    /* Checked is the control's own tick plus this edge: never colour
       alone. Inset by the Card's 1px line, so it takes the line's place
       rather than sitting outside it. */
    &:has(input:checked) {
      outline: 2px solid var(--loam-color-primary-strong);
      outline-offset: -1px;
    }

    /* The ring the elements layer gives the control, repeated around the
       card so a keyboard user sees which card holds focus: a shadow, since
       the outline is the checked edge and a checked card can hold focus. */
    &:has(input:focus-visible) {
      box-shadow: 0 0 0 var(--loam-ring-width) var(--loam-color-ring);
    }

    &:has(input:disabled) {
      cursor: not-allowed;
    }
  }

  span.control {
    display: block flex;
    grid-column: 1;

    /* Centre the control on the title's first line. */
    padding-block-start: 0.2lh;
  }

  span.title {
    color: var(--loam-color-fg-strong);
    font-weight: 600;
    grid-column: 2;
  }

  span.description {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    grid-column: 2;
  }

  /* Only the words fade with a disabled control; the Card keeps its line
     so the option still reads as one of the set. */
  :scope:has(input:disabled) :is(span.title, span.description) {
    opacity: var(--loam-disabled-opacity);
  }

  /* Forced colours: the edge keeps its state in the system highlight; the
     shadow is dropped there, so the ring becomes an outline too, offset
     so both read when the checked card has focus. A disabled option's
     flattened opacity is replaced by the system's own disabled text. */
  @media (forced-colors: active) {
    :scope:has(input:checked) {
      outline-color: Highlight;
    }

    :scope:has(input:focus-visible) {
      outline: var(--loam-ring-width) solid Highlight;
      outline-offset: 2px;
    }

    :scope:has(input:disabled) :is(span.title, span.description) {
      color: GrayText;
    }
  }
}
```

