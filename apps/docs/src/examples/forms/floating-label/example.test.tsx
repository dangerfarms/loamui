import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("floating-label", () => {
  it("names the box by a real label whose placeholder is a lone space, not the label", async () => {
    const { container } = render(<Example />);
    const input = screen.getByLabelText("Full name");
    expect(input).toHaveAttribute("id", "full-name");
    expect(input).toHaveAttribute("autocomplete", "name");
    expect(input).toHaveAttribute("placeholder", " ");
    const label = container.querySelector("label")!;
    expect(label).toHaveAttribute("for", "full-name");
    expect(label).not.toHaveClass("loam-Field-label");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
