# Changelog

Notable changes to `@loamui/core`. Dates are the day the change landed on
`main`. While the version is below 1.0, any release may break: the scale, the
token names and the context mechanism are still settling.

## 0.1.1 — 2026-09-18

### Changed

- Reworked the package and repository READMEs to explain LoamUI's three
  primitives, Modern and Accessible pillars, contextual styling and agent
  workflow.
- Clarified npm installation, React and ESM requirements, and stylesheet
  delivery, with a typed usage example.

This release changes documentation only; component APIs and styles are unchanged.

## 0.1.0

### Changed — breaking

- **The spacing scale is renamed onto an `s`/`m`/`l` ladder, and gains a step at
  1.25rem.** The old t-shirt names had no room between `lg` (1rem) and `xl`
  (1.5rem), which is where designs keep reaching — 1.25rem was hand-typed 10
  times in the docs site alone. The ladder now matches the one used in
  production elsewhere, so the same word means the same size across codebases.

  | was                | is                 | value         |
  | ------------------ | ------------------ | ------------- |
  | `--loam-space-2xs` | `--loam-space-4xs` | 0.125rem      |
  | `--loam-space-xs`  | `--loam-space-3xs` | 0.25rem       |
  | `--loam-space-sm`  | `--loam-space-2xs` | 0.5rem        |
  | `--loam-space-md`  | `--loam-space-xs`  | 0.75rem       |
  | `--loam-space-lg`  | `--loam-space-s`   | 1rem          |
  | —                  | `--loam-space-m`   | 1.25rem (new) |
  | `--loam-space-xl`  | `--loam-space-l`   | 1.5rem        |
  | `--loam-space-2xl` | `--loam-space-xl`  | 2rem          |
  | `--loam-space-3xl` | `--loam-space-2xl` | 3rem          |
  | `--loam-space-4xl` | `--loam-space-3xl` | 4rem          |
  | `--loam-space-5xl` | `--loam-space-4xl` | 6rem          |

  _Migrating:_ the names shift by one rung, so rename in a single pass rather
  than one at a time — `sm` becomes `2xs` while the old `2xs` becomes `4xs`, and
  a sequential find-and-replace will corrupt them.

### Removed

- **The per-status `-ring` token family.** `--loam-color-primary-ring`,
  `-success-ring`, `-danger-ring`, `-warning-ring` and `-info-ring` are gone.
  Each was a pure alias of its `-strong` sibling with no transformation, and
  `--loam-color-primary-ring` was written in five context blocks and read
  nowhere. `--loam-color-ring` remains, and now resolves to the current
  status's `-strong` fill directly.

  _Migrating:_ replace `--loam-color-X-ring` with `--loam-color-X-strong`. The
  resolved colour is identical, so nothing changes visually.

### Changed

- **A context region now reaches every element inside it.** The remap was gated
  on `:where([class*="loam-"], [class*="loam-"] *)`, so only LoamUI-classed
  elements and their descendants answered `--loam-context`. It is now
  `:where(*)`.

  _Why:_ contextualism is a property of all three primitives, not a feature of
  the components. A native control's `accent-color`, and a consumer's own rule
  reading `--loam-color-primary`, now answer the region they sit in.

  _Migrating:_ a consumer rule that reads a `--loam-color-*` token inside a
  context region will now take that region's colour. That is the intent; if a
  rule must stay fixed, read a status token by name
  (`--loam-color-info`) rather than the remapped `--loam-color-primary`.

- **`.loam-VisuallyHidden` moved from the `loamui.elements` layer to
  `loamui.components`**, alongside the new component below. The class name and
  its declarations are unchanged, and it is still usable directly as a
  `className` wherever you cannot wrap the text in a component.

- **Registered channels (`@property`) moved from `elements.css` to
  `tokens.css`.** They are token declarations, so they live with the tokens. No
  behaviour change.

### Added

- **`VisuallyHidden`** — text for assistive technology alone, as a component
  rather than a loose class in the default element styles. Renders a `<span>`;
  `render` swaps the element where the slot needs a particular one.

- **Five spacing steps.** `--loam-space-2xs` (0.125rem) below the scale, and
  `--loam-space-2xl` (2rem), `-3xl` (3rem), `-4xl` (4rem), `-5xl` (6rem) above
  it. All sit on the existing curve: 12.5% growth from a 20rem container to a
  77.5rem one, measured in `cqi` so they answer the container rather than the
  viewport.

- **A fixed spacing ramp.** `--loam-space-fixed-1` through `-32`, in `px`, for
  the things that must not breathe: a hairline, a ring inset, the gap beside an
  icon. Reach for the fluid scale first.

### Fixed

- **A corner artifact on `Input` and `Textarea`.** The element styles give every
  text control `radius-md`, and the wrapper removed the control's border but not
  its radius, so the control's curve sat a border-width proud of the wrapper's
  inner curve. Invisible while the control was transparent, but the autofilled
  tint painted to that shape and showed a sliver at each corner — which is why
  it surfaced on email fields, the ones browsers autofill.
