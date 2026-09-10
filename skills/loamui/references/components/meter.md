---
title: Meter
description: A measurement within a known range.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Meter

A measurement within a known range, on the native <meter> element.

## Import

```tsx
import { Meter } from "@loamui/core";
```

## Usage

### A measurement

Pass value and the range it sits in, and a label: the element has no accessible name of its own. max defaults to 1 as the platform does, so a fraction works as is; most consumers pass max={100} and a percentage.

```tsx
<Meter value={0.6} label="Storage used" />
<Meter value={60} max={100} label="Storage used" />
```

### Bands

low and high split the range into three bands and optimum says which one is good. The browser works out which band the value is in and the fill answers it: the good band is success, the band next to it warning and the far band danger. Here optimum is 100, so a high value is the good one; put optimum at 0 (storage used) and the colours run the other way round.

```tsx
<Meter value={25} max={100} low={40} high={75} optimum={100} label="Weak password" />
<Meter value={55} max={100} low={40} high={75} optimum={100} label="Fair password" />
<Meter value={90} max={100} low={40} high={75} optimum={100} label="Strong password" />
```

### Sizes

size sets the track thickness: sm, md or lg.

```tsx
<Meter value={0.6} size="sm" label="Small" />
<Meter value={0.6} size="md" label="Medium" />
<Meter value={0.6} size="lg" label="Large" />
```

### In a context

There is no colour prop. Without bands the fill is the primary token, so declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the fill follows, or let it inherit from a region that already means something. Bands take precedence: a banded meter paints its own judgment, not the region's.

```tsx
<Meter value={0.4} label="Quota used" />
<div style={{ "--loam-context": "warning" }}>
  <Meter value={0.85} label="Quota used" />
</div>
<div style={{ "--loam-context": "danger" }}>
  <Meter value={0.98} label="Quota used" />
</div>
```

## When to use it

- To show a static quantity against its range: storage used, a quota, a battery, one segment's share of a whole. The value is a fact about now, not a step toward finishing.
- To grade a value against thresholds (password strength, a score, a risk level): pass low, high and optimum and the colour says which band the value is in without a colour prop.

## When not to

- For how far a task has got. A meter says where a value sits; a progressbar says work is under way and will finish. Uploads, imports and multi-step flows are Progress.
- When there is no known range. A meter without a truthful max is a bar with no meaning; show the number as text instead.

## How it works

### A measurement, not progress

Meter and Progress look alike and mean opposite things. A progressbar promises completion: assistive tech announces a task in flight and users expect it to reach the end. A meter reports a reading that may never move. Storage at 60% is not 60% of the way to anything, so putting it on a progressbar tells a screen-reader user a task is running when nothing is; put it on a meter and it reads as the quantity it is.

### The browser picks the band

low and high divide the range into three bands and optimum names the good one. The element works out where the value falls, so the colour is derived from the numbers rather than chosen by hand: a value cannot be painted green while sitting in the danger band. Without bands there is one band and no judgment, and the fill is the primary token, which a --loam-context region re-answers like any other.

### The name is required

The platform gives <meter> the meter role and its value, but no name, so on its own it announces as “meter, 60%” with no subject. label is a required prop for that reason: it becomes aria-label and says what is at 60% (“Storage used”). Sighted users need the same context, so keep visible text near the bar as well.

## Accessibility

- Renders the native <meter>, which carries role="meter" and its value, min and max without any ARIA; the browser clamps value into the range, so an out-of-range number never produces an invalid state.
- label is required and becomes aria-label; it is the only source of the element's accessible name. Anything visible near the bar (a caption, a number) is not linked to it unless you pass aria-labelledby, which is forwarded and overrides label.
- Under forced colours (Windows High Contrast) the fill paints with Highlight via forced-color-adjust: none and the track gains a CanvasText border, so the bar stays visible where background paint is normally stripped. Bands are then indistinguishable by colour, which is why the text near the meter must say the band too.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | The measured value. The browser clamps it into min to max. |
| `min` | `number` | `0` | Lower bound of the range. |
| `max` | `number` | `1` | Upper bound of the range. The platform default is 1, so value is a fraction; most consumers pass 100 and a percentage. |
| `low` | `number` | — | Upper bound of the low band. Values at or below it are low. |
| `high` | `number` | — | Lower bound of the high band. Values at or above it are high. |
| `optimum` | `number` | — | The ideal value. Its band is the good one, the band next to it suboptimal and the far band worst. Without it the middle band is good and both ends suboptimal. |
| `label` | `string` | — | Accessible name, rendered as aria-label. Required: the element has none of its own. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Track thickness. |
| `children` | `ReactNode` | `the value as a percentage of the range` | Fallback text for browsers without <meter>. |
| `...others` | `MeterHTMLAttributes<HTMLMeterElement>` | — | All native <meter> props are forwarded. |

