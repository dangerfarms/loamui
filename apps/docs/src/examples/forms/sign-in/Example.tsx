"use client";

import { Button, Card, Checkbox, Field, Input, PasswordInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<div className="sign-in" />}>
      <h1 id="sign-in-title">Sign in</h1>
      <form action="/sign-in" method="post" aria-labelledby="sign-in-title">
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" autoComplete="email" inputMode="email" required />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <PasswordInput name="password" autoComplete="current-password" required />
        </Field.Root>
        <Checkbox name="remember" label="Keep me signed in" />
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
