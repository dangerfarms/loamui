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
