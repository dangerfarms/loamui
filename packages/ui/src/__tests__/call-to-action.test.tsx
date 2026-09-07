import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SignpostLink } from "@loamui/core";
import { CallToAction } from "../components/CallToAction/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("CallToAction", () => {
  it("renders a section named by its title, with the parts in order and no axe violations", async () => {
    const { container } = render(
      <CallToAction.Root>
        <CallToAction.Title>Start building</CallToAction.Title>
        <CallToAction.Lede>
          Install the package, import one stylesheet and start with any component.
        </CallToAction.Lede>
        <CallToAction.Actions>
          <SignpostLink href="/docs">Read the docs</SignpostLink>
          <a href="/docs/components">Browse components</a>
        </CallToAction.Actions>
      </CallToAction.Root>,
    );
    const region = screen.getByRole("region", { name: "Start building" });
    expect(region).toHaveClass("loam-CallToAction");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Start building");
    expect(screen.getByText(/Install the package/)).toHaveClass("lede");
    expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: "Browse components" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("hosts media beside the words with no axe violations", async () => {
    const { container } = render(
      <CallToAction.Root>
        <CallToAction.Title>Take the docs with you</CallToAction.Title>
        <CallToAction.Media>
          <img src="/docs.png" alt="A printed page of documentation" width="800" height="600" />
        </CallToAction.Media>
      </CallToAction.Root>,
    );
    expect(container.querySelector(".loam-CallToAction div.media > img")).toHaveAttribute("alt");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  // jsdom cannot lay out a container query, so this asserts the structure
  // the stylesheet relies on: the section is the container, the grid is
  // the inner element it renders, and every part is a direct child of that
  // grid, media included. The block sits outside any container of its own.
  it("renders the grid as an inner element of the section, with every part a direct child", () => {
    const { container } = render(
      <CallToAction.Root>
        <CallToAction.Title>Two columns</CallToAction.Title>
        <CallToAction.Lede>Where there is room.</CallToAction.Lede>
        <CallToAction.Actions>
          <a href="/docs">Docs</a>
        </CallToAction.Actions>
        <CallToAction.Media>
          <img src="/docs.png" alt="" width="800" height="600" />
        </CallToAction.Media>
      </CallToAction.Root>,
    );
    const section = container.querySelector("section.loam-CallToAction")!;
    const inner = section.querySelector(":scope > div.inner");
    expect(inner).not.toBeNull();
    expect(section.children).toHaveLength(1);
    const parts = Array.from(inner!.children).map((child) => child.className);
    expect(parts).toEqual(["title", "lede", "actions", "media"]);
    expect(inner!.querySelector(":scope > div.media > img")).not.toBeNull();
  });

  it("names the section in the first render, so the server's HTML carries the name", () => {
    render(
      <CallToAction.Root>
        <CallToAction.Title>Named on the server</CallToAction.Title>
      </CallToAction.Root>,
    );
    const region = screen.getByRole("region", { name: "Named on the server" });
    expect(region).toHaveAttribute("aria-labelledby", screen.getByRole("heading").id);
  });

  it("renders the root as an aside when asked", () => {
    render(
      <CallToAction.Root render={<aside />}>
        <CallToAction.Title>Beside the article</CallToAction.Title>
      </CallToAction.Root>,
    );
    expect(screen.getByRole("complementary", { name: "Beside the article" })).toHaveClass(
      "loam-CallToAction",
    );
  });

  it("lets a name of the consumer's own win over the title's", () => {
    render(
      <>
        <h2 id="next">What next</h2>
        <CallToAction.Root aria-labelledby="next">
          <CallToAction.Title>Start building</CallToAction.Title>
        </CallToAction.Root>
      </>,
    );
    expect(screen.getByRole("region", { name: "What next" })).toBeInTheDocument();
  });

  it("renders the title as an h3 when asked", () => {
    render(
      <CallToAction.Root>
        <CallToAction.Title render={<h3 />}>Under a page's own headings</CallToAction.Title>
      </CallToAction.Root>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Under a page's own headings",
    );
  });
});
