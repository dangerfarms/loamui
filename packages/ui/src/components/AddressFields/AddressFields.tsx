"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Field, Fieldset, Input, Select, cx } from "@loamui/core";
import type { FieldsetRootProps, InputProps, SelectProps } from "@loamui/core";

/**
 * The fields for a postal address: a `Fieldset` named by its legend and one
 * labelled line per part of the address, each carrying the autofill purpose
 * browsers look for, so a saved address fills every line in one go.
 *
 * The judgment is in what is fixed. An address is asked for line by line,
 * never in one multi-line box: a single box cannot be autofilled, validated
 * or read back a part at a time. The order is fixed too, because autofill
 * and the reader's expectation both follow it: the street, the town, the
 * region, the code, then the country. The postcode's slot is capped at a
 * short width so its length says what kind of answer fits.
 *
 * Only the words are yours. Every part takes a `label` in the reader's
 * language; the defaults are British English, and a US form passes
 * "City", "State" and "ZIP code" to the same parts. Render only the lines
 * you need: a domestic form omits `Country`, a country without regions
 * omits `Region`. A form that asks for two addresses gives each Root a
 * `section`, "shipping" or "billing", and every line's purpose carries
 * it, so autofill keeps the two apart. An `error` on a part renders a
 * `Field.Error` wired to that input; write it in the words of the label
 * ("Enter your postcode"). Any other Field part, a `Field.Description`
 * most often, goes in as the line's children.
 *
 * ```tsx
 * <AddressFields.Root legend="Delivery address" section="shipping">
 *   <AddressFields.Line1 required>
 *     <Field.Description>Include your flat number</Field.Description>
 *   </AddressFields.Line1>
 *   <AddressFields.Line2 />
 *   <AddressFields.Town required />
 *   <AddressFields.Region />
 *   <AddressFields.Postcode required />
 *   <AddressFields.Country countries={countries} required />
 * </AddressFields.Root>
 * ```
 */

/** Which address the group asks for, when a form asks for more than one. */
export type AddressFieldsSection = "shipping" | "billing";

const SectionContext = createContext<AddressFieldsSection | undefined>(undefined);

/** The line's autofill purpose, prefixed with the group's section when it has one. */
function usePurpose(token: string): string {
  const section = useContext(SectionContext);
  return section ? `${section} ${token}` : token;
}

export interface AddressFieldsRootProps extends FieldsetRootProps {
  /** Names the group: "Your address", "Delivery address". */
  legend: ReactNode;
  /**
   * Which address this is, when the form asks for more than one. Prefixed
   * onto every line's autofill purpose ("shipping address-line1"), so a
   * saved address fills the right group.
   */
  section?: AddressFieldsSection;
  children?: ReactNode;
}

/**
 * A core `Fieldset` with the legend, around the composition's own grid of
 * lines. `className` and `style` land on the grid; everything else is the
 * fieldset's own.
 */
function AddressFieldsRoot({
  legend,
  section,
  className,
  style,
  children,
  ...rest
}: AddressFieldsRootProps) {
  return (
    <Fieldset.Root {...rest}>
      <Fieldset.Legend>{legend}</Fieldset.Legend>
      <div className={cx("loam-AddressFields", className)} style={style}>
        <SectionContext value={section}>{children}</SectionContext>
      </div>
    </Fieldset.Root>
  );
}

export interface AddressFieldsLineProps extends Omit<InputProps, "autoComplete"> {
  /** The visible label, in the reader's language. */
  label?: ReactNode;
  /** Say "(optional)" after the label instead of marking the others required. */
  optional?: boolean;
  /**
   * An error for this line, in the words of its label ("Enter your
   * postcode"). Renders a `Field.Error` wired to the input.
   */
  error?: ReactNode;
  /**
   * More parts for the line's Field, rendered between the label and the
   * input: a `Field.Description` ("Include your flat number"), wired to
   * the input by the Field like any other.
   */
  children?: ReactNode;
}

interface LineSpec {
  autoComplete: string;
  name: string;
  label: string;
  optional: boolean;
}

/**
 * One line of the address: a core `Field` around an `Input`. `className`
 * and `style` land on the line; `id` names the input (the Field derives its
 * description and error ids from it); everything else is the input's own.
 */
