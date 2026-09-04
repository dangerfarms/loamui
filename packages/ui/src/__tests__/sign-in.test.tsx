import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button, Checkbox, Field, Input } from "@loamui/core";
import { SignIn } from "../components/SignIn/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("SignIn", () => {
  it("renders a card with a heading, labelled controls and no axe violations", async () => {
    const { container } = render(
      <SignIn.Root>
        <SignIn.Title>Sign in</SignIn.Title>
        <SignIn.Form action="/sign-in" aria-label="Sign in">
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
      </SignIn.Root>,
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass("loam-SignIn");
    expect(root).toHaveClass("loam-Card");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sign in");
    expect(screen.getByRole("form", { name: "Sign in" })).toHaveAttribute("action", "/sign-in");
    expect(screen.getByLabelText("Email address")).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute("autocomplete", "current-password");
    expect(screen.getByRole("checkbox", { name: "Keep me signed in" })).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Sign in" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("link", { name: "Create one" })).toHaveAttribute("href", "/sign-up");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title as an h2 when asked", () => {
    render(
      <SignIn.Root>
        <SignIn.Title render="h2">Sign in</SignIn.Title>
      </SignIn.Root>,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Sign in");
  });
});
