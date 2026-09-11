---
title: Number input with slider
description: A propagator temperature set two ways: a three-character number box and a slider beside it, bound to the same value, each named by the one label.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Number input with slider

A propagator temperature set two ways: a three-character number box and a slider beside it, bound to the same value, each named by the one label.

An example in **Sliders**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Input`, `Range`
- Tags: slider, range, number, input, bound, temperature
- Live: https://loamui.com/examples/sliders/number-input-with-slider

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

The field and slider share a whole-degree temperature. Out-of-range integers clamp on blur; empty, non-numeric and fractional entries restore the last valid value. Connect the temperature to your application’s settings when saving.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The box is a text input with inputMode="numeric" and the native size attribute, so a phone offers the number pad and the box is as wide as its answer; the slider is an <input type="range"> with the bounds as min and max, the platform's own semantics.
- **Modern CSS.** The row is a two-track grid, auto then the rest: the box's width comes from its size attribute, which core's Input honours by shrink-wrapping the box, so no width is declared anywhere.
- **Composition.** Two core controls in one Field: the Input takes the Field's id, so the label points at it, and the Range is given its own id and aria-labelledby the label, so the label is the name of both without being the for of both. The binding is the example's, in the same file: the slider settles the value on every move, and the box only once what is typed is a whole number in range, or when it is left.
- **Accessible & gatekept.** Both controls answer to Propagator temperature and both are described by the Field's text with the bounds in it. A half-typed number never yanks the slider, and an empty box is not zero: leaving the box clamps whole numbers into range or restores the last valid value, so both controls agree after editing.

## Example.tsx

```tsx
"use client";

import { useId, useState } from "react";
import { Field, Input, Range } from "@loamui/core";
import "./example.css";

const MIN = 10;
const MAX = 30;

export default function Example() {
  const instanceId = useId();
  const [value, setValue] = useState(20);
  // What the box shows can lag the value: a half-typed number is not yet
  // a temperature, and clearing the box is not asking for zero.
  const [text, setText] = useState("20");

  const settle = (next: number) => {
    const clamped =
      Number.isFinite(next) && Number.isInteger(next) ? Math.min(MAX, Math.max(MIN, next)) : value;
    setValue(clamped);
    setText(String(clamped));
  };

  return (
    <Field.Root className="number-input-with-slider" id={`${instanceId}-propagator`}>
      <Field.Label id={`${instanceId}-propagator-label`}>Propagator temperature</Field.Label>
      <Field.Description>
        Whole degrees between {MIN} and {MAX} °C. Invalid or fractional entries return to the last
        temperature when you leave the field.
      </Field.Description>
      <div className="row">
        <Input
          name="temperature"
          inputMode="numeric"
          pattern="[0-9]*"
          size={3}
          value={text}
          endSection={<span aria-hidden="true">°C</span>}
          onChange={(event) => {
            const raw = event.currentTarget.value;
            setText(raw);
            const n = Number(raw);
            if (raw !== "" && Number.isInteger(n) && n >= MIN && n <= MAX) setValue(n);
          }}
          onBlur={() => settle(text === "" ? value : Number(text))}
        />
        <Range
          id={`${instanceId}-propagator-slider`}
          aria-labelledby={`${instanceId}-propagator-label`}
          min={MIN}
          max={MAX}
          step={1}
          value={value}
          onChange={(event) => settle(event.currentTarget.valueAsNumber)}
        />
      </div>
    </Field.Root>
  );
}
```

## example.css

```css
@scope (.number-input-with-slider) to ([class*="loam-"]) {
  :scope {
    max-inline-size: 32rem;
  }

  div.row {
    align-items: center;
    display: block grid;
    gap: var(--loam-space-md);
    grid-template-columns: auto minmax(0, 1fr);
  }
}
```

