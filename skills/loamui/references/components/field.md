---
title: Field
description: Composable form-field primitive.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Field

A composable form-field primitive that wires label, description, error and accessibility for any control.

## Import

```tsx
import { Field } from "@loamui/core";
```

## Usage

### Composing a field

Assemble the parts in order (label, description, error, control): the message sits above the control so it is read before the answer is given. Field.Root links the label to the control and gathers the description and error into aria-describedby; the LoamUI controls (Input, Select, Textarea, Range) self-wire from the surrounding field, so no extra part is needed around them.

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Description>We'll only use this to reply.</Field.Description>
  <Input />
</Field.Root>
```

### Error state

A Field.Error with content flips the field to invalid and is announced via role="alert".

```tsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Error>
    Enter an email address in the correct format, like name@example.com
  </Field.Error>
  <Input defaultValue="not-an-email" />
</Field.Root>
```

### Optional field

Mark optional fields in words rather than flagging required ones with an asterisk: most fields are required, so the exceptions are the useful signal.

```tsx
<Field.Root>
  <Field.Label optional>Company</Field.Label>
  <Input />
</Field.Root>
```

### A whole form

Fields compose into a form with nothing extra: each control self-wires, each Field.Error appears where its field is, and submit is an ordinary button. For the summary that belongs at the top of a longer form, see ErrorSummary.

```tsx
<form onSubmit={onSubmit} noValidate>
  <Field.Root>
    <Field.Label>Full name</Field.Label>
    <Field.Error>{errors.name}</Field.Error>
    <Input name="name" autoComplete="name" />
  </Field.Root>
  <Field.Root>
    <Field.Label>Email address</Field.Label>
    <Field.Description>We'll only use this to reply.</Field.Description>
    <Field.Error>{errors.email}</Field.Error>
    <Input name="email" type="email" autoComplete="email" />
  </Field.Root>
  <Button type="submit">Save and continue</Button>
</form>
```

### Custom controls via Field.Control

Field.Control wires the field's id, aria-describedby and aria-invalid onto any element: an element to clone, or a function receiving the typed props. The built-in controls never need it; reach for it when bringing your own.

```tsx
<Field.Root>
  <Field.Label>Amount</Field.Label>
  <Field.Description>A bare native input, not a LoamUI control.</Field.Description>
  <Field.Control
    render={(props) => <input {...props} inputMode="decimal" />}
  />
</Field.Root>
```

## When to use it

- For every labelled form control: wrap Input, Select, Textarea or Range in Field.Root and add Field.Label, Field.Description and Field.Error as needed. The control wires itself to the field.
- To give a custom or third-party control the same accessible label/description/error wiring, via Field.Control.

## When not to

- For inline choices: Checkbox and Switch render their own label and description beside the control; wrap them in a Field only when they need an error message.
- As a layout grid: Field only arranges a single control and its supporting text.

## How it works

### Writing error messages

An error message says what happened and how to fix it, in the words of the question itself: if the label asks “How many hours do you work a week?”, the error is “Enter how many hours you work a week”, never “This field is required”. Use an instruction (“Enter your first name”) when the field is empty and a description (“Name must be 35 characters or fewer”) when the value breaks a rule. Write in plain, positive language: no “please” (it implies a choice), no “sorry” (it doesn't help), no “valid/invalid” (vague), no jargon or error codes, no humour. Keep the user's input on screen while showing the error: never clear the field.

### Writing labels and hints

Labels are sentence case with no trailing colon, and name the thing the field asks for. A Field.Description is a single short sentence; never put links in it, because text reached through aria-describedby is announced, not focusable, so a link there is unreachable for the people it is read to.

### When validation runs

Two paths, one timing rule. Native constraints (required, type, minlength) open the error state only after a submit attempt. Once open, the error remains while the value is invalid and clears as soon as the correction is valid. The render path is explicit: a field is invalid exactly while a Field.Error with content is rendered, so server or async validation is just rendering that message after submission. Neither path validates on blur or complains mid-word.

### Styling state from outside

Everything the family knows about a field is expressed in selectors you can target: [aria-invalid="true"] on the control, :has(> p.error) on the .loam-Field root, [data-disabled] on control boxes, and :focus-within on the field box. There are no visual state props to mirror; the DOM is the contract.

### One error, one place, one wording

The message renders once, inside the field, tied to the control by aria-describedby and announced by role="alert". The wiring is automatic when Field.Error has content. Keep the wording identical anywhere else it appears so it reads the same out of context.

## Accessibility

- Field.Root generates one id and hands it to Field.Label (via htmlFor) and to the control, so label and control are always associated.
- Description and error ids are added to the control's aria-describedby only when those parts are present.
- Any Field.Error with content sets aria-invalid on the control and is announced with role="alert"; a visually hidden "Error: " prefix makes the announcement unmistakable out of context.
- The LoamUI controls read this wiring from context; Field.Control hands it to arbitrary elements, letting you keep semantic, native controls instead of re-implementing them.

## Error messages

| Situation | Message |
| --- | --- |
| The field is empty | `Enter [whatever the label asks for]` |
| The value is the wrong format | `[Label] must be [format], like [example]` |
| The value is too long / too short | `[Label] must be [N] characters or fewer / or more` |
| The value is out of range | `[Label] must be between [min] and [max]` |

## Parts

### Field.Root

Wraps a field and provides context. The invalid state is detected: it is true exactly when a Field.Error with content is rendered. Native <div> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Base id for the control; auto-generated when omitted. |

### Field.Label

Label tied to the control; native <label> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `optional` | `boolean` | `false` | Appends "(optional)"; optional is marked in words, not with an asterisk. |

### Field.Description

Helper text, linked via aria-describedby; native <p> props are forwarded.

### Field.Control

Wires id, aria-describedby and aria-invalid onto an arbitrary element. The LoamUI controls self-wire from the field and don't need it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `element \| (props) => node` | — | The element to wire: an element to clone, or a function receiving the props. |

### Field.Error

Error message with role="alert"; sets the invalid state when it has content. Native <p> props are forwarded.

