---
title: Order summary
description: The money lines of a basket: subtotal, delivery with a note, a discount, a total set apart, and the way on to payment.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Order summary

The money lines of a basket: subtotal, delivery with a note, a discount, a total set apart, and the way on to payment.

An example in **Commerce**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Price`, `SignpostLink`
- Tags: basket, checkout, receipt, money, commerce
- Live: https://loamui.com/examples/commerce/order-summary

## Built to the pillars

- **Native CSS.** A description list under a heading that names it: each line is a term and its amount, the note is a second description of the delivery line, and the total is one more row rather than a different element.
- **Modern CSS.** Every row is a subgrid of the list, so the amounts share a column and stack on their decimal; the total's weight and heavier rule are one nested rule on the row.
- **Composition.** Each amount is a Price, a data element whose text is written for people and whose value is the number, so a script can read the total the page shows; the example only places it.
- **Accessible & gatekept.** The total is named Total in words, not only by weight, the delivery note sits on the page rather than in a tooltip, and going on to payment is a link, because it goes somewhere.

## Example.tsx

```tsx
import { Price, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="order-summary" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title">Your order</h2>
      <dl>
        <div className="row">
          <dt>Subtotal</dt>
          <dd className="value">
            <Price value={46.5} currency="GBP" />
          </dd>
        </div>
        <div className="row">
          <dt>Delivery</dt>
          <dd className="value">
            <Price value={3.99} currency="GBP" />
          </dd>
          <dd className="note">Royal Mail 48, arriving Thursday 10 September. Free over £50.</dd>
          <dd className="change">
            <a href="/basket/delivery">
              Change<span className="loam-VisuallyHidden"> delivery</span>
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Member discount</dt>
          <dd className="value">
            <Price value={-4.65} currency="GBP" />
          </dd>
        </div>
        <div className="row total">
          <dt>Total</dt>
          <dd className="value">
            <Price value={45.84} currency="GBP" />
          </dd>
        </div>
      </dl>
      <div className="actions">
        <SignpostLink href="/checkout/payment">Continue to payment</SignpostLink>
        <a href="/basket">Back to your basket</a>
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.order-summary) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-md);
    max-inline-size: 36rem;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin: 0;
  }

  dl {
    display: block grid;
    grid-template-columns: 1fr auto auto;
    margin: 0;
  }

  dt {
    color: var(--loam-color-fg-strong);
    font-weight: 600;
  }

  dd {
    margin: 0;

    &.value {
      grid-column: 2;
      text-align: end;
    }

    &.note {
      color: var(--loam-color-fg-muted);
      font-size: var(--loam-text-sm);
      grid-column: 1 / -1;
      margin-block-start: var(--loam-space-xs);
    }

    &.change {
      grid-column: 3;
      grid-row: 1;
      white-space: nowrap;
    }
  }

  div.row {
    border-block-end: 1px solid var(--loam-color-line);
    column-gap: var(--loam-space-lg);
    display: block grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    padding-block: var(--loam-space-sm);

    &.total {
      border-block-start: var(--loam-ring-width) solid var(--loam-color-line-strong);
      margin-block-start: var(--loam-space-xs);

      dt,
      dd.value {
        color: var(--loam-color-fg-strong);
        font-size: var(--loam-text-lg);
        font-weight: 700;
      }
    }
  }

  div.actions {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-md) var(--loam-space-lg);
    margin-block-start: var(--loam-space-xs);
  }

  /* A container query is answered by an ancestor, never by the element that
     declares it. */
  @container (inline-size < 24rem) {
    dl {
      grid-template-columns: 1fr auto;
    }

    dd.change {
      grid-column: 2;
      grid-row: auto;
      text-align: end;
    }
  }
}
```

