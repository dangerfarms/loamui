---
title: FAQ with page header
description: A help page: a header with the ways to reach a person and the hours they keep, then five questions as one exclusive set of disclosures.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# FAQ with page header

A help page: a header with the ways to reach a person and the hours they keep, then five questions as one exclusive set of disclosures.

An example in **FAQ**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Details`
- Tags: faq, help, support, contact, page header
- Live: https://loamui.com/examples/faq/faq-page-header

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its h1, because this opens a page; the ways to reach us are an address element with mailto and tel links, and each question is a details element sharing one name.
- **Modern CSS.** The section is the container: at 44rem of its own width the header becomes two columns and the contact block sits beside the intro at its own width, ending at the header's end edge in either writing direction.
- **Composition.** Five Details and no other component: the header is the example's own markup, an intro beside an address that holds a list of links and the opening hours.
- **Accessible & gatekept.** The contact block comes before the questions so the way to a person is not hidden below five closed answers; the glyphs are aria-hidden beside links that say what they are, and the tint gets a border in forced colours.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Details } from "@loamui/core";
import "./example.css";

const QUESTIONS = [
  {
    question: "Where is my order?",
    answer:
      "Seed goes second class on the Monday or Thursday after you order and takes two to four working days. If it has been a week, write to the bench with the order number and we will send it again.",
  },
  {
    question: "Can I change an order after placing it?",
    answer:
      "Until it is packed, yes. Reply to the confirmation email with what to add or take off and we adjust the charge before it goes out.",
  },
  {
    question: "How do I renew or cancel membership?",
    answer:
      "Membership renews on the anniversary of joining and we write a fortnight before. Cancel by replying to that email or from the membership page; nothing is charged after that.",
  },
  {
    question: "Do you offer trade or bulk prices?",
    answer:
      "Growers, community gardens and shops can order in bulk at a trade rate from a hundred packets. Write to the bench with what you need and we quote from that season's stock.",
  },
  {
    question: "Are the workshops accessible?",
    answer:
      "The polytunnel and the classroom are level from the car park, with step-free access and a hearing loop. The field walks cross rough ground; tell us when booking and we plan a route.",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <section className="faq-page-header" aria-labelledby={`${instanceId}-faq-page-header-title`}>
      <header>
        <div className="intro">
          <h1 id={`${instanceId}-faq-page-header-title`}>Help and support</h1>
          <p>
            Answers to the questions the bench is asked most, and the ways to reach a person when
            the answer is not here.
          </p>
        </div>
        <address className="contact">
          <ul role="list">
            <li>
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
              <a href="mailto:hello@hedgerow.coop">hello@hedgerow.coop</a>
            </li>
            <li>
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
              <a href="tel:+441588640210">01588 640210</a>
            </li>
          </ul>
          <p className="hours">
            Wednesday to Sunday, 10am to 4pm. Email is read on Tuesdays and Fridays.
          </p>
        </address>
      </header>
      <div className="questions">
        {QUESTIONS.map((item) => (
          <Details.Root key={item.question} name="faq-page-header">
            <Details.Summary>{item.question}</Details.Summary>
            <Details.Content>
              <p>{item.answer}</p>
            </Details.Content>
          </Details.Root>
        ))}
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.faq-page-header) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-xl);
  }

  header {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  div.intro {
    display: block grid;
    gap: var(--loam-space-sm);

    > p {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-lg);
      margin: 0;
      max-inline-size: var(--loam-measure);
      text-wrap: pretty;
    }
  }

  h1 {
    font-size: var(--loam-text-3xl);
    margin: 0;
  }

  address.contact {
    align-content: start;
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-lg);
    display: block grid;
    font-style: normal;
    gap: var(--loam-space-sm);
    padding: var(--loam-space-lg);
  }

  ul {
    display: block grid;
    gap: var(--loam-space-xs);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    margin: 0;

    svg {
      block-size: 1.125em;
      color: var(--loam-color-primary-strong);
      flex: none;
      inline-size: 1.125em;
    }
  }

  p.hours {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
    text-wrap: pretty;
  }

  div.questions {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  @container (inline-size >= 44rem) {
    header {
      align-items: start;
      grid-template-columns: minmax(0, 1fr) minmax(16rem, 2fr);
    }

    address.contact {
      grid-column: 2;
      justify-self: end;
      max-inline-size: 22rem;
    }
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    address.contact {
      border: 1px solid CanvasText;
    }
  }
}
```

