import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("number-input-with-slider", () => {
  it("names the box and the slider by the one label and keeps the two on the same value", async () => {
    const { container } = render(<Example />);
    const box = screen.getByRole("textbox", { name: "Propagator temperature" });
    const slider = screen.getByRole("slider", { name: "Propagator temperature" });
    expect(box).toHaveAttribute("size", "3");
    expect(box).toHaveValue("20");
    expect(slider).toHaveValue("20");
    expect(slider).toHaveAccessibleDescription(
      "Between 10 and 30 °C. Most seed germinates fastest around 20.",
    );

    fireEvent.change(slider, { target: { value: "25" } });
    expect(box).toHaveValue("25");

    fireEvent.change(box, { target: { value: "1" } });
    expect(slider).toHaveValue("25");
    fireEvent.change(box, { target: { value: "12" } });
    expect(slider).toHaveValue("12");

    fireEvent.change(box, { target: { value: "99" } });
    fireEvent.blur(box);
    expect(box).toHaveValue("30");
    expect(slider).toHaveValue("30");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
