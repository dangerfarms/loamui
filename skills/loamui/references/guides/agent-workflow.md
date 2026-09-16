---
title: Build with the skill
description: Install the LoamUI skill, give your agent a first prompt, and review the interface it builds.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Build with the skill

Use the LoamUI skill to turn a description of your interface into React and CSS built from the three primitives. The package supplies the tokens, element styles and components; the skill guides your agent in composing them.

**Before you start:** complete [Installation](/docs/installation) and check that your framework application builds with LoamUI. Installing the skill does not install the package or set up the framework.

## 1. Install the skill

Run this from your application directory and select your coding agent when prompted:

```bash
npx skills add dangerfarms/loamui
```

Ask your agent to use the LoamUI skill explicitly for your first task. It should inspect your framework, installed package and styles, then explain any changes needed to the shared setup before making them.

## 2. Describe your first interface

Tell the agent what the interface is for, what it contains and how it should behave. For example:

> Use the LoamUI skill to build a profile form with name and email fields and a Save changes button. Use the package's tokens, element styles and components. Keep entered values when validation fails and explain how to correct each error. Check the existing project setup first. Ask me for the save endpoint if it is missing, and do not show a successful save before a request succeeds. Verify the result and report what you checked.

You can also start with a [recipe](/recipes). Choose a pattern, select **Copy prompt**, and add the content and behaviour you want to change. The recipe's source and component references give the agent a concrete starting point.

## 3. Review and refine

Run the interface in your application. Check its content and layout, then use it with the keyboard, at a narrow width and in both colour schemes. For a form, try invalid values and confirm that submission reaches your application's actual endpoint.

Ask the agent what it tested and what remains unverified. When requesting a change, describe the outcome: for example, “Keep the action below the fields when this form appears in a narrow sidebar.” The agent should adapt the composition using the same primitives.

**Next: [Choose a recipe](/recipes)** or read [Building your own recipes](/recipes/guide) to understand how a composition is put together.

## Using a chat tool

If your tool cannot install a skill, provide [llms.txt](/llms.txt) and a recipe prompt. When it cannot open links, attach the complete prompt linked from the copied text. A chat preview needs access to the real package and stylesheet; when that is unavailable, ask for source files to use in your configured application. Preview and runtime behaviour still need checking there.

## Reference: how the agent should work

The following guidance defines the environment checks, composition rules and verification expected from an agent. It also ships with the skill and the documentation for LLMs.

### Establish the environment first

Inspect what is available before changing anything. In a repository, read its instructions, package manifest, lockfile, app entry, stylesheet entry and relevant existing components. Check the installed `@loamui/core` version and its public exports/types. Use the existing package manager. Do not assume that the documentation and installed package are the same version.

Repository setup requires a React framework application. The beta installation paths are Next.js App Router and TanStack Start; Vite alone is not a framework. If no framework exists, propose one of those paths before generating application files. For another framework, establish its React and stylesheet integration before claiming support. Follow the [installation guide](/docs/installation) and check package availability; the skill is not the package.

For a fresh beta project, use LoamUI without Tailwind or another global reset. In an existing project, inspect Tailwind's Preflight import, utility usage and competing element rules. Do not silently delete a dependency or rewrite the site's styling foundation. Identify the affected files and propose an integration or migration before proceeding.

Check that the application loads all three primitives: tokens, element styles and components. Load the core stylesheet once, using the [installation guide](/docs/installation). Inspect the build pipeline and the rendered cascade; a successful import alone does not establish correct styling.

The layer order must be established before any recipe or library style registers a layer:

```css
@layer loamui.tokens, loamui.elements, loamui.components;
```

Place that declaration in the application's earliest stylesheet. A later declaration cannot reorder already established layers. If a recipe first creates `loamui.components`, subsequently loading core can put `loamui.elements` above it: default image sizing then defeats the recipe's full-height image. Check direct loads and client navigation, including lazy stylesheet loading.

Look for existing resets, unlayered element rules, theme declarations and browser targets that affect the new UI. Assess the integration region; do not require an unrelated application-wide migration. State the specific conflict and affected files. Before installing packages or changing shared infrastructure, present the minimal proposed changes and obtain approval unless that setup has already been authorized. Continue independent inspection and prepare a concrete proposal while approval is pending. Do not treat silence as approval.

A useful setup report states: installed package/version; how styles load; layer order; relevant conflicts; available build/browser checks; and any proposed changes. If the consumer has no formatter, CSS lint or browser checks, propose the smallest suitable setup and identify which checks need approval or additional tooling. If setup is already correct, proceed without another approval round.

### When there is no repository

Identify capabilities rather than guessing from a product name. Can the environment install the real package, resolve its React exports, load its CSS, render the result and run checks? Package installation in a code-execution sandbox does not prove the chat preview can use that package.

- **Package and rendering available:** build with the real library and verify in that renderer.
- **Source generation only:** provide the complete React and CSS files, required dependencies and application setup. State that rendering and runtime behaviour remain unverified.
- **Required references unavailable:** use the skill's bundled references or the supplied recipe prompt. If neither supplies the needed contract, request the missing reference or package files before inventing an API.

