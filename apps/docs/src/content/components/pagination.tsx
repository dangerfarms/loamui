import type { ComponentContent } from "@/renderer/types";
import { PaginationDemo, PaginationEdgesDemo, PaginationManyDemo } from "./pagination.client";

const doc: ComponentContent = {
  slug: "pagination",
  lead: "Navigate through pages of content with real, addressable links.",
  importLine: `import { Pagination } from "@loamui/core";`,
  demos: [
    {
      title: "Basic",
      description:
        "Every page has an href; intercept onNavigate only when a client router needs it.",
      code: `function Demo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      total={10}
      value={page}
      getHref={(next) => "?page=" + next}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
    />
  );
}`,
      render: () => <PaginationDemo />,
    },
    {
      title: "With edges",
      description: "Add first/last links with withEdges.",
      code: `function Demo() {
  const [page, setPage] = useState(5);
  return (
    <Pagination
      total={10}
      value={page}
      getHref={(next) => "?page=" + next}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
      withEdges
    />
  );
}`,
      render: () => <PaginationEdgesDemo />,
    },
    {
      title: "Many pages",
      description: "Ellipsis gaps keep the control compact across 20 pages.",
      code: `function Demo() {
  const [page, setPage] = useState(10);
  return (
    <Pagination
      total={20}
      value={page}
      getHref={(next) => "?page=" + next}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
      withEdges
    />
  );
}`,
      render: () => <PaginationManyDemo />,
    },
  ],
  whenToUse: [
    "For long result sets (search results, tables, archives) where users need to know where they are in the set and jump to a position.",
    "When users may want to return to a specific point: numbered pages give every position a stable address, which continuous scrolling cannot.",
  ],
  whenNotToUse: [
    "For short lists: if everything fits on one or two pages, show it all; a pager over a handful of items adds clicks without adding orientation.",
    "For feeds built for continuous browsing where position never matters: a 'load more' control fits that reading pattern better than page numbers nobody will cite.",
  ],
  howItWorks: [
    {
      title: "Show more per page before adding more pages",
      body: "Deep pagination is a poor way to find anything: nobody browses to page 37 of 120. Before reaching for a longer pager, raise the page size or improve search and filtering so users land near what they want. Pagination is for orienting within a set, not a substitute for findability.",
    },
    {
      title: "Previous and Next stay put",
      body: "Sequential movement is what pagination is for, so Previous and Next keep their visual space. At the first and last page the unavailable direction becomes an aria-hidden placeholder, not a fake disabled link. The layout stays stable without adding an inert stop to the keyboard or accessibility order.",
    },
    {
      title: "The ends are always visible",
      body: "The page list always includes page 1 and the last page, with aria-hidden ellipses standing in for the gaps and sibling pages shown around the active one. Users can therefore read the size of the whole set and reach either end in one click from anywhere.",
    },
    {
      title: "The URL is the source of truth",
      body: "getHref gives every destination a real URL, so page 4 is linkable, survives reloads and supports the back button before JavaScript runs. With a client router, intercept onNavigate, prevent the browser navigation and update the route there. The href remains the fallback and the destination users can copy or open in a new tab.",
    },
  ],
  accessibility: [
    'The pager is a <nav aria-label="Pagination"> (the label is overridable) wrapping a list, so assistive technology exposes it as a navigation landmark with a known number of items.',
    'The active page carries aria-current="page", and it is also styled via data-active; the position is announced, and colour is not the only visual signal.',
    'Every available destination is a real <a href> with an explicit aria-label ("Previous page", "Page 7", "Last page"), so users can copy, bookmark or open a page in a new tab.',
    "Ellipsis separators are aria-hidden: they are visual shorthand for the gap, not stops in the reading order.",
    'Previous and Next carry rel="prev" and rel="next". Unavailable boundary directions are visual placeholders hidden from assistive technology, so they are not inert tab stops.',
  ],
  props: [
    {
      name: "total",
      type: "number",
      description: "Total number of pages.",
    },
    {
      name: "value",
      type: "number",
      description: "The active page (1-based).",
    },
    {
      name: "getHref",
      type: "(page: number) => string",
      description: "Build the destination URL for each page (required).",
    },
    {
      name: "onNavigate",
      type: "(page: number, event: MouseEvent<HTMLAnchorElement>) => void",
      description: "Optionally intercept link activation for a client router.",
    },
    {
      name: "siblings",
      type: "number",
      default: "1",
      description: "Number of sibling pages shown on each side of the active page.",
    },
    {
      name: "withEdges",
      type: "boolean",
      default: "false",
      description: "Show first/last page links at the edges.",
    },
    {
      name: "aria-label",
      type: "string",
      default: `"Pagination"`,
      description: "The navigation landmark's accessible name.",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "All native <nav> props are forwarded.",
    },
  ],
};

export default doc;
