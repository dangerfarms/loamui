"use client";

import type { FormEvent } from "react";
import { Button, Checkbox, Field, Input } from "@loamui/core";
import { SignIn } from "@loamui/ui";
import type { Composition } from "./types";

function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

const signIn: Composition = {
  slug: "sign-in",
  name: "Sign in",
  category: "Forms",
  description:
    "A sign-in card: a title, one column of fields, a stretched action and a footer link.",
  lead: "Five parts on a core Card, capped at 24rem and centred. One column: email, password, a checkbox, a Button stretched to the card's width and a footer line for the other path. The fields carry their autofill purpose, so browsers and password managers fill the form without guessing.",
  importLine: `import { SignIn } from "@loamui/ui";`,
  parts: [
    {
      name: "SignIn.Root",
      description:
        "The surface: a core Card, capped at 24rem and centred in whatever holds it. Declares its own container so the fluid tokens answer the card's width.",
    },
    {
      name: "SignIn.Title",
      description: 'The heading. An h1 on a page of its own; pass render="h2" inside a page.',
    },
    {
      name: "SignIn.Form",
      description:
        "The native form, one column of fields with a large gap. action and onSubmit are its own, forwarded untouched.",
    },
    {
      name: "SignIn.Actions",
      description: "A grid wrapper for the submit Button, so it stretches to the card's width.",
    },
    {
      name: "SignIn.Footer",
      description: "One muted, centred line under the form, with a link to the other path.",
    },
  ],
  demos: [
    {
      title: "Email and password",
      description:
        'The email field takes autoComplete="email" and the password field autoComplete="current-password": the two values that let a browser or password manager fill a sign-in form correctly, and the second is what tells it this is an existing password, not a new one. The Checkbox is unticked, so staying signed in is a choice the visitor makes. One column because the form is filled top to bottom: side-by-side fields make the eye and the tab order disagree, and every answer here follows the one before.',
      code: `<SignIn.Root>
  <SignIn.Title>Sign in</SignIn.Title>
  <SignIn.Form action="/sign-in" onSubmit={onSubmit}>
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Input name="email" type="email" autoComplete="email" required />
    </Field.Root>
    <Field.Root>
      <Field.Label>Password</Field.Label>
      <Input name="password" type="password" autoComplete="current-password" required />
    </Field.Root>
    <Checkbox name="remember" label="Keep me signed in" />
    <SignIn.Actions>
      <Button type="submit">Sign in</Button>
    </SignIn.Actions>
  </SignIn.Form>
  <SignIn.Footer>
    No account? <a href="/sign-up">Create one</a>
  </SignIn.Footer>
</SignIn.Root>`,
      render: () => (
        <SignIn.Root>
          <SignIn.Title>Sign in</SignIn.Title>
          <SignIn.Form action="/sign-in" onSubmit={onSubmit}>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" autoComplete="email" required />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input name="password" type="password" autoComplete="current-password" required />
            </Field.Root>
            <Checkbox name="remember" label="Keep me signed in" />
            <SignIn.Actions>
              <Button type="submit">Sign in</Button>
            </SignIn.Actions>
          </SignIn.Form>
          <SignIn.Footer>
            No account? <a href="/sign-up">Create one</a>
          </SignIn.Footer>
        </SignIn.Root>
      ),
    },
  ],
  whenToUse: [
    "The page a visitor lands on to sign in with an email address and a password, on its own with an h1 or inside a page with the title rendered as an h2.",
    "Any form that is one short column with a single action: a password reset or a magic-link request has the same shape, so the same parts hold it.",
  ],
  whenNotToUse: [
    'Signing up: creating an account asks different questions (a new password and its rules, consent) and its password field takes autoComplete="new-password". Build it from the same Field parts rather than bending this one.',
    "A row of social sign-in buttons: this composition holds none. Each extra way in is one more decision at the moment the visitor wants to get past the door, so add one only when a measured share of visitors arrive by it, as a Button row of your own.",
  ],
};

export default signIn;
