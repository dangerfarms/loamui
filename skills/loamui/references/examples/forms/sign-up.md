---
title: Sign up
description: Creating an account: one name field, an email, a password with its rules stated first, and consent as a choice, on the same card as signing in.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Sign up

Creating an account: one name field, an email, a password with its rules stated first, and consent as a choice, on the same card as signing in.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Checkbox`, `Field`, `Input`, `PasswordInput`
- Tags: register, registration, account, create account, consent
- Live: https://loamui.com/examples/forms/sign-up

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** One name field with autoComplete="name", because a single box holds every name in the world in the order its owner writes it; the password takes autoComplete="new-password", the value that tells a password manager to make one up and save it, and minLength carries the rule the description states.
- **Modern CSS.** The same 24rem Card as Sign in; the one thing added is the consent line, a Checkbox whose label holds two links and wraps inside the card's width with no rule of its own.
- **Composition.** The same root, form and footer as Sign In with different fields inside: the shape is the example's, the questions are the page's.
- **Contextualism.** The actions row declares --loam-context: primary because the one Button is the form's action; primary is the brand slot, neutral until a theme fills it, so the declaration says where the action belongs, not that it stands out.
- **Accessible & gatekept.** The password rules sit before the box as a Field.Description, read and announced before anyone types, so nobody meets a rule for the first time in an error; there is no confirm-password field, because seeing the value catches more mistakes than retyping it; consent is an unticked Checkbox with the terms linked inside its label.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Button, Card, Checkbox, Field, Input, PasswordInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <Card render={<div className="sign-up" />}>
      <h1 id={`${instanceId}-sign-up-title`}>Create an account</h1>
      <form action="/sign-up" method="post" aria-labelledby={`${instanceId}-sign-up-title`}>
        <Field.Root>
          <Field.Label>Full name</Field.Label>
          <Input name="name" autoComplete="name" required />
        </Field.Root>
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Field.Description>Order updates and your membership card come here.</Field.Description>
          <Input name="email" type="email" autoComplete="email" inputMode="email" required />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Field.Description>
            At least 12 characters. A few unrelated words are easier to remember than one word with
            numbers in it.
          </Field.Description>
          <PasswordInput name="password" autoComplete="new-password" minLength={12} required />
        </Field.Root>
        <Checkbox
          name="consent"
          label={
            <>
              I agree to the <a href="/terms">membership terms</a> and the{" "}
              <a href="/privacy">privacy policy</a>
            </>
          }
          required
        />
        <div className="actions">
          <Button type="submit">Create account</Button>
        </div>
      </form>
      <p className="footer">
        Already a member? <a href="/sign-in">Sign in</a>
      </p>
    </Card>
  );
}
```

## example.css

```css
@scope (.sign-up) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;

    /* An explicit inline-size: a grid or flex parent would otherwise size a
       contained element to nothing. */
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: 24rem;
  }

  h1 {
    font-size: var(--loam-text-xl);
    margin-block: 0 var(--loam-space-lg);
  }

  form {
    display: block grid;
    gap: var(--loam-space-lg);
  }

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

