---
title: Install with Next.js
description: Set up LoamUI with Next.js App Router and native CSS.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Install with Next.js

Use Next.js App Router. Follow [Next.js’s current system requirements](https://nextjs.org/docs/app/getting-started/installation) for your Node.js runtime.

## Prepare the application

For a new project, create an empty application without Tailwind:

**pnpm**

```bash
pnpm create next-app@latest my-app \
  --ts --app --empty --no-tailwind --use-pnpm --yes
cd my-app
```

**npm**

```bash
npx create-next-app@latest my-app \
  --ts --app --empty --no-tailwind --use-npm --yes
cd my-app
```

**yarn**

```bash
yarn create next-app my-app \
  --ts --app --empty --no-tailwind --use-yarn --yes
cd my-app
```

**bun**

```bash
bun create next-app@latest my-app \
  --ts --app --empty --no-tailwind --use-bun --yes
cd my-app
```

This creates an empty application without Tailwind or a UI kit.

Already have an application? Keep its routes and configuration. Check the [existing-project workflow](/docs/agent-workflow#establish-the-environment-first) before changing its styling foundation.

The paths below use `app/`; use `src/app/` instead if your project has a `src` directory.

Install the package when the [public npm release is available](/docs/installation):

**pnpm**

```bash
pnpm add @loamui/core
```

**npm**

```bash
npm install @loamui/core
```

**yarn**

```bash
yarn add @loamui/core
```

**bun**

```bash
bun add @loamui/core
```

## Import the styles

Add the LoamUI stylesheet before your application styles in `app/layout.tsx`:

```tsx
import "@loamui/core/styles.css";
import "./globals.css";
```

This single import loads tokens, element styles and component styles, including their cascade layer order. No provider is needed.

For a fresh application, clear the starter rules from `app/globals.css` and use it for your own styles. Keep the rest of your root layout unchanged. Import recipe styles alongside their components.

## Check your first interface

Copy the [foundation example](/docs/installation#2-check-the-foundation) into `app/page.tsx` and put its CSS alongside it. Compound exports such as `Field.Root` require a client boundary because the package exports them from a client bundle. Keep `"use client"` on that composition; the root layout stays a server component.

**pnpm**

```bash
pnpm run dev
```

**npm**

```bash
npm run dev
```

**yarn**

```bash
yarn run dev
```

**bun**

```bash
bun run dev
```

Check the interface, then stop that server and run:

**pnpm**

```bash
pnpm run build
pnpm run start
```

**npm**

```bash
npm run build
npm run start
```

**yarn**

```bash
yarn run build
yarn run start
```

**bun**

```bash
bun run build
bun run start
```

Next: [build with the skill](/docs/agent-workflow).
