import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Stat } from "../components/Stat/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Stat", () => {
  it("is a core Card rendered as a description list of one pair, label before value in the DOM", async () => {
    const { container } = render(
      <Stat.Root>
        <Stat.Label>Components</Stat.Label>
        <Stat.Value>34</Stat.Value>
      </Stat.Root>,
    );
    const dl = container.querySelector("dl.loam-Stat");
    expect(dl).not.toBeNull();
    // The surface is the Card's: its class is on the same element, and no
    // rule of the composition repeats it.
    expect(dl).toHaveClass("loam-Card");
    const [dt, dd] = [dl!.querySelector("dt.label"), dl!.querySelector("dd.value")];
    expect(dt).toHaveTextContent("Components");
    expect(dd).toHaveTextContent("34");
    expect(dt!.compareDocumentPosition(dd!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector(".loam-Stat-group")).toBeNull();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("sits in an optional Group that only lays tiles out", async () => {
    const { container } = render(
      <Stat.Group>
        <Stat.Root>
          <Stat.Label>Uptime</Stat.Label>
          <Stat.Value>99.9%</Stat.Value>
        </Stat.Root>
        <Stat.Root style={{ "--loam-context": "success" } as React.CSSProperties}>
          <Stat.Label>Contrast audit</Stat.Label>
          <Stat.Value>100%</Stat.Value>
        </Stat.Root>
      </Stat.Group>,
    );
    const group = container.querySelector("div.loam-Stat-group")!;
    expect(group.querySelectorAll(":scope > dl.loam-Stat")).toHaveLength(2);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("forwards a ref and the rest of the props to the dl", () => {
    const ref = { current: null as HTMLDListElement | null };
    render(
      <Stat.Root ref={ref} data-testid="tile" className="mine">
        <Stat.Label>Uptime</Stat.Label>
        <Stat.Value>99.9%</Stat.Value>
      </Stat.Root>,
    );
    expect(ref.current?.tagName).toBe("DL");
    expect(screen.getByTestId("tile")).toHaveClass("loam-Stat", "loam-Card", "mine");
  });

  it("refuses a Label or a Value outside a Root, which is the pair they are half of", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Stat.Label>Orphan</Stat.Label>)).toThrow(
      "Stat.Label must be rendered inside <Stat.Root>.",
    );
    expect(() => render(<Stat.Value>1</Stat.Value>)).toThrow(
      "Stat.Value must be rendered inside <Stat.Root>.",
    );
    error.mockRestore();
  });
});
