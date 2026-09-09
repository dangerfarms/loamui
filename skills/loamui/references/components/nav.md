---
title: Nav
description: Lists of links with the current one marked.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Nav

Vertical navigation composed from parts: a landmark named by its title, lists of links with the current one marked by a line and weight, related links folded into native disclosures, and a hook that tells a table of contents which section the reader is in.

## Import

```tsx
import { Nav, useScrollSpy } from "@loamui/core";
```

## Usage

### A side nav

The nav is named by its Title from the first render, so a screen reader's list of landmarks reads “Workspace navigation” without the words written twice. The current page is marked with current, and the stylesheet draws its line, weight and background from the aria-current attribute that sets. An icon is an svg before the text, aria-hidden and sized on it.

```tsx
<Nav.Root>
  <Nav.Title>Workspace</Nav.Title>
  <Nav.List>
    <Nav.Item>
      <Nav.Link href="/">
        <DashboardIcon />
        Dashboard
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/projects" current>
        <FolderIcon />
        Projects
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/team">
        <PeopleIcon />
        Team
      </Nav.Link>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
```

### Nested lists

A List inside an Item indents a level, by --loam-nav-indent. The nesting is real list nesting, so a screen reader reports the level and the count at each.

```tsx
<Nav.Root>
  <Nav.Title>Guides</Nav.Title>
  <Nav.List>
    <Nav.Item>
      <Nav.Link href="/tokens">Tokens</Nav.Link>
      <Nav.List>
        <Nav.Item>
          <Nav.Link href="/tokens/colour">Colour</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/tokens/type" current>
            Type
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/tokens/space">Space</Nav.Link>
        </Nav.Item>
      </Nav.List>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/elements">Element styles</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/components">Components</Nav.Link>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
```

### Several sections

One Root carries one name, so a sidebar with several titled sections is one Root per section, stacked. The stylesheet spaces one Root from the next, and a screen reader lists each section as its own landmark, named by its Title.

```tsx
<Nav.Root>
  <Nav.Title>Workspace</Nav.Title>
  <Nav.List>
    <Nav.Item>
      <Nav.Link href="/" current>
        Dashboard
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/projects">Projects</Nav.Link>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
<Nav.Root>
  <Nav.Title>Account</Nav.Title>
  <Nav.List>
    <Nav.Item>
      <Nav.Link href="/profile">Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/billing">Billing</Nav.Link>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
```

### Groups

A Group is a native details, so it folds without JavaScript and its title is a summary the keyboard already knows. Controlled here so the two groups share one open state; uncontrolled, pass defaultOpen, or share a name across groups and the browser keeps one open at a time. Close Reports and its title takes the marker: the current page is never folded out of sight.

```tsx
const [open, setOpen] = useState("reports");

<Nav.Root>
  <Nav.List>
    <Nav.Item>
      <Nav.Link href="/">Dashboard</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Group open={open === "reports"} onOpenChange={(o: boolean) => setOpen(o ? "reports" : "")}>
        <Nav.GroupTitle>Reports</Nav.GroupTitle>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/reports/weekly" current>
              Weekly
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/reports/monthly">Monthly</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Group>
    </Nav.Item>
    <Nav.Item>
      <Nav.Group open={open === "settings"} onOpenChange={(o: boolean) => setOpen(o ? "settings" : "")}>
        <Nav.GroupTitle>Settings</Nav.GroupTitle>
        <Nav.List>
          <Nav.Item>
            <Nav.Link href="/settings/profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/settings/billing">Billing</Nav.Link>
          </Nav.Item>
        </Nav.List>
      </Nav.Group>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
```

### Router links and other words

Link takes a router's link through render and the wiring (aria-current, the part's class) merges onto it. Without a Title the nav is named by labels.navigation, so a page in another language names its landmark in its own words.

```tsx
import Link from "next/link";

<Nav.Root labels={{ navigation: "Dokumentation" }}>
  <Nav.List>
    <Nav.Item>
      <Nav.Link render={<Link href="/docs/components/breadcrumbs" />}>Breadcrumbs</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link render={<Link href="/docs/components/nav" />} current>
        Nav
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link render={<Link href="/docs/components/pagination" />}>Pagination</Nav.Link>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
```

