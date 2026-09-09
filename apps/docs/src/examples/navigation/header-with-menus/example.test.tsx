import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("header-with-menus", () => {
  it("holds a named nav whose menus open on a press to lists of links, with the current page marked", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("banner")).toHaveClass("header-with-menus");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(screen.getByRole("link", { name: "Seeds" })).toHaveAttribute("aria-current", "page");

    const learn = screen.getByRole("button", { name: "Learn" });
    const support = screen.getByRole("button", { name: "Support" });
    for (const trigger of [learn, support]) {
      expect(nav.contains(trigger)).toBe(true);
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    fireEvent.click(learn);
    expect(learn).toHaveAttribute("aria-expanded", "true");
    const items = screen.getAllByRole("menuitem");
    expect(items.map((item) => item.textContent)).toEqual([
      "Growing guides",
      "Sowing calendar",
      "Seed saving",
      "Courses",
    ]);
    for (const item of items) expect(item).toHaveAttribute("href");
    await waitFor(() => expect(items[0]).toHaveFocus());
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
    expect(screen.getByRole("link", { name: "Join the co-op" })).toHaveClass("loam-SignpostLink");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
