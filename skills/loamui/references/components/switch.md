---
title: Switch
description: An on/off toggle switch.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Switch

An on/off toggle for a single setting that takes effect immediately.

## Import

```tsx
import { Field, Switch, SwitchControl } from "@loamui/core";
```

## Usage

### Basic usage

```tsx
<Switch aria-label="Email notifications" />
```

### Checked

The track fills with the primary colour when on.

```tsx
<Switch defaultChecked aria-label="Autosave" />
```

### Label position

labelPosition places the label after the toggle (default) or before it.

```tsx
<Switch label="Enable notifications" />
<Switch label="Label on the left" labelPosition="start" />
```

### Disabled

```tsx
<Switch label="Off & disabled" disabled />
<Switch label="On & disabled" defaultChecked disabled />
```

### Composed inside a Field

The bare SwitchControl self-wires from Field context: label association and description linking come from the Field, the same composition contract every form control shares.

```tsx
<Field.Root>
  <Field.Label>
    <SwitchControl defaultChecked /> Email notifications
  </Field.Label>
  <Field.Description>Sent at most once a day.</Field.Description>
</Field.Root>
```

## When to use it

- For an instant on/off setting that takes effect immediately, with no separate save step (notifications, dark mode).
- When the two states are clearly opposite and the control acts like a physical switch.

## When not to

- When the change only applies after submitting a form. Use a Checkbox instead: its ticked state reads as "will apply when I submit".
- For selecting among more than two states. Use Radio or Select.

## How it works

### A switch acts now, a checkbox acts on submit

role="switch" announces on/off, and users expect flipping it to take effect immediately, like a light switch. Inside a form that applies changes on save, that expectation is a lie: use Checkbox, whose ticked state reads as “will apply when I submit”. The test is the presence of a save button: if there is one, it isn't a Switch.

### Label the affirmative

The label names the thing that is on when the switch is on: “Email notifications”, never “Disable emails”. The control already says on or off, so a negated label makes on mean off. Keep the label constant across states; a label that rewrites itself when toggled leaves users unsure whether it describes the current state or the action.

## Accessibility

- Renders a native checkbox exposed with role="switch", so it is operable by keyboard and announced as on/off.
- The label is tied to the control; the whole row is clickable.
- In the rare case a switch needs an error message, wrap it in a Field.Root and add a Field.Error before the control: the message marks it invalid and is announced.
- State is conveyed by more than colour (the thumb position), so it remains clear in forced-colors and for colour-blind users.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Label rendered beside the toggle. |
| `description` | `ReactNode` | — | Helper text rendered below the label row. |
| `labelPosition` | `"start" \| "end"` | `"end"` | Which side of the toggle the label sits on. |
| `wrapperClassName` | `string` | — | Class for the label-row wrapper element (the input keeps className). |
| `...others` | `InputHTMLAttributes` | — | All native <input type="checkbox"> props (except type and size) are forwarded. |

## Parts

### SwitchControl

The bare toggle without a label, for composing inside a Field where the label lives on Field.Label. It reads its wiring (id, aria-describedby, aria-invalid) from the field context, and takes the same props as Switch minus label, description, labelPosition and wrapperClassName.

