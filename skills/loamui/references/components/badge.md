---
title: Badge
description: Compact status or label pill.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Badge

A compact pill for statuses, counts, and labels.

## Import

```tsx
import { Badge } from "@loamui/core";
```

## Usage

### Contexts

Badges are neutral by default. There are no variant or colour props: declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the status colours follow, or let it inherit from a larger region. Badge keeps a size prop because it sizes an intrinsic glyph, the one exception the library makes for display components (Badge, Loader, Progress).

```tsx
<Badge>Neutral</Badge>
<span style={{ "--loam-context": "primary" }}><Badge>Primary</Badge></span>
<span style={{ "--loam-context": "success" }}><Badge>Success</Badge></span>
<span style={{ "--loam-context": "warning" }}><Badge>Warning</Badge></span>
<span style={{ "--loam-context": "danger" }}><Badge>Danger</Badge></span>
<span style={{ "--loam-context": "info" }}><Badge>Info</Badge></span>
```

### Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Status dot

Add dot to show a status dot before the label. It takes the context's colour, so the badge reads at a glance even before the text. Draft has no context, so its dot stays neutral: the dot still shows without one.

```tsx
<span style={{ "--loam-context": "success" }}><Badge dot>Live</Badge></span>
<span style={{ "--loam-context": "warning" }}><Badge dot>Pending</Badge></span>
<span style={{ "--loam-context": "danger" }}><Badge dot>Offline</Badge></span>
<Badge dot>Draft</Badge>
```

### Icons (composed as children)

No leftSection / rightSection props: an svg child is detected via :has(svg) and gets a gap and 1em sizing, exactly like Button.

```tsx
<span style={{ "--loam-context": "success" }}>
  <Badge>
    <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
      <path d="M5.5 12.5L10.167 17L19.5 8" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Verified
  </Badge>
</span>
```

## When to use it

- To label a record with its status or category at a glance: one or two words sitting next to the thing they describe, readable without reading the row.
- For small counts and metadata (unread messages, item totals) where a full sentence would drown the signal.
- With dot for presence and liveness (“Live”, “Offline”): the dot carries the raw status colour so the state reads even before the word.

## When not to

- As a click target. Badge renders a plain <span> with no role, focus or keyboard handling. If the status should filter or navigate, use a Button or a link and style from there.
- For sentences or long labels. The pill is white-space: nowrap, so long text will not wrap; it is built for one or two words.

## How it works

### One or two words

A badge is metadata absorbed at a glance while scanning past it. The moment the label needs a verb it has become content, and content belongs in text the eye is meant to stop on. The nowrap styling enforces this: prose in a badge will not fit.

### Never interactive

The rendered element is a span with no interactive semantics, and that is deliberate: a status is a fact, not an affordance. Making a badge clickable creates a control that keyboards and screen readers cannot find. Put the action on a real Button or link beside it.

## Accessibility

- Renders a plain <span> with no role and no focus behaviour: screen readers announce it as ordinary inline text, exactly what a label should be.
- The status dot is aria-hidden decoration, so the visible word must carry the state on its own (“Live”, not a bare green dot).
- The context colours the pill but is never announced. Assistive tech hears only the text, so never let colour be the only difference between two badges.
- The label is not the raw status colour: it is mixed toward black (light scheme) or white (dark) so it keeps contrast on the pill's own tint in both schemes.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dot` | `boolean` | — | Show a status dot before the label, coloured by the context. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control size (height, padding, font size). |
| `children` | `ReactNode` | — | The badge content: label, and any composed icons. |
| `...others` | `SpanHTMLAttributes` | — | All native <span> props are forwarded. |

