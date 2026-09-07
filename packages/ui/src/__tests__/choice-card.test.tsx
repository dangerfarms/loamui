import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Fieldset } from "@loamui/core";
import { ChoiceCard } from "../components/ChoiceCard/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("ChoiceCard", () => {
  it("names the radio by its Title, describes it by its Description, and keeps the set exclusive", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Fieldset.Root>
        <Fieldset.Legend>Choose a plan</Fieldset.Legend>
        <ChoiceCard.Root>
          <ChoiceCard.Radio name="plan" value="starter" />
          <ChoiceCard.Title>Starter</ChoiceCard.Title>
          <ChoiceCard.Description>One project, one member. Free.</ChoiceCard.Description>
        </ChoiceCard.Root>
        <ChoiceCard.Root>
          <ChoiceCard.Radio name="plan" value="pro" defaultChecked />
          <ChoiceCard.Title>Pro</ChoiceCard.Title>
          <ChoiceCard.Description>Unlimited projects. £12 a month.</ChoiceCard.Description>
        </ChoiceCard.Root>
        <ChoiceCard.Root>
          <ChoiceCard.Radio name="plan" value="team" />
          <ChoiceCard.Title>Team</ChoiceCard.Title>
          <ChoiceCard.Description>
            Everything in Pro for up to ten. £40 a month.
          </ChoiceCard.Description>
        </ChoiceCard.Root>
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

  it("is a core Card rendered as the label carrying both classes, with the parts as phrasing content inside", () => {
    const { container } = render(
      <ChoiceCard.Root className="mine" data-plan="starter">
        <ChoiceCard.Media>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </ChoiceCard.Media>
        <ChoiceCard.Radio name="plan" value="starter" />
        <ChoiceCard.Title>Starter</ChoiceCard.Title>
        <ChoiceCard.Description>One project, one member. Free.</ChoiceCard.Description>
      </ChoiceCard.Root>,
    );
    const starter = screen.getByRole("radio", { name: "Starter" });
    // The label IS the Card, and the one root: core's class, the
    // composition's and the consumer's on it, with the rest of the props.
    const label = container.firstElementChild!;
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("loam-Card");
    expect(label).toHaveClass("loam-ChoiceCard");
    expect(label).toHaveClass("mine");
    expect(label).toHaveAttribute("for", starter.id);
    expect(label).toHaveAttribute("data-plan", "starter");
    expect(starter.closest("label")).toBe(label);

    // The parts sit in their own element inside the Card, and everything
    // in the label is phrasing content: a label may hold no div.
    const grid = label.firstElementChild!;
    expect(grid.tagName).toBe("SPAN");
    expect(grid).toHaveClass("body");
    expect(grid).not.toHaveClass("loam-ChoiceCard");
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
        <ChoiceCard.Root>
          <ChoiceCard.Checkbox name="addon" value="backups" />
          <ChoiceCard.Title>Daily backups</ChoiceCard.Title>
          <ChoiceCard.Description>Kept for thirty days.</ChoiceCard.Description>
        </ChoiceCard.Root>
        <ChoiceCard.Root>
          <ChoiceCard.Checkbox name="addon" value="sso" />
          <ChoiceCard.Title>Single sign-on</ChoiceCard.Title>
          <ChoiceCard.Description>SAML and OIDC.</ChoiceCard.Description>
        </ChoiceCard.Root>
        <ChoiceCard.Root>
          <ChoiceCard.Checkbox name="addon" value="audit" disabled />
          <ChoiceCard.Title>Audit log</ChoiceCard.Title>
          <ChoiceCard.Description>Team plan only.</ChoiceCard.Description>
        </ChoiceCard.Root>
      </Fieldset.Root>,
    );
    const backups = screen.getByRole("checkbox", { name: "Daily backups" });
    const sso = screen.getByRole("checkbox", { name: "Single sign-on" });
    const audit = screen.getByRole("checkbox", { name: "Audit log" });
    expect(backups).toHaveClass("loam-Checkbox");
    expect(backups.closest("label")).toHaveClass("loam-Card");

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
      <ChoiceCard.Root>
        <ChoiceCard.Media>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </ChoiceCard.Media>
        <ChoiceCard.Checkbox name="template" value="blank" />
        <ChoiceCard.Title>Blank</ChoiceCard.Title>
      </ChoiceCard.Root>,
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
      <ChoiceCard.Root>
        <ChoiceCard.Title>Express</ChoiceCard.Title>
        <ChoiceCard.Description>Next working day. £6.</ChoiceCard.Description>
        <ChoiceCard.Radio name="delivery" value="express" />
      </ChoiceCard.Root>,
    );
    const express = screen.getByRole("radio", { name: "Express" });
    expect(express).toHaveAccessibleDescription("Next working day. £6.");
  });

  it("describes the control by the Description in the server render, before any effect runs", () => {
    const html = renderToString(
      <ChoiceCard.Root>
        <ChoiceCard.Radio name="plan" value="pro" />
        <ChoiceCard.Title>Pro</ChoiceCard.Title>
        <ChoiceCard.Description>Unlimited projects. £12 a month.</ChoiceCard.Description>
      </ChoiceCard.Root>,
    );
    const describedBy = html.match(/aria-describedby="([^"]+)"/)?.[1];
    expect(describedBy).toBeTruthy();
    expect(html).toContain(`<span id="${describedBy}" class="description">`);
  });

  it("hands the consumer's ref the label, which is the Card", () => {
    const ref = { current: null as HTMLLabelElement | null };
    render(
      <ChoiceCard.Root ref={ref}>
        <ChoiceCard.Checkbox name="template" value="blank" />
        <ChoiceCard.Title>Blank</ChoiceCard.Title>
      </ChoiceCard.Root>,
    );
    expect(ref.current).toBe(screen.getByRole("checkbox", { name: "Blank" }).closest("label"));
    expect(ref.current).toHaveClass("loam-Card");
  });
});
