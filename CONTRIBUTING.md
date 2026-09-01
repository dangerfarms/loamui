# Contributing to LoamUI

Thanks for your interest in improving LoamUI! 🌱

## Prerequisites

- Node.js >= 20 (we develop on 24)
- pnpm 11 (`corepack enable` then `corepack use pnpm@11`)

## Getting started

```bash
git clone https://github.com/dangerfarms/loamui.git
cd loamui
pnpm install
pnpm build      # builds @loamui/core (required before running the docs)
pnpm dev        # runs the docs site
```

## Project layout

- `packages/core` — the `@loamui/core` component library. Each component lives in
  `src/components/<Name>/` as a `.tsx` file plus a plain `.css` file inside
  `@layer loamui.components`. Each scope root keeps one prefixed class
  (`.loam-<Name>`, or a semantic root name like `.loam-Input-field` where a
  component has several roots); parts inside the scope are type selectors or
  short classes (`label`, `p.description`) — the encapsulation is `@scope`'s
  job, not the class name's.
- `apps/docs` — the Next.js marketing + documentation site.

## Framing

The one-line identity, in priority order — use it in the homepage, when
prioritising navigation, and when writing any docs:

- **Primary:** LoamUI — modern UI primitives for agent-assisted
  developers.
- **Secondary:** Contextual tokens, element styles and React components
  based on Google's Modern Web Guidelines for quickly building bespoke
  UIs that are accessible, adaptable and fast.
- **Tertiary:** Steeped in UX best practices and inspired by Base UI's
  component composition architecture.

Keyword priority: modern, UI primitives, agent-assisted,
contextual/adaptable, bespoke, accessible, fast. Never lead with
"beautiful, fast, accessible" — every library says that.

## CSS authoring standard

LoamUI's CSS follows two references, installed as agent skills in this repo
(`.agents/skills/`, with Claude Code symlinks in `.claude/skills/` — pinned by
`skills-lock.json`):

