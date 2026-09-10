---
title: Contact us with details
description: Two columns: the ways to reach the nursery with a glyph each, and a short form with an email and a message beside them.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Contact us with details

Two columns: the ways to reach the nursery with a glyph each, and a short form with an email and a message beside them.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Card`, `Field`, `Input`, `Textarea`
- Tags: contact, enquiry, address, form, support
- Live: https://loamui.com/examples/page-sections/contact-us-with-details

## Built to the pillars

- **Native CSS.** The details are an address holding a description list, so email, phone and place are terms with values rather than a list of icons; the form is a native form named by its own h3, with the email and message required.
- **Modern CSS.** The section paints the subtle surface and is the container; at 44rem of its own width the inner element splits 2:3, and the Card is scoped from its own root so the section's rule never reaches inside it.
- **Composition.** Card is rendered as the form through its render prop, so the surface and the form are one element; the Fields, Input, Textarea and Button inside are core parts past the donut, and the example adds only the heading and the actions row.
- **Contextualism.** The actions row declares --loam-context: primary because the one Button is the form's action; primary is the brand slot, neutral until a theme fills it, so the declaration says where the action belongs, not that it stands out.
- **Accessible & gatekept.** The glyphs sit inside the terms and are aria-hidden, so a screen reader hears Email, then the address; the tint behind the section gets a border in forced colours.

## Example.tsx

```tsx
"use client";

import { Button, Card, Field, Input, Textarea } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="contact-us-with-details" aria-labelledby="contact-us-with-details-title">
      <div className="inner">
        <div className="details">
          <h2 id="contact-us-with-details-title">Contact us</h2>
          <p>
            Ask about an order, a variety, or a place on a workshop. The nursery answers email on
            Tuesdays and Fridays.
          </p>
          <address>
            <dl>
              <div className="pair">
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
                  <a href="mailto:hello@hedgerow.coop">hello@hedgerow.coop</a>
                </dd>
              </div>
              <div className="pair">
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
                  <a href="tel:+441588640210">01588 640210</a>
                </dd>
              </div>
              <div className="pair">
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
              <div className="pair">
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
        <Card
          render={
            <form
              className="form"
              action="/contact"
              method="post"
              aria-labelledby="contact-us-with-details-form"
            />
          }
        >
          <h3 id="contact-us-with-details-form">Send a message</h3>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Field.Description>Only used to reply.</Field.Description>
            <Input name="email" type="email" autoComplete="email" inputMode="email" required />
          </Field.Root>
          <Field.Root>
            <Field.Label>Message</Field.Label>
            <Textarea name="message" rows={5} required />
          </Field.Root>
          <div className="actions">
            <Button type="submit">Send message</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.contact-us-with-details) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    padding: var(--loam-space-xl);
  }

  /* The inner element is the grid: an element cannot answer its own
     container query. */
  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
  }

  div.details {
    align-content: start;
    display: block grid;
    gap: var(--loam-space-md);

    > p {
      color: var(--loam-color-fg-muted);
      margin: 0;
      max-inline-size: var(--loam-measure);
      text-wrap: pretty;
    }
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
  }

  address {
    font-style: normal;
  }

  dl {
    display: block grid;
    gap: var(--loam-space-md);
    margin: 0;
  }

  div.pair {
    display: block grid;
    gap: var(--loam-space-xs);
  }

  dt {
    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-xs);

    svg {
      block-size: 1.125em;
      color: var(--loam-color-primary-strong);
      inline-size: 1.125em;
    }
  }

  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  @container (inline-size >= 44rem) {
    div.inner {
      align-items: start;
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    }
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }
  }
}

@scope (.contact-us-with-details form.form) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  div.actions {
    --loam-context: primary;

    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md);
  }
}
```

