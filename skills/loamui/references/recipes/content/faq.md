---
title: FAQ
description: Four questions as one exclusive set of disclosures on a subtle surface, centred under a heading with room that grows with the section's width.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# FAQ

Four questions as one exclusive set of disclosures on a subtle surface, centred under a heading with room that grows with the section's width.

A recipe in **Content**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Details`
- Tags: faq, accordion, questions, surface, help
- Live: https://loamui.com/recipes/content/faq

## Using this recipe

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## When to use

Use for independent questions whose answers can be disclosed on demand. Keep information needed to complete the current task visible instead.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its h2 with a header for the intro and a details element per question; the shared name makes them exclusive without a line of script.
- **Modern CSS.** The section paints the subtle surface and is its own container: the questions are capped at 44rem and centred, and the padding doubles at 48rem of the section's width, not the viewport's.
- **Composition.** Four Details on one surface: the tint, the radius and the padding are the section's, and each question keeps the Details' own surface, line and chevron untouched.
- **Contextualism.** The block is a plain neutral surface, not a --loam-context region: questions carry no status, so nothing inside should take a status colour.
- **Accessible & gatekept.** The tint gets a border in forced colours so the block still reads as a block, and each Details keeps its own edge either way.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Details } from "@loamui/core";
import "./example.css";

const QUESTIONS = [
  {
    question: "Do you post to Ireland and the Channel Islands?",
    answer:
      "Seed, yes, at the same second-class rate. Bare-root fruit and plants cannot cross the water without a phytosanitary certificate, so they are collected from the nursery or posted within Great Britain only.",
  },
  {
    question: "What if a packet does not come up?",
    answer:
      "Tell us the variety and the harvest year on the packet and we send a replacement from a different batch, or refund it. Germination is tested before listing, but a cold spring can still beat a good batch.",
  },
  {
    question: "Can a school or allotment society join?",
    answer:
      "Yes, as a group member. A group pays the household rate, receives the twelve packets as one parcel and can send up to four people to each workshop.",
  },
  {
    question: "How do I grow something for the bench?",
    answer:
      "Ask at the nursery or write to the bench. A grower takes on one variety, keeps it the required distance from its relatives, and brings the cleaned seed in after harvest for testing.",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <section className="faq" aria-labelledby={`${instanceId}-faq-title`}>
      <div className="inner">
        <header>
          <h2 id={`${instanceId}-faq-title`}>Questions about ordering</h2>
          <p>
            Posting, replacements and joining as a group. Still unsure? The nursery answers the
            phone on open days.
          </p>
        </header>
        <div className="questions">
          {QUESTIONS.map((item) => (
            <Details.Root key={item.question} name={instanceId}>
              <Details.Summary>{item.question}</Details.Summary>
              <Details.Content>
                <p>{item.answer}</p>
              </Details.Content>
            </Details.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.faq) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-xl);
    container: faq / inline-size;
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
    grid-template-columns: minmax(0, 1fr);
    margin-inline: auto;
    max-inline-size: 44rem;
  }

  header {
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    text-align: center;

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
    max-inline-size: 24ch;
    text-wrap: balance;
  }

  div.questions {
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr);
  }

  @container faq (inline-size < 48rem) {
    div.inner {
      padding: var(--loam-space-xl) var(--loam-space-lg);
    }
  }

  @container faq (inline-size >= 48rem) {
    div.inner {
      padding: calc(var(--loam-space-xl) * 2) var(--loam-space-xl);
    }
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }
  }
}
```

