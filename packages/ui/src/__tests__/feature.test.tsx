import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Feature } from "../components/Feature/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Feature", () => {
  it("is a tile with a titled, hidden-icon anatomy that stands alone", async () => {
    const { container } = render(
      <Feature.Root>
        <Feature.Icon>
          <svg viewBox="0 0 16 16" />
        </Feature.Icon>
        <Feature.Title>Three primitives</Feature.Title>
        <Feature.Description>Tokens, element styles and components.</Feature.Description>
      </Feature.Root>,
    );
    expect(container.firstElementChild).toHaveClass("loam-Feature");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Three primitives");
    expect(container.querySelector(".loam-Feature .icon")).toHaveAttribute("aria-hidden", "true");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as a list item inside a list the consumer wrote", async () => {
    const { container } = render(
      <ul>
        <Feature.Root render={<li />}>
          <Feature.Title render={<h4 />}>In a list</Feature.Title>
          <Feature.Description>Rendered as a li, titled as an h4.</Feature.Description>
        </Feature.Root>
      </ul>,
    );
    expect(screen.getByRole("listitem")).toHaveClass("loam-Feature");
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("In a list");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
