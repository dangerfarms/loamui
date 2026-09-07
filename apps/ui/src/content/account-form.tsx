"use client";

import type { FormEvent } from "react";
import { Alert, Button, Checkbox, ErrorSummary, Field, Input } from "@loamui/core";
import { AccountForm } from "@loamui/ui";
import type { Composition } from "./types";

function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

const accountForm: Composition = {
  slug: "account-form",
  name: "Account form",
  category: "Forms",
  description:
    "The card an account form lives in: a title, one column of fields, a stretched action and a footer link. One shell for signing in, creating an account and resetting a password.",
  lead: "Six parts around a core Card, capped at 24rem and centred. Every form at the door of an account has the same shape: a title the form is named by, one column of fields, a Button stretched to the card's width that says what happens, and a footer line for the other path. The questions differ, and the answers live in the fields' attributes and copy, so the three forms are three recipes on one composition rather than three components.",
  importLine: `import { AccountForm } from "@loamui/ui";\nimport { Alert, Button, Checkbox, ErrorSummary, Field, Input } from "@loamui/core";`,
  parts: [
    {
      name: "AccountForm.Root",
      description:
        "The unit: a wrapper that caps a core Card at 24rem and centres it in whatever holds it, and declares its own container so the fluid tokens answer the card's width. The Card inside is core's, left as core styles it.",
    },
    {
      name: "AccountForm.Title",
      description:
        "The heading, and the form's accessible name: the Form points at it with aria-labelledby. An h1 on a page of its own; pass render={<h2 />} inside a page.",
    },
    {
      name: "AccountForm.Description",
      description:
        "One muted line under the title saying what the form does and what happens next, so the visitor knows a link is coming before they type. Optional; leave it out of a sign-in.",
    },
    {
      name: "AccountForm.Form",
      description:
        "The native form, one column of fields with a large gap, named by the Title. action and onSubmit are its own, forwarded untouched. After a failed submit, an ErrorSummary goes here as the first child, spaced like any other row.",
    },
    {
      name: "AccountForm.Actions",
      description: "A single-cell grid for the submit Button, so it stretches to the card's width.",
    },
    {
      name: "AccountForm.Footer",
      description: "One muted, centred line under the form, with a link to the other path.",
    },
  ],
  demos: [
    {
      title: "Sign in",
      description:
        'The email field takes autoComplete="email" and the password field autoComplete="current-password": the two values that let a browser or password manager fill a sign-in form correctly, and the second is what tells it this is an existing password, not a new one. The Checkbox is unticked, so staying signed in is a choice the visitor makes. One column because the form is filled top to bottom: side-by-side fields make the eye and the tab order disagree, and every answer here follows the one before.',
      code: `<AccountForm.Root>
  <AccountForm.Title>Sign in</AccountForm.Title>
  <AccountForm.Form action="/sign-in" onSubmit={onSubmit}>
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Input name="email" type="email" autoComplete="email" required />
    </Field.Root>
    <Field.Root>
      <Field.Label>Password</Field.Label>
      <Input name="password" type="password" autoComplete="current-password" required />
    </Field.Root>
    <Checkbox name="remember" label="Keep me signed in" />
    <AccountForm.Actions>
      <Button type="submit">Sign in</Button>
    </AccountForm.Actions>
  </AccountForm.Form>
  <AccountForm.Footer>
    No account? <a href="/sign-up">Create one</a>
  </AccountForm.Footer>
</AccountForm.Root>`,
      render: () => (
        <AccountForm.Root>
          <AccountForm.Title>Sign in</AccountForm.Title>
          <AccountForm.Form action="/sign-in" onSubmit={onSubmit}>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" autoComplete="email" required />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input name="password" type="password" autoComplete="current-password" required />
            </Field.Root>
            <Checkbox name="remember" label="Keep me signed in" />
            <AccountForm.Actions>
              <Button type="submit">Sign in</Button>
            </AccountForm.Actions>
          </AccountForm.Form>
          <AccountForm.Footer>
            No account? <a href="/sign-up">Create one</a>
          </AccountForm.Footer>
        </AccountForm.Root>
      ),
    },
    {
      title: "Create an account",
      description:
        'The password field takes autoComplete="new-password", the value that tells a browser or password manager this is a password to make up and save, not one to look up; with "current-password" it would offer the wrong thing. Its rules sit before it as a Field.Description, read by the visitor and announced by their screen reader before they type, so nobody meets a rule for the first time in an error. There is no confirm-password field: retyping catches fewer mistakes than seeing the value, and a password manager fills both boxes with the same string anyway. The name is one field with autoComplete="name", because a single box holds every name in the world in the order its owner writes it, and autofill offers the full name in one go. The email takes autoComplete="email" and inputMode="email", so a phone offers the keyboard with @ on it. The consent Checkbox is unticked with the terms linked inside its label, so agreeing is a choice made after reading, and the Button says what happens: "Create account".',
      code: `<AccountForm.Root>
  <AccountForm.Title>Create an account</AccountForm.Title>
  <AccountForm.Form action="/sign-up" onSubmit={onSubmit}>
    <Field.Root>
      <Field.Label>Full name</Field.Label>
      <Input name="name" autoComplete="name" required />
    </Field.Root>
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Input name="email" type="email" autoComplete="email" inputMode="email" required />
    </Field.Root>
    <Field.Root>
      <Field.Label>Password</Field.Label>
      <Field.Description>
        At least 12 characters. Use a mix of words, not a single dictionary word.
      </Field.Description>
      <Input name="password" type="password" autoComplete="new-password" minLength={12} required />
    </Field.Root>
    <Checkbox
      name="consent"
      label={
        <>
          I agree to the <a href="/terms">terms of service</a> and{" "}
          <a href="/privacy">privacy policy</a>
        </>
      }
      required
    />
    <AccountForm.Actions>
      <Button type="submit">Create account</Button>
    </AccountForm.Actions>
  </AccountForm.Form>
  <AccountForm.Footer>
    Already have an account? <a href="/sign-in">Sign in</a>
  </AccountForm.Footer>
</AccountForm.Root>`,
      render: () => (
        <AccountForm.Root>
          <AccountForm.Title>Create an account</AccountForm.Title>
          <AccountForm.Form action="/sign-up" onSubmit={onSubmit}>
            <Field.Root>
              <Field.Label>Full name</Field.Label>
              <Input name="name" autoComplete="name" required />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" autoComplete="email" inputMode="email" required />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Field.Description>
                At least 12 characters. Use a mix of words, not a single dictionary word.
              </Field.Description>
              <Input
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={12}
                required
              />
            </Field.Root>
            <Checkbox
              name="consent"
              label={
                <>
                  I agree to the <a href="/terms">terms of service</a> and{" "}
                  <a href="/privacy">privacy policy</a>
                </>
              }
              required
            />
            <AccountForm.Actions>
              <Button type="submit">Create account</Button>
            </AccountForm.Actions>
          </AccountForm.Form>
          <AccountForm.Footer>
            Already have an account? <a href="/sign-in">Sign in</a>
          </AccountForm.Footer>
        </AccountForm.Root>
      ),
    },
    {
      title: "With errors",
      description:
        'The state after a failed submit, as the consumer renders it: an ErrorSummary as the first child of the form, one item per error linked to its field by id, and a Field.Error in each field with the same words. Both messages are in the words of the question: an instruction when the field is empty ("Enter your full name") and the rule when the value breaks it ("Password must be 12 characters or more", the rule the description stated first), never "invalid" or "required". Each Field.Error sets aria-invalid on its control and is announced; nothing typed is cleared. In a real form the summary appears after the submit and takes keyboard focus; this preview renders it on page load, so autoFocus is off here only to keep the gallery still.',
      code: `<AccountForm.Root>
  <AccountForm.Title>Create an account</AccountForm.Title>
  <AccountForm.Form action="/sign-up" onSubmit={onSubmit}>
    <ErrorSummary.Root autoFocus={false}>
      <ErrorSummary.Title />
      <ErrorSummary.List>
        <ErrorSummary.Item href="#sign-up-name">Enter your full name</ErrorSummary.Item>
        <ErrorSummary.Item href="#sign-up-password">
          Password must be 12 characters or more
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary.Root>
    <Field.Root id="sign-up-name">
      <Field.Label>Full name</Field.Label>
      <Field.Error>Enter your full name</Field.Error>
      <Input name="name" autoComplete="name" required />
    </Field.Root>
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Input
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        defaultValue="ada@example.com"
        required
      />
    </Field.Root>
    <Field.Root id="sign-up-password">
      <Field.Label>Password</Field.Label>
      <Field.Description>
        At least 12 characters. Use a mix of words, not a single dictionary word.
      </Field.Description>
      <Field.Error>Password must be 12 characters or more</Field.Error>
      <Input
        name="password"
        type="password"
        autoComplete="new-password"
        defaultValue="correct"
        minLength={12}
        required
      />
    </Field.Root>
    <Checkbox
      name="consent"
      label={
        <>
          I agree to the <a href="/terms">terms of service</a> and{" "}
          <a href="/privacy">privacy policy</a>
        </>
      }
      defaultChecked
      required
    />
    <AccountForm.Actions>
      <Button type="submit">Create account</Button>
    </AccountForm.Actions>
  </AccountForm.Form>
  <AccountForm.Footer>
    Already have an account? <a href="/sign-in">Sign in</a>
  </AccountForm.Footer>
</AccountForm.Root>`,
      render: () => (
        <AccountForm.Root>
          <AccountForm.Title>Create an account</AccountForm.Title>
          <AccountForm.Form action="/sign-up" onSubmit={onSubmit}>
            <ErrorSummary.Root autoFocus={false}>
              <ErrorSummary.Title />
              <ErrorSummary.List>
                <ErrorSummary.Item href="#sign-up-name">Enter your full name</ErrorSummary.Item>
                <ErrorSummary.Item href="#sign-up-password">
                  Password must be 12 characters or more
                </ErrorSummary.Item>
              </ErrorSummary.List>
            </ErrorSummary.Root>
            <Field.Root id="sign-up-name">
              <Field.Label>Full name</Field.Label>
              <Field.Error>Enter your full name</Field.Error>
              <Input name="name" autoComplete="name" required />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                defaultValue="ada@example.com"
                required
              />
            </Field.Root>
            <Field.Root id="sign-up-password">
              <Field.Label>Password</Field.Label>
              <Field.Description>
                At least 12 characters. Use a mix of words, not a single dictionary word.
              </Field.Description>
              <Field.Error>Password must be 12 characters or more</Field.Error>
              <Input
                name="password"
                type="password"
                autoComplete="new-password"
                defaultValue="correct"
                minLength={12}
                required
              />
            </Field.Root>
            <Checkbox
              name="consent"
              label={
                <>
                  I agree to the <a href="/terms">terms of service</a> and{" "}
                  <a href="/privacy">privacy policy</a>
                </>
              }
              defaultChecked
              required
            />
            <AccountForm.Actions>
              <Button type="submit">Create account</Button>
            </AccountForm.Actions>
          </AccountForm.Form>
          <AccountForm.Footer>
            Already have an account? <a href="/sign-in">Sign in</a>
          </AccountForm.Footer>
        </AccountForm.Root>
      ),
    },
    {
      title: "Reset a password",
      description:
        'The one field takes type="email", autoComplete="email" and inputMode="email": the first validates the address, the second lets a browser or password manager fill it without guessing, the third puts the @ key on a phone\'s keyboard. The Description under the title says a link is coming, so the visitor knows what to look for before they type. The Button says what happens ("Send reset link"), not "Submit", because the visitor is about to look for something in their inbox and the label tells them so. The footer is the way back for the visitor who remembered after all: a plain link, not a second action.',
      code: `<AccountForm.Root>
  <AccountForm.Title>Forgot your password?</AccountForm.Title>
  <AccountForm.Description>
    Enter the email address you signed up with and we'll send you a link to reset your password.
  </AccountForm.Description>
  <AccountForm.Form action="/forgot-password" onSubmit={onSubmit}>
    <Field.Root>
      <Field.Label>Email address</Field.Label>
      <Input name="email" type="email" autoComplete="email" inputMode="email" required />
    </Field.Root>
    <AccountForm.Actions>
      <Button type="submit">Send reset link</Button>
    </AccountForm.Actions>
  </AccountForm.Form>
  <AccountForm.Footer>
    <a href="/sign-in">Back to sign in</a>
  </AccountForm.Footer>
</AccountForm.Root>`,
      render: () => (
        <AccountForm.Root>
          <AccountForm.Title>Forgot your password?</AccountForm.Title>
          <AccountForm.Description>
            Enter the email address you signed up with and we'll send you a link to reset your
            password.
          </AccountForm.Description>
          <AccountForm.Form action="/forgot-password" onSubmit={onSubmit}>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" autoComplete="email" inputMode="email" required />
            </Field.Root>
            <AccountForm.Actions>
              <Button type="submit">Send reset link</Button>
            </AccountForm.Actions>
          </AccountForm.Form>
          <AccountForm.Footer>
            <a href="/sign-in">Back to sign in</a>
          </AccountForm.Footer>
        </AccountForm.Root>
      ),
    },
    {
      title: "After submitting",
      description:
        'A core Alert takes the form\'s place, and its words are the same whether or not the address has an account. "No account with that address" would tell a stranger which addresses are customers, one guess at a time; "if that address has an account" tells the visitor what to do next and tells the stranger nothing. The footer stays, because the visitor who typed the wrong address needs a way back. The Alert is role="status" and polite; if your app swaps it in without a page load, move focus to it or to the title so the change is not lost.',
      code: `<AccountForm.Root>
  <AccountForm.Title>Check your email</AccountForm.Title>
  <Alert>If that address has an account, we've sent a link. Check your email.</Alert>
  <AccountForm.Footer>
    <a href="/sign-in">Back to sign in</a>
  </AccountForm.Footer>
</AccountForm.Root>`,
      render: () => (
        <AccountForm.Root>
          <AccountForm.Title>Check your email</AccountForm.Title>
          <Alert>If that address has an account, we've sent a link. Check your email.</Alert>
          <AccountForm.Footer>
            <a href="/sign-in">Back to sign in</a>
          </AccountForm.Footer>
        </AccountForm.Root>
      ),
    },
  ],
  whenToUse: [
    "Any form at the door of an account: signing in, creating one, asking for a reset link, setting a password from an invitation. On its own with an h1, or inside a page with the title rendered as an h2.",
    "A magic-link or one-time-code request: the same shape, one address in and a message out, with the Button and the confirmation renamed for what is sent.",
  ],
  whenNotToUse: [
    "A registration that runs over several pages (profile, organisation, billing): that is a TaskList of forms, each one short and submitted on its own, not one long column squeezed into a card.",
    "A row of social sign-in buttons: this composition holds none. Each extra way in is one more decision at the moment the visitor wants to get past the door, so add one only when a measured share of visitors arrive by it, as a Button row of your own.",
    "Changing a password while signed in: that form asks for the current password first, so a walk-up at an unlocked screen cannot lock the owner out, and it lives in account settings, not in a card on a page of its own.",
  ],
};

export default accountForm;
