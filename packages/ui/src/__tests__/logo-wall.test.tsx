import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { LogoWall } from "../components/LogoWall/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("LogoWall", () => {
  it("is a list of named logos, one a link that carries the name", async () => {
    const { container } = render(
      <LogoWall.Root aria-label="Trusted by">
        <LogoWall.Item>
          <img src="/logos/acme.svg" alt="Acme" />
        </LogoWall.Item>
        <LogoWall.Item>
          <a href="https://northwind.example">
            <img src="/logos/northwind.svg" alt="Northwind" />
          </a>
        </LogoWall.Item>
        <LogoWall.Item>
          <svg role="img" aria-label="Globex" viewBox="0 0 80 40" />
        </LogoWall.Item>
      </LogoWall.Root>,
    );
    const list = screen.getByRole("list", { name: "Trusted by" });
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("loam-LogoWall");
    expect(list).toHaveAttribute("role", "list");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    for (const item of items) expect(item).toHaveClass("loam-LogoWall-item");
    expect(screen.getByRole("img", { name: "Acme" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Northwind" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Globex" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Northwind" })).toHaveAttribute(
      "href",
      "https://northwind.example",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands alone in a list of the consumer's own, without a Root", async () => {
    const { container } = render(
      <ul className="partners">
        <LogoWall.Item>
          <img src="/logos/acme.svg" alt="Acme" />
        </LogoWall.Item>
      </ul>,
    );
    const item = container.querySelector("li.loam-LogoWall-item");
    expect(item).not.toBeNull();
    expect(container.querySelector(".loam-LogoWall")).toBeNull();
    expect(screen.getByRole("img", { name: "Acme" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as another element outside any list when asked", async () => {
    const { container } = render(
      <LogoWall.Item render={<div />} data-testid="logo">
        <img src="/logos/acme.svg" alt="Acme" />
      </LogoWall.Item>,
    );
    const item = screen.getByTestId("logo");
    expect(item.tagName).toBe("DIV");
    expect(item).toHaveClass("loam-LogoWall-item");
    expect(container.querySelector("li")).toBeNull();
    expect(item).toContainElement(screen.getByRole("img", { name: "Acme" }));
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
