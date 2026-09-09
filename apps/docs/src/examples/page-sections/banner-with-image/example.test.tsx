import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("banner-with-image", () => {
  it("is a region named by its h2 with a photograph that carries alt text and one link to go", async () => {
    const { container } = render(<Example />);
    expect(
      screen.getByRole("region", { name: "Members take a fifth off fruit trees" }),
    ).toHaveClass("banner-with-image");
    expect(screen.getByRole("img").getAttribute("alt")).toMatch(/apple trees/);
    expect(screen.getByText("Until 30 November")).toHaveClass("loam-Badge");
    expect(screen.getByRole("link", { name: "See the fruit list" })).toHaveAttribute(
      "href",
      "/catalogue/fruit",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
