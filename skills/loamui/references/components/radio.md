---
title: Radio
description: Choose one option from a set.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Radio

A single choice from a small set of visible, mutually exclusive options.

## Import

```tsx
import { Radio, RadioGroup, RadioControl } from "@loamui/core";
```

## Usage

### Basic group

A RadioGroup shares one name so only one option can be selected.

```tsx
<RadioGroup label="Theme" defaultValue="system">
  <Radio value="system" label="System" />
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
</RadioGroup>
```

### With descriptions

Each option can carry helper text under its label.

```tsx
<RadioGroup label="Delivery">
  <Radio
    value="standard"
    label="Standard"
    description="Arrives in 3-5 business days."
  />
  <Radio
    value="express"
    label="Express"
    description="Guaranteed next-day delivery."
  />
</RadioGroup>
```

### Horizontal

Lay the options out in a row only when there are two, short options. More than that, or longer labels, read better stacked.

```tsx
<RadioGroup label="Contact preference" orientation="horizontal">
  <Radio value="email" label="Email" />
  <Radio value="phone" label="Phone" />
</RadioGroup>
```

### Disabled option

Disable a single Radio to keep an unavailable option visible in the set. The rest of the group stays selectable.

```tsx
<RadioGroup label="Plan">
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="legacy" label="Legacy" disabled />
</RadioGroup>
```

### Group error

The error prop marks the whole group invalid and describes it: the message and danger border sit on the fieldset, not on any one option, so every choice stays selectable.

```tsx
<RadioGroup label="Plan" error="Select a plan to continue">
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="legacy" label="Legacy" />
</RadioGroup>
```

## When to use it

- For choosing exactly one option from a small, visible set (roughly 2 to 5).
- Always inside a RadioGroup, which shares a name and labels the set with a <fieldset>/<legend>.

## When not to

- For many options: a Select is more compact.
- For selecting several options: use Checkbox.
- For a single on/off: use Checkbox or Switch.

## How it works

### A native radio, styled by accent-color

This is a plain <input type="radio">: no custom dot. The elements layer paints it with the platform's own accent-color (the neutral primary); selection, keyboard arrow-cycling and forced-colours support come from the browser. The component adds the label anatomy, group wiring and context adaptation.

### Never pre-select

A group with a defaultValue lets users miss the question entirely and submit an answer they never gave, and once any radio is selected, the group can never be returned to unanswered. So when every option might be wrong, offer an explicit 'None of the above' option rather than leaving the user stuck. Omit defaultValue so the first selection is always a deliberate choice; reserve a default for the rare setting with one safe, overwhelmingly common value.

### Order the options

List options alphabetically by default, so the order carries no editorial weight. Ordering by expected popularity needs extreme caution: it nudges users toward the top answers and, repeated across every form, can entrench the very distribution it assumed. Orders with intrinsic domain meaning (size, severity, date) are fine.

### Controls sit left of labels

Radio renders the control before its label, keeping every control on the reading edge where screen-magnifier users panning a zoomed viewport will find it next to the text they are reading. Don't restyle labels to the other side: a right-hand control drifts out of the magnified view entirely.

## Accessibility

- RadioGroup renders a native <fieldset> with a <legend>, the accessible way to name a group: screen readers announce the legend when a radio is focused.
- Radios share one name so the browser enforces single-selection and arrow-key navigation natively.
- A group error sets aria-describedby and aria-invalid on the fieldset, which carries role="radiogroup", the one place ARIA allows aria-invalid for radios. Required native groups use the same state after a submit attempt and clear it after a selection. The individual radios never claim it; their danger borders are pure CSS answering the group state.

## Error messages

| Situation | Message |
| --- | --- |
| A yes/no question is unanswered | `Select yes if [the thing is true]` |
| A choice is unanswered | `Select [whatever the legend asks for]` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Label rendered next to the control. |
| `description` | `ReactNode` | — | Helper text rendered under the label. |
| `wrapperClassName` | `string` | — | Class for the label-row wrapper element (the input keeps className). |
| `...others` | `InputHTMLAttributes` | — | All native <input type="radio"> props (except type and size) are forwarded. |

## Parts

### RadioGroup

The group fieldset: legend, helper text, shared name and single-selection state for the <Radio> options inside it. Renders role="radiogroup" and carries the group error.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Group legend (wired via aria-labelledby). |
| `description` | `ReactNode` | — | Helper text rendered under the group legend. |
| `error` | `ReactNode` | — | Error message; marks the group invalid. |
| `name` | `string` | — | Shared name for all radios (auto-generated if omitted). |
| `value` | `string` | — | Controlled selected value (pair with onChange). |
| `defaultValue` | `string` | — | Initial selected value for uncontrolled usage. |
| `onChange` | `(value: string) => void` | — | Fires with the newly selected value. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout direction of the options. |
| `optional` | `boolean` | `false` | Appends "(optional)" to the group legend; optional is marked in words. |

### RadioControl

The bare input without a label row, for composing inside a Field where the label lives on Field.Label. Takes the same props as Radio minus label, description and wrapperClassName.

