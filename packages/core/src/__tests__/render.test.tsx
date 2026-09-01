import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

import { composeRefs, mergeProps, renderWithProps } from "../render";

afterEach(cleanup);

describe("mergeProps", () => {
  it("chains event handlers — element's own first, wiring second", async () => {
    const user = userEvent.setup();
    const order: string[] = [];
    const props = mergeProps(
      { onClick: () => order.push("wiring") },
      { onClick: () => order.push("own") },
    );
    render(<button {...(props as object)}>go</button>);
    await user.click(screen.getByRole("button"));
    expect(order).toEqual(["own", "wiring"]);
  });

  it("concatenates className and aria-describedby", () => {
    const props = mergeProps(
      { className: "wiring", "aria-describedby": "tip-1" },
      { className: "own", "aria-describedby": "existing" },
    );
    expect(props.className).toBe("wiring own");
    expect(props["aria-describedby"]).toBe("existing tip-1");
  });

  it("merges style with wiring winning on conflicts", () => {
    const props = mergeProps(
      { style: { anchorName: "--a", color: "wiring" } },
      { style: { color: "own", margin: 1 } },
    );
    expect(props.style).toEqual({
      anchorName: "--a",
      color: "wiring",
      margin: 1,
    });
  });

  it("lets the element's own scalar props win", () => {
    const props = mergeProps({ type: "button", id: "wired" }, { id: "mine" });
    expect(props.id).toBe("mine");
    expect(props.type).toBe("button");
  });

  it("composes refs so both receive the node", () => {
    const a = createRef<HTMLButtonElement>();
    const fnTarget: { el: HTMLButtonElement | null } = { el: null };
    const composed = composeRefs<HTMLButtonElement>(a, (el) => {
      fnTarget.el = el;
    });
    const props = mergeProps({ ref: composed }, {});
    render(<button {...(props as object)}>ref</button>);
    expect(a.current).toBeInstanceOf(HTMLButtonElement);
    expect(fnTarget.el).toBe(a.current);
  });
});

describe("Button render polymorphism", () => {
  it("renders as a link with Button classes and attributes", async () => {
    const { Button } = await import("../index");
    render(<Button render={<a href="/signup" />}>Get started</Button>);
    const link = screen.getByRole("link", { name: "Get started" });
    expect(link).toHaveAttribute("href", "/signup");
    expect(link).toHaveClass("loam-Button");
  });
});

describe("Popover.Trigger render merge", () => {
  it("merges consumer className, children and onClick into the render element", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const { Popover } = await import("../index");
    render(
      <Popover.Root>
        <Popover.Trigger render={<a href="#x" />} className="mine" onClick={spy}>
          Go
        </Popover.Trigger>
      </Popover.Root>,
    );
    const link = screen.getByRole("link", { name: "Go" });
    expect(link).toHaveAttribute("href", "#x");
    expect(link.className).toContain("mine");
    await user.click(link);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("renderWithProps", () => {
  it("calls a function render with the wiring props", () => {
    const fn = vi.fn(() => <span>out</span>);
    render(<>{renderWithProps(fn, { id: "x" })}</>);
    expect(fn).toHaveBeenCalledWith({ id: "x" });
    expect(screen.getByText("out")).toBeInTheDocument();
  });

  it("clones an element render with merged props", () => {
    render(
      <>
        {renderWithProps(<button className="own">el</button>, {
          className: "wiring",
          id: "b1",
        })}
      </>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toBe("wiring own");
    expect(btn.id).toBe("b1");
  });

  it("returns null for invalid targets", () => {
    expect(renderWithProps(null as never, {})).toBeNull();
  });

  it("warns in dev when render receives a component reference", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function MyButton() {
      return <button>x</button>;
    }
    render(<>{renderWithProps(MyButton as never, {})}</>);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("render={<MyButton />}"));
    spy.mockRestore();
  });
});
