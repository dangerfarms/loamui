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

## The three primitives

1. **Tokens** (`--loam-*`): a handful of semantic decisions — four status hues,
   a primary, an accent, eight neutrals, fluid space and type scales — with
   everything else derived by recipe. Theming is overriding these.
2. **Element styles**: enhanced defaults for native HTML, page-wide. Plain
   `<h1>`, `<p>`, `<a>`, `<table>`, `<input>` are already styled, responsive,
   and light/dark aware before any component appears.
3. **Components**: a small, curated set composed from the two above. Compound
   components expose parts; there are no `size`, `variant`, or `color` props.

## The five pillars, as rules

1. **Native CSS.** Rule: real elements carry semantics (`<button>`, `<dialog>`
   via `showModal()`, `<details>`), native CSS carries styling. Constraint: no
   CSS-in-JS, no styling runtime, no wrapper divs that fake an element.
   Rationale: the platform's behaviour and accessibility come free and stay
   correct.
2. **Modern CSS.** Rule: style with `@layer`, `@scope`, `light-dark()`,
   `oklch()`, container queries, logical properties, fluid `clamp()`.
   Constraint: never `!important`, no BEM, no physical properties
   (`width`, `margin-left`). Rationale: the cascade does the work; overrides
   are additive, not fights.
3. **Composition.** Rule: assemble compound components from their parts
   (`Modal.Root`, `Modal.Trigger`, `Modal.Popup`) and swap the rendered element
   with `render`. Constraint: no slot props — icons and loaders are ordinary
   children. Rationale: the structure stays in your markup, where you can see
   and rearrange it.
4. **Contextualism.** Rule: declare `--loam-context` (primary, success,
   warning, danger, or info) on a region and every control inside re-answers
   its colour; size comes from the container. Constraint: never look for
   `size`, `variant`, or `color` props — they do not exist. Rationale: the
   surrounding design already made that decision once; a prop would repeat it.
5. **Accessible & gatekept.** Rule: semantic HTML, managed focus, keyboard
   support, and the reader's colour-scheme and motion preferences as the
   baseline. Constraint: never remove focus rings, never convey state by
   colour alone. Rationale: every component ships axe and keyboard tests and
   every token pair is contrast-audited; keep what you build to the same bar.

## Components

| Category     | Components                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| Inputs       | Field, Fieldset, ErrorSummary, Button, Input, Textarea, Select, DateInput, Checkbox, Radio, Switch, Range |
| Data display | Badge, Card, Avatar, Table, Separator                                                                     |
| Feedback     | Alert, Progress, Skeleton, Loader, Toast                                                                  |
| Disclosures  | Details, Tooltip, Modal, Drawer, Popover, Menu                                                            |
| Navigation   | Tabs, SignpostLink, SkipLink, Breadcrumbs, Pagination                                                     |

No layout components (use native CSS modules with the space tokens), no
`Heading`/`Text` (a semantic element plus a scoped rule), no `Accordion`
(that is `Details`), no `Slider` (that is `Range`).

## How to build with it

1. **Install and import once.** `pnpm add @loamui/core`, then
   `import "@loamui/core/styles.css"` at the app root. React 19, ESM only, no
   provider. **Next.js:** its CSS pipeline cannot parse the stylesheet — serve
   it as a static file instead (see `references/guides/installation.md`).
2. **Read the reference** for each component you will use.
3. **Compose.** Parts inside a `Root`; bare form controls (`Input`, `Select`,
   `Textarea`, `Range`) inside `Field.Root` wire their label, description,
   error, and `aria-*` automatically. `Checkbox`, `Radio`, `Switch` take an
   inline `label`; errors still go through `Field.Error`.
4. **Declare context, don't configure.** Wrap a region:
   `<div style={{ "--loam-context": "danger" }}>…</div>` — buttons, inputs,
   badges and checkboxes inside all adapt. Only reach for identity when it is
   genuinely identity (a brand-coloured wrapper), never per element.
5. **Lay out with native CSS.** Grid, flex, flow, or multi-column per the
   content's shape; space with `var(--loam-space-*)`; cap prose at
   `var(--loam-measure)`.
6. **Theme with tokens.** Override `--loam-*` at `:root` or on any scope;
   never touch a component's internals or its private `--_*` properties.
7. **Verify.** Keyboard-only pass, both colour schemes (`data-theme="dark"` /
   `"light"` on `<html>`, or the OS preference), and `forced-colors` for any
   state carried by background paint.

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
surface,surface-hover,line,line-strong,link,highlight}`, `--loam-space-{xs..xl}`,
`--loam-radius-{sm..xl,full}`, `--loam-shadow-{sm,md,lg}`,
`--loam-duration-{sm,md,lg}`, `--loam-ease`, `--loam-measure`. Full list and
recipes: `references/guides/tokens.md`.

Component-level hooks are public custom properties documented per component
(e.g. `--loam-button-color`, `--loam-modal-size`, `--loam-drawer-size`,
`--loam-loader-size`), set where the component is used.

## Mistakes people make by default

Each of these has been seen in real migrations. Check your output against them.

- **Looking for `size` / `variant` / `color` props.** They do not exist. Colour
  is a context region; size is the container; width is the parent's layout.
  Modal and Drawer width: `--loam-modal-size` / `--loam-drawer-size`.
- **Borrowing `loam-*` classes on raw elements** (`<a class="loam-Button">`,
  `<details class="loam-Details">`). Class names are not API. Use the
  component; it carries wiring and tests the class does not.
- **A link dressed as a button.** `Button` is for actions. Navigation that
  wants prominence is `SignpostLink`; ordinary navigation is `<a>`.
- **Hand-wiring `id` / `aria-describedby` / `aria-invalid`** on a control
  inside `Field.Root`. It self-wires from context; manual values duplicate
  or clobber it. Render the error through `Field.Error` and the rest follows.
- **Required asterisks.** Required is the unmarked default; mark the optional
  field in words with `<Field.Label optional>`.
- **Error copy like "This field is required" or "Please enter a valid…".**
  Say what happened and how to fix it, in the words of the question:
  "Enter your email address", "Select a country". No "please", "invalid",
  "required", or error codes.
- **Expecting slot props** (`icon=`, `leftSection=`). Put the icon in as a
  child; the component detects it.
- **Reset-then-restyle.** Do not add a CSS reset or zero every margin — the
  element styles are the baseline. Build on them.
- **`!important`, BEM, physical properties, viewport units for sizing.** The
  library uses none; neither should styles around it.
- **Importing the stylesheet through a bundler that cannot parse it** (Next.js
  today). Serve it statically; see the installation guide.
- **A `Heading` or `Text` component.** Typography is domain-specific:
  `@scope (h1.headline) { :scope { font-family: var(--loam-font-display) } }`.

## Worked examples

- A composed sign-in form, install to first component:
  `references/guides/installation.md`.
- Regions, identity, and the size of the space:
  `references/guides/contextualism.md`.
- Tokens, derivation, and dark mode: `references/guides/tokens.md`.
- Every component's usage, parts, props, custom properties, when-to-use and
  accessibility notes: `references/components/<slug>.md`.
