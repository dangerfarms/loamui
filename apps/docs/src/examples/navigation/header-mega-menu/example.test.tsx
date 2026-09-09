import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("header-mega-menu", () => {
  it("opens a named dialog of guide links from a button in the primary nav", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("banner")).toHaveClass("header-mega-menu");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(screen.getByRole("link", { name: "Seeds" })).toHaveAttribute("aria-current", "page");

    const trigger = screen.getByRole("button", { name: "Growing" });
    expect(nav.contains(trigger)).toBe(true);
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const dialog = screen.getByRole("dialog", { name: "Growing with Hedgerow" });
    expect(dialog).toHaveAccessibleDescription(
      "Guides written by the co-op’s growers, free to read.",
    );
    const guides = dialog.querySelectorAll("ul.guides a");
    expect(guides).toHaveLength(6);
    expect(guides[0]).toHaveAccessibleName(
      "Sowing calendar What to sow this month, by crop and by region.",
    );
    expect(screen.getByRole("link", { name: "See the course" })).toHaveAttribute(
      "href",
      "/courses/beginners",
    );
    // The example's own icons; a SignpostLink hides its chevron by the span around it.
    for (const svg of container.querySelectorAll("svg:not(.loam-SignpostLink svg)")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
