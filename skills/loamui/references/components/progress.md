---
title: Progress
description: Show completion of a task.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Progress

A horizontal bar showing completion of a task.

## Import

```tsx
import { Progress } from "@loamui/core";
```

## Usage

### Basic

Set value 0 to 100. Add label to show the percentage inside the bar.

```tsx
<Progress value={72} />
<Progress value={72} label />
```

### Sizes

size sets the track thickness: sm, md or lg.

```tsx
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />
```

### Contexts

There is no colour prop. Declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the status colours follow, or let it inherit from a region that already means something.

```tsx
<Progress value={50} />
<div style={{ "--loam-context": "warning" }}>
  <Progress value={88} />
</div>
<div style={{ "--loam-context": "danger" }}>
  <Progress value={98} />
</div>
<div style={{ "--loam-context": "success" }}>
  <Progress value={100} />
</div>
```

### Striped & animated

Stripes convey ongoing, indeterminate-feeling work; with animated the stripes slide, which is the only difference between the two rows and is not visible in a static screenshot.

```tsx
<Progress value={65} striped />
<Progress value={65} animated />
```

## When to use it

- When completion is genuinely measurable (bytes uploaded, records processed, steps finished) and you can supply a truthful 0 to 100 value.
- To show position in a multi-step flow, deriving value from the step count so the bar moves exactly when the user does.

## When not to

- For waits of unknown duration. A bar that crawls to 90% and stalls teaches users to distrust every bar in your product. Use Loader, or Skeleton when the shape of the coming content is known.
- To display a static quantity such as storage used: role="progressbar" tells assistive tech a task is under way, which a measurement is not.

## How it works

### Tell the truth

The value must map to something real. Never animate a fake percentage to make a wait feel shorter: when the fiction stalls, the user notices, and the component loses its meaning for every future use. If you cannot measure progress, you do not have determinate progress; reach for Loader instead.

### Name what is progressing

The bar exposes its value but not its subject. Pass aria-label (“Uploading photos”) or aria-labelledby pointing at a visible heading (both forward to the root), because “progressbar, 45%” on its own tells a screen-reader user nothing about what is at 45%. Sighted users need the same context: keep visible text near the bar.

### Stripes are decoration

striped and animated add texture, not information, and the stripe animation exists only inside prefers-reduced-motion: no-preference. Anything the stripes were saying must therefore also be said by the value and the surrounding text.

## Accessibility

- Renders role="progressbar" with aria-valuenow (rounded), aria-valuemin={0} and aria-valuemax={100}; the value is clamped, so an out-of-range number can never produce an invalid ARIA state.
- No accessible name is wired for you: pass aria-label or aria-labelledby naming the task; both are forwarded to the root element.
- The stripe animation and the fill transition exist only inside prefers-reduced-motion: no-preference; with reduced motion the bar is static and the value is still exposed through aria-valuenow, so motion never carries information.
- Under forced colours (Windows High Contrast) the fill paints with Highlight via forced-color-adjust: none and the track gains a CanvasText border, so the bar stays visible where background paint is normally stripped.
- The inline label only renders once the value reaches 8%, so the text never overflows a nearly-empty bar; if the number must always be readable, render it as text outside the bar as well.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Fill amount, 0 to 100 (clamped). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Track thickness. |
| `striped` | `boolean` | — | Overlay diagonal stripes on the filled bar. |
| `animated` | `boolean` | — | Animate the stripes (implies striped). |
| `label` | `boolean` | — | Render the percentage as text inside the bar. |
| `...others` | `HTMLAttributes<HTMLDivElement>` | — | All native <div> props are forwarded. |

