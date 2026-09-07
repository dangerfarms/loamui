import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "@loamui/core";
import { EmptyState } from "../components/EmptyState/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("EmptyState", () => {
  it("renders a section named by its title, with a hidden picture, the description and the action, with no axe violations", async () => {
    const { container } = render(
      <EmptyState.Root>
        <EmptyState.Media>
          <svg viewBox="0 0 24 24">
            <path d="M3 6h18v12H3z" />
          </svg>
        </EmptyState.Media>
        <EmptyState.Title>No projects yet</EmptyState.Title>
        <EmptyState.Description>Create your first project to start.</EmptyState.Description>
        <EmptyState.Actions>
          <Button>Create a project</Button>
        </EmptyState.Actions>
      </EmptyState.Root>,
    );
    const region = screen.getByRole("region", { name: "No projects yet" });
    expect(region.tagName).toBe("SECTION");
    expect(region).toHaveClass("loam-EmptyState");
    expect(region).not.toHaveAttribute("role", "status");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("No projects yet");
    expect(screen.getByText("Create your first project to start.")).toHaveClass("description");
    expect(container.querySelector("div.media")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Create a project" })).toBeInTheDocument();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("lets a name of the consumer's own win over the title's", () => {
    render(
      <EmptyState.Root aria-label="Projects">
        <EmptyState.Title>No projects yet</EmptyState.Title>
      </EmptyState.Root>,
    );
    const region = screen.getByRole("region", { name: "Projects" });
    expect(region).not.toHaveAttribute("aria-labelledby");
  });

  it("is a status when the consumer says the empty state replaced results", async () => {
    const { container } = render(
      <EmptyState.Root role="status">
        <EmptyState.Title>No results for "loam"</EmptyState.Title>
        <EmptyState.Description>Check the spelling or try a broader search.</EmptyState.Description>
        <EmptyState.Actions>
          <a href="/search">Clear the search</a>
        </EmptyState.Actions>
      </EmptyState.Root>,
    );
    const status = screen.getByRole("status", { name: 'No results for "loam"' });
    expect(status).toHaveClass("loam-EmptyState");
    expect(status).toHaveTextContent("No results for");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title as an h3 and the root as a div when asked", () => {
    const { container } = render(
      <EmptyState.Root render={<div />}>
        <EmptyState.Title render={<h3 />}>Nothing here</EmptyState.Title>
      </EmptyState.Root>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Nothing here");
    const root = container.querySelector(".loam-EmptyState");
    expect(root?.tagName).toBe("DIV");
    expect(container.querySelector("section")).toBeNull();
  });
});
