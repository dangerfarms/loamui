---
title: Sign in with errors
description: A sign-in form that helps people correct missing or mistyped details, with a focused error summary and matching field messages.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Sign in with errors

A sign-in form that helps people correct missing or mistyped details, with a focused error summary and matching field messages.

A recipe in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Checkbox`, `ErrorSummary`, `Field`, `Input`, `PasswordInput`
- Tags: validation, error summary, login, account
- Live: https://loamui.com/recipes/forms/sign-in-with-errors

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Submit the empty form or a mistyped email to try the error flow. Pass an action URL to use your own POST endpoint; the sample defaults to /sign-in. Valid input navigates to that endpoint without storing credentials in React state. Implement authentication and server validation there, including validation when JavaScript is unavailable. Native required and email checks remain active before hydration. Return authentication failures without revealing whether an account exists, and prefix the response page title with Error:. Preserve the email and persistent-session choice after server rejection, but never echo the password into response HTML. Provide the recovery and registration routes and implement the optional persistent session. This recipe does not authenticate anyone or store credentials.

## When to use

Use for email-and-password sign-in when validation needs a summary as well as errors beside each field. Errors appear after submission, so people can finish entering their details before being asked to correct them.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A native POST form retains username and current-password autocomplete. Native validation blocks invalid submissions before and after hydration. React handles invalid events to replace browser popups with the error summary, reading built-in validity states without an email regex or additional password rules.
- **Modern CSS.** Recipe styles sit in loamui.components inside donut scopes. The outer container lets Card and the form resolve fluid tokens locally; element styles supply the heading typography, while grid gap owns form spacing.
- **Composition.** Card supplies the surface without structural overrides. ErrorSummary, Field.Error, Input and PasswordInput retain their own styling and behavior. Each error string is shared between its summary link and field message.
- **Contextualism.** The action region declares --loam-context: primary. Rendering Field.Error makes the field invalid through the primitive's detection; the recipe neither sets aria-invalid manually nor repaints an input border.
- **Accessible & gatekept.** The form stays enabled while people enter details; errors are reported after a validation attempt, without validating each keystroke. A failed submit mounts a focused ErrorSummary; each further failed attempt focuses it again. Its links focus the corresponding controls through core's wiring. useId keeps the targets unique, values remain entered, and the persistent-session checkbox starts unchecked.

## Example.tsx

```tsx
"use client";

import { useId, useState, type FormEvent } from "react";
import { Button, Card, Checkbox, ErrorSummary, Field, Input, PasswordInput } from "@loamui/core";
import "./example.css";

export default function Example({ action = "/sign-in" }: { action?: string }) {
  const id = useId();
  const [validation, setValidation] = useState({ email: "", password: "", attempt: 0 });

  function handleValidation(event: FormEvent<HTMLFormElement>) {
    const fields = event.currentTarget.elements;
    const email = fields.namedItem("email") as HTMLInputElement;
    const password = fields.namedItem("password") as HTMLInputElement;
    const emailError = email.validity.valueMissing
      ? "Enter your email address"
      : email.validity.typeMismatch
        ? "Enter an email address in the correct format, like name@example.com"
        : "";
    const passwordError = password.validity.valueMissing ? "Enter your password" : "";

    if (emailError || passwordError) event.preventDefault();
    setValidation((previous) => ({
      email: emailError,
      password: passwordError,
      attempt: previous.attempt + 1,
    }));
  }

  return (
    <div className="sign-in-with-errors">
      <Card>
        <form
          action={action}
          method="post"
          aria-labelledby={`${id}-title`}
          onInvalid={handleValidation}
          onSubmit={handleValidation}
        >
          <h1 id={`${id}-title`}>Sign in</h1>
          {(validation.email || validation.password) && (
            <ErrorSummary.Root key={validation.attempt}>
              <ErrorSummary.Title />
              <ErrorSummary.List>
                {validation.email && (
                  <ErrorSummary.Item href={`#${id}-email`}>{validation.email}</ErrorSummary.Item>
                )}
                {validation.password && (
                  <ErrorSummary.Item href={`#${id}-password`}>
                    {validation.password}
                  </ErrorSummary.Item>
                )}
              </ErrorSummary.List>
            </ErrorSummary.Root>
          )}
          <Field.Root id={`${id}-email`}>
            <Field.Label>Email address</Field.Label>
            {validation.email && <Field.Error>{validation.email}</Field.Error>}
            <Input
              name="email"
              type="email"
              dir="ltr"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="email"
              required
            />
          </Field.Root>
          <Field.Root id={`${id}-password`}>
            <Field.Label>Password</Field.Label>
            {validation.password && <Field.Error>{validation.password}</Field.Error>}
            <PasswordInput name="password" autoComplete="current-password" required />
          </Field.Root>
          <a href="/forgot-password">Forgot your password?</a>
          <Checkbox name="remember" label="Keep me signed in" />
          <div className="actions">
            <Button type="submit">Sign in</Button>
          </div>
          <p>
            New to Hedgerow? <a href="/sign-up">Create an account</a>
          </p>
        </form>
      </Card>
    </div>
  );
}
```

## example.css

```css
@scope (.sign-in-with-errors) to ([class*="loam-"]) {
  @layer loamui.components {
    :scope {
      container-type: inline-size;
      inline-size: 100%;
      margin-inline: auto;
      max-inline-size: 28rem;
    }
  }
}

@scope (.sign-in-with-errors form) to ([class*="loam-"]) {
  @layer loamui.components {
    :scope {
      display: block grid;
      font-size: var(--loam-text-md);
      gap: var(--loam-space-lg);
      grid-template-columns: minmax(0, 1fr);
      overflow-wrap: anywhere;
    }

    h1,
    p {
      margin-block: 0;
    }

    div.actions {
      --loam-context: primary;

      display: block grid;
    }

    p {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-sm);
      text-align: center;
    }
  }
}
```

