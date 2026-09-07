"use client";

import { Footer, SocialLinks } from "@loamui/ui";
import type { Composition } from "./types";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function BlueskyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 10.8c-1.1-2.1-4-6-6.8-8C2.6 1 1.5 1.3 1.5 4.7c0 .7.4 5.7.6 6.5.8 2.8 3.7 3.8 6.3 3.5-4.6.8-5.8 3.3-3.3 5.9 4.8 4.9 6.9-1.2 7-2.8.1 1.6 2.2 7.7 7 2.8 2.5-2.6 1.3-5.1-3.3-5.9 2.6.3 5.5-.7 6.3-3.5.2-.8.6-5.8.6-6.5 0-3.4-1.1-3.7-3.7-1.9-2.8 2-5.7 5.9-6.8 8Z" />
    </svg>
  );
}

function MastodonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.3 13.6c-.3 1.6-2.8 3.4-5.7 3.7-1.5.2-3 .3-4.5.3-2.5-.1-4.5-.6-4.5-.6v.7c.4 2.4 2.4 2.6 4.4 2.7 2 .1 3.7-.5 3.7-.5l.1 1.8s-1.4.7-3.9.9c-1.4.1-3.1 0-5-.6C1.6 20.9.9 16.3.8 11.7V7.9c0-4.7 3.1-6.1 3.1-6.1C5.4.9 8.1.8 11.9.8h.1c3.8 0 6.5.1 8.1 1 0 0 3.1 1.4 3.1 6.1 0 0 0 3.5-.4 5.9ZM18 8.1v5.7h-2.3V8.3c0-1.1-.5-1.7-1.4-1.7-1 0-1.6.7-1.6 2v2.9h-2.2V8.6c0-1.3-.5-2-1.6-2-1 0-1.4.6-1.4 1.7v5.5H5.3V8.1c0-1.1.3-2 .9-2.7.6-.7 1.4-1 2.3-1 1.1 0 2 .4 2.5 1.3l.6.9.6-.9c.6-.9 1.4-1.3 2.5-1.3 1 0 1.7.3 2.3 1 .7.7 1 1.6 1 2.7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd">
      <path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6ZM8 19H5V9h3v10ZM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.6 2 3.6 4.5V19Z" />
    </svg>
  );
}

