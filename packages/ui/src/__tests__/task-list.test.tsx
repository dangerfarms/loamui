import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { CSSProperties } from "react";
import { Badge } from "@loamui/core";
import { TaskList } from "../components/TaskList/index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("TaskList", () => {
  it("is a list of tasks, each title described by its description and status", async () => {
    const { container } = render(
      <TaskList.Root>
        <TaskList.Item>
          <TaskList.Title href="/apply/details">Your details</TaskList.Title>
          <TaskList.Status style={{ "--loam-context": "success" } as CSSProperties}>
            <Badge>Completed</Badge>
          </TaskList.Status>
        </TaskList.Item>
        <TaskList.Item>
          <TaskList.Title href="/apply/documents">Supporting documents</TaskList.Title>
          <TaskList.Description>
            Upload a proof of address and one form of identification.
          </TaskList.Description>
          <TaskList.Status style={{ "--loam-context": "info" } as CSSProperties}>
            <Badge>In progress</Badge>
          </TaskList.Status>
        </TaskList.Item>
        <TaskList.Item>
          <TaskList.Title>Payment</TaskList.Title>
          <TaskList.Description>
            Available once every section above is complete.
          </TaskList.Description>
          <TaskList.Status>
            <Badge>Cannot start yet</Badge>
          </TaskList.Status>
        </TaskList.Item>
      </TaskList.Root>,
    );
    // A ul with its markers removed keeps its list semantics through an
    // explicit role.
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveAttribute("role", "list");
    expect(list).toHaveClass("loam-TaskList");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.querySelectorAll("ul > li")).toHaveLength(3);

    // A task that can be started has a link for its title; one that
    // cannot is plain text.
    const details = screen.getByRole("link", { name: "Your details" });
    expect(details).toHaveAttribute("href", "/apply/details");
    expect(details).toHaveClass("title");
    const payment = container.querySelectorAll(".title")[2]!;
    expect(payment.tagName).toBe("SPAN");
    expect(payment).toHaveTextContent("Payment");

    // A linked task with a description is described by it, and by its
    // status after it; one with no description is described by the status
    // alone.
    const documents = screen.getByRole("link", { name: "Supporting documents" });
    const description = container.querySelectorAll("p.description")[0]!;
    const statuses = container.querySelectorAll("div.status");
    expect(description).toHaveAttribute("id");
    expect(statuses[1]).toHaveAttribute("id");
    expect(documents).toHaveAttribute("aria-describedby", `${description.id} ${statuses[1]!.id}`);
    expect(documents).toHaveAccessibleDescription(
      "Upload a proof of address and one form of identification. In progress",
    );
    expect(details).toHaveAttribute("aria-describedby", statuses[0]!.id);
    expect(details).toHaveAccessibleDescription("Completed");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands alone as one task, and describes nothing without a Description or Status", async () => {
    const { container } = render(
      <TaskList.Root>
        <TaskList.Item>
          <TaskList.Title href="/apply/declaration">Declaration</TaskList.Title>
        </TaskList.Item>
      </TaskList.Root>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    const title = screen.getByRole("link", { name: "Declaration" });
    expect(title).not.toHaveAttribute("aria-describedby");
    expect(container.querySelector("p.description")).toBeNull();
    expect(container.querySelector("div.status")).toBeNull();
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders the title through render as a router's link, still described", () => {
    render(
      <TaskList.Root>
        <TaskList.Item>
          <TaskList.Title render={<a data-router href="/apply/contact" />}>
            Contact preferences
          </TaskList.Title>
          <TaskList.Description>An email address and a phone number.</TaskList.Description>
        </TaskList.Item>
      </TaskList.Root>,
    );
    const link = screen.getByRole("link", { name: "Contact preferences" });
    expect(link).toHaveAttribute("data-router");
    expect(link).toHaveClass("title");
    expect(link).toHaveAccessibleDescription("An email address and a phone number.");
  });
});
