import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Fieldset } from "@loamui/core";
import { SelectableCard } from "../components/SelectableCard/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("SelectableCard", () => {
  it("names the radio by its Title, describes it by its Description, and keeps the set exclusive", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Fieldset.Root>
        <Fieldset.Legend>Choose a plan</Fieldset.Legend>
        <SelectableCard.Root>
          <SelectableCard.Radio name="plan" value="starter" />
          <SelectableCard.Title>Starter</SelectableCard.Title>
          <SelectableCard.Description>One project, one member. Free.</SelectableCard.Description>
        </SelectableCard.Root>
        <SelectableCard.Root>
          <SelectableCard.Radio name="plan" value="pro" defaultChecked />
          <SelectableCard.Title>Pro</SelectableCard.Title>
          <SelectableCard.Description>Unlimited projects. £12 a month.</SelectableCard.Description>
        </SelectableCard.Root>
        <SelectableCard.Root>
          <SelectableCard.Radio name="plan" value="team" />
          <SelectableCard.Title>Team</SelectableCard.Title>
          <SelectableCard.Description>
            Everything in Pro for up to ten. £40 a month.
          </SelectableCard.Description>
        </SelectableCard.Root>
      </Fieldset.Root>,
    );
    expect(screen.getByRole("group", { name: "Choose a plan" })).toBeInTheDocument();

    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(pro).toHaveAccessibleDescription("Unlimited projects. £12 a month.");
    expect(pro).toBeChecked();

    // The whole surface is the label: a click on the description text, well
    // away from the control, checks the radio and unchecks its sibling.
    const starter = screen.getByRole("radio", { name: "Starter" });
    expect(starter).not.toBeChecked();
    await user.click(screen.getByText("One project, one member. Free."));
    expect(starter).toBeChecked();
    expect(pro).not.toBeChecked();

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("is a core Card rendered as the label, with the parts as phrasing content inside", () => {
    const { container } = render(
      <SelectableCard.Root className="mine" data-plan="starter">
        <SelectableCard.Media>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </SelectableCard.Media>
        <SelectableCard.Radio name="plan" value="starter" />
        <SelectableCard.Title>Starter</SelectableCard.Title>
        <SelectableCard.Description>One project, one member. Free.</SelectableCard.Description>
      </SelectableCard.Root>,
    );
    const starter = screen.getByRole("radio", { name: "Starter" });
    // The label IS the Card: one element, core's class and the consumer's,
    // no class of the composition's own on it.
    const label = container.firstElementChild!;
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("loam-Card");
    expect(label).toHaveClass("mine");
    expect(label).not.toHaveClass("loam-SelectableCard");
    expect(label).toHaveAttribute("for", starter.id);
    expect(label).toHaveAttribute("data-plan", "starter");
    expect(starter.closest("label")).toBe(label);

    // The composition's own element sits inside the Card, and everything
    // in the label is phrasing content: a label may hold no div.
    const grid = label.firstElementChild!;
    expect(grid.tagName).toBe("SPAN");
    expect(grid).toHaveClass("loam-SelectableCard");
    expect(label.querySelector("div, p, h1, h2, h3, h4, h5, h6, ul, ol")).toBeNull();
    expect(grid.querySelector(":scope > span.media")).toContainElement(
      container.querySelector("svg"),
    );
    expect(grid.querySelector(":scope > span.control")).toContainElement(starter);
    expect(grid.querySelector(":scope > span.title")).toHaveTextContent("Starter");
    expect(grid.querySelector(":scope > span.description")).toHaveTextContent(
      "One project, one member. Free.",
    );
  });

  it("holds checkboxes that check independently, and a disabled one that does not", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Fieldset.Root>
        <Fieldset.Legend>Add-ons</Fieldset.Legend>
        <SelectableCard.Root>
          <SelectableCard.Checkbox name="addon" value="backups" />
          <SelectableCard.Title>Daily backups</SelectableCard.Title>
          <SelectableCard.Description>Kept for thirty days.</SelectableCard.Description>
        </SelectableCard.Root>
        <SelectableCard.Root>
          <SelectableCard.Checkbox name="addon" value="sso" />
          <SelectableCard.Title>Single sign-on</SelectableCard.Title>
          <SelectableCard.Description>SAML and OIDC.</SelectableCard.Description>
        </SelectableCard.Root>
        <SelectableCard.Root>
          <SelectableCard.Checkbox name="addon" value="audit" disabled />
          <SelectableCard.Title>Audit log</SelectableCard.Title>
          <SelectableCard.Description>Team plan only.</SelectableCard.Description>
        </SelectableCard.Root>
      </Fieldset.Root>,
    );
    const backups = screen.getByRole("checkbox", { name: "Daily backups" });
    const sso = screen.getByRole("checkbox", { name: "Single sign-on" });
    const audit = screen.getByRole("checkbox", { name: "Audit log" });
    expect(backups).toHaveClass("loam-Checkbox");

    await user.click(screen.getByText("Kept for thirty days."));
    await user.click(screen.getByText("SAML and OIDC."));
    expect(backups).toBeChecked();
    expect(sso).toBeChecked();

    expect(audit).toBeDisabled();
    await user.click(screen.getByText("Team plan only."));
    expect(audit).not.toBeChecked();

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands alone with media and without a description, described by nothing", async () => {
    const { container } = render(
      <SelectableCard.Root>
        <SelectableCard.Media>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </SelectableCard.Media>
        <SelectableCard.Checkbox name="template" value="blank" />
        <SelectableCard.Title>Blank</SelectableCard.Title>
      </SelectableCard.Root>,
    );
    const blank = screen.getByRole("checkbox", { name: "Blank" });
    // No Description, no aria-describedby: nothing points at an id that is
    // not there.
    expect(blank).not.toHaveAttribute("aria-describedby");
    expect(blank).not.toHaveAccessibleDescription();
    expect(container.querySelector(".media")).toHaveAttribute("aria-hidden", "true");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("wires the description whichever side of the control it is rendered on", () => {
    render(
      <SelectableCard.Root>
        <SelectableCard.Title>Express</SelectableCard.Title>
        <SelectableCard.Description>Next working day. £6.</SelectableCard.Description>
        <SelectableCard.Radio name="delivery" value="express" />
      </SelectableCard.Root>,
    );
    const express = screen.getByRole("radio", { name: "Express" });
    expect(express).toHaveAccessibleDescription("Next working day. £6.");
  });
});
