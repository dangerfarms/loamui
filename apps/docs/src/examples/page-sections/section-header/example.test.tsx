import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("section-header", () => {
  it("adds no landmark of its own and gives the heading an id for the section to point at", async () => {
    const { container } = render(<Example />);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 2, name: "Learn to grow from seed" });
    expect(heading).toHaveAttribute("id", "section-header-title");
    expect(screen.getByText("Growing guides").tagName).toBe("P");
    expect(screen.getByRole("link", { name: "All guides" })).toHaveAttribute("href", "/guides");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
