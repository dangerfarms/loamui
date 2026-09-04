# LoamUI

**Modern UI primitives for agent-assisted developers.** Contextual tokens,
element styles and React components, built on Google's Modern Web Guidelines
for quickly building bespoke UIs that are accessible, adaptable and fast.

[![npm](https://img.shields.io/npm/v/@loamui/core.svg)](https://www.npmjs.com/package/@loamui/core)
[![license](https://img.shields.io/npm/l/@loamui/core.svg)](./LICENSE)

## Why LoamUI?

Agent-assisted developers want solid primitives their agents can build bespoke
components and interfaces from, not hundreds of pre-made components locked
into last decade's paradigms. LoamUI offers three primitives, each following
the Chrome team's guidance for the modern web and steeped in UX best
practices:

- **Tokens.** A handful of semantic decisions (four hues, eight neutrals,
  fluid scales); everything else is derived by recipe and audited in CI.
- **Element styles.** Enhanced default styles for native HTML, page-wide:
  responsive, accessible, and respecting the reader's light or dark
  preference. Plain markup is presentable before any component appears.
- **Components.** A small set of carefully chosen, contextually styled
  components. No size, variant or colour props: a region declares what it
  means (`--loam-context`) and everything inside adapts.

All of it is plain, static CSS (cascade layers, `@scope`, `light-dark()`,
container queries, anchor positioning), so no styling runtime ships to your
users: the components are ordinary React, and the stylesheet is one file.

## Philosophy

Five ideas hold the library together. Each is grounded in a reference and
enforced somewhere (by the cascade, a lint rule, a CI gate, or review), not
just asserted.

1. **Native CSS.** Real HTML elements carry the semantics; native CSS carries
   the styling. A button is a `<button>`, a dialog is a `<dialog>` opened with
   `showModal()`. It is plain, static CSS: nothing runs at runtime, no
   CSS-in-JS, no styling engine. Grounded in [Google Chrome's Modern Web
   Guidance](https://github.com/GoogleChrome/modern-web-guidance).
2. **Modern CSS.** `@layer` for order, `@scope` for encapsulation, `light-dark()`
   and container queries for adaptation: additive styles that lean on the
   cascade instead of fighting it. No BEM, no specificity battles. The
   [ModernCSS](https://moderncss.ai/) rule set.
3. **Composition.** Parts, not prop soup. A modal is assembled from its own
   named parts (`Modal.Root`, `Modal.Trigger`, `Modal.Popup`) that you arrange
   in your markup, rather than one component configured through a wall of props.
   You swap the rendered element through a `render` prop, and icons and loaders
   are ordinary children the component detects. The structure stays where you
   can see it and rearrange it.
4. **Contextualism.** A region declares what it means (`--loam-context` for
   status, a container query for size) and every control inside adapts. This is
   the whole status-and-size API: set once on a region, never repeated as a prop
   on each control.
5. **Accessible & gatekept.** Semantic HTML, managed focus, keyboard support,
   and the reader's colour-scheme and motion preferences as the baseline. The
   palette is contrast-audited in CI, every component has an
   [axe](https://github.com/dequelabs/axe-core) (automated accessibility
   checker) test, and the interactive ones have interaction tests. What a
   tool can verify, a tool verifies.

Each pillar has somewhere to learn it from and a mechanism that keeps it honest:

| Pillar                | Learn more                                                                                                                                      | Enforced by                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Native CSS            | [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) · `modern-web-guidance` skill                                        | A static-CSS build — no styling runtime ships                   |
| Modern CSS            | [ModernCSS](https://moderncss.ai/) · `modern-css` skill                                                                                         | stylelint (nesting, `loam-` class patterns, token validation)   |
| Composition           | [API conventions](./CONTRIBUTING.md#component-api-conventions)                                                                                  | The no-config-props doctrine, checked in review                 |
| Contextualism         | [CSS Day: Contextualism](https://css-day-2026.netlify.app/00.02-contextualism/) · [Contextualism guide](https://loamui.com/docs/contextualism/) | Contrast audit in CI + the no-`size`/`variant`/`color` doctrine |
| Accessible & gatekept | [Accessibility guide](https://loamui.com/docs/accessibility/) · [ARIA APG](https://www.w3.org/WAI/ARIA/apg/)                                    | axe + contrast audit in CI; forced-colors treatment             |

Two of those references are installed as agent skills in this repo,
`modern-web-guidance` (behind _Native CSS_) and `modern-css` (behind _Modern
CSS_), under `.agents/skills/` and pinned by `skills-lock.json`, so an agent
working here inherits them. Composition and Contextualism lean on the guides
above rather than a skill of their own; a dedicated contextualism skill is a
considered next step if those pages prove not enough for agents. The full
reading behind every convention is collected in
[CONTRIBUTING → References](./CONTRIBUTING.md).

## Standards

Conventions the linters can't check, stated with their reasons. The
deterministic layer (stylelint, oxlint, Prettier, the contrast audit, CI) is
the authority for everything it covers: run it and believe it.

- **API.** No `size`, `variant`, `color`, or `fullWidth` props: size comes from
  container-relative tokens and container queries, status colour from a
  `--loam-context` region, width from the parent's layout. A prop would
  re-encode a decision the surrounding design already made. (Display components
  that size an intrinsic glyph (Loader, Badge, Progress) keep `size`; Modal
  sizes to its content, with `--loam-modal-size` as the public override, and
  Drawer's panel width is the public `--loam-drawer-size` property.) A
  component is named for the HTML element it's built on, not a design-system
  alias: `Range` (`<input type="range">`), not `Slider`; `Details`
  (`<details>`), not `Accordion`.
- **Scope.** The library holds low-level primitives; a component that would need
  per-project structural overrides to be reused is a downstream recipe, not a
  core primitive. Token overrides are the sanctioned theming surface; overriding
  spacing, layout or structure is the smell that says a component is too
  specific to live here.
- **Composition.** Compound components expose parts; element swap goes through
  `render`; icons and loaders are detected children, never slot props. Bare form
  controls (Input, Select, Textarea, Range) self-wire from `Field`;
  Checkbox / Radio / Switch keep an inline label because the control lives
  inside it.
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

```bash
npm install @loamui/core
```

Import the stylesheet once at your app root, then use any component:

```tsx
import "@loamui/core/styles.css";
import { Button } from "@loamui/core";

export default function App() {
  return <Button>Get started</Button>;
}
```

That's the whole setup: no provider, no config. See the
[documentation](https://loamui.com/) for every component, live examples and the
theming guide.

## Repository layout

This is a pnpm + Turborepo monorepo:

- [`packages/core`](./packages/core): `@loamui/core`, the component library.
- [`apps/docs`](./apps/docs): the marketing site and documentation (Next.js).

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

## Using LoamUI with an agent

The documentation is written to be read by agents as well as people:

- [`https://loamui.com/llms.txt`](https://loamui.com/llms.txt) indexes every
  page, and every page has a markdown twin at the same URL with `.md` appended
  (`/docs/contextualism` → `/docs/contextualism.md`).
- The [Composing components](https://loamui.com/docs/composing/) guide shows
  how to build your own components (a hero, a pricing table, a carousel) from
  the three primitives without adding anything to the library.
- The package ships `AGENTS.md`, a one-page summary of the conventions an
  agent needs when writing against `@loamui/core`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

[MIT](./LICENSE) © Danger Farms

## Requirements

- React 19.
- The package is ESM-only; there is no CommonJS build.
- Styling targets Baseline Newly Available CSS with graceful degradation;
  the full browser-support policy is in [CONTRIBUTING](CONTRIBUTING.md).
