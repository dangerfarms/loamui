import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SignpostLink } from "@loamui/core";
import { SectionHeader } from "../components/SectionHeader/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("SectionHeader", () => {
  it("is a div holding an eyebrow, an h2, a description and actions that a section can be named by, with no axe violations", async () => {
    const { container } = render(
      <section aria-labelledby="pricing">
        <SectionHeader.Root>
          <SectionHeader.Eyebrow>Pricing</SectionHeader.Eyebrow>
          <SectionHeader.Title id="pricing">One plan, no tiers</SectionHeader.Title>
          <SectionHeader.Description>
            Every feature, every seat, one price.
          </SectionHeader.Description>
          <SectionHeader.Actions>
            <SignpostLink href="/pricing">See the details</SignpostLink>
          </SectionHeader.Actions>
        </SectionHeader.Root>
        <p>The plan.</p>
      </section>,
    );
    const root = container.querySelector(".loam-SectionHeader")!;
    expect(root.tagName).toBe("DIV");
    expect(screen.getByRole("region", { name: "One plan, no tiers" })).toContainElement(
      root as HTMLElement,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("title");
    expect(screen.getByText("Pricing")).toHaveClass("eyebrow");
    expect(screen.getByText("Every feature, every seat, one price.")).toHaveClass("description");
    expect(screen.getByRole("link", { name: "See the details" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  // jsdom cannot lay out a container query, so this asserts the structure
  // the stylesheet relies on: the Root is the container, the grid is the
  // inner element it renders, and every part is a direct child of that grid.
  it("renders the grid as an inner element of the root, with every part a direct child", () => {
    const { container } = render(
      <SectionHeader.Root>
        <SectionHeader.Eyebrow>Guides</SectionHeader.Eyebrow>
        <SectionHeader.Title>Learn the three primitives</SectionHeader.Title>
        <SectionHeader.Description>Short reads.</SectionHeader.Description>
        <SectionHeader.Actions>
          <a href="/guides">All guides</a>
        </SectionHeader.Actions>
      </SectionHeader.Root>,
    );
    const root = container.querySelector(".loam-SectionHeader")!;
    const inner = root.querySelector(":scope > div.inner");
    expect(inner).not.toBeNull();
    expect(root.children).toHaveLength(1);
    const parts = Array.from(inner!.children).map((child) => child.className);
    expect(parts).toEqual(["eyebrow", "title", "description", "actions"]);
  });

  it("renders as a header with an h3 when asked, and forwards refs and rest props", () => {
    const refs = {
      root: { current: null as HTMLDivElement | null },
      title: { current: null as HTMLHeadingElement | null },
    };
    const { container } = render(
      <SectionHeader.Root
        ref={refs.root}
        render={<header />}
        style={{ textAlign: "center", justifyItems: "center" }}
      >
        <SectionHeader.Title ref={refs.title} render={<h3 />}>
          Centred
        </SectionHeader.Title>
      </SectionHeader.Root>,
    );
    const root = container.querySelector("header.loam-SectionHeader") as HTMLElement;
    expect(root).not.toBeNull();
    expect(refs.root.current as HTMLElement | null).toBe(root);
    expect(root.style.textAlign).toBe("center");
    expect(root.style.justifyItems).toBe("center");
    expect(screen.getByRole("heading", { level: 3 })).toBe(refs.title.current);
    expect(container.querySelector("h2")).toBeNull();
  });
});
