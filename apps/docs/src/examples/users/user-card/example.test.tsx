import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("user-card", () => {
  it("is a Card rendered as an article named by the person, with three labelled figures and a follow button", async () => {
    const { container } = render(<Example />);
    const card = screen.getByRole("article", { name: "Imogen Hartley" });
    expect(card).toHaveClass("loam-Card", "user-card");
    expect(card.querySelector(".loam-Avatar")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("heading", { level: 2, name: "Imogen Hartley" })).toBeInTheDocument();
    expect(screen.getByText("Varieties saved").tagName).toBe("DT");
    expect(screen.getByText("38").tagName).toBe("DD");
    expect(card.querySelectorAll("dl.stats dd")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Follow" })).toHaveClass("loam-Button");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
