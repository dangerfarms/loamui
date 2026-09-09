import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
  localStorage.clear();
});
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("scheme-toggle", () => {
  it("is a named radio group whose choice sets data-theme on the root and is remembered", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("radiogroup", { name: "Colour scheme" })).toHaveClass("scheme-toggle");
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();

    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("loamui-theme")).toBe("dark");

    fireEvent.click(screen.getByRole("radio", { name: "System" }));
    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(localStorage.getItem("loamui-theme")).toBeNull();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
