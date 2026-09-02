---
name: component-review
description: The procedure for reviewing a change to @loamui/core, graded by which primitive it touches. Use this skill when the user asks to review a component, a diff, a PR, or a proposed change to the library — or to audit the codebase against its conventions. It grades risk by blast radius (tokens/elements are HIGH, a component's public contract MEDIUM, pure composition LOW), says what to check at each grade, and how to verify findings before reporting them.
metadata:
  tags: loamui, review, code-review, primitives, risk, scope, accessibility, contrast, verification
---

# Reviewing a LoamUI change

> Risk here is not lines changed — it is which PRIMITIVE the change touches.
> Grade first, then review at the depth the grade demands.

**Ground the review in the pillars.** The five pillars in
[`README.md`](../../../README.md) are the bar; the [README Standards
section](../../../README.md) and [`CONTRIBUTING.md`](../../../CONTRIBUTING.md)
hold the rules. For CSS judgment load the **`modern-css`** skill; for "is this
the platform-native way?" search **`modern-web-guidance`**.

## Step 1 — Grade the risk

**HIGH — the diff touches `tokens.css` or `elements.css`.** Felt by every
component and by downstream apps that were never in the diff. Require:

- A stated rationale (in the PR description, at least) for _why_ a primitive had
  to change. "The new component needed it" is the classic smell — components
  adapt to primitives, not the reverse.
- For colour: does `scripts/contrast-audit.mjs` cover the new/changed pairing?
  A recipe change the audit doesn't read is an unaudited claim.
- For element styles: a collision audit — check the components that DON'T appear
  in the diff but inherit the changed global.

**MEDIUM — the diff changes a component's public contract.** Props, public
`--loam-*` custom properties, class names, DOM structure other components reach
into, or context behaviour. Require: every consumer swept (docs demos, blocks,
cross-scope reaches) and the docs page updated _in the same change_ — code-tab
parity makes stale demos loud. Sweep the meta-docs too: README Standards,
CONTRIBUTING and the skills name specific components and behaviours, and every
stale claim so far has come from a contract change that skipped them.

**LOW — a new component composing existing primitives.** Blast radius is the
component itself. Review it against the `add-component` skill's ladder and
wiring checklist; that's where low-risk changes usually fail. Challenge whether
it belongs in _core_ at all — a component that would need per-project structural
overrides to be reused is a downstream recipe, not a primitive.

## Step 2 — Review weighted by grade

Never hand-review what a gate verifies (formatting, property order, contrast
numbers, types) — run the gates and believe them. Spend attention on what no
tool checks:

- **API doctrine** — no `size`/`variant`/`color`/`fullWidth` props (bar the
  display-component `size` exceptions); compose over configure; bare controls
  self-wire from `Field`.
- **Scope hygiene** — every `@scope` that hosts foreign content has the donut
  (`to ([class*="loam-"])`); no `:where()` naming a part (target the element
  directly); no bare descendant type selector leaking into nested components.
- **The derived-token re-answer trap** — a context region must re-answer every
  derived token it needs, not just the base; contexted checked/filled controls
  use the `-strong` family (raw status can't hold 3:1).
- **Accessibility** — forced-colors treatment for any state carried by
  background paint; `aria-disabled` vs native `disabled` consistency; the 24px
  target floor; focus visible and never colour-only.
- **Docs & UX guidance** — the page carries the reasoning, not just a code
  sample: when to use the component, when _not_ to, and the a11y/UX rationale
  behind its defaults (this guidance is the differentiator, so a component that
  ships without it is under-reviewed). Plus code-tab ↔ preview parity (copy
  included), one concept per Preview panel, demos that actually demonstrate their
  stated claim, and no external design-system names in the prose.

For HIGH diffs, review what ISN'T in the diff: the components and pages that
inherit the changed primitive.

## Step 3 — Verify, don't trust

Findings are only as good as their verification.

- **Falsify visual claims.** Screenshot in _both_ schemes; measure computed
  styles for anything about spacing, size, or colour — don't infer from a
  single grep (and grep markers with `-F` so `*`/`/` aren't read as regex).
- **Adversarially re-check every finding** (yours or a subagent's) against the
  code before reporting it. "This likely fails ~2.5" is not a finding until the
  contrast math or a screenshot confirms it — plausible-but-wrong claims are the
  main thing this step kills.
- **Reviewer's gotcha:** the docs serve a _static copy_ of the library CSS,
  kept fresh by watchers only while `pnpm dev` runs. If dev wasn't running when
  the CSS changed, rebuild core (`pnpm --filter @loamui/core build`) before
  judging a CSS fix in the docs — a stale copy reads as "not fixed."

## Step 4 — Verdict

State the grade and why; list findings ranked most-severe first. For each
finding: the `file:line`, the rule or reasoning it violates, and the fix. A
HIGH-risk change with no stated rationale is itself a finding, regardless of
code quality.
