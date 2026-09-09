import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("cart-line", () => {
  it("is an article named by the product, with the quantity and the remove button named for it too", async () => {
    const { container } = render(<Example />);
    const article = screen.getByRole("article", { name: "Sweet pea ‘Cupani’ seeds" });
    expect(article).toHaveClass("cart-line");
    const quantity = screen.getByRole("spinbutton", {
      name: "Quantity of Sweet pea ‘Cupani’ seeds",
    });
    expect(quantity).toHaveValue(2);
    fireEvent.click(screen.getByRole("button", { name: "More" }));
    expect(quantity).toHaveValue(3);
    expect(
      screen.getByRole("button", { name: "Remove Sweet pea ‘Cupani’ seeds" }),
    ).toHaveTextContent(/^Remove/);
    expect(container.querySelector("p.total data")).toHaveTextContent("£5.60");
    const each = container.querySelector("p.each data")!;
    expect(each).toHaveAttribute("value", "2.8");
    expect(each.querySelector("small.per")).toHaveTextContent("each");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
