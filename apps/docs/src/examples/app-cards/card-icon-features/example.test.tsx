import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("card-icon-features", () => {
  it("is a Card article with a named features list, a machine-readable price for the set, and a fully named button", async () => {
    const { container } = render(<Example />);
    expect(
      screen.getByRole("article", { name: "Tomato ‘Gardener’s Delight’ plant collection" }),
    ).toHaveClass("loam-Card");
    expect(screen.getByRole("list", { name: "What you get" }).querySelectorAll("li")).toHaveLength(
      4,
    );
    const price = container.querySelector("data.loam-Price");
    expect(price).toHaveAttribute("value", "18.5");
    expect(price).toHaveTextContent("£18.50for six plants");
    expect(
      screen.getByRole("button", { name: "Add the Gardener’s Delight collection to basket" }),
    ).toBeInTheDocument();
    expect(screen.getByText("New for 2027")).toHaveClass("loam-Badge");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
