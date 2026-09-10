import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("card-background-image", () => {
  it("is a Card article named by its heading, with a decorative photo and a link that names the article", async () => {
    const { container } = render(<Example />);
    const article = screen.getByRole("article", { name: "The walled garden after closing" });
    expect(article).toHaveClass("loam-Card");
    const photo = article.querySelector("img.media");
    expect(photo).toHaveAttribute("alt", "");
    expect(screen.getByText("Members’ plots")).toHaveClass("loam-Badge");
    expect(
      screen.getByRole("link", { name: "Read article – The walled garden after closing" }),
    ).toHaveAttribute("href", "/journal/walled-garden-after-closing");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