- [`modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) —
  Google Chrome's guidance for the modern web platform. Lead principle: **be
  allergic to knowledge duplication** (set defaults once; let the cascade and
  inheritance work). Search it with
  `npx -y modern-web-guidance@latest search "<query>"`.
- [`modern-css`](https://moderncss.ai) — the ModernCSS rule set
  (`moderncss/skills`).

Concretely this means: cascade layers (`@layer`) with `@scope`d element selectors
instead of BEM; additive CSS (each property set once under mutually-exclusive
conditions — the only permitted override is `elements` → `components`); logical
properties; `oklch()` / `light-dark()` / `color-mix()`; container queries; and
**progressive enhancement, not degradation** (opt into motion via
`@media (prefers-reduced-motion: no-preference)`, never a global
`animation-duration: 0.01ms` kill-switch).

**Stylesheet anatomy** (mirrors ModernCSS's site convention): `src/styles.css`
is the entry and only orchestrates — the cascade-layer order plus `layer()`
imports; `src/tokens.css` holds every design token (four bands: inputs →
neutrals → derived → scales, with Utopia calculator URLs committed
above the fluid scales); `src/elements.css` is its
layers' contents. **Component CSS files contain no `@layer`** — the layer is
assigned by the orchestrator's imports in dev and by `scripts/build-css.mjs`
in the built artifact (the build errors if a component file declares one).

**Motion**: use the duration tokens by intent — `--loam-duration-sm` for micro
feedback (hovers, colour shifts), `-md` for default transitions, `-lg` for
overlay enter/exit and large movement — with `--loam-ease`
(`--loam-ease-elastic` for sparing playful accents). Always inside
`@media (prefers-reduced-motion: no-preference)`.

Guardrails enforce this: `pnpm lint` runs oxlint + stylelint
(`stylelint-config-modern` + token validation).

## Browser support policy

- **Baseline Widely or Newly Available** web features are used natively, with no
  fallback and no polyfill (e.g. the `popover` attribute, `@scope`,
  `@starting-style`).
- **Not-yet-Baseline** features may only be adopted as progressive enhancement:
  guarded by `@supports` in CSS or feature detection in JS, with a graceful
  fallback in the same component (e.g. CSS anchor positioning in Popover and
  Tooltip, which fall back to wrapper-anchored positioning).
- **Single ignorable declarations are exempt from the `@supports` rule**: a
  lone declaration that is simply ignored where unsupported (e.g.
  `text-wrap: pretty`, `text-box`) may ship unguarded. The `@supports` gate is
  for multi-declaration behaviour changes, where partial application would be
  wrong.
- **No polyfills, ever** — the library ships zero-runtime static CSS and lean
  components; a browser without a feature gets the fallback behavior, not extra
  JavaScript.
- Check status with the `modern-web-guidance` skill or
  [webstatus.dev](https://webstatus.dev) before adopting a feature.
- **Forced colors is part of done**: any state conveyed by background colour
  needs a `@media (forced-colors: active)` treatment with system colours
  (see Switch/Radio/Menu for the pattern). Verify with headless Chrome's
  `--force-high-contrast` flag; remember the override must come _after_ the
  base rule it replaces (same specificity — order decides).

## Voice standards

**Docs speak in the indicative mood about what the library is.** No
"proposal", "experimental", "for now", no references to internal reviews or
decisions, no migration notes for APIs that never shipped. Uncertainty is
documentable only as platform fact ("Baseline Newly Available since …;
older Firefox renders the neutral default"). Rationale belongs in docs —
confidently ("LoamUI ships no spacer component: `gap` replaced spacers") —
process belongs in DECISIONS.md.

**Docs state facts about the system, never their own virtues.** No
"honestly", "to be transparent", "honest limits", "worth being honest
about" — if a sentence performs a quality instead of stating a fact,
delete the performance and keep the fact. A limitation is documented by
stating it, not by announcing that it is being admitted.

**A code comment earns its place only if it states a constraint or platform
trap the next edit would otherwise violate, in ≤3 lines.** The test: cover
the code, read the comment — if you now know nothing the code wouldn't have
told you, it's noise ("em-based" above `em` values, "flex layout" above
`display: flex`). History
("previously…"), philosophy, citations, and architecture narrative live in
DECISIONS.md and the docs site. JSDoc on exported APIs is API documentation:
keep it, in the same indicative voice.

## Component API conventions

LoamUI follows Base UI's composition model with one shared contract, so a
consumer (or agent) who learns it once knows every component.

**`render` is never required** — with one deliberate exception. Every part
renders a sensible built-in element for its role (`Popover.Trigger` → a
LoamUI Button, `Breadcrumbs.Item` → a link via `href`, `Popover.Close` → a
Button). The `render` prop exists only to _substitute_ that element
(`render={<a href="…" />}`, or a function of the wiring props). If a part's
common case needs `render`, the part has the wrong default element. The
exception is `Field.Control`, whose entire purpose is wiring an arbitrary
element into the field — the LoamUI controls (`Input`, `Select`, `Textarea`,
`Range`) self-wire from Field context when rendered inside `Field.Root`, so
they never go through it.

**One merge contract** (`src/render.ts`, used by every part): event handlers
chain — the element's own handler runs first, wiring second, both always run;
`className`s concatenate; `style` merges with wiring winning on conflicts
(wiring styles such as `anchorName` are load-bearing); `aria-describedby` /
`aria-labelledby` token-lists concatenate; refs compose. Never hand-roll
`cloneElement` prop injection.

**Export shapes** (pick by what the component is):

- Parts only (Popover, Tooltip, Field, Fieldset, Breadcrumbs) → plain object:
  `export const Popover = { Root, Trigger, … }`
- Convenience form + parts (Alert) →
  `Object.assign(Convenience, { Root, … })` so both `<Alert title=…>` and
  `<Alert.Root>` work
- Form controls → bare controls that self-wire from Field context via
  `useFieldControlProps()` (`Input`, `Select`, `Textarea`, `Range`): no
  label/description/error props — composition inside `Field.Root` supplies
  them. Inline controls whose anatomy is a row (Checkbox, Switch, Radio)
  keep the labelled convenience form plus a bare `XControl` part

RSC note: `@loamui/core` ships as a single bundle with a `"use client"`
banner, so in React Server Components **every** compound export is a client
reference — dot access like `Popover.Root` or `Breadcrumbs.Item` is
`undefined` in a server module, regardless of what the source file declares.
Any JSX that uses compound parts (docs demos included) must live in a
`*.client.tsx` file; callable convenience forms (`<Alert title=…>`,
`<Button>`) work from server modules.

**State attributes** — the shared styling vocabulary, identical on every
component (never invent synonyms):

| Attribute                     | Where                                            | Meaning                                                                                                 |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `data-popup-open`             | trigger                                          | its popup/bubble is open                                                                                |
| `data-open`                   | popup/panel                                      | open — uniform across enhanced & fallback                                                               |
| `data-disabled`               | wrapper/control                                  | disabled styling hook                                                                                   |
| `data-current`                | nav item                                         | current page/location                                                                                   |
| `data-size` / `data-position` | some display components (Badge, Progress, Modal) | instance styling hooks read by the stylesheet — form controls have no size hooks: their sizing is fluid |

Components built on native state use the platform's hook instead (e.g.
Details styles `details[open]`). **Prefer detection over declaration**:
when the DOM already expresses a state, style it with `:has()` / ARIA
selectors instead of minting an attribute. Field error state is the model —
a field is invalid exactly when it contains a rendered error message
(`.loam-Field:has(> p.error)`), and controls key off their own
`[aria-invalid="true"]`; there are no `invalid` props and no `data-invalid`
attributes.

**Contextual channels** — orthogonal ways a region influences the
components inside it; never blur them:

- **Contexts** (`--loam-context: primary | danger | success | warning | info`)
  — what the region _means_. A registered, inherited custom property declared
  on any element (style attribute or the region's own CSS) and read via
  container style queries (`@container (style(--loam-context: danger))`) in
  the Contexts section of `tokens.css` and in component files. **Never a data
  attribute.** Contexts remap **only** colour tokens: never spacing, sizing,
  or layout. Components contain no context code; the nearest ancestor that
  sets the property wins because the property inherits. Status components
  (Alert, Badge, Loader, Progress) have no variant or colour props — they
  consume the same context, typically as a one-element region declared on
  the component itself.
- **Layout** — how the region _arranges_ its contents. There is no layout
  attribute or hint: a grid or stacked-flex region stretches its buttons to
  full width natively, so arrangement is declared as actual layout.
- **Containers** (`container-type: inline-size`) — how _big_ the region is;
  drives the fluid `cqi` tokens and Button's narrow-container full-width
  behaviour.

**The control alignment contract**: buttons and form controls share one
derived anatomy — `padding-block: var(--loam-space-sm)` +
`font-size: var(--loam-text-sm)` × `line-height: 1.2` + 1px borders — so they
height-align by construction at every container width. There are no
control-height tokens and no size props on form controls; a control that
must match this height adopts the same stack (see Pagination, Newsletter).
Glyph controls (Checkbox, Radio, Switch, Range) size their geometry in `em`
on a `font-size: var(--loam-text-sm)` basis, so glyphs ride the same fluid
scale as their labels.

## Adding or changing a component

1. Style with the `--loam-*` design tokens only (see `packages/core/src/styles.css`).
2. Use semantic HTML, logical properties, and modern CSS per the standard above.
   No CSS-in-JS.
3. Keep everything accessible: correct roles, keyboard support, focus-visible rings.
4. Add or update the component's docs entry in `apps/docs/src/content/components/`.

## Before opening a PR

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm lint:md
pnpm format
```

All five should pass cleanly. Please use
[Conventional Commits](https://www.conventionalcommits.org/) for commit messages
(`feat:`, `fix:`, `docs:`, `refactor:`, …).

- `pnpm --filter @loamui/core test` runs the a11y and interaction suites.
- `pnpm lint:md` runs the rumdl Markdown linter over the hand-authored docs.

## References

The reading behind the conventions in this guide, grouped by topic. Reach for
these when a change touches an area you have not worked in before.

**Primitives (the library's shape).** The framing of a small set of primitives
that agents compose into bespoke UI:

- [JavaScript frameworks heading into 2026](https://dev.to/playfulprogramming/javascript-frameworks-heading-into-2026-2hel)

**Contextual design.** How a region declares meaning and components adapt,
built on container queries and modern colour:

- [Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) and [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- Brand-on-interaction: [moderncss.ai](https://moderncss.ai/) and [npmx.dev](https://npmx.dev/)

**CSS layout modules.** Pick the module by the shape of the content, per the
[Layout guide](./apps/docs/src/app/docs/layout/page.mdx):

- [A guide to CSS layout](https://www.smashingmagazine.com/2018/05/guide-css-layout/)
- [Flow](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Flow_layout), [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout), [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout), [Multi-column](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout/Basic_concepts)

**Rhythmic and fluid type scales.** How the type scale is tuned per container:

- [Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/)
- [Utopia](https://utopia.fyi/)

**Design safety.** Small, checkable rules that keep visuals honest:

- [Safe design rules](https://anthonyhobday.com/sideprojects/saferules/)

## Releasing

Publishing is automated: pushing a `v*` tag runs the release workflow, which
builds and publishes `@loamui/core` to npm. Maintainers only.

By contributing you agree that your contributions are licensed under the
project's [MIT License](./LICENSE).
