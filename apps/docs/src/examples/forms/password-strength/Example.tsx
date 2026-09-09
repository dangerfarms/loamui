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
