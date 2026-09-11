---
title: Social buttons
description: Three sign-in buttons, one per provider, each with the provider's mark and its name in the words, in a row where there is room and a stack where there is not.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Social buttons

Three sign-in buttons, one per provider, each with the provider's mark and its name in the words, in a row where there is room and a stack where there is not.

An example in **Buttons**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`
- Tags: sign in, oauth, google, github, apple, social, login
- Live: https://loamui.com/examples/buttons/social-buttons

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** Each button submits its own form to the provider's sign-in address with POST, because starting a sign-in is an action with a side effect, not a page to link to; the form works with JavaScript off.
- **Modern CSS.** The list answers a container query on the wrapper, three columns from 36rem and one below, and each form is a one-cell grid so its Button stretches to the cell without a width prop.
- **Composition.** Core Buttons with the marks as svg children, which the Button detects and sizes; nothing is passed for the icon or the layout. Two marks are cut in currentColor and follow the button's text; Google's keeps the four colours its guidelines require.
- **Accessible & gatekept.** Every button says the provider's name in its words (Continue with GitHub), so the marks are decoration and aria-hidden, and the names are told apart by a screen reader and a password manager alike. The list keeps its role, so the count of ways to sign in is announced.

## Example.tsx

```tsx
import { Button } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="social-buttons">
      <ul className="providers" role="list">
        <li>
          <form action="/auth/google" method="post">
            <Button type="submit">
              {/* Google's mark keeps its own brand colours: a mark is exempt from the token rule. */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
                />
              </svg>
              Continue with Google
            </Button>
          </form>
        </li>
        <li>
          <form action="/auth/github" method="post">
            <Button type="submit">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
              </svg>
              Continue with GitHub
            </Button>
          </form>
        </li>
        <li>
          <form action="/auth/apple" method="post">
            <Button type="submit">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.2 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.9 1.2 1.9 2.6 3.2 2.5 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.9-3.9ZM14 5.3c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4Z" />
              </svg>
              Continue with Apple
            </Button>
          </form>
        </li>
      </ul>
    </div>
  );
}
```

## example.css

```css
@scope (.social-buttons) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }

  ul.providers {
    display: block grid;
    gap: var(--loam-space-sm);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  form {
    display: block grid;
    margin: 0;
  }

  @container (inline-size >= 36rem) {
    ul.providers {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
```

