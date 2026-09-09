import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("hero-with-image", () => {
  it("is a region named by its heading, with a link to go and a button to do", async () => {
    const { container } = render(<Example />);
    const region = screen.getByRole("region", { name: "Seed saved by growers, for growers." });
    expect(region).toHaveClass("hero-with-image");
    expect(screen.getByRole("link", { name: "Browse the catalogue" })).toHaveAttribute(
      "href",
      "/catalogue",
    );
    expect(screen.getByRole("button", { name: "Watch how we save seed" })).toBeInTheDocument();
    expect(screen.getByRole("img").getAttribute("alt")).toMatch(/seedlings/);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
