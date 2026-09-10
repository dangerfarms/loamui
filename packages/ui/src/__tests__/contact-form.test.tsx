import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button, Field, Input, Textarea } from "@loamui/core";
import { ContactForm } from "../components/ContactForm/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ContactForm", () => {
  it("renders a form of labelled controls with no axe violations", async () => {
    const { container } = render(
      <ContactForm.Root action="/contact" aria-label="Contact us">
        <ContactForm.Fields>
          <ContactForm.Row>
            <Field.Root>
              <Field.Label>First name</Field.Label>
              <Input name="given-name" autoComplete="given-name" required />
            </Field.Root>
            <Field.Root>
              <Field.Label>Last name</Field.Label>
              <Input name="family-name" autoComplete="family-name" required />
            </Field.Root>
          </ContactForm.Row>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Field.Description>We'll only use this to reply.</Field.Description>
            <Input name="email" type="email" autoComplete="email" required />
          </Field.Root>
          <Field.Root>
            <Field.Label optional>Company</Field.Label>
            <Input name="organization" autoComplete="organization" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Message</Field.Label>
            <Textarea name="message" rows={5} required />
          </Field.Root>
        </ContactForm.Fields>
        <ContactForm.Actions>
          <Button type="submit">Send message</Button>
        </ContactForm.Actions>
      </ContactForm.Root>,
    );
    const form = screen.getByRole("form", { name: "Contact us" });
    expect(form).toHaveClass("loam-ContactForm");
    expect(form).toHaveAttribute("action", "/contact");
    expect(screen.getByLabelText("First name")).toHaveAttribute("autocomplete", "given-name");
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toHaveAccessibleDescription(
      "We'll only use this to reply.",
    );
    expect(screen.getByLabelText("Company (optional)")).not.toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(screen.getByRole("button", { name: "Send message" })).toHaveAttribute("type", "submit");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("marks a field invalid when a Field.Error is rendered before its control", async () => {
    const { container } = render(
      <ContactForm.Root aria-label="Contact us" noValidate>
        <ContactForm.Fields>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Field.Error>
              Enter an email address in the correct format, like name@example.com
            </Field.Error>
            <Input name="email" type="email" defaultValue="sam.okafor" />
          </Field.Root>
        </ContactForm.Fields>
        <ContactForm.Actions>
          <Button type="submit">Send message</Button>
        </ContactForm.Actions>
      </ContactForm.Root>,
    );
    const email = screen.getByLabelText("Email address");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveValue("sam.okafor");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter an email address in the correct format, like name@example.com",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
