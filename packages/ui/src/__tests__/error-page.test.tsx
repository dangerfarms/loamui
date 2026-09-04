import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SignpostLink } from "@loamui/core";
import { ErrorPage } from "../components/ErrorPage/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ErrorPage", () => {
  it("renders a section with the code, title, body and actions and no axe violations", async () => {
    const { container } = render(
      <ErrorPage.Root aria-labelledby="t">
        <ErrorPage.Code>404</ErrorPage.Code>
        <ErrorPage.Title id="t">Page not found</ErrorPage.Title>
        <ErrorPage.Body>
          The page may have moved, or the address may have a typo. Check the address, or go back to
          the home page and find it from there.
        </ErrorPage.Body>
        <ErrorPage.Actions>
          <SignpostLink href="/">Back to home</SignpostLink>
          <a href="/support">Contact support</a>
        </ErrorPage.Actions>
      </ErrorPage.Root>,
    );
    const region = screen.getByRole("region", { name: "Page not found" });
    expect(region).toHaveClass("loam-ErrorPage");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Page not found");
    expect(screen.getByText("404")).toHaveClass("code");
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Contact support" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title as an h2 when asked", () => {
    render(
      <ErrorPage.Root>
        <ErrorPage.Title render="h2">Inside a page</ErrorPage.Title>
      </ErrorPage.Root>,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Inside a page");
  });
});
