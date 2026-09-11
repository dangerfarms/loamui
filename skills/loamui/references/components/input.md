---
title: Input
description: A labelled text field.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Input

The single-line text box. Compose it inside a Field for its label, description and error.

## Import

```tsx
import { Field, Input } from "@loamui/core";
```

## Usage

### Basic usage

Inside Field.Root the input reads its id from the field, so Field.Label is wired without any props.

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input />
</Field.Root>
```

### Size from context

There is no visual size prop. Body-text and spacing tokens give the control a readable, generous default and adapt it to its container. The native input owns its padding, so taps inside that padding focus the field. Single-line inputs align with single-line Buttons through shared typography and spacing; neither has a fixed height. The native HTML size attribute still sets an answer width in characters.

```tsx
<div style={{ containerType: "inline-size", inlineSize: "16rem" }}>
  <Field.Root>
    <Field.Label>In a narrow container</Field.Label>
    <Input />
  </Field.Root>
</div>

<div style={{ containerType: "inline-size", inlineSize: "30rem" }}>
  <Field.Root>
    <Field.Label>In a wide one</Field.Label>
    <Input />
  </Field.Root>
</div>
```

### Description and required

Field.Description is linked to the input through aria-describedby, so the hint is announced with the field. required lives on the control as the native attribute: it is never shown as an asterisk, and it drives validation after a submit attempt.

```tsx
<Field.Root>
  <Field.Label>Username</Field.Label>
  <Field.Description>This will be your public handle.</Field.Description>
  <Input required />
</Field.Root>
```

### Error state

A Field.Error before the control marks the field invalid and is announced: no error prop, the message's presence is the state.

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Error>
    Enter an email address in the correct format, like name@example.com
  </Field.Error>
  <Input defaultValue="not-an-email" />
</Field.Root>
```

### Native validation

Native constraints such as required and type="email" are announced and styled after a submit attempt, not on blur. Existing errors clear as soon as the value becomes valid.

```tsx
<form>
  <Field.Root>
    <Field.Label>Work email</Field.Label>
    <Input type="email" required />
  </Field.Root>
  <Button type="submit">Check email</Button>
</form>
```

### Disabled

The disabled attribute forwards to the native input: the field is dimmed, skipped by the tab sequence, and shows the not-allowed cursor.

```tsx
<Field.Root>
  <Field.Label>Account ID</Field.Label>
  <Input defaultValue="acct_8f2c" disabled />
</Field.Root>
```

### With sections

Sections sit inside the field but outside the accessible name, so the Field.Label still does the naming. A placeholder alone never can.

```tsx
<Field.Root>
  <Field.Label>Handle</Field.Label>
  <Input startSection="@" />
</Field.Root>

<Field.Root>
  <Field.Label>Site name</Field.Label>
  <Input endSection=".dev" />
</Field.Root>
```

## When to use it

- For short, free-form single-line text: names, emails, search terms, URLs.
- Inside a Field.Root, which ties the label, helper description and inline error together: the control self-wires from the surrounding field, so the accessibility is correct by construction. See the Field page.

## When not to

- For multi-line text: use Textarea.
- For choosing from a fixed set of options: use Select, Radio or Checkbox.

## How it works

### Asking for numbers

Never use type="number": scroll wheels and arrow keys silently change the value, and browsers give poor feedback when the input is invalid. Pass inputMode="numeric" for whole numbers or inputMode="decimal" for amounts (both forward straight to the native input) so touch devices raise a number pad while the field keeps normal text behaviour. A small count a person nudges by one (items in a cart, guests, seats) is QuantityInput, the library's one use of a number input: its buttons make the stepping deliberate.

```tsx
<Field.Root>
  <Field.Label>Account number</Field.Label>
  <Input inputMode="numeric" />
</Field.Root>

<Field.Root>
  <Field.Label>Weight in kilograms</Field.Label>
  <Input inputMode="decimal" />
</Field.Root>
```

### Codes and references

Values users copy rather than compose (booking references, invoice numbers, licence keys) are not words, so set spellCheck={false} to stop browsers underlining a correct value as a mistake. A digits-only reference also takes inputMode="numeric".

### Autofill and input purpose

Any field asking for something about the user gets the matching autoComplete value: "name", "email", "postal-code", "bday-day" and the rest of the HTML autofill set, forwarded straight through. This is WCAG 1.3.5 (Identify Input Purpose): it lets browsers fill the answer correctly and lets assistive tech present the field in the user’s own terms.

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input type="email" autoComplete="email" />
</Field.Root>
```

### Placeholders are not labels

A placeholder vanishes the moment the user types, is skipped by some assistive technology, and its dimmed colour fails contrast as instruction text. Field.Label is for what the field is; format hints go in Field.Description, which stays visible and is announced. These docs use none at all: the example lives in Field.Description, where it survives typing.

### Width belongs to the container, or to the answer

The field fills whatever it is placed in; there is no width prop. Width is information: a four-character reference in a page-wide box reads as a harder question than it is. For an answer of a known length, the native size attribute is the platform's own measure: the input is as wide as that many characters and the box shrink-wraps it. DateInput is built on it. For anything else, put the field in a container sized to the expected answer.

```tsx
<Field.Root>
  <Field.Label>Sort code</Field.Label>
  <Input inputMode="numeric" size={6} />
</Field.Root>
```

## Accessibility

- Inside a Field.Root the input reads its id from the field, so Field.Label is a real <label> tied to it: clicking the label focuses the field and screen readers announce it.
- Field.Description and Field.Error are linked via aria-describedby, and a rendered error also sets aria-invalid, announced together when the field gains focus.
- Field.Error uses role="alert" so the message is announced as it appears.
- startSection / endSection render your content beside the input but outside its accessible name. Mark visual content like currency symbols or icons aria-hidden, and carry the unit in the label or description so non-visual users get it too.
- Under forced colours the danger border colour is dropped, so an invalid field carries its state as an outline in a system colour, with the focus ring offset further out.
- Mark optional fields in words (Field.Label's optional prop) rather than asterisking required ones: required lives on the control as the native required attribute, which drives validation after submission.

## Error messages

| Situation | Message |
| --- | --- |
| The field is empty | `Enter [whatever the label asks for]` |
| The value is the wrong format | `Enter [a/an] [thing] in the correct format, like [example]` |
| The value is too long / too short | `[Label] must be [N] characters or fewer / or more` |
| The value contains a disallowed character | `[Label] must only include [allowed characters]` |
| A number is out of range | `[Label] must be between [min] and [max]` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `startSection` | `ReactNode` | — | Content inside the box, before the input. |
| `endSection` | `ReactNode` | — | Content inside the box, after the input. |
| `size` | `number` | — | The native size attribute, honoured: the input is as wide as that many characters and the box shrink-wraps it. |
| `wrapperProps` | `PartProps<"div">` | — | Props for the bordered box around the input. className, style, ref and every other prop land on the <input> itself; this is the one way to reach the box. |
| `...others` | `InputHTMLAttributes` | — | All native <input> props, and ref, are forwarded to the <input>. |

