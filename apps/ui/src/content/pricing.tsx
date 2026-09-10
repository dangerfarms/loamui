"use client";

import { Badge, Button } from "@loamui/core";
import { Pricing } from "@loamui/ui";
import type { Composition } from "./types";

const pricing: Composition = {
  slug: "pricing",
  name: "Pricing",
  category: "Page sections",
  description: "A grid of plans, each a Card with a name, a price, a feature list and one action.",
  lead: "Eight parts on a native section and list. The plans are an auto-fit grid, so the count and the viewport decide the columns; the recommended plan is a --loam-context region declared by you, not a prop, and the Badge, the Button and the Card's line all answer it.",
  importLine: `import { Pricing } from "@loamui/ui";`,
  parts: [
    {
      name: "Pricing.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the section's width.",
    },
    {
      name: "Pricing.Plans",
      description:
        "The list of plans: an auto-fit grid of columns at least 18rem wide, one column when there is no room for more.",
    },
    {
      name: "Pricing.Plan",
      description:
        "One plan: a list item wrapping a Card. Declare --loam-context: primary on it to mark the recommended plan.",
    },
    {
      name: "Pricing.Name",
      description:
        "The plan's name, an h3. A Badge written beside the text sits at the far end of the row.",
    },
    {
      name: "Pricing.Price",
      description: "The amount, large and in tabular figures. Write the period in a <small>.",
    },
    { name: "Pricing.Description", description: "One line on who the plan is for." },
    {
      name: "Pricing.Features",
      description:
        "What the plan includes, as list items. Takes the slack so every action lines up.",
    },
    {
      name: "Pricing.Action",
      description:
        "The plan's one action. A grid wrapper, so the Button inside stretches to the plan's width.",
    },
  ],
  demos: [
    {
      title: "Three plans",
      description:
        "The Team plan declares --loam-context: primary, and the Badge, the Button and the Card's line answer it.",
      code: `<Pricing.Root>
  <h2>Plans</h2>
  <Pricing.Plans>
    <Pricing.Plan>
      <Pricing.Name>Starter</Pricing.Name>
      <Pricing.Price>
        £0 <small>per month</small>
      </Pricing.Price>
      <Pricing.Description>For one person trying things out.</Pricing.Description>
      <Pricing.Features>
        <li>One project</li>
        <li>Community support</li>
        <li>Basic analytics</li>
      </Pricing.Features>
      <Pricing.Action>
        <Button>Start for free</Button>
      </Pricing.Action>
    </Pricing.Plan>
    <Pricing.Plan style={{ "--loam-context": "primary" }}>
      <Pricing.Name>
        Team <Badge>Recommended</Badge>
      </Pricing.Name>
      <Pricing.Price>
        £24 <small>per seat per month</small>
      </Pricing.Price>
      <Pricing.Description>For small teams shipping together.</Pricing.Description>
      <Pricing.Features>
        <li>Unlimited projects</li>
        <li>Priority support</li>
        <li>Shared workspaces</li>
        <li>Audit log</li>
      </Pricing.Features>
      <Pricing.Action>
        <Button>Choose Team</Button>
      </Pricing.Action>
    </Pricing.Plan>
    <Pricing.Plan>
      <Pricing.Name>Business</Pricing.Name>
      <Pricing.Price>
        £960 <small>per month, billed annually</small>
      </Pricing.Price>
      <Pricing.Description>For organisations with their own requirements.</Pricing.Description>
      <Pricing.Features>
        <li>Everything in Team</li>
        <li>Single sign-on</li>
        <li>Dedicated support</li>
        <li>Custom contracts</li>
      </Pricing.Features>
      <Pricing.Action>
        <Button>Talk to sales</Button>
      </Pricing.Action>
    </Pricing.Plan>
  </Pricing.Plans>
</Pricing.Root>`,
      render: () => (
        <Pricing.Root>
          <h2>Plans</h2>
          <Pricing.Plans>
            <Pricing.Plan>
              <Pricing.Name>Starter</Pricing.Name>
              <Pricing.Price>
                £0 <small>per month</small>
              </Pricing.Price>
              <Pricing.Description>For one person trying things out.</Pricing.Description>
              <Pricing.Features>
                <li>One project</li>
                <li>Community support</li>
                <li>Basic analytics</li>
              </Pricing.Features>
              <Pricing.Action>
                <Button>Start for free</Button>
              </Pricing.Action>
            </Pricing.Plan>
            <Pricing.Plan style={{ "--loam-context": "primary" } as React.CSSProperties}>
              <Pricing.Name>
                Team <Badge>Recommended</Badge>
              </Pricing.Name>
              <Pricing.Price>
                £24 <small>per seat per month</small>
              </Pricing.Price>
              <Pricing.Description>For small teams shipping together.</Pricing.Description>
              <Pricing.Features>
                <li>Unlimited projects</li>
                <li>Priority support</li>
                <li>Shared workspaces</li>
                <li>Audit log</li>
              </Pricing.Features>
              <Pricing.Action>
                <Button>Choose Team</Button>
              </Pricing.Action>
            </Pricing.Plan>
            <Pricing.Plan>
              <Pricing.Name>Business</Pricing.Name>
              <Pricing.Price>
                £960 <small>per month, billed annually</small>
              </Pricing.Price>
              <Pricing.Description>
                For organisations with their own requirements.
              </Pricing.Description>
              <Pricing.Features>
                <li>Everything in Team</li>
                <li>Single sign-on</li>
                <li>Dedicated support</li>
                <li>Custom contracts</li>
              </Pricing.Features>
              <Pricing.Action>
                <Button>Talk to sales</Button>
              </Pricing.Action>
            </Pricing.Plan>
          </Pricing.Plans>
        </Pricing.Root>
      ),
    },
  ],
  whenToUse: [
    "A small set of plans the visitor chooses between, where every plan has the same anatomy and one clear action.",
    "When one plan should lead: declare it as a primary region and the parts inside carry the emphasis, with no styling on your side.",
  ],
  whenNotToUse: [
    "A single plan or a quote-on-request price: that is a paragraph and a Button, not a grid of one.",
    "Feature-by-feature comparison across many plans; readers compare rows, so that is a table with the plans as columns.",
  ],
};

export default pricing;
