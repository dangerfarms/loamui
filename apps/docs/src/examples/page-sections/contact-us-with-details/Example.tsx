"use client";

import { useId } from "react";
import { Button, Card, Field, Input, Textarea } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <section
      className="contact-us-with-details"
      aria-labelledby={`${instanceId}-contact-us-with-details-title`}
    >
      <div className="inner">
        <div className="details">
          <h2 id={`${instanceId}-contact-us-with-details-title`}>Contact us</h2>
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
              aria-labelledby={`${instanceId}-contact-us-with-details-form`}
            />
          }
        >
          <h3 id={`${instanceId}-contact-us-with-details-form`}>Send a message</h3>
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
