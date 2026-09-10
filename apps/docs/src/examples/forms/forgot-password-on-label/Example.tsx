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
