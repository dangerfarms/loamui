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

## Built to the pillars

- **Native CSS.** A section named by its title, so it is a landmark a screen reader can list; the choices are submit buttons in a post form with name and value, so a server records them before any JavaScript runs.
- **Modern CSS.** The banner sits in flow on the subtle background with a line beneath, never fixed over the page; the empty confirmation grid has no height, so it costs no room until it is filled.
- **Composition.** Two Buttons and a link in a form the example writes; the open state, the choice and the focus moves are the page's own, held in the component that renders the banner.
- **Accessible & gatekept.** The confirmation is a role=status mounted empty so the outcome announces; focus moves to its Hide button because the one pressed has gone, and hiding moves focus on to the next thing the reader could have tabbed to.

## Example.tsx

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
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
  const [choice, setChoice] = useState<Choice | null>(null);
  const [hidden, setHidden] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  // The button pressed, recorded on click so the submit knows the choice in every browser.
  const pending = useRef<Choice | null>(null);

  // The button the reader pressed has gone with the banner, so focus moves to the one that replaced it.
  useEffect(() => {
    if (choice === null) return;
    confirmation.current?.querySelector("button")?.focus();
  }, [choice]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const value = submitter instanceof HTMLButtonElement ? submitter.value : "";
    const next = value === "accept" || value === "reject" ? value : pending.current;
    if (!next) return;
    // Persist the choice here: a cookie, or a request to your server.
    setChoice(next);
  }

  function hide() {
    // The banner is still in the page here; focus moves on before it goes.
    if (banner.current) focusAfter(banner.current);
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <section className="cookie-banner" aria-labelledby="cookie-banner-title" ref={banner}>
      {choice === null && (
        <div className="inner">
          <h2 id="cookie-banner-title">Cookies on Hedgerow</h2>
          <p>
            We use essential cookies to keep your basket and remember that you are signed in. They
            are always on.
          </p>
          <p>
            We would also like to set cookies that tell us which guides and varieties people look
            at, so we can decide what to grow and write next. Nothing is shared with advertisers.
          </p>
          <form method="post" action="/cookies" onSubmit={submit}>
            <Button
              type="submit"
              name="cookies"
              value="accept"
              onClick={() => (pending.current = "accept")}
            >
              Accept additional cookies
            </Button>
            <Button
              type="submit"
              name="cookies"
              value="reject"
              onClick={() => (pending.current = "reject")}
            >
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
/* A cookie banner is a region at the start of the document, in the flow
   of the page and never over it: no sticky or fixed position and no
   stacking, so nothing is covered while the choice is open. The
   confirmation sits beside the banner as a live region that is empty
   until the choice, so it takes no room and no gap while the banner
   shows. In forced colours the background goes but the line beneath
   keeps the banner's edge. */
@scope (.cookie-banner) to ([class*="loam-"]) {
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

  /* The paragraphs keep to a readable measure; the grid gap spaces them,
     so the element margin goes. */
  p {
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  /* The choices: a wrapping row. The Buttons and the link keep their own
     widths and wrap when the banner is narrow. */
  form {
    align-items: center;
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
    margin-block-start: var(--loam-space-sm);
  }

  /* The confirmation: the sentence, then the Hide button shrink-wrapped
     beneath it. A grid with no children has no height, which keeps the
     empty live region out of the way. It takes focus only when it has no
     button to hand it to, and a ring on a region of prose would mark
     nothing the reader can act on, so it draws none. */
  div.confirmation {
    display: block grid;
    gap: var(--loam-space-sm);
    justify-items: start;
    outline: none;
  }
}
```

