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
