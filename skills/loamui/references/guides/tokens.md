---
title: Tokens
description: The token primitive: a handful of semantic decisions, everything else derived, and the theming that falls out of it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Tokens

The first of LoamUI's three primitives: a handful of semantic custom properties that every component reads. A small palette of colours and neutrals, plus fluid scales: everything else is derived by recipe, so theming is overriding `--loam-*` values at any scope. No `ThemeProvider`, no JavaScript.

## The surface

Small enough to read in full. A component library that mints thousands of tokens makes every one
a decision nobody can audit; here the decisions are the hues and neutrals, and the rest is
arithmetic:

| Token | Value |
| --- | --- |
| `--loam-font` | `system-ui, sans-serif` |
| `--loam-font-display` | `var(--loam-font)` |
| `--loam-font-mono` | `ui-monospace, "SF Mono", "JetBrains Mono", menlo, consolas, monospace` |
| `--loam-color-primary` | `light-dark(oklch(25% 0.006 60deg), oklch(92% 0.004 60deg))` |
| `--loam-color-accent` | `light-dark(oklch(48% 0.25 305deg), oklch(70% 0.17 305deg))` |
| `--loam-color-success` | `light-dark(oklch(56% 0.13 150deg), oklch(68% 0.13 150deg))` |
| `--loam-color-danger` | `light-dark(oklch(58% 0.2 25deg), oklch(66% 0.19 25deg))` |
| `--loam-color-warning` | `light-dark(oklch(72% 0.16 75deg), oklch(79% 0.15 80deg))` |
| `--loam-color-info` | `light-dark(oklch(58% 0.16 245deg), oklch(68% 0.15 245deg))` |
| `--loam-color-link` | `light-dark(oklch(50% 0.12 250deg), oklch(70% 0.12 250deg))` |
| `--loam-color-highlight` | `light-dark(oklch(92% 0.15 100deg), oklch(86% 0.16 100deg))` |
| `--loam-color-bg` | `light-dark(oklch(100% 0 0deg), oklch(17% 0.008 60deg))` |
| `--loam-color-bg-subtle` | `light-dark(oklch(98% 0.004 60deg), oklch(21% 0.008 60deg))` |
| `--loam-color-surface` | `light-dark(oklch(100% 0 0deg), oklch(23% 0.008 60deg))` |
| `--loam-color-fg` | `light-dark(oklch(24% 0.02 60deg), oklch(96% 0.006 60deg))` |
| `--loam-color-fg-strong` | `light-dark(oklch(15% 0.02 60deg), oklch(99% 0 0deg))` |
| `--loam-color-fg-muted` | `light-dark(oklch(52% 0.02 60deg), oklch(72% 0.015 60deg))` |
| `--loam-color-fg-dim` | `light-dark(oklch(55% 0.015 60deg), oklch(66% 0.012 60deg))` |
| `--loam-color-line` | `light-dark(oklch(91% 0.006 60deg), oklch(32% 0.01 60deg))` |
| `--loam-color-line-strong` | `light-dark(oklch(62% 0.012 60deg), oklch(60% 0.014 60deg))` |
| `--loam-color-on-strong` | `light-dark(oklch(99% 0 0deg), oklch(17% 0.01 60deg))` |
| `--loam-color-primary-soft` | `light-dark( oklch(from var(--loam-color-primary) 96% 0.02 h), oklch(from var(--loam-color-primary) 28% 0.03 h) )` |
| `--loam-color-success-soft` | `light-dark( oklch(from var(--loam-color-success) 96% 0.035 h), oklch(from var(--loam-color-success) 31% 0.075 h) )` |
| `--loam-color-danger-soft` | `light-dark( oklch(from var(--loam-color-danger) 96% 0.035 h), oklch(from var(--loam-color-danger) 31% 0.075 h) )` |
| `--loam-color-warning-soft` | `light-dark( oklch(from var(--loam-color-warning) 96% 0.035 h), oklch(from var(--loam-color-warning) 31% 0.075 h) )` |
| `--loam-color-info-soft` | `light-dark( oklch(from var(--loam-color-info) 96% 0.035 h), oklch(from var(--loam-color-info) 31% 0.075 h) )` |
| `--loam-color-primary-strong` | `light-dark( color-mix(in oklab, var(--loam-color-primary), oklch(0% 0 0deg) 22%), var(--loam-color-primary) )` |
| `--loam-color-success-strong` | `light-dark( color-mix(in oklab, var(--loam-color-success), oklch(0% 0 0deg) 22%), var(--loam-color-success) )` |
| `--loam-color-danger-strong` | `light-dark( color-mix(in oklab, var(--loam-color-danger), oklch(0% 0 0deg) 22%), var(--loam-color-danger) )` |
| `--loam-color-warning-strong` | `light-dark( color-mix(in oklab, var(--loam-color-warning), oklch(0% 0 0deg) 22%), var(--loam-color-warning) )` |
| `--loam-color-info-strong` | `light-dark( color-mix(in oklab, var(--loam-color-info), oklch(0% 0 0deg) 22%), var(--loam-color-info) )` |
| `--loam-color-primary-ring` | `var(--loam-color-primary-strong)` |
| `--loam-color-success-ring` | `var(--loam-color-success-strong)` |
| `--loam-color-danger-ring` | `var(--loam-color-danger-strong)` |
| `--loam-color-warning-ring` | `var(--loam-color-warning-strong)` |
| `--loam-color-info-ring` | `var(--loam-color-info-strong)` |
| `--loam-color-surface-hover` | `light-dark( oklch(from var(--loam-color-surface) 97% c h), oklch(from var(--loam-color-surface) 27% c h) )` |
| `--loam-color-ring` | `var(--loam-color-primary-ring)` |
| `--loam-text-xs` | `clamp(0.72rem, 0.8145rem - 0.122cqi, 0.7901rem)` |
| `--loam-text-sm` | `clamp(0.8889rem, 0.885rem + 0.0193cqi, 0.9rem)` |
| `--loam-text-md` | `clamp(1rem, 0.9565rem + 0.2174cqi, 1.125rem)` |
| `--loam-text-lg` | `clamp(1.125rem, 1.0272rem + 0.4891cqi, 1.4063rem)` |
| `--loam-text-xl` | `clamp(1.2656rem, 1.0944rem + 0.856cqi, 1.7578rem)` |
| `--loam-text-2xl` | `clamp(1.4238rem, 1.1548rem + 1.3451cqi, 2.1973rem)` |
| `--loam-text-3xl` | `clamp(1.6018rem, 1.2036rem + 1.9909cqi, 2.7466rem)` |
| `--loam-space-xs` | `clamp(0.25rem, 0.2391rem + 0.0543cqi, 0.2813rem)` |
| `--loam-space-sm` | `clamp(0.5rem, 0.4783rem + 0.1087cqi, 0.5625rem)` |
| `--loam-space-md` | `clamp(0.75rem, 0.7174rem + 0.163cqi, 0.8438rem)` |
| `--loam-space-lg` | `clamp(1rem, 0.9565rem + 0.2174cqi, 1.125rem)` |
| `--loam-space-xl` | `clamp(1.5rem, 1.4348rem + 0.3261cqi, 1.6875rem)` |
| `--loam-measure` | `66ch` |
| `--loam-radius-sm` | `0.375rem` |
| `--loam-radius-md` | `0.5rem` |
| `--loam-radius-lg` | `0.75rem` |
| `--loam-radius-xl` | `1rem` |
| `--loam-radius-full` | `9999px` |
| `--loam-shadow-sm` | `inset 0 1px 0 0 light-dark(transparent, oklch(100% 0 0deg / 6%)), 0 1px 2px light-dark(oklch(20% 0.02 60deg / 8%), transparent)` |
| `--loam-shadow-raised` | `inset 0 1px 0 0 light-dark(oklch(100% 0 0deg / 60%), oklch(100% 0 0deg / 10%)), 0 1px 2px light-dark(oklch(20% 0.02 60deg / 10%), transparent), 0 2px 4px light-dark(oklch(20% 0.02 60deg / 7%), transparent), 0 4px 8px light-dark(oklch(20% 0.02 60deg / 4%), transparent)` |
| `--loam-shadow-md` | `inset 0 1px 0 0 light-dark(transparent, oklch(100% 0 0deg / 6%)), 0 4px 6px -1px light-dark(oklch(20% 0.02 60deg / 10%), transparent), 0 2px 4px -2px light-dark(oklch(20% 0.02 60deg / 8%), transparent)` |
| `--loam-shadow-lg` | `inset 0 1px 0 0 light-dark(transparent, oklch(100% 0 0deg / 8%)), 0 12px 20px -6px light-dark(oklch(20% 0.02 60deg / 14%), transparent), 0 4px 8px -4px light-dark(oklch(20% 0.02 60deg / 10%), transparent)` |
| `--loam-duration-sm` | `100ms` |
| `--loam-duration-md` | `175ms` |
| `--loam-duration-lg` | `300ms` |
| `--loam-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--loam-ease-elastic` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--loam-ring-width` | `3px` |
| `--loam-disabled-opacity` | `0.55` |

## Rebrand in one line

One token carries the brand: `--loam-color-primary`. Everything else (the soft tint, hover, active,
solid fills, focus rings) is _derived_ from it by recipe, so there is nothing else to keep in
sync:

```css
:root {
  --loam-color-primary: light-dark(oklch(0.62 0.2 275), oklch(0.72 0.17 275)); /* violet */
}
```

The brand colour appears wherever the design says primary: focus rings, checked states, carets,
and `primary` context regions. (Buttons are neutral by default; the demo below is
wrapped in a primary region so you can see the change.) Scope the token to a subtree to theme
just part of a page: the nearest declaration up the tree wins, so both cards below run identical
CSS and differ only in where the token is set:

```tsx
<div style={{ "--loam-context": "primary" }}>
  <Button>Default brand</Button>   {/* --loam-color-primary resolves at :root */}
