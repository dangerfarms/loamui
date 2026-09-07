"use client";

import { Button, Field, Price, QuantityInput } from "@loamui/core";
import { CartLine } from "@loamui/ui";
import type { Composition } from "./types";

interface LineProps {
  slug: string;
  product: string;
  options: string;
  name: string;
  quantity: number;
  unit: number;
}

function line({ slug, product, options, name, quantity, unit }: LineProps) {
  return (
    <CartLine.Root render={<li />}>
      <CartLine.Media>
        <img
          src={`https://picsum.photos/seed/loam-${slug}/320/320`}
          alt=""
          width="320"
          height="320"
        />
      </CartLine.Media>
      <CartLine.Title>
        <a href={`/products/${slug}`}>{product}</a>
      </CartLine.Title>
      <CartLine.Description>{options}</CartLine.Description>
      <CartLine.Control>
        <Field.Root>
          <Field.Label className="loam-VisuallyHidden">Quantity for {product}</Field.Label>
          <QuantityInput name={name} defaultValue={quantity} min={1} max={10} />
        </Field.Root>
      </CartLine.Control>
      <CartLine.Value>
        <Price value={unit * quantity} currency="GBP" />
      </CartLine.Value>
      <CartLine.Note>
        <Price value={unit} currency="GBP">
          each
        </Price>
      </CartLine.Note>
      <CartLine.Actions>
        <Button onClick={() => {}}>
          Remove<span className="loam-VisuallyHidden"> {product}</span>
        </Button>
      </CartLine.Actions>
    </CartLine.Root>
  );
}

