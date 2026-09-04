---
title: Checkbox
description: Toggle a single option on or off.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Checkbox

A native checkbox with an adjacent label and description.

## Import

```tsx
import { Checkbox, CheckboxControl } from "@loamui/core";
```

## Usage

### Basic usage

```tsx
<Checkbox label="Subscribe to the newsletter" />
```

### Checked

```tsx
<Checkbox label="Auto-renew enabled" defaultChecked />
```

### With description

```tsx
<Checkbox
  label="Share anonymised usage data"
  description="Helps us improve the product. You can opt out anytime."
/>
```

### Disabled

```tsx
<Checkbox label="Unavailable option" disabled />
<Checkbox label="Locked in" defaultChecked disabled />
```

### Error state

A Field.Error before the checkbox marks it invalid and is announced: no error prop, the message's presence is the state.

```tsx
<Field.Root>
  <Field.Error>Accept the terms of service to continue</Field.Error>
  <Checkbox label="Accept the terms of service" />
</Field.Root>
```

### Composed inside a Field

The bare CheckboxControl carries no label prop: it reads its id, aria-describedby and aria-invalid from the surrounding Field, so the label lives on Field.Label and nothing wires them by hand. This is the composable form; <Checkbox label=… /> is the shorthand for it.

```tsx
<Field.Root>
  <Field.Label>
    <CheckboxControl /> Subscribe to the newsletter
  </Field.Label>
  <Field.Description>A short summary, once a week.</Field.Description>
</Field.Root>
```

## When to use it

- For a single on/off choice (accept terms, stay signed in).
- For selecting any number of options from a list: group related checkboxes in a Fieldset.
- Inside a Field for full control, compose the bare box so labels never nest: <Field.Label><CheckboxControl /> …</Field.Label>.

## When not to

- For one choice among several mutually exclusive options: use Radio.
- For an instant on/off toggle that takes effect immediately: use Switch.

## How it works

### A native checkbox, styled by accent-color

This is a plain <input type="checkbox">. No custom SVG box. The elements layer paints it with the platform's own accent-color (the neutral primary), so the checked and indeterminate marks, keyboard behaviour and forced-colours support all come from the browser. The component adds only the label/description wiring and the invalid affordance. A context region recolours it because accent-color follows the primary token.

### One box or a group

A single checkbox is for one self-contained agreement or opt-in whose label is a complete statement (“Agree to the terms of service”). Several related options belong in a Fieldset whose legend asks the question. Because checkboxes and radios look alike, say in the legend or description that users can select all that apply.

### Write the label positively

The label states what happens when the box is ticked, in positive, unambiguous words: “Send me email updates”, never “Don't send me emails”. A negated label makes ticking mean refusing and unticking a double negative, and users acting quickly resolve it wrong.

### Leave boxes unticked

A pre-ticked box gets submitted by everyone who never read it, so the data records a choice nobody made, and for consent it records nothing at all. Start unticked, so every tick is a deliberate act.

## Accessibility

- Renders a real <input type="checkbox"> wrapped by its label, so clicking the text toggles it and the state is announced natively.
- Supports an indeterminate (mixed) visual for a 'select all' parent, set on the DOM node. It is a display state, not a third value.
- When placed inside a Field it reads its id, aria-describedby and aria-invalid from context; standalone it wires its own label and description.
- Errors come from Field composition: wrap the checkbox in a Field.Root and add a Field.Error before the control, which marks it invalid and announces the message.
- Group multiple checkboxes under a Fieldset so the legend names the set in the accessibility tree.

## Error messages

| Situation | Message |
| --- | --- |
| A required agreement is unticked | `Select [whatever the checkbox label states] to continue` |
| Nothing in a required group is selected | `Select [whatever the legend asks for]` |
| Too many options are selected | `Select no more than [N] [things]` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Label rendered next to the checkbox. |
| `description` | `ReactNode` | — | Helper text rendered below the label. |
| `indeterminate` | `boolean` | — | Render the partially-checked (dash) visual state. |
| `wrapperClassName` | `string` | — | Class for the label-row wrapper element (the input keeps className). |
| `...others` | `InputHTMLAttributes` | — | All native <input> props (except type and size) are forwarded. |

## Parts

### CheckboxControl

The bare box without a label, for composing inside a Field where the label lives on Field.Label. It reads its wiring (id, aria-describedby, aria-invalid) from the field context, and takes the same props as Checkbox minus label, description and wrapperClassName.

