---
title: Slider with marks
description: A soil-moisture target on a slider with ticks and labels at 0, 25, 50, 75 and 100 percent, snapping to them where the browser offers it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Slider with marks

A soil-moisture target on a slider with ticks and labels at 0, 25, 50, 75 and 100 percent, snapping to them where the browser offers it.

An example in **Sliders**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Range`
- Tags: slider, range, marks, ticks, datalist, moisture
- Live: https://loamui.com/examples/sliders/slider-with-marks

## Built to the pillars

- **Native CSS.** A native <input type="range"> with a <datalist> of the marks: the platform snaps the thumb to them where it supports it, and the ticks under the track are a picture of that list, hidden from assistive technology so the slider is not followed by a phantom listbox.
- **Modern CSS.** No stylesheet of its own: every mark's position is one custom property core sets on it, placed by the thumb's own geometry in em, so the labels stay under their values at every container width and text size.
- **Composition.** Field.Root, Label and Description name and explain the control, and Range takes the marks as data: the same five values feed the datalist and the labels, so they cannot disagree.
- **Accessible & gatekept.** The slider is named by the Field's label and described by its text; the arrow keys move it by the step and Home and End go to the ends, all the platform's. In forced colours the thumb and track are repainted in system colours by core and the tick marks, being borders, keep their line.

## Example.tsx

```tsx
"use client";

import { Field, Range } from "@loamui/core";
import "./example.css";

const MARKS = [
  { value: 0, label: "0%" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "100%" },
];

export default function Example() {
  return (
    <Field.Root className="slider-with-marks">
      <Field.Label>Target soil moisture</Field.Label>
      <Field.Description>The irrigation runs until the bed's sensor reads this.</Field.Description>
      <Range name="moisture" min={0} max={100} step={5} defaultValue={50} marks={MARKS} />
    </Field.Root>
  );
}
```

## example.css

```css
/* Nothing to add. The root is the core Field, and the ticks and their
   labels under the track are core's own picture of the datalist the
   marks become, placed by the thumb's geometry so each sits under the
   value it names; the labels keep their colour in forced colours and the
   ticks are borders, which survive them. */
```

