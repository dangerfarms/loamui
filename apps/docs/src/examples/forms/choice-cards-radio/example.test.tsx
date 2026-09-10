import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("choice-cards-radio", () => {
  it("is a radiogroup of cards, each a label around a radio named by its title alone", async () => {
    const { container } = render(<Example />);
    const group = screen.getByRole("radiogroup", { name: "Choose a membership" });
    expect(group).toHaveClass("choice-cards-radio");
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    const grower = screen.getByRole("radio", { name: "Grower" });
    expect(grower).toBeChecked();
    expect(grower).toHaveAttribute("name", "plan");
    expect(grower).toHaveAccessibleDescription(/£40 a year/);
    const card = grower.closest("label")!;
    expect(card).toHaveClass("loam-Card");
    expect(card).toHaveAttribute("for", grower.id);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
