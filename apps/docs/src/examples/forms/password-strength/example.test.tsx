import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("password-strength", () => {
  it("describes the box by its rules as well as its description, and ticks a rule once it is met", async () => {
    const { container } = render(<Example />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("autocomplete", "new-password");
    const rules = document.getElementById("new-password-rules")!;
    expect(input.getAttribute("aria-describedby")!.split(" ")).toEqual(
      expect.arrayContaining(["new-password-description", rules.id]),
    );
    const meter = screen.getByRole("meter", { name: "Password strength" });
    expect(meter).toHaveAttribute("aria-valuetext", "Nothing typed yet");
    expect(rules.querySelectorAll("li[data-met]")).toHaveLength(1);

    fireEvent.change(input, { target: { value: "hedgerow seed saver" } });
    expect(within(rules).getByText("At least 12 characters").closest("li")).toHaveAttribute(
      "data-met",
    );
    expect(rules.querySelectorAll("li[data-met]")).toHaveLength(3);
    expect(meter).toHaveAttribute("aria-valuetext", "Strong");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
