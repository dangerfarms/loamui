"use client";

import { Steps } from "@loamui/ui";
import type { Composition } from "./types";

const steps: Composition = {
  slug: "steps",
  name: "Steps",
  category: "Page sections",
  description:
    "An ordered sequence: each step a marker, a title and a description; a timeline when the marker is a date.",
  lead: "The order lives in the ol, so assistive tech announces “2 of 4” from the list itself, and the visible number is a CSS counter with an empty alt: decorative, never the only carrier of order. Leave the Marker out and the stylesheet draws the number; put one in to host a date or an icon, and a hairline connects each marker to the next so the eye reads the sequence the way the list does. A sequence under way marks the step it has reached with aria-current on the Item, and the stylesheet reads done, current and upcoming from that one attribute, which is also what assistive tech announces.",
  importLine: `import { Steps } from "@loamui/ui";`,
  parts: [
    {
      name: "Steps.Root",
      description:
        'Required: an ol with role="list" (list-style: none drops list semantics in some browsers) that carries the order and draws the numbers; declares its own container. An Item outside it has no list to be a step of.',
    },
    {
      name: "Steps.Item",
      description:
        'One step, an li inside the Root: a marker column beside the title and description. The counter increments here. Pass aria-current="step" on the step a sequence has reached: the steps before it read as done, it gains a ring, and the steps after it are drawn hollow and muted.',
    },
    {
      name: "Steps.Marker",
      description:
        "Optional. Replaces the drawn number with a time, an icon or a short label. Its content is read out; pass aria-hidden yourself when it is decorative.",
    },
    {
      name: "Steps.Title",
      description:
        "The step's name, an h3. Pass render={<h2 />} when the steps are a page's top-level sections.",
    },
    {
      name: "Steps.Description",
      description: "One or two muted sentences on what happens in this step.",
    },
  ],
  demos: [
    {
      title: "A process",
      description:
        "No Marker in the markup: the stylesheet numbers each step from a counter, and the ol alone carries the order.",
      code: `<Steps.Root>
  <Steps.Item>
    <Steps.Title>Install the packages</Steps.Title>
    <Steps.Description>Core for the primitives, ui for the compositions built from them.</Steps.Description>
  </Steps.Item>
  <Steps.Item>
    <Steps.Title>Import the stylesheets once</Steps.Title>
    <Steps.Description>At the app root, core before ui; no provider, no config.</Steps.Description>
  </Steps.Item>
  <Steps.Item>
    <Steps.Title>Compose from parts</Steps.Title>
    <Steps.Description>Semantic markup first; reach for a component when the element needs structure it does not have.</Steps.Description>
  </Steps.Item>
</Steps.Root>`,
      render: () => (
        <Steps.Root>
          <Steps.Item>
            <Steps.Title>Install the packages</Steps.Title>
            <Steps.Description>
              Core for the primitives, ui for the compositions built from them.
            </Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Title>Import the stylesheets once</Steps.Title>
            <Steps.Description>
              At the app root, core before ui; no provider, no config.
            </Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Title>Compose from parts</Steps.Title>
            <Steps.Description>
              Semantic markup first; reach for a component when the element needs structure it does
              not have.
            </Steps.Description>
          </Steps.Item>
        </Steps.Root>
      ),
    },
    {
      title: "A timeline",
      description:
        "A time in each Marker replaces the number. The dateTime carries the machine-readable date; the text is whatever the reader should see.",
      code: `<Steps.Root>
  <Steps.Item>
    <Steps.Marker><time dateTime="2026-03">Mar 2026</time></Steps.Marker>
    <Steps.Title>First release</Steps.Title>
    <Steps.Description>Tokens, element styles and twenty components.</Steps.Description>
  </Steps.Item>
  <Steps.Item>
    <Steps.Marker><time dateTime="2026-06">Jun 2026</time></Steps.Marker>
    <Steps.Title>Contextual colour</Steps.Title>
    <Steps.Description>Status from a region, size from the container; the props went away.</Steps.Description>
  </Steps.Item>
  <Steps.Item>
    <Steps.Marker><time dateTime="2026-09">Sep 2026</time></Steps.Marker>
    <Steps.Title>Compositions</Steps.Title>
    <Steps.Description>The ui package: recurring pieces of a page, built the way any consumer would.</Steps.Description>
  </Steps.Item>
</Steps.Root>`,
      render: () => (
        <Steps.Root>
          <Steps.Item>
            <Steps.Marker>
              <time dateTime="2026-03">Mar 2026</time>
            </Steps.Marker>
            <Steps.Title>First release</Steps.Title>
            <Steps.Description>Tokens, element styles and twenty components.</Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Marker>
              <time dateTime="2026-06">Jun 2026</time>
            </Steps.Marker>
            <Steps.Title>Contextual colour</Steps.Title>
            <Steps.Description>
              Status from a region, size from the container; the props went away.
            </Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Marker>
              <time dateTime="2026-09">Sep 2026</time>
            </Steps.Marker>
            <Steps.Title>Compositions</Steps.Title>
            <Steps.Description>
              The ui package: recurring pieces of a page, built the way any consumer would.
            </Steps.Description>
          </Steps.Item>
        </Steps.Root>
      ),
    },
    {
      title: "An order's progress",
      description:
        'A sequence under way. The consumer puts aria-current="step" on the step it has reached, and the stylesheet reads the rest from that: the steps before it are done and keep the strong fill, the current one gains a ring, and the steps after it are drawn hollow in muted ink. The attribute is what a screen reader announces, so the state is never colour alone, and in forced colours the upcoming markers and their connectors go dashed.',
      code: `<Steps.Root>
  <Steps.Item>
    <Steps.Title>Order placed</Steps.Title>
    <Steps.Description>We have your order and your payment has cleared.</Steps.Description>
  </Steps.Item>
  <Steps.Item aria-current="step">
    <Steps.Title>Being packed</Steps.Title>
    <Steps.Description>Your items are being picked and packed at the warehouse.</Steps.Description>
  </Steps.Item>
  <Steps.Item>
    <Steps.Title>Dispatched</Steps.Title>
    <Steps.Description>We will send the tracking number when the courier collects it.</Steps.Description>
  </Steps.Item>
  <Steps.Item>
    <Steps.Title>Delivered</Steps.Title>
    <Steps.Description>Usually two working days after dispatch.</Steps.Description>
  </Steps.Item>
</Steps.Root>`,
      render: () => (
        <Steps.Root>
          <Steps.Item>
            <Steps.Title>Order placed</Steps.Title>
            <Steps.Description>We have your order and your payment has cleared.</Steps.Description>
          </Steps.Item>
          <Steps.Item aria-current="step">
            <Steps.Title>Being packed</Steps.Title>
            <Steps.Description>
              Your items are being picked and packed at the warehouse.
            </Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Title>Dispatched</Steps.Title>
            <Steps.Description>
              We will send the tracking number when the courier collects it.
            </Steps.Description>
          </Steps.Item>
          <Steps.Item>
            <Steps.Title>Delivered</Steps.Title>
            <Steps.Description>Usually two working days after dispatch.</Steps.Description>
          </Steps.Item>
        </Steps.Root>
      ),
    },
  ],
  whenToUse: [
    "Instructions the reader follows in order: a setup guide, an onboarding flow, how a submission is processed.",
    "Events in time: a changelog, a project history, with a date in each Marker.",
    "A sequence under way, an order's progress or an application's stages, with aria-current on the step it has reached.",
  ],
  whenNotToUse: [
    "A set of things with no order between them; a list of a product's features is a grid of Feature units, and a plain ul is fine for the rest.",
    "A single step; one action with an explanation is a heading and a paragraph, not a list of one.",
  ],
};

export default steps;
