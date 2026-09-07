"use client";

import type { CSSProperties } from "react";
import { Badge, Button, Price } from "@loamui/core";
import { Plan } from "@loamui/ui";
import type { Composition } from "./types";

const primary = { "--loam-context": "primary" } as CSSProperties;

const plan: Composition = {
  slug: "plan",
  name: "Plan",
  category: "Data display",
  description:
    "One pricing tier: a name, a price with its period, what it includes and leaves out, and the action that chooses it, alone or in a grid you write.",
  lead: "The unit is the plan, an article named by its title inside a core Card; a pricing table is a grid you write, three plans or one, and the composition never arranges several. The price is a core Price with the period as your own words beside it, so the figure is machine-readable and the qualifier is never mistaken for the whole cost. The features are a real list ticked by the stylesheet, and a feature the plan leaves out is an Exclusion, struck and muted on screen and prefixed by hidden words for a reader who is listening, so the difference is never the glyph alone. The recommended plan is one declaration, --loam-context: primary on its Root: the Badge, the Button, the name and the figure answer it, and a rule above the parts marks it where the tints are gone.",
  importLine: `import { Plan } from "@loamui/ui";\nimport { Badge, Button, Price } from "@loamui/core";`,
  parts: [
    {
      name: "Plan.Root",
      description:
        "The unit: a core Card, left as core styles it, holding an article with the parts in a column, named by the Title through aria-labelledby from the first render (your own aria-label wins). className, style and ref land on the Card; pass render={<li />} in a list, and style={{ '--loam-context': 'primary' }} on the recommended plan. labels holds the plan's words: excluded.",
    },
    {
      name: "Plan.Eyebrow",
      description:
        "A small row above the name for the Badge you pass: Most popular, Current plan. The Badge answers the plan's context region on its own.",
    },
    {
      name: "Plan.Title",
      description:
        "The plan's name. An h3 by default; pass render={<h2 />} where the plans are the page's own sections. Its id, yours or the composition's, is what names the article.",
    },
    {
      name: "Plan.Description",
      description: "One line on who the plan is for, muted, under the name.",
    },
    {
      name: "Plan.Value",
      description:
        "The price: a core Price as its children, large, with a Plan.Period beside it. The composition writes no words of its own here.",
    },
    {
      name: "Plan.Period",
      description:
        'What the price covers, small and muted after the figure: "per seat, per month", "a year", "once".',
    },
    {
      name: "Plan.Features",
      description:
        "What the plan includes: a ul with role list, since the markers are replaced, of Features and Exclusions.",
    },
    {
      name: "Plan.Feature",
      description:
        "One thing the plan includes: an li the stylesheet ticks. The tick is generated content with an empty alt, so the words carry it.",
    },
    {
      name: "Plan.Exclusion",
      description:
        'One thing the plan leaves out, listed so the tiers compare: struck and muted, a dash in place of the tick, and prefixed by labels.excluded ("Not included:") in core\'s loam-VisuallyHidden class.',
    },
    {
      name: "Plan.Actions",
      description:
        "The action that chooses the plan, at the foot and stretched to the card's width: your core Button, which answers the plan's context region, so the recommended plan's button is the primary one. Say which plan in its text.",
    },
  ],
  demos: [
    {
      title: "One plan",
      description:
        "A plan needs no table: the one tier on a product page, or the current plan on an account page. The Price is core's, the period is text beside it, and the two features the tier leaves out are Exclusions, read as Not included.",
      code: `<Plan.Root>
  <Plan.Title>Starter</Plan.Title>
  <Plan.Description>For one person getting a site up.</Plan.Description>
  <Plan.Value>
    <Price value={0} currency="GBP" />
    <Plan.Period>for ever</Plan.Period>
  </Plan.Value>
  <Plan.Features>
    <Plan.Feature>Three projects</Plan.Feature>
    <Plan.Feature>One seat</Plan.Feature>
    <Plan.Feature>Community support</Plan.Feature>
    <Plan.Exclusion>Custom domain</Plan.Exclusion>
    <Plan.Exclusion>Audit log</Plan.Exclusion>
  </Plan.Features>
  <Plan.Actions>
    <Button>Start with Starter</Button>
  </Plan.Actions>
</Plan.Root>`,
      render: () => (
        <Plan.Root>
          <Plan.Title>Starter</Plan.Title>
          <Plan.Description>For one person getting a site up.</Plan.Description>
          <Plan.Value>
            <Price value={0} currency="GBP" />
            <Plan.Period>for ever</Plan.Period>
          </Plan.Value>
          <Plan.Features>
            <Plan.Feature>Three projects</Plan.Feature>
            <Plan.Feature>One seat</Plan.Feature>
            <Plan.Feature>Community support</Plan.Feature>
            <Plan.Exclusion>Custom domain</Plan.Exclusion>
            <Plan.Exclusion>Audit log</Plan.Exclusion>
          </Plan.Features>
          <Plan.Actions>
            <Button>Start with Starter</Button>
          </Plan.Actions>
        </Plan.Root>
      ),
    },
    {
      title: "Three plans",
      description:
        "A pricing table is a list you wrote: a ul with repeat(auto-fit, minmax(min(16rem, 100%), 1fr)), each plan rendered as a li through the Card's render, so the grid stretches every card to the row and every button lands at the same foot. The middle plan is recommended: one declaration on its Root, --loam-context: primary, and its Badge, its name, its figure and its Button answer it; a rule above its parts marks it in forced colours. Each button says which plan it chooses.",
      code: `<section aria-labelledby="pricing">
  <h2 id="pricing">Pricing</h2>
  <ul style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(16rem, 100%), 1fr))", listStyle: "none", margin: 0, padding: 0 }}>
    <Plan.Root render={<li />}>
      <Plan.Title>Starter</Plan.Title>
      <Plan.Description>For one person getting a site up.</Plan.Description>
      <Plan.Value>
        <Price value={0} currency="GBP" />
        <Plan.Period>for ever</Plan.Period>
      </Plan.Value>
      <Plan.Features>
        <Plan.Feature>Three projects</Plan.Feature>
        <Plan.Feature>One seat</Plan.Feature>
        <Plan.Exclusion>Custom domain</Plan.Exclusion>
        <Plan.Exclusion>Audit log</Plan.Exclusion>
      </Plan.Features>
      <Plan.Actions>
        <Button>Start with Starter</Button>
      </Plan.Actions>
    </Plan.Root>
    <Plan.Root render={<li />} style={{ "--loam-context": "primary" }}>
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
        <Plan.Feature>Custom domain</Plan.Feature>
        <Plan.Exclusion>Audit log</Plan.Exclusion>
      </Plan.Features>
      <Plan.Actions>
        <Button>Choose Team</Button>
      </Plan.Actions>
    </Plan.Root>
    <Plan.Root render={<li />}>
      <Plan.Title>Enterprise</Plan.Title>
      <Plan.Description>For an organisation with its own requirements.</Plan.Description>
      <Plan.Value>
        <Price value={96} currency="GBP" />
        <Plan.Period>per seat, per month</Plan.Period>
      </Plan.Value>
      <Plan.Features>
        <Plan.Feature>Unlimited projects</Plan.Feature>
        <Plan.Feature>Unlimited seats</Plan.Feature>
        <Plan.Feature>Custom domain</Plan.Feature>
        <Plan.Feature>Audit log</Plan.Feature>
      </Plan.Features>
      <Plan.Actions>
        <Button>Talk to sales about Enterprise</Button>
      </Plan.Actions>
    </Plan.Root>
  </ul>
</section>`,
      render: () => (
        <section aria-labelledby="pricing">
          <h2 id="pricing">Pricing</h2>
          <ul
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(16rem, 100%), 1fr))",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <Plan.Root render={<li />}>
              <Plan.Title>Starter</Plan.Title>
              <Plan.Description>For one person getting a site up.</Plan.Description>
              <Plan.Value>
                <Price value={0} currency="GBP" />
                <Plan.Period>for ever</Plan.Period>
              </Plan.Value>
              <Plan.Features>
                <Plan.Feature>Three projects</Plan.Feature>
                <Plan.Feature>One seat</Plan.Feature>
                <Plan.Exclusion>Custom domain</Plan.Exclusion>
                <Plan.Exclusion>Audit log</Plan.Exclusion>
              </Plan.Features>
              <Plan.Actions>
                <Button>Start with Starter</Button>
              </Plan.Actions>
            </Plan.Root>
            <Plan.Root render={<li />} style={primary}>
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
                <Plan.Feature>Custom domain</Plan.Feature>
                <Plan.Exclusion>Audit log</Plan.Exclusion>
              </Plan.Features>
              <Plan.Actions>
                <Button>Choose Team</Button>
              </Plan.Actions>
            </Plan.Root>
            <Plan.Root render={<li />}>
              <Plan.Title>Enterprise</Plan.Title>
              <Plan.Description>For an organisation with its own requirements.</Plan.Description>
              <Plan.Value>
                <Price value={96} currency="GBP" />
                <Plan.Period>per seat, per month</Plan.Period>
              </Plan.Value>
              <Plan.Features>
                <Plan.Feature>Unlimited projects</Plan.Feature>
                <Plan.Feature>Unlimited seats</Plan.Feature>
                <Plan.Feature>Custom domain</Plan.Feature>
                <Plan.Feature>Audit log</Plan.Feature>
              </Plan.Features>
              <Plan.Actions>
                <Button>Talk to sales about Enterprise</Button>
              </Plan.Actions>
            </Plan.Root>
          </ul>
        </section>
      ),
    },
  ],
  whenToUse: [
    "A pricing page where a visitor compares two or three tiers by what each includes and costs before choosing one; the grid is yours, and each plan reads on its own.",
    "The current plan on an account page, or the one tier a product has, where a single plan states the price and what it covers without a table around it.",
  ],
  whenNotToUse: [
    "A choice made inside a form, where picking a plan is a radio and the card is its label: that is SelectableCard, whose whole surface is the control's label and whose state lives in the input.",
    "A comparison of many features across many tiers, read across as much as down: that is a Table with a row per feature, not a row of cards each repeating the list.",
  ],
};

export default plan;
