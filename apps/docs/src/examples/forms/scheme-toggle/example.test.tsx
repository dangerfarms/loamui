import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
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
    expect(localStorage.getItem("color-scheme")).toBe("dark");

    fireEvent.click(screen.getByRole("radio", { name: "System" }));
    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(localStorage.getItem("color-scheme")).toBeNull();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
  it("keeps two controls in step without modifying another application's storage key", () => {
    localStorage.setItem("loamui-theme", "light");
    render(
      <>
        <Example />
        <Example />
      </>,
    );
    const groups = screen.getAllByRole("radiogroup");
    fireEvent.click(within(groups[0]!).getByRole("radio", { name: "Dark" }));
    expect(within(groups[1]!).getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(localStorage.getItem("loamui-theme")).toBe("light");
    localStorage.setItem("color-scheme", "light");
    fireEvent(window, new StorageEvent("storage", { key: "color-scheme", newValue: "light" }));
    for (const group of groups)
      expect(within(group).getByRole("radio", { name: "Light" })).toBeChecked();
  });

  it("keeps the selected control and document in step when storage refuses writes", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Unavailable", "SecurityError");
    });
    render(<Example />);
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
  });
});
