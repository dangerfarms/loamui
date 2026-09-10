"use client";

import { useId } from "react";
import { Button, Field, Price, QuantityInput } from "@loamui/core";
import "./example.css";

export default function Example() {
  const title = useId();
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
            Remove<span className="loam-VisuallyHidden"> Climbing bean ‘Blue Lake’ seeds</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
