import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("input-with-tooltip", () => {
  it("labels the box by the Field and describes the named icon button by the tooltip", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("textbox", { name: "Plot reference" })).toHaveAttribute("name", "plot");
    const hint = screen.getByRole("button", { name: "About the plot reference" });
    expect(hint).toHaveClass("hint");
    expect(hint).not.toHaveClass("loam-Button");
    const tooltip = document.getElementById(hint.getAttribute("aria-describedby")!)!;
    expect(tooltip).toHaveAttribute("role", "tooltip");
    expect(tooltip).toHaveTextContent(
      "Printed on your gate tag and your membership card, like B-14.",
    );
    expect(container.querySelector(".loam-Input-field")).toContainElement(hint);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
