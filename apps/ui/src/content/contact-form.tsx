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
  description: "A stack of fields and a row of actions on a native form.",
  lead: "Four parts on a native form. The fields are yours, composed from Field, Input and Textarea, so every label, description and error is wired by the core primitive; the parts only set the rhythm, and a Row puts two short fields side by side when the form itself is wide enough.",
  importLine: `import { ContactForm } from "@loamui/ui";`,
  parts: [
    {
      name: "ContactForm.Root",
      description:
        "The form. Declares its own container so a Row splits by the form's width, not the viewport's. action and onSubmit are the form's own, forwarded untouched.",
    },
    {
      name: "ContactForm.Fields",
      description: "The stack of fields: one column, a large gap between fields.",
    },
    {
      name: "ContactForm.Row",
      description:
        "Two fields side by side when the form is wider than 36rem, stacked when it is not. For short answers that belong together, like a first and a last name; never for a field that takes a sentence.",
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
        "Name, email, company and message. Each field carries its autofill purpose, the optional field says so in words rather than the required ones carrying an asterisk, and required lives on the control, where the browser validates it after a submit attempt. Narrow the page and the name fields stack.",
      code: `<ContactForm.Root action="/contact" onSubmit={onSubmit}>
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
      <Field.Description>Tell us what you are building and where you are stuck.</Field.Description>
      <Textarea name="message" rows={5} required />
    </Field.Root>
  </ContactForm.Fields>
  <ContactForm.Actions>
    <Button type="submit">Send message</Button>
  </ContactForm.Actions>
</ContactForm.Root>`,
      render: () => (
        <ContactForm.Root action="/contact" onSubmit={onSubmit}>
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
              <Field.Description>
                Tell us what you are building and where you are stuck.
              </Field.Description>
              <Textarea name="message" rows={5} required />
            </Field.Root>
          </ContactForm.Fields>
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
  <ContactForm.Fields>
    <ContactForm.Row>
      <Field.Root>
        <Field.Label>First name</Field.Label>
        <Input name="given-name" autoComplete="given-name" defaultValue="Sam" required />
      </Field.Root>
      <Field.Root>
        <Field.Label>Last name</Field.Label>
        <Input name="family-name" autoComplete="family-name" defaultValue="Okafor" required />
      </Field.Root>
    </ContactForm.Row>
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
  </ContactForm.Fields>
  <ContactForm.Actions>
    <Button type="submit">Send message</Button>
  </ContactForm.Actions>
</ContactForm.Root>`,
      render: () => (
        <ContactForm.Root action="/contact" onSubmit={onSubmit} noValidate>
          <ContactForm.Fields>
            <ContactForm.Row>
              <Field.Root>
                <Field.Label>First name</Field.Label>
                <Input name="given-name" autoComplete="given-name" defaultValue="Sam" required />
              </Field.Root>
              <Field.Root>
                <Field.Label>Last name</Field.Label>
                <Input
                  name="family-name"
                  autoComplete="family-name"
                  defaultValue="Okafor"
                  required
                />
              </Field.Root>
            </ContactForm.Row>
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
              <Textarea
                name="message"
                rows={5}
                defaultValue="Does the Drawer trap focus?"
                required
              />
            </Field.Root>
          </ContactForm.Fields>
          <ContactForm.Actions>
            <Button type="submit">Send message</Button>
          </ContactForm.Actions>
        </ContactForm.Root>
      ),
    },
  ],
  whenToUse: [
    "A short message to a person: a handful of fields and one action. The visitor's name and address go in autofillable fields, the message in a Textarea, and the browser validates on submit.",
    "Anywhere the same form must fit two widths, a page and a Drawer: the Row splits by the form's own width, so one markup serves both without a breakpoint.",
  ],
  whenNotToUse: [
    "Anything with steps, branching or more than a screen of fields: that is a form split across pages, each with an ErrorSummary at the top after a failed submit, not one long stack.",
    "Signing in: that form is one narrow column with a stretched action and a footer link, which is a different shape. Use SignIn.",
  ],
};

export default contactForm;
