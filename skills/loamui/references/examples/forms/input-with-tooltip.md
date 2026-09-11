---
title: Input with tooltip
description: A plot reference box with an information button beside it that opens a tooltip on hover and on keyboard focus, saying where the reference is printed.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Input with tooltip

A plot reference box with an information button beside it that opens a tooltip on hover and on keyboard focus, saying where the reference is printed.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Input`, `Tooltip`
- Tags: tooltip, help, hint, info, input, icon button
- Live: https://loamui.com/examples/forms/input-with-tooltip

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The trigger is a real button, so it is in the tab order and the tooltip opens on focus as well as hover; the bubble is a popover in the top layer where the browser has anchor positioning, and a wrapper-anchored span elsewhere.
- **Modern CSS.** A two-column grid, the box floored at zero and the Button at its own width: both take the derived control height, so the row lines up with no measuring, and the icon is sized in em from the Button's type.
- **Composition.** Field, Input and Tooltip.Root, Trigger, Popup and Arrow as core ships them, the trigger the Button that Tooltip renders; it is named by hidden text beside its icon, which is what makes the Button square, so nothing is redressed by hand.
- **Accessible & gatekept.** The tooltip holds a hint, not the requirement: the label names the field and it works without the bubble, since hover is unavailable on touch. The Button is named by hidden text and described by the bubble through aria-describedby, so a screen reader hears the hint on reaching it; Escape dismisses the bubble without moving focus.

## Example.tsx

```tsx
"use client";

import { Field, Input, Tooltip } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Field.Root className="input-with-tooltip">
      <Field.Label>Plot reference</Field.Label>
      <div className="row">
        <Input name="plot" autoComplete="off" autoCapitalize="characters" />
        <Tooltip.Root>
          <Tooltip.Trigger>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6M12 7.5v.5" />
            </svg>
            <span className="loam-VisuallyHidden">About the plot reference</span>
          </Tooltip.Trigger>
          <Tooltip.Popup>
            Printed on your gate tag and your membership card, like B-14.
            <Tooltip.Arrow />
          </Tooltip.Popup>
        </Tooltip.Root>
      </div>
    </Field.Root>
  );
}
```

## example.css

```css
@scope (.input-with-tooltip) to ([class*="loam-"]) {
  :scope {
    max-inline-size: 28rem;
  }

  div.row {
    align-items: center;
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
```

