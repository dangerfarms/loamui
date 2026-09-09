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
