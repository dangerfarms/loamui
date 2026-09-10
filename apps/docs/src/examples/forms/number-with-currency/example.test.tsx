import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("number-with-currency", () => {
  it("labels the amount by the Field and the currency by its own name, and swaps the symbol with the choice", async () => {
    const { container } = render(<Example />);
    const amount = screen.getByRole("textbox", { name: "Amount" });
    expect(amount).toHaveAttribute("inputmode", "decimal");
    expect(amount).toHaveAccessibleDescription(
      "Gift cards are sold in three currencies, from 10 to 200.",
    );
    const currency = screen.getByRole("combobox", { name: "Currency" });
    expect(currency).toHaveValue("GBP");
    expect(container.querySelector(".loam-Input-field")).toHaveTextContent("£");

    fireEvent.change(currency, { target: { value: "EUR" } });
    expect(container.querySelector(".loam-Input-field")).toHaveTextContent("€");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
