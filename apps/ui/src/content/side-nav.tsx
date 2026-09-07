"use client";

import { SideNav } from "@loamui/ui";
import type { Composition } from "./types";

const sideNav: Composition = {
  slug: "side-nav",
  name: "Side navigation",
  category: "Navigation",
  description:
    "Vertical navigation for an application or a documentation site: lists of links, the current page marked, related pages folded into groups.",
  lead: 'Six parts on a native nav. The links are yours, an a inside each Item, so a router and a static site drive it the same way: write the href, set aria-current="page" on the page in view and the stylesheet marks it with a line and weight, never colour alone. A group is the composition\'s own details element, so it folds without JavaScript and remembers nothing; the group holding the current page is the one you mark open. A Title names the nav; without one it is "Main".',
  importLine: `import { SideNav } from "@loamui/ui";`,
  parts: [
    {
      name: "SideNav.Root",
      description:
        'The nav landmark. A Title inside names it; without one its aria-label defaults to "Main", since a side nav is usually the primary one. An aria-label you pass wins over the Title, and an aria-labelledby over both; give a second nav on the page a different name. Width and stickiness are your layout, not props.',
    },
    {
      name: "SideNav.Title",
      description:
        "A small uppercase label above a list, a paragraph rather than a heading so it never enters the page's outline. It carries an id (yours if you pass one) and names the nav: with several Titles every one is part of the name, so give a nav with several sections an aria-label of its own.",
    },
    {
      name: "SideNav.List",
      description:
        "An unordered list with no markers. Nest one inside an Item to indent a level, or inside a Group to fold it.",
    },
    {
      name: "SideNav.Item",
      description:
        'One entry, an li around your link: an a href, or your router\'s link, with aria-current="page" on the page in view and, for an icon, an aria-hidden svg before the text, sized on it. Or a Group; then an optional nested List. An icon-only rail is your CSS on your own container, keeping the text in the markup (visually hidden) so every link keeps its name.',
    },
    {
      name: "SideNav.Group",
      description:
        "A collapsible group: the composition's own details element, not core's Details, which is a boxed surface where a group in a nav is a line among lines. A GroupTitle first, then a nested List. Pass open on the group that holds the current page; share a name across groups and the browser keeps one open at a time.",
    },
    {
      name: "SideNav.GroupTitle",
      description:
        "The group's always-visible line, a summary, set like the links around it with a chevron at its end.",
    },
  ],
  demos: [
    {
      title: "An application",
      description:
        'The current page is marked in the markup, and the stylesheet draws its line, weight and background. The Reports group is marked open here so its links show; in your app, open the group that holds the current page. Close it and the nav still works, because the disclosure is native. With no Title and no label the nav is named "Main".',
      code: `<SideNav.Root>
  <SideNav.List>
    <SideNav.Item>
      <a href="/">Dashboard</a>
    </SideNav.Item>
    <SideNav.Item>
      <a href="/projects" aria-current="page">
        Projects
      </a>
    </SideNav.Item>
    <SideNav.Item>
      <a href="/team">Team</a>
    </SideNav.Item>
    <SideNav.Item>
      <a href="/settings">Settings</a>
    </SideNav.Item>
    <SideNav.Item>
      <SideNav.Group open>
        <SideNav.GroupTitle>Reports</SideNav.GroupTitle>
        <SideNav.List>
          <SideNav.Item>
            <a href="/reports/weekly">Weekly</a>
          </SideNav.Item>
          <SideNav.Item>
            <a href="/reports/monthly">Monthly</a>
          </SideNav.Item>
          <SideNav.Item>
            <a href="/reports/annual">Annual</a>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Group>
    </SideNav.Item>
  </SideNav.List>
</SideNav.Root>`,
      render: () => (
        <SideNav.Root>
          <SideNav.List>
            <SideNav.Item>
              <a href="/">Dashboard</a>
            </SideNav.Item>
            <SideNav.Item>
              <a href="/projects" aria-current="page">
                Projects
              </a>
            </SideNav.Item>
            <SideNav.Item>
              <a href="/team">Team</a>
            </SideNav.Item>
            <SideNav.Item>
              <a href="/settings">Settings</a>
            </SideNav.Item>
            <SideNav.Item>
              <SideNav.Group open>
                <SideNav.GroupTitle>Reports</SideNav.GroupTitle>
                <SideNav.List>
                  <SideNav.Item>
                    <a href="/reports/weekly">Weekly</a>
                  </SideNav.Item>
                  <SideNav.Item>
                    <a href="/reports/monthly">Monthly</a>
                  </SideNav.Item>
                  <SideNav.Item>
                    <a href="/reports/annual">Annual</a>
                  </SideNav.Item>
                </SideNav.List>
              </SideNav.Group>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Root>
      ),
    },
    {
      title: "With icons",
      description:
        "Each icon is an svg you write before the text, aria-hidden so the link is named by its text alone, and sized on the text so it scales with it.",
      code: `<SideNav.Root>
  <SideNav.List>
    <SideNav.Item>
      <a href="/">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        Dashboard
      </a>
    </SideNav.Item>
    <SideNav.Item>
      <a href="/projects" aria-current="page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        Projects
      </a>
    </SideNav.Item>
    <SideNav.Item>
      <a href="/team">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
        </svg>
        Team
      </a>
    </SideNav.Item>
    <SideNav.Item>
      <a href="/settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h10M18 17h2" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="8" cy="12" r="2" />
          <circle cx="16" cy="17" r="2" />
        </svg>
        Settings
      </a>
    </SideNav.Item>
  </SideNav.List>
</SideNav.Root>`,
      render: () => (
        <SideNav.Root>
          <SideNav.List>
            <SideNav.Item>
              <a href="/">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                Dashboard
              </a>
            </SideNav.Item>
            <SideNav.Item>
              <a href="/projects" aria-current="page">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Projects
              </a>
            </SideNav.Item>
            <SideNav.Item>
              <a href="/team">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                  <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
                </svg>
                Team
              </a>
            </SideNav.Item>
            <SideNav.Item>
              <a href="/settings">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h10M18 17h2" />
                  <circle cx="16" cy="7" r="2" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="17" r="2" />
                </svg>
                Settings
              </a>
            </SideNav.Item>
          </SideNav.List>
        </SideNav.Root>
      ),
    },
    {
      title: "In a narrow column",
      description:
        "Width is the parent's: here a 14rem column. The nav sizes to it, a long label wraps inside its link, and the marker stays on the start edge. Two Titles head two lists, so the nav is given a name of its own rather than both Titles joined.",
      code: `<div style={{ maxInlineSize: "14rem" }}>
  <SideNav.Root aria-label="Documentation">
    <SideNav.Title>Getting started</SideNav.Title>
    <SideNav.List>
      <SideNav.Item>
        <a href="/docs/introduction">Introduction</a>
      </SideNav.Item>
      <SideNav.Item>
        <a href="/docs/installation" aria-current="page">
          Installation and first render
        </a>
      </SideNav.Item>
    </SideNav.List>
    <SideNav.Title>Guides</SideNav.Title>
    <SideNav.List>
      <SideNav.Item>
        <a href="/docs/composing">Composing</a>
      </SideNav.Item>
      <SideNav.Item>
        <a href="/docs/layout">Layout</a>
        <SideNav.List>
          <SideNav.Item>
            <a href="/docs/layout/grid">Grid</a>
          </SideNav.Item>
          <SideNav.Item>
            <a href="/docs/layout/flow">Flow</a>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Item>
    </SideNav.List>
  </SideNav.Root>
</div>`,
      render: () => (
        <div style={{ maxInlineSize: "14rem" }}>
          <SideNav.Root aria-label="Documentation">
            <SideNav.Title>Getting started</SideNav.Title>
            <SideNav.List>
              <SideNav.Item>
                <a href="/docs/introduction">Introduction</a>
              </SideNav.Item>
              <SideNav.Item>
                <a href="/docs/installation" aria-current="page">
                  Installation and first render
                </a>
              </SideNav.Item>
            </SideNav.List>
            <SideNav.Title>Guides</SideNav.Title>
            <SideNav.List>
              <SideNav.Item>
                <a href="/docs/composing">Composing</a>
              </SideNav.Item>
              <SideNav.Item>
                <a href="/docs/layout">Layout</a>
                <SideNav.List>
                  <SideNav.Item>
                    <a href="/docs/layout/grid">Grid</a>
                  </SideNav.Item>
                  <SideNav.Item>
                    <a href="/docs/layout/flow">Flow</a>
                  </SideNav.Item>
                </SideNav.List>
              </SideNav.Item>
            </SideNav.List>
          </SideNav.Root>
        </div>
      ),
    },
  ],
  whenToUse: [
    "An application shell with more destinations than a header row holds, where the visitor moves between sections all day and should always see which one they are in.",
    "A documentation site whose pages fall into named sections, some of them long enough to fold away until they are wanted.",
  ],
  whenNotToUse: [
    "A site with five links. That is a Header: one row across the top, no column to give up.",
    "The headings of the page in view. That is a TableOfContents, which marks the section in view rather than the page.",
  ],
};

export default sideNav;
