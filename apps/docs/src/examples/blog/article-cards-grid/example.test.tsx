import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("article-cards-grid", () => {
  it("is a list of three Cards, each an article named by its own title", async () => {
    const { container } = render(<Example />);
    const list = screen.getByRole("list");
    expect(list).toHaveClass("article-cards-grid");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    const articles = screen.getAllByRole("article");
    expect(articles.map((a) => a.getAttribute("aria-labelledby"))).toEqual([
      "article-planting-a-native-hedge-title",
      "article-tomato-seed-from-one-fruit-title",
      "article-september-plant-sale-title",
    ]);
    expect(
      screen.getByRole("article", { name: "Saving tomato seed from a single fruit" }),
    ).toHaveClass("loam-Card");
    expect(
      screen.getByRole("link", { name: "Open day: the September plant sale" }),
    ).toHaveAttribute("href", "/guides/september-plant-sale");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
