import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Footer } from "../components/Footer/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Footer", () => {
  it("is a contentinfo landmark whose columns are navs named by their titles", async () => {
    const { container } = render(
      <Footer.Root>
        <Footer.Brand>
          <a href="/">Loam</a>
          <p>Modern UI primitives.</p>
        </Footer.Brand>
        <Footer.Columns>
          <Footer.Column>
            <Footer.ColumnTitle>Product</Footer.ColumnTitle>
            <ul>
              <li>
                <a href="/docs">Docs</a>
              </li>
            </ul>
          </Footer.Column>
          <Footer.Column>
            <Footer.ColumnTitle render={<h2 />}>Company</Footer.ColumnTitle>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </Footer.Column>
        </Footer.Columns>
        <Footer.Bottom>
          <small>© 2026 Loam</small>
        </Footer.Bottom>
      </Footer.Root>,
    );
    expect(screen.getByRole("contentinfo")).toHaveClass("loam-Footer");
    const product = screen.getByRole("navigation", { name: "Product" });
    expect(product.tagName).toBe("NAV");
    expect(product).toHaveClass("column");
    expect(product).toHaveAttribute(
      "aria-labelledby",
      screen.getByRole("heading", { level: 3, name: "Product" }).id,
    );
    expect(product.querySelector("ul")).not.toHaveAttribute("role");
    const company = screen.getByRole("navigation", { name: "Company" });
    expect(company).toHaveAttribute(
      "aria-labelledby",
      screen.getByRole("heading", { level: 2, name: "Company" }).id,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("keeps a consumer's own name for a column, and carries none without a title", () => {
    render(
      <Footer.Root>
        <Footer.Columns>
          <Footer.Column aria-label="Legal">
            <Footer.ColumnTitle>Small print</Footer.ColumnTitle>
            <ul>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>
          </Footer.Column>
          <Footer.Column>
            <ul>
              <li>
                <a href="/status">Status</a>
              </li>
            </ul>
          </Footer.Column>
        </Footer.Columns>
      </Footer.Root>,
    );
    expect(screen.getByRole("navigation", { name: "Legal" })).not.toHaveAttribute(
      "aria-labelledby",
    );
    const untitled = screen.getByRole("link", { name: "Status" }).closest("nav")!;
    expect(untitled).not.toHaveAttribute("aria-labelledby");
    expect(untitled).not.toHaveAttribute("aria-label");
  });
});
