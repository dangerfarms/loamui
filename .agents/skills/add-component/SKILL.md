---
name: add-component
description: The procedure for adding or scaffolding a new LoamUI component so it matches the library's philosophy and passes the gates. Use this skill whenever the user asks to add, create, scaffold, or build a new component in @loamui/core — or to turn a pattern into a reusable part. It covers deciding whether the component should exist at all, which existing component to model, the API and CSS doctrine to hold, the wiring that low-risk additions usually miss, and how "done" is proven.
metadata:
  tags: loamui, component, scaffolding, primitives, composition, contextualism, accessibility, gates
---

# Adding a LoamUI component

> A new component is a promise the library has to keep forever. Earn it:
> argue yourself out of it first, then build it in the library's shape.

**Ground yourself before writing code.** Read the five pillars in
[`README.md`](../../../README.md) — they are the direction for every decision
below — and load two companion skills for the craft:

- **`modern-css`** — for all CSS authoring (`@layer`, `@scope`, `oklch()`,
  `light-dark()`, container queries, fluid `clamp()`). This skill does **not**
  restate those rules; follow `modern-css`.
- **`modern-web-guidance`** — search it first for any UI pattern
  (`npx -y modern-web-guidance@latest search "<query>"`) to check for a
  standardized platform approach before hand-rolling one.

The doctrine below lives in full in [`README.md` → Standards](../../../README.md)
and [`CONTRIBUTING.md`](../../../CONTRIBUTING.md); this skill is the _procedure_
for applying it.

## Step 1 — Should it exist at all?

Work down this ladder and stop at the first rung that answers the need. A new
component is the last resort, not the first.

1. **Is it composition of existing parts?** Then it's a usage example or a
   consumer's wrapper, not a library component.
