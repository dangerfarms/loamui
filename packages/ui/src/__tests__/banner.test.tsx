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

  it("keeps the same markup inside a warning region and stays free of axe violations", async () => {
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
