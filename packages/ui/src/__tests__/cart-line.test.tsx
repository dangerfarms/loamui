import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Field, Price, QuantityInput } from "@loamui/core";
import { CartLine } from "../components/CartLine/index";
import { ProductCard } from "../components/ProductCard/index";

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
          <CartLine.QuantityLabel />
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
        <CartLine.Remove onClick={onRemove} />
      </CartLine.Actions>
    </CartLine.Root>
  );
}

describe("CartLine", () => {
  it("is an article named by its title, with the control and the action named by it, and no axe violations", async () => {
    const onRemove = vi.fn();
    const { container } = render(<Line onRemove={onRemove} />);
    const line = container.firstElementChild!;
    expect(line.tagName).toBe("ARTICLE");
    expect(line).toHaveClass("loam-CartLine");
    // The article is the container; the grid is the inner element it
    // renders, so the narrow layout can be answered by an ancestor.
    const inner = line.firstElementChild!;
    expect(inner).toHaveClass("inner");
    expect(line.children).toHaveLength(1);

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
    expect(inner.querySelector("p.description")).toHaveTextContent("Size M, Blue");

    // The QuantityInput is the consumer's core control inside a Field; the
    // label is the composition's, a hidden Field.Label written from the
    // Title's text, so "Quantity for Linen shirt" is what a screen reader
    // hears and "Quantity" is never heard three times in a row.
    const quantity = screen.getByRole("spinbutton", { name: "Quantity for Linen shirt" });
    expect(quantity).toHaveAttribute("name", "quantity");
    expect(quantity).toHaveValue(2);
    expect(quantity.closest(".loam-Field")!.parentElement).toHaveClass("control");
    const label = screen.getByText("Quantity for Linen shirt");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("loam-Field-label", "loam-VisuallyHidden");

    // The remove action is a core Button, "Remove" on screen and "Remove
    // Linen shirt" to assistive technology.
    const remove = screen.getByRole("button", { name: "Remove Linen shirt" });
    expect(remove).toHaveClass("loam-Button");
    expect(remove.parentElement).toHaveClass("actions");
    expect(remove.querySelector(".loam-VisuallyHidden")).toHaveTextContent("Linen shirt");
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

  it("writes the label and the button in the words you give it", () => {
    render(
      <CartLine.Root labels={{ quantity: (title) => `Antall av ${title}`, remove: "Fjern" }}>
        <CartLine.Title>
          <a href="/products/ullsokker">Ullsokker</a>
        </CartLine.Title>
        <CartLine.Control>
          <Field.Root>
            <CartLine.QuantityLabel />
            <QuantityInput defaultValue={1} min={1} />
          </Field.Root>
        </CartLine.Control>
        <CartLine.Actions>
          <CartLine.Remove />
        </CartLine.Actions>
      </CartLine.Root>,
    );
    expect(screen.getByRole("spinbutton", { name: "Antall av Ullsokker" })).toBeInTheDocument();
    const remove = screen.getByRole("button", { name: "Fjern Ullsokker" });
    expect(remove.firstChild).toHaveTextContent("Fjern");
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
              <CartLine.QuantityLabel />
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
              <CartLine.QuantityLabel />
              <QuantityInput defaultValue={3} min={1} />
            </Field.Root>
          </CartLine.Control>
        </CartLine.Root>
      </ul>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveClass("loam-CartLine");
    expect(items[0]!.querySelector(":scope > div.inner")).not.toBeNull();
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

  it("announces a reduced line with a ProductCard.Was in its Value", async () => {
    const { container } = render(
      <CartLine.Root>
        <CartLine.Title>
          <a href="/products/linen-shirt">Linen shirt</a>
        </CartLine.Title>
        <CartLine.Value>
          <ProductCard.Was>
            <Price value={90} currency="GBP" />
          </ProductCard.Was>
          <Price value={72} currency="GBP" />
        </CartLine.Value>
      </CartLine.Root>,
    );
    const value = container.querySelector("div.value")!;
    expect(value).toHaveTextContent("Was £90 Now £72");
    expect(value.querySelector("s.was > data")).toHaveAttribute("value", "90");
    expect(screen.getByText("Was")).toHaveClass("loam-VisuallyHidden");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
