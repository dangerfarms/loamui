"use client";

import { Field, Search } from "@loamui/core";

function MagnifierIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function SearchSiteDemo() {
  return (
    <header
      style={{
        alignItems: "center",
        display: "flex",
        gap: "var(--loam-space-lg)",
        inlineSize: "100%",
        justifyContent: "space-between",
      }}
    >
      <strong>Loam</strong>
      <Search.Root style={{ inlineSize: "min(20rem, 100%)" }}>
        <Search.Label>Search this site</Search.Label>
        <Search.Input />
        <Search.Button />
      </Search.Root>
    </header>
  );
}

export function SearchIconDemo() {
  return (
    <Search.Root style={{ inlineSize: "min(20rem, 100%)" }}>
      <Search.Label>Search this site</Search.Label>
      <Search.Input />
      <Search.Button aria-label="Search">
        <MagnifierIcon />
      </Search.Button>
    </Search.Root>
  );
}

export function SearchInFieldDemo() {
  return (
    <Search.Root aria-label="Search orders" style={{ inlineSize: "min(24rem, 100%)" }}>
      <Field.Root>
        <Field.Label>Order number</Field.Label>
        <Field.Description>The reference on your confirmation email.</Field.Description>
        <Search.Input name="order" />
      </Field.Root>
      <Search.Button>Find order</Search.Button>
    </Search.Root>
  );
}
