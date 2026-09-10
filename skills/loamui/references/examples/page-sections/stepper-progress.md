---
title: Stepper progress
description: An order's progress through four steps: the ones done, the one under way and the ones to come, under a header that names the order.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Stepper progress

An order's progress through four steps: the ones done, the one under way and the ones to come, under a header that names the order.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Stepper`
- Tags: order, tracking, steps, progress, status
- Live: https://loamui.com/examples/page-sections/stepper-progress

## Built to the pillars

- **Native CSS.** The order lives in an ol, so a screen reader announces 2 of 4 from the list itself; the placed date is a time element with its machine-readable value.
- **Modern CSS.** The Stepper stacks in a narrow container and runs as a row where it has 40rem, decided by its own width; the example adds only the spacing between header, steps and the way back.
- **Composition.** Stepper.Root, Step, Marker, Title and Description are arranged in the markup; an empty Marker draws its number or its check, and nothing is configured through a prop.
- **Contextualism.** One aria-current=step on the step reached is the whole state: the stylesheet reads done, current and upcoming from it, and it is also what assistive technology announces.
- **Accessible & gatekept.** The list is named for the order it tracks, the current and completed steps carry hidden words after their titles, and the state survives forced colours as dashed and solid lines.

## Example.tsx

```tsx
"use client";

import { Stepper } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="stepper-progress" aria-labelledby="stepper-progress-title">
      <header>
        <p className="eyebrow">Order HR-20417</p>
        <h2 id="stepper-progress-title">Your order is being packed</h2>
        <p>
          Placed on <time dateTime="2026-09-03T09:14">Thursday 3 September</time>: four packets and
          a hand fork, going to Ludlow.
        </p>
      </header>
      <Stepper.Root aria-label="Progress of order HR-20417">
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title>Order placed</Stepper.Title>
          <Stepper.Description>
            Paid by card at 09:14. The receipt is in your inbox.
          </Stepper.Description>
        </Stepper.Step>
        <Stepper.Step aria-current="step">
          <Stepper.Marker />
          <Stepper.Title>Being packed</Stepper.Title>
          <Stepper.Description>
            Picked from the seed store at Bromfield this morning and checked against your order.
          </Stepper.Description>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title>Dispatched</Stepper.Title>
          <Stepper.Description>
            We email the tracking number when Royal Mail collects, usually the same afternoon.
          </Stepper.Description>
        </Stepper.Step>
        <Stepper.Step>
          <Stepper.Marker />
          <Stepper.Title>Delivered</Stepper.Title>
          <Stepper.Description>
            Two working days after dispatch, through the letterbox.
          </Stepper.Description>
        </Stepper.Step>
      </Stepper.Root>
      <p className="back">
        <a href="/orders">Back to your orders</a>
      </p>
    </section>
  );
}
```

## example.css

```css
@scope (.stepper-progress) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-lg);
  }

  header {
    display: block grid;
    gap: var(--loam-space-xs);

    > p {
      color: var(--loam-color-fg-muted);
      margin: 0;
      max-inline-size: var(--loam-measure);
    }
  }

  p.eyebrow {
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin: 0;
  }

  p.back {
    font-size: var(--loam-text-sm);
    margin: 0;
  }
}
```

