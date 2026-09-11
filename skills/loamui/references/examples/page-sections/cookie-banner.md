---
title: Cookie banner
description: A consent banner in the flow of the page: a title, two paragraphs, the choices as submit buttons, then a confirmation the reader can hide.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Cookie banner

A consent banner in the flow of the page: a title, two paragraphs, the choices as submit buttons, then a confirmation the reader can hide.

An example in **Page sections**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Button`
- Tags: consent, cookies, gdpr, privacy, form
- Live: https://loamui.com/examples/page-sections/cookie-banner

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

Replace the sample content and images. Links and form actions illustrate application routes; provide those destinations and connect action buttons before shipping.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** A section named by its title, so it is a landmark a screen reader can list; the choices are submit buttons in a post form with name and value, so a server records them before any JavaScript runs.
- **Modern CSS.** The banner sits in flow on the subtle background with a line beneath, never fixed over the page; the empty confirmation grid has no height, so it costs no room until it is filled.
- **Composition.** Two Buttons and a link in a form the example writes; the open state, the choice and the focus moves are the page's own, held in the component that renders the banner.
- **Accessible & gatekept.** The confirmation is a role=status mounted empty so the outcome announces; focus moves to its Hide button because the one pressed has gone, and hiding moves focus on to the next thing the reader could have tabbed to.

## Example.tsx

```tsx
"use client";

import { useId, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@loamui/core";
import "./example.css";

type Choice = "accept" | "reject";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, iframe, [tabindex]:not([tabindex="-1"])';

/** Focus the next thing the reader could have tabbed to after the banner, or the main content. */
function focusAfter(banner: HTMLElement) {
  const doc = banner.ownerDocument;
  for (const el of doc.querySelectorAll<HTMLElement>(FOCUSABLE)) {
    if (banner.contains(el)) continue;
    if (banner.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      el.focus();
      return;
    }
  }
  const main = doc.querySelector<HTMLElement>("main");
  if (main) {
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus();
  }
}

export default function Example() {
  const instanceId = useId();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [hidden, setHidden] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);

  // The button the reader pressed has gone with the banner, so focus moves to the one that replaced it.
  useEffect(() => {
    if (choice === null) return;
    confirmation.current?.querySelector("button")?.focus();
  }, [choice]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { submitter } = event.nativeEvent as SubmitEvent;
    const value = submitter instanceof HTMLButtonElement ? submitter.value : "";
    if (value !== "accept" && value !== "reject") return;
    // Persist the choice here: a cookie, or a request to your server.
    setChoice(value);
  }

  function hide() {
    // The banner is still in the page here; focus moves on before it goes.
    if (banner.current) focusAfter(banner.current);
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <section
      className="cookie-banner"
      aria-labelledby={`${instanceId}-cookie-banner-title`}
      ref={banner}
    >
      {choice === null && (
        <div className="inner">
          <h2 id={`${instanceId}-cookie-banner-title`}>Cookies on Hedgerow</h2>
          <p>
            We use essential cookies to keep your basket and remember that you are signed in. They
            are always on.
          </p>
          <p>
            We would also like to set cookies that tell us which guides and varieties people look
            at, so we can decide what to grow and write next. Nothing is shared with advertisers.
          </p>
          <form method="post" action="/cookies" onSubmit={submit}>
            <Button type="submit" name="cookies" value="accept">
              Accept additional cookies
            </Button>
            <Button type="submit" name="cookies" value="reject">
              Reject additional cookies
            </Button>
            <a href="/cookies">Cookie settings</a>
          </form>
        </div>
      )}
      <div className="confirmation" role="status" tabIndex={-1} ref={confirmation}>
        {choice !== null && (
          <>
            <p>
              You have {choice === "accept" ? "accepted" : "rejected"} additional cookies. You can
              change your cookie settings at any time.
            </p>
            <Button onClick={hide}>Hide this message</Button>
          </>
        )}
      </div>
    </section>
  );
}
```

## example.css

```css
@scope (.cookie-banner) to ([class*="loam-"]) {
  /* In flow, never fixed over the page: nothing is covered while the choice
     is open. */
  :scope {
    background: var(--loam-color-bg-subtle);
    border-block-end: 1px solid var(--loam-color-line);
    container-type: inline-size;
    padding: var(--loam-space-lg);
  }

  div.inner {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  h2 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p {
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  form {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    margin-block-start: var(--loam-space-sm);
  }

  /* No ring: it takes focus only when it has no button to hand it to, and a
     ring on prose marks nothing to act on. */
  div.confirmation {
    display: block grid;
    gap: var(--loam-space-sm);
    justify-items: start;
    outline: none;
  }
}
```

