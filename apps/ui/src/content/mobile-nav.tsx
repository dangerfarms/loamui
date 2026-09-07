"use client";

import { Header, MobileNav } from "@loamui/ui";
import type { Composition } from "./types";

/** The demo's own container query: the header shows the inline nav when wide and the drawer when narrow. */
const narrowHeaderCss = `.demo-header { container-type: inline-size; }
.demo-header .drawer-nav { display: none; }
@container (width <= 40rem) {
  .demo-header .inline-nav { display: none; }
  .demo-header .drawer-nav { display: inline flow-root; }
}`;

const mobileNav: Composition = {
  slug: "mobile-nav",
  name: "Mobile navigation",
  category: "Navigation",
  description:
    "Navigation for a narrow viewport: a Menu button that opens a panel of links from the start edge, with the current page marked.",
  lead: 'A core Drawer with a specific trigger, a named panel and a list of links. The panel is a native dialog, so the top layer, focus containment, Escape and focus return to the button on close are the browser\'s. The button says "Menu" in words, not three lines alone, and reports the panel\'s state with aria-expanded; the panel is named by its Title, or "Navigation" without one, so a screen reader hears what opened. The links are yours, the same li > a list SideNav uses, with aria-current="page" on the page in view. Where it appears is your layout: a container query on the header, not a prop.',
  importLine: `import { MobileNav } from "@loamui/ui";`,
  parts: [
    {
      name: "MobileNav.Root",
      description:
        "The composition's own span around the core Drawer.Root, which renders no element of its own. Holds the open state, uncontrolled by default or controlled through open and onOpenChange, so the Trigger can say it. className, style and ref land on the span.",
    },
    {
      name: "MobileNav.Trigger",
      description:
        'The button that opens the panel: core Drawer.Trigger, a Button that says "Menu" (labels.open, or your children) in words. It carries aria-expanded for the panel\'s state and aria-controls for the panel once it is mounted. render substitutes the element, as on any core trigger.',
    },
    {
      name: "MobileNav.Popup",
      description:
        'The panel: core Drawer.Popup anchored to the start edge (side, "start" by default), left as core renders it. Named by its Title while one is rendered, the way any Drawer is; without one it carries labels.navigation, "Navigation", as its aria-label, so it is never an anonymous dialog. Every prop, ref included, lands on the dialog.',
    },
    {
      name: "MobileNav.Title",
      description:
        "The panel's heading, core Drawer.Title: an h2 that names the dialog. The site's name, or Menu.",
    },
    {
      name: "MobileNav.List",
      description:
        "An unordered list with no markers, one link per item, each line sized for a thumb: 2.75rem is the smallest target a finger hits reliably.",
    },
    {
      name: "MobileNav.Item",
      description:
        'One entry, an li around your link: an a href, or your router\'s link, with aria-current="page" on the page in view and, for an icon, an aria-hidden svg before the text.',
    },
    {
      name: "MobileNav.Close",
      description:
        'The button that closes the panel: core Drawer.Close, a Button that says "Close" (labels.close, or your children). Escape and a click outside close it as well; this is the visible way, for a thumb.',
    },
  ],
  demos: [
    {
      title: "In a header",
      description:
        "The trigger sits in Header.Actions, where a menu button belongs, and the panel holds the same links the header's nav would. Open it: the first focusable thing in the panel takes focus, Escape or Close puts focus back on the button, and the page behind is inert. The current page is marked in the markup and the stylesheet draws its line and weight.",
      code: `<Header.Root>
  <Header.Brand>
    <a href="/">Loam</a>
  </Header.Brand>
  <Header.Actions>
    <MobileNav.Root>
      <MobileNav.Trigger />
      <MobileNav.Popup>
        <MobileNav.Title>Loam</MobileNav.Title>
        <MobileNav.List>
          <MobileNav.Item>
            <a href="/docs" aria-current="page">Docs</a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/components">Components</a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/pricing">Pricing</a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/blog">Blog</a>
          </MobileNav.Item>
        </MobileNav.List>
        <MobileNav.Close />
      </MobileNav.Popup>
    </MobileNav.Root>
  </Header.Actions>
</Header.Root>`,
      render: () => (
        <Header.Root>
          <Header.Brand>
            <a href="/">Loam</a>
          </Header.Brand>
          <Header.Actions>
            <MobileNav.Root>
              <MobileNav.Trigger />
              <MobileNav.Popup>
                <MobileNav.Title>Loam</MobileNav.Title>
                <MobileNav.List>
                  <MobileNav.Item>
                    <a href="/docs" aria-current="page">
                      Docs
                    </a>
                  </MobileNav.Item>
                  <MobileNav.Item>
                    <a href="/components">Components</a>
                  </MobileNav.Item>
                  <MobileNav.Item>
                    <a href="/pricing">Pricing</a>
                  </MobileNav.Item>
                  <MobileNav.Item>
                    <a href="/blog">Blog</a>
                  </MobileNav.Item>
                </MobileNav.List>
                <MobileNav.Close />
              </MobileNav.Popup>
            </MobileNav.Root>
          </Header.Actions>
        </Header.Root>
      ),
    },
    {
      title: "Only when the header is narrow",
      description:
        "Where the drawer appears is the consumer's layout, not a prop. Here the header is a container, the inline Header.Nav shows when it is wider than 40rem and the MobileNav takes its place below that: a container query on two class names of your own, so the same header works in a narrow column of a wide page. Narrow the window, or the column this preview sits in, to see the swap. Both navs hold the same links, so nothing is reachable in one width and not the other.",
      code: `<style>{\`
.demo-header { container-type: inline-size; }
.demo-header .drawer-nav { display: none; }
@container (width <= 40rem) {
  .demo-header .inline-nav { display: none; }
  .demo-header .drawer-nav { display: inline flow-root; }
}
\`}</style>
<Header.Root className="demo-header">
  <Header.Brand>
    <a href="/">Loam</a>
  </Header.Brand>
  <Header.Nav aria-label="Primary" className="inline-nav">
    <li>
      <a href="/docs" aria-current="page">Docs</a>
    </li>
    <li>
      <a href="/components">Components</a>
    </li>
    <li>
      <a href="/pricing">Pricing</a>
    </li>
  </Header.Nav>
  <Header.Actions>
    <MobileNav.Root className="drawer-nav">
      <MobileNav.Trigger />
      <MobileNav.Popup>
        <MobileNav.Title>Loam</MobileNav.Title>
        <MobileNav.List>
          <MobileNav.Item>
            <a href="/docs" aria-current="page">Docs</a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/components">Components</a>
          </MobileNav.Item>
          <MobileNav.Item>
            <a href="/pricing">Pricing</a>
          </MobileNav.Item>
        </MobileNav.List>
        <MobileNav.Close />
      </MobileNav.Popup>
    </MobileNav.Root>
  </Header.Actions>
</Header.Root>`,
      render: () => (
        <>
          <style>{narrowHeaderCss}</style>
          <Header.Root className="demo-header">
            <Header.Brand>
              <a href="/">Loam</a>
            </Header.Brand>
            <Header.Nav aria-label="Primary" className="inline-nav">
              <li>
                <a href="/docs" aria-current="page">
                  Docs
                </a>
              </li>
              <li>
                <a href="/components">Components</a>
              </li>
              <li>
                <a href="/pricing">Pricing</a>
              </li>
            </Header.Nav>
            <Header.Actions>
              <MobileNav.Root className="drawer-nav">
                <MobileNav.Trigger />
                <MobileNav.Popup>
                  <MobileNav.Title>Loam</MobileNav.Title>
                  <MobileNav.List>
                    <MobileNav.Item>
                      <a href="/docs" aria-current="page">
                        Docs
                      </a>
                    </MobileNav.Item>
                    <MobileNav.Item>
                      <a href="/components">Components</a>
                    </MobileNav.Item>
                    <MobileNav.Item>
                      <a href="/pricing">Pricing</a>
                    </MobileNav.Item>
                  </MobileNav.List>
                  <MobileNav.Close />
                </MobileNav.Popup>
              </MobileNav.Root>
            </Header.Actions>
          </Header.Root>
        </>
      ),
    },
    {
      title: "In another language",
      description:
        'Every word the composition says on its own is a label with an English default: the trigger\'s "Menu", the panel\'s "Navigation" when it has no Title, the close button\'s "Close". A page in French passes its own and nothing is forked.',
      code: `<MobileNav.Root>
  <MobileNav.Trigger labels={{ open: "Menu principal" }} />
  <MobileNav.Popup labels={{ navigation: "Navigation principale" }}>
    <MobileNav.List>
      <MobileNav.Item>
        <a href="/" aria-current="page">Accueil</a>
      </MobileNav.Item>
      <MobileNav.Item>
        <a href="/tarifs">Tarifs</a>
      </MobileNav.Item>
    </MobileNav.List>
    <MobileNav.Close labels={{ close: "Fermer" }} />
  </MobileNav.Popup>
</MobileNav.Root>`,
      render: () => (
        <MobileNav.Root>
          <MobileNav.Trigger labels={{ open: "Menu principal" }} />
          <MobileNav.Popup labels={{ navigation: "Navigation principale" }}>
            <MobileNav.List>
              <MobileNav.Item>
                <a href="/" aria-current="page">
                  Accueil
                </a>
              </MobileNav.Item>
              <MobileNav.Item>
                <a href="/tarifs">Tarifs</a>
              </MobileNav.Item>
            </MobileNav.List>
            <MobileNav.Close labels={{ close: "Fermer" }} />
          </MobileNav.Popup>
        </MobileNav.Root>
      ),
    },
  ],
  whenToUse: [
    "A site header whose links no longer fit on one row in a narrow viewport: the same links, behind a button that says what it is, in a panel the browser makes modal.",
    "An application shell whose SideNav has no column to live in on a phone: the same list, in a drawer from the start edge.",
  ],
  whenNotToUse: [
    "A header with four or five short links. Header.Nav wraps beneath the brand by itself in a narrow container; a button that hides four links costs a tap for nothing.",
    "The account's own actions: that is UserMenu, a menu, not a navigation panel; the two can sit side by side in Header.Actions.",
    "Anywhere the viewport is wide. The panel is for a width that cannot hold the links; hide the trigger with a container query when it can, rather than opening a drawer on a desktop.",
  ],
};

export default mobileNav;
