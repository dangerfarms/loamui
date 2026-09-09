import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("side-nav-rail", () => {
  it("is a named nav of links named by hidden text, each described by a tooltip that opens on focus", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("navigation", { name: "Nursery" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hedgerow" })).toHaveAttribute("href", "/");
    const orders = screen.getByRole("link", { name: "Orders" });
    expect(orders).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("link")).toHaveLength(7);
    for (const svg of container.querySelectorAll("svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }

    const bubble = document.getElementById(orders.getAttribute("aria-describedby")!)!;
    expect(bubble).toHaveAttribute("role", "tooltip");
    expect(bubble).toHaveTextContent("Orders");
    expect(bubble).not.toBeVisible();
    act(() => orders.focus());
    expect(bubble).toBeVisible();
    expect(orders).toHaveAttribute("data-popup-open", "true");
    expect(orders.closest(".loam-Tooltip")).not.toBeNull();
    act(() => orders.blur());
    expect(bubble).not.toBeVisible();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
