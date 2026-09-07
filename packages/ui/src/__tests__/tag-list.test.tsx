import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { TagList } from "../components/TagList/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("TagList", () => {
  it("is a named list of links named by their text", async () => {
    const { container } = render(
      <TagList.Root>
        <TagList.Item href="/tags/css">CSS</TagList.Item>
        <TagList.Item href="/tags/accessibility">Accessibility</TagList.Item>
        <TagList.Item href="/tags/react">React</TagList.Item>
      </TagList.Root>,
    );
    const list = screen.getByRole("list", { name: "Tags" });
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("loam-TagList");
    expect(list).toHaveAttribute("role", "list");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    for (const [name, href] of [
      ["CSS", "/tags/css"],
      ["Accessibility", "/tags/accessibility"],
      ["React", "/tags/react"],
    ]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      // The pill is core's Badge, rendered as the link; a target, so the
      // large size, which clears the 24px floor.
      expect(link).toHaveClass("loam-Badge");
      expect(link).toHaveAttribute("data-size", "lg");
      expect(link).not.toHaveAttribute("aria-label");
      expect(link.parentElement).toHaveClass("item");
    }
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders a tag without an href as plain text, not a link", async () => {
    const { container } = render(
      <TagList.Root>
        <TagList.Item href="/tags/css">CSS</TagList.Item>
        <TagList.Item>Draft</TagList.Item>
      </TagList.Root>,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    const plain = screen.getByText("Draft");
    expect(plain.tagName).toBe("SPAN");
    expect(plain).toHaveClass("loam-Badge");
    expect(plain.parentElement).toHaveClass("item");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("puts aria-current and the link's attributes on the link, not the li, and takes another list name", () => {
    render(
      <TagList.Root aria-label="Categories">
        <TagList.Item href="/categories/tools" rel="tag" target="_blank">
          Tools
        </TagList.Item>
        <TagList.Item href="/categories/guides" aria-current="page">
          Guides
        </TagList.Item>
      </TagList.Root>,
    );
    expect(screen.getByRole("list", { name: "Categories" })).toBeInTheDocument();
    const guides = screen.getByRole("link", { name: "Guides" });
    expect(guides).toHaveAttribute("aria-current", "page");
    expect(guides.closest("li")).not.toHaveAttribute("aria-current");
    const tools = screen.getByRole("link", { name: "Tools" });
    expect(tools).not.toHaveAttribute("aria-current");
    expect(tools).toHaveAttribute("rel", "tag");
    expect(tools).toHaveAttribute("target", "_blank");
    expect(tools.closest("li")).not.toHaveAttribute("rel");
  });

  it("renders a router link through render and yields its name to aria-labelledby", () => {
    render(
      <>
        <h2 id="topics">Topics</h2>
        <TagList.Root aria-labelledby="topics">
          <TagList.Item render={<a href="/tags/css" data-router />}>CSS</TagList.Item>
        </TagList.Root>
      </>,
    );
    const list = screen.getByRole("list", { name: "Topics" });
    expect(list).not.toHaveAttribute("aria-label");
    const link = screen.getByRole("link", { name: "CSS" });
    expect(link).toHaveAttribute("data-router");
    expect(link).toHaveAttribute("href", "/tags/css");
    expect(link).toHaveClass("loam-Badge");
    expect(link.closest("li")).toHaveClass("item");
  });

  it("takes the list's name from labels", () => {
    render(
      <TagList.Root labels={{ list: "Emner" }}>
        <TagList.Item href="/tags/css">CSS</TagList.Item>
      </TagList.Root>,
    );
    expect(screen.getByRole("list", { name: "Emner" })).toBeInTheDocument();
  });
});
