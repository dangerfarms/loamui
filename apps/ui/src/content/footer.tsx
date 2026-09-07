"use client";

import { Footer } from "@loamui/ui";
import type { Composition } from "./types";

const footer: Composition = {
  slug: "footer",
  name: "Footer",
  category: "Navigation",
  description:
    "A site footer: brand and tagline, columns of links and a bottom row for small print.",
  lead: "Six parts on a native footer. Each column is a nav named by its title, so a screen reader's list of the page's landmarks reads Product, Company, Support; the columns are an auto-fit grid, so they take as many across as the container allows and stack in a narrow one without a breakpoint; the brand moves beside them when there is room, and everything is set in the muted text colour because a footer is reference, not the page's voice.",
  importLine: `import { Footer } from "@loamui/ui";`,
  parts: [
    {
      name: "Footer.Root",
      description:
        "The footer landmark. Declares its own container so the layout answers the footer's width.",
    },
    {
      name: "Footer.Brand",
      description: "The logo or name around your link home, and a one-line tagline as a paragraph.",
    },
    { name: "Footer.Columns", description: "An auto-fit grid of columns." },
    {
      name: "Footer.Column",
      description:
        "One column: a nav landmark named by its Footer.ColumnTitle from the first render, then your ul of li > a items. An aria-label you pass wins; a column with no title carries no name, a plain nav, so give it one.",
    },
    {
      name: "Footer.ColumnTitle",
      description:
        "The column's heading, an h3 by default; pass render={<h2 />} where the columns sit under no h2. Its id (yours if you pass one) is what names the column.",
    },
    {
      name: "Footer.Bottom",
      description: "A wrapping flex row at the foot: a small copyright line and small links.",
    },
  ],
  demos: [
    {
      title: "Site footer",
      description:
        "Three columns of links with a brand and a bottom row, each column a nav named by its title. Narrow the preview and the columns stack.",
      code: `<Footer.Root>
  <Footer.Brand>
    <a href="/">Loam</a>
    <p>Modern UI primitives for agent-assisted developers.</p>
  </Footer.Brand>
  <Footer.Columns>
    <Footer.Column>
      <Footer.ColumnTitle>Product</Footer.ColumnTitle>
      <ul>
        <li>
          <a href="/docs">Docs</a>
        </li>
        <li>
          <a href="/components">Components</a>
        </li>
        <li>
          <a href="/pricing">Pricing</a>
        </li>
      </ul>
    </Footer.Column>
    <Footer.Column>
      <Footer.ColumnTitle>Company</Footer.ColumnTitle>
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/careers">Careers</a>
        </li>
      </ul>
    </Footer.Column>
    <Footer.Column>
      <Footer.ColumnTitle>Support</Footer.ColumnTitle>
      <ul>
        <li>
          <a href="/docs/installation">Installation</a>
        </li>
        <li>
          <a href="/status">Status</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </Footer.Column>
  </Footer.Columns>
  <Footer.Bottom>
    <small>&copy; 2026 Loam. All rights reserved.</small>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
  </Footer.Bottom>
</Footer.Root>`,
      render: () => (
        <Footer.Root>
          <Footer.Brand>
            <a href="/">Loam</a>
            <p>Modern UI primitives for agent-assisted developers.</p>
          </Footer.Brand>
          <Footer.Columns>
            <Footer.Column>
              <Footer.ColumnTitle>Product</Footer.ColumnTitle>
              <ul>
                <li>
                  <a href="/docs">Docs</a>
                </li>
                <li>
                  <a href="/components">Components</a>
                </li>
                <li>
                  <a href="/pricing">Pricing</a>
                </li>
              </ul>
            </Footer.Column>
            <Footer.Column>
              <Footer.ColumnTitle>Company</Footer.ColumnTitle>
              <ul>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
              </ul>
            </Footer.Column>
            <Footer.Column>
              <Footer.ColumnTitle>Support</Footer.ColumnTitle>
              <ul>
                <li>
                  <a href="/docs/installation">Installation</a>
                </li>
                <li>
                  <a href="/status">Status</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </Footer.Column>
          </Footer.Columns>
          <Footer.Bottom>
            <small>&copy; 2026 Loam. All rights reserved.</small>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </Footer.Bottom>
        </Footer.Root>
      ),
    },
  ],
  whenToUse: [
    "The end of every page, when a site has more destinations than the header should carry and the visitor expects the full map there.",
    "The home of the legal and housekeeping links (privacy, terms, status) that must be reachable from anywhere without competing with the page.",
  ],
  whenNotToUse: [
    "A single-page app view or a modal, where there is no site map to repeat; a footer with one link is noise, not orientation.",
    "As a place to put a call to action the page wants noticed. The muted colour and small type are there to recede; put the action in a Hero or the page body.",
  ],
};

export default footer;
