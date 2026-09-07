import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Button, Field, Price, QuantityInput } from "@loamui/core";
import { CartLine } from "../components/CartLine/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Line({ onRemove }: { onRemove?: () => void }) {
  return (
    <CartLine.Root>
      <CartLine.Media>
        <img src="/shirt.jpg" alt="" />
      </CartLine.Media>
      <CartLine.Title>
        <a href="/products/linen-shirt">Linen shirt</a>
      </CartLine.Title>
      <CartLine.Description>Size M, Blue</CartLine.Description>
      <CartLine.Control>
        <Field.Root>
          <Field.Label className="loam-VisuallyHidden">Quantity for Linen shirt</Field.Label>
          <QuantityInput name="quantity" defaultValue={2} min={1} />
        </Field.Root>
      </CartLine.Control>
      <CartLine.Value>
        <Price value={90} currency="GBP" />
      </CartLine.Value>
      <CartLine.Note>
        <Price value={45} currency="GBP">
          each
        </Price>
      </CartLine.Note>
      <CartLine.Actions>
        <Button onClick={onRemove}>
          Remove<span className="loam-VisuallyHidden"> Linen shirt</span>
        </Button>
      </CartLine.Actions>
    </CartLine.Root>
  );
}

describe("CartLine", () => {
  it("is an article named by its title, with the consumer's control and action, and no axe violations", async () => {
    const onRemove = vi.fn();
    const { container } = render(<Line onRemove={onRemove} />);
    const line = container.firstElementChild!;
    expect(line.tagName).toBe("ARTICLE");
    expect(line).toHaveClass("loam-CartLine");

    // The line is named by its Title: aria-labelledby points at the
    // heading's id, so the article reads as "Linen shirt".
    const heading = screen.getByRole("heading", { level: 3, name: "Linen shirt" });
    expect(heading).toHaveAttribute("id");
    expect(line).toHaveAttribute("aria-labelledby", heading.id);
    expect(screen.getByRole("article", { name: "Linen shirt" })).toBe(line);
    expect(screen.getByRole("link", { name: "Linen shirt" })).toHaveAttribute(
      "href",
      "/products/linen-shirt",
    );
    expect(container.querySelector("p.description")).toHaveTextContent("Size M, Blue");

    // The QuantityInput is the consumer's core control inside a Field,
    // labelled by the product in core's visually hidden class, so
    // "Quantity for Linen shirt" is what a screen reader hears; the
    // composition only gives it its slot and leaves it as core styles it.
    const quantity = screen.getByRole("spinbutton", { name: "Quantity for Linen shirt" });
    expect(quantity).toHaveAttribute("name", "quantity");
    expect(quantity).toHaveValue(2);
    expect(quantity.closest(".loam-Field")!.parentElement).toHaveClass("control");
    expect(screen.getByText("Quantity for Linen shirt")).toHaveClass("loam-VisuallyHidden");

    // The remove button is the consumer's core Button in Actions, saying
    // "Remove" and named "Remove Linen shirt".
    const remove = screen.getByRole("button", { name: "Remove Linen shirt" });
    expect(remove).toHaveClass("loam-Button");
    expect(remove.parentElement).toHaveClass("actions");
    await userEvent.click(remove);
    expect(onRemove).toHaveBeenCalledTimes(1);

    // Prices are data elements: the total the consumer computed in Value,
    // and the unit price with its visible "each" in the Note under it.
    const prices = container.querySelectorAll("data.loam-Price");
    expect(prices).toHaveLength(2);
    expect(container.querySelector("div.value > data")).toBe(prices[0]);
    expect(prices[0]).toHaveAttribute("value", "90");
    expect(container.querySelector("p.note > data")).toBe(prices[1]);
    expect(prices[1]).toHaveAttribute("value", "45");
    expect(prices[1]).toHaveTextContent("£45each");

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as list items inside a basket the consumer wrote", async () => {
    const { container } = render(
      <ul aria-label="Your basket">
        <CartLine.Root render={<li />}>
          <CartLine.Title>
            <a href="/products/linen-shirt">Linen shirt</a>
          </CartLine.Title>
          <CartLine.Control>
            <Field.Root>
              <Field.Label className="loam-VisuallyHidden">Quantity for Linen shirt</Field.Label>
              <QuantityInput defaultValue={1} min={1} />
            </Field.Root>
          </CartLine.Control>
        </CartLine.Root>
        <CartLine.Root render={<li />}>
          <CartLine.Title render={<p />}>
            <a href="/products/wool-socks">Wool socks</a>
          </CartLine.Title>
          <CartLine.Control>
            <Field.Root>
              <Field.Label className="loam-VisuallyHidden">Quantity for Wool socks</Field.Label>
              <QuantityInput defaultValue={3} min={1} />
            </Field.Root>
          </CartLine.Control>
        </CartLine.Root>
      </ul>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveClass("loam-CartLine");
    expect(screen.getByRole("listitem", { name: "Linen shirt" })).toBe(items[0]);
    expect(screen.getByRole("spinbutton", { name: "Quantity for Wool socks" })).toHaveValue(3);
    const socks = screen.getByRole("link", { name: "Wool socks" }).closest(".title")!;
    expect(socks.tagName).toBe("P");
    expect(items[1]).toHaveAttribute("aria-labelledby", socks.id);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("takes the consumer's name over the title's, and names nothing without a Title", () => {
    const { container } = render(
      <>
        <CartLine.Root aria-label="Linen shirt, size M">
          <CartLine.Title id="shirt">
            <a href="/products/linen-shirt">Linen shirt</a>
          </CartLine.Title>
        </CartLine.Root>
        <CartLine.Root>
          <CartLine.Description>Size M, Blue</CartLine.Description>
        </CartLine.Root>
      </>,
    );
    const [named, unnamed] = container.querySelectorAll("article.loam-CartLine");
    expect(named).toHaveAttribute("aria-label", "Linen shirt, size M");
    expect(named).not.toHaveAttribute("aria-labelledby");
    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("id", "shirt");
    expect(unnamed).not.toHaveAttribute("aria-labelledby");
  });
});
