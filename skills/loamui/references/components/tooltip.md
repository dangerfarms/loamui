---
title: Tooltip
description: Reveal info on hover or focus.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Tooltip

A small floating label revealed on hover and keyboard focus, composed from parts.

## Import

```tsx
import { Tooltip } from "@loamui/core";
```

## Usage

### Positions

Place the bubble on any side of its target with the Popup's position prop. It opens after a short delay on hover, immediately on keyboard focus.

```tsx
<Tooltip.Root>
  <Tooltip.Trigger>Top</Tooltip.Trigger>
  <Tooltip.Popup position="top">On the top</Tooltip.Popup>
</Tooltip.Root>
<Tooltip.Root>
  <Tooltip.Trigger>Bottom</Tooltip.Trigger>
  <Tooltip.Popup position="bottom">On the bottom</Tooltip.Popup>
</Tooltip.Root>
<Tooltip.Root>
  <Tooltip.Trigger>Left</Tooltip.Trigger>
  <Tooltip.Popup position="left">On the left</Tooltip.Popup>
</Tooltip.Root>
<Tooltip.Root>
  <Tooltip.Trigger>Right</Tooltip.Trigger>
  <Tooltip.Popup position="right">On the right</Tooltip.Popup>
</Tooltip.Root>
```

### With arrow

Compose Tooltip.Arrow inside the Popup for a pointer.

```tsx
<Tooltip.Root>
  <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
  <Tooltip.Popup>
    Saved just now <Tooltip.Arrow />
  </Tooltip.Popup>
</Tooltip.Root>
```

### Grouped with a Provider

Tooltip.Provider shares the hover delay across a group: after the first bubble opens, moving between adjacent triggers reveals instantly.

```tsx
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Cut</Tooltip.Trigger>
    <Tooltip.Popup>
      Cut the selection <Tooltip.Arrow />
    </Tooltip.Popup>
  </Tooltip.Root>
  <Tooltip.Root>
    <Tooltip.Trigger>Copy</Tooltip.Trigger>
    <Tooltip.Popup>
      Copy the selection <Tooltip.Arrow />
    </Tooltip.Popup>
  </Tooltip.Root>
  <Tooltip.Root>
    <Tooltip.Trigger>Paste</Tooltip.Trigger>
    <Tooltip.Popup>
      Paste the selection <Tooltip.Arrow />
    </Tooltip.Popup>
  </Tooltip.Root>
</Tooltip.Provider>
```

## When to use it

- To label icon-only buttons or clarify what a control does: short, redundant, visual-only text.
- To expand an abbreviation or term in place for pointer and keyboard users.

## When not to

- For information the user needs in order to proceed: hover does not exist on touch devices, so essential content must be visible in the page.
- For interactive content (links, buttons), use Popover, which is click-invoked and keyboard-operable.
- As a replacement for a visible label on a form field, use Field.Label.

## How it works

### Tooltips repeat, they never reveal

A tooltip may only say what the page already makes knowable: the label of an icon button, the expansion of an abbreviation. Touch devices have no hover, so content that exists only in a tooltip does not exist for a large share of users.

### Same words as the accessible name

On an icon-only button, the aria-label and the tooltip should say the same thing. If the tooltip wants to say more than the name, the extra is content: put it in the page or a Popover, not appended to a hover bubble.

### Nothing interactive inside

The bubble is role="tooltip" and never receives focus: a link or button inside it is unreachable by keyboard. The moment a tooltip needs a control, it is a Popover.

## Accessibility

- The trigger is permanently linked to the bubble via aria-describedby, so screen readers announce the text with the control whether or not it is visually shown.
- Escape dismisses the bubble without moving pointer or focus, the bubble stays open while hovered, and it persists until hover/focus leaves: the three requirements of WCAG 1.4.13 (Content on Hover or Focus).
- Opens immediately on visible (keyboard) focus with no hover delay; hover-open and tap-focus-open are both suppressed for touch pointers, where hover does not exist.
- Hover and keyboard focus are tracked independently, so a pointer passing over a focused trigger cannot steal the bubble away.
- Rendered with the native popover attribute (hint where the browser supports it, detected explicitly) and CSS anchor positioning where supported, with a wrapper-anchored fallback elsewhere: no polyfills, per the browser support policy.

## Parts

### Tooltip.Provider

Optional. Shares one hover delay across a group, with instant opens between adjacent triggers.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | `600` | Hover delay in ms for all tooltips underneath. |

### Tooltip.Root

Groups the parts and owns open state, timers, and Escape handling. Native <span> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | `number` | `600` | Hover delay in ms; overrides the Provider. |
| `open` | `boolean` | — | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial open state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | — | Called whenever the open state should change. |

### Tooltip.Trigger

A LoamUI Button wired with hover/focus handlers and aria-describedby; all native <button> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `element \| (props) => node` | — | Substitute your own interactive element; it receives the wiring props. |

### Tooltip.Popup

The bubble (role="tooltip"); native <span> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Which side of the trigger the bubble appears on. |

### Tooltip.Arrow

Optional pointer arrow toward the trigger; native <span> props are forwarded.

