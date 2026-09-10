---
title: Simple FAQ
description: Four questions under a heading, each a native disclosure sharing one name so only one answer is open at a time.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Simple FAQ

Four questions under a heading, each a native disclosure sharing one name so only one answer is open at a time.

An example in **FAQ**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Details`
- Tags: faq, accordion, questions, disclosure, help
- Live: https://loamui.com/examples/faq/faq-simple

## Built to the pillars

- **Native CSS.** Each question is a details element with the question as its summary: the browser owns the toggle, the keyboard support and, through the shared name, the rule that opening one closes the rest, with no state in the page.
- **Modern CSS.** The example is a grid of gaps and nothing more; the surface, line, chevron and open state are the Details' own, and its open animation is gated on interpolate-size by core, not here.
- **Composition.** Details.Root, Summary and Content as core ships them, four times over with one name; the example's rule stops at each root.
- **Accessible & gatekept.** Four short questions is where an exclusive set fits: a long FAQ is better as headings with a table of contents, as the Details guide says, because an answer that is closed is an answer that may never be read.

## Example.tsx

```tsx
"use client";

import { Details } from "@loamui/core";
import "./example.css";

const QUESTIONS = [
  {
    question: "How long does seed keep?",
    answer:
      "Most vegetable seed keeps three to five years in a cool, dry drawer. Parsnip, onion and leek are the exception and are best sown the year after harvest. The harvest year is printed on every packet.",
  },
  {
    question: "Can I save seed from what I grow?",
    answer:
      "Yes. Everything in the catalogue is open-pollinated, so seed saved from the best plants comes true the next year. The guide in each packet says how far apart to keep it from its relatives.",
  },
  {
    question: "When do orders go out?",
    answer:
      "Seed is packed on Mondays and Thursdays and posted the same day, second class. Bare-root fruit is lifted and posted in November and December only, once the leaves are down.",
  },
  {
    question: "What does membership cost?",
    answer:
      "Forty-eight pounds a year for a household, which brings twelve packets from the catalogue, the swap bench and the workshops. A plot on a member field is a separate arrangement with the field.",
  },
];

export default function Example() {
  return (
    <section className="faq-simple" aria-labelledby="faq-simple-title">
      <h2 id="faq-simple-title">Frequently asked questions</h2>
      <p className="description">
        The four things people ask the bench most often. For anything else, write to{" "}
        <a href="mailto:hello@hedgerow.coop">hello@hedgerow.coop</a>.
      </p>
      <div className="questions">
        {QUESTIONS.map((item) => (
          <Details.Root key={item.question} name="faq-simple">
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
@scope (.faq-simple) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-md);
  }

  h2 {
    font-size: var(--loam-text-2xl);
    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.questions {
    display: block grid;
    gap: var(--loam-space-sm);
    margin-block-start: var(--loam-space-sm);
  }
}
```

