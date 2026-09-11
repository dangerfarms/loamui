---
name: loamui
description: How to build UI with @loamui/core — LoamUI's contextual tokens, element styles and React components on native modern CSS. Use this skill whenever a project depends on @loamui/core, or the user asks to build, style, theme, or review UI with LoamUI, asks about its components, tokens, contextualism, or accessibility, or asks how to do something "in LoamUI". It explains the three primitives and five pillars, points to the authoritative docs (llms.txt and per-page .md twins, mirrored offline in references/), and lists the mistakes people make by default.
metadata:
  library: "@loamui/core"
  docs: https://loamui.com
  llms: https://loamui.com/llms.txt
---

# Using LoamUI

> Modern UI primitives for agent-assisted developers. A region declares what
> it means and the components inside adapt; you compose parts rather than
> configure props. Reach for a prop only when nothing else can express it.

## Where the truth lives

- **Live docs:** <https://loamui.com>. Every page has a markdown twin at the
  same URL with `.md` appended (`/docs/components/button` →
  `/docs/components/button.md`). Index: <https://loamui.com/llms.txt>; all
  pages in one file: <https://loamui.com/llms-full.txt>.
- **Offline copies** of those twins ship with this skill, generated from the
  docs source so they match the site: start at
  [`references/index.md`](references/index.md), then
  `references/guides/*.md` and `references/components/*.md`.
- **Read a component's reference before using it** if you have not read it in
  this session. Props, parts, custom properties, when-to-use and the
  accessibility contract live there, not here.
- The references match the library at the same commit; check the installed
  version in `node_modules/@loamui/core/package.json` if behaviour differs.
- **Recipes:** the curated `/recipes` collection contains portable React and CSS
  with design decisions. Find the relevant entry in [the reference
  index](references/index.md);
  only published recipes ship under `references/recipes/`. Choose by the user's
  purpose and the recipe's **When to use** guidance, then read the recipe and
  [composing guide](references/guides/composing.md). The sections are Heroes,
  Banners, Cards, Media, Grids, Content and Forms.
  A hero introduces a page; a banner promotes one message within it;
  a card represents one item.
  Gallery card browses photos of one item; Article carousel browses several
  items. Match that role before adapting the appearance.

## The three primitives

1. **Tokens** (`--loam-*`): a handful of semantic decisions — four status hues,
   a primary, an accent, eight neutrals, fluid space and type scales — with
   everything else derived by recipe. Theming is overriding these.
2. **Element styles**: enhanced defaults for native HTML, page-wide. Plain
   `<h1>`, `<p>`, `<a>`, `<table>`, `<input>` are already styled, responsive,
   and light/dark aware before any component appears.
3. **Components**: a small, curated set composed from the two above. Compound
   components expose parts; appearance normally comes from regions, not props.
   Check component references for the documented exceptions below.

## The five pillars, as rules

1. **Native CSS.** Use real elements for semantics and static CSS for styling.
   Native controls supply platform behaviour; preserve their labels and
   keyboard support. No CSS-in-JS or styling runtime.
2. **Modern CSS.** Use scoped, additive rules, logical properties and the
   library’s responsive tokens. Choose modern features for the problem at
   hand; they are tools, not a feature checklist. No `!important`, BEM or
   specificity battles. Follow the host’s cascade-layer arrangement.
3. **Composition.** Assemble named parts and use `render` when changing the
   element. Button icons and loaders are children; Input instead documents
   `startSection` and `endSection`. Read each component’s actual contract.
4. **Contextualism.** Declare `--loam-context` on the region with that meaning;
   size follows the available space. Do not invent appearance props. Intrinsic
   display sizes and native HTML attributes are documented exceptions.
5. **Accessible & gatekept.** Keep semantic HTML, named controls, keyboard and
   focus support, and user preferences. Never remove focus rings or convey
   state only by colour. Core’s automated tests and audited palette do not
   certify your composition, content or custom theme; verify them separately.

