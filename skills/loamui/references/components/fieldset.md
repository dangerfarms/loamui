---
title: Fieldset
description: Group controls under a semantic label.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Fieldset

Groups related controls under a shared, semantic label using a native fieldset and legend.

## Import

```tsx
import { Checkbox, Fieldset, Radio, RadioGroup } from "@loamui/core";
```

## Usage

### Grouping checkboxes

The legend names the group in the accessibility tree, the correct way to label a set of related controls.

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Email notifications</Fieldset.Legend>
  <Checkbox label="Product updates" defaultChecked />
  <Checkbox label="Security alerts" defaultChecked />
  <Checkbox label="Marketing" />
</Fieldset.Root>
```

### Optional group

Mark the whole group optional in words rather than with an asterisk.

```tsx
<Fieldset.Root>
  <Fieldset.Legend optional>Interests</Fieldset.Legend>
  <Checkbox label="Design" />
  <Checkbox label="Engineering" />
</Fieldset.Root>
```

### With a RadioGroup

RadioGroup renders a Fieldset internally, so a legend labels the set of radios.

```tsx
<RadioGroup
  label="Plan"
  name="plan"
  defaultValue="pro"
>
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="team" label="Team" />
</RadioGroup>
```

## When to use it

- To label a set of related controls (a group of checkboxes, or a set of radios) with a single group name.
- Whenever a group of inputs needs one shared question or heading above them.

## When not to

- For a single labelled control: use Field (or a control's own label).
- As a generic layout box: Fieldset carries grouping semantics, not just spacing.

## How it works

### The legend is the question

Write the legend as the question the group answers: “How should we contact you?”, not the category “Contact”. Screen readers announce it alongside each control's own label, so every option is heard in the context of the question. That also keeps each control's label short: the shared part of the wording lives in the legend once, not in every label.

### One question per fieldset

Everything inside the fieldset is announced under the legend's name, so a fieldset holding two unrelated questions mislabels half its controls. Give each question its own fieldset, and avoid nesting them: a legend inside a legend multiplies what is read before every control. Some services go as far as one question per page with the legend as the page heading; the transferable core for a component library is the one-legend-one-question rule, not the page pattern.

## Accessibility

- Renders a native <fieldset> + <legend>: the legend is announced as the group's name when a control inside receives focus.
- This is preferred over a <div role="group"> with aria-labelledby: the native semantics are better supported.
- The browser's default fieldset border, margin and padding are reset so it composes cleanly with LoamUI's layout.

## Parts

### Fieldset.Root

Renders a native <fieldset> grouping the controls; native <fieldset> props are forwarded.

### Fieldset.Legend

The accessible group label; native <legend> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `optional` | `boolean` | `false` | Appends "(optional)". Optional is marked in words, not with an asterisk. |

