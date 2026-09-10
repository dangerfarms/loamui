---
title: Floating label
description: A name field whose label sits in the box until the box is focused or filled, then rises above it and stays there: a label in the box's position, never a placeholder standing in for one.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Floating label

A name field whose label sits in the box until the box is focused or filled, then rises above it and stays there: a label in the box's position, never a placeholder standing in for one.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Input`
- Tags: floating label, label, placeholder, input, animation
- Live: https://loamui.com/examples/forms/floating-label

## Built to the pillars

- **Native CSS.** A real <label for> on a real input: the words are the control's name in every state, and clicking them focuses the box. The placeholder is one space, there only so :placeholder-shown answers whether the box is empty; no hint is hidden in it.
- **Modern CSS.** The two positions are one :has() on the field, input:focus or input:not(:placeholder-shown), with no script watching the value; the rise is a transition on inset and font-size behind prefers-reduced-motion.
- **Composition.** Core Field with an id of the example's choosing, so the example's own label and core's Input agree on the control by name; the Input is untouched past the donut, and the label's resting place is derived from the box's own border and padding tokens.
- **Accessible & gatekept.** A label that stays visible once the field is filled is what tells a floating label from a placeholder: the question is still on the page when the answer is being checked. The resting words are muted but AA-readable; the raised words take the text colour, and primary while the box has focus, so the state is carried by position and weight, never colour alone.

## Example.tsx

```tsx
"use client";

import { Field, Input } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Field.Root className="floating-label" id="full-name">
      <label htmlFor="full-name">Full name</label>
      {/* One space: :placeholder-shown is true exactly while the box is
          empty, and a space shows nothing. The label is never the hint. */}
      <Input name="name" autoComplete="name" placeholder=" " />
    </Field.Root>
  );
}
```

## example.css

```css
/* Field.Label cannot be placed, so the label is the example's own element,
   pointed at the Input by the Field's id. */
@scope (.floating-label) to ([class*="loam-"]) {
  :scope {
    --_float: calc(1.2 * var(--loam-text-xs));

    max-inline-size: 28rem;
    padding-block-start: calc(var(--_float) + var(--loam-space-xs));
    position: relative;
  }

  /* No pointer-events rule: a click on the label focuses the input, as a
     label's does. */
  label {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    inset-block-start: calc(var(--_float) + var(--loam-space-xs) + 1px + var(--loam-space-sm));
    inset-inline-start: calc(1px + var(--loam-space-md));
    line-height: 1.2;
    position: absolute;

    :scope:has(input:focus) &,
    :scope:has(input:not(:placeholder-shown)) & {
      color: var(--loam-color-fg);
      font-size: var(--loam-text-xs);
      font-weight: 500;
      inset-block-start: 0;
      inset-inline-start: 0;
    }

    :scope:has(input:focus) & {
      color: var(--loam-color-primary);
    }

    @media (prefers-reduced-motion: no-preference) {
      transition:
        color var(--loam-duration-sm) var(--loam-ease),
        font-size var(--loam-duration-md) var(--loam-ease),
        inset-block-start var(--loam-duration-md) var(--loam-ease),
        inset-inline-start var(--loam-duration-md) var(--loam-ease);
    }
  }
}
```

