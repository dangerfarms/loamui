---
title: Sign in
description: The form at the door of an account: email and password on a card, a way to stay signed in, and the path to creating an account instead.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Sign in

The form at the door of an account: email and password on a card, a way to stay signed in, and the path to creating an account instead.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Checkbox`, `Field`, `Input`, `PasswordInput`
- Tags: login, account, authentication, password
- Live: https://loamui.com/examples/forms/sign-in

## Built to the pillars

- **Native CSS.** A native form named by the heading through aria-labelledby, so a screen reader lands on "Sign in, form", posting with method="post" so the password never rides in a URL; the email field takes autoComplete="email" and the password autoComplete="current-password", the two values a password manager fills without guessing.
- **Modern CSS.** The Card is the container and caps itself at 24rem: the fluid tokens inside answer the card's width, not the viewport's.
- **Composition.** Card is rendered as the example's own root, so the title, form and footer are reachable while the Fields, the Checkbox and the Button keep their own styles behind the donut; the actions row is a primary region, so the one Button is the form's action without a prop.
- **Accessible & gatekept.** The password box has a Show password toggle so a long password is checked by reading rather than retyped; staying signed in is an unticked Checkbox, a choice the visitor makes; the Button says what happens, never Submit.

## Example.tsx

```tsx
"use client";

import { Button, Card, Checkbox, Field, Input, PasswordInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<div className="sign-in" />}>
      <h1 id="sign-in-title">Sign in</h1>
      <form action="/sign-in" method="post" aria-labelledby="sign-in-title">
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" autoComplete="email" inputMode="email" required />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <PasswordInput name="password" autoComplete="current-password" required />
        </Field.Root>
        <Checkbox name="remember" label="Keep me signed in" />
        <div className="actions">
          <Button type="submit">Sign in</Button>
        </div>
      </form>
      <p className="footer">
        New to Hedgerow? <a href="/sign-up">Create an account</a>
      </p>
    </Card>
  );
}
```

## example.css

```css
/* The Card is the root: rendered as the example's own element, so its
   surface, line, radius and padding are core's, and the scope reaches
   the title, the form and the footer inside it. The Fields, the Checkbox
   and the Button are core parts past the donut. The Card is capped at a
   readable width and centred in whatever holds it, and declares the
   container the fluid tokens answer: an explicit inline-size, because a
   grid or flex parent would otherwise size a contained element to
   nothing. */
@scope (.sign-in) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: 24rem;
  }

  h1 {
    font-size: var(--loam-text-xl);
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

