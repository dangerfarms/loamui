import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "@loamui/core";
import { Banner } from "../components/Banner/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Banner", () => {
  it("renders a status region with the message and actions and no axe violations", async () => {
    const { container } = render(
      <Banner.Root>
        <Banner.Message>Version 2 is out. Read what changed before you upgrade.</Banner.Message>
        <Banner.Actions>
          <a href="/changelog">Read the changelog</a>
        </Banner.Actions>
      </Banner.Root>,
    );
    const status = screen.getByRole("status");
    expect(status).toHaveClass("loam-Banner");
    expect(status).toHaveTextContent("Version 2 is out.");
    expect(screen.getByRole("link", { name: "Read the changelog" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  // jsdom cannot evaluate a style query, so this asserts the structure the
  // stylesheet relies on: the Root is the container, and the bar that takes
  // the tint is the inner element it renders, with the parts inside it.
  it("paints the bar on an inner element so a context on the Root can tint it", async () => {
    const { container } = render(
      <Banner.Root style={{ "--loam-context": "warning" } as React.CSSProperties}>
        <Banner.Message>Maintenance on Saturday from 08:00 to 10:00 UTC.</Banner.Message>
        <Banner.Actions>
          <Button>See the status page</Button>
        </Banner.Actions>
      </Banner.Root>,
    );
    const status = screen.getByRole("status");
    expect(status).toHaveClass("loam-Banner");
    expect(status.style.getPropertyValue("--loam-context")).toBe("warning");
    const inner = status.querySelector(":scope > div.inner");
    expect(inner).not.toBeNull();
    expect(status.children).toHaveLength(1);
    expect(inner!.querySelector(":scope > p.message")).toHaveTextContent("Maintenance");
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
    expect(screen.getByRole("status")).toHaveClass("loam-Banner");
    expect(screen.getByRole("button", { name: "See the status page" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
