import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("faq-with-background", () => {
  it("is a region named by its h2 holding four disclosures that share one name and open on click", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("region", { name: "Questions about ordering" })).toHaveClass(
      "faq-with-background",
    );
    const details = Array.from(container.querySelectorAll("details"));
    expect(details).toHaveLength(4);
    expect(new Set(details.map((item) => item.getAttribute("name")))).toEqual(
      new Set(["faq-with-background"]),
    );
    expect(details.every((item) => !item.open)).toBe(true);
    fireEvent.click(screen.getByText("What if a packet does not come up?"));
    expect(details.filter((item) => item.open)).toEqual([details[1]]);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
