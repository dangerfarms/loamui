---
title: Sign in with errors
description: The sign-in form after a failed submit: an error summary first, linked to each field, and the same words again under the field itself.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Sign in with errors

The sign-in form after a failed submit: an error summary first, linked to each field, and the same words again under the field itself.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Checkbox`, `ErrorSummary`, `Field`, `Input`, `PasswordInput`
- Tags: validation, error summary, login, account
- Live: https://loamui.com/examples/forms/sign-in-with-errors

## Built to the pillars

- **Native CSS.** Each Field carries an explicit id so the summary's links are fragment links to real controls: activating one moves focus into the field, and the browser scrolls to it without a line of scripting.
- **Modern CSS.** The Field's invalid state is detected, not declared: a rendered Field.Error is what marks the field, and the box's danger border follows the control's own aria-invalid.
- **Composition.** ErrorSummary is the form's first child and Field.Error sits in each field; the same message in both places, so the two read identically out of context.
- **Accessible & gatekept.** Errors are placed twice on purpose: the summary is where a screen reader starts after the submit, and the message under the field is what a sighted reader sees when they get there. Each says what to do in the words of the question, never "invalid" or "required", and nothing typed is cleared. The password is asked for again rather than guessed at, and the summary lists the email problem first because that is the order the form is read in.

## Example.tsx

```tsx
"use client";

import { Button, Card, Checkbox, ErrorSummary, Field, Input, PasswordInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<div className="sign-in-with-errors" />}>
      <h1 id="sign-in-with-errors-title">Sign in</h1>
      <form action="/sign-in" method="post" aria-labelledby="sign-in-with-errors-title">
        {/* The summary appears after a failed submit and takes focus when
            it does; this page renders that state on load, so autoFocus is
            off here and only here. */}
        <ErrorSummary.Root autoFocus={false}>
          <ErrorSummary.Title />
          <ErrorSummary.List>
            <ErrorSummary.Item href="#sign-in-email">
              Enter an email address in the correct format, like name@example.com
            </ErrorSummary.Item>
            <ErrorSummary.Item href="#sign-in-password">Enter your password</ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary.Root>
        <Field.Root id="sign-in-email">
          <Field.Label>Email address</Field.Label>
          <Field.Error>
            Enter an email address in the correct format, like name@example.com
          </Field.Error>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            defaultValue="imogen.hartley@hedgerow"
            required
          />
        </Field.Root>
        <Field.Root id="sign-in-password">
          <Field.Label>Password</Field.Label>
          <Field.Error>Enter your password</Field.Error>
          <PasswordInput name="password" autoComplete="current-password" required />
        </Field.Root>
        <Checkbox name="remember" label="Keep me signed in" defaultChecked />
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
@scope (.sign-in-with-errors) to ([class*="loam-"]) {
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

