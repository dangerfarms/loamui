---
title: Input validation
description: An email field that checks itself as you type, once you have left it: the browser's own validity, written out in plain words in a Field.Error that clears when the address is right.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Input validation

An email field that checks itself as you type, once you have left it: the browser's own validity, written out in plain words in a Field.Error that clears when the address is right.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Input`
- Tags: validation, email, error, live, validity, required
- Live: https://loamui.com/examples/forms/input-validation

## Built to the pillars

- **Native CSS.** The judgment is the platform's ValidityState on a type="email" input with required: valueMissing and typeMismatch are read, never re-implemented with a pattern, so the browser and the message agree. The Field.Error is a rendered element, and the Field marks the box aria-invalid because it is there.
- **Modern CSS.** Nothing but a width in its stylesheet: the danger border, the ring and the forced-colours outline are core's, detected from aria-invalid; the example writes no invalid class.
- **Composition.** Field.Root, Label, Description, Error and Input as core ships them; the example's whole contribution is one function from validity to words and the moment to show them.
- **Accessible & gatekept.** Nothing is said until the field has been left once: an error while the first character is typed is noise. From then on the message follows every edit, as an alert joined to the box by aria-describedby, and clears when the address is right, so the box stops being invalid rather than turning green. The words say what to do (Enter an email address with an @), never invalid or required.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Field, Input } from "@loamui/core";
import "./example.css";

/** The platform's verdict, in the words of the question. */
function problem(validity: ValidityState): string | null {
  if (validity.valueMissing) return "Enter your email address";
  if (validity.typeMismatch) return "Enter an email address with an @, like rowan@example.com";
  return null;
}

export default function Example() {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Field.Root className="input-validation">
      <Field.Label>Email address</Field.Label>
      <Field.Description>Order confirmations and sowing notes go here.</Field.Description>
      <Field.Error>{touched ? error : null}</Field.Error>
      <Input
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        required
        onInput={(event) => setError(problem(event.currentTarget.validity))}
        onBlur={(event) => {
          setTouched(true);
          setError(problem(event.currentTarget.validity));
        }}
      />
    </Field.Root>
  );
}
```

## example.css

```css
/* The error message, the danger border and ring, and the forced-colours
   outline are the Field's, keyed off the rendered Field.Error; only the
   width is set here. */
@scope (.input-validation) to ([class*="loam-"]) {
  :scope {
    max-inline-size: 28rem;
  }
}
```

