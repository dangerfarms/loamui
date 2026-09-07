import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SideNav } from "../components/SideNav/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("SideNav", () => {
  it("renders a nav named by its title with a list, the current page marked and no axe violations", async () => {
    const { container } = render(
      <SideNav.Root>
        <SideNav.Title>Workspace</SideNav.Title>
        <SideNav.List>
          <SideNav.Item>
            <a href="/">Dashboard</a>
          </SideNav.Item>
          <SideNav.Item>
            <a href="/projects" aria-current="page">
              Projects
            </a>
          </SideNav.Item>
          <SideNav.Item>
            <a href="/settings">
              <svg viewBox="0 0 24 24" aria-hidden>
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </a>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Root>,
    );
    const nav = screen.getByRole("navigation", { name: "Workspace" });
    expect(nav).toHaveClass("loam-SideNav");
    expect(nav).not.toHaveAttribute("aria-label");
    expect(nav).toHaveAttribute("aria-labelledby", screen.getByText("Workspace").id);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("is named Main without a title, by aria-label when given one, and by aria-labelledby over both", () => {
    render(
      <>
        <h2 id="docs-heading">Documentation</h2>
        <SideNav.Root>
          <SideNav.List>
            <SideNav.Item>
              <a href="/">Home</a>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Root>
        <SideNav.Root aria-label="Guides">
          <SideNav.Title>Getting started</SideNav.Title>
          <SideNav.List>
            <SideNav.Item>
              <a href="/docs">Docs</a>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Root>
        <SideNav.Root aria-labelledby="docs-heading">
          <SideNav.Title>Reference</SideNav.Title>
          <SideNav.List>
            <SideNav.Item>
              <a href="/reference">Reference</a>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Root>
      </>,
    );
    expect(screen.getByRole("navigation", { name: "Main" })).toHaveAttribute("aria-label", "Main");
    const guides = screen.getByRole("navigation", { name: "Guides" });
    expect(guides).not.toHaveAttribute("aria-labelledby");
    const docs = screen.getByRole("navigation", { name: "Documentation" });
    expect(docs).toHaveAttribute("aria-labelledby", "docs-heading");
    expect(docs).not.toHaveAttribute("aria-label");
  });

  it("renders a group as its own native disclosure holding a nested list", async () => {
    const { container } = render(
      <SideNav.Root>
        <SideNav.List>
          <SideNav.Item>
            <a href="/">Dashboard</a>
          </SideNav.Item>
          <SideNav.Item>
            <SideNav.Group open>
              <SideNav.GroupTitle>Reports</SideNav.GroupTitle>
              <SideNav.List>
                <SideNav.Item>
                  <a href="/reports/weekly" aria-current="page">
                    Weekly
                  </a>
                </SideNav.Item>
                <SideNav.Item>
                  <a href="/reports/monthly">Monthly</a>
                </SideNav.Item>
              </SideNav.List>
            </SideNav.Group>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Root>,
    );
    const details = container.querySelector("details")!;
    expect(details).toHaveClass("group");
    expect(details).not.toHaveClass("loam-Details");
    expect(details).toHaveAttribute("open");
    const summary = details.querySelector(":scope > summary")!;
    expect(summary).toHaveClass("group-title");
    expect(summary).toHaveTextContent("Reports");
    expect(summary.querySelector("svg")).toBeNull();
    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(details.querySelector(":scope > ul")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Weekly" }).closest("details")).toBe(details);
    expect(container.querySelector("[class*='loam-'] [class*='loam-']")).toBeNull();
    expect(screen.getByRole("link", { name: "Dashboard" }).closest("details")).toBe(null);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
