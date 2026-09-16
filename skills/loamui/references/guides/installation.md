---
title: Installation
description: Set up LoamUI in Next.js or React Router, check your first interface, then add the agent skill.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

import "../prose.css";

# Installation

Start with a React framework, add LoamUI's three primitives, then build with the skill. LoamUI requires React 19 and an ESM-compatible application. There is no provider to configure.

> **Package availability:** the public npm release of `@loamui/core` is planned but not yet available. The package commands in these guides apply once it is published. Installing the agent skill does not install the library.

## 1. Choose your framework

Use a working framework application before adding LoamUI. These guides cover a fresh project, the package and the stylesheet setup:

- **[Next.js App Router](/docs/installation/nextjs)** — routing, server rendering and React Server Components.
- **[React Router Framework Mode](/docs/installation/react-router)** — route modules, loaders and actions, built on Vite; supports server rendering and SPA mode.

The beta setup uses LoamUI as the styling foundation, without Tailwind or another global reset. Vite on its own is a build tool; use it through React Router Framework Mode for this setup. [React recommends starting new applications with a framework](https://react.dev/learn/creating-a-react-app).

**Already have a project?** Check its framework, React version, CSS imports and resets first. Tailwind's presence in a manifest alone does not prove a conflict: inspect Preflight, utility classes and global rules that affect the interface. Follow the [existing-project workflow](/docs/agent-workflow#establish-the-environment-first) before changing shared styles or dependencies.

## 2. Check the foundation

After completing your framework guide, replace its starter page with this small interface. Use `app/page.tsx` in Next.js or `app/routes/home.tsx` in React Router. The client directive is needed for the compound Field parts in Next.js; omit it in React Router.

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

## 3. Add the agent skill

Once the application builds and the foundation works, run this from your project:

```bash
npx skills add dangerfarms/loamui
```

Then ask your agent:

> Use the LoamUI skill. Check this project's framework, installed package, stylesheet delivery and layer order. Tell me about any conflicting styles and propose changes before replacing existing infrastructure. Then build a profile form using LoamUI's tokens, element styles and components. Verify the result and report what you checked.

The skill guides composition and verification. It does not replace framework setup or install the package for you. If your tool cannot load skills, give it [llms.txt](/llms.txt) and the [agent workflow](/docs/agent-workflow).

## 4. Build your interface

Start from a [recipe](/recipes), or compose your own UI from [tokens](/docs/tokens), [element styles](/docs/element-styles) and [components](/docs/components). Keep application layout in scoped CSS and read each component's contract before adapting it.
