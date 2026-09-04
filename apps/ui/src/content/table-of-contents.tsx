"use client";

import { TableOfContents } from "@loamui/ui";
import type { Composition } from "./types";

const tableOfContents: Composition = {
  slug: "table-of-contents",
  name: "Table of contents",
  category: "Blog",
  description:
    "A table of contents for the page in view: a small label over a list of links to the headings, with the current section marked.",
  lead: 'Four parts on a native nav. The links are yours, so a static page and one that tracks the scroll position drive it the same way: write the anchors, set aria-current="location" on the section in view and the stylesheet marks it; stickiness is your CSS, not a prop.',
  importLine: `import { TableOfContents } from "@loamui/ui";`,
  parts: [
    {
      name: "TableOfContents.Root",
      description:
        "The nav landmark. Requires an aria-label, because a page with more than one nav needs each named. Make it sticky with your own CSS if the page wants that.",
    },
    {
      name: "TableOfContents.Title",
      description: "A small uppercase label above the list, a paragraph rather than a heading.",
    },
    {
      name: "TableOfContents.List",
      description:
        "An ordered list with no markers and a line down its start edge. Nest one inside an Item to indent a level.",
    },
    {
      name: "TableOfContents.Item",
      description:
        'One entry, wrapping your a href="#id". Set aria-current="location" on the link whose section is in view.',
    },
  ],
  demos: [
    {
      title: "Five headings, one nested",
      description:
        "The current section is marked in the markup with aria-current, and the stylesheet draws its marker over the list's line. The nested list drops the line and indents its links instead, so every marker sits on the same edge.",
      code: `<TableOfContents.Root aria-label="On this page">
  <TableOfContents.Title>On this page</TableOfContents.Title>
  <TableOfContents.List>
    <TableOfContents.Item>
      <a href="#tokens">Tokens</a>
    </TableOfContents.Item>
    <TableOfContents.Item>
      <a href="#element-styles" aria-current="location">
        Element styles
      </a>
      <TableOfContents.List>
        <TableOfContents.Item>
          <a href="#headings">Headings</a>
        </TableOfContents.Item>
        <TableOfContents.Item>
          <a href="#forms">Forms</a>
        </TableOfContents.Item>
      </TableOfContents.List>
    </TableOfContents.Item>
    <TableOfContents.Item>
      <a href="#components">Components</a>
    </TableOfContents.Item>
    <TableOfContents.Item>
      <a href="#contextualism">Contextualism</a>
    </TableOfContents.Item>
  </TableOfContents.List>
</TableOfContents.Root>`,
      render: () => (
        <TableOfContents.Root aria-label="On this page">
          <TableOfContents.Title>On this page</TableOfContents.Title>
          <TableOfContents.List>
            <TableOfContents.Item>
              <a href="#tokens">Tokens</a>
            </TableOfContents.Item>
            <TableOfContents.Item>
              <a href="#element-styles" aria-current="location">
                Element styles
              </a>
              <TableOfContents.List>
                <TableOfContents.Item>
                  <a href="#headings">Headings</a>
                </TableOfContents.Item>
                <TableOfContents.Item>
                  <a href="#forms">Forms</a>
                </TableOfContents.Item>
              </TableOfContents.List>
            </TableOfContents.Item>
            <TableOfContents.Item>
              <a href="#components">Components</a>
            </TableOfContents.Item>
            <TableOfContents.Item>
              <a href="#contextualism">Contextualism</a>
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents.Root>
      ),
    },
  ],
  whenToUse: [
    "A long article or reference page with several headings, where a reader wants to jump to one section or see how far through they are.",
    "Beside the content in a wide layout, made sticky with your own CSS, so the current marker follows the reader as they scroll.",
  ],
  whenNotToUse: [
    'Navigation between pages: that is a Header nav or a sidebar, and its current item is a page, marked aria-current="page".',
    "A page with two or three headings: the list would be as long as the page it describes, and a reader can see the headings without it.",
  ],
};

export default tableOfContents;
