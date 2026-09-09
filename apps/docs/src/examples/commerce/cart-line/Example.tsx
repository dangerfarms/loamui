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