Never recreate fake `@loamui/core` exports, borrow `loam-*` classes on raw elements, substitute another UI library, or claim an approximation is LoamUI. A pattern using only native HTML, the real LoamUI tokens and element styles can be appropriate; it still needs the actual stylesheet. If the requested working preview is impossible here, explain the capability needed and supply an honest source deliverable where possible.

### The contract for every implementation

The three primitives are **tokens**, **element styles**, and **components**. Use semantic HTML and the existing element defaults first. Use `--loam-*` tokens for visual decisions. Compose core parts when they supply needed behaviour or anatomy; there is no requirement to import a component just to demonstrate a primitive.

#### Modern

- **Native platform:** use semantic elements and static styles. Actions are buttons; destinations are links. Native `<button>`, `<dialog>` opened with `showModal()`, and `<details>` supply platform behaviour; use documented LoamUI components when composing those behaviours. Do not recreate controls with clickable divs or use a styling runtime.
- **Modern CSS:** put recipe rules in `loamui.components` within `@scope (.recipe) to ([class*="loam-"])`. Limit article styles at embedded previews as well as core roots, so documentation cannot restyle a recipe. Use type selectors and short classes for real distinctions. Combine nesting, logical properties and additive conditions with container queries, intrinsic grid/flex and subgrid where appropriate. Tokens already supply `clamp()`, `oklch()` and `light-dark()`; do not duplicate their palette or force every CSS feature into a recipe. Avoid `!important`, BEM and private core selectors.
- **Composition through components:** read the relevant component contract before using parts or props. Keep core internals intact. Use `render` for supported element substitution. Button icons are children; Input has documented adornment props. Supply real application actions through a clear integration boundary.
- **Contextualism throughout the primitives:** put `--loam-context` on the region that carries the meaning. Leave ordinary content neutral. Layout and available space govern sizing; do not invent `variant`, `color` or `fullWidth` props. Documented intrinsic sizes and native HTML attributes are exceptions. Resolve fluid font tokens on content inside its measuring container: inherited computed font sizes do not re-evaluate when a new container is introduced.

An element cannot size-query itself. Put the measuring container outside the layout it controls. A recipe may use ordinary geometry such as a border width, aspect ratio or column threshold; design colours, spacing and typography come from tokens. A translucent image overlay needs contrast measured over the rendered photograph. Images may crop with `object-fit: cover` while text determines the component height; do not fix the text area's height or measure it with JavaScript.

#### Accessible

Preserve native labels, keyboard behaviour, focus, readable contrast and user preferences. Keep primary information visible; use Details for secondary information. Use Field's label, description, error, control order. Required fields are unmarked; mark optional fields in words. Errors say how to fix the value. After a submission attempt, clear a displayed native constraint error once its value is valid, keeping focus in the field and the summary in sync. Do not create new errors during typing or treat native validity as proof that server errors are resolved. A screenshot or axe pass cannot certify these requirements.

### Read and adapt a reference

Read the [recipe guide](/recipes/guide), the selected recipe's complete TSX and CSS, and the reference for each core component used. Skill users can read these offline in `references/`. Each recipe card offers a short prompt linking to these references. If your assistant cannot open links, follow the complete-prompt link inside it and attach that text instead: it includes the selected source, workflow and component references for use without browsing.

Use the published recipes as worked references for this contract. Publication and design notes are not certification: verify every adaptation in its consuming environment.

Preserve the recipe's role: a hero introduces a page; a banner promotes one message within it; a card represents one item. Adapt content, heading level, alternative text, dates and destinations together. Keep image priority appropriate to placement: eager for the critical hero, lazy for genuinely offscreen media. Do not put docs previews, gallery loading, generated metadata or source viewers in the copied component.

Use idiomatic React. Keep state for user interaction, and effects for external synchronisation. `useId` is for actual relationships that must remain unique across instances; it is not a required decoration. Do not add a client directive solely because a synchronous component uses `useId`; observe the framework's client boundaries for interactive parts. Keep code concise; explain decisions outside the copied files.

### Verify, repair, and report

Gatekeeping is how we establish trust in agent work, separate from the two pillars. Checks have a defined scope; passing them is evidence for what they check, not certification of the whole interface.

Run the consuming project's formatter, type checker, lint and relevant tests. Render the composition outside the documentation site. Exercise narrow and wide parents, long copy, enlarged text, two instances, both schemes, keyboard and focus, forced colours and reduced motion. Check RTL when direction matters. Test image containment after content grows and on both cold and client navigations. Check form validation, value preservation and actual submission boundaries when relevant.

Inspect the result visually as well as structurally. Core's token contrast and component tests do not verify the new content, theme, image overlay or composition. Repair failures and rerun affected checks. Report what ran, what failed, and what remains unverified. Do not label generated code fully conformant when required evidence is missing.

For platform features, consult [Google Chrome's Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance), or the relevant official platform documentation when its tool is unavailable. LoamUI permits Baseline Newly or Widely Available features; features outside that policy need progressive enhancement. Do not silently change a consumer's browser policy.
