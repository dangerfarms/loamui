import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge, SignpostLink } from "@loamui/core";
import { Hero } from "../components/Hero/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Hero", () => {
  it("renders a section named by its title, with the parts in order and no axe violations", async () => {
    const { container } = render(
      <Hero.Root>
        <Hero.Eyebrow>
          <Badge>New</Badge>
        </Hero.Eyebrow>
        <Hero.Title>Modern UI primitives</Hero.Title>
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

  it("hosts media beside the text with no axe violations", async () => {
    const { container } = render(
      <Hero.Root>
        <Hero.Title>With a picture</Hero.Title>
        <Hero.Media>
          <img src="/hero.png" alt="A desk with component sheets" width="1200" height="800" />
        </Hero.Media>
      </Hero.Root>,
    );
    expect(container.querySelector(".loam-Hero div.media > img")).toHaveAttribute("alt");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  // jsdom cannot lay out a container query, so this asserts the structure
  // the stylesheet relies on: the section is the container, the grid is
  // the inner element it renders, and every part is a direct child of that
  // grid, media included, so the template and the placement rules answer
  // the same container. The hero sits outside any container of its own.
  it("renders the grid as an inner element of the section, with every part a direct child", () => {
    const { container } = render(
      <Hero.Root>
        <Hero.Eyebrow>Case study</Hero.Eyebrow>
        <Hero.Title>Two columns</Hero.Title>
        <Hero.Lede>Where there is room.</Hero.Lede>
        <Hero.Actions>
          <a href="/story">Read it</a>
        </Hero.Actions>
        <Hero.Media>
          <img src="/hero.png" alt="" width="1200" height="800" />
        </Hero.Media>
      </Hero.Root>,
    );
    const section = container.querySelector("section.loam-Hero")!;
    const inner = section.querySelector(":scope > div.inner");
    expect(inner).not.toBeNull();
    expect(section.children).toHaveLength(1);
    const parts = Array.from(inner!.children).map((child) => child.className);
    expect(parts).toEqual(["eyebrow", "title", "lede", "actions", "media"]);
    expect(inner!.querySelector(":scope > div.media > img")).not.toBeNull();
  });

  it("forwards a ref from every part", () => {
    const refs = {
      eyebrow: { current: null as HTMLDivElement | null },
      lede: { current: null as HTMLParagraphElement | null },
      actions: { current: null as HTMLDivElement | null },
      media: { current: null as HTMLDivElement | null },
    };
    render(
      <Hero.Root>
        <Hero.Eyebrow ref={refs.eyebrow}>New</Hero.Eyebrow>
        <Hero.Title>Refs</Hero.Title>
        <Hero.Lede ref={refs.lede}>Every part.</Hero.Lede>
        <Hero.Actions ref={refs.actions}>
          <a href="/docs">Docs</a>
        </Hero.Actions>
        <Hero.Media ref={refs.media}>
          <img src="/hero.png" alt="" />
        </Hero.Media>
      </Hero.Root>,
    );
    expect(refs.eyebrow.current).toHaveClass("eyebrow");
    expect(refs.lede.current).toHaveClass("lede");
    expect(refs.actions.current).toHaveClass("actions");
    expect(refs.media.current).toHaveClass("media");
  });

  it("lets a name of the consumer's own win over the title's", () => {
    render(
      <Hero.Root aria-label="Welcome">
        <Hero.Title>Modern UI primitives</Hero.Title>
      </Hero.Root>,
    );
    expect(screen.getByRole("region", { name: "Welcome" })).not.toHaveAttribute("aria-labelledby");
  });

  it("renders the title as an h2 when asked", () => {
    render(
      <Hero.Root>
        <Hero.Title render={<h2 />}>Inside a page</Hero.Title>
      </Hero.Root>,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Inside a page");
  });
});
