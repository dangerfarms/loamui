import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge, Button, Price, Rating } from "@loamui/core";
import { ProductCard } from "../components/ProductCard/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ProductCard", () => {
  it("is a Card holding an article named by its title, whose name is the link, with no axe violations", async () => {
    const { container } = render(
      <ProductCard.Root>
        <ProductCard.Media>
          <img src="/linen-shirt.jpg" alt="Linen shirt in sand, collar open" />
        </ProductCard.Media>
        <ProductCard.Title>
          <a href="/shop/linen-shirt">Linen shirt</a>
        </ProductCard.Title>
        <ProductCard.Rating count={128}>
          <Rating readOnly label="Average rating" value={4.5} />
        </ProductCard.Rating>
        <ProductCard.Value>
          <Price value={45} currency="GBP" />
        </ProductCard.Value>
        <ProductCard.Actions>
          <Button>
            Add to basket<span className="loam-VisuallyHidden"> Linen shirt</span>
          </Button>
        </ProductCard.Actions>
      </ProductCard.Root>,
    );
    const card = container.firstElementChild!;
    expect(card).toHaveClass("loam-Card");
    expect(card).not.toHaveClass("loam-ProductCard");
    const article = card.firstElementChild!;
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveClass("loam-ProductCard");

    // The article is named by its Title, so a list of the page's articles
    // reads as a list of products.
    const heading = screen.getByRole("heading", { level: 3, name: "Linen shirt" });
    expect(heading).toHaveAttribute("id");
    expect(article).toHaveAttribute("aria-labelledby", heading.id);
    expect(screen.getByRole("article", { name: "Linen shirt" })).toBe(article);
    expect(screen.getByRole("link", { name: "Linen shirt" })).toHaveAttribute(
      "href",
      "/shop/linen-shirt",
    );
    expect(screen.getByRole("img", { name: "4.5 out of 5" })).toBeInTheDocument();
    // The words that complete a name are in core's visually hidden class;
    // the card ships no recipe of its own.
    expect(screen.getByText("reviews")).toHaveClass("loam-VisuallyHidden");
    expect(container.querySelector("p.value > data.loam-Price")).toHaveAttribute("value", "45");
    expect(screen.getByRole("button", { name: "Add to basket Linen shirt" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("announces a reduction as Was and Now, with the old price struck through", async () => {
    const { container } = render(
      <ProductCard.Root>
        <ProductCard.Meta>
          <span style={{ "--loam-context": "success" } as React.CSSProperties}>
            <Badge>20% off</Badge>
          </span>
        </ProductCard.Meta>
        <ProductCard.Title>
          <a href="/shop/linen-shirt">Linen shirt</a>
        </ProductCard.Title>
        <ProductCard.Value was={<Price value={45} currency="GBP" />}>
          <Price value={36} currency="GBP" />
        </ProductCard.Value>
      </ProductCard.Root>,
    );
    expect(screen.getByText("Was")).toHaveClass("loam-VisuallyHidden");
    expect(screen.getByText("Now")).toHaveClass("loam-VisuallyHidden");
    expect(screen.getByText("£45").closest("s")).not.toBeNull();
    expect(screen.getByText("£36").closest("s")).toBeNull();
    expect(container.querySelector("p.value")).toHaveTextContent("Was £45 Now £36");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("sits in a list the consumer wrote, with the name at the level they choose", async () => {
    const { container } = render(
      <ul>
        <li>
          <ProductCard.Root>
            <ProductCard.Title render={<h2 />}>
              <a href="/shop/one">One</a>
            </ProductCard.Title>
          </ProductCard.Root>
        </li>
        <li>
          <ProductCard.Root>
            <ProductCard.Media>
              <img src="/two.jpg" alt="Two" />
            </ProductCard.Media>
          </ProductCard.Root>
        </li>
      </ul>,
    );
    const [first, second] = container.querySelectorAll(".loam-Card article.loam-ProductCard");
    expect(first).not.toBeUndefined();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("One");
    expect(first).toHaveAttribute("aria-labelledby", heading.id);
    // A card without a Title points at nothing.
    expect(second).not.toHaveAttribute("aria-labelledby");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