### Inline, for a header

The primitive is vertical; a horizontal nav is your flex row on the List, and --loam-nav-current-edge: block-end on the Root moves the current marker under the link. Everything else holds: the landmark's name, the current page's weight, the icons. Give a page's second nav an aria-label so the two are told apart.

```tsx
/* header.css */
.site-nav {
  --loam-nav-current-edge: block-end;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--loam-space-xs);
  }
}

<Nav.Root className="site-nav" aria-label="Site">
  <Nav.List>
    <Nav.Item>
      <Nav.Link href="/docs" current>
        Docs
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/pricing">Pricing</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/blog">Blog</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/about">About</Nav.Link>
    </Nav.Item>
  </Nav.List>
</Nav.Root>
```

### A table of contents that follows the reader

useScrollSpy takes the headings' ids and returns the one in view. Scroll the text and the marker moves. The link says current="location", not page: the reader is still on this page, at a place within it, which is what aria-current="location" means. The list is the same Nav; only the current word changes.

```tsx
const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "planting", title: "Planting" },
  { id: "irrigation", title: "Irrigation" },
  { id: "harvest", title: "Harvest" },
];

function TableOfContents() {
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  return (
    <Nav.Root>
      <Nav.Title>On this page</Nav.Title>
      <Nav.List>
        {SECTIONS.map((section) => (
          <Nav.Item key={section.id}>
            <Nav.Link href={"#" + section.id} current={active === section.id && "location"}>
              {section.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav.List>
    </Nav.Root>
  );
}
```

## When to use it

- A side nav for an application or a documentation site: lists of links, the current page marked, related pages folded into groups.
- A table of contents beside a long page, with useScrollSpy marking the section in view.
- A column of links in a footer, or the list inside a mobile menu: the same parts, named by their Title, with the current page marked the same way everywhere.

## When not to

- The path to the current page: that is Breadcrumbs, one link per ancestor.
- Pages of one result set: that is Pagination, whose links are Buttons and whose window has ellipses.
- Panels of content on one page switched in place: that is Tabs, which carries the tab and panel semantics.
- A list of actions opened from a button: that is Menu. A nav holds destinations; an action that changes something is a button, not a link.

## How it works

### Named from the first render

A page has several navs (a header, a sidebar, a table of contents, a footer column), and a screen reader lists them by name, so each needs one. One Root carries one name: a sidebar with several titled sections is one Root per section, stacked, and the stylesheet spaces them. The Root mints an id and points aria-labelledby at it in the server HTML; the Title renders that id, so the name is right before any JavaScript runs. If no Title registers, the reference is dropped after mount (a dangling aria-labelledby is an error) and labels.navigation names the nav instead. An aria-label or aria-labelledby you pass wins over both.

### The current page is a line and a weight

current sets aria-current on the link, and the stylesheet draws the current line from that attribute: a bar on the start edge, a heavier weight and a subtle background. Three signals, so the state survives a flattened background, a colour-blind reader and forced colours, where the bar is drawn in the system highlight. The bar's space is reserved on every line by a transparent border, so marking a page never shifts its text.

### The Link exists for its judgment

An <a> in an <li> needs no component. Nav.Link exists because it adds what a bare link leaves to memory: aria-current from a boolean, a class that styles whatever element render substitutes, an icon detected as a child, and the href forwarded either way. Pass a router's link through render and its own props win; the wiring merges on.

### A group is a details element

Related links fold into a native details with a summary as its title, so the fold works before JavaScript, the keyboard already knows it, and the browser keeps one group open at a time when they share a name. open, defaultOpen and onOpenChange follow the library's controlled-or-not contract. A group holding the current page takes the weight on its title, and while closed the marker too, so where the reader is never disappears into a fold.

### Vertical is the primitive; inline is a row

The List is a column. A header's horizontal nav is display: flex on the List in your own CSS, and nothing else changes: not the landmark, not the icons. The current marker is the one thing a row changes, since a bar on the start edge reads as a column's: --loam-nav-current-edge: block-end on the Root draws it under the link instead. A custom property, not a prop, because the edge is a fact of the layout around the nav, declared once where that layout is.

