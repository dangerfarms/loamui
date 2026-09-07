"use client";

import { Fieldset } from "@loamui/core";
import { ChoiceCard } from "@loamui/ui";
import type { Composition } from "./types";

const grid = {
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(14rem, 100%), 1fr))",
} as const;

const choiceCard: Composition = {
  slug: "choice-card",
  name: "Choice card",
  category: "Forms",
  description:
    "A choice presented as a card: a plan, a delivery option, a template. The whole card is the label of a real checkbox or radio.",
  lead: "A core Card rendered as a label, with the real control inside it. The whole surface is the click target; the control's name is the Title alone and the Description reaches it as a description, so a screen reader hears the option and then its price rather than one run-on name. Checked is the control's tick plus an outline on the card, never colour alone, and the state lives in the input: there is no checked prop. Everything inside is phrasing content, because that is all a label may hold.",
  importLine: `import { ChoiceCard } from "@loamui/ui";`,
  parts: [
    {
      name: "ChoiceCard.Root",
      description:
        "The unit: a core Card rendered as the label (render={<label />}), the one root, carrying the Card's class and the composition's, with the parts in their own grid inside. The label names the control by for as well as by holding it. Pass id to fix the control's id; it is generated otherwise. className, ref and the rest land on that root. The checked edge is an outline on it, drawn where the Card's line is; nothing of the Card's padding or radius is repeated.",
    },
    {
      name: "ChoiceCard.Radio",
      description:
        "The real control for one-of-many: core's bare Radio.Control, wired to the Title and, when there is one, the Description. Every input prop passes through: name, value, defaultChecked, disabled, onChange, required. Radios in a set share a name.",
    },
    {
      name: "ChoiceCard.Checkbox",
      description:
        "The real control for any-of-many: core's bare Checkbox.Control, wired the same way.",
    },
    {
      name: "ChoiceCard.Title",
      description: "The choice's name. It is the control's accessible name.",
    },
    {
      name: "ChoiceCard.Description",
      description:
        "What the choice includes, or costs; muted, and joined to the control with aria-describedby while it is rendered, from the server HTML on. Without one the reference is dropped after mount, so the control is described by nothing, not by an id that is not there.",
    },
    {
      name: "ChoiceCard.Media",
      description:
        "An optional img or inline svg for the choice, in a span spanning the card above or below the text. Decorative: the Title names the choice.",
    },
  ],
  demos: [
    {
      title: "Choose a plan",
      description:
        "Three radio cards in a core Fieldset whose legend names the set; they share a name, so the browser keeps them exclusive. The grid is yours. Click anywhere on a card, or arrow between them from the keyboard: the checked card gains an outline and the focused card a ring.",
      code: `<Fieldset.Root>
  <Fieldset.Legend>Choose a plan</Fieldset.Legend>
  <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(14rem, 100%), 1fr))" }}>
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
      <ChoiceCard.Description>Everything in Pro for up to ten people. £40 a month.</ChoiceCard.Description>
    </ChoiceCard.Root>
  </div>
</Fieldset.Root>`,
      render: () => (
        <Fieldset.Root>
          <Fieldset.Legend>Choose a plan</Fieldset.Legend>
          <div style={grid}>
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
                Everything in Pro for up to ten people. £40 a month.
              </ChoiceCard.Description>
            </ChoiceCard.Root>
          </div>
        </Fieldset.Root>
      ),
    },
    {
      title: "Add-ons",
      description:
        "Checkbox cards: any number can be checked. A disabled option keeps its Card and its line, and only the words and the control fade, so it still reads as one of the set.",
      code: `<Fieldset.Root>
  <Fieldset.Legend>Add-ons</Fieldset.Legend>
  <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(14rem, 100%), 1fr))" }}>
    <ChoiceCard.Root>
      <ChoiceCard.Checkbox name="addon" value="backups" defaultChecked />
      <ChoiceCard.Title>Daily backups</ChoiceCard.Title>
      <ChoiceCard.Description>Kept for thirty days. £3 a month.</ChoiceCard.Description>
    </ChoiceCard.Root>
    <ChoiceCard.Root>
      <ChoiceCard.Checkbox name="addon" value="sso" />
      <ChoiceCard.Title>Single sign-on</ChoiceCard.Title>
      <ChoiceCard.Description>SAML and OIDC. £5 a month.</ChoiceCard.Description>
    </ChoiceCard.Root>
    <ChoiceCard.Root>
      <ChoiceCard.Checkbox name="addon" value="audit" disabled />
      <ChoiceCard.Title>Audit log</ChoiceCard.Title>
      <ChoiceCard.Description>Included with the Team plan.</ChoiceCard.Description>
    </ChoiceCard.Root>
  </div>
</Fieldset.Root>`,
      render: () => (
        <Fieldset.Root>
          <Fieldset.Legend>Add-ons</Fieldset.Legend>
          <div style={grid}>
            <ChoiceCard.Root>
              <ChoiceCard.Checkbox name="addon" value="backups" defaultChecked />
              <ChoiceCard.Title>Daily backups</ChoiceCard.Title>
              <ChoiceCard.Description>Kept for thirty days. £3 a month.</ChoiceCard.Description>
            </ChoiceCard.Root>
            <ChoiceCard.Root>
              <ChoiceCard.Checkbox name="addon" value="sso" />
              <ChoiceCard.Title>Single sign-on</ChoiceCard.Title>
              <ChoiceCard.Description>SAML and OIDC. £5 a month.</ChoiceCard.Description>
            </ChoiceCard.Root>
            <ChoiceCard.Root>
              <ChoiceCard.Checkbox name="addon" value="audit" disabled />
              <ChoiceCard.Title>Audit log</ChoiceCard.Title>
              <ChoiceCard.Description>Included with the Team plan.</ChoiceCard.Description>
            </ChoiceCard.Root>
          </div>
        </Fieldset.Root>
      ),
    },
    {
      title: "With media",
      description:
        "A Media part first, spanning the card: a delivery option with an icon. The svg is decorative; the Title names the choice and the Description carries the detail.",
      code: `<Fieldset.Root>
  <Fieldset.Legend>Delivery</Fieldset.Legend>
  <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(14rem, 100%), 1fr))" }}>
    <ChoiceCard.Root>
      <ChoiceCard.Media>
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      </ChoiceCard.Media>
      <ChoiceCard.Radio name="delivery" value="standard" defaultChecked />
      <ChoiceCard.Title>Standard</ChoiceCard.Title>
      <ChoiceCard.Description>Three to five working days. Free.</ChoiceCard.Description>
    </ChoiceCard.Root>
    <ChoiceCard.Root>
      <ChoiceCard.Media>
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 3 4 14h6l-1 7 9-11h-6z" />
        </svg>
      </ChoiceCard.Media>
      <ChoiceCard.Radio name="delivery" value="express" />
      <ChoiceCard.Title>Express</ChoiceCard.Title>
      <ChoiceCard.Description>Next working day. £6.</ChoiceCard.Description>
    </ChoiceCard.Root>
  </div>
</Fieldset.Root>`,
      render: () => (
        <Fieldset.Root>
          <Fieldset.Legend>Delivery</Fieldset.Legend>
          <div style={grid}>
            <ChoiceCard.Root>
              <ChoiceCard.Media>
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </ChoiceCard.Media>
              <ChoiceCard.Radio name="delivery" value="standard" defaultChecked />
              <ChoiceCard.Title>Standard</ChoiceCard.Title>
              <ChoiceCard.Description>Three to five working days. Free.</ChoiceCard.Description>
            </ChoiceCard.Root>
            <ChoiceCard.Root>
              <ChoiceCard.Media>
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M13 3 4 14h6l-1 7 9-11h-6z" />
                </svg>
              </ChoiceCard.Media>
              <ChoiceCard.Radio name="delivery" value="express" />
              <ChoiceCard.Title>Express</ChoiceCard.Title>
              <ChoiceCard.Description>Next working day. £6.</ChoiceCard.Description>
            </ChoiceCard.Root>
          </div>
        </Fieldset.Root>
      ),
    },
  ],
  whenToUse: [
    "A choice between two and five options that each need a line of explanation or a price: a plan, a delivery speed, a document template. The card gives the description room, and the whole surface is the target.",
    "A step in a checkout or a setup flow where the option is the whole question, so it deserves the space and weight of a card rather than a row of small radios.",
  ],
  whenNotToUse: [
    "A single yes or no: that is a core Checkbox with a label. One card among no others has nothing to be chosen against.",
    "More than five options, or options that need no explanation: a core Select, or a RadioGroup of plain radios, scans faster than a wall of cards and takes less of the page.",
  ],
};

export default choiceCard;
