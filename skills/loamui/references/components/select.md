---
title: Select
description: Choose one option from a list.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Select

A styled wrapper around a native select, accessible and zero-JS. Compose it inside a Field for its label, description and error.

## Import

```tsx
import { Field, Select } from "@loamui/core";
```

## Usage

### Basic usage

Wrap the control in Field.Root and add a Field.Label: the select reads its id from the field, so the label is wired without any props.

```tsx
<Field.Root>
  <Field.Label>Country</Field.Label>
  <Select>
    <option>Canada</option>
    <option>United Kingdom</option>
    <option>United States</option>
  </Select>
</Field.Root>
```

### With placeholder

Pass a placeholder to render an empty prompt option first.

```tsx
<Field.Root>
  <Field.Label>Country</Field.Label>
  <Select placeholder="Pick a country">
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="us">United States</option>
  </Select>
</Field.Root>
```

### Groups and disabled options

Options pass straight to the native select, so optgroup and disabled work exactly as the platform defines them.

```tsx
<Field.Root>
  <Field.Label>Instrument</Field.Label>
  <Select>
    <optgroup label="Strings">
      <option>Violin</option>
      <option>Cello</option>
    </optgroup>
    <optgroup label="Brass">
      <option>Trumpet</option>
      <option disabled>Tuba (unavailable)</option>
    </optgroup>
  </Select>
</Field.Root>
```

### With a description

Field.Description links to the select via aria-describedby, the same wiring every control gets inside a Field.

```tsx
<Field.Root>
  <Field.Label>Country</Field.Label>
  <Field.Description>Where you are resident for tax.</Field.Description>
  <Select>
    <option>United States</option>
    <option>Canada</option>
  </Select>
</Field.Root>
```

### Error state

A Field.Error after the control marks the field invalid and is announced: the message's presence is the state.

```tsx
<Field.Root>
  <Field.Label>Country</Field.Label>
  <Field.Error>Select a country</Field.Error>
  <Select placeholder="Pick a country">
    <option>Canada</option>
    <option>United Kingdom</option>
    <option>United States</option>
  </Select>
</Field.Root>
```

## When to use it

- For choosing one option from a longer list (roughly 5+) where showing them all would take too much space.
- When the options are familiar and the user doesn't need to compare them side by side.

## When not to

- For a small set of options the user should see at once: use Radio, which shows every choice up front.
- For yes/no or on/off: use Checkbox or Switch.
- For free-form input: use Input.

## How it works

### Start without a value

Pass placeholder to render a disabled, empty first option, so the field starts unanswered and required validation catches an untouched select. Without it the first real option is pre-selected, and users who skip the field silently submit an answer they never chose.

### Order the options

List options alphabetically so users can predict where an answer sits in a long menu, the reason to use a Select at all. Depart only for an order that is genuinely more useful in the domain, like months in calendar order or years newest-first.

### A select conceals its options

Until opened, the menu shows one value and hides every alternative, so users can't survey or compare the choices. The cost shows up in usability testing: people try to type into the closed control, mistake the focused option for a selected one, and struggle to operate the menu zoomed in. That is the cost that makes RadioGroup the better control for small sets. Reserve Select for long lists of familiar answers users recognise rather than weigh up.

## Accessibility

- Wraps a native <select>, so keyboard interaction, typeahead and the mobile picker come from the platform.
- Inside a Field.Root it self-wires: the label, description and error are linked via id / aria-describedby / aria-invalid, with the error announced as role="alert". See the Field page.
- A placeholder renders as a disabled first option so it is never a selectable value.

## Error messages

| Situation | Message |
| --- | --- |
| Nothing is selected | `Select [whatever the label asks for]` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | — | Non-selectable prompt shown as the first, empty option. |
| `children` | `ReactNode` | — | Native <option> / <optgroup> elements, passed straight through. |
| `wrapperClassName` | `string` | — | Class for the bordered field wrapper; className goes to the control itself. |
| `...others` | `SelectHTMLAttributes` | — | All native <select> props are forwarded, except size (sizing is contextual). |

