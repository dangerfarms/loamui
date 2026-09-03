---
title: Separator
description: A rule between groups of content.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Separator

A native <hr> for boundaries that mean something: announced as a separator, not just drawn as a line.

## Import

```tsx
import { Separator } from "@loamui/core";
```

## Usage

### Basic usage

A real <hr>: the platform's separator role, no ARIA required.

```tsx
<p style={{ margin: 0 }}>Account settings</p>
<Separator />
<p>Danger zone</p>
```

### Vertical

Divides items in a row; adds aria-orientation="vertical" and stretches to the row's height.

```tsx
<div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
  <span>Cut</span>
  <Separator orientation="vertical" />
  <span>Copy</span>
  <Separator orientation="vertical" />
  <span>Paste</span>
</div>
```

## When to use it

- Between groups of related content where the division itself carries meaning: it is announced as a separator by assistive technology.
- Between inline items in a toolbar-like row (vertical form).

## When not to

- For purely visual division between layout areas. A border on the region is simpler and adds nothing to the accessibility tree.
- Inside a Menu. Menu.Separator exists for that and is already styled for menu padding.

## How it works

### Meaningful division only

An <hr> is announced to assistive technology as a separator, a real boundary between one group of content and the next. A line that is only visual rhythm belongs in CSS as a border, where it adds nothing to what a screen reader must walk through.

### Prefer space before rules

Whitespace and headings usually divide content more quietly than a drawn line, and grouped controls have better tools (Fieldset, Card). Reach for Separator when groups genuinely need a marked boundary the eye and the screen reader should both register: a toolbar's action clusters, a footer's legal block.

## Accessibility

- Renders a native <hr>, which has the separator role built in.
- The vertical form adds aria-orientation="vertical" so the division is announced correctly in horizontal flows.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the rule. |
| `...others` | `HTMLAttributes<HTMLHRElement>` | — | All native <hr> props are forwarded. |

