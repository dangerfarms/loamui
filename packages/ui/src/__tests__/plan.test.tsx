import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { CSSProperties } from "react";
import { Badge, Button, Price } from "@loamui/core";
import { Plan } from "../components/Plan/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Plan", () => {
  it("is a Card holding an article named by its title, with a Price, a real list of features and one action, with no axe violations", async () => {
    const { container } = render(
      <Plan.Root style={{ "--loam-context": "primary" } as CSSProperties}>
        <Plan.Eyebrow>
          <Badge>Most popular</Badge>
        </Plan.Eyebrow>
        <Plan.Title>Team</Plan.Title>
        <Plan.Description>For a product team that ships every week.</Plan.Description>
        <Plan.Value>
          <Price value={24} currency="GBP" />
          <Plan.Period>per seat, per month</Plan.Period>
        </Plan.Value>
        <Plan.Features>
          <Plan.Feature>Unlimited projects</Plan.Feature>
          <Plan.Feature>Ten seats</Plan.Feature>
          <Plan.Exclusion>Audit log</Plan.Exclusion>
        </Plan.Features>
        <Plan.Actions>
          <Button>Choose Team</Button>
        </Plan.Actions>
      </Plan.Root>,
    );
    const card = container.firstElementChild!;
    expect(card).toHaveClass("loam-Card");
    expect(card).not.toHaveClass("loam-Plan");
    // The emphasis region is declared on the Card, an ancestor of the
    // article, so the parts inside answer it.
    expect(card).toHaveStyle({ "--loam-context": "primary" });
    const article = card.firstElementChild!;
    expect(article.tagName).toBe("ARTICLE");
    expect(article).toHaveClass("loam-Plan");

    const heading = screen.getByRole("heading", { level: 3, name: "Team" });
    expect(article).toHaveAttribute("aria-labelledby", heading.id);
    expect(screen.getByRole("article", { name: "Team" })).toBe(article);

    expect(article.querySelector("p.eyebrow > .loam-Badge")).toHaveTextContent("Most popular");
    expect(article.querySelector("p.description")).toHaveTextContent(
      "For a product team that ships every week.",
    );
    const value = article.querySelector("p.value")!;
    expect(value.querySelector("data.loam-Price")).toHaveAttribute("value", "24");
    expect(value.querySelector("span.period")).toHaveTextContent("per seat, per month");
    expect(value).toHaveTextContent("£24per seat, per month");

    // The features are a real list; the tick is the stylesheet's, so the
    // words carry the meaning, and an exclusion says so in hidden words.
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("features");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass("feature");
    expect(items[0]).toHaveTextContent("Unlimited projects");
    expect(items[2]).toHaveClass("exclusion");
    expect(items[2]).toHaveTextContent("Not included: Audit log");
    expect(items[2]!.querySelector(".loam-VisuallyHidden")).toHaveTextContent("Not included:");
    expect(items[2]!.querySelector("s")).toHaveTextContent("Audit log");

    expect(screen.getByRole("button", { name: "Choose Team" }).parentElement).toHaveClass(
      "actions",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as a list item through the Card's render and takes its words from labels", async () => {
    const { container } = render(
      <ul>
        <Plan.Root render={<li />} labels={{ excluded: "Ikke inkludert:" }}>
          <Plan.Title render={<h2 />}>Starter</Plan.Title>
          <Plan.Features>
            <Plan.Exclusion>Support</Plan.Exclusion>
          </Plan.Features>
        </Plan.Root>
      </ul>,
    );
    const item = container.querySelector(":scope > ul > li")!;
    expect(item).toHaveClass("loam-Card");
    expect(item.querySelector(":scope > article.loam-Plan")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Starter");
    expect(screen.getByText("Ikke inkludert:")).toHaveClass("loam-VisuallyHidden");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("takes the consumer's name over the title's, and names nothing without a Title", () => {
    const { container } = render(
      <>
        <Plan.Root aria-label="Team, recommended">
          <Plan.Title id="team">Team</Plan.Title>
        </Plan.Root>
        <Plan.Root>
          <Plan.Description>No name.</Plan.Description>
        </Plan.Root>
      </>,
    );
    const [named, unnamed] = container.querySelectorAll("article.loam-Plan");
    expect(named).toHaveAttribute("aria-label", "Team, recommended");
    expect(named).not.toHaveAttribute("aria-labelledby");
    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("id", "team");
    expect(unnamed).not.toHaveAttribute("aria-labelledby");
  });
});
