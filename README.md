# LoamUI

**Modern UI primitives for agent-assisted developers.** Contextual tokens,
element styles and React components, built on Google's Modern Web Guidelines
for quickly building bespoke UIs that are accessible, adaptable and fast.

[![npm](https://img.shields.io/npm/v/@loamui/core.svg)](https://www.npmjs.com/package/@loamui/core)
[![license](https://img.shields.io/npm/l/@loamui/core.svg)](./LICENSE)

## Why LoamUI?

Agent-assisted developers want solid primitives their agents can build bespoke
components and interfaces from — not hundreds of pre-made components locked
into last decade's paradigms. LoamUI offers three primitives, each following
the Chrome team's guidance for the modern web, steeped in UX best practices
and inspired by Base UI's component composition architecture — a combination
no other library offers:

- **Tokens** — a handful of semantic decisions (four hues, eight neutrals,
  fluid scales); everything else is derived by recipe and audited in CI.
- **Element styles** — enhanced default styles for native HTML, page-wide:
  responsive, accessible, and respecting the reader's light or dark
  preference. Plain markup is presentable before any component appears.
- **Components** — a small set of carefully chosen, contextually styled
  components. No size, variant or colour props: a region declares what it
  means (`--loam-context`) and everything inside adapts.

All of it is plain, static CSS — cascade layers, `@scope`, `light-dark()`,
container queries, anchor positioning — so nothing runs in the browser and
nothing extra ships to your users.

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

That's the whole setup — no provider, no config. See the
[documentation](https://dangerfarms.github.io/loamui/) for every component, live examples and the
theming guide.

## Repository layout

This is a pnpm + Turborepo monorepo:

- [`packages/core`](./packages/core) — `@loamui/core`, the component library.
- [`apps/docs`](./apps/docs) — the marketing site and documentation (Next.js).

## Development

```bash
pnpm install
pnpm build        # build the library, then the docs site
pnpm dev          # run the docs site against the library
pnpm check-types  # type-check everything
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

[MIT](./LICENSE) © Danger Farms

## Requirements

- React 19.
- The package is ESM-only — there is no CommonJS build.
- Styling targets Baseline Newly Available CSS with graceful degradation;
  the full browser-support policy is in [CONTRIBUTING](CONTRIBUTING.md).