const socialLinks: Composition = {
  slug: "social-links",
  name: "Social links",
  category: "Navigation",
  description: "A row of icon-only links to profiles, each named by hidden text.",
  lead: 'An icon-only link is a link with no name unless something gives it one, so Link takes a required label and renders it as visually hidden text inside the anchor: it is the accessible name, it translates, and it shows in reader mode, none of which an aria-label does. The icon is hidden from assistive technology for you, every target is floored at 24px with a gap between targets, the icon follows the surrounding font size, the list is a nav landmark named Social, and each link says rel="me", the IndieWeb identity rel, because these are the site\'s own profiles.',
  importLine: `import { SocialLinks } from "@loamui/ui";`,
  parts: [
    {
      name: "SocialLinks.Root",
      description:
        'A nav landmark, named "Social" unless you pass aria-label, around a ul of items. Declares its own container.',
    },
    { name: "SocialLinks.Item", description: "One entry, an li." },
    {
      name: "SocialLinks.Link",
      description:
        'The link. Takes a required label, the profile\'s name, and your svg as its child; rel defaults to "me".',
    },
  ],
  demos: [
    {
      title: "Profiles",
      description:
        "Four profiles. The svg is the child; the label is the name. No icon set ships with the library, so bring your own glyphs.",
      code: `<SocialLinks.Root>
  <SocialLinks.Item>
    <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
      <GitHubIcon />
    </SocialLinks.Link>
  </SocialLinks.Item>
  <SocialLinks.Item>
    <SocialLinks.Link href="https://bsky.app/profile/loamui.com" label="Bluesky">
      <BlueskyIcon />
    </SocialLinks.Link>
  </SocialLinks.Item>
  <SocialLinks.Item>
    <SocialLinks.Link href="https://mastodon.social/@loamui" label="Mastodon">
      <MastodonIcon />
    </SocialLinks.Link>
  </SocialLinks.Item>
  <SocialLinks.Item>
    <SocialLinks.Link href="https://www.linkedin.com/company/loamui" label="LinkedIn">
      <LinkedInIcon />
    </SocialLinks.Link>
  </SocialLinks.Item>
</SocialLinks.Root>`,
      render: () => (
        <SocialLinks.Root>
          <SocialLinks.Item>
            <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
              <GitHubIcon />
            </SocialLinks.Link>
          </SocialLinks.Item>
          <SocialLinks.Item>
            <SocialLinks.Link href="https://bsky.app/profile/loamui.com" label="Bluesky">
              <BlueskyIcon />
            </SocialLinks.Link>
          </SocialLinks.Item>
          <SocialLinks.Item>
            <SocialLinks.Link href="https://mastodon.social/@loamui" label="Mastodon">
              <MastodonIcon />
            </SocialLinks.Link>
          </SocialLinks.Item>
          <SocialLinks.Item>
            <SocialLinks.Link href="https://www.linkedin.com/company/loamui" label="LinkedIn">
              <LinkedInIcon />
            </SocialLinks.Link>
          </SocialLinks.Item>
        </SocialLinks.Root>
      ),
    },
    {
      title: "In a footer",
      description:
        "Where the row usually lives: the bottom row of a Footer, after the copyright line. The icons take the footer's small type and its muted colour, and the nav stays its own landmark.",
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
      </ul>
    </Footer.Column>
  </Footer.Columns>
  <Footer.Bottom>
    <small>&copy; 2026 Loam. All rights reserved.</small>
    <SocialLinks.Root>
      <SocialLinks.Item>
        <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
          <GitHubIcon />
        </SocialLinks.Link>
      </SocialLinks.Item>
      <SocialLinks.Item>
        <SocialLinks.Link href="https://bsky.app/profile/loamui.com" label="Bluesky">
          <BlueskyIcon />
        </SocialLinks.Link>
      </SocialLinks.Item>
      <SocialLinks.Item>
        <SocialLinks.Link href="https://mastodon.social/@loamui" label="Mastodon">
          <MastodonIcon />
        </SocialLinks.Link>
      </SocialLinks.Item>
    </SocialLinks.Root>
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
              </ul>
            </Footer.Column>
          </Footer.Columns>
          <Footer.Bottom>
            <small>&copy; 2026 Loam. All rights reserved.</small>
            <SocialLinks.Root>
              <SocialLinks.Item>
                <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
                  <GitHubIcon />
                </SocialLinks.Link>
              </SocialLinks.Item>
              <SocialLinks.Item>
                <SocialLinks.Link href="https://bsky.app/profile/loamui.com" label="Bluesky">
                  <BlueskyIcon />
                </SocialLinks.Link>
              </SocialLinks.Item>
              <SocialLinks.Item>
                <SocialLinks.Link href="https://mastodon.social/@loamui" label="Mastodon">
                  <MastodonIcon />
                </SocialLinks.Link>
              </SocialLinks.Item>
            </SocialLinks.Root>
          </Footer.Bottom>
        </Footer.Root>
      ),
    },
  ],
  whenToUse: [
    "The site's own profiles, wherever they are listed: a footer's bottom row, a header's actions, the end of an about page.",
    'A person\'s profiles on an author bio or a team card; pass a name for the landmark ("Follow Priya") and a rel other than "me", since the profile is theirs, not the site\'s.',
  ],
  whenNotToUse: [
    "Links with visible text. A list of named links belongs in a Footer.Column or a plain ul; the hidden label exists only because the icon stands alone.",
    "Sharing controls that post on the reader's behalf. Those act rather than navigate, so they are Buttons, and the reader should see the words.",
  ],
};

export default socialLinks;
