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
