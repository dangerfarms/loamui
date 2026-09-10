---
title: Forgot password on the label
description: A password field whose label row carries a link to reset the password at its end: beside the label, not inside it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Forgot password on the label

A password field whose label row carries a link to reset the password at its end: beside the label, not inside it.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `PasswordInput`
- Tags: password, forgot password, label, link, sign in
- Live: https://loamui.com/examples/forms/forgot-password-on-label

## Built to the pillars

- **Native CSS.** A link, because resetting a password goes somewhere; the box is core's PasswordInput with autoComplete="current-password", so a password manager fills it and the Show password toggle keeps its own name.
- **Modern CSS.** The row is a wrapping flex line with space between: on a narrow field the link drops to a second line and keeps to the end edge by an auto margin, with no breakpoint.
- **Composition.** Field.Label and PasswordInput as core ships them; the example adds one row element around the label so the link can share its line without being a child of it.
- **Accessible & gatekept.** The link sits beside the label, not in it: a link inside a <label> is inside the box's click target and its words join the field's name, so a screen reader would hear the field as Password Forgot your password. Here the field is named Password and the link is a link.

## Example.tsx

```tsx
"use client";

import { Field, PasswordInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Field.Root className="forgot-password-on-label">
      <div className="label-row">
        <Field.Label>Password</Field.Label>
        <a href="/forgot-password">Forgot your password?</a>
      </div>
      <PasswordInput name="password" autoComplete="current-password" required />
    </Field.Root>
  );
}
```

## example.css

```css
@scope (.forgot-password-on-label) to ([class*="loam-"]) {
  :scope {
    max-inline-size: 28rem;
  }

  div.label-row {
    align-items: baseline;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs) var(--loam-space-md);
    justify-content: space-between;

    a {
      font-size: var(--loam-text-sm);
      margin-inline-start: auto;
    }
  }
}
```