## Components

| Category     | Components                                                                                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inputs       | Field, Fieldset, ErrorSummary, Button, Input, Textarea, Select, DateInput, Checkbox, Radio, Switch, Range, Search, QuantityInput, Rating, FileInput, CopyButton, Combobox, PasswordInput, SegmentedControl |
| Data display | Badge, Price, Time, Card, Avatar, Table, Separator, Carousel, Stepper                                                                                                                                      |
| Feedback     | Alert, Progress, Meter, Skeleton, Loader, Toast                                                                                                                                                            |
| Disclosures  | Details, Tooltip, Modal, Drawer, Popover, Menu                                                                                                                                                             |
| Navigation   | Tabs, SignpostLink, SkipLink, Breadcrumbs, Pagination, Nav                                                                                                                                                 |

No layout components (use native grid, flex or flow with the space tokens), no
`Heading`/`Text` (a semantic element plus a scoped rule), no `Accordion`
(that is `Details`), no `Slider` (that is `Range`).

## How to build with it

1. **Install and import once.** `pnpm add @loamui/core`, then
   `import "@loamui/core/styles.css"` at the app root. React 19, ESM only, no
   provider. **Next.js:** its CSS pipeline cannot parse the stylesheet — serve
   it as a static file instead (see `references/guides/installation.md`).
