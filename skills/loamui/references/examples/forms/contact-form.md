---
title: Contact form
description: Getting in touch: a name, an email, a subject to choose and a message, in one column with one action at the end.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Contact form

Getting in touch: a name, an email, a subject to choose and a message, in one column with one action at the end.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Field`, `Input`, `Select`, `Textarea`
- Tags: contact, enquiry, message, support
- Live: https://loamui.com/examples/forms/contact-form

## Built to the pillars

- **Native CSS.** A native form named by its heading, with a native select for the subject that starts on a disabled prompt so a skipped subject submits nothing rather than the first option, and required catches it.
- **Modern CSS.** The form is its own container and its own grid, capped at a readable width; the fields answer the form's width, not the viewport's.
- **Composition.** Every field is a core Field around a core control; the example adds only the opening, the rhythm between fields and the actions row.
- **Contextualism.** The actions row declares --loam-context: primary because the one Button is the form's action; primary is the brand slot, neutral until a theme fills it, so the declaration says where the action belongs, not that it stands out.
- **Accessible & gatekept.** One column, always: a form is filled top to bottom, and fields set side by side make the eye and the tab order disagree. The note says when to expect a reply before anyone starts typing, the email field says what it is for, and the Button says what happens.

## Example.tsx

```tsx
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
```

## example.css

```css
@scope (.contact-form) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-lg);
    inline-size: 100%;
    max-inline-size: 36rem;
  }

  div.intro {
    display: block grid;
    gap: var(--loam-space-sm);

    h2 {
      font-size: var(--loam-text-xl);
      margin: 0;
    }

    p {
      color: var(--loam-color-fg-muted);
      margin: 0;
      max-inline-size: var(--loam-measure);
    }
  }

  div.actions {
    --loam-context: primary;

    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
  }
}
```

