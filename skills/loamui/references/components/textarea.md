---
title: Textarea
description: Multi-line text input.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Textarea

The multi-line text box. Compose it inside a Field for its label, description and error.

## Import

```tsx
import { Field, Textarea } from "@loamui/core";
```

## Usage

### Basic usage

Wrap the control in Field.Root and add a Field.Label: the textarea reads its id from the field, so the label is wired without any props.

```tsx
<Field.Root>
  <Field.Label>Notes</Field.Label>
  <Textarea />
</Field.Root>
```

### With description

```tsx
<Field.Root>
  <Field.Label>Bio</Field.Label>
  <Field.Description>
    A short description for your public profile.
  </Field.Description>
  <Textarea required />
</Field.Root>
```

### Error state

A Field.Error after the control marks the field invalid and is announced: the message's presence is the state.

```tsx
<Field.Root>
  <Field.Label>Message</Field.Label>
  <Field.Error>Message must be 20 characters or more</Field.Error>
  <Textarea defaultValue="Too short" />
</Field.Root>
```

## When to use it

- For multi-line, free-form text: messages, comments, addresses, notes.
- When the expected input is longer than a single line or the user may want to add line breaks.

## When not to

- For single-line values (names, emails): use Input.
- For a fixed set of options: use Select, Radio or Checkbox.

## How it works

### Auto-grow is built in

Where the platform supports field-sizing: content, the field grows with the answer up to ten lines and then scrolls (no JS, no measuring). A minimum height keeps the empty field recognisably multi-line, and the rows prop remains the semantic fallback height where auto-grow is unsupported. Set it to match the expected answer: three rows asks for a note, ten invites an essay.

### Keep resize on

The field is user-resizable in the block direction (resize: block), so anyone can make room for a long answer without horizontal drag ever breaking the layout. Don't remove it with CSS: taking resize away removes user control and gains nothing. Disabled fields drop the handle automatically.

### Limits live in the description

State a length limit up front in the Field.Description (“Your answer must be 200 characters or fewer”) rather than springing it as an error after the user has written too much. LoamUI does not ship a live character counter, so keep the validation message in exactly the words the description used: the rule then reads the same before and after the mistake.

### Never disable copy and paste

People draft long answers elsewhere and paste them in; blocking paste, or clearing the field on validation, punishes exactly the users taking the most care. The field keeps whatever arrives, and errors describe the rule the text broke.

## Accessibility

- Inside a Field.Root it self-wires, so the label, description and error share one accessible wiring (label tied by id, aria-describedby, aria-invalid). See the Field page.
- Field.Error uses role="alert" so the message is announced when it appears.
- Resizes vertically only, so horizontal resize can't break the layout; give enough default rows to hint at the expected length.

## Error messages

| Situation | Message |
| --- | --- |
| The text contains a disallowed character | `[Label] must not include [characters]` |
| The field is empty | `Enter [whatever the label asks for]` |
| The answer is too long | `[Label] must be [N] characters or fewer` |
| The answer is too short | `[Label] must be [N] characters or more` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rows` | `number` | `3` | Number of visible text rows. |
| `wrapperClassName` | `string` | — | Class for the bordered field wrapper; className goes to the control itself. |
| `...others` | `TextareaHTMLAttributes` | — | All native <textarea> props are forwarded, except size (sizing is contextual). |

