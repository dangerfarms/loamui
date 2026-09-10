"use client";

import { SignpostLink } from "@loamui/core";
import { ErrorPage } from "@loamui/ui";
import type { Composition } from "./types";

const errorPage: Composition = {
  slug: "error-page",
  name: "Error page",
  category: "Page sections",
  description:
    "An error page: the status code, a title that says what happened, a line on what to do next and a row of ways out.",
  lead: "Five parts on a native section, centred in a column. The code is dim and the title carries the message, because the reader needs to know what happened and where to go, not which number the server sent; the section stays agnostic of main, so it drops into whatever shell the page already has.",
  importLine: `import { ErrorPage } from "@loamui/ui";`,
  parts: [
    {
      name: "ErrorPage.Root",
      description:
        "The section: a centred column at least 24rem tall. Declares its own container so the fluid tokens answer its width.",
    },
    {
      name: "ErrorPage.Code",
      description:
        "The status code, a paragraph set large in dim tabular figures so it identifies the error without leading it.",
    },
    {
      name: "ErrorPage.Title",
      description:
        'What happened, in a few words. An h1 when the error is the page; pass render="h2" inside a page.',
    },
    {
      name: "ErrorPage.Body",
      description:
        "One or two muted sentences on what the reader can do next, capped at a readable measure.",
    },
    {
      name: "ErrorPage.Actions",
      description:
        "A centred, wrapping flex row: a SignpostLink for the main way out, plain links beside it.",
    },
  ],
  demos: [
    {
      title: "Page not found",
      description:
        "The copy says what happened and what to do. It does not blame the reader, and it does not joke about the code.",
      code: `<ErrorPage.Root>
  <ErrorPage.Code>404</ErrorPage.Code>
  <ErrorPage.Title>Page not found</ErrorPage.Title>
  <ErrorPage.Body>
    The page may have moved, or the address may have a typo. Check the address, or go back
    to the home page and find it from there.
  </ErrorPage.Body>
  <ErrorPage.Actions>
    <SignpostLink href="/">Back to home</SignpostLink>
    <a href="/support">Contact support</a>
  </ErrorPage.Actions>
</ErrorPage.Root>`,
      render: () => (
        <ErrorPage.Root>
          <ErrorPage.Code>404</ErrorPage.Code>
          <ErrorPage.Title>Page not found</ErrorPage.Title>
          <ErrorPage.Body>
            The page may have moved, or the address may have a typo. Check the address, or go back
            to the home page and find it from there.
          </ErrorPage.Body>
          <ErrorPage.Actions>
            <SignpostLink href="/">Back to home</SignpostLink>
            <a href="/support">Contact support</a>
          </ErrorPage.Actions>
        </ErrorPage.Root>
      ),
    },
  ],
  whenToUse: [
    "A whole page that cannot be shown: not found, gone, forbidden, or a server fault. The reader arrived expecting content, so the page owes them a plain account and a way out.",
    "A dead end inside an app shell, with the title as an h2, so the header and navigation stay and the reader is never stranded.",
  ],
  whenNotToUse: [
    "A problem with the reader's own input: that belongs beside the field, in the words of the question, or in an ErrorSummary at the top of the form.",
    "A passing fault the page can recover from, such as a failed fetch that a retry would fix; an Alert with a Button keeps the reader where they were.",
  ],
};

export default errorPage;
