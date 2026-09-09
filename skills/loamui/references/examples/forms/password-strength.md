---
title: Password strength
description: A field for making up a password: the box with its Show password toggle, a strength meter with a word beside it, and the rules in plain words, ticked as the typing meets them.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Password strength

A field for making up a password: the box with its Show password toggle, a strength meter with a word beside it, and the rules in plain words, ticked as the typing meets them.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Meter`, `PasswordInput`
- Tags: password, meter, new password, registration, rules
- Live: https://loamui.com/examples/forms/password-strength

## Built to the pillars

- **Native CSS.** The strength is a native <meter> with low, high and optimum set, so the browser picks the band and core paints it; the rules are a plain list with no roles, and the input carries autoComplete="new-password" so a password manager offers to make one up.
- **Modern CSS.** A rule's state is a data-met attribute the mark and the colour answer; the tick is drawn in currentColor, so in forced colours it follows the text colour instead of vanishing with a painted background.
- **Composition.** Core Field wires the label and description; the example gives the Field an id so the rules list can join the input's aria-describedby by name, beside the description the Field already put there.
- **Accessible & gatekept.** The rules are joined to the input with aria-describedby, so a screen reader hears them on landing in the box, and each carries hidden words (met, not met) so the state is never colour alone. The word beside the meter is its aria-valuetext and a polite live region: Weak, Fair or Strong once the typing pauses, and nothing while nothing is typed, because an empty box is not a weak password. Nothing here blocks a submit; the server decides and a Field.Error says which rule was broken.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Field, Meter, PasswordInput } from "@loamui/core";
import "./example.css";

const RULES = [
  { id: "length", text: "At least 12 characters", test: (v: string) => v.length >= 12 },
  {
    id: "words",
    text: "More than one word, or 20 characters",
    test: (v: string) => /\s/.test(v.trim()) || v.length >= 20,
  },
  { id: "email", text: "Not your email address", test: (v: string) => !v.includes("@") },
];

// Length is the one thing every guideline agrees on, so the reading counts
// characters and nothing else; a real estimator that knows dictionaries
// and patterns drops in here.
function score(value: string): number {
  if (value.length === 0) return 0;
  if (value.length < 8) return 1;
  if (value.length < 12) return 2;
  if (value.length < 16) return 3;
  return 4;
}

// The band edges sit between whole scores, so a score never lands on an
// edge, where browsers disagree about which side it falls.
const WORDS = ["", "Weak", "Weak", "Fair", "Strong"];

export default function Example() {
  const [value, setValue] = useState("");
  const strength = score(value);
  const word = WORDS[strength] ?? "";

  return (
    <Field.Root className="password-strength" id="new-password">
      <Field.Label>Password</Field.Label>
      <Field.Description>
        Twelve characters or more. Three or four unrelated words are stronger than one word with a
        number on the end, and easier to remember.
      </Field.Description>
      <PasswordInput
        name="password"
        autoComplete="new-password"
        aria-describedby="new-password-description new-password-rules"
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <div className="strength">
        <Meter
          value={strength}
          min={0}
          max={4}
          low={2.5}
          high={3.5}
          optimum={4}
          label="Password strength"
          aria-valuetext={word || "Nothing typed yet"}
        />
        <span aria-live="polite">{word}</span>
      </div>
      <ul className="rules" id="new-password-rules">
        {RULES.map((rule) => {
          const met = rule.test(value);
          return (
            <li key={rule.id} data-met={met || undefined}>
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
                  <circle
                    cx="8"
                    cy="8"
                    r="5.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
              {rule.text}
              <span className="loam-VisuallyHidden">, {met ? "met" : "not met"}</span>
            </li>
          );
        })}
      </ul>
    </Field.Root>
  );
}
```

## example.css

```css
/* The root is the core Field, which keeps its own stack: label,
   description, the PasswordInput (the box and its toggle), then the
   example's own strength row and rules list. The label, description and
   input are core parts past the donut, as is the Meter in its slot; the
   rules here reach only the row and the list. */
@scope (.password-strength) to ([class*="loam-"]) {
  /* The Meter's slot takes the width and the word sits beside it; the
     Meter itself is never restyled. */
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

  /* The state is data-met, set by the component; the hidden words after
     the sentence say the same to a screen reader, so it is never colour
     alone. */
  li {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-xs);
    margin: 0;

    &[data-met] {
      color: var(--loam-color-fg);
    }

    /* The mark is drawn in currentColor: the ring in the text's colour,
       the tick in success. In forced colours both follow the forced text
       colour, so the tick stays visible where a painted background would
       not. */
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