</div>

<div style={{
  "--loam-color-primary": "light-dark(oklch(0.62 0.2 275), oklch(0.72 0.17 275))",
  "--loam-context": "primary",
}}>
  <Button>Violet brand</Button>    {/* …resolves here instead */}
</div>
```

  </div>
</div>

## Dark mode

Dark mode is native. Tokens are defined with CSS `light-dark()` and the root declares
`color-scheme: light dark`, so the user's OS preference is followed with no JavaScript and no
configuration; that is the default state.

The stylesheet can only speak once it has loaded. Add the matching meta tag so the browser paints
the canvas in the right scheme _before_ CSS arrives (otherwise dark-preference users get a flash
of light canvas on every load):

```html
<meta name="color-scheme" content="light dark" />
```

To override the preference, set `data-theme="dark"` or `data-theme="light"`: on the root for the
whole app, or on any element for just that subtree (the attribute simply sets `color-scheme`, so
every `light-dark()` token re-resolves there). Remove the attribute to follow the OS preference
again.

The same mechanism gives you an inverted "on-dark" section: set `data-theme="dark"` on the region
(or `color-scheme: dark` in its CSS; the attribute is just a setter for it) and every
`light-dark()` token flips. One caveat: colours already resolved on an ancestor inherit as
resolved values and don't re-resolve, so the inverted region must also re-declare `color` (e.g.
`color: var(--loam-color-fg)`) for descendants to pick up the flipped value.

> This is one instance of LoamUI's baseline posture: **the user's stated preferences are the default.** Colour scheme is followed natively, motion exists only inside `prefers-reduced-motion: no-preference`, and forced colour palettes are honoured rather than overridden. Everything beyond that baseline (a saved theme, an animation) is an explicit opt-in layered on top.

## Contexts

A **context** declares what a region _means_, as a custom property (`--loam-context`) that every
LoamUI component inside adopts. The mechanics (the vocabulary, one-element regions, why the
property lives on an ancestor) are the [Contextualism guide](/docs/contextualism)'s subject;
what matters for theming is that a context remaps _semantic colour tokens only_, so it composes
with everything on this page:

</div>

```css
/* the idiomatic form: a named region declares its meaning in
   its own stylesheet (a style attribute works for one-offs) */
