"use client";

import { Field, PasswordInput } from "@loamui/core";

export function PasswordInputSignInDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <PasswordInput name="password" autoComplete="current-password" />
      </Field.Root>
    </div>
  );
}

export function PasswordInputNewDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Choose a password</Field.Label>
        <Field.Description>
          At least 12 characters. A few unrelated words are easier to remember than one word with
          numbers in it.
        </Field.Description>
        <PasswordInput name="new-password" autoComplete="new-password" />
      </Field.Root>
    </div>
  );
}

export function PasswordInputErrorDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Field.Error>Enter your password</Field.Error>
        <PasswordInput name="password" autoComplete="current-password" />
      </Field.Root>
    </div>
  );
}

export function PasswordInputLabelsDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Mot de passe</Field.Label>
        <PasswordInput
          name="password"
          autoComplete="current-password"
          labels={{ show: "Afficher le mot de passe" }}
        />
      </Field.Root>
    </div>
  );
}
