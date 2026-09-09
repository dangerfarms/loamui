"use client";

import { Badge, Button, Drawer, Field, Price, QuantityInput, SignpostLink } from "@loamui/core";
import "./example.css";

const LINES = [
  {
    slug: "sweet-pea-cupani",
    name: "Sweet pea ‘Cupani’ seeds",
    options: "Packet of 25 seeds",
    image: "hedgerow-sweet-pea",
    each: 2.8,
    quantity: 2,
  },
  {
    slug: "copper-trowel",
    name: "Copper hand trowel",
    options: "Ash handle",
    image: "hedgerow-trowel",
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
                      src={`https://picsum.photos/seed/${line.image}/240/240`}
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
