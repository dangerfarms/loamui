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

## Built to the pillars

- **Native CSS.** A native form that submits the email to its action: Enter in the box or the button sends it, with required and type=email catching a slip before anything is posted.
- **Modern CSS.** The section paints the subtle surface and is the container: at 40rem of its own width the illustration takes a column beside the words, and below it is left out rather than pushed under the form.
- **Composition.** Field, Input and Button as core ships them; the field and the button share one derived height, so aligning the row to its end puts the button level with the box under the label without a number.
- **Accessible & gatekept.** The box has a visible label, not a placeholder standing in for one; the illustration is aria-hidden; and the tint gets a border in forced colours with the drawing's fills going to Canvas.

## Example.tsx

```tsx
"use client";

import { Button, Field, Input } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="email-banner" aria-labelledby="email-banner-title">
      <div className="inner">
        <div className="text">
          <h2 id="email-banner-title">The sowing letter</h2>
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
/* A newsletter bar: what the letter is, one field, one action, and a
   picture that keeps it company where there is room. The section paints
   the subtle surface and is the container; the inner element is the
   grid, because an element cannot answer its own container query. */
@scope (.email-banner) to ([class*="loam-"]) {
  :scope {
    background: var(--loam-color-bg-subtle);
    border-radius: var(--loam-radius-xl);
    container-type: inline-size;
    padding: var(--loam-space-xl);
  }

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

  /* The field takes the slack and the Button keeps its width beside it,
     level with the box: the Field is a core part past the donut, so a
     wrapper of the example's own carries the flex. Inputs and buttons
     share one derived height, so aligning to the end lines them up
     under the label without a number. */
  form {
    align-items: end;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    margin-block-start: var(--loam-space-xs);
    max-inline-size: 30rem;
  }

  /* The field grows a thousand times faster than the action, so on one
     line the Button keeps its own width, and on a line of its own, once
     the row has wrapped, it takes the whole line. */
  div.grow {
    flex: 999 1 14rem;
  }

  /* The one action is the form's primary one, so its cell is a primary
     region and the Button takes the colour from where it sits. */
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

  /* Wide: the picture beside the words; narrow leaves it out, since a
     decoration below a form is a reason to scroll, not a reason to sign
     up. */
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

  /* Forced colours: the tints go, so the block keeps an edge and the
     drawing is its lines in the system text colour. */
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

