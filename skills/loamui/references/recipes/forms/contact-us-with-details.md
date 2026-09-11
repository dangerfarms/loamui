---
title: Contact us with details
description: A short enquiry form alongside the nursery's email, phone number, address and opening hours.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Contact us with details

A short enquiry form alongside the nursery's email, phone number, address and opening hours.

A recipe in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Field`, `Input`, `Textarea`
- Tags: contact, enquiry, address, form, support
- Live: https://loamui.com/recipes/forms/contact-us-with-details

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample contact details and pass an action URL for your POST endpoint; the sample defaults to /contact. Validate both fields on the server, deliver the message and return a confirmation. If submission fails, preserve the entered values and return a focused ErrorSummary with matching Field.Error messages, as shown in Sign in with errors. The browser's required and email checks are a convenience, not a replacement for server validation.

## When to use

Use when people should be able to choose between sending a message and contacting you directly. State when replies are handled so they can decide whether another contact method is more suitable.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** An address and description list pair each contact method with its value. Email and phone links use mailto: and tel:. The native POST form uses native required fields, email validation and autocomplete.
- **Modern CSS.** Layered donut scopes keep recipe styles local. An intrinsic auto-fit grid stacks the details and form when two columns cannot fit; padding and type tokens resolve inside the section's container. The padding interpolation includes rem as well as cqi so it responds to enlarged root text; long labels and addresses can wrap. Headings inherit the element typography.
- **Composition.** The section supplies one shared surface around the details and native form. Field wires labels and descriptions; Input, Textarea and Button keep their own styles. Avoiding nested padded surfaces leaves room for the form at narrow widths and enlarged text sizes.
- **Contextualism.** The actions region declares --loam-context: primary for its Button. Shared surface, text and border tokens follow the colour scheme; layout and sizing are supplied by the parent rather than configuration props.
- **Accessible & gatekept.** Required fields are identified in their visible labels, and the email description is wired by Field. Decorative icons repeat visible terms and are hidden from assistive technology. Email and telephone values retain left-to-right ordering in RTL pages. Text and DOM order stay intact when the grid stacks, and real borders preserve surface boundaries in forced colours.

## Example.tsx

```tsx
"use client";

import { Button, Field, Input, Textarea } from "@loamui/core";
import "./example.css";

export default function Example({ action = "/contact" }: { action?: string }) {
  return (
    <section className="contact-us-with-details">
      <div>
        <div className="details">
          <h2>Contact us</h2>
          <p>
            Ask about an order, a variety, or a place on a workshop. The nursery answers email on
            Tuesdays and Fridays.
          </p>
          <address>
            <dl>
              <div>
                <dt>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  Email
                </dt>
                <dd>
                  <a href="mailto:hello@hedgerow.coop" dir="ltr">
                    hello@hedgerow.coop
                  </a>
                </dd>
              </div>
              <div>
                <dt>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                  Phone
                </dt>
                <dd>
                  <a href="tel:+441588640210" dir="ltr">
                    01588 640210
                  </a>
                </dd>
              </div>
              <div>
                <dt>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Nursery
                </dt>
                <dd>Bury Ditches Lane, Clun, Shropshire SY7 8JQ</dd>
              </div>
              <div>
                <dt>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Open
                </dt>
                <dd>Wednesday to Sunday, 10am to 4pm</dd>
              </div>
            </dl>
          </address>
        </div>
        <form action={action} method="post">
          <h3>Send a message</h3>
          <Field.Root>
            <Field.Label>Email address (required)</Field.Label>
            <Field.Description>We’ll reply to this address.</Field.Description>
            <Input
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="email"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Message (required)</Field.Label>
            <Textarea name="message" rows={5} required />
          </Field.Root>
          <div className="actions">
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.contact-us-with-details) to ([class*="loam-"]) {
  @layer loamui.components {
    h2,
    h3,
    p,
    dl,
    dd {
      margin-block: 0;
    }

    div.details {
      display: block grid;
      gap: var(--loam-space-md);
      min-inline-size: 0;
      overflow-wrap: anywhere;

      > p {
        color: var(--loam-color-fg-muted);
        max-inline-size: var(--loam-measure);
      }
    }

    address {
      font-style: normal;
    }

    dl {
      display: block grid;
      gap: var(--loam-space-md);

      > div {
        display: block grid;
        gap: var(--loam-space-xs);
      }
    }

    dt {
      align-items: center;
      color: var(--loam-color-fg-muted);
      display: block flex;
      font-size: var(--loam-text-sm);
      gap: var(--loam-space-xs);

      svg {
        block-size: 1em;
        flex: none;
        inline-size: 1em;
      }
    }

    dd {
      margin-inline: 0;
    }

    form {
      display: block grid;
      gap: var(--loam-space-lg);
      grid-template-columns: minmax(0, 1fr);
      overflow-wrap: anywhere;
    }

    div.actions {
      --loam-context: primary;

      display: block grid;
    }

    :scope {
      container-type: inline-size;
      inline-size: 100%;

      > div {
        align-items: start;
        background: var(--loam-color-bg-subtle);
        border: 1px solid var(--loam-color-line);
        border-radius: var(--loam-radius-xl);
        display: block grid;
        font-size: var(--loam-text-md);
        gap: var(--loam-space-xl);
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 21rem), 1fr));
        padding: clamp(var(--loam-space-md), 0.5rem + 2cqi, var(--loam-space-xl));
      }
    }
  }
}
```

