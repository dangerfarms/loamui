---
title: Choice cards with radios
description: Three membership plans as cards, each the label of a real radio, with the chosen one marked by an edge as well as its dot.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Choice cards with radios

Three membership plans as cards, each the label of a real radio, with the chosen one marked by an edge as well as its dot.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Card`, `Radio`, `RadioGroup`
- Tags: plans, pricing, membership, radio cards, options
- Live: https://loamui.com/examples/forms/choice-cards-radio

## Built to the pillars

- **Native CSS.** A RadioGroup shares the name and the default, and each card is a <label> around a native radio, so the whole surface is the click target and the arrow keys move the choice as on any radio set; the state lives in the input, not on the card.
- **Modern CSS.** Checked is detected from the input with :has(), never declared on the card: an outline in the Card's own line's place, and a focus ring around the card when the radio inside has keyboard focus.
- **Composition.** Card is rendered as the label and left as core styles it; the example lays out the control, the title and the description inside and draws only the checked edge.
- **Contextualism.** The checked edge uses the -strong primary so it holds 3:1 in both schemes, and moves to the system Highlight in forced colours where a painted edge would be dropped.
- **Accessible & gatekept.** The radio is named by the title alone through aria-labelledby and described by the price line through aria-describedby, so a screen reader hears "Grower, radio, 2 of 3" and then the detail, not one run-on name. Chosen is the dot plus the edge, never colour alone.

## Example.tsx

```tsx
"use client";

import { Card, Radio, RadioGroup } from "@loamui/core";
import "./example.css";

const PLANS = [
  {
    value: "friend",
    title: "Friend",
    description: "Member prices on seed and plants, and the seasonal newsletter. £15 a year.",
  },
  {
    value: "grower",
    title: "Grower",
    description:
      "Everything a Friend gets, plus a share of a seed-saving plot and the sowing calendar. £40 a year.",
  },
  {
    value: "household",
    title: "Household",
    description: "Grower membership for up to four people at one address. £70 a year.",
  },
];

export default function Example() {
  return (
    <RadioGroup.Root className="choice-cards-radio" name="plan" defaultValue="grower">
      <RadioGroup.Legend>Choose a membership</RadioGroup.Legend>
      <div className="cards">
        {PLANS.map((plan) => {
          const id = `plan-${plan.value}`;
          return (
            <Card key={plan.value} render={<label className="card" htmlFor={id} />}>
              <span className="control">
                <Radio.Control
                  id={id}
                  value={plan.value}
                  aria-labelledby={`${id}-title`}
                  aria-describedby={`${id}-description`}
                />
              </span>
              <span className="title" id={`${id}-title`}>
                {plan.title}
              </span>
              <span className="description" id={`${id}-description`}>
                {plan.description}
              </span>
            </Card>
          );
        })}
      </div>
    </RadioGroup.Root>
  );
}
```

## example.css

```css
/* The root is the core RadioGroup, a fieldset that keeps its own reset,
   legend and column. The cards sit in a grid of the example's own that
   fits as many across as the group has room for. */
@scope (.choice-cards-radio) to ([class*="loam-"]) {
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
   Card's surface, padding and radius are left as they are. The radio
   inside is a core control past the donut. */
@scope (.choice-cards-radio label.card) to ([class*="loam-"]) {
  :scope {
    align-content: start;
    align-items: start;

    /* The whole surface is the label, so the cursor says so everywhere
       on it, padding included. */
    cursor: pointer;
    display: block grid;
    gap: var(--loam-space-xs) var(--loam-space-md);
    grid-template-columns: auto minmax(0, 1fr);

    /* Checked is the control's own dot plus this edge: never colour
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

  /* Forced colours: the edge keeps its state in the system highlight; the
     shadow is dropped there, so the ring becomes an outline too, offset
     so both read when the checked card has focus. */
  @media (forced-colors: active) {
    :scope:has(input:checked) {
      outline-color: Highlight;
    }

    :scope:has(input:focus-visible) {
      outline: var(--loam-ring-width) solid Highlight;
      outline-offset: 2px;
    }
  }
}
```

