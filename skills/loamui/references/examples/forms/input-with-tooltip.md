---
title: Input with tooltip
description: A plot reference box with an information icon in its end section that opens a tooltip on hover and on keyboard focus, saying where the reference is printed.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Input with tooltip

A plot reference box with an information icon in its end section that opens a tooltip on hover and on keyboard focus, saying where the reference is printed.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Input`, `Tooltip`
- Tags: tooltip, help, hint, info, input, icon button
- Live: https://loamui.com/examples/forms/input-with-tooltip

## Built to the pillars

- **Native CSS.** The trigger is a real button, so it is in the tab order and the tooltip opens on focus as well as hover; the bubble is a popover in the top layer where the browser has anchor positioning, and a wrapper-anchored span elsewhere.
- **Modern CSS.** The button's 24px target comes from padding pulled back by an equal negative margin, so the box keeps the derived control height it shares with buttons; the icon is sized in em from the box's type.
- **Composition.** Tooltip.Root, Trigger, Popup and Arrow inside the Input's endSection, the one adornment slot core keeps; the trigger is substituted through render, because a core Button's padding belongs beside a box, not in it.
- **Accessible & gatekept.** The tooltip holds a hint, not the requirement: the label names the field and it works without the bubble, since hover is unavailable on touch. The button is named by hidden text and described by the bubble through aria-describedby, so a screen reader hears the hint on reaching the button; Escape dismisses the bubble without moving focus.

## Example.tsx

```tsx
"use client";

import { Field, Input, Tooltip } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Field.Root className="input-with-tooltip">
      <Field.Label>Plot reference</Field.Label>
      <Input
        name="plot"
        autoComplete="off"
        autoCapitalize="characters"
        endSection={
          <Tooltip.Root>
            <Tooltip.Trigger render={<button type="button" className="hint" />}>
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
        }
      />
    </Field.Root>
  );
}
```

## example.css

```css
/* The root is the core Field; the box is core's Input with the Tooltip in
   its end section, all past the donut. The trigger inside the Tooltip is
   the example's own button: a core Button carries the control's padding
   and would raise the box, so this one is a bare button dressed down to
   its icon, scoped at the Tooltip that holds it. The hit area is grown
   to 24px by a step of padding pulled back with an equal negative margin, so it meets the
   target size without changing the box's derived height. */
@scope (.input-with-tooltip .loam-Tooltip) to ([class*="loam-"]) {
  button.hint {
    background: none;
    border: 0;
    border-radius: var(--loam-radius-full);
    box-shadow: none;
    color: var(--loam-color-fg-muted);
    display: inline flex;
    margin: calc(-1 * var(--loam-space-xs));
    padding: var(--loam-space-xs);

    /* Sized here because the section's own icon rule stops at the
       Tooltip's class. */
    svg {
      block-size: auto;
      inline-size: 1.125em;
    }

    &:focus-visible,
    &[data-popup-open] {
      color: var(--loam-color-fg);
    }
  }
}
```

