---
title: SkipLink
description: Jump straight to the main content.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# SkipLink

The first focusable element on the page: a link straight to the main content, visible only while focused.

## Import

```tsx
import { SkipLink } from "@loamui/core";
```

## Usage

### Basic

Click into the preview and press Tab: the link appears fixed at the top corner of the viewport. This site's own skip link is this component.

```tsx
<SkipLink href="#content" />
<main id="content" tabIndex={-1}>…</main>
```

## When to use it

- On every page with repeated header content (navigation, search, branding), before the main content.
- As the very first element inside <body>, so it is the first Tab stop on the page.

## When not to

- Pages with no header to skip: if the first Tab stop is already the main content, the link only adds a step.
- As a general-purpose anchor link: it is an escape hatch past repeated chrome, not in-page navigation. Use ordinary links for tables of contents.

## How it works

### Hidden is the unfocused state

The link is clipped to a pixel until it receives focus, then appears fixed at the top corner, above every overlay, because a skip link that opens beneath a toast is invisible to the person who needs it most. It reveals on :focus rather than :focus-visible: assistive technology can focus it without triggering keyboard heuristics, and it must appear for every focus.

### The target is a landmark

Point href at the id of the <main> element and give the target tabIndex={-1}: an id alone scrolls, but only a focusable target reliably moves keyboard focus past the header in every browser. <main> keeps the destination meaningful to assistive technology, and the elements layer gives every [id] scroll-margin so the target never hides under sticky chrome.

## Accessibility

- Keyboard and screen-reader users otherwise re-traverse the whole header on every page; this is the standard escape hatch, and it must be the first Tab stop to do its job.
- Reveals on :focus (not :focus-visible), so it appears however focus arrives.
- Fixed positioning means appearing never shifts the page layout.
- The default label 'Skip to main content' names the destination; if you override it, keep the destination in the words.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | — | The id of the main content landmark, e.g. "#content". |
| `children` | `ReactNode` | `"Skip to main content"` | The link label. |
| `...others` | `AnchorHTMLAttributes<HTMLAnchorElement>` | — | All native <a> props are forwarded. |

