---
title: Element styles
description: The element-styles primitive: enhanced default styles for native HTML, page-wide. Plain markup is already styled before any component appears.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Element styles

The second of LoamUI's three primitives: enhanced default styles for the native elements themselves, applied page-wide by the `loamui.elements` layer. Importing the stylesheet opts you in: plain HTML is already styled before a single component appears, and everything on this page is bare markup with no classes.

## Typography

Headings use the display font (`--loam-font-display`) at the fluid type scale with balanced
wrapping and the strong text tier (`--loam-color-fg-strong`), so they sit a step darker than body
copy in light and a step brighter in dark. Body copy rides the same fluid scale (`--loam-text-md`),
and the OpenType defaults do the fine work: common ligatures and old-style figures in running
text, lining figures in headings, hanging punctuation, and automatic hyphenation. Every element
derives its own line-height from its font size (`calc(0.5rem + 2ex)`), so leading tracks the text
it leads. Margins are additive: blocks carry only a block-end margin, and the extra space before a
heading comes from an adjacent-sibling rule, so nothing needs unsetting at the top of a container.
Tables collapse their borders and start-align their headers; inline `code`, `kbd` and `samp` all
get the same chip.

</div>

## Forms without components

Native controls wear the component recipes: buttons get the Button anatomy on the neutral
text channel (raised at rest, settling when pressed, because raised means pressable);
textual fields get the Input field look, and checkboxes, radios, ranges and progress bars
are native `accent-color` controls, driven by the neutral primary. A plain HTML form dropped into a LoamUI page is presentable
before you reach for a component. The components remain the upgrade path (fluid sizing,
context adaptation, field wiring).

## Details, focus and selection

- Every element shares one `:focus-visible` ring, offset so the page shows
  through the gap; it survives forced colours and follows border radius.
- Text selection uses the highlight token (yellow), while the caret and form
  `accent-color` take the neutral primary, so a rebrand reaches even the parts
  without classes.
- Anything with an `id` gets scroll margin, so anchored headings never hide under
  sticky chrome.
- Disabled controls (and everything inside them) show a `not-allowed` cursor;
  images, video and SVG never overflow their container.
- The page reserves its scrollbar gutter so content never jumps, and in-page scrolling is
  smooth for anyone who hasn't asked for reduced motion.

## Overridable by design

The layer keeps every rule beatable: anything you write outside a layer wins, and the
components layer wins for a component's own parts. There is no specificity to fight:
the element styles are a floor, not a ceiling:

```css
/* Your unlayered CSS always beats the elements layer */
blockquote {
  border-inline-start-color: var(--loam-color-primary);
}
```

> Element styles are a primitive precisely because downstream work builds on them: new components start from styled native elements, so most of a new component's CSS is already written before its stylesheet exists.
