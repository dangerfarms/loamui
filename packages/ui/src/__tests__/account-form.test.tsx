import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Alert, Button, Checkbox, ErrorSummary, Field, Input } from "@loamui/core";
import { AccountForm } from "../components/AccountForm/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("AccountForm", () => {
  it("wraps a core Card, names the form after the title, and signs in with no axe violations", async () => {
    const { container } = render(
      <AccountForm.Root>
        <AccountForm.Title>Sign in</AccountForm.Title>
        <AccountForm.Form action="/sign-in">
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
      </AccountForm.Root>,
    );
    // The wrapper is the composition's; the Card inside is core's, with no
    // second class on it.
    const root = container.firstElementChild!;
    expect(root).toHaveClass("loam-AccountForm");
    expect(root).not.toHaveClass("loam-Card");
    const card = root.firstElementChild!;
    expect(card).toHaveClass("loam-Card");
    expect(card.className).toBe("loam-Card");

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Sign in");
    const form = screen.getByRole("form", { name: "Sign in" });
    expect(form).toHaveAttribute("action", "/sign-in");
    expect(form).toHaveAttribute("aria-labelledby", title.id);

    expect(screen.getByLabelText("Email address")).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute("autocomplete", "current-password");
    expect(screen.getByRole("checkbox", { name: "Keep me signed in" })).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Sign in" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("link", { name: "Create one" })).toHaveAttribute("href", "/sign-up");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("creates an account: a new password with its rules first, unticked consent, no confirm field", async () => {
    const { container } = render(
      <AccountForm.Root>
        <AccountForm.Title>Create an account</AccountForm.Title>
        <AccountForm.Form action="/sign-up">
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
                I agree to the <a href="/terms">terms of service</a>
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
      </AccountForm.Root>,
    );
    expect(screen.getByRole("form", { name: "Create an account" })).toHaveAttribute(
      "action",
      "/sign-up",
    );
    expect(screen.getByLabelText("Full name")).toHaveAttribute("autocomplete", "name");
    const email = screen.getByLabelText("Email address");
    expect(email).toHaveAttribute("autocomplete", "email");
    expect(email).toHaveAttribute("inputmode", "email");
    const password = screen.getByLabelText("Password");
    expect(password).toHaveAttribute("autocomplete", "new-password");
    expect(password).toHaveAttribute("type", "password");
    expect(password).toHaveAccessibleDescription(
      "At least 12 characters. Use a mix of words, not a single dictionary word.",
    );
    expect(screen.getAllByLabelText(/password/i)).toHaveLength(1);
    const consent = screen.getByRole("checkbox", { name: "I agree to the terms of service" });
    expect(consent).not.toBeChecked();
    expect(screen.getByRole("link", { name: "terms of service" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("button", { name: "Create account" })).toHaveAttribute(
      "type",
      "submit",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("holds an ErrorSummary and field errors after a failed submit", async () => {
    const { container } = render(
      <AccountForm.Root>
        <AccountForm.Title>Create an account</AccountForm.Title>
        <AccountForm.Form action="/sign-up">
          <ErrorSummary.Root>
            <ErrorSummary.Title />
            <ErrorSummary.List>
              <ErrorSummary.Item href="#name">Enter your full name</ErrorSummary.Item>
              <ErrorSummary.Item href="#password">
                Password must be 12 characters or more
              </ErrorSummary.Item>
            </ErrorSummary.List>
          </ErrorSummary.Root>
          <Field.Root id="name">
            <Field.Label>Full name</Field.Label>
            <Field.Error>Enter your full name</Field.Error>
            <Input name="name" autoComplete="name" required />
          </Field.Root>
          <Field.Root id="password">
            <Field.Label>Password</Field.Label>
            <Field.Description>
              At least 12 characters. Use a mix of words, not a single dictionary word.
            </Field.Description>
            <Field.Error>Password must be 12 characters or more</Field.Error>
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={12}
              required
            />
          </Field.Root>
          <AccountForm.Actions>
            <Button type="submit">Create account</Button>
          </AccountForm.Actions>
        </AccountForm.Form>
      </AccountForm.Root>,
    );
    expect(screen.getByRole("group", { name: "There is a problem" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "Enter your full name" })).toHaveAttribute(
      "href",
      "#name",
    );
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Password")).toHaveAttribute("aria-invalid", "true");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("resets a password: a described email field, a named action and a way back", async () => {
    const { container } = render(
      <AccountForm.Root>
        <AccountForm.Title>Forgot your password?</AccountForm.Title>
        <AccountForm.Description>
          Enter the email address you signed up with and we'll send you a link to reset your
          password.
        </AccountForm.Description>
        <AccountForm.Form action="/forgot-password">
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
      </AccountForm.Root>,
    );
    expect(screen.getByText(/send you a link to reset your password/)).toHaveClass("description");
    expect(screen.getByRole("form", { name: "Forgot your password?" })).toHaveAttribute(
      "action",
      "/forgot-password",
    );
    const email = screen.getByLabelText("Email address");
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("autocomplete", "email");
    expect(email).toHaveAttribute("inputmode", "email");
    expect(screen.getByRole("button", { name: "Send reset link" })).toHaveAttribute(
      "type",
      "submit",
    );
    expect(screen.getByRole("link", { name: "Back to sign in" })).toHaveAttribute(
      "href",
      "/sign-in",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("holds the neutral confirmation in place of the form with no axe violations", async () => {
    const { container } = render(
      <AccountForm.Root>
        <AccountForm.Title>Check your email</AccountForm.Title>
        <Alert>If that address has an account, we've sent a link. Check your email.</Alert>
        <AccountForm.Footer>
          <a href="/sign-in">Back to sign in</a>
        </AccountForm.Footer>
      </AccountForm.Root>,
    );
    expect(screen.getByRole("status")).toHaveTextContent(/If that address has an account/);
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("leaves the form unnamed without a Title, and lets the consumer's own name win", () => {
    const { rerender } = render(
      <AccountForm.Root>
        <AccountForm.Form action="/sign-in" />
      </AccountForm.Root>,
    );
    // A form with no accessible name has no form role to query.
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(document.querySelector("form")).not.toHaveAttribute("aria-labelledby");

    rerender(
      <AccountForm.Root>
        <AccountForm.Title>Sign in</AccountForm.Title>
        <AccountForm.Form action="/sign-in" aria-label="Sign in to your account" />
      </AccountForm.Root>,
    );
    expect(screen.getByRole("form", { name: "Sign in to your account" })).not.toHaveAttribute(
      "aria-labelledby",
    );
  });

  it("renders the title as an h2 when asked, and the form still names itself by it", () => {
    render(
      <AccountForm.Root>
        <AccountForm.Title render={<h2 />}>Sign in</AccountForm.Title>
        <AccountForm.Form action="/sign-in" />
      </AccountForm.Root>,
    );
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("Sign in");
    expect(screen.getByRole("form", { name: "Sign in" })).toHaveAttribute(
      "aria-labelledby",
      title.id,
    );
  });
});
