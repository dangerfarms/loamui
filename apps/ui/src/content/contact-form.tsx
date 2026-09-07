"use client";

import type { FormEvent } from "react";
import { Button, Field, Input, Textarea } from "@loamui/core";
import { ContactForm } from "@loamui/ui";
import type { Composition } from "./types";

function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

const contactForm: Composition = {
  slug: "contact-form",
  name: "Contact form",
  category: "Forms",
  description: "One column of fields and a row of actions on a native form.",
  lead: "Two parts on a native form. The fields are yours, composed from Field, Input and Textarea, so every label, description and error is wired by the core primitive; the form is the column, and the only rule it adds is the rhythm between the fields. One column, always: a form is filled top to bottom, and fields set side by side make the eye and the tab order disagree.",
  importLine: `import { ContactForm } from "@loamui/ui";`,
  parts: [
    {
      name: "ContactForm.Root",
      description:
        "The form, and the column: a grid with a large gap between the fields you place in it. Declares its own container so the fluid tokens answer the form's width. action and onSubmit are the form's own, forwarded untouched.",
    },
    {
      name: "ContactForm.Actions",
      description:
        "A wrapping flex row for the submit Button, so it keeps its natural width instead of stretching across the form.",
    },
  ],
  demos: [
    {
      title: "Contact form",
      description:
        'Name, email, company and message, one under the other. The name is one field with autoComplete="name", because a single box holds every name in the world in the order its owner writes it, and autofill offers the full name in one go. Each field carries its autofill purpose, the optional field says so in words rather than the required ones carrying an asterisk, and required lives on the control, where the browser validates it after a submit attempt.',
      code: `<ContactForm.Root action="/contact" onSubmit={onSubmit}>
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
    <Field.Description>Tell us what you are building and where you are stuck.</Field.Description>
    <Textarea name="message" rows={5} required />
  </Field.Root>
  <ContactForm.Actions>
    <Button type="submit">Send message</Button>
  </ContactForm.Actions>
</ContactForm.Root>`,
      render: () => (
        <ContactForm.Root action="/contact" onSubmit={onSubmit}>
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
            <Field.Description>
              Tell us what you are building and where you are stuck.
            </Field.Description>
            <Textarea name="message" rows={5} required />
          </Field.Root>
          <ContactForm.Actions>
            <Button type="submit">Send message</Button>
          </ContactForm.Actions>
        </ContactForm.Root>
      ),
    },
    {
      title: "After a failed submit",
      description:
        'Errors are rendered, not declared: a Field.Error before the email input marks the field invalid and is announced. The message says what to do in the words of the label, never "invalid" or "required", and the visitor\'s input stays on screen. The form is noValidate because the server has already judged it.',
      code: `<ContactForm.Root action="/contact" onSubmit={onSubmit} noValidate>
  <Field.Root>
    <Field.Label>Full name</Field.Label>
    <Input name="name" autoComplete="name" defaultValue="Sam Okafor" required />
  </Field.Root>
  <Field.Root>
    <Field.Label>Email address</Field.Label>
    <Field.Description>We'll only use this to reply.</Field.Description>
    <Field.Error>
      Enter an email address in the correct format, like name@example.com
    </Field.Error>
    <Input name="email" type="email" autoComplete="email" defaultValue="sam.okafor" required />
  </Field.Root>
  <Field.Root>
    <Field.Label>Message</Field.Label>
    <Textarea name="message" rows={5} defaultValue="Does the Drawer trap focus?" required />
  </Field.Root>
  <ContactForm.Actions>
    <Button type="submit">Send message</Button>
  </ContactForm.Actions>
</ContactForm.Root>`,
      render: () => (
        <ContactForm.Root action="/contact" onSubmit={onSubmit} noValidate>
          <Field.Root>
            <Field.Label>Full name</Field.Label>
            <Input name="name" autoComplete="name" defaultValue="Sam Okafor" required />
          </Field.Root>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Field.Description>We'll only use this to reply.</Field.Description>
            <Field.Error>
              Enter an email address in the correct format, like name@example.com
            </Field.Error>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              defaultValue="sam.okafor"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Message</Field.Label>
            <Textarea name="message" rows={5} defaultValue="Does the Drawer trap focus?" required />
          </Field.Root>
          <ContactForm.Actions>
            <Button type="submit">Send message</Button>
          </ContactForm.Actions>
        </ContactForm.Root>
      ),
    },
  ],
  whenToUse: [
    "A short message to a person: a handful of fields and one action. The visitor's name and address go in autofillable fields, the message in a Textarea, and the browser validates on submit.",
    "Anywhere the same form must fit two widths, a page and a Drawer: one column fits both, so one markup serves without a breakpoint.",
  ],
  whenNotToUse: [
    "Anything with steps, branching or more than a screen of fields: that is a form split across pages, each with an ErrorSummary at the top after a failed submit, not one long stack.",
    "Signing in: that form is one narrow column in a card with a stretched action and a footer link, which is a different shape. Use AccountForm.",
  ],
};

export default contactForm;
