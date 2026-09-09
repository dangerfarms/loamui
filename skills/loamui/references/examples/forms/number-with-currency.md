---
title: Number with currency
description: An amount box with the currency's symbol in its start section and a select of currencies beside it, in one row: the label names the amount, the select names itself.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Number with currency

An amount box with the currency's symbol in its start section and a select of currencies beside it, in one row: the label names the amount, the select names itself.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Input`, `Select`
- Tags: currency, amount, money, number, select, gift card
- Live: https://loamui.com/examples/forms/number-with-currency

## Built to the pillars

- **Native CSS.** The amount is a text input with inputMode="decimal", so a phone offers the number pad and a decimal point without the spinner a type="number" box would add; the currency is a native <select> whose options are the three ISO codes, submitted under their own name.
- **Modern CSS.** The row is a two-track grid with the select's track sized to its content; the symbol in the box is one span that changes with the select, so no width is reserved for the widest currency.
- **Composition.** Core keeps buttons and selects beside a box rather than inside it, so the two share the derived control height and the box keeps its padding; the symbol is a startSection, the one adornment that belongs in the box.
- **Accessible & gatekept.** The Field's label names the amount and its description says the bounds; the select carries its own name, Currency, in an aria-label, because it is a second control and a screen reader reaches it as one. The symbol in the box is aria-hidden: it repeats what the select already says.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Field, Input, Select } from "@loamui/core";
import "./example.css";

const CURRENCIES = [
  { code: "GBP", symbol: "£", name: "Pounds sterling" },
  { code: "EUR", symbol: "€", name: "Euros" },
  { code: "USD", symbol: "$", name: "US dollars" },
];

export default function Example() {
  const [currency, setCurrency] = useState("GBP");
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol;

  return (
    <Field.Root className="number-with-currency">
      <Field.Label>Amount</Field.Label>
      <Field.Description>
        Gift cards are sold in three currencies, from 10 to 200.
      </Field.Description>
      <div className="row">
        <Input
          name="amount"
          inputMode="decimal"
          autoComplete="off"
          startSection={<span aria-hidden="true">{symbol}</span>}
        />
        <Select
          name="currency"
          aria-label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.currentTarget.value)}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </Select>
      </div>
    </Field.Root>
  );
}
```

## example.css

```css
/* The root is the core Field, which stacks the label, the description and
   the row. The row is the example's: a grid whose first track takes the
   width and whose second shrink-wraps the Select, so the box and the
   select share the derived control height without a rule on either. Both
   are core parts past the donut. */
@scope (.number-with-currency) to ([class*="loam-"]) {
  div.row {
    align-items: end;
    display: block grid;
    gap: var(--loam-space-sm);
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
```

