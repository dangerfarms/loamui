import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("image-comparison", () => {
  it("is a figure whose named range writes the reveal position onto it", async () => {
    const { container } = render(<Example />);
    const figure = container.querySelector("figure.image-comparison") as HTMLElement;
    expect(figure.style.getPropertyValue("--_position")).toBe("50%");
    const slider = screen.getByRole("slider", { name: "Reveal the colour photograph" });
    fireEvent.change(slider, { target: { value: "25" } });
    expect(figure.style.getPropertyValue("--_position")).toBe("25%");
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[1]?.getAttribute("alt")).toMatch(/colour/);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
