---
title: Pagination
description: Navigate between pages of content.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Pagination

Navigate through pages of content with real, addressable links, composed from parts on top of Button.

## Import

```tsx
import { Pagination } from "@loamui/core";
```

## Usage

### Basic

Pagination.Pages renders Previous, the numbered window around the active page with its ellipses, and Next, from page and count. Every page has an href; intercept onNavigate only when a client router needs it.

```tsx
function Demo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination.Root>
      <Pagination.List>
        <Pagination.Pages
          page={page}
          count={10}
          getHref={(next) => "?page=" + next}
          onNavigate={(next, event) => {
            event.preventDefault();
            setPage(next);
          }}
        />
      </Pagination.List>
    </Pagination.Root>
  );
}
```

### With edges

First and last links are your own Items around Pages: a Pagination.Link is a Button rendered as a link, disabled when the destination is the current page. Ellipsis gaps keep the control compact across 20 pages.

```tsx
function Demo() {
  const [page, setPage] = useState(10);
  const count = 20;
  return (
    <Pagination.Root>
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Link href="?page=1" aria-label="First page" disabled={page === 1}>
            «
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Pages page={page} count={count} getHref={(next) => "?page=" + next} />
        <Pagination.Item>
          <Pagination.Link href={"?page=" + count} aria-label="Last page" disabled={page === count}>
            »
          </Pagination.Link>
        </Pagination.Item>
      </Pagination.List>
    </Pagination.Root>
  );
}
```

### Router links and other words

Compose the list yourself when the convenience doesn't fit: Link takes a router link through render and the wiring merges on, current marks the active page, and labels puts the landmark's name in the page's own language.

```tsx
import Link from "next/link";

<Pagination.Root labels={{ navigation: "Seiten" }}>
  <Pagination.List>
    {[1, 2, 3].map((n) => (
      <Pagination.Item key={n}>
        <Pagination.Link
          render={<Link href={"?page=" + n} />}
          current={n === 2}
          aria-label={"Seite " + n}
        >
          {n}
        </Pagination.Link>
      </Pagination.Item>
    ))}
    <Pagination.Ellipsis />
    <Pagination.Item>
      <Pagination.Link render={<Link href="?page=12" />} aria-label="Seite 12">
        12
      </Pagination.Link>
    </Pagination.Item>
  </Pagination.List>
</Pagination.Root>
```

## When to use it

- For long result sets (search results, tables, archives) where users need to know where they are in the set and jump to a position.
- When users may want to return to a specific point: numbered pages give every position a stable address, which continuous scrolling cannot.

## When not to

- For short lists: if everything fits on one or two pages, show it all; a pager over a handful of items adds clicks without adding orientation.
- For feeds built for continuous browsing where position never matters: a 'load more' control fits that reading pattern better than page numbers nobody will cite.

## How it works

### Show more per page before adding more pages

Deep pagination is a poor way to find anything: nobody browses to page 37 of 120. Before reaching for a longer pager, raise the page size or improve search and filtering so users land near what they want. Pagination is for orienting within a set, not a substitute for findability.

### Previous and Next stay put

Sequential movement is what pagination is for, so Pagination.Pages always renders Previous and Next and they keep their visual space. At the first and last page the unavailable direction becomes a disabled Link: an aria-hidden placeholder with no href, not a fake disabled link. The layout stays stable without adding an inert stop to the keyboard or accessibility order.

### The ends are always visible

The page list always includes page 1 and the last page, with aria-hidden ellipses standing in for the gaps and sibling pages shown around the active one. Users can therefore read the size of the whole set and reach either end in one click from anywhere. First and last links are a composition: two Items of your own around Pages.

### The URL is the source of truth

getHref gives every destination a real URL, so page 4 is linkable, survives reloads and supports the back button before JavaScript runs. With a client router, pass its link through Link's render, or intercept onNavigate, prevent the browser navigation and update the route there. The href remains the fallback and the destination users can copy or open in a new tab.

### A page link is a Button

Pagination.Link is the LoamUI Button rendered as an <a>, so the pager height-aligns with every other control by construction and answers its context like any Button: the current page's Item declares --loam-context: primary, and the Button inside adapts. There is no pagination-specific recipe to keep in step.

## Accessibility

- The pager is a <nav aria-label="Pagination"> (labels.navigation replaces the name) wrapping a list, so assistive technology exposes it as a navigation landmark with a known number of items.
- The active page carries aria-current="page", and the stylesheet keys off that same attribute, so the state is declared once; the position is announced, and colour is not the only visual signal.
- Every available destination is a real <a href> with an explicit aria-label ("Previous page", "Page 7"); labels on Pages replaces the words. Users can copy, bookmark or open a page in a new tab.
- Ellipsis separators are aria-hidden: they are visual shorthand for the gap, not stops in the reading order.
- Previous and Next carry rel="prev" and rel="next". Unavailable directions are visual placeholders hidden from assistive technology, so they are not inert tab stops.

## Parts

### Pagination.Root

The <nav> landmark; native <nav> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `labels` | `{ navigation?: string }` | `{ navigation: "Pagination" }` | The landmark's accessible name. |

### Pagination.List

The <ul> of items; native <ul> props are forwarded.

### Pagination.Item

One <li>, holding a Link or your own content; native <li> props are forwarded.

### Pagination.Link

A page destination: the LoamUI Button rendered as an <a>. Native <a> props (href, rel, aria-label, onClick) are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `current` | `boolean` | — | Marks the current page (aria-current="page"). |
| `disabled` | `boolean` | — | An unavailable destination: the built-in link drops its href and leaves the tab and accessibility order. |
| `render` | `element \| (props) => node` | — | Substitute your own link (render={<Link href=… />}); it receives the wiring. |

### Pagination.Ellipsis

An aria-hidden <li> standing in for a gap; children replace the default … glyph.

### Pagination.Pages

The convenience: Previous, the numbered window with ellipses, and Next, rendered from the parts. Belongs inside Pagination.List; edge links are your own Items around it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | `number` | — | The active page (1-based). |
| `count` | `number` | — | Total number of pages. |
| `siblings` | `number` | `1` | Number of sibling pages shown on each side of the active page. |
| `getHref` | `(page: number) => string` | — | Build the destination URL for each page (required). |
| `onNavigate` | `(page: number, event: MouseEvent<HTMLAnchorElement>) => void` | — | Optionally intercept link activation for a client router. |
| `labels` | `{ previous?: string; next?: string; page?: (n: number) => string }` | — | The words the links speak: previous ("Previous page"), next ("Next page") and page(n) ("Page 7"). |

