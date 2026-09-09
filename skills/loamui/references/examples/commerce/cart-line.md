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

## Built to the pillars

- **Native CSS.** The line is an article named by its heading, the quantity is one native number input inside a labelled Field, and each amount is a data element carrying the number.
- **Modern CSS.** Named grid areas place every part, and a narrower line rearranges them by container query: the totals fold under the name and the control shares the last row with the remove action.
- **Composition.** QuantityInput self-wires from the Field around it, so the label, id and any error reach the input without a prop; the line does no arithmetic, and the total is a Price the page computes.
- **Contextualism.** The remove action is a neutral Button on purpose: taking a packet out of a basket is not a destructive act, so it is not in a danger region.
- **Accessible & gatekept.** The Field's label is real text hidden from view, so a screen reader hears "Quantity of Sweet pea ‘Cupani’ seeds" rather than "Quantity" three times in a basket, and the remove button names the product the same way; the thumbnail's alt is empty because the name is beside it.

## Example.tsx

```tsx
"use client";

import { Button, Field, Price, QuantityInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <article className="cart-line" aria-labelledby="cart-line-title">
      <div className="inner">
        <img
          className="media"
          src="https://picsum.photos/seed/hedgerow-sweet-pea/300/300"
          alt=""
          width="300"
          height="300"
        />
        <h3 id="cart-line-title">
          <a href="/seeds/sweet-pea-cupani">Sweet pea ‘Cupani’ seeds</a>
        </h3>
        <p className="options">Packet of 25 seeds</p>
        <div className="control">
          <Field.Root>
            <Field.Label className="loam-VisuallyHidden">
              Quantity of Sweet pea ‘Cupani’ seeds
            </Field.Label>
            <QuantityInput name="quantity" defaultValue={2} min={1} max={10} />
          </Field.Root>
        </div>
        <p className="total">
          <Price value={5.6} currency="GBP" locale="en-GB" />
        </p>
        <p className="each">
          <Price value={2.8} currency="GBP" locale="en-GB">
            each
          </Price>
        </p>
        <div className="actions">
          <Button>
            Remove<span className="loam-VisuallyHidden"> Sweet pea ‘Cupani’ seeds</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
```

## example.css

```css
/* One line of a basket: a thumbnail beside the name, options and
   quantity, with the total, its unit price and the remove action in an
   end column. The article is the container and the inner element is the
   grid, because an element cannot answer its own container query. The
   donut keeps the Field, the QuantityInput, the Prices and the Button on
   their own styles. Every part has a named area, so a line written
   without one of them leaves no hole. */
@scope (.cart-line) to ([class*="loam-"]) {
  :scope {
    /* The separator is a border, so forced colours keep it. */
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    padding-block: var(--loam-space-md);
  }

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

  /* The name is the link and keeps its underline: the row holds a
     control the link must read apart from. */
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

  /* The total sits beside the name, at the end, with the unit price under
     it in the small muted text, and the remove action ends the last row. */
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

  /* Narrow: the end column folds under the text, the total and the unit
     price back at the start, and the control shares the last row with
     the remove action. The article answers; the inner grid changes. */
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

