---
title: Introduction
description: Modern UI primitives for agent-assisted developers: contextual tokens, element styles and React components built on Google's Modern Web Guidance.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

import "./prose.css";

# Introduction

LoamUI is modern UI primitives for agent-assisted developers: contextual tokens, element styles and React components, built on Google's Modern Web Guidance, for quickly building bespoke UIs that are accessible, adaptable and fast.

## Three primitives

LoamUI provides three primitives and an agent skill for building interfaces for your product. All three primitives ship in one package, with a shared stylesheet that establishes their cascade order:

- **[Tokens](/docs/tokens).** A handful of semantic decisions (four hues, eight neutrals, fluid scales); everything else is derived by recipe and audited in CI.
- **[Element styles](/docs/element-styles).** Enhanced default styles for native HTML, page-wide: responsive, accessible, and respecting the reader's light or dark preference. Plain markup is presentable before any component appears.
- **[Components](/docs/components).** 48 composable React components. A region declares its meaning and the components inside adapt. Component references document their APIs, including intrinsic sizing for Badge, Loader, Progress and Meter.

The [recipes](/recipes) are product-specific compositions of the primitives: heroes, timelines, carousels and other patterns to study and adapt. [Building your own recipes](/recipes/guide) explains how to choose a pattern and build it for your content.

## Two pillars

The ideas that hold the primitives together. Each is grounded in a reference and enforced somewhere, by the cascade, a lint rule, a CI gate, or review.

1. **Modern.** Real elements carry the semantics and plain, static CSS carries the styling: no CSS-in-JS, no styling engine. `@layer` for order, `@scope` for encapsulation, `light-dark()` and container queries for adaptation. Underneath both sits [contextualism](/docs/contextualism), the paradigm shift: a region declares what it means (`--loam-context`) and the tokens, element styles and components inside all adapt. Component references explain the public APIs and their exceptions.
2. **[Accessible](/docs/accessibility).** Semantic HTML, managed focus, keyboard support and the reader's preferences as the baseline, distilled from the GOV.UK and Polaris design systems and running through all three primitives.

Trust in the agents is a separate question, answered by gatekeeping rather than by a pillar: contrast, axe and interaction tests run in CI, and Stylelint holds the CSS to the rules above.

## Get started

Set up a React framework, load LoamUI's three primitives, and check your first interface. The [installation guide](/docs/installation) covers Next.js App Router and TanStack Start, then shows you how to add the agent skill.

## Build with the skill

The package provides the UI primitives; the skill teaches your agent how to compose them for your product. Once your application is set up, follow [Build with the skill](/docs/agent-workflow) to install it, write your first prompt and check the result. The [recipes](/recipes) provide complete examples to copy or adapt.

## Next steps

- [Installation](/docs/installation): framework guides for Next.js and TanStack Start.
- [Build with the skill](/docs/agent-workflow): create and refine your first interface.
- [Tokens](/docs/tokens): the token surface, and the theming that falls out of it.
- [Contextualism](/docs/contextualism): how regions shape colour, size and layout.
- [Building your own recipes](/recipes/guide): build a hero from the primitives.
