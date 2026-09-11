---
title: Address fields
description: A postal address asked for line by line under one legend, each line carrying the autofill purpose a browser fills a saved address into.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Address fields

A postal address asked for line by line under one legend, each line carrying the autofill purpose a browser fills a saved address into.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Field`, `Fieldset`, `Input`, `Select`
- Tags: address, checkout, delivery, shipping, autofill, postcode
- Live: https://loamui.com/examples/forms/address-fields

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A native fieldset named by its legend, and one input per part of the address: a single multi-line box cannot be autofilled, validated or read back a part at a time. Every purpose carries "section-delivery shipping", so a browser fills this group from the saved delivery address and leaves a billing group on the same page alone.
- **Modern CSS.** The lines are a grid of the example's own inside the Fieldset, so the group spaces itself as a form spaces its fields without touching the Fieldset's own stack.
- **Composition.** Each line is a core Field around a core Input or Select; the example fixes only the order and the purposes; the words are the reader's, so a US form swaps City, State and ZIP code onto the same lines.
- **Accessible & gatekept.** The order is the one autofill and the reader both expect: street, town, region, code, country. The postcode is a text field, never numeric, because a UK postcode carries letters and a space and a numeric keypad would strip a leading zero; its short box says what length of answer fits. The country starts on a disabled prompt so a skipped line submits nothing rather than the first country in the list.

## Example.tsx

```tsx
"use client";

import { Field, Fieldset, Input, Select } from "@loamui/core";
import "./example.css";

const COUNTRIES = ["United Kingdom", "Ireland", "France", "Netherlands", "Germany", "Denmark"];

export default function Example() {
  return (
    <Fieldset.Root className="address-fields">
      <Fieldset.Legend>Delivery address</Fieldset.Legend>
      <div className="lines">
        <Field.Root>
          <Field.Label>Address line 1</Field.Label>
          <Field.Description>Include your flat number if you have one.</Field.Description>
          <Input
            name="addressLine1"
            autoComplete="section-delivery shipping address-line1"
            required
          />
        </Field.Root>
        <Field.Root>
          <Field.Label optional>Address line 2</Field.Label>
          <Input name="addressLine2" autoComplete="section-delivery shipping address-line2" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Town or city</Field.Label>
          <Input name="town" autoComplete="section-delivery shipping address-level2" required />
        </Field.Root>
        <Field.Root>
          <Field.Label optional>County</Field.Label>
          <Input name="region" autoComplete="section-delivery shipping address-level1" />
        </Field.Root>
        <div className="postcode">
          <Field.Root>
            <Field.Label>Postcode</Field.Label>
            <Input
              name="postcode"
              autoComplete="section-delivery shipping postal-code"
              autoCapitalize="characters"
              spellCheck={false}
              required
            />
          </Field.Root>
        </div>
        <Field.Root>
          <Field.Label>Country</Field.Label>
          <Select name="country" autoComplete="section-delivery shipping country-name" required>
            <option value="" disabled>
              Choose a country
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </Field.Root>
      </div>
    </Fieldset.Root>
  );
}
```

## example.css

```css
@scope (.address-fields) to ([class*="loam-"]) {
  div.lines {
    display: block grid;
    gap: var(--loam-space-lg);
  }

  div.postcode {
    max-inline-size: 12rem;
  }
}
```