2. **Is it a native element the element-styles layer already dresses?** Then a
   scoped rule on a semantic element (see the Typography guide's "components are
   yours to name"), not a React wrapper.
3. **Is it a value?** Then a token, not a component.
4. **Does it genuinely need a new primitive** (a token or an element style)?
   That is the highest bar and needs a recorded ruling — components adapt to
   primitives, never the reverse.

Even when the answer is a genuine component, check it belongs in _core_: LoamUI
holds low-level primitives, so a component that would need per-project structural
overrides (spacing, layout, DOM shape) to be reused is a downstream recipe, not a
core primitive. Token overrides are fine — that is theming; structural overrides
are the smell.

Precedents that were deliberately _not_ built (cite them when pushing back):
no spacer (`gap` replaced spacers), no `Heading`/`Text` (typography is
domain-specific and yours to name), no layout components (compose native CSS
modules), and no `size`/`variant`/`color` props anywhere. Name what you do build
for the HTML element it's built on, not a design-system alias — `Range`
(`<input type="range">`), not `Slider`; `Details` (`<details>`), not `Accordion`.

## Step 2 — Read the primitives first

Read `src/tokens.css` and `src/elements.css`. Native controls already wear the
component recipes, so most of a component's styling is inherited — write only
what the platform doesn't give you. If you find yourself re-deriving a value
the tokens already hold, stop.

## Step 3 — Model it on an exemplar

Copy the structure of the closest existing component rather than inventing one:

| Shape                                                   | Model                                |
| ------------------------------------------------------- | ------------------------------------ |
| Bare form control (self-wires from `Field`)             | `Input`, `Select`, `Textarea`        |
| Control with an inline label + a bare `*Control` export | `Checkbox`, `Switch`                 |
| A set participating via context (never `cloneElement`)  | `RadioGroup`+`Radio`, `Tabs`         |
| Compound overlay (Root/Trigger/Popup parts)             | `Modal`, `Popover`, `Menu`, `Drawer` |
| Native disclosure                                       | `Details`                            |
| Display element that keeps `size`                       | `Badge`, `Loader`, `Progress`        |

## Step 4 — Hold the API and CSS doctrine

Non-negotiables (full reasons in the README Standards section):

- **No `size`/`variant`/`color`/`fullWidth` props.** Size comes from container
  queries and fluid tokens; status colour from a `--loam-context` region; width
  from the parent's layout. Exception: display components that size intrinsic
  content keep `size`.
- **Compose, don't configure.** Compound components expose parts; element swap
  goes through the `render` prop; icons and loaders are detected children
  (`:has(svg, .loam-Loader)`), never slot props. Bare form controls self-wire
  from `Field` (no `label`/`error` props); Checkbox/Radio/Switch keep an inline
  label because the control lives inside it.
- **Scope, don't BEM.** One `loam-` class on each scope root; parts are type
  selectors or short classes. **Add the donut** (`@scope (root) to
([class*="loam-"])`) whenever the scope hosts foreign content (children, a
  composed icon, a nested component) — a bare descendant type selector without
  it leaks into what it hosts. Target elements directly; never `:where()` to
  name a part.
- **Custom properties:** `--_name` is private to the component; `--loam-name` is
  public API (promote with an inherited fallback). Never set another
  component's `--_`.
- **The re-answer trap:** if the component reads `--loam-context`, re-answer
  _every_ derived token it needs (rings, `-strong` fills) inside each context
  block — a token derived at `:root` bakes in the root value. Checked/filled
  controls use the `-strong` family so they hold 3:1 in every context.
- Colour is `oklch()`/`light-dark()`/`color-mix()`; motion is opt-in via
  `@media (prefers-reduced-motion: no-preference)`; state carried by background
  paint gets a `@media (forced-colors: active)` treatment in system colours.
- **React 19:** `ref` is a normal prop declared last; no `forwardRef`; render
  context as `<Context value>`; effects only synchronise with external systems.

## Step 5 — The wiring checklist (where additions actually break)

The CSS and TSX are the easy part; these are the steps low-risk additions miss:

- [ ] Export the component (and any `*Control`) from `src/index.ts`.
- [ ] Add the component's `@import` (with `layer()`) to `src/styles.css` — this
      is what loads it in Storybook/dev **and** what `scripts/build-css.mjs`
      scans (it warns if the import is missing).
- [ ] The component `.css` declares **no `@layer`** (the build assigns it, and
      throws if the file declares one).
- [ ] `<Name>.stories.tsx` — `tags: ["autodocs"]`, a meta `description`, and a
      `play`/interaction test; single-concept demos.
- [ ] A docs content file — registered in the registry and `site/nav.ts` (right
      category), with code-tab ↔ preview parity — carrying real UX guidance: when
      to use the component, when _not_ to, and the reasoning behind its defaults.
      Distil that from long-established practice (GOV.UK, Polaris) but state it on
      the library's own authority; the guidance _is_ the differentiator, not
      filler, and the prose never names those sources.
- [ ] If it introduces a new colour pairing, add a check to
      `scripts/contrast-audit.mjs`.

## Step 6 — Done means gates + eyes

Run the full suite and believe it, then verify what no tool can:

```
pnpm -r lint · pnpm lint:md · pnpm -r exec tsc --noEmit
pnpm --filter @loamui/core test · pnpm format:check
pnpm --filter @loamui/core audit:contrast
pnpm --filter @loamui/core build-storybook · PAGES=true pnpm -r build
```

(`pnpm lint:md` is a root script — `-r lint` does not include it.)

- Screenshot the component in **both** colour schemes; add a contexted-region
  shot for anything that claims to adapt. Claims about rendered output are
  falsifiable — falsify them.
- **The docs serve a synced static copy of the library CSS.** While `pnpm dev`
  runs, watchers keep it fresh (`build-css --watch` → `sync-css --watch`); if dev
  isn't running, rebuild core (`pnpm --filter @loamui/core build`) before judging
  docs output, or a stale copy will hide your change.
- Call out any new convention or ruling — and anything that needs maintainer
  sign-off — in your PR description, with the reasoning behind it.
