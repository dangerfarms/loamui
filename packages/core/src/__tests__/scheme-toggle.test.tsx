import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { SchemeToggle } from "../components/SchemeToggle/index";

const KEY = "loamui-theme";

/** A fresh in-memory Storage per test, so nothing leaks between them. */
function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => map.get(k) ?? null,
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    removeItem: (k: string) => {
      map.delete(k);
    },
    setItem: (k: string, v: string) => {
      map.set(k, String(v));
    },
  };
}

beforeEach(() => {
  vi.stubGlobal("localStorage", memoryStorage());
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  delete document.documentElement.dataset.theme;
});

describe("SchemeToggle", () => {
  it("renders a named group of three radios with System checked", () => {
    render(<SchemeToggle />);
    expect(screen.getByRole("group", { name: "Colour scheme" })).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios.map((r) => r.getAttribute("value"))).toEqual(["system", "light", "dark"]);
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Light" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "Dark" })).not.toBeChecked();
  });

  it("choosing Dark sets data-theme on the root element and stores it", async () => {
    const user = userEvent.setup();
    render(<SchemeToggle />);
    await user.click(screen.getByRole("radio", { name: "Dark" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(KEY)).toBe("dark");
    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
  });

  it("choosing System removes the attribute and the stored value", async () => {
    const user = userEvent.setup();
    render(<SchemeToggle />);
    await user.click(screen.getByRole("radio", { name: "Light" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    await user.click(screen.getByRole("radio", { name: "System" }));
    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
  });

  it("applies a stored choice on mount", () => {
    localStorage.setItem(KEY, "light");
    render(<SchemeToggle />);
    expect(screen.getByRole("radio", { name: "Light" })).toBeChecked();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("honours a custom storage key", async () => {
    const user = userEvent.setup();
    render(<SchemeToggle storageKey="acme-scheme" />);
    await user.click(screen.getByRole("radio", { name: "Dark" }));
    expect(localStorage.getItem("acme-scheme")).toBe("dark");
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("fires onChange with the chosen scheme", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SchemeToggle onChange={onChange} />);
    await user.click(screen.getByRole("radio", { name: "Dark" }));
    expect(onChange).toHaveBeenCalledWith("dark");
    await user.click(screen.getByRole("radio", { name: "System" }));
    expect(onChange).toHaveBeenLastCalledWith("system");
  });

  it("takes a custom legend and labels", () => {
    render(<SchemeToggle label="Appearance" labels={{ system: "Auto" }} showLabel />);
    expect(screen.getByRole("group", { name: "Appearance" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Auto" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Light" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<SchemeToggle />);
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
