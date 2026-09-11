---
title: Password length feedback
description: A password field with a native length meter and explicit requirement feedback. It shows what has been checked without claiming to measure password strength.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Password length feedback

A password field with a native length meter and explicit requirement feedback. It shows what has been checked without claiming to measure password strength.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Meter`, `PasswordInput`
- Tags: password, meter, new password, registration, rules, length
- Live: https://loamui.com/examples/forms/password-strength

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

This is length feedback, not a password-strength estimator. The twelve-character minimum is an example requirement. Apply your application’s actual password policy and server-side validation; do not accept a password solely because this meter is full.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A native meter counts progress toward the stated length requirement; autoComplete=new-password enables password-manager suggestions.
- **Modern CSS.** The requirement uses a data-met attribute, text and a currentColor icon, so its state does not depend on colour alone.
- **Composition.** Field connects the input and its description; an instance-specific ID includes the requirement list in that description.
- **Accessible & gatekept.** The meter has a text equivalent, and the requirement states met or not met in words. Live feedback reports character count and the length requirement only, never Weak or Strong.

## Example.tsx

```tsx
"use client";

import { useId, useState } from "react";
import { Field, Meter, PasswordInput } from "@loamui/core";
import "./example.css";

// This is length feedback, not an estimate of resistance to guessing.
const MIN_LENGTH = 12;

export default function Example() {
  const instanceId = useId();
  const [value, setValue] = useState("");
  const length = Array.from(value).length;
  const met = length >= MIN_LENGTH;
  const feedback =
    value === ""
      ? "Nothing typed yet"
      : `${length} characters. ${met ? "Length requirement met" : `${MIN_LENGTH - length} more needed`}.`;

  return (
    <Field.Root className="password-strength" id={`${instanceId}-new-password`}>
      <Field.Label>Password</Field.Label>
      <Field.Description>
        This example requires at least {MIN_LENGTH} characters and checks length only. Use a unique
        password; meeting this requirement does not establish its strength.
      </Field.Description>
      <PasswordInput
        name="password"
        autoComplete="new-password"
        aria-describedby={`${instanceId}-new-password-description ${instanceId}-new-password-rules`}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <div className="strength">
        <Meter
          value={Math.min(length, MIN_LENGTH)}
          min={0}
          max={MIN_LENGTH}
          low={MIN_LENGTH - 0.5}
          high={MIN_LENGTH - 0.5}
          optimum={MIN_LENGTH}
          label="Password length"
          aria-valuetext={feedback}
        />
        <span aria-live="polite">
          <span aria-hidden="true">{value ? `${length} characters` : ""}</span>
          <span className="loam-VisuallyHidden">{value ? feedback : ""}</span>
        </span>
      </div>
      <ul className="rules" id={`${instanceId}-new-password-rules`} role="list">
        <li data-met={met || undefined}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {met ? (
              <path
                d="M3 8.5 6.5 12 13 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
          At least {MIN_LENGTH} characters
          <span className="loam-VisuallyHidden">, {met ? "met" : "not met"}</span>
        </li>
      </ul>
    </Field.Root>
  );
}
```

## example.css

```css
@scope (.password-strength) to ([class*="loam-"]) {
  :scope {
    max-inline-size: 28rem;
  }

  div.strength {
    align-items: center;
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr) auto;
    margin-block-start: var(--loam-space-xs);
  }

  ul.rules {
    color: var(--loam-color-fg-muted);
    display: block grid;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-xs);
    margin: 0;

    &[data-met] {
      color: var(--loam-color-fg);
    }

    svg {
      block-size: 1em;
      flex: none;
      inline-size: 1em;
    }

    &[data-met] svg {
      color: var(--loam-color-success-strong);
    }
  }
}
```

