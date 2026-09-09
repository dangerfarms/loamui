import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("product-grid", () => {
  it("is a list of four product articles, each with a button named for its product", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("list")).toHaveClass("product-grid");
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen.getAllByRole("button").map((b) => b.getAttribute("aria-label") ?? b.textContent),
    ).toEqual([
      "Add Sweet pea ‘Cupani’ seeds to basket",
      "Add Copper hand trowel to basket",
      "Add Rhubarb ‘Timperley Early’ crown to basket",
      "Add Hazel bean poles, bundle of ten to basket",
    ]);
    expect(
      screen.getByRole("button", { name: "Add Copper hand trowel to basket" }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("s")).toHaveLength(1);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
