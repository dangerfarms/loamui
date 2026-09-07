"use client";

import { Button, Price } from "@loamui/core";
import { SummaryList } from "@loamui/ui";
import type { Composition } from "./types";

const summaryList: Composition = {
  slug: "summary-list",
  name: "Summary list",
  category: "Data display",
  description:
    "Label/value rows, each with an optional note and action: the answers about to be submitted, an order's details and its money lines, the facts of an account.",
  lead: "The root is a description list, so each label and its value are associated and the pair reads as one thing. The action is a real link in the row and its accessible name says what it changes, Change name rather than Change, because a page of identical Change links tells a screen reader user nothing about where each goes. A row with no action keeps the column so values align; a note explains a value on the page rather than in a tooltip; the item that sums the others is marked total and set apart by a rule and weight while its label says so; a missing value is written, Not provided, rather than left blank; long values wrap and nothing truncates.",
  importLine: `import { SummaryList } from "@loamui/ui";`,
  parts: [
    {
      name: "SummaryList.Root",
      description:
        "The unit: a dl holding the items. Stands alone anywhere. Pass label to name it when a page holds more than one, or aria-labelledby for the heading above it.",
    },
    {
      name: "SummaryList.Item",
      description:
        "One pair: a div grouping a Label, its Value and, optionally, a Note and its Actions. Give the item that sums the others className total.",
    },
    {
      name: "SummaryList.Label",
      description: "What the value is (Name, Date of birth, Total), a dt. Comes first in the item.",
    },
    {
      name: "SummaryList.Value",
      description:
        "The value, a dd: text, a short ul when the answer is several things, a core Price. Write Not provided when there is no value.",
    },
    {
      name: "SummaryList.Note",
      description:
        "Optional. One short line explaining the value, a small muted dd under it: the free-delivery threshold, tax included, a delivery estimate.",
    },
    {
      name: "SummaryList.Actions",
      description:
        "The item's actions, a dd holding an Action or a Button. Leave it out of an item that cannot be changed.",
    },
    {
      name: "SummaryList.Action",
      description:
        "An a whose visible text is its children and whose label completes the accessible name: children Change and label name read as Change name. Pass render for a button.",
    },
  ],
  demos: [
    {
      title: "Check your answers",
      description:
        "Four answers, each with a Change link back to its question. Every link reads Change on screen and Change name, Change date of birth, and so on to assistive technology, so each one says where it goes. The last answer is several things, written as a list.",
      code: `<SummaryList.Root>
  <SummaryList.Item>
    <SummaryList.Label>Name</SummaryList.Label>
    <SummaryList.Value>Sarah Bloom</SummaryList.Value>
    <SummaryList.Actions>
      <SummaryList.Action href="#name" label="name">Change</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Date of birth</SummaryList.Label>
    <SummaryList.Value>12 March 1990</SummaryList.Value>
    <SummaryList.Actions>
      <SummaryList.Action href="#date-of-birth" label="date of birth">Change</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Email address</SummaryList.Label>
    <SummaryList.Value>sarah.bloom@example.com</SummaryList.Value>
    <SummaryList.Actions>
      <SummaryList.Action href="#email" label="email address">Change</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Contact preferences</SummaryList.Label>
    <SummaryList.Value>
      <ul>
        <li>Email</li>
        <li>Text message</li>
      </ul>
    </SummaryList.Value>
    <SummaryList.Actions>
      <SummaryList.Action href="#contact" label="contact preferences">Change</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
</SummaryList.Root>`,
      render: () => (
        <SummaryList.Root>
          <SummaryList.Item>
            <SummaryList.Label>Name</SummaryList.Label>
            <SummaryList.Value>Sarah Bloom</SummaryList.Value>
            <SummaryList.Actions>
              <SummaryList.Action href="#name" label="name">
                Change
              </SummaryList.Action>
            </SummaryList.Actions>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Date of birth</SummaryList.Label>
            <SummaryList.Value>12 March 1990</SummaryList.Value>
            <SummaryList.Actions>
              <SummaryList.Action href="#date-of-birth" label="date of birth">
                Change
              </SummaryList.Action>
            </SummaryList.Actions>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Email address</SummaryList.Label>
            <SummaryList.Value>sarah.bloom@example.com</SummaryList.Value>
            <SummaryList.Actions>
              <SummaryList.Action href="#email" label="email address">
                Change
              </SummaryList.Action>
            </SummaryList.Actions>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Contact preferences</SummaryList.Label>
            <SummaryList.Value>
              <ul>
                <li>Email</li>
                <li>Text message</li>
              </ul>
            </SummaryList.Value>
            <SummaryList.Actions>
              <SummaryList.Action href="#contact" label="contact preferences">
                Change
              </SummaryList.Action>
            </SummaryList.Actions>
          </SummaryList.Item>
        </SummaryList.Root>
      ),
    },
    {
      title: "Without actions",
      description:
        "An order's details: nothing here can be changed, so no item has an Actions part and the list is labels and values alone. The total is a Price, which takes the row's type and fixes its figures.",
      code: `<SummaryList.Root>
  <SummaryList.Item>
    <SummaryList.Label>Order number</SummaryList.Label>
    <SummaryList.Value>LU-48213</SummaryList.Value>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Placed</SummaryList.Label>
    <SummaryList.Value>4 September 2026</SummaryList.Value>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Delivery address</SummaryList.Label>
    <SummaryList.Value>
      1 Example Street
      <br />
      London EC1A 1AA
    </SummaryList.Value>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Total</SummaryList.Label>
    <SummaryList.Value>
      <Price value={42.5} currency="GBP" />
    </SummaryList.Value>
  </SummaryList.Item>
</SummaryList.Root>`,
      render: () => (
        <SummaryList.Root>
          <SummaryList.Item>
            <SummaryList.Label>Order number</SummaryList.Label>
            <SummaryList.Value>LU-48213</SummaryList.Value>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Placed</SummaryList.Label>
            <SummaryList.Value>4 September 2026</SummaryList.Value>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Delivery address</SummaryList.Label>
            <SummaryList.Value>
              1 Example Street
              <br />
              London EC1A 1AA
            </SummaryList.Value>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Total</SummaryList.Label>
            <SummaryList.Value>
              <Price value={42.5} currency="GBP" />
            </SummaryList.Value>
          </SummaryList.Item>
        </SummaryList.Root>
      ),
    },
    {
      title: "Not provided",
      description:
        "A missing answer is written, not left blank, so the reader knows it is absent rather than the page broken; its action is Add, named for the field. The reference cannot be changed, so its item has no action and the column stays empty; the values still align.",
      code: `<SummaryList.Root>
  <SummaryList.Item>
    <SummaryList.Label>Name</SummaryList.Label>
    <SummaryList.Value>Sarah Bloom</SummaryList.Value>
    <SummaryList.Actions>
      <SummaryList.Action href="#name" label="name">Change</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Phone number</SummaryList.Label>
    <SummaryList.Value>Not provided</SummaryList.Value>
    <SummaryList.Actions>
      <SummaryList.Action href="#phone" label="phone number">Add</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Reference</SummaryList.Label>
    <SummaryList.Value>LU-48213</SummaryList.Value>
  </SummaryList.Item>
</SummaryList.Root>`,
      render: () => (
        <SummaryList.Root>
          <SummaryList.Item>
            <SummaryList.Label>Name</SummaryList.Label>
            <SummaryList.Value>Sarah Bloom</SummaryList.Value>
            <SummaryList.Actions>
              <SummaryList.Action href="#name" label="name">
                Change
              </SummaryList.Action>
            </SummaryList.Actions>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Phone number</SummaryList.Label>
            <SummaryList.Value>Not provided</SummaryList.Value>
            <SummaryList.Actions>
              <SummaryList.Action href="#phone" label="phone number">
                Add
              </SummaryList.Action>
            </SummaryList.Actions>
          </SummaryList.Item>
          <SummaryList.Item>
            <SummaryList.Label>Reference</SummaryList.Label>
            <SummaryList.Value>LU-48213</SummaryList.Value>
          </SummaryList.Item>
        </SummaryList.Root>
      ),
    },
    {
      title: "Order summary",
      description:
        "The money lines of a checkout are a summary list, not a table: two columns of label and amount are pairs, not a grid to compare across. Every amount is a core Price, so the figures are lining and tabular and the number is machine-readable; the discount is negative and written with its minus, so a reader who sees it knows it was taken off. The delivery estimate is a Note under its amount, on the page rather than in a tooltip. The total is an Item with className total, heavier under a stronger rule, and its label says Total, so nothing is hidden that the page does not show. The delivery can still be changed, so it has an action named for it. The buttons beneath are your own row of core Buttons, the main one in a primary region.",
      code: `<h2 id="order">Your order</h2>
<SummaryList.Root aria-labelledby="order">
  <SummaryList.Item>
    <SummaryList.Label>Subtotal</SummaryList.Label>
    <SummaryList.Value>
      <Price value={42.5} currency="GBP" />
    </SummaryList.Value>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Delivery</SummaryList.Label>
    <SummaryList.Value>
      <Price value={3.99} currency="GBP" />
    </SummaryList.Value>
    <SummaryList.Note>Arrives Thursday 10 September; free over £50</SummaryList.Note>
    <SummaryList.Actions>
      <SummaryList.Action href="#delivery" label="delivery">Change</SummaryList.Action>
    </SummaryList.Actions>
  </SummaryList.Item>
  <SummaryList.Item>
    <SummaryList.Label>Discount</SummaryList.Label>
    <SummaryList.Value>
      <Price value={-5} currency="GBP" />
    </SummaryList.Value>
  </SummaryList.Item>
  <SummaryList.Item className="total">
    <SummaryList.Label>Total</SummaryList.Label>
    <SummaryList.Value>
      <Price value={41.49} currency="GBP" />
    </SummaryList.Value>
    <SummaryList.Note>Includes VAT at 20%</SummaryList.Note>
  </SummaryList.Item>
</SummaryList.Root>
<div style={{ display: "flex", flexWrap: "wrap", gap: "var(--loam-space-sm)", marginBlockStart: "var(--loam-space-lg)" }}>
  <span style={{ "--loam-context": "primary" }}>
    <Button>Continue to payment</Button>
  </span>
  <Button>Back to basket</Button>
</div>`,
      render: () => (
        <>
          <h2 id="order">Your order</h2>
          <SummaryList.Root aria-labelledby="order">
            <SummaryList.Item>
              <SummaryList.Label>Subtotal</SummaryList.Label>
              <SummaryList.Value>
                <Price value={42.5} currency="GBP" />
              </SummaryList.Value>
            </SummaryList.Item>
            <SummaryList.Item>
              <SummaryList.Label>Delivery</SummaryList.Label>
              <SummaryList.Value>
                <Price value={3.99} currency="GBP" />
              </SummaryList.Value>
              <SummaryList.Note>Arrives Thursday 10 September; free over £50</SummaryList.Note>
              <SummaryList.Actions>
                <SummaryList.Action href="#delivery" label="delivery">
                  Change
                </SummaryList.Action>
              </SummaryList.Actions>
            </SummaryList.Item>
            <SummaryList.Item>
              <SummaryList.Label>Discount</SummaryList.Label>
              <SummaryList.Value>
                <Price value={-5} currency="GBP" />
              </SummaryList.Value>
            </SummaryList.Item>
            <SummaryList.Item className="total">
              <SummaryList.Label>Total</SummaryList.Label>
              <SummaryList.Value>
                <Price value={41.49} currency="GBP" />
              </SummaryList.Value>
              <SummaryList.Note>Includes VAT at 20%</SummaryList.Note>
            </SummaryList.Item>
          </SummaryList.Root>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--loam-space-sm)",
              marginBlockStart: "var(--loam-space-lg)",
            }}
          >
            <span style={{ "--loam-context": "primary" } as React.CSSProperties}>
              <Button>Continue to payment</Button>
            </span>
            <Button>Back to basket</Button>
          </div>
        </>
      ),
    },
  ],
  whenToUse: [
    "The answers a person is about to submit, each with a Change link back to its question, so a mistake is caught before it is sent.",
    "A short set of facts read top to bottom: an order's details, a booking, an account's settings, a record's fields.",
    "The money lines of a basket, checkout or receipt: what was added up, what was taken off, and what it comes to, with the total marked.",
  ],
  whenNotToUse: [
    "Tabular data with many rows and columns to compare; that is a Table. A summary list is one record's labels and values, not a set of records.",
    "The questions themselves; a form takes answers, a summary list shows them. Send each Change link back to the form.",
    "The items of a basket, with a picture, a quantity and a price each; those are cart lines. A summary list is the arithmetic under them.",
  ],
};

export default summaryList;
