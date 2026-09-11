---
title: Email banner
description: A newsletter signup bar: a title, a line on what the letter is, an email field with its button beside it, and an illustration where there is room.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Email banner

A newsletter signup bar: a title, a line on what the letter is, an email field with its button beside it, and an illustration where there is room.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Field`, `Input`
- Tags: newsletter, subscribe, signup, email, banner
- Live: https://loamui.com/examples/page-sections/email-banner

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A native form that submits the email to its action: Enter in the box or the button sends it, with required and type=email catching a slip before anything is posted.
- **Modern CSS.** The section paints the subtle surface and is the container: at 40rem of its own width the illustration takes a column beside the words, and below it is left out rather than pushed under the form.
- **Composition.** Field, Input and Button as core ships them; the field and the button share one derived height, so aligning the row to its end puts the button level with the box under the label without a number.
- **Contextualism.** The action cell declares --loam-context: primary because the Button is the form's action; primary is the brand slot, neutral until a theme fills it, so the cell says where the action belongs rather than making it stand out.
- **Accessible & gatekept.** The box has a visible label, not a placeholder standing in for one; the illustration is aria-hidden; and the tint gets a border in forced colours with the drawing's fills going to Canvas.

## Example.tsx

```tsx
"use client";

import { useId } from "react";
import { Button, Field, Input } from "@loamui/core";
import "./example.css";

export default function Example() {
  const instanceId = useId();
  return (
    <section className="email-banner" aria-labelledby={`${instanceId}-email-banner-title`}>
      <div className="inner">
        <div className="text">
          <h2 id={`${instanceId}-email-banner-title`}>The sowing letter</h2>
          <p>
            What to sow this week, what is back on the bench, and one grower's note. Sent on Sundays
            from February to October, and never sold on.
          </p>
          <form action="/newsletter" method="post">
            <div className="grow">
              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input name="email" type="email" autoComplete="email" inputMode="email" required />
              </Field.Root>
            </div>
            <span className="action">
              <Button type="submit">Subscribe</Button>
            </span>
          </form>
        </div>
        <svg
          className="illustration"
          viewBox="0 0 240 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path className="fill" d="M32 72 120 24l88 48v96H32Z" />
          <path d="M32 72l88 56 88-56" />
          <path d="M32 168l64-48M208 168l-64-48" />
          <path d="M120 128V88" />
          <path className="fill" d="M120 104c0-16 12-26 30-26 0 16-12 26-30 26Z" />
          <path className="fill" d="M120 116c0-12-9-20-22-20 0 12 9 20 22 20Z" />
        </svg>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.email-banner) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    padding: var(--loam-space-xl);
  }

  /* The inner element is the grid: an element cannot answer its own
     container query. */
  div.inner {
    align-items: center;
    display: block grid;
    gap: var(--loam-space-xl);
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

  form {
    align-items: end;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    margin-block-start: var(--loam-space-xs);
    max-inline-size: 30rem;
  }

  /* Grows a thousand times faster than the action: on one line the Button
     keeps its width; once wrapped, it takes the whole line. */
  div.grow {
    flex: 999 1 14rem;
  }

  span.action {
    --loam-context: primary;

    display: block grid;
    flex: 1 1 auto;
  }

  svg.illustration {
    block-size: auto;
    color: var(--loam-color-primary-strong);
    inline-size: 100%;
    justify-self: center;
    max-inline-size: 14rem;

    .fill {
      fill: var(--loam-color-primary-soft);
    }
  }

  @container (inline-size < 40rem) {
    svg.illustration {
      display: none;
    }
  }

  @container (inline-size >= 40rem) {
    div.inner {
      grid-template-columns: minmax(0, 1fr) auto;
    }
  }

  /* Forced colours drop the tint; the edge keeps the bounds. */
  @media (forced-colors: active) {
    :scope {
      border: 1px solid CanvasText;
    }

    svg.illustration {
      color: CanvasText;

      .fill {
        fill: Canvas;
      }
    }
  }
}
```

