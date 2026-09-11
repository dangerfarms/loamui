"use client";

import { ExamplePreview } from "./examples-preview";

import { Suspense, useId, useMemo, useState } from "react";
import Link from "next/link";
import { Badge, Button, Search, Select } from "@loamui/core";
import { componentsUsed, exampleHref, examplesByCategory } from "@/examples/catalog";
import { EXAMPLE_PREVIEWS } from "@/examples/generated-previews";
import type { ExampleMetaEntry } from "@/examples/types";
import classes from "./examples-index.module.css";
import { LazyThumb } from "./examples-thumb";
import { ExampleLoadBoundary } from "./examples-load-boundary";

function matches(e: ExampleMetaEntry, term: string, uses: string): boolean {
  if (uses && !e.meta.uses.includes(uses)) return false;
  if (!term) return true;
  const hay = [e.meta.title, e.meta.description, e.slug, ...(e.meta.tags ?? []), ...e.meta.uses]
    .join(" ")
    .toLowerCase();
  return term.split(/\s+/).every((word) => hay.includes(word));
}

/**
 * The index: a search and a component filter on one row, then every
 * example as a card with a live preview scaled down inside it. The
 * preview is the real example at two fifths of its size, inert and hidden
 * from assistive technology, so the card can never show something the
 * code does not.
 * Browsing links disable prefetch so offscreen examples stay unloaded.
 */
export function ExamplesIndex() {
  const [query, setQuery] = useState("");
  const [uses, setUses] = useState("");
  const usesId = useId();
  const term = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      examplesByCategory()
        .map((g) => ({
          ...g,
          items: g.items.filter((e) => matches(e, term, uses)),
        }))
        .filter((g) => g.items.length > 0),
    [term, uses],
  );
  const shown = groups.reduce((n, g) => n + g.items.length, 0);
  const total = examplesByCategory().reduce((n, g) => n + g.items.length, 0);
  const filtered = shown !== total;

  const clear = () => {
    setQuery("");
    setUses("");
  };

  return (
    <div className={classes.index}>
      <div className={classes.filters}>
        <Search.Root
          aria-label="Search examples"
          className={classes.search}
          onSubmit={(e) => e.preventDefault()}
        >
          <Search.Label className="loam-VisuallyHidden">Search examples</Search.Label>
          <Search.Input
            placeholder="Search examples…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Search.Root>
        <div className={classes.usesGroup}>
          <label className={classes.usesLabel} htmlFor={usesId}>
            Uses
          </label>
          <Select
            id={usesId}
            className={classes.uses}
            wrapperProps={{ className: classes.usesField }}
            value={uses}
            onChange={(e) => setUses(e.target.value)}
          >
            <option value="">Any component</option>
            {componentsUsed().map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.count})
              </option>
            ))}
          </Select>
        </div>
        <p className={classes.status} role="status">
          {filtered ? `${shown} of ${total}` : `${total} examples`}
        </p>
      </div>

      {groups.length === 0 && (
        <div className={classes.empty}>
          <p className={classes.emptyTitle}>No example matches.</p>
          <p className={classes.emptyText}>
            Try a shorter word, or build it from the primitives with the{" "}
            <Link href="/docs/composing">Composing guide</Link>.
          </p>
          <Button className={classes.emptyClear} onClick={clear}>
            Clear the search
          </Button>
        </div>
      )}

      {groups.map(({ category, items }) => (
        <section
          key={category.slug}
          id={category.slug}
          className={classes.group}
          aria-labelledby={`${category.slug}-heading`}
        >
          <div className={classes.groupHead}>
            <h2 id={`${category.slug}-heading`} className={classes.groupTitle}>
              {category.title}
            </h2>
            <Link
              href={`/examples/${category.slug}`}
              className={classes.groupLink}
              prefetch={false}
            >
              {filtered ? "View all" : `All ${items.length}`}
              <span className="loam-VisuallyHidden"> in {category.title}</span>
              <span aria-hidden> →</span>
            </Link>
          </div>
          <ul className={classes.grid}>
            {items.map((e) => {
              const Preview = EXAMPLE_PREVIEWS[e.slug]!;
              return (
                <li key={e.slug} className={classes.card}>
                  {/* The preview is a live render and may contain links and
                    buttons, so it sits beside the card's link (inert), not
                    inside it; the link's ::after covers the whole card. */}
                  <LazyThumb className={classes.thumb}>
                    <div className={classes.thumbInner}>
                      <ExampleLoadBoundary fallback={<p>Preview unavailable</p>}>
                        <Suspense fallback={null}>
                          <ExamplePreview slug={e.slug}>
                            <Preview />
                          </ExamplePreview>
                        </Suspense>
                      </ExampleLoadBoundary>
                    </div>
                  </LazyThumb>
                  <div className={classes.cardBody}>
                    <Link href={exampleHref(e)} className={classes.cardLink} prefetch={false}>
                      {e.meta.title}
                    </Link>
                    {e.meta.uses.length > 0 && (
                      <ul className={classes.cardUses} aria-label="Uses">
                        {e.meta.uses.map((name) => (
                          <li key={name}>
                            <Badge size="sm">{name}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
