"use client";

import { Field } from "@loamui/core";
import { AddressFields } from "@loamui/ui";
import type { Composition } from "./types";

const countries = ["France", "Germany", "Ireland", "Netherlands", "Spain", "United Kingdom"];

const addressFields: Composition = {
  slug: "address-fields",
  name: "Address fields",
  category: "Forms",
  description:
    "The fields for a postal address: a Fieldset with one labelled line per part, each carrying its autofill purpose.",
  lead: "A fieldset named by its legend and one core Field per line of the address, never one multi-line box: a single box cannot be autofilled, validated or read back a part at a time. Each line carries the autofill purpose browsers look for, in the order they and the reader expect, and the postcode's slot is capped short so its width says what length of answer fits. Only the words are yours: every part takes a label in the reader's language, and you render only the lines the address needs.",
  importLine: `import { AddressFields } from "@loamui/ui";`,
  parts: [
    {
      name: "AddressFields.Root",
      description:
        'A core Fieldset with the legend you pass, so the lines are announced as one group named for whose address it is: "Your address", "Delivery address". The lines sit in the composition\'s own grid inside it, spaced as a form spaces its fields. On a form that asks for two addresses, section="shipping" or "billing" prefixes every line\'s purpose so a saved address fills the right group.',
    },
    {
      name: "AddressFields.Line1",
      description:
        "The building and street. A Field around an Input with the address-line1 purpose; name defaults to addressLine1. Any other Field part, a Field.Description most often, goes in as children and is wired to the input by the Field.",
    },
    {
      name: "AddressFields.Line2",
      description:
        "A second street line, marked optional in its label by default: a flat, a locality. address-line2.",
    },
    {
      name: "AddressFields.Town",
      description:
        'The town or city, address-level2. "Town or city" by default; "City" in a US form.',
    },
    {
      name: "AddressFields.Region",
      description:
        'The county, state or province, address-level1, optional by default. "County" by default; "State" in a US form. Omit it where the country has none.',
    },
    {
      name: "AddressFields.Postcode",
      description:
        "The postcode or ZIP code, postal-code, in a slot capped at 12rem. A text input, never numeric: UK postcodes carry letters and a space, and a numeric keypad would strip a leading zero.",
    },
    {
      name: "AddressFields.Country",
      description:
        "A Select, country-name, starting on a prompt rather than the first name in the list so a reader who skips it submits nothing, not the wrong country. Pass countries as the names the reader would say, which is what the purpose matches on, or your own options as children when the values must be codes or the list has groups. Omit it on a domestic form.",
    },
  ],
  demos: [
    {
      title: "A UK address",
      description:
        "Every line with its default label. The optional lines say so in words rather than the others carrying an asterisk, required lives on the control where the browser validates it after a submit attempt, and a browser with a saved address fills all six lines from any one of them.",
      code: `<AddressFields.Root legend="Your address">
  <AddressFields.Line1 required />
  <AddressFields.Line2 />
  <AddressFields.Town required />
  <AddressFields.Region />
  <AddressFields.Postcode required />
  <AddressFields.Country countries={countries} required />
</AddressFields.Root>`,
      render: () => (
        <AddressFields.Root legend="Your address">
          <AddressFields.Line1 required />
          <AddressFields.Line2 />
          <AddressFields.Town required />
          <AddressFields.Region />
          <AddressFields.Postcode required />
          <AddressFields.Country countries={countries} required />
        </AddressFields.Root>
      ),
    },
    {
      title: "A US address",
      description:
        "The same parts with the reader's words: City, State and ZIP code are labels on the same lines, so the autofill purposes and the order do not change. State is required here, so it drops the optional marker. There is no locale prop; the words are the whole difference.",
      code: `<AddressFields.Root legend="Shipping address">
  <AddressFields.Line1 label="Street address" />
  <AddressFields.Line2 label="Apartment, suite or unit" />
  <AddressFields.Town label="City" />
  <AddressFields.Region label="State" optional={false} />
  <AddressFields.Postcode label="ZIP code" />
</AddressFields.Root>`,
      render: () => (
        <AddressFields.Root legend="Shipping address">
          <AddressFields.Line1 label="Street address" />
          <AddressFields.Line2 label="Apartment, suite or unit" />
          <AddressFields.Town label="City" />
          <AddressFields.Region label="State" optional={false} />
          <AddressFields.Postcode label="ZIP code" />
        </AddressFields.Root>
      ),
    },
    {
      title: "A delivery address",
      description:
        'One of two addresses on a checkout, so the Root takes section="shipping" and every purpose becomes "shipping address-line1", "shipping postal-code" and so on: a browser then fills this group from the saved delivery address and leaves the billing group for its own. The first line explains itself with a Field.Description passed as its children, wired to the input by the Field like any description, so a screen reader hears it before typing. The country is a list of your own options, grouped, with codes as values; without countries the Select takes them as children.',
      code: `<AddressFields.Root legend="Delivery address" section="shipping">
  <AddressFields.Line1 required>
    <Field.Description>Include your flat number if you have one.</Field.Description>
  </AddressFields.Line1>
  <AddressFields.Line2 />
  <AddressFields.Town required />
  <AddressFields.Postcode required />
  <AddressFields.Country required>
    <optgroup label="Europe">
      <option value="FR">France</option>
      <option value="IE">Ireland</option>
      <option value="GB">United Kingdom</option>
    </optgroup>
    <optgroup label="North America">
      <option value="CA">Canada</option>
      <option value="US">United States</option>
    </optgroup>
  </AddressFields.Country>
</AddressFields.Root>`,
      render: () => (
        <AddressFields.Root legend="Delivery address" section="shipping">
          <AddressFields.Line1 required>
            <Field.Description>Include your flat number if you have one.</Field.Description>
          </AddressFields.Line1>
          <AddressFields.Line2 />
          <AddressFields.Town required />
          <AddressFields.Postcode required />
          <AddressFields.Country required>
            <optgroup label="Europe">
              <option value="FR">France</option>
              <option value="IE">Ireland</option>
              <option value="GB">United Kingdom</option>
            </optgroup>
            <optgroup label="North America">
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </optgroup>
          </AddressFields.Country>
        </AddressFields.Root>
      ),
    },
    {
      title: "With errors",
      description:
        'After a failed submit. An error on a part renders a Field.Error before its input, marks that input invalid and is announced; the other lines stay valid and keep what was typed. Each message says what to do in the words of its label, never "invalid" or "required".',
      code: `<AddressFields.Root legend="Your address">
  <AddressFields.Line1 defaultValue="12 Loam Lane" />
  <AddressFields.Line2 />
  <AddressFields.Town error="Enter your town or city" />
  <AddressFields.Postcode error="Enter your postcode" />
</AddressFields.Root>`,
      render: () => (
        <AddressFields.Root legend="Your address">
          <AddressFields.Line1 defaultValue="12 Loam Lane" />
          <AddressFields.Line2 />
          <AddressFields.Town error="Enter your town or city" />
          <AddressFields.Postcode error="Enter your postcode" />
        </AddressFields.Root>
      ),
    },
  ],
  whenToUse: [
    "Anywhere a form asks where to send something or where someone lives: a checkout, an account, a booking. The lines, their purposes and their order are the part a form gets wrong on its own.",
    "An address in another country's shape: pass the reader's labels, drop Region where there are none, and the same parts serve.",
  ],
  whenNotToUse: [
    "A single free-text location, a city for a weather forecast or a place name in a search: that is one Input with a label, not a group of lines.",
    "An address lookup that finds the whole address from a postcode: that is a Search in front of these fields, which then show the result for the reader to check and correct, not a replacement for them.",
  ],
};

export default addressFields;
