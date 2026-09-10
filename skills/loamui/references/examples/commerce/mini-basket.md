---
title: Mini basket
description: A basket button with a count that opens a Drawer holding the lines, an order summary and the way to checkout.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Mini basket

A basket button with a count that opens a Drawer holding the lines, an order summary and the way to checkout.

An example in **Commerce**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`, `Button`, `Drawer`, `Field`, `Price`, `QuantityInput`, `SignpostLink`
- Tags: cart, drawer, checkout, side panel, basket
- Live: https://loamui.com/examples/commerce/mini-basket

## Built to the pillars

- **Native CSS.** The panel is a native dialog opened with showModal(), so the top layer, focus containment, Escape and focus return come from the browser; the summary is a description list and going to checkout is a link.
- **Modern CSS.** The panel's width is one custom property set on the root, which the dialog inherits from its place in the DOM even though it paints in the top layer; no rule reaches past the Drawer's donut, so the basket's parts open their own scope inside it.
- **Composition.** Drawer's parts, a Field around each QuantityInput, Prices, Badge and SignpostLink are arranged in the example's own markup; the two lines are the Cart Line example folded for a narrow panel.
- **Accessible & gatekept.** The trigger is named "Basket 2 items" through hidden text after the count, the close button is icon-only but named "Close basket", every quantity and remove control names its product, and the dialog is named by its title.

## Example.tsx

```tsx
"use client";

import { Badge, Button, Drawer, Field, Price, QuantityInput, SignpostLink } from "@loamui/core";
import "./example.css";

const LINES = [
  {
    slug: "climbing-bean-blue-lake",
    name: "Climbing bean ‘Blue Lake’ seeds",
    options: "Packet of 25 seeds",
    image: 627,
    each: 2.8,
    quantity: 2,
  },
  {
    slug: "raspberry-autumn-bliss",
    name: "Raspberry ‘Autumn Bliss’ canes",
    options: "Bundle of five",
    image: 429,
    each: 24,
    quantity: 1,
  },
];

const SUBTOTAL = LINES.reduce((sum, line) => sum + line.each * line.quantity, 0);
const DELIVERY = 3.95;

export default function Example() {
  return (
    <div className="mini-basket">
      <Drawer.Root>
        <Drawer.Trigger>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9h18l-2 11H5z" />
            <path d="M8 9V6a4 4 0 0 1 8 0v3" />
          </svg>
          Basket
          <Badge>
            {LINES.length}
            <span className="loam-VisuallyHidden"> items</span>
          </Badge>
        </Drawer.Trigger>
        <Drawer.Popup side="end">
          <div className="basket">
            <div className="head">
              <Drawer.Title>Your basket</Drawer.Title>
              <Drawer.Close>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
                <span className="loam-VisuallyHidden">Close basket</span>
              </Drawer.Close>
            </div>
            <ul className="lines" role="list">
              {LINES.map((line) => (
                <li key={line.slug}>
                  <article aria-labelledby={`mini-basket-${line.slug}-title`}>
                    <img
                      className="media"
                      src={`https://picsum.photos/id/${line.image}/240/240`}
                      alt=""
                      width="240"
                      height="240"
                    />
                    <h3 id={`mini-basket-${line.slug}-title`}>
                      <a href={`/shop/${line.slug}`}>{line.name}</a>
                    </h3>
                    <p className="options">{line.options}</p>
                    <div className="control">
                      <Field.Root>
                        <Field.Label className="loam-VisuallyHidden">
                          Quantity of {line.name}
                        </Field.Label>
                        <QuantityInput
                          name={`quantity-${line.slug}`}
                          defaultValue={line.quantity}
                          min={1}
                          max={10}
                        />
                      </Field.Root>
                    </div>
                    <p className="total">
                      <Price value={line.each * line.quantity} currency="GBP" locale="en-GB" />
                    </p>
                    <div className="remove">
                      <Button>
                        Remove<span className="loam-VisuallyHidden"> {line.name}</span>
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <dl className="summary">
              <div>
                <dt>Subtotal</dt>
                <dd>
                  <Price value={SUBTOTAL} currency="GBP" locale="en-GB" />
                </dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>
                  <Price value={DELIVERY} currency="GBP" locale="en-GB" />
                </dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>
                  <Price value={SUBTOTAL + DELIVERY} currency="GBP" locale="en-GB" />
                </dd>
              </div>
            </dl>
            <div className="actions">
              <SignpostLink href="/checkout">Go to checkout</SignpostLink>
              <Drawer.Close>Continue shopping</Drawer.Close>
            </div>
          </div>
        </Drawer.Popup>
      </Drawer.Root>
    </div>
  );
}
```

## example.css

```css
@scope (.mini-basket) to ([class*="loam-"]) {
  :scope {
    /* Inherits into the dialog from here, top layer or not. */
    --loam-drawer-size: 28rem;
  }
}

@scope (.mini-basket div.basket) to ([class*="loam-"]) {
  :scope {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  div.head {
    align-items: center;
    display: block flex;
    gap: var(--loam-space-sm);
    justify-content: space-between;

    h2 {
      margin: 0;
    }
  }

  ul.lines {
    display: block grid;
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
      margin: 0;

      + li {
        border-block-start: 1px solid var(--loam-color-line);
        margin-block-start: var(--loam-space-md);
        padding-block-start: var(--loam-space-md);
      }
    }
  }

  article {
    align-items: start;
    column-gap: var(--loam-space-sm);
    display: block grid;
    grid-template-areas:
      "media title total"
      "media options options"
      "media control remove";
    grid-template-columns: auto 1fr auto;
  }

  img.media {
    aspect-ratio: 1;
    block-size: auto;
    border-radius: var(--loam-radius-md);
    grid-area: media;
    inline-size: 4rem;
    object-fit: cover;
  }

  h3 {
    font-size: var(--loam-text-sm);
    font-weight: 600;
    grid-area: title;
    margin: 0;

    a {
      color: inherit;
    }
  }

  p.options {
    color: var(--loam-color-fg-muted);
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

  div.remove {
    grid-area: remove;
    margin-block-start: var(--loam-space-sm);
    place-self: end;
  }

  dl.summary {
    display: block grid;
    gap: var(--loam-space-xs);
    margin: 0;

    > div {
      display: block flex;
      justify-content: space-between;

      &:last-child {
        border-block-start: 1px solid var(--loam-color-line);
        font-size: var(--loam-text-md);
        font-weight: 700;
        margin-block-start: var(--loam-space-xs);
        padding-block-start: var(--loam-space-sm);
      }
    }

    dt {
      color: var(--loam-color-fg-muted);
    }

    dd {
      margin: 0;
    }
  }

  div.actions {
    display: block grid;
    gap: var(--loam-space-sm);
  }
}
```

