"use client";

import { useState } from "react";
import { Pagination } from "@loamui/core";

const pageHref = (page: number) => `?page=${page}`;

/** Basic controlled pagination with 10 pages. */
export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      total={10}
      value={page}
      getHref={pageHref}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
    />
  );
}

/** Pagination with first/last edge buttons. */
export function PaginationEdgesDemo() {
  const [page, setPage] = useState(5);
  return (
    <Pagination
      total={10}
      value={page}
      getHref={pageHref}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
      withEdges
    />
  );
}

/** Many pages: ellipsis gaps keep the control compact. */
export function PaginationManyDemo() {
  const [page, setPage] = useState(10);
  return (
    <Pagination
      total={20}
      value={page}
      getHref={pageHref}
      onNavigate={(next, event) => {
        event.preventDefault();
        setPage(next);
      }}
      withEdges
    />
  );
}
