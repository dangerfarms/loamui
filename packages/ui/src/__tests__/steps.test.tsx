import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Steps } from "../components/Steps/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Steps", () => {
  it("is an ordered list of steps, each a heading over a paragraph", async () => {
    const { container } = render(
      <Steps.Root>
        <Steps.Item>
          <Steps.Title>Install the packages</Steps.Title>
          <Steps.Description>Core for the primitives, ui for the compositions.</Steps.Description>
        </Steps.Item>
        <Steps.Item>
          <Steps.Title>Import the stylesheets once</Steps.Title>
          <Steps.Description>At the app root, core before ui.</Steps.Description>
        </Steps.Item>
        <Steps.Item>
          <Steps.Title>Compose from parts</Steps.Title>
          <Steps.Description>
            Semantic markup first; a component when the element needs more.
          </Steps.Description>
        </Steps.Item>
      </Steps.Root>,
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list).toHaveClass("loam-Steps");
    expect(list).toHaveAttribute("role", "list");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.querySelectorAll("ol > li")).toHaveLength(3);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("refuses an Item outside a Root, which is the list it is a step of", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Steps.Item>
          <Steps.Title>Orphan</Steps.Title>
        </Steps.Item>,
      ),
    ).toThrow("Steps.Item must be rendered inside <Steps.Root>.");
    error.mockRestore();
  });

  it("renders the title as the heading the page needs", () => {
    render(
      <Steps.Root>
        <Steps.Item>
          <Steps.Title render={<h2 />}>Install the packages</Steps.Title>
        </Steps.Item>
      </Steps.Root>,
    );
    const heading = screen.getByRole("heading", { level: 2, name: "Install the packages" });
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("title");
    expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
  });

  it("hosts a time in the marker for a timeline", async () => {
    const { container } = render(
      <Steps.Root>
        <Steps.Item>
          <Steps.Marker>
            <time dateTime="2026-03">Mar 2026</time>
          </Steps.Marker>
          <Steps.Title>First release</Steps.Title>
          <Steps.Description>Tokens, element styles and 20 components.</Steps.Description>
        </Steps.Item>
      </Steps.Root>,
    );
    const marker = container.querySelector("li > span.marker");
    expect(marker).not.toBeNull();
    expect(marker!.querySelector("time")).toHaveAttribute("dateTime", "2026-03");
    expect(marker).not.toHaveAttribute("aria-hidden");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  // jsdom cannot evaluate the :has() rules, so this asserts what they key
  // on: the attribute the consumer sets is on the li the stylesheet reads,
  // and assistive technology announces it, so the progress is never colour
  // alone.
  it("marks the step a sequence has reached with aria-current on the item", async () => {
    const { container } = render(
      <Steps.Root>
        <Steps.Item>
          <Steps.Title>Order placed</Steps.Title>
        </Steps.Item>
        <Steps.Item aria-current="step">
          <Steps.Title>Dispatched</Steps.Title>
        </Steps.Item>
        <Steps.Item>
          <Steps.Title>Delivered</Steps.Title>
        </Steps.Item>
      </Steps.Root>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[2]).not.toHaveAttribute("aria-current");
    expect(container.querySelector("li[aria-current='step']")).toHaveTextContent("Dispatched");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
