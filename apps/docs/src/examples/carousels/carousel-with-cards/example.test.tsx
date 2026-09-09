import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("carousel-with-cards", () => {
  it("is a carousel region named by its heading, with five Card articles, named controls and a dot per article", async () => {
    const { container } = render(<Example />);
    const region = screen.getByRole("region", { name: "From the growers’ journal" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(region.querySelectorAll("ul.track > li article.loam-Card")).toHaveLength(5);
    expect(screen.getByRole("button", { name: "Previous articles" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next articles" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to article 3 of 5" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Read article – Sowing broad beans in autumn" }),
    ).toHaveAttribute("href", "/journal/autumn-broad-beans");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
