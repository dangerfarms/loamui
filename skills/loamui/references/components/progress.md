---
title: Progress
description: Show completion of a task.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Progress

A horizontal bar showing completion of a task, on the native <progress> element.

## Import

```tsx
import { Progress } from "@loamui/core";
```

## Usage

### Basic usage

Set value 0 to 100. The children are the visible label beside the bar and its accessible name, so what is progressing is said once, to everyone. Without children, name it with aria-label or aria-labelledby.

```tsx
<Progress value={72}>Uploading photos</Progress>
<Progress value={72} aria-label="Uploading photos" />
```

### Indeterminate

Omit value and the bar says work is under way without claiming how much: a band sweeps the track where motion is welcome and stands still under reduced motion. Prefer Loader for a wait with no visible outcome; use this where a determinate bar will take over once the amount is known.

```tsx
<Progress>Preparing your export</Progress>
```

### The value in your words

labels.value writes the value for a browser without <progress> and, when given, as aria-valuetext, so assistive technology reads “3 of 4 files” rather than “75%”. The default is the percentage in the page's number format.

```tsx
<Progress value={75} labels={{ value: (n) => `${n / 25} of 4 files` }}>
  Importing contacts
</Progress>
```

### Sizes

size sets the track thickness: sm, md or lg.

```tsx
<Progress value={60} size="sm" aria-label="Small" />
<Progress value={60} size="md" aria-label="Medium" />
<Progress value={60} size="lg" aria-label="Large" />
```

### Contexts

There is no colour prop. Declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the status colours follow, or let it inherit from a region that already means something.

```tsx
<Progress value={50}>Quota used</Progress>
<div style={{ "--loam-context": "warning" }}>
  <Progress value={88}>Quota used</Progress>
</div>
<div style={{ "--loam-context": "danger" }}>
  <Progress value={98}>Quota used</Progress>
</div>
<div style={{ "--loam-context": "success" }}>
  <Progress value={100}>Quota used</Progress>
</div>
```

### Striped & animated

Stripes convey ongoing, indeterminate-feeling work; with animated the stripes slide, which is the only difference between the two rows and is not visible in a static screenshot.

```tsx
<Progress value={65} striped aria-label="Striped" />
<Progress value={65} animated aria-label="Animated" />
```

## When to use it

- When completion is genuinely measurable (bytes uploaded, records processed, steps finished) and you can supply a truthful 0 to 100 value.
- To show position in a multi-step flow, deriving value from the step count so the bar moves exactly when the user does.

## When not to

- For waits of unknown duration with nothing to fill in afterwards. A bar that crawls to 90% and stalls teaches users to distrust every bar in your product. Use Loader, or Skeleton when the shape of the coming content is known; the indeterminate form is for the moment before a real value arrives.
- To display a static quantity such as storage used: role="progressbar" tells assistive tech a task is under way, which a measurement is not.

## How it works

### Tell the truth

The value must map to something real. Never animate a fake percentage to make a wait feel shorter: when the fiction stalls, the user notices, and the component loses its meaning for every future use. If you cannot measure progress yet, omit value: an indeterminate bar promises nothing it cannot keep.

### Name what is progressing

The bar exposes its value but not its subject: “progressbar, 45%” on its own tells a screen-reader user nothing about what is at 45%. Write the subject as children and it is both the visible label and the bar's accessible name, said once to everyone; where the label lives elsewhere, pass aria-label or aria-labelledby. In development an unnamed bar logs an error.

### Stripes are decoration

striped and animated add texture, not information, and the stripe animation exists only inside prefers-reduced-motion: no-preference. Anything the stripes were saying must therefore also be said by the value and the surrounding text.

## Accessibility

- Renders the native <progress>, which carries the progressbar role, its value and its maximum without any ARIA; the value is clamped into 0 to 100, so an out-of-range number never produces an invalid state, and no value at all is the platform's own indeterminate state.
- Children become the accessible name through aria-labelledby; otherwise pass aria-label or aria-labelledby, which land on the <progress> element. A bar with none of the three logs an error in development.
- labels.value, when given, is also the aria-valuetext, so assistive technology reads the value in your words rather than as a bare percentage.
- The stripe animation and the fill transition exist only inside prefers-reduced-motion: no-preference; with reduced motion the bar is static and the value is still exposed through aria-valuenow, so motion never carries information.
- Under forced colours (Windows High Contrast) the fill paints with Highlight via forced-color-adjust: none and the track gains a CanvasText border, so the bar stays visible where background paint is normally stripped.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Fill amount, 0 to 100 (clamped). Omit it for an indeterminate bar. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Track thickness. |
| `striped` | `boolean` | — | Overlay diagonal stripes on the filled bar. |
| `animated` | `boolean` | — | Animate the stripes (implies striped). |
| `labels` | `{ value?: (n: number) => string }` | `the value as a percentage in the page's number format` | The words for the value: the fallback text for a browser without <progress>, and, when given, the aria-valuetext. |
| `children` | `ReactNode` | — | The visible label beside the bar; it becomes the bar's accessible name. |
| `className / style` | `string / CSSProperties` | — | Go to the root, which lays out the label and the bar. |
| `...others` | `ProgressHTMLAttributes<HTMLProgressElement>` | — | All other native <progress> props, and ref, go to the <progress> element. |