2. **Read before composing.** Check the installed package version and read
   [the composing guide](references/guides/composing.md), the nearest published
   recipe, and each component reference you will use. Prefer installed types
   when
   a reference describes a different version. For platform features, consult
   [Google Chrome’s
   guidance](https://github.com/GoogleChrome/modern-web-guidance);
   use its search/retrieve tool if available, otherwise read the relevant
   official
   guide. LoamUI uses Baseline Newly/Widely Available features natively, with
   progressive enhancement for features outside Baseline.
3. **Compose.** Parts inside a `Root`; bare form controls (`Input`, `Select`,
   `Textarea`, `Range`, `QuantityInput`, `FileInput.Control`, `Search.Input`)
   inside `Field.Root` wire their label, description, error, and `aria-*`
   automatically. `Checkbox`, `Radio`, `Switch` take an inline `label`;
   errors still go through `Field.Error`.
4. **Declare context, don't configure.** Wrap a region:
   `<div style={{ "--loam-context": "danger" }}>…</div>` — buttons, inputs,
   badges and checkboxes inside all adapt. Only reach for identity when it is
   genuinely identity (a brand-coloured wrapper), never per element.
5. **Lay out with native CSS.** Grid, flex, flow, or multi-column per the
   content's shape; space with `var(--loam-space-*)`; cap prose at
   `var(--loam-measure)`.
6. **Theme with tokens.** Override `--loam-*` at `:root` or on any scope;
   never touch a component's internals or its private `--_*` properties.
   A recipe may own private properties for its own state or geometry, such as
   the image comparison’s reveal position; these are not core theming hooks.
7. **Verify and repair.** Run the consuming project’s formatter, type checker,
   lint and relevant interaction tests. Render outside the docs site, in narrow
   and wide parents and with two instances. Check keyboard and focus, long copy,
   both schemes, reduced motion and forced colours; check RTL for directional
   interactions. Fix failures and repeat affected checks. Report what actually
   ran and what remains unverified; never award blanket pillar or accessibility
   conformance from imports, screenshots or an axe pass alone.
8. **Keep the deliverable portable.** Supply React and CSS plus explicit
   application integration needs. Exclude catalog metadata, preview frames,
   gallery loading and docs-only utilities. Keep real actions functional; use
   links for destinations. Do not imply a local demo persists to an account.

## Theming

Set the inputs; everything derived follows.

```css
:root {
  --loam-color-primary: oklch(45% 0.12 250);
  --loam-color-accent: oklch(70% 0.18 305);
  --loam-font: "Inter", system-ui, sans-serif;
  --loam-font-display: "Fraunces", serif;
  --loam-radius-md: 0.5rem;
}
```

Key public tokens: `--loam-color-{primary,accent,success,warning,danger,info}`
(each with `-soft`, `-strong`, `-ring` derivations and `--loam-color-on-strong`
for text on a strong fill), `--loam-color-{fg,fg-muted,fg-dim,bg,bg-subtle,
surface,surface-hover,line,line-strong,link,highlight}`,
`--loam-space-{xs..xl}`,
`--loam-radius-{sm..xl,full}`, `--loam-shadow-{sm,md,lg}`,
`--loam-duration-{sm,md,lg}`, `--loam-ease`, `--loam-measure`. Full list and
recipes: `references/guides/tokens.md`.

Component-level hooks are public custom properties documented per component
(e.g. `--loam-button-color`, `--loam-modal-size`, `--loam-drawer-size`,
`--loam-loader-size`), set where the component is used.

## Mistakes people make by default

Each of these has been seen in real migrations. Check your output against them.

- **Looking for `size` / `variant` / `color` props.** Do not invent them. Colour
  is a context region; size is the container; width is the parent's layout.
  Modal and Drawer width: `--loam-modal-size` / `--loam-drawer-size`. The
  exceptions are a glyph or track (`Badge`, `Loader`, `Progress`, `Meter`
  keep `size`), Input’s native HTML `size`, and the platform's own numbers
  (`Meter` bounds,
  `QuantityInput` `min`/`max`/`step`), which are semantics, not sizing.
- **`type="number"` for a count.** A count nudged by one is `QuantityInput`;
  any other number is `Input` with `inputMode="numeric"` or `"decimal"`.
- **Borrowing `loam-*` classes on raw elements** (`<a class="loam-Button">`,
  `<details class="loam-Details">`). Class names are not API. Use the
  component; it carries wiring and tests the class does not.
- **A link dressed as a button.** `Button` is for actions. Navigation that
  wants prominence is `SignpostLink`; ordinary navigation is `<a>`.
- **Duplicating Field wiring.** Let `Field.Root` supply its control’s label,
  description and error by default. Use explicit IDs or additional descriptions
  only for a real relationship, and verify the combined references. Use `useId`
  for repeated recipes, including native disclosure and radio group names.
- **Required asterisks.** Required is the unmarked default; mark the optional
  field in words with `<Field.Label optional>`.
- **Error copy like "This field is required" or "Please enter a valid…".**
  Say what happened and how to fix it, in the words of the question:
  "Enter your email address", "Select a country". No "please", "invalid",
  "required", or error codes.
- **Treating all components as the same API.** Button icons are children;
  Input uses `startSection` / `endSection` for adornments. Read the reference.
- **Reset-then-restyle.** Do not add a CSS reset or zero every margin — the
  element styles are the baseline. Build on them.
- **`!important`, BEM, physical properties, viewport units for sizing.** The
  library uses none; neither should styles around it.
- **Importing the stylesheet through a bundler that cannot parse it** (Next.js
  today). Serve it statically; see the installation guide.
- **A `Heading` or `Text` component.** Typography is domain-specific:
  `@scope (h1.headline) { :scope { font-family: var(--loam-font-display) } }`.

## Worked references

- A composed sign-in form, install to first component:
  `references/guides/installation.md`.
- Regions, identity, and the size of the space:
  `references/guides/contextualism.md`.
- Tokens, derivation, and dark mode: `references/guides/tokens.md`.
- Every component's usage, parts, props, custom properties, when-to-use and
  accessibility notes: `references/components/<slug>.md`.

For responsive composition, keep the measuring container outside the element
whose layout changes; name queries that must measure a particular recipe region.
Protect embedded core roots with `@scope (.recipe) to ([class*="loam-"])`.
Tokens express design decisions; structural dimensions, aspect ratios and zero
values remain ordinary CSS. A recipe built only from native elements and tokens
is valid: do not add imports or status regions just to demonstrate every
primitive.
