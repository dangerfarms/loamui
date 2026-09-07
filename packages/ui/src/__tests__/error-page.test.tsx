import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SignpostLink } from "@loamui/core";
import { ErrorPage } from "../components/ErrorPage/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ErrorPage", () => {
  it("renders a section named by its title, with the code, description and actions and no axe violations", async () => {
    const { container } = render(
      <ErrorPage.Root>
        <ErrorPage.Code>404</ErrorPage.Code>
        <ErrorPage.Title>Page not found</ErrorPage.Title>
        <ErrorPage.Description>
          The page may have moved, or the address may have a typo. Check the address, or go back to
          the home page and find it from there.
        </ErrorPage.Description>
        <ErrorPage.Actions>
          <SignpostLink href="/">Back to home</SignpostLink>
          <a href="/support">Contact support</a>
        </ErrorPage.Actions>
      </ErrorPage.Root>,
    );
    const region = screen.getByRole("region", { name: "Page not found" });
    expect(region.tagName).toBe("SECTION");
    expect(region).toHaveClass("loam-ErrorPage");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Page not found");
    expect(screen.getByText("404")).toHaveClass("code");
    expect(screen.getByText(/The page may have moved/)).toHaveClass("description");
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Contact support" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("names the section in the first render, so the server's HTML carries the name", () => {
    render(
      <ErrorPage.Root>
        <ErrorPage.Title>Named on the server</ErrorPage.Title>
      </ErrorPage.Root>,
    );
    const region = screen.getByRole("region", { name: "Named on the server" });
    expect(region).toHaveAttribute("aria-labelledby", screen.getByRole("heading").id);
  });

  it("lets a name of the consumer's own win over the title's", () => {
    render(
      <ErrorPage.Root aria-label="Something went wrong">
        <ErrorPage.Title>Server error</ErrorPage.Title>
      </ErrorPage.Root>,
    );
    const region = screen.getByRole("region", { name: "Something went wrong" });
    expect(region).not.toHaveAttribute("aria-labelledby");
  });

  it("renders the title as an h2 and the root as a main when asked", () => {
    const { container } = render(
      <ErrorPage.Root render={<main />}>
        <ErrorPage.Title render={<h2 />}>Inside a page</ErrorPage.Title>
      </ErrorPage.Root>,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Inside a page");
    expect(screen.getByRole("main", { name: "Inside a page" })).toHaveClass("loam-ErrorPage");
    expect(container.querySelector("section")).toBeNull();
  });
});
