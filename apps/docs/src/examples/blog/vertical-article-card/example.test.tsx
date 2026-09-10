import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("vertical-article-card", () => {
  it("is a Card article named by its linked title, with the author and a dated byline at the foot", async () => {
    const { container } = render(<Example />);
    const article = screen.getByRole("article", { name: "Lifting and storing dahlia tubers" });
    expect(article).toHaveClass("loam-Card");
    expect(screen.getByRole("link", { name: "Lifting and storing dahlia tubers" })).toHaveAttribute(
      "href",
      "/journal/lifting-dahlias",
    );
    expect(screen.getByText("Winter jobs")).toHaveClass("loam-Badge");
    expect(article.querySelector('address a[rel="author"]')).toHaveTextContent("Amara Okonkwo");
    expect(article.querySelector("time")).toHaveAttribute("datetime", "2026-10-20");
    expect(article.querySelector(".loam-Avatar")).toHaveAttribute("aria-hidden", "true");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
