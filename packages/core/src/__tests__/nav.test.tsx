import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Nav } from "../components/Nav/index";

afterEach(cleanup);

// Colour contrast is covered live in Storybook; jsdom has no canvas for it.
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function AppNav(props: { title?: boolean; open?: boolean; onOpenChange?: (o: boolean) => void }) {
  return (
    <Nav.Root>
      {props.title && <Nav.Title>Project</Nav.Title>}
      <Nav.List>
        <Nav.Item>
          <Nav.Link href="/">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/projects" current>
            Projects
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Group open={props.open} defaultOpen onOpenChange={props.onOpenChange}>
            <Nav.GroupTitle>Reports</Nav.GroupTitle>
            <Nav.List>
              <Nav.Item>
                <Nav.Link href="/reports/weekly">Weekly</Nav.Link>
              </Nav.Item>
            </Nav.List>
          </Nav.Group>
        </Nav.Item>
      </Nav.List>
    </Nav.Root>
  );
}

describe("Nav", () => {
  it("has no axe violations, titled and untitled", async () => {
    const titled = render(<AppNav title />);
    expect(await axe(titled.container, axeOptions)).toHaveNoViolations();
    titled.unmount();
    const untitled = render(<AppNav />);
    expect(await axe(untitled.container, axeOptions)).toHaveNoViolations();
  });

  it("is a landmark named by its Title, from the first render", () => {
    const html = renderToStaticMarkup(<AppNav title />);
    expect(html).toMatch(/<nav[^>]*aria-labelledby="([^"]+)"/);
    const id = html.match(/<nav[^>]*aria-labelledby="([^"]+)"/)?.[1];
    expect(html).toContain(`id="${id}"`);

    render(<AppNav title />);
    const nav = screen.getByRole("navigation", { name: "Project" });
    expect(nav).toHaveAttribute("aria-labelledby", screen.getByText("Project").id);
    expect(nav).not.toHaveAttribute("aria-label");
  });

  it("falls back to labels.navigation without a Title, and a consumer's name wins", () => {
    render(<AppNav />);
    const nav = screen.getByRole("navigation", { name: "Navigation" });
    expect(nav).not.toHaveAttribute("aria-labelledby");
    cleanup();

    render(
      <Nav.Root labels={{ navigation: "Menü" }}>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/">Start</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>,
    );
    expect(screen.getByRole("navigation", { name: "Menü" })).toBeInTheDocument();
    cleanup();

    render(
      <Nav.Root aria-label="Site">
        <Nav.Title>Ignored for the name</Nav.Title>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>,
    );
    expect(screen.getByRole("navigation", { name: "Site" })).not.toHaveAttribute("aria-labelledby");
  });

  it("renders the Title as a heading through render, keeping the id", () => {
    render(
      <Nav.Root>
        <Nav.Title render={<h2 />}>Product</Nav.Title>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/docs">Docs</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>,
    );
    const heading = screen.getByRole("heading", { level: 2, name: "Product" });
    expect(heading).toHaveClass("title");
    expect(screen.getByRole("navigation", { name: "Product" })).toHaveAttribute(
      "aria-labelledby",
      heading.id,
    );
  });

  it("marks the current destination with aria-current and keeps the list a list", () => {
    render(<AppNav />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("list").map((list) => list.tagName)).toEqual(["UL", "UL"]);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("says location for a table of contents, and nothing when current is false", () => {
    render(
      <Nav.Root>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="#intro" current="location">
              Intro
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#usage" current={false}>
              Usage
            </Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>,
    );
    expect(screen.getByRole("link", { name: "Intro" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "Usage" })).not.toHaveAttribute("aria-current");
  });

  it("substitutes the link through render and merges the wiring on", () => {
    const onClick = vi.fn((event: ReactMouseEvent<HTMLAnchorElement>) => event.preventDefault());
    render(
      <Nav.Root>
        <Nav.List>
          <Nav.Item>
            <Nav.Link
              render={<a data-router-link href="/settings" onClick={onClick} />}
              className="mine"
              current
            >
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Root>,
    );
    const link = screen.getByRole("link", { name: "Settings" });
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("href", "/settings");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveClass("link", "mine");
    link.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("folds a Group natively and reports the change", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<AppNav onOpenChange={onOpenChange} />);
    const group = screen.getByText("Reports").closest("details") as HTMLDetailsElement;
    expect(group.open).toBe(true);

    await user.click(screen.getByText("Reports"));
    expect(group.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);

    await user.click(screen.getByText("Reports"));
    expect(group.open).toBe(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it("holds a controlled Group to its prop until the consumer changes it", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<AppNav open={false} onOpenChange={onOpenChange} />);
    const group = screen.getByText("Reports").closest("details") as HTMLDetailsElement;
    expect(group.open).toBe(false);

    await user.click(screen.getByText("Reports"));
    // The toggle event is queued; let it dispatch, then the revert's own.
    await act(() => new Promise((r) => setTimeout(r, 0)));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(group.open).toBe(false);

    rerender(<AppNav open onOpenChange={onOpenChange} />);
    await act(() => new Promise((r) => setTimeout(r, 0)));
    expect(group.open).toBe(true);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  it("follows a controlled Group driven from onOpenChange", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return <AppNav open={open} onOpenChange={setOpen} />;
    }
    render(<Controlled />);
    const group = screen.getByText("Reports").closest("details") as HTMLDetailsElement;
    await user.click(screen.getByText("Reports"));
    await act(() => new Promise((r) => setTimeout(r, 0)));
    expect(group.open).toBe(true);
    expect(screen.getByRole("link", { name: "Weekly" })).toBeInTheDocument();
  });

  it("throws when a part is rendered outside the Root", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Nav.Title>X</Nav.Title>)).toThrow(/inside <Nav.Root>/);
    expect(() => render(<Nav.Link href="/">X</Nav.Link>)).toThrow(/inside <Nav.Root>/);
    expect(() => render(<Nav.List />)).toThrow(/inside <Nav.Root>/);
    error.mockRestore();
  });

  it("stacks several Roots, each named by its own Title", () => {
    render(
      <>
        <Nav.Root>
          <Nav.Title>Workspace</Nav.Title>
          <Nav.List>
            <Nav.Item>
              <Nav.Link href="/" current>
                Dashboard
              </Nav.Link>
            </Nav.Item>
          </Nav.List>
        </Nav.Root>
        <Nav.Root>
          <Nav.Title>Account</Nav.Title>
          <Nav.List>
            <Nav.Item>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav.Item>
          </Nav.List>
        </Nav.Root>
      </>,
    );
    expect(screen.getByRole("navigation", { name: "Workspace" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Account" })).toBeInTheDocument();
    const css = readFileSync(resolve(__dirname, "../components/Nav/Nav.css"), "utf8");
    expect(css).toMatch(/\.loam-Nav \+ :scope\s*{[^}]*margin-block-start/);
  });

  it("moves the current marker to the block-end edge through --loam-nav-current-edge", () => {
    const css = readFileSync(resolve(__dirname, "../components/Nav/Nav.css"), "utf8");
    expect(css).toMatch(
      /@container not style\(--loam-nav-current-edge: block-end\)\s*{[^}]*border-inline-start: 2px solid transparent/,
    );
    expect(css).toMatch(
      /@container style\(--loam-nav-current-edge: block-end\)\s*{[^}]*border-block-end: 2px solid transparent/,
    );
  });

  it("names the current marker in system colours under forced colours", () => {
    const css = readFileSync(resolve(__dirname, "../components/Nav/Nav.css"), "utf8");
    const forced = css.slice(css.indexOf("@media (forced-colors: active)"));
    expect(forced).toMatch(/\.link\[aria-current\]\s*{[^}]*border-color: Highlight/);
    expect(forced).toMatch(/summary\.group-title\s*{[^}]*border-color: Highlight/);
  });
});
