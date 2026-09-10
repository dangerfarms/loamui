import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("autocomplete-async", () => {
  it("is a labelled combobox whose list fills with the matches once the search answers", async () => {
    const { container } = render(<Example />);
    const box = screen.getByRole("combobox", { name: "Variety" });
    expect(box).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector('input[type="hidden"][name="variety"]')).toHaveValue("");
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    fireEvent.change(box, { target: { value: "kale" } });
    expect(box).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Searching the seed list");
    expect(container.querySelector(".loam-Loader")).toHaveAttribute("aria-hidden", "true");

    // The stand-in search answers after 600ms; the wait allows for a busy suite.
    const option = await screen.findByRole(
      "option",
      { name: "Kale 'Nero di Toscana'" },
      { timeout: 3000 },
    );
    expect(screen.getByRole("listbox")).toContainElement(option);
    expect(screen.getByRole("status")).toHaveTextContent("1 variety matches");
    expect(container.querySelector(".loam-Loader")).toBeNull();
    expect(container.querySelector("p.status")).toHaveTextContent("1 variety matches.");

    fireEvent.click(option);
    expect(box).toHaveValue("Kale 'Nero di Toscana'");
    expect(container.querySelector('input[type="hidden"][name="variety"]')).toHaveValue(
      "Kale 'Nero di Toscana'",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
