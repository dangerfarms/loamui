import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "@loamui/core";
import { Header } from "../components/Header/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Header", () => {
  it("is a banner with a brand around the consumer's link, a labelled nav and the current page marked", async () => {
    const { container } = render(
      <Header.Root>
        <Header.Brand>
          <a href="/" data-router>
            Loam
          </a>
        </Header.Brand>
        <Header.Nav aria-label="Primary">
          <li>
            <a href="/docs" aria-current="page">
              Docs
            </a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
        </Header.Nav>
        <Header.Actions>
          <Button>Sign in</Button>
        </Header.Actions>
      </Header.Root>,
    );
    expect(screen.getByRole("banner")).toHaveClass("loam-Header");
    const brand = screen.getByRole("link", { name: "Loam" });
    expect(brand).toHaveAttribute("data-router");
    expect(brand.parentElement).toHaveClass("brand");
    expect(brand.parentElement!.tagName).toBe("DIV");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("names its nav by aria-labelledby as well", () => {
    render(
      <Header.Root>
        <p id="site-nav">Site</p>
        <Header.Nav aria-labelledby="site-nav">
          <li>
            <a href="/docs">Docs</a>
          </li>
        </Header.Nav>
      </Header.Root>,
    );
    expect(screen.getByRole("navigation", { name: "Site" })).toHaveAttribute(
      "aria-labelledby",
      "site-nav",
    );
  });
});
