import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { axe } from "vitest-axe";
import { Badge, Breadcrumbs, Button, Time } from "@loamui/core";
import { PageHeader } from "../components/PageHeader/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("PageHeader", () => {
  it("is a header named by its h1, with the parts in reading order and no axe violations", async () => {
    const { container } = render(
      <PageHeader.Root>
        <PageHeader.Breadcrumbs>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item current>Loam</Breadcrumbs.Item>
          </Breadcrumbs.Root>
        </PageHeader.Breadcrumbs>
        <PageHeader.Title>Loam</PageHeader.Title>
        <PageHeader.Description>
          Modern UI primitives for agent-assisted developers.
        </PageHeader.Description>
        <PageHeader.Meta>
          <Badge>Active</Badge>
          <span>
            Updated <Time value="2026-09-01" />
          </span>
        </PageHeader.Meta>
        <PageHeader.Actions>
          <Button>Share</Button>
          <Button>Edit</Button>
        </PageHeader.Actions>
      </PageHeader.Root>,
    );
    const header = screen.getByRole("banner", { name: "Loam" });
    expect(header).toHaveClass("loam-PageHeader");
    const title = screen.getByRole("heading", { level: 1, name: "Loam" });
    expect(header).toHaveAttribute("aria-labelledby", title.id);
    expect(title).toHaveClass("title");

    // Reading order: where, what, about, facts, then the actions.
    const order = Array.from(header.children).map((child) => child.className);
    expect(order).toEqual(["breadcrumbs", "title", "description", "meta", "actions"]);
    expect(screen.getByRole("navigation", { name: "Breadcrumbs" })).toBeInTheDocument();
    expect(header.querySelector("div.breadcrumbs")).toContainElement(
      screen.getByRole("link", { name: "Projects" }),
    );
    expect(screen.getByText("Modern UI primitives for agent-assisted developers.")).toHaveClass(
      "description",
    );
    expect(header.querySelector("div.meta")).toContainElement(screen.getByText("Active"));
    expect(header.querySelector("div.actions")).toContainElement(
      screen.getByRole("button", { name: "Edit" }),
    );
    // Core parts inside keep their own classes; nothing of the composition's rides on them.
    expect(screen.getByRole("button", { name: "Edit" }).className).toBe("loam-Button");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands with a title alone, unnamed by nothing, and yields to a consumer's name", () => {
    const { rerender } = render(
      <PageHeader.Root>
        <PageHeader.Title>Settings</PageHeader.Title>
      </PageHeader.Root>,
    );
    const header = screen.getByRole("banner", { name: "Settings" });
    expect(header.children).toHaveLength(1);

    rerender(
      <PageHeader.Root aria-label="Account settings">
        <PageHeader.Title>Settings</PageHeader.Title>
      </PageHeader.Root>,
    );
    expect(screen.getByRole("banner", { name: "Account settings" })).not.toHaveAttribute(
      "aria-labelledby",
    );
  });

  it("names the header by its title in the server render, before any effect runs", () => {
    const html = renderToString(
      <PageHeader.Root>
        <PageHeader.Title>Loam</PageHeader.Title>
      </PageHeader.Root>,
    );
    const titleId = html.match(/<h1[^>]*\sid="([^"]+)"/)?.[1];
    expect(titleId).toBeTruthy();
    expect(html).toContain(`aria-labelledby="${titleId}"`);
  });

  it("renders the root and the title as other elements through render, keeping the wiring", () => {
    const { container } = render(
      <PageHeader.Root render={<div data-page="loam" />} className="mine">
        <PageHeader.Title render={<h2 />} id="section-title">
          Loam
        </PageHeader.Title>
      </PageHeader.Root>,
    );
    const root = container.firstElementChild!;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("loam-PageHeader");
    expect(root).toHaveClass("mine");
    expect(root).toHaveAttribute("data-page", "loam");
    expect(root).toHaveAttribute("aria-labelledby", "section-title");
    const title = screen.getByRole("heading", { level: 2, name: "Loam" });
    expect(title).toHaveAttribute("id", "section-title");
    expect(title).toHaveClass("title");
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });
});
