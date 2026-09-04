---
title: Skeleton
description: Placeholder while content loads.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Skeleton

An animated placeholder shown while content loads.

## Import

```tsx
import { Skeleton } from "@loamui/core";
```

## Usage

### Basic lines

Stack skeletons to stand in for text while it loads. A bare Skeleton is one line tall (1lh) in the local typography, so it needs no height.

```tsx
<Skeleton />
<Skeleton width="80%" />
<Skeleton width="60%" />
```

### Circle + lines

An avatar-and-text placeholder for a list item.

```tsx
<div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
  <Skeleton circle width="2.5rem" />
  <div style={{ display: "grid", gap: "0.4rem", flex: 1 }}>
    <Skeleton height="0.75rem" width="40%" />
    <Skeleton height="0.75rem" width="70%" />
  </div>
</div>
```

### Custom sizes

Use width and height for cards or thumbnails; shape comes from --loam-skeleton-radius or circle.

```tsx
<Skeleton
  width="8rem"
  height="8rem"
  style={{ "--loam-skeleton-radius": "var(--loam-radius-lg)" }}
/>
<Skeleton width="8rem" height="8rem" circle />
```

### Wrap real content

Wrapped children size the box, so the placeholder matches the coming layout with no size props; flip visible when the data lands.

```tsx
<Skeleton visible={loading}>
  <Avatar name="Ada Lovelace" />
</Skeleton>
```

## When to use it

- While loading content whose shape you already know: the skeleton mirrors the coming layout, so the swap to real content is a fill-in, not a rearrangement.
- To hold the loaded content's space open and avoid layout shift while data arrives.

## When not to

- When you cannot predict what the loaded layout looks like. A skeleton that does not match what replaces it makes the swap more jarring than showing nothing, and perceived performance gets worse, not better. Use Loader.
- For an operation that is not producing visible content in that spot (saving, deleting, background work). A skeleton promises content that never comes; use Loader next to the affected control.

## How it works

### Match the shape you are loading

Build the skeleton from the loaded UI's real dimensions: the avatar's diameter, the text's line heights, the thumbnail's radius. The entire benefit of a skeleton is that the eye has already parsed the layout before the content lands; a placeholder of a different shape spends that benefit and charges interest.

### Swap in place with visible

Wrap the real content and flip visible to false when it is ready. The wrapped children size the placeholder themselves, so it mirrors the coming layout without declared dimensions; width and height exist for bare placeholders, where the absent content cannot be measured. While the skeleton is visible, children are hidden from pointer, selection and assistive tech, so nothing half-loaded leaks out.

## Accessibility

- The root renders aria-hidden: skeletons are never announced. Screen-reader users hear the real content when it arrives instead of a stream of meaningless placeholders.
- Because skeletons are silent, announce the wait elsewhere if it needs announcing: a Loader (which renders role="status") or a visually hidden status message.
- The moving shimmer is gated behind prefers-reduced-motion: no-preference. Reduced-motion users get the same placeholder with a static gradient, with no override needed because the motion is opt-in.
- While visible, wrapped children are also unreachable by pointer and text selection (pointer-events: none, user-select: none), so nothing interactive is exposed before it is real.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number \| string` | `"100%"` | Inline size for a bare placeholder (number → px, or any CSS length). Wrapped content sizes itself. |
| `height` | `number \| string` | `"1lh"` | Block size (number → px, or any CSS length). |
| `circle` | `boolean` | — | Render as a circle (equal width/height, full radius). |
| `visible` | `boolean` | `true` | When false, render children instead of the placeholder. |
| `children` | `ReactNode` | — | Real content, shown once visible is false. |
| `...others` | `HTMLAttributes<HTMLDivElement>` | — | All native <div> props are forwarded. |

## Custom properties

| Property | Syntax | Default | Description |
| --- | --- | --- | --- |
| `--loam-skeleton-radius` | `CSS length` | `var(--loam-radius-md)` | Corner rounding of the placeholder; set per instance or on a region. |

