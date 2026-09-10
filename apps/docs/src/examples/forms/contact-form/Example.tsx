"use client";

import { Button, Field, Input, Select, Textarea } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <form
      className="contact-form"
      action="/contact"
      method="post"
      aria-labelledby="contact-form-title"
    >
      <div className="intro">
        <h2 id="contact-form-title">Get in touch</h2>
        <p>
          The nursery answers email on Tuesdays and Fridays. For an order that has already been
          posted, include the order number.
        </p>
      </div>
      <Field.Root>
        <Field.Label>Full name</Field.Label>
        <Input name="name" autoComplete="name" required />
      </Field.Root>
      <Field.Root>
        <Field.Label>Email address</Field.Label>
        <Field.Description>Only used to reply.</Field.Description>
        <Input name="email" type="email" autoComplete="email" inputMode="email" required />
      </Field.Root>
      <Field.Root>
        <Field.Label>What is it about?</Field.Label>
        <Select name="subject" required>
          <option value="" disabled>
            Choose a subject
          </option>
          <option value="order">An order</option>
          <option value="seed">Seed availability</option>
          <option value="membership">Membership</option>
          <option value="trade">Trade orders</option>
          <option value="other">Something else</option>
        </Select>
      </Field.Root>
      <Field.Root>
        <Field.Label>Message</Field.Label>
        <Textarea name="message" rows={5} required />
      </Field.Root>
      <div className="actions">
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
}
