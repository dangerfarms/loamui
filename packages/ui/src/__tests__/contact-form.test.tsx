import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button, Field, Input, Textarea } from "@loamui/core";
import { ContactForm } from "../components/ContactForm/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ContactForm", () => {
  it("renders one column of labelled controls with no axe violations", async () => {
    const { container } = render(
      <ContactForm.Root action="/contact" aria-label="Contact us">
        <Field.Root>
          <Field.Label>Full name</Field.Label>
          <Input name="name" autoComplete="name" required />
        </Field.Root>
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
        <ContactForm.Actions>
          <Button type="submit">Send message</Button>
        </ContactForm.Actions>
      </ContactForm.Root>,
    );
    const form = screen.getByRole("form", { name: "Contact us" });
    expect(form).toHaveClass("loam-ContactForm");
    expect(form).toHaveAttribute("action", "/contact");
    // The fields are the form's direct children: nothing wraps or pairs them.
    expect(form.querySelectorAll(":scope > .loam-Field")).toHaveLength(4);
    expect(screen.getByLabelText("Full name")).toHaveAttribute("autocomplete", "name");
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
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Field.Error>
            Enter an email address in the correct format, like name@example.com
          </Field.Error>
          <Input name="email" type="email" defaultValue="sam.okafor" />
        </Field.Root>
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