.danger-zone {
  --loam-context: danger;
}
```

```tsx
<section className="danger-zone">
  {/* everything inside adopts the danger accent: buttons, checked
      states, carets: even focus rings */}
  <Checkbox label="I understand this is permanent" />
  <Button>Delete</Button>
</section>
```

> Theme, context, and instance are one mechanism at three scopes: remap tokens on `:root` to set a brand, declare a context on a region to give it meaning, set a property on an instance to override one control.

## Most useful to override

Start here when theming:

- `--loam-color-primary`: the brand colour (the soft tint, solid fill, focus ring and hover/active
  states all derive; there is nothing else to sync)
- `--loam-color-bg`, `--loam-color-surface`, `--loam-color-fg`, `--loam-color-line`: surfaces & text
- `--loam-radius-md`, `--loam-radius-lg`: corner rounding
- `--loam-font`, `--loam-font-display`: the body and heading font families (both `system-ui` by
  default; set either and it flows through the whole stack)
- `--loam-duration-sm/md/lg`, `--loam-ease`: motion by intent (micro feedback, defaults, overlay
  enter/exit)

## Fluid type & spacing

The type (`--loam-text-xs`…`3xl`) and spacing (`--loam-space-xs`…`xl`) scales are fluid `clamp()`
values in container units (`cqi`), generated with [Utopia](https://utopia.fyi); the calculator
parameters are committed as comments in `tokens.css`. Without a container they respond to the
viewport; declare one on any region to make its LoamUI typography respond to _that region's_
width instead:

```css
.sidebar {
  container-type: inline-size; /* LoamUI text in here now scales to the sidebar */
}
```

Corner radii are deliberately _not_ fluid: rounding shouldn't breathe. Control heights aren't
tokens at all: buttons and form controls share one derived anatomy (padding + line-height +
border), so they align by construction at every container width.

> Because tokens cascade, you can theme per-brand or per-section by setting variables on any wrapper element; the whole theme is just values in the cascade.

## Extending & overriding styles

Tokens cover most theming. When you need to change something a token doesn't expose, LoamUI gives
you three escape hatches, and none of them need `!important`.

### 1. Target the class names

Every component's scope root has a stable, prefixed class: `.loam-Button`, `.loam-Card`,
`.loam-Input-field`, and so on. The parts inside are plain elements and short classes, shown in
each component's CSS tab. Because LoamUI's styles live inside a CSS `@layer`, any rule you write
_outside_ a layer automatically beats them; you never fight specificity:

```css
/* Unlayered CSS always wins over LoamUI's layered CSS: no !important */
.loam-Button {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.loam-Card {
  box-shadow: 0 10px 40px -12px rgb(0 0 0 / 0.25);
}
```

### 2. Add your own className

Every component forwards `className` and `style` (and all native DOM props) to its root element,
so you can scope overrides to specific instances:

```tsx
<Button className="cta">Subscribe</Button>
```

```css
.cta {
  border-radius: 999px;
  padding-inline: 2rem;
}
```

### 3. Order your own layer

Prefer explicit control over the cascade? Declare a layer _after_ LoamUI's and put your overrides
there; they win by layer order, no matter the selector specificity:

```css
/* Declare the full order once: correct wherever it appears,
   before or after importing LoamUI's stylesheet. */
@layer loamui.tokens, loamui.elements, loamui.components, app;

@layer app {
  .loam-Tabs .tab {
    font-weight: 600;
  }
}
```

> The class names are a stable, documented API; the exact selectors for every component are in its real stylesheet, under the **CSS** tab on its docs page.
