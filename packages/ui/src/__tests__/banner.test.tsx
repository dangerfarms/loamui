import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "@loamui/core";
import { Banner } from "../components/Banner/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Banner", () => {
  it("renders a bar with no role of its own, the message and actions, and no axe violations", async () => {
    const { container } = render(
      <Banner.Root>
        <Banner.Message>Version 2 is out. Read what changed before you upgrade.</Banner.Message>
        <Banner.Actions>
          <a href="/changelog">Read the changelog</a>
        </Banner.Actions>
      </Banner.Root>,
    );
    const bar = container.querySelector(".loam-Banner")!;
    expect(bar.tagName).toBe("DIV");
    // Content in the page from the start is not news; a consumer that
    // injects a bar after load passes role="status" itself.
    expect(bar).not.toHaveAttribute("role");
    expect(screen.queryByRole("status")).toBeNull();
    expect(bar).toHaveTextContent("Version 2 is out.");
    expect(screen.getByRole("link", { name: "Read the changelog" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("is a status when the consumer says the bar arrived after load", () => {
    render(
      <Banner.Root role="status">
        <Banner.Message>Saved.</Banner.Message>
      </Banner.Root>,
    );
    expect(screen.getByRole("status")).toHaveClass("loam-Banner");
  });

  // jsdom cannot evaluate a style query, so this asserts the structure the
  // stylesheet relies on: the Root is the container, and the bar that takes
  // the tint is the inner element it renders, with the parts inside it.
  it("paints the bar on an inner element so a context on the Root can tint it, with a hidden icon and a hidden status word", async () => {
    const { container } = render(
      <Banner.Root style={{ "--loam-context": "warning" } as React.CSSProperties}>
        <Banner.Icon>
          <svg viewBox="0 0 24 24" />
        </Banner.Icon>
        <Banner.Message>
          <span className="loam-VisuallyHidden">Warning: </span>
          Maintenance on Saturday from 08:00 to 10:00 UTC.
        </Banner.Message>
        <Banner.Actions>
          <Button>See the status page</Button>
        </Banner.Actions>
      </Banner.Root>,
    );
    const bar = container.querySelector(".loam-Banner") as HTMLElement;
    expect(bar.style.getPropertyValue("--loam-context")).toBe("warning");
    const inner = bar.querySelector(":scope > div.inner");
    expect(inner).not.toBeNull();
    expect(bar.children).toHaveLength(1);
    expect(inner!.querySelector(":scope > span.icon")).toHaveAttribute("aria-hidden", "true");
    const message = inner!.querySelector(":scope > p.message")!;
    expect(message).toHaveTextContent("Warning: Maintenance");
    expect(message.querySelector(".loam-VisuallyHidden")).toHaveTextContent("Warning:");
    expect(inner!.querySelector(":scope > div.actions")).toContainElement(
      screen.getByRole("button", { name: "See the status page" }),
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("keeps the same markup inside a region declared around it", async () => {
    const { container } = render(
      <div style={{ "--loam-context": "warning" } as React.CSSProperties}>
        <Banner.Root>
          <Banner.Message>Maintenance on Saturday from 08:00 to 10:00 UTC.</Banner.Message>
          <Banner.Actions>
            <Button>See the status page</Button>
          </Banner.Actions>
        </Banner.Root>
      </div>,
    );
    expect(container.querySelector(".loam-Banner")).not.toBeNull();
    expect(screen.getByRole("button", { name: "See the status page" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("forwards a ref from every part", () => {
    const refs = {
      root: { current: null as HTMLDivElement | null },
      icon: { current: null as HTMLSpanElement | null },
      message: { current: null as HTMLParagraphElement | null },
      actions: { current: null as HTMLDivElement | null },
    };
    render(
      <Banner.Root ref={refs.root}>
        <Banner.Icon ref={refs.icon}>
          <svg viewBox="0 0 24 24" />
        </Banner.Icon>
        <Banner.Message ref={refs.message}>Hello.</Banner.Message>
        <Banner.Actions ref={refs.actions}>
          <a href="/">Home</a>
        </Banner.Actions>
      </Banner.Root>,
    );
    expect(refs.root.current).toHaveClass("loam-Banner");
    expect(refs.icon.current).toHaveClass("icon");
    expect(refs.message.current).toHaveClass("message");
    expect(refs.actions.current).toHaveClass("actions");
  });
});
