import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("hero-background-image", () => {
  it("is a region named by its h1 whose photograph is decorative", async () => {
    const { container } = render(<Example />);
    const region = screen.getByRole("region", {
      name: "A field of seed, saved by the people who sow it.",
    });
    expect(region).toHaveClass("hero-background-image");
    expect(container.querySelector("img.media")).toHaveAttribute("alt", "");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse the catalogue" })).toHaveAttribute(
      "href",
      "/catalogue",
    );
    expect(screen.getByRole("button", { name: "Watch the harvest" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
