"use client";

import { Field, Select } from "@loamui/core";

const countryOptions = (
  <>
    <option>Canada</option>
    <option>United Kingdom</option>
    <option>United States</option>
  </>
);

export function SelectBasicDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Select>{countryOptions}</Select>
      </Field.Root>
    </div>
  );
}

export function SelectPlaceholderDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Select placeholder="Pick a country">
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="us">United States</option>
        </Select>
      </Field.Root>
    </div>
  );
}

export function SelectGroupsDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Instrument</Field.Label>
        <Select>
          <optgroup label="Strings">
            <option>Violin</option>
            <option>Cello</option>
          </optgroup>
          <optgroup label="Brass">
            <option>Trumpet</option>
            <option disabled>Tuba (unavailable)</option>
          </optgroup>
        </Select>
      </Field.Root>
    </div>
  );
}

export function SelectErrorDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Field.Error>Select a country</Field.Error>
        <Select placeholder="Pick a country">{countryOptions}</Select>
      </Field.Root>
    </div>
  );
}

export function SelectDescriptionDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Field.Description>Where you are resident for tax.</Field.Description>
        <Select>
          <option>United States</option>
          <option>Canada</option>
        </Select>
      </Field.Root>
    </div>
  );
}
