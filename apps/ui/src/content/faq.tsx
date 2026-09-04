"use client";

import { Faq } from "@loamui/ui";
import type { Composition } from "./types";

const faq: Composition = {
  slug: "faq",
  name: "FAQ",
  category: "Page sections",
  description:
    "A list of questions, each a native disclosure the browser opens, closes and searches.",
  lead: "Three parts on a native section, each question a core Details. The browser owns opening and closing, keeps at most one answer open when the items share a name, and reveals a collapsed answer when find-in-page matches inside it; nothing here runs at runtime.",
  importLine: `import { Faq } from "@loamui/ui";`,
  parts: [
    {
      name: "Faq.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the section's width. Write your own h2 for the title and point aria-labelledby at it.",
    },
    {
      name: "Faq.List",
      description: "The stack of questions, separated by a small gap.",
    },
    {
      name: "Faq.Item",
      description:
        "One question and its answer: a core Details with the question as its summary. Every native details prop passes through, so a shared name makes the list exclusive.",
    },
  ],
  demos: [
    {
      title: "Four questions",
      description:
        'Every item shares name="faq", so the browser closes the others when one opens; drop the name and readers can hold two answers open to compare them. Search the page for a word inside a closed answer and the browser opens it.',
      code: `<Faq.Root aria-labelledby="faq-title">
  <h2 id="faq-title">Questions</h2>
  <Faq.List>
    <Faq.Item name="faq" summary="Does it work without JavaScript?">
      Yes. The stylesheet is static CSS and every component renders real HTML, so a page is
      presentable before any script runs. Overlays such as Modal and Popover need JavaScript
      to open, as they would anywhere.
    </Faq.Item>
    <Faq.Item name="faq" summary="Why are there no size or variant props?">
      Size comes from the container and status from a --loam-context region. A prop would
      repeat a decision the surrounding design already made, once per control.
    </Faq.Item>
    <Faq.Item name="faq" summary="Which browsers are supported?">
      Baseline Newly Available CSS is used natively, with no polyfill. A feature not yet in
      Baseline ships only as progressive enhancement, behind @supports, with its fallback in
      the same component.
    </Faq.Item>
    <Faq.Item name="faq" summary="Can I use it with an agent?">
      Yes. The package ships an AGENTS.md, every docs page has a markdown twin at the same URL
      with .md appended, and npx skills add dangerfarms/loamui installs a skill that teaches
      the library.
    </Faq.Item>
  </Faq.List>
</Faq.Root>`,
      render: () => (
        <Faq.Root aria-labelledby="faq-title">
          <h2 id="faq-title">Questions</h2>
          <Faq.List>
            <Faq.Item name="faq" summary="Does it work without JavaScript?">
              Yes. The stylesheet is static CSS and every component renders real HTML, so a page is
              presentable before any script runs. Overlays such as Modal and Popover need JavaScript
              to open, as they would anywhere.
            </Faq.Item>
            <Faq.Item name="faq" summary="Why are there no size or variant props?">
              Size comes from the container and status from a --loam-context region. A prop would
              repeat a decision the surrounding design already made, once per control.
            </Faq.Item>
            <Faq.Item name="faq" summary="Which browsers are supported?">
              Baseline Newly Available CSS is used natively, with no polyfill. A feature not yet in
              Baseline ships only as progressive enhancement, behind @supports, with its fallback in
              the same component.
            </Faq.Item>
            <Faq.Item name="faq" summary="Can I use it with an agent?">
              Yes. The package ships an AGENTS.md, every docs page has a markdown twin at the same
              URL with .md appended, and npx skills add dangerfarms/loamui installs a skill that
              teaches the library.
            </Faq.Item>
          </Faq.List>
        </Faq.Root>
      ),
    },
  ],
  whenToUse: [
    "A short list of questions readers genuinely arrive with, when the answers are secondary detail: how billing works, what happens to data on cancellation, whether a plan can change mid-term.",
    "As an exclusive set (a shared name) when readers scan for one question at a time and a second open answer would only get in the way; omit the name where they may want to compare two.",
  ],
  whenNotToUse: [
    "As the place answers live. A FAQ page is often a symptom of missing content elsewhere: if a question comes up often, put its answer on the page that raises it, under a heading that search and find-in-page reach without a click.",
    "For a long list of questions: a table of contents over plain headings serves readers better than a stack of disclosures, and a long FAQ is usually a sign that the page it answers for is unclear.",
  ],
};

export default faq;
