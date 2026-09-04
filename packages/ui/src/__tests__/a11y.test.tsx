import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge, SignpostLink } from "@loamui/core";
import { Hero } from "../index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Hero", () => {
  it("renders a section with the parts in order and no axe violations", async () => {
    const { container } = render(
      <Hero.Root aria-labelledby="t">
        <Hero.Eyebrow>
          <Badge>New</Badge>
        </Hero.Eyebrow>
        <Hero.Title id="t">Modern UI primitives</Hero.Title>
        <Hero.Lede>Three primitives your agent builds from.</Hero.Lede>
        <Hero.Actions>
          <SignpostLink href="/docs">Get started</SignpostLink>
        </Hero.Actions>
      </Hero.Root>,
    );
    const region = screen.getByRole("region", { name: "Modern UI primitives" });
    expect(region).toHaveClass("loam-Hero");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Modern UI primitives");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title as an h2 when asked", () => {
    render(
      <Hero.Root>
        <Hero.Title render="h2">Inside a page</Hero.Title>
      </Hero.Root>,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Inside a page");
  });
});
