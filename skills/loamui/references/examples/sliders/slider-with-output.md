---
title: Slider with output
description: A row-spacing slider with its value written in a readout that rides above the thumb: a native output bound to the range, in centimetres.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Slider with output

A row-spacing slider with its value written in a readout that rides above the thumb: a native output bound to the range, in centimetres.

An example in **Sliders**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Range`
- Tags: slider, range, output, value, readout, spacing
- Live: https://loamui.com/examples/sliders/slider-with-output

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The readout is a native <output for> pointing at the range, so the browser knows the two belong together and reports the value as a status; the slider itself is an <input type="range"> with the platform's keyboard.
- **Modern CSS.** The Root sets one custom property, the thumb's position as a fraction, and the Output's margin is a calc of it against the thumb's own size in em: no measuring, no script placing a bubble, and it holds at every container width.
- **Composition.** Field.Root, Label and Description around Range.Root, Range and Range.Output as core ships them; the unit is the Output's labels.value, so the words are the consumer's and the binding is core's.
- **Accessible & gatekept.** The value is always in view, not only on hover, and the words say the unit; a screen reader hears the slider's value and the output's status. Both come from the one input, so the readout can never disagree with the thumb.

## Example.tsx

```tsx
"use client";

import { Field, Range } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Field.Root className="slider-with-output">
      <Field.Label>Row spacing</Field.Label>
      <Field.Description>Carrots do well at 15 cm; brassicas want the room.</Field.Description>
      <Range.Root>
        <Range name="spacing" min={15} max={60} step={5} defaultValue={30} />
        <Range.Output labels={{ value: (n) => `${n} cm` }} />
      </Range.Root>
    </Field.Root>
  );
}
```

## example.css

```css
/* Range.Root carries the thumb's position, and its own grid puts the Output
   over the thumb; only the width is set here. */
@scope (.slider-with-output) to ([class*="loam-"]) {
  :scope {
    max-inline-size: 32rem;
  }
}
```

