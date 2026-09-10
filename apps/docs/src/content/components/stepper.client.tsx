"use client";

import { Stepper } from "@loamui/core";

const ORDER = [
  ["Order placed", "We have your order and your payment has cleared."],
  ["Being packed", "Your items are being picked and packed at the warehouse."],
  ["Dispatched", "We will send the tracking number when the courier collects it."],
  ["Delivered", "Usually two working days after dispatch."],
] as const;

function Order(props: { current?: number }) {
  return (
    <Stepper.Root>
      {ORDER.map(([title, text], i) => (
        <Stepper.Step key={title} aria-current={props.current === i ? "step" : undefined}>
          <Stepper.Marker />
          <Stepper.Title>{title}</Stepper.Title>
          <Stepper.Description>{text}</Stepper.Description>
        </Stepper.Step>
      ))}
    </Stepper.Root>
  );
}

export function StepperBasicDemo() {
  return (
    <div style={{ inlineSize: "100%", maxInlineSize: "56rem" }}>
      <Order current={1} />
    </div>
  );
}

export function StepperStackedDemo() {
  return (
    <div style={{ inlineSize: "100%", maxInlineSize: "24rem" }}>
      <Order current={2} />
    </div>
  );
}

export function StepperListDemo() {
  return (
    <div style={{ inlineSize: "100%", maxInlineSize: "56rem" }}>
      <Stepper.Root labels={{ list: "Getting started" }}>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title render={<h3 />}>Install the package</Stepper.Title>
          <Stepper.Description>npm install @loamui/core, nothing else.</Stepper.Description>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title render={<h3 />}>Import the stylesheet once</Stepper.Title>
          <Stepper.Description>At the app root; no provider, no config.</Stepper.Description>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title render={<h3 />}>Compose from parts</Stepper.Title>
          <Stepper.Description>
            Semantic markup first; a component when the element needs more.
          </Stepper.Description>
        </Stepper.Step>
      </Stepper.Root>
    </div>
  );
}

export function StepperLinksDemo() {
  return (
    <div style={{ inlineSize: "100%", maxInlineSize: "56rem" }}>
      <Stepper.Root labels={{ list: "Checkout" }}>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title render={<a href="#basket" />}>Basket</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title render={<a href="#address" />}>Delivery address</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step aria-current="step">
          <Stepper.Marker />
          <Stepper.Title>Payment</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title>Review</Stepper.Title>
        </Stepper.Step>
      </Stepper.Root>
    </div>
  );
}

export function StepperLabelsDemo() {
  return (
    <div style={{ inlineSize: "100%", maxInlineSize: "56rem" }}>
      <Stepper.Root labels={{ list: "Commande", complete: "Terminée", current: "Étape en cours" }}>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title>Commande passée</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step aria-current="step">
          <Stepper.Marker />
          <Stepper.Title>En préparation</Stepper.Title>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title>Expédiée</Stepper.Title>
        </Stepper.Step>
      </Stepper.Root>
    </div>
  );
}
