---
title: FAQ with image
description: Four questions as one exclusive set of disclosures beside an illustration, which drops below them when there is no room.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# FAQ with image

Four questions as one exclusive set of disclosures beside an illustration, which drops below them when there is no room.

An example in **FAQ**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Details`
- Tags: faq, accordion, questions, illustration, help
- Live: https://loamui.com/examples/faq/faq-with-image

## Built to the pillars

- **Native CSS.** A section named by its h2 with a details element per question; the illustration is inline SVG in currentColor, so it needs no image file and takes the scheme with the words.
- **Modern CSS.** One column below 48rem of the section's own width with the picture ordered last, then a 1:2 split with the picture first and sticky at the top, so it keeps the questions company as they open.
- **Composition.** The picture is the only thing added: an inline svg the grid places beside four Details that keep every rule core gives them.
- **Accessible & gatekept.** The illustration is aria-hidden and comes after the questions in source, so a screen reader and a narrow screen both meet the questions first; in forced colours the fills go to Canvas and the lines to CanvasText.

## Example.tsx

```tsx
"use client";

import { Details } from "@loamui/core";
import "./example.css";

const QUESTIONS = [
  {
    question: "How deep do I sow?",
    answer:
      "Twice the seed's own width is the rule, so a bean goes in a thumb deep and a lettuce barely under the surface. The packet gives the depth for that variety.",
  },
  {
    question: "Indoors or straight in the ground?",
    answer:
      "Tender crops such as tomatoes, squash and beans start indoors in April and go out after the last frost. Roots, peas and salads are sown where they will grow.",
  },
  {
    question: "When is the last frost here?",
    answer:
      "In the Shropshire hills, the third week of May most years, and later on a north slope. The sowing calendar is set for the nursery, so add a week for a colder plot.",
  },
  {
    question: "Why did my seedlings go leggy?",
    answer:
      "Not enough light for the warmth they had. Move them to the brightest sill, keep the room cooler at night, and pot on deeper, burying the stem up to the first leaves.",
  },
];

export default function Example() {
  return (
    <section className="faq-with-image" aria-labelledby="faq-with-image-title">
      <div className="inner">
        <svg
          className="illustration"
          viewBox="0 0 240 240"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path className="fill" d="M56 104h96v88a12 12 0 0 1-12 12H68a12 12 0 0 1-12-12Z" />
          <path d="M152 124l40-28a10 10 0 0 1 14 14l-8 8" />
          <path className="fill" d="M198 118a12 12 0 1 1 8-8Z" />
          <path d="M56 128h96" />
          <path d="M104 104V80a24 24 0 0 0-48 0v24" />
          <path d="M40 64 26 44M56 58l-6-24M72 64l10-22" />
          <path className="fill" d="M120 178c0-10 6-16 16-16 0 10-6 16-16 16Z" />
          <path className="fill" d="M120 186c0-8-5-12-12-12 0 8 5 12 12 12Z" />
          <path d="M120 204v-34" />
        </svg>
        <div className="text">
          <h2 id="faq-with-image-title">Sowing questions</h2>
          <p>
            The questions every packet's guide answers, gathered in one place for the first week of
            spring.
          </p>
          <div className="questions">
            {QUESTIONS.map((item) => (
              <Details.Root key={item.question} name="faq-with-image">
                <Details.Summary>{item.question}</Details.Summary>
                <Details.Content>
                  <p>{item.answer}</p>
                </Details.Content>
              </Details.Root>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.faq-with-image) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    padding-block: var(--loam-space-xl);
  }

  /* The inner element is the grid: an element cannot answer its own
     container query. */
  div.inner {
    display: block grid;
    gap: var(--loam-space-xl);
  }

  svg.illustration {
    block-size: auto;
    color: var(--loam-color-primary-strong);
    inline-size: 100%;
    justify-self: center;
    max-inline-size: 16rem;

    .fill {
      fill: var(--loam-color-primary-soft);
    }
  }

  div.text {
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

  div.questions {
    display: block grid;
    gap: var(--loam-space-sm);
    margin-block-start: var(--loam-space-sm);
  }

  /* Below the questions it is decoration in the way; it waits for a column. */
  @container (inline-size < 48rem) {
    svg.illustration {
      display: none;
    }
  }

  @container (inline-size >= 48rem) {
    div.inner {
      align-items: start;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    }

    svg.illustration {
      inset-block-start: var(--loam-space-lg);
      max-inline-size: 20rem;
      position: sticky;
    }
  }

  /* Forced colours drop the tint; the drawing is its lines in CanvasText. */
  @media (forced-colors: active) {
    svg.illustration {
      color: CanvasText;

      .fill {
        fill: Canvas;
      }
    }
  }
}
```

