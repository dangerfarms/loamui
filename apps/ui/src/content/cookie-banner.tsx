"use client";

import { CookieBanner } from "@loamui/ui";
import type { Composition } from "./types";

const cookieBanner: Composition = {
  slug: "cookie-banner",
  name: "Cookie banner",
  category: "Page sections",
  description:
    "A cookie consent banner: a title, a paragraph or two, and the choices as real buttons, then a confirmation the reader can hide.",
  lead: "A section named by its title, first inside body and in the flow of the page: a region and not a dialog, so nothing is covered and the page stays usable; nothing is pre-ticked and only a press of Accept counts; the choices are submit buttons in a post form, so they work before JavaScript; after the choice a status confirmation, mounted empty so it announces, takes the banner's place, and the choice itself is yours to persist.",
  importLine: `import { CookieBanner } from "@loamui/ui";`,
  parts: [
    {
      name: "CookieBanner.Root",
      description:
        "A section named by its Title, or Cookies when there is none, unless you pass aria-label or aria-labelledby; on the subtle background with a line beneath it, declaring its own container. Holds only what the reader sees: the banner, then the confirmation, then nothing. onAccept and onReject fire once with the choice; open, defaultOpen and onOpenChange control the last step from outside. Given action, the Actions form posts the choice there for readers without JavaScript, and for readers with it when there is no handler.",
    },
    {
      name: "CookieBanner.Title",
      description:
        "The heading, an h2 by default; pass render={<h3 />} to change the level. It names the Root while it is present.",
    },
    {
      name: "CookieBanner.Body",
      description:
        "One or two paragraphs held to a readable measure: what the essential cookies do, and what the additional ones would.",
    },
    {
      name: "CookieBanner.Actions",
      description:
        "The wrapping row of choices: a form method=post whose action is the Root's. With a handler on the Root the submit is taken in place, the way a dialog's form is; without one it posts. Put Accept, Reject and a link to the settings page inside.",
    },
    {
      name: "CookieBanner.Accept",
      description:
        'A core Button, "Accept additional cookies", carrying name=cookies and value=accept: a submit button in the Actions form.',
    },
    {
      name: "CookieBanner.Reject",
      description:
        'A core Button, "Reject additional cookies", carrying name=cookies and value=reject: a submit button in the Actions form.',
    },
    {
      name: "CookieBanner.Confirmation",
      description:
        "What replaces the banner after a choice: a div with role status, mounted empty alongside the banner and filled on the choice, which is what makes the outcome announce, holding the sentence and the Hide button. The Root renders it; place one among the children only to change the words, with a Hide of your own inside.",
    },
    {
      name: "CookieBanner.Hide",
      description: 'A core Button, "Hide this message", that removes the confirmation.',
    },
  ],
  demos: [
    {
      title: "Before a choice",
      description:
        "The banner as the reader meets it. Press Accept or Reject and the whole banner gives way to a status confirmation that names the choice, with a button to hide it; the region is named by the title, so a screen reader's list of landmarks reads it. The handlers are where you persist the answer, in a cookie or a request to your server, and while it stands you do not render the banner again.",
      code: `// Persist the choice: a cookie, or a request to your server.
function save(choice: "accept" | "reject") {
  return choice;
}

<CookieBanner.Root onAccept={() => save("accept")} onReject={() => save("reject")}>
  <CookieBanner.Title>Cookies on this site</CookieBanner.Title>
  <CookieBanner.Body>
    <p>We use some essential cookies to make this site work.</p>
    <p>We'd like to set additional cookies to understand how you use it and improve it.</p>
  </CookieBanner.Body>
  <CookieBanner.Actions>
    <CookieBanner.Accept />
    <CookieBanner.Reject />
    <a href="/cookies">View cookie settings</a>
  </CookieBanner.Actions>
</CookieBanner.Root>`,
      render: () => (
        <CookieBanner.Root onAccept={() => save("accept")} onReject={() => save("reject")}>
          <CookieBanner.Title>Cookies on this site</CookieBanner.Title>
          <CookieBanner.Body>
            <p>We use some essential cookies to make this site work.</p>
            <p>We'd like to set additional cookies to understand how you use it and improve it.</p>
          </CookieBanner.Body>
          <CookieBanner.Actions>
            <CookieBanner.Accept />
            <CookieBanner.Reject />
            <a href="/cookies">View cookie settings</a>
          </CookieBanner.Actions>
        </CookieBanner.Root>
      ),
    },
    {
      title: "Without JavaScript",
      description:
        "The same markup with an action. The form now posts to it, and the two submit buttons carry name=cookies with the values accept and reject, so a server records the choice for a reader whose JavaScript never ran. With JavaScript the handlers take the submit and swap in the confirmation without leaving the page; leave the handlers out and the post goes ahead even with JavaScript, so a server that records the choice needs nothing else.",
      code: `// Persist the choice: a cookie, or a request to your server.
function save(choice: "accept" | "reject") {
  return choice;
}

<CookieBanner.Root action="/cookies" onAccept={() => save("accept")} onReject={() => save("reject")}>
  <CookieBanner.Title>Cookies on this site</CookieBanner.Title>
  <CookieBanner.Body>
    <p>We use some essential cookies to make this site work.</p>
    <p>We'd like to set additional cookies to understand how you use it and improve it.</p>
  </CookieBanner.Body>
  <CookieBanner.Actions>
    <CookieBanner.Accept />
    <CookieBanner.Reject />
    <a href="/cookies">View cookie settings</a>
  </CookieBanner.Actions>
</CookieBanner.Root>`,
      render: () => (
        <CookieBanner.Root
          action="/cookies"
          onAccept={() => save("accept")}
          onReject={() => save("reject")}
        >
          <CookieBanner.Title>Cookies on this site</CookieBanner.Title>
          <CookieBanner.Body>
            <p>We use some essential cookies to make this site work.</p>
            <p>We'd like to set additional cookies to understand how you use it and improve it.</p>
          </CookieBanner.Body>
          <CookieBanner.Actions>
            <CookieBanner.Accept />
            <CookieBanner.Reject />
            <a href="/cookies">View cookie settings</a>
          </CookieBanner.Actions>
        </CookieBanner.Root>
      ),
    },
  ],
  whenToUse: [
    "A site that sets cookies beyond the essential ones, for analytics or personalisation, and needs the reader's consent before it does: the banner asks once, first on the page, and gets out of the way.",
    "A site that has to work without JavaScript: give the Root an action and the same two buttons post the choice to your server.",
  ],
  whenNotToUse: [
    "A site with only essential cookies, the ones the site cannot work without. Nothing needs consent, so there is nothing to ask, and a banner would be noise the reader has to move past.",
    "As a modal that blocks the page until the reader chooses. A dialog with a focus trap and a backdrop holds the page hostage to a question about cookies, and a choice made to get rid of it is not a choice. The region sits first in the document and in flow: read it, answer it, or move past it.",
  ],
};

/** Persist the choice: a cookie, or a request to your server. The gallery keeps nothing. */
function save(choice: "accept" | "reject") {
  return choice;
}

export default cookieBanner;
