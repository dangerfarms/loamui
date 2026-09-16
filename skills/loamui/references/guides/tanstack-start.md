---
title: Install with TanStack Start
description: Set up LoamUI with TanStack Start and native CSS, without Tailwind or a UI kit.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Install with TanStack Start

TanStack Start is a full-stack React framework with routing, server rendering and server functions. Follow its [current setup requirements](https://tanstack.com/start/latest/docs/framework/react/getting-started) for your Node.js runtime.

## Prepare the application

Create a blank React project:

```bash
npx @tanstack/cli@latest create my-app \
  --blank --framework React --package-manager npm -y
cd my-app
```

The [blank starter](https://tanstack.com/cli/latest/docs/cli-reference) has one route and no Tailwind, shadcn, or other UI kit. No styling packages need to be removed.

Already have an application? Follow the [existing-project workflow](/docs/agent-workflow#establish-the-environment-first) before changing its styling foundation.

Install LoamUI when the [public npm release is available](/docs/installation):

```bash
npm install @loamui/core
```

## Import the styles

Replace the blank starter’s `src/styles.css` with:

```css
@import "@loamui/core/styles.css";
```

This single import loads tokens, element styles and component styles, including their cascade layer order. The starter already loads `src/styles.css` from its root route; keep that setup unchanged. No provider is needed.

Add your application styles below the import. Import recipe styles alongside their components.

## Check your first interface

Copy the [foundation example](/docs/installation#2-check-the-foundation) into `src/components/Welcome.tsx` and put `welcome.css` beside it. Omit `"use client"` in this framework.

Replace `src/routes/index.tsx` with:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import Welcome from "../components/Welcome";

export const Route = createFileRoute("/")({ component: Welcome });
```

Run the development server:

```bash
npm run dev
```

Check the interface, then stop the server and verify the production build:

```bash
npm run build
npm run preview
```

Once the foundation works, [build with the skill](/docs/agent-workflow).
