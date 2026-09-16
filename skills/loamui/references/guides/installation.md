---
title: Installation
description: Set up LoamUI in Next.js or TanStack Start, check your first interface, then add the agent skill.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

import "../prose.css";

# Installation

Create a framework application, install `@loamui/core`, and import its stylesheet. One stylesheet includes all three primitives: tokens, element styles and component styles. There is no provider to configure. Then add the skill to start building.

> **Package availability:** the public npm release of `@loamui/core` is planned but not yet available. The package commands in these guides apply once it is published. Installing the agent skill does not install the library.

## 1. Choose your framework

Use a working framework application before adding LoamUI. These guides cover a fresh project, the package and the stylesheet setup:

- **[Next.js App Router](/docs/installation/nextjs)** — routing, server rendering and React Server Components.
- **[TanStack Start](/docs/installation/tanstack-start)** — a full-stack React framework with routing, server rendering and server functions.

The beta setup uses LoamUI as the styling foundation, without Tailwind or another global reset. [React recommends starting new applications with a framework](https://react.dev/learn/creating-a-react-app).

**Already have a project?** Check its framework, React version, CSS imports and resets first. Tailwind's presence in a manifest alone does not prove a conflict: inspect Preflight, utility classes and global rules that affect the interface. Follow the [existing-project workflow](/docs/agent-workflow#establish-the-environment-first) before changing shared styles or dependencies.

## 2. Check the foundation

After completing your framework guide, replace its starter page with this small interface. Use `app/page.tsx` in Next.js or `src/components/Welcome.tsx` in TanStack Start. The TanStack guide shows how to render it from your index route. The client directive is needed for the compound Field parts in Next.js; omit it in TanStack Start.

```tsx
"use client";

import { Checkbox, Field, Input } from "@loamui/core";
import "./welcome.css";

export default function Welcome() {
  return (
    <main className="welcome">
      <h1>Welcome to LoamUI</h1>
      <p>Native HTML and components share the same foundation.</p>
      <Field.Root>
        <Field.Label>Your name</Field.Label>
        <Input name="name" autoComplete="name" />
      </Field.Root>
      <Checkbox label="Send me product updates" />
    </main>
  );
}
```

Add `welcome.css` beside that file. The page owns its layout; embedded controls retain their component styles.

```css
@layer loamui.components {
  @scope (.welcome) to ([class*="loam-"]) {
    :scope {
      display: block grid;
      gap: var(--loam-space-l);
      max-inline-size: var(--loam-measure);
      padding: var(--loam-space-xl);
    }
  }
}
```

Run the development server and the production build. Check that the heading and paragraph have element styles, spacing uses the tokens, and both controls are styled. Tab to the input and checkbox, check visible focus, toggle the checkbox with Space, and try light and dark system preferences. Repeat after a direct page load and a client-side navigation.

## 3. Build with the skill

Once the application builds and the foundation works, you are ready to create your own interface. The next guide shows you how to install the skill, give your agent a first prompt, and review the result.

**Next: [Build with the skill](/docs/agent-workflow).**
