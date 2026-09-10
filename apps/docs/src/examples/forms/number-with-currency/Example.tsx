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
