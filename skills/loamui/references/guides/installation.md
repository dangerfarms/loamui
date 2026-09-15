---
title: Installation
description: Install LoamUI in any React framework.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

import "../prose.css";

# Installation

LoamUI targets React 19 and ESM. There is no provider. Before changing an existing application, check its package version, CSS pipeline and stylesheet order with the [agent workflow](/docs/agent-workflow).

## 1. Install the package

```bash
pnpm add @loamui/core
```

## 2. Import the styles

Import the stylesheet **once** at the root of your app. It carries all three primitives: the
`--loam-*` tokens, the element styles, and the component styles.

```tsx
// A bundler entry that accepts the stylesheet, for example Vite main.tsx
import "@loamui/core/styles.css";
```

Declare the layer order in your earliest application stylesheet, before any recipe CSS:

```css
@layer loamui.tokens, loamui.elements, loamui.components;
```

Layer order is established on first appearance. Loading this declaration later cannot reorder layers already created by recipe styles. Check a direct page load and client navigation; bundlers can load their CSS before manually linked stylesheets.

## 3. Use a component

```tsx
"use client";

import { Button, Field, Input, PasswordInput } from "@loamui/core";

export function SignIn() {
  return (
    <form action="/sign-in" method="post">
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input name="email" type="email" autoComplete="username" required />
      </Field.Root>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <PasswordInput name="password" autoComplete="current-password" required />
      </Field.Root>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
```

Connect `/sign-in` to your authentication endpoint. For error handling and layout, use the complete [Sign in with errors recipe](/recipes/forms/sign-in-with-errors).

## Framework notes

### Next.js

Use client boundaries for interactive compositions, including compound Field parts; keep static compositions on the server where supported.

Some Next.js CSS toolchains reject features such as `@container anchored()` and `position-try`. Test the installed toolchain rather than assuming support from the framework name. If the stylesheet import fails, preserve the finished library CSS and serve it as a static file instead: copy it to `public/` in a `prebuild` script and add
`<link rel="stylesheet" href="/loamui-core.css" />` to the root layout's `<head>`.

```js
// scripts/sync-loamui-css.mjs — run from "prebuild" and "predev"
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
mkdirSync("public", { recursive: true });
copyFileSync(require.resolve("@loamui/core/styles.css"), "public/loamui-core.css");
```

The earliest application stylesheet still declares the layer order above. Keep the static copy synchronized in development and production; version its URL or configure revalidation so deployments cannot keep serving an old stylesheet.

### Vite

Import `@loamui/core/styles.css` in your `main.tsx` entry. No plugin required; the styles are
plain CSS.
