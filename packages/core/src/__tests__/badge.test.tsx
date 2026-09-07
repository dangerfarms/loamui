import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge } from "../components/Badge/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Badge", () => {
  it("renders a span with the size hook", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("loam-Badge");
    expect(badge).toHaveAttribute("data-size", "md");
  });

  it("Badge.Dot is hidden decoration before the label", () => {
    render(
      <Badge>
        <Badge.Dot />
        Live
      </Badge>,
    );
    const dot = screen.getByText("Live").querySelector("span.dot");
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("render substitutes the element and keeps the pill", () => {
    render(
      <Badge render={<a href="#tag" />} size="sm">
        design
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "design" });
    expect(link).toHaveClass("loam-Badge");
    expect(link).toHaveAttribute("data-size", "sm");
  });

  it("has no axe violations as a link with a dot", async () => {
    const { container } = render(
      <Badge render={<a href="#tag" />}>
        <Badge.Dot />
        design
      </Badge>,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
