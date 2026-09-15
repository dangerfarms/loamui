---
title: Conformance
description: The page skeleton, the lint gate, and the deliberate departures from the modern-css and Modern Web Guidance references.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Conformance

LoamUI follows two references: the [modern-css](https://moderncss.ai) rule set and Google Chrome's [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance). A composition built with the library should pass a review against both without findings. This page holds what the component references do not: the skeleton every page needs, the lint gate that enforces the CSS rules, and the places where LoamUI departs from a reference on purpose.

## The page skeleton

Components are composed into a page, and the page has requirements of its own that no component supplies. Check them on every deliverable; a linter cannot.

- **A skip link.** `SkipLink` is the first focusable element and targets `<main id="content" tabindex="-1">`, so keyboard users bypass the header's navigation.
- **One `h1`, sequential headings, everything in a landmark** (`header`, `nav`, `main`, `footer`). An ordinary `section` is not named: `aria-labelledby` turns it into a `region` landmark, and a page of regions dilutes the list a screen reader offers. Name a section only when it is a destination of its own: a form, a carousel, a page-opening hero.
- **Styled lists keep their semantics.** A `ul` or `ol` with `list-style: none`, flex or grid outside a `nav` carries `role="list"`; Safari otherwise drops the list from the accessibility tree.
- **Motion has a control.** Anything that moves on its own (a marquee, a ticker) lives inside `prefers-reduced-motion: no-preference` and has a visible pause button carrying `aria-pressed`. Pausing on hover is not a control: keyboard and touch never hover.
- **Form controls say what they are.** `required`, `type`, `inputmode` and `autocomplete` together on the control, even when validation runs on the server; Field supplies the label, description and error wiring.
- **The LCP image is in the HTML** with `fetchpriority="high"`, `width`, `height`, `srcset` and `sizes`, never `loading="lazy"`; images below the fold are lazy. A third-party image origin gets a `preconnect` hint.
- **Layout is scoped CSS** in `loamui.components`. Neither utility classes nor the `style` attribute carry padding, width or margin; `style` passes only custom-property data such as `--loam-context` or a documented size hook.
- **Theme overrides sit in the `brand` layer**, declared last in the [layer order](/docs/installation), never as unlayered `:root` rules.
- **Regions that flip scheme** (a dark header on a light page) set `color-scheme` and re-declare `color`, `--loam-color-primary` and `--loam-color-ring`: inherited colours and root-derived tokens do not re-resolve on their own, and a focus ring can end up black on black.

## The lint gate

`@loamui/core/stylelint-config` is the configuration the library lints itself with; [installation](/docs/installation) shows how a project extends it. It enforces the CSS half of the references:

- nesting, and logical properties instead of physical ones;
- `oklch()` or a token for every colour: no hex, named, `rgb()` or `hsl()` colours;
- no `!important`, no viewport units for sizing, no `px` font sizes;
- range syntax in media and container queries;
- every custom property known: the shipped tokens are the reference, so a mistyped `--loam-*` fails the lint instead of the page, and a recipe's own properties must be declared where they are used;
- alphabetical declarations, so a diff shows a change rather than a reordering.

Additive CSS is a review rule the linter cannot see: each property is set once under mutually exclusive conditions (`:not(:first-child)`, non-overlapping ranges), and the only override is a specialisation that reads as intent.

## Deliberate departures

Where the library or its recipes depart from a reference, the departure is a decision, recorded here so a review does not raise it again.

- **At-rules at scope level.** modern-css nests `@container` and `@media` inside the selector they qualify. A recipe may instead group one breakpoint's rules for several parts in a single at-rule at scope level, so a layout change reads as one decision. Both forms are additive; neither overrides.
- **Structural geometry in `rem`.** modern-css avoids fixed units for spacing. Tokens carry design decisions: colour, space, type, radius. A column threshold, a tile's size, an aspect ratio or a hairline is geometry, and stays ordinary CSS.
- **Named page-section recipes.** Modern Web Guidance treats `region` as a last resort. The recipes that are page sections in their own right (heroes, FAQ) name themselves by their heading because they are copied into pages as standalone destinations. The skeleton rule above limits naming to those.
- **A forced colour scheme.** The dark-mode guidance keeps the root on the system preference. A brand that is light-only sets `data-theme="light"` and the matching `color-scheme` meta; that is a product decision, recorded in the project's instructions, not a default.
- **Unprefixed `mask-image`.** The edge-fade guidance keeps a `-webkit-` prefix for older engines. The library's browser policy is Baseline without prefixes; a project's bundler adds them for its own targets.
- **Motion opt-in only.** Both references accept `prefers-reduced-motion: reduce` overrides; the library uses only `no-preference`, so the absence of motion is the state that needs no code.
