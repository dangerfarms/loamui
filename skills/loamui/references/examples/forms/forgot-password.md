---
title: Forgot password
description: Asking for a reset link: one email field, a line saying what will happen, one action, and the way back to signing in.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Forgot password

Asking for a reset link: one email field, a line saying what will happen, one action, and the way back to signing in.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Field`, `Input`
- Tags: reset password, recovery, account, email
- Live: https://loamui.com/examples/forms/forgot-password

## Built to the pillars

- **Native CSS.** A native form named by its heading, with one email field carrying autoComplete="email" and inputMode="email" so a phone offers the keyboard with @ on it.
- **Modern CSS.** One field, so the card is mostly type: the description between the title and the form takes over the title's gap, and the 24rem cap keeps that paragraph to two lines.
- **Composition.** The account-form shape again with the fields cut to one: the description slots between the title and the form and takes over the title's gap.
- **Accessible & gatekept.** The line before the field says what happens next, and says "if it has an account": the same words after submitting whether or not the address is known, because "no account with that address" tells a stranger which addresses are customers one guess at a time. The footer keeps a way back for the visitor who typed the wrong address.

## Example.tsx

```tsx
"use client";

import { Button, Card, Field, Input } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<div className="forgot-password" />}>
      <h1 id="forgot-password-title">Forgot your password?</h1>
      <p className="description">
        Enter the email address you signed up with. If it has an account, we will send a link to set
        a new password.
      </p>
      <form action="/forgot-password" method="post" aria-labelledby="forgot-password-title">
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" autoComplete="email" inputMode="email" required />
        </Field.Root>
        <div className="actions">
          <Button type="submit">Send reset link</Button>
        </div>
      </form>
      <p className="footer">
        <a href="/sign-in">Back to sign in</a>
      </p>
    </Card>
  );
}
```

## example.css

```css
/* The Card is the root: rendered as the example's own element, so its
   surface, line, radius and padding are core's, and the scope reaches
   the title, the form and the footer inside it. The Field and the Button
   are core parts past the donut. The Card is capped at a
   readable width and centred in whatever holds it, and declares the
   container the fluid tokens answer: an explicit inline-size, because a
   grid or flex parent would otherwise size a contained element to
   nothing. */
@scope (.forgot-password) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: 24rem;
  }

  /* The title's end margin is the gap to the form; the description
     between them takes that gap over. */
  h1 {
    font-size: var(--loam-text-xl);
    margin-block: 0 var(--loam-space-sm);
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin-block: 0 var(--loam-space-lg);
  }

  /* One column, filled top to bottom: side-by-side fields make the eye
     and the tab order disagree. */
  form {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  /* A single-cell grid, so the Button stretches to the form's width, and
     a primary region, so the one action takes the brand colour from
     where it sits rather than from a prop. */
  div.actions {
    --loam-context: primary;

    display: block grid;
  }

  p.footer {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin-block: var(--loam-space-lg) 0;
    text-align: center;
  }
}
```

