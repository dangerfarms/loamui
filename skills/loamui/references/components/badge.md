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

Compose a Badge.Dot before the label to show a status dot. It takes the context's colour, so the badge reads at a glance even before the text. Draft has no context, so its dot stays neutral: the dot still shows without one.

```tsx
<span style={{ "--loam-context": "success" }}>
  <Badge><Badge.Dot /> Live</Badge>
</span>
<span style={{ "--loam-context": "warning" }}>
  <Badge><Badge.Dot /> Pending</Badge>
</span>
<span style={{ "--loam-context": "danger" }}>
  <Badge><Badge.Dot /> Offline</Badge>
</span>
<Badge><Badge.Dot /> Draft</Badge>
```

### As a link

A badge is not a control, but a tag can be a link to everything tagged the same way. render substitutes the element and the pill stays; the link role, focus and keyboard behaviour come from the <a>.

```tsx
<span style={{ "--loam-context": "info" }}>
  <Badge render={<a href="#tag-design" />}>design</Badge>
</span>
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
- With Badge.Dot for presence and liveness (“Live”, “Offline”): the dot carries the raw status colour so the state reads even before the word.

## When not to

- As a click target for an action. Badge renders a plain <span> with no role, focus or keyboard handling. A tag that navigates is render={<a href />}; a status that triggers something is a Button beside it.
- For sentences or long labels. The pill is white-space: nowrap, so long text will not wrap; it is built for one or two words.

## How it works

### One or two words

A badge is metadata absorbed at a glance while scanning past it. The moment the label needs a verb it has become content, and content belongs in text the eye is meant to stop on. The nowrap styling enforces this: prose in a badge will not fit.

### Never interactive

The rendered element is a span with no interactive semantics, and that is deliberate: a status is a fact, not an affordance. An onClick on it creates a control that keyboards and screen readers cannot find. The one interactive badge is a link, because a tag can lead to everything it tags: render={<a href />} keeps the pill on a real <a>. An action belongs on a Button beside it.

## Accessibility

- Renders a plain <span> with no role and no focus behaviour: screen readers announce it as ordinary inline text, exactly what a label should be.
- The status dot is aria-hidden decoration, so the visible word must carry the state on its own (“Live”, not a bare green dot). Under forced colours it keeps a border in the text colour, so it survives where background paint is stripped.
- The context colours the pill but is never announced. Assistive tech hears only the text, so never let colour be the only difference between two badges.
- The label is not the raw status colour: it is mixed toward black (light scheme) or white (dark) so it keeps contrast on the pill's own tint in both schemes.

## Props

Status is not a prop: it comes from the surrounding `--loam-context` region (see the Contextualism guide).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control size: the type step, with the pill's geometry in em on it. |
| `render` | `RenderProp` | — | Substitute the element (render={<a href=… />} for a tag that is a link); the Badge's class and attributes merge onto it. |
| `children` | `ReactNode` | — | The badge content: label, and any composed icons. |
| `...others` | `SpanHTMLAttributes` | — | All native <span> props are forwarded. |

## Parts

### Badge.Dot

A status dot composed before the label: an aria-hidden <span> carrying the raw context colour. Native <span> props are forwarded.