function AddressLine({
  spec,
  label = spec.label,
  optional = spec.optional,
  error,
  name = spec.name,
  id,
  className,
  style,
  children,
  ...rest
}: AddressFieldsLineProps & { spec: LineSpec }) {
  const autoComplete = usePurpose(spec.autoComplete);
  return (
    <Field.Root id={id} className={className} style={style}>
      <Field.Label optional={optional}>{label}</Field.Label>
      {children}
      <Field.Error>{error}</Field.Error>
      <Input name={name} autoComplete={autoComplete} {...rest} />
    </Field.Root>
  );
}

const LINE1: LineSpec = {
  autoComplete: "address-line1",
  name: "addressLine1",
  label: "Address line 1",
  optional: false,
};
const LINE2: LineSpec = {
  autoComplete: "address-line2",
  name: "addressLine2",
  label: "Address line 2",
  optional: true,
};
const TOWN: LineSpec = {
  autoComplete: "address-level2",
  name: "town",
  label: "Town or city",
  optional: false,
};
const REGION: LineSpec = {
  autoComplete: "address-level1",
  name: "region",
  label: "County",
  optional: true,
};
const POSTCODE: LineSpec = {
  autoComplete: "postal-code",
  name: "postcode",
  label: "Postcode",
  optional: false,
};

/** The street address: building and street. */
function AddressFieldsLine1(props: AddressFieldsLineProps) {
  return <AddressLine spec={LINE1} {...props} />;
}

/** A second street line, optional by default: a flat, a locality. */
function AddressFieldsLine2(props: AddressFieldsLineProps) {
  return <AddressLine spec={LINE2} {...props} />;
}

/** The town or city ("City" in a US form). */
function AddressFieldsTown(props: AddressFieldsLineProps) {
  return <AddressLine spec={TOWN} {...props} />;
}

/** The county, state or province, optional by default. Omit it where a country has none. */
function AddressFieldsRegion(props: AddressFieldsLineProps) {
  return <AddressLine spec={REGION} {...props} />;
}

/**
 * The postcode or ZIP code, in a slot capped at a short width. A text
 * input, never numeric: UK postcodes carry letters and a space, and a
 * numeric keypad would strip a leading zero.
 */
function AddressFieldsPostcode(props: AddressFieldsLineProps) {
  return (
    <div className="postcode">
      <AddressLine spec={POSTCODE} {...props} />
    </div>
  );
}

export interface AddressFieldsCountryProps extends Omit<SelectProps, "autoComplete"> {
  /**
   * The country names to offer, as the reader would say them. The value
   * submitted is the name itself, which is what the `country-name` autofill
   * purpose matches on. Leave it out and pass your own `<option>`s as
   * children instead, when the values must be codes or the list has groups.
   */
  countries?: readonly string[];
  /** The visible label, in the reader's language. */
  label?: ReactNode;
  /** Say "(optional)" after the label instead of marking the others required. */
  optional?: boolean;
  /** An error for this line, in the words of its label ("Select your country"). */
  error?: ReactNode;
  /**
   * The prompt the Select starts on: a disabled first option with no
   * value, so a reader who skips the line submits nothing rather than the
   * first country in the list. @default "Select a country"
   */
  placeholder?: ReactNode;
  /** The `<option>`s, when `countries` is not given. */
  children?: ReactNode;
}

/**
 * The country, as a `Select` of names. It starts on a prompt, a disabled
 * option with no value, not the first country in the list, so a reader
 * who skips it submits nothing rather than the wrong country.
 */
function AddressFieldsCountry({
  countries,
  label = "Country",
  optional,
  error,
  name = "country",
  placeholder = "Select a country",
  id,
  className,
  style,
  children,
  ...rest
}: AddressFieldsCountryProps) {
  const autoComplete = usePurpose("country-name");
  return (
    <Field.Root id={id} className={className} style={style}>
      <Field.Label optional={optional}>{label}</Field.Label>
      <Field.Error>{error}</Field.Error>
      <Select name={name} autoComplete={autoComplete} {...rest}>
        <option value="" disabled>
          {placeholder}
        </option>
        {countries
          ? countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))
          : children}
      </Select>
    </Field.Root>
  );
}

export const AddressFields = {
  Root: AddressFieldsRoot,
  Line1: AddressFieldsLine1,
  Line2: AddressFieldsLine2,
  Town: AddressFieldsTown,
  Region: AddressFieldsRegion,
  Postcode: AddressFieldsPostcode,
  Country: AddressFieldsCountry,
};
