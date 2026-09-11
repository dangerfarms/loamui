---
title: Cart line
description: One item in a basket: a thumbnail, the product linked to its page, the options chosen, a quantity control, the total with the unit price under it, and a way to remove it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Cart line

One item in a basket: a thumbnail, the product linked to its page, the options chosen, a quantity control, the total with the unit price under it, and a way to remove it.

An example in **Commerce**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`, `Field`, `Price`, `QuantityInput`
- Tags: basket, cart, quantity, line item, checkout
- Live: https://loamui.com/examples/commerce/cart-line

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Quantities, totals, removal and undo work locally. Supply product data, replace the product link, and persist basket changes in your application. Prices and stock must be confirmed by your checkout service.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The line is an article named by its heading, the quantity is one native number input inside a labelled Field, and each amount is a data element carrying the number.
- **Modern CSS.** Named grid areas place every part, and a narrower line rearranges them by container query: the totals fold under the name and the control shares the last row with the remove action.
- **Composition.** QuantityInput self-wires from the Field around it, so the label, id and any error reach the input without a prop; the example derives its Price from the valid quantity and unit price.
- **Contextualism.** The remove action is a neutral Button on purpose: taking a packet out of a basket is not a destructive act, so it is not in a danger region.
- **Accessible & gatekept.** The Field's label is real text hidden from view, so a screen reader hears "Quantity of Climbing bean ‘Blue Lake’ seeds" rather than "Quantity" three times in a basket, and the remove button names the product the same way; the thumbnail's alt is empty because the name is beside it.

## Example.tsx

```tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button, Field, Price, QuantityInput } from "@loamui/core";
import "./example.css";

const UNIT_PRICE_PENCE = 280;

export default function Example() {
  const title = useId();
  const [draft, setDraft] = useState("2");
  const [error, setError] = useState(false);
  const [removed, setRemoved] = useState(false);
  const undo = useRef<HTMLButtonElement>(null);
  const quantityInput = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef(false);
  const quantity = Number(draft);
  const valid = draft !== "" && Number.isInteger(quantity) && quantity >= 1 && quantity <= 10;

  useEffect(() => {
    if (removed) undo.current?.focus();
    else if (restoreFocus.current) {
      quantityInput.current?.focus();
      restoreFocus.current = false;
    }
  }, [removed]);

  if (removed)
    return (
      <div className="cart-line">
        <p role="status">Climbing bean ‘Blue Lake’ seeds removed from your basket.</p>
        <Button
          ref={undo}
          onClick={() => {
            restoreFocus.current = true;
            setRemoved(false);
          }}
        >
          Undo removal
        </Button>
      </div>
    );
  return (
    <article className="cart-line" aria-labelledby={title}>
      <div className="inner">
        <img
          className="media"
          src="https://picsum.photos/id/627/300/300"
          alt=""
          width="300"
          height="300"
        />
        <h3 id={title}>
          <a href="/seeds/climbing-bean-blue-lake">Climbing bean ‘Blue Lake’ seeds</a>
        </h3>
        <p className="options">Packet of 25 seeds</p>
        <div className="control">
          <Field.Root>
            <Field.Label className="loam-VisuallyHidden">
              Quantity of Climbing bean ‘Blue Lake’ seeds
            </Field.Label>
            <Field.Error>{error ? "Enter a whole quantity from 1 to 10." : null}</Field.Error>
            <QuantityInput
              name="quantity"
              ref={quantityInput}
              value={draft}
              min={1}
              max={10}
              required
              onChange={(event) => {
                setDraft(event.currentTarget.value);
                setError(false);
              }}
              onBlur={() => setError(!valid)}
            />
          </Field.Root>
        </div>
        <p className="total" aria-live="polite" aria-atomic="true">
          <span className="loam-VisuallyHidden">Line total: </span>
          {valid ? (
            <Price value={(quantity * UNIT_PRICE_PENCE) / 100} currency="GBP" locale="en-GB" />
          ) : (
            "—"
          )}
        </p>
        <p className="each">
          <Price value={UNIT_PRICE_PENCE / 100} currency="GBP" locale="en-GB">
            each
          </Price>
        </p>
        <div className="actions">
          <Button onClick={() => setRemoved(true)}>
            Remove<span className="loam-VisuallyHidden"> Climbing bean ‘Blue Lake’ seeds</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
```

## example.css

```css
@scope (.cart-line) to ([class*="loam-"]) {
  :scope {
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    padding-block: var(--loam-space-md);
  }

  /* The inner element is the grid: an element cannot answer its own
     container query. */
  div.inner {
    align-items: start;
    column-gap: var(--loam-space-md);
    display: block grid;
    grid-template-areas:
      "media title total"
      "media options each"
      "media control actions";
    grid-template-columns: auto 1fr auto;
  }

  img.media {
    aspect-ratio: 1;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    grid-area: media;
    inline-size: 5rem;
    object-fit: cover;
  }

  h3 {
    font-size: var(--loam-text-md);
    grid-area: title;
    margin: 0;

    a {
      color: inherit;
    }
  }

  p.options {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    grid-area: options;
    margin-block: var(--loam-space-xs) 0;
  }

  div.control {
    grid-area: control;
    margin-block-start: var(--loam-space-sm);
  }

  p.total {
    font-weight: 600;
    grid-area: total;
    justify-self: end;
    margin: 0;
  }

  p.each {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    grid-area: each;
    justify-self: end;
    margin-block: var(--loam-space-xs) 0;
  }

  div.actions {
    grid-area: actions;
    justify-self: end;
    margin-block-start: var(--loam-space-sm);
  }

  @container (inline-size < 30rem) {
    div.inner {
      grid-template-areas:
        "media title title"
        "media options options"
        "media total total"
        "media each each"
        "media control actions";
    }

    p.total,
    p.each {
      justify-self: start;
    }

    p.total {
      margin-block-start: var(--loam-space-xs);
    }
  }
}
```

