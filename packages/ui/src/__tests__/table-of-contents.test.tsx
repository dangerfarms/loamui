import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { TableOfContents } from "../components/TableOfContents/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("TableOfContents", () => {
  it("renders a named nav with a nested list, a current link and no axe violations", async () => {
    const { container } = render(
      <TableOfContents.Root aria-label="On this page">
        <TableOfContents.Title>On this page</TableOfContents.Title>
        <TableOfContents.List>
          <TableOfContents.Item>
            <a href="#tokens">Tokens</a>
          </TableOfContents.Item>
          <TableOfContents.Item>
            <a href="#element-styles" aria-current="location">
              Element styles
            </a>
            <TableOfContents.List>
              <TableOfContents.Item>
                <a href="#headings">Headings</a>
              </TableOfContents.Item>
              <TableOfContents.Item>
                <a href="#forms">Forms</a>
              </TableOfContents.Item>
            </TableOfContents.List>
          </TableOfContents.Item>
          <TableOfContents.Item>
            <a href="#components">Components</a>
          </TableOfContents.Item>
          <TableOfContents.Item>
            <a href="#contextualism">Contextualism</a>
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents.Root>,
    );
    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav).toHaveClass("loam-TableOfContents");
    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(screen.getAllByRole("link")).toHaveLength(6);
    expect(screen.getByRole("link", { name: "Element styles" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Headings" }).closest("ol")).not.toBe(
      screen.getByRole("link", { name: "Tokens" }).closest("ol"),
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
