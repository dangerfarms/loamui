import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SignpostLink } from "@loamui/core";
import { CallToAction } from "../components/CallToAction/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("CallToAction", () => {
  it("renders a section with the parts in order and no axe violations", async () => {
    const { container } = render(
      <CallToAction.Root aria-labelledby="cta">
        <CallToAction.Title id="cta">Start building</CallToAction.Title>
        <CallToAction.Body>
          Install the package, import one stylesheet and start with any component.
        </CallToAction.Body>
        <CallToAction.Actions>
          <SignpostLink href="/docs">Read the docs</SignpostLink>
          <a href="/docs/components">Browse components</a>
        </CallToAction.Actions>
      </CallToAction.Root>,
    );
    const region = screen.getByRole("region", { name: "Start building" });
    expect(region).toHaveClass("loam-CallToAction");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Start building");
    expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: "Browse components" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title as an h3 when asked", () => {
    render(
      <CallToAction.Root>
        <CallToAction.Title render="h3">Under a page's own headings</CallToAction.Title>
      </CallToAction.Root>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Under a page's own headings",
    );
  });
});
