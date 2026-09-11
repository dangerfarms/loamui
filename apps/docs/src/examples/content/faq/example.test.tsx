import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import Example from "./Example";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("faq", () => {
  it("keeps disclosure groups independent across instances", () => {
    const { container } = render(
      <>
        <Example />
        <Example />
      </>,
    );
    const regions = container.querySelectorAll("section.faq");
    const names = Array.from(regions).map(
      (region) =>
        new Set(
          Array.from(region.querySelectorAll("details")).map((item) => item.getAttribute("name")),
        ),
    );
    expect(names[0]!.size).toBe(1);
    expect(names[1]!.size).toBe(1);
    expect([...names[0]!][0]).not.toBe([...names[1]!][0]);
  });
  it("is a region named by its h2 holding four disclosures that share one name and open on click", async () => {
    const { container } = render(<Example />);
    expect(screen.getByRole("region", { name: "Questions about ordering" })).toHaveClass("faq");
    const details = Array.from(container.querySelectorAll("details"));
    expect(details).toHaveLength(4);
    expect(new Set(details.map((item) => item.getAttribute("name"))).size).toBe(1);
    expect(details.every((item) => !item.open)).toBe(true);
    fireEvent.click(screen.getByText("What if a packet does not come up?"));
    expect(details.filter((item) => item.open)).toEqual([details[1]]);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
