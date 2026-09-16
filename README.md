# LoamUI

**Modern UI primitives for agent-assisted developers.** Contextual tokens,
element styles and React components, built on Google's Modern Web Guidelines
for quickly building bespoke UIs that are accessible, adaptable and fast.

[![npm](https://img.shields.io/npm/v/@loamui/core.svg)](https://www.npmjs.com/package/@loamui/core)
[![license](https://img.shields.io/npm/l/@loamui/core.svg)](./LICENSE)

## Why LoamUI?

LoamUI provides three primitives and an agent skill for building interfaces
for your product. The primitives follow the Chrome team's guidance for the
modern web and established accessibility and UX practices:

- **Tokens.** A handful of semantic decisions (four hues, eight neutrals,
  fluid scales); everything else is derived by recipe and audited in CI.
- **Element styles.** Enhanced default styles for native HTML, page-wide:
  responsive, accessible, and respecting the reader's light or dark
  preference. Plain markup is presentable before any component appears.
- **Components.** A small set of composable React components. A region declares
  what it means (`--loam-context`), and its contents adapt through the tokens.
  Component references document their APIs, including the intrinsic sizing
  exceptions described in Standards below.

All of it is plain, static CSS (cascade layers, `@scope`, `light-dark()`,
container queries, anchor positioning), so no styling runtime ships to your
users: the components are ordinary React, and the stylesheet is one file.

## Philosophy

Two ideas hold the library together. Each is grounded in a reference and
enforced somewhere (by the cascade, a lint rule, a CI gate, or review), not
just asserted.

1. **Modern.** Real HTML elements carry the semantics; native CSS carries the
   styling. A button is a `<button>`, a dialog is a `<dialog>` opened with
   `showModal()`. Static CSS supplies the styling without a JavaScript styling
   runtime. Grounded in [Google Chrome's
   Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance).

   On top of that sits modern CSS itself: `@layer` for order, `@scope` for
   encapsulation, `light-dark()` and container queries for adaptation. These
   are additive styles that lean on the cascade instead of fighting it, with no
   BEM and no specificity battles, following the
   [ModernCSS](https://moderncss.ai/) rule set.

   Underneath both runs
   [contextualism](https://css-day-2026.netlify.app/00.02-contextualism/), the
   paradigm shift. A region declares what it means (`--loam-context` for
   status, a container query for size) and the tokens, element styles and
   components inside all adapt. That is the whole status-and-size API: set once
   on a region, never repeated as a prop on each control.

2. **Accessible.** Semantic HTML, managed focus, keyboard support, and the
   reader's colour-scheme and motion preferences as the baseline, distilled
   from long-established public practice and running through all three
   primitives. The palette is contrast-audited in CI, every component has an
   [axe](https://github.com/dequelabs/axe-core) (automated accessibility
   checker) test, and the interactive ones have interaction tests. What a
   tool can verify, a tool verifies.

Composition is not a pillar — tokens and element styles have nothing to
compose — but it is how the components are used. Parts, not prop soup: a modal
is assembled from its own named parts (`Modal.Root`, `Modal.Trigger`,
`Modal.Popup`) that you arrange in your markup, rather than one component
configured through a wall of props. You swap the rendered element through a
`render` prop, and icons and loaders are ordinary children the component
detects. The structure stays where you can see it and rearrange it.

## Standards

Conventions the linters can't check, stated with their reasons. The
deterministic layer (stylelint, oxlint, oxfmt, the contrast audit, CI) is
the authority for everything it covers: run it and believe it.

- **API.** No `size`, `variant`, `color`, or `fullWidth` props: size comes from
  container-relative tokens and container queries, status colour from a
  `--loam-context` region, width from the parent's layout. A prop would
  re-encode a decision the surrounding design already made. (Display components
  that size an intrinsic glyph or track (Loader, Badge, Progress, Meter) keep
  `size`; Modal sizes to its content, with `--loam-modal-size` as the public
  override, and Drawer's panel width is the public `--loam-drawer-size`
  property. Numeric bounds are not size props: Meter's
  `min`/`max`/`low`/`high`/`optimum` and QuantityInput's `min`/`max`/`step` are
  the platform's own semantics, forwarded as attributes.) A
  component is named for the HTML element it's built on, not a design-system
  alias: `Range` (`<input type="range">`), not `Slider`; `Details`
  (`<details>`), not `Accordion`.
- **Scope.** The library holds low-level primitives; a component that would need
  per-project structural overrides to be reused is a downstream recipe, not a
  core primitive. Token overrides are the sanctioned theming surface; overriding
  spacing, layout or structure is the smell that says a component is too
  specific to live here. Larger sections live as worked recipes on the docs
  site: product-specific compositions to study and adapt, built on core the
  way any consumer would, and held to the same pillars and gates.
- **Composition.** Compound components expose parts; element swap goes through
  `render`; Button icons and loaders are children. Input's documented
  `startSection` and `endSection` props supply adornments inside its field box.
  Bare form
  controls (Input, Select, Textarea, Range, QuantityInput, `FileInput.Control`,
  `Search.Input`) self-wire from `Field`; Checkbox / Radio / Switch keep an
  inline label because the control lives inside it.
- **CSS.** Selectors are `@scope`d, not BEM: one `loam-` class per root, parts
  by element type or short class. A scope that hosts foreign content is fenced
  with a donut (`to ([class*="loam-"])`). Refer to elements directly, with no
  `:where()` to name a part. `--_name` is private, `--loam-name` is public.
  No `!important`, ever: stylelint bans it, and everything wins through
  layers. Follow the `modern-css` skill for authoring.
- **Colour & motion.** All colour is `oklch()` / `light-dark()` / `color-mix()`.
  Every token pair is contrast-audited in CI (4.5:1 text, 3:1 non-text, both
  schemes); contexted checked and filled controls use the `-strong` family so
  they hold contrast in every context. Motion is opt-in via
  `prefers-reduced-motion: no-preference`; state carried by background paint
  gets a `forced-colors` treatment in system colours.
- **React.** React 19 only. `ref` is an ordinary prop (declared last); no
  `forwardRef`. Context renders as `<Context value>`. Effects synchronise with
  external systems only.
- **Documentation.** Every component earns more than a name and a code sample:
  when to use it, when _not_ to, and the reasoning behind its defaults, the UX
  judgment distilled from long-established accessibility and design-system
  practice, written as _why_, not just _what_. This guidance is the library's
  differentiator, so it ships with the component, not as an afterthought. A
  demo's code tab shows exactly what its preview renders, and a demo proves the
  claim in its description.
- **Voice.** Error messages say what happened and how to fix it, in the words of
  the question ("Enter your first name"), never "invalid", "required", or an
  error code. Prose speaks on the library's own authority: normative references
  (WCAG, ARIA APG, Baseline) are welcome; external design-system names and
  unmeasured claims are not.
- **Verification.** Nothing is done until the full gate suite passes and any
  visual change is confirmed with headless screenshots in both colour schemes.

## Installation

Start with a React framework application. Follow the
[installation guide](https://loamui.com/docs/installation) for **Next.js App Router**
or **TanStack Start**: prepare the app, load LoamUI's three
primitives and verify your first interface before adding the skill.

The public npm release of `@loamui/core` is planned but not yet available.
The guide's package commands apply once it is published. Installing the skill
does not install the library.

## Use it with an AI agent

After completing the application setup, add the skill that teaches agents
the library: the primitives, the
pillars, every component's reference, and the mistakes people make by default:

```bash
npx skills add dangerfarms/loamui
```

Or point an agent at [`https://loamui.com/llms.txt`](https://loamui.com/llms.txt):
the single entry point for the environment workflow and documentation. Every
docs page has a markdown twin at the same URL with `.md` appended. The skill
bundles these references, including complete recipes, for offline use. Recipe
cards also offer a **Copy prompt** action with the selected implementation
and its relevant guidance.
The [example recipes](https://loamui.com/recipes/) show how to build your own
components (a hero, a pricing table, a carousel) from the three primitives,
each opened up with the prompt that made it, and the package ships an
`AGENTS.md`, a one-page summary of the conventions an agent needs when writing
against it.

## Repository layout

This is a pnpm + Turborepo monorepo:

- [`packages/core`](./packages/core): `@loamui/core`, the component library.
- [`apps/docs`](./apps/docs): the marketing site and documentation (Next.js).
- [`apps/docs/src/examples`](./apps/docs/src/examples): the worked recipes
  shown at `/recipes` on the docs site.

## Development

```bash
pnpm install
pnpm build        # build the library, then the docs site
pnpm dev          # run the docs site against the library
pnpm check-types  # type-check everything

pnpm --filter @loamui/core storybook   # component explorer at :6006
```

Storybook is the component workbench: a **Foundations** section documenting the
tokens, element styles, contextualism, layout and accessibility model, plus live
stories for every component with axe and keyboard interaction tests.

Working here with an AI agent? Four skills in `.agents/skills/` turn the
Philosophy and Standards above into procedures: **`add-component`** and
**`component-review`** (adding and reviewing a component), plus the vendored
**`modern-css`** and **`modern-web-guidance`** references. Claude Code loads
them through the `.claude/skills/` symlinks. These are contributor skills for
this repository; they are not installable in a consumer project.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

[MIT](./LICENSE) © Danger Farms

## Requirements

- React 19.
- The package is ESM-only; there is no CommonJS build.
- Styling targets Baseline Newly Available CSS with graceful degradation;
  the full browser-support policy is in [CONTRIBUTING](CONTRIBUTING.md).