### Page or location

current={true} says aria-current="page": the reader is on that page. A table of contents marks a place within the page, so it says current="location" instead; a wizard's steps say "step". The attribute is announced, and the stylesheet marks every value the same way, so choose the word that is true.

## Accessibility

- The Root is a <nav> landmark, named by its Title (aria-labelledby, from the first render) or by labels.navigation (aria-label); your own name wins. Name every nav on a page differently.
- Lists are real <ul> and <li> elements, nested where the navigation nests, so a screen reader reports levels and counts.
- The current destination carries aria-current ("page", "location" or another token), and the stylesheet draws its line, weight and background from that same attribute; under forced colours the marker is drawn in Highlight.
- A Group is a native <details>/<summary>: Enter and Space toggle it, and a closed group holding the current page shows the marker on its title.
- Icons are svg children, sized on the text; keep them aria-hidden so each link is named by its words alone.

## Parts

### Nav.Root

The <nav> landmark; native <nav> props and ref are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `labels` | `{ navigation?: string }` | `{ navigation: "Navigation" }` | The landmark's accessible name while no Title is rendered. A Title names the nav by itself; an aria-label or aria-labelledby you pass wins over both. |

### Nav.Title

A small label above the lists, a <p> by default; it renders the id that names the nav (yours if you pass one). Native props and ref are forwarded to the element rendered.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `element \| (props) => node` | — | Render the title as a heading where the nav belongs in the page's outline: render={<h2 />}. |

### Nav.List

A <ul> with no markers, one line per Item. Nest one inside an Item to indent a level, or inside a Group to fold it. Native <ul> props and ref are forwarded.

### Nav.Item

An <li> holding a Link or a Group, then an optional nested List. Native <li> props and ref are forwarded.

### Nav.Link

A destination: an <a href> by default, with an svg child as its icon. Native <a> props (href, target, onClick) and ref are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `current` | `boolean \| "page" \| "step" \| "location" \| "date" \| "time"` | — | Marks the destination the reader is at: true for the current page (aria-current="page"), "location" for the section in view of a table of contents. |
| `render` | `element \| (props) => node` | — | Substitute a router's link (render={<Link href=… />}); it receives the wiring and the Link's other props, and its own props win. |

### Nav.Group

A fold of related links: a native <details>. Native <details> props (name) and ref are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state. Pair with onOpenChange. |
| `defaultOpen` | `boolean` | — | Open at first render, for uncontrolled usage. |
| `onOpenChange` | `(open: boolean) => void` | — | Fires with the new state when the reader opens or closes the group. |

### Nav.GroupTitle

The group's always-visible line, a <summary> set like the links around it with a chevron at its end. Native <summary> props and ref are forwarded.

## Custom properties

| Property | Syntax | Default | Description |
| --- | --- | --- | --- |
| `--loam-nav-indent` | `CSS length` | `var(--loam-space-md)` | How far a nested List indents, whether it sits in an Item or in a Group. Set it on the Root or any ancestor. |
| `--loam-nav-current-edge` | `inline-start \| block-end` | `inline-start` | Which edge the current marker's bar is drawn on: the start edge for a column, block-end (under the link) for a horizontal row. Read by a style query, so set it on the Root or an ancestor, never on the link. |
| `--loam-nav-link-size` | `CSS length` | `2.25rem` | The minimum height of each line (a Link or a GroupTitle). Raise it to 2.75rem where a thumb is the pointer, as in a mobile menu. |

## Hooks

### useScrollSpy

Which of the elements with these ids is in view: the first, in the order given, that intersects the viewport, or the last one that did once none does (the reader is inside its section). null before anything has intersected, and on the server. One IntersectionObserver for the set, disconnected on unmount; a fresh array of the same ids does not re-observe.

```tsx
const activeId = useScrollSpy(ids, options?);
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rootMargin` | `string` | `the whole viewport` | The observer's rootMargin: shrink the band a heading must enter to count as in view, e.g. "0px 0px -70% 0px" for the top third. |
| `threshold` | `number \| number[]` | `0` | The observer's threshold: how much of the element must be visible. |

