import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { axe } from "vitest-axe";
import { TableOfContents } from "../components/TableOfContents/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("TableOfContents", () => {
  it("renders a nav named by its title with a nested list, a current link and no axe violations", async () => {
    const { container } = render(
      <TableOfContents.Root>
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
    expect(nav).not.toHaveAttribute("aria-label");
    expect(nav).toHaveAttribute("aria-labelledby", screen.getByText("On this page").id);
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

  it("takes a name from aria-label without a title, and yields to aria-labelledby", () => {
    const { container } = render(
      <>
        <h2 id="contents">Contents</h2>
        <TableOfContents.Root aria-label="Sections">
          <TableOfContents.List>
            <TableOfContents.Item>
              <a href="#one">One</a>
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents.Root>
        <TableOfContents.Root aria-labelledby="contents">
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            <TableOfContents.Item>
              <a href="#two">Two</a>
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents.Root>
      </>,
    );
    expect(screen.getByRole("navigation", { name: "Sections" })).not.toHaveAttribute(
      "aria-labelledby",
    );
    expect(screen.getByRole("navigation", { name: "Contents" })).toHaveAttribute(
      "aria-labelledby",
      "contents",
    );
    expect(container.querySelectorAll("nav")).toHaveLength(2);
  });

  it("is named On this page without a Title, or by the words the labels give it", () => {
    render(
      <>
        <TableOfContents.Root>
          <TableOfContents.List>
            <TableOfContents.Item>
              <a href="#one">One</a>
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents.Root>
        <TableOfContents.Root labels={{ navigation: "Sur cette page" }}>
          <TableOfContents.List>
            <TableOfContents.Item>
              <a href="#two">Two</a>
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents.Root>
      </>,
    );
    const fallback = screen.getByRole("navigation", { name: "On this page" });
    expect(fallback).toHaveAttribute("aria-label", "On this page");
    expect(fallback).not.toHaveAttribute("aria-labelledby");
    expect(screen.getByRole("navigation", { name: "Sur cette page" })).toBeInTheDocument();
  });

  it("names the nav by its Title in the server render, before any effect runs", () => {
    const html = renderToString(
      <TableOfContents.Root>
        <TableOfContents.Title>On this page</TableOfContents.Title>
        <TableOfContents.List>
          <TableOfContents.Item>
            <a href="#one">One</a>
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents.Root>,
    );
    const titleId = html.match(/<p[^>]*\sid="([^"]+)"/)?.[1];
    expect(titleId).toBeTruthy();
    expect(html).toContain(`aria-labelledby="${titleId}"`);
    expect(html).not.toContain("aria-label=");
  });
});
