import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("table-sticky-header", () => {
  it("is a Table that is itself the focusable region named by its caption, holding all twelve rows", async () => {
    const { container } = render(<Example />);
    const region = screen.getByRole("region", { name: /Seed stock on 8 September 2026/ });
    // The Table's own element is the scroller, so it is the region.
    expect(region).toHaveClass("loam-Table", "stock");
    expect(region).toHaveAttribute("tabindex", "0");
    expect(container.querySelector("div.table-sticky-header")).toContainElement(region);
    expect(screen.getAllByRole("rowheader")).toHaveLength(12);
    expect(screen.getAllByRole("columnheader")).toHaveLength(4);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