const cartLine: Composition = {
  slug: "cart-line",
  name: "Cart line",
  category: "Data display",
  description:
    "One item in a basket: image, linked title, the options chosen, a slot for your QuantityInput, the line total with the unit price under it, and a remove action.",
  lead: 'The unit is the line, an article named by its title, so a screen reader\'s list of the page\'s articles reads "Linen shirt", "Wool socks" rather than "article", "article"; a basket is a ul you write with each line a li. The quantity is your own core QuantityInput inside a Field whose label is the product\'s name in core\'s loam-VisuallyHidden class, so a screen reader hears "Quantity for Linen shirt" and not "Quantity" three times in a row; the remove Button in Actions names the product the same way. The line does no arithmetic: the total is a Price you compute, with the unit price as a Note under it, so the figure on screen is the figure the server charged.',
  importLine: `import { CartLine } from "@loamui/ui";\nimport { Button, Field, Price, QuantityInput } from "@loamui/core";`,
  parts: [
    {
      name: "CartLine.Root",
      description:
        "The line: a grid of thumbnail, text column and end column, separated from the next by a rule. An article by default, named by its Title through aria-labelledby while one is rendered (your own aria-label wins); pass render={<li />} inside a basket's list. Declares its own container.",
    },
    {
      name: "CartLine.Media",
      description:
        "The product's picture: your img, sized to a square thumbnail. Give it an empty alt; the name is text beside it, and a screen reader should hear it once.",
    },
    {
      name: "CartLine.Title",
      description:
        "The product's name around your link to its page. An h3 by default; pass render={<p />} where the line is not a section of the page. Its id, yours or the composition's, is what names the line.",
    },
    {
      name: "CartLine.Description",
      description: 'The options chosen ("Size M, Blue"), a small muted line under the name.',
    },
    {
      name: "CartLine.Control",
      description:
        "Hosts your core QuantityInput in a Field.Root, its Field.Label the product's name in the loam-VisuallyHidden class: \"Quantity for Linen shirt\". Give the input min 1, since zero of a thing is the remove action. The control is core's, left as core styles it.",
    },
    {
      name: "CartLine.Value",
      description:
        "The line total: a core Price you compute. The composition does no arithmetic, so what is shown is what is charged.",
    },
    {
      name: "CartLine.Note",
      description:
        'Optional. One short line under the total explaining it: the unit price, a core Price with "each" as its children, so the qualifier is visible and the unit price is never mistaken for the total.',
    },
    {
      name: "CartLine.Actions",
      description:
        'Your core Button that removes the line, reading "Remove" with the product\'s name after it in the loam-VisuallyHidden class. Pass onClick, or render={<button type="submit" name="remove" value={id} />} on the Button to make it a form\'s own.',
    },
  ],
  demos: [
    {
      title: "One line",
      description:
        'A line needs no list: the single item in a mini-basket, or a line on an order confirmation. The QuantityInput is labelled "Quantity for Linen shirt" and the button is named "Remove Linen shirt"; neither label is on screen because the name already is. The article is named by the title.',
      code: `<CartLine.Root>
  <CartLine.Media>
    <img src="https://picsum.photos/seed/loam-shirt/320/320" alt="" width="320" height="320" />
  </CartLine.Media>
  <CartLine.Title>
    <a href="/products/linen-shirt">Linen shirt</a>
  </CartLine.Title>
  <CartLine.Description>Size M, Blue</CartLine.Description>
  <CartLine.Control>
    <Field.Root>
      <Field.Label className="loam-VisuallyHidden">Quantity for Linen shirt</Field.Label>
      <QuantityInput name="quantity" defaultValue={2} min={1} max={10} />
    </Field.Root>
  </CartLine.Control>
  <CartLine.Value>
    <Price value={90} currency="GBP" />
  </CartLine.Value>
  <CartLine.Note>
    <Price value={45} currency="GBP">each</Price>
  </CartLine.Note>
  <CartLine.Actions>
    <Button onClick={() => {}}>
      Remove<span className="loam-VisuallyHidden"> Linen shirt</span>
    </Button>
  </CartLine.Actions>
</CartLine.Root>`,
      render: () => (
        <CartLine.Root>
          <CartLine.Media>
            <img
              src="https://picsum.photos/seed/loam-shirt/320/320"
              alt=""
              width="320"
              height="320"
            />
          </CartLine.Media>
          <CartLine.Title>
            <a href="/products/linen-shirt">Linen shirt</a>
          </CartLine.Title>
          <CartLine.Description>Size M, Blue</CartLine.Description>
          <CartLine.Control>
            <Field.Root>
              <Field.Label className="loam-VisuallyHidden">Quantity for Linen shirt</Field.Label>
              <QuantityInput name="quantity" defaultValue={2} min={1} max={10} />
            </Field.Root>
          </CartLine.Control>
          <CartLine.Value>
            <Price value={90} currency="GBP" />
          </CartLine.Value>
          <CartLine.Note>
            <Price value={45} currency="GBP">
              each
            </Price>
          </CartLine.Note>
          <CartLine.Actions>
            <Button onClick={() => {}}>
              Remove<span className="loam-VisuallyHidden"> Linen shirt</span>
            </Button>
          </CartLine.Actions>
        </CartLine.Root>
      ),
    },
    {
      title: "A basket",
      description:
        "Three lines in a list you wrote: a ul with its markers and padding removed, each line rendered as a li, named by its title. The rule under each line separates it from the next; the totals beneath a basket are a SummaryList. Narrow the page and the total, its unit price and the remove action fold under the text.",
      code: `<ul aria-label="Your basket" style={{ listStyle: "none", margin: 0, padding: 0 }}>
  <CartLine.Root render={<li />}>
    <CartLine.Media>
      <img src="https://picsum.photos/seed/loam-shirt/320/320" alt="" width="320" height="320" />
    </CartLine.Media>
    <CartLine.Title>
      <a href="/products/linen-shirt">Linen shirt</a>
    </CartLine.Title>
    <CartLine.Description>Size M, Blue</CartLine.Description>
    <CartLine.Control>
      <Field.Root>
        <Field.Label className="loam-VisuallyHidden">Quantity for Linen shirt</Field.Label>
        <QuantityInput name="quantity[shirt]" defaultValue={2} min={1} max={10} />
      </Field.Root>
    </CartLine.Control>
    <CartLine.Value>
      <Price value={90} currency="GBP" />
    </CartLine.Value>
    <CartLine.Note>
      <Price value={45} currency="GBP">each</Price>
    </CartLine.Note>
    <CartLine.Actions>
      <Button onClick={() => {}}>
        Remove<span className="loam-VisuallyHidden"> Linen shirt</span>
      </Button>
    </CartLine.Actions>
  </CartLine.Root>
  <CartLine.Root render={<li />}>
    <CartLine.Media>
      <img src="https://picsum.photos/seed/loam-socks/320/320" alt="" width="320" height="320" />
    </CartLine.Media>
    <CartLine.Title>
      <a href="/products/wool-socks">Wool socks</a>
    </CartLine.Title>
    <CartLine.Description>One size, Charcoal</CartLine.Description>
    <CartLine.Control>
      <Field.Root>
        <Field.Label className="loam-VisuallyHidden">Quantity for Wool socks</Field.Label>
        <QuantityInput name="quantity[socks]" defaultValue={3} min={1} max={10} />
      </Field.Root>
    </CartLine.Control>
    <CartLine.Value>
      <Price value={37.5} currency="GBP" />
    </CartLine.Value>
    <CartLine.Note>
      <Price value={12.5} currency="GBP">each</Price>
    </CartLine.Note>
    <CartLine.Actions>
      <Button onClick={() => {}}>
        Remove<span className="loam-VisuallyHidden"> Wool socks</span>
      </Button>
    </CartLine.Actions>
  </CartLine.Root>
  <CartLine.Root render={<li />}>
    <CartLine.Media>
      <img src="https://picsum.photos/seed/loam-belt/320/320" alt="" width="320" height="320" />
    </CartLine.Media>
    <CartLine.Title>
      <a href="/products/leather-belt">Leather belt</a>
    </CartLine.Title>
    <CartLine.Description>85 cm, Tan</CartLine.Description>
    <CartLine.Control>
      <Field.Root>
        <Field.Label className="loam-VisuallyHidden">Quantity for Leather belt</Field.Label>
        <QuantityInput name="quantity[belt]" defaultValue={1} min={1} max={10} />
      </Field.Root>
    </CartLine.Control>
    <CartLine.Value>
      <Price value={38} currency="GBP" />
    </CartLine.Value>
    <CartLine.Note>
      <Price value={38} currency="GBP">each</Price>
    </CartLine.Note>
    <CartLine.Actions>
      <Button onClick={() => {}}>
        Remove<span className="loam-VisuallyHidden"> Leather belt</span>
      </Button>
    </CartLine.Actions>
  </CartLine.Root>
</ul>`,
      render: () => (
        <ul aria-label="Your basket" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {line({
            slug: "shirt",
            product: "Linen shirt",
            options: "Size M, Blue",
            name: "quantity[shirt]",
            quantity: 2,
            unit: 45,
          })}
          {line({
            slug: "socks",
            product: "Wool socks",
            options: "One size, Charcoal",
            name: "quantity[socks]",
            quantity: 3,
            unit: 12.5,
          })}
          {line({
            slug: "belt",
            product: "Leather belt",
            options: "85 cm, Tan",
            name: "quantity[belt]",
            quantity: 1,
            unit: 38,
          })}
        </ul>
      ),
    },
  ],
  whenToUse: [
    "A basket or cart page where a shopper changes quantities and removes items before paying: each line is one form control and one action, named after the product so they read apart from each other.",
    "A mini-basket in a Drawer or Popover, where one or two lines and their totals confirm what was just added without leaving the product page.",
  ],
  whenNotToUse: [
    "The subtotal, delivery, tax and total beneath the lines: that is a SummaryList, a description list of figures with its total item marked; a CartLine shows one item's own total and nothing summed.",
    "A product listing or a grid of things to buy: those are ProductCards, with a price and an add action, not a quantity and a remove action; a CartLine describes something already chosen.",
  ],
};

export default cartLine;
