import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Field } from "@loamui/core";
import { AddressFields } from "../components/AddressFields/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

const countries = ["France", "Ireland", "United Kingdom"];

describe("AddressFields", () => {
  it("renders a group named by the legend, each line with its autofill purpose", async () => {
    const { container } = render(
      <AddressFields.Root legend="Your address" className="mine">
        <AddressFields.Line1 required />
        <AddressFields.Line2 />
        <AddressFields.Town required />
        <AddressFields.Region />
        <AddressFields.Postcode required />
        <AddressFields.Country countries={countries} required />
      </AddressFields.Root>,
    );
    // The Fieldset is core's, untouched; the composition's grid sits inside
    // it after the legend, and the consumer's class lands on the grid.
    const group = screen.getByRole("group", { name: "Your address" });
    expect(group).toHaveClass("loam-Fieldset");
    expect(group).not.toHaveClass("loam-AddressFields");
    const grid = group.querySelector(":scope > legend + div.loam-AddressFields")!;
    expect(grid).toHaveClass("mine");
    expect(grid.querySelectorAll(":scope > .loam-Field, :scope > div.postcode")).toHaveLength(6);

    const line1 = screen.getByLabelText("Address line 1");
    expect(line1).toHaveAttribute("autocomplete", "address-line1");
    expect(line1).toHaveAttribute("name", "addressLine1");
    expect(line1).toBeRequired();

    const line2 = screen.getByLabelText("Address line 2 (optional)");
    expect(line2).toHaveAttribute("autocomplete", "address-line2");
    expect(line2).not.toBeRequired();

    expect(screen.getByLabelText("Town or city")).toHaveAttribute("autocomplete", "address-level2");
    expect(screen.getByLabelText("County (optional)")).toHaveAttribute(
      "autocomplete",
      "address-level1",
    );

    const postcode = screen.getByLabelText("Postcode");
    expect(postcode).toHaveAttribute("autocomplete", "postal-code");
    // Text, not numeric: postcodes carry letters, and a leading zero.
    expect(postcode).toHaveProperty("type", "text");
    expect(postcode).not.toHaveAttribute("inputmode");
    expect(postcode.closest("div.postcode")).toBeInTheDocument();

    const country = screen.getByLabelText("Country");
    expect(country.tagName).toBe("SELECT");
    expect(country).toHaveAttribute("autocomplete", "country-name");
    expect(country).toHaveValue("");
    expect(screen.getByRole("option", { name: "Select a country" })).toBeDisabled();
    expect(screen.getByRole("option", { name: "Ireland" })).toHaveValue("Ireland");

    // Order is fixed: autofill and the reader both follow it.
    const purposes = Array.from(container.querySelectorAll("input, select")).map((el) =>
      el.getAttribute("autocomplete"),
    );
    expect(purposes).toEqual([
      "address-line1",
      "address-line2",
      "address-level2",
      "address-level1",
      "postal-code",
      "country-name",
    ]);

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("takes the reader's labels and names, and stands without Region or Country", async () => {
    const { container } = render(
      <AddressFields.Root legend="Shipping address">
        <AddressFields.Line1 label="Street address" name="street" />
        <AddressFields.Town label="City" name="city" />
        <AddressFields.Postcode label="ZIP code" name="zip" />
      </AddressFields.Root>,
    );
    expect(screen.getByRole("group", { name: "Shipping address" })).toBeInTheDocument();
    expect(screen.getByLabelText("Street address")).toHaveAttribute("name", "street");
    expect(screen.getByLabelText("City")).toHaveAttribute("autocomplete", "address-level2");
    expect(screen.getByLabelText("ZIP code")).toHaveAttribute("autocomplete", "postal-code");
    expect(screen.queryByLabelText(/County/)).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("prefixes every purpose with the section, so two addresses fill apart", () => {
    render(
      <>
        <AddressFields.Root legend="Delivery address" section="shipping">
          <AddressFields.Line1 />
          <AddressFields.Postcode />
          <AddressFields.Country countries={countries} />
        </AddressFields.Root>
        <AddressFields.Root legend="Billing address" section="billing">
          <AddressFields.Line1 />
          <AddressFields.Postcode />
          <AddressFields.Country countries={countries} />
        </AddressFields.Root>
      </>,
    );
    const [deliveryLine1, billingLine1] = screen.getAllByLabelText("Address line 1");
    expect(deliveryLine1).toHaveAttribute("autocomplete", "shipping address-line1");
    expect(billingLine1).toHaveAttribute("autocomplete", "billing address-line1");
    const [deliveryPostcode, billingPostcode] = screen.getAllByLabelText("Postcode");
    expect(deliveryPostcode).toHaveAttribute("autocomplete", "shipping postal-code");
    expect(billingPostcode).toHaveAttribute("autocomplete", "billing postal-code");
    const [deliveryCountry, billingCountry] = screen.getAllByLabelText("Country");
    expect(deliveryCountry).toHaveAttribute("autocomplete", "shipping country-name");
    expect(billingCountry).toHaveAttribute("autocomplete", "billing country-name");
  });

  it("wires a Field.Description given as a line's children to its input", async () => {
    const { container } = render(
      <AddressFields.Root legend="Your address">
        <AddressFields.Line1>
          <Field.Description>Include your flat number</Field.Description>
        </AddressFields.Line1>
        <AddressFields.Town />
      </AddressFields.Root>,
    );
    const line1 = screen.getByLabelText("Address line 1");
    expect(line1).toHaveAccessibleDescription("Include your flat number");
    // The description sits between the label and the input, in reading order.
    const field = line1.closest(".loam-Field")!;
    const order = Array.from(field.children).map((el) => el.tagName.toLowerCase());
    expect(order.indexOf("label")).toBeLessThan(order.indexOf("p"));
    expect(order.indexOf("p")).toBeLessThan(order.indexOf("div"));
    expect(screen.getByLabelText("Town or city")).not.toHaveAccessibleDescription();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("takes option children for the country when no names are given", () => {
    render(
      <AddressFields.Root legend="Your address">
        <AddressFields.Country>
          <optgroup label="Europe">
            <option value="FR">France</option>
            <option value="IE">Ireland</option>
          </optgroup>
        </AddressFields.Country>
      </AddressFields.Root>,
    );
    const country = screen.getByLabelText("Country");
    expect(country).toHaveValue("");
    expect(screen.getByRole("group", { name: "Europe" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Ireland" })).toHaveValue("IE");
  });

  it("renders an error as a Field.Error associated with its input", async () => {
    const { container } = render(
      <AddressFields.Root legend="Your address">
        <AddressFields.Line1 defaultValue="12 Loam Lane" />
        <AddressFields.Town />
        <AddressFields.Postcode error="Enter your postcode" defaultValue="" />
      </AddressFields.Root>,
    );
    const postcode = screen.getByLabelText("Postcode");
    expect(postcode).toHaveAttribute("aria-invalid", "true");
    expect(postcode).toHaveAccessibleDescription("Error: Enter your postcode");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter your postcode");

    const line1 = screen.getByLabelText("Address line 1");
    expect(line1).not.toHaveAttribute("aria-invalid");
    expect(line1).toHaveValue("12 Loam Lane");

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
