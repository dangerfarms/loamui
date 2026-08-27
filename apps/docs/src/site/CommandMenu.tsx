"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";
import { COMPONENTS, GETTING_STARTED, PRIMITIVES } from "./nav";
import classes from "./CommandMenu.module.css";

interface Result {
  label: string;
  hint: string;
  href: string;
}

const ALL: Result[] = [
  ...GETTING_STARTED.map((g) => ({
    label: g.name,
    hint: "Guide",
    href: g.href,
  })),
  ...PRIMITIVES.map((p) => ({
    label: p.name,
    hint: "Primitive",
    href: p.href,
  })),
  ...COMPONENTS.map((c) => ({
    label: c.name,
    hint: c.category,
    href: `/docs/components/${c.slug}`,
  })),
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ALL;
    return ALL.filter((r) => r.label.toLowerCase().includes(term));
  }, [q]);

  // Stable (only state setters inside), so the window keydown listener can
  // depend on it without re-subscribing per render.
  const openPalette = useCallback(() => {
    setQ("");
    setActive(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) setOpen(false);
        else openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPalette]);

  // Native <dialog>: showModal() brings focus containment, Escape and the
  // ::backdrop; the effect reconciles React state with the element.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      inputRef.current?.focus();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  // Backdrop-click fallback for browsers without `closedby`: clicks on the
  // backdrop hit the dialog element itself, never its children. Wired
  // imperatively, the same shape as Modal's own fallback.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === el) setOpen(false);
    };
    el.addEventListener("click", onBackdropClick);
    return () => el.removeEventListener("click", onBackdropClick);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <>
      <button
        type="button"
        className={classes.trigger}
        onClick={openPalette}
        aria-label="Search documentation"
      >
        <SearchIcon width={16} height={16} />
        <span className={classes.triggerLabel}>Search…</span>
        <kbd className={classes.kbd}>⌘K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className={classes.panel}
        aria-label="Search"
        onClose={() => setOpen(false)}
        {...({ closedby: "any" } as object)}
      >
        <div className={classes.searchRow}>
          <SearchIcon width={18} height={18} />
          <input
            ref={inputRef}
            className={classes.input}
            placeholder="Search components and guides…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
        </div>
        <ul className={classes.results}>
          {results.length === 0 && <li className={classes.empty}>No results for “{q}”.</li>}
          {results.map((r, i) => (
            <li key={r.href}>
              <button
                type="button"
                className={classes.result}
                data-active={i === active || undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
              >
                <span>{r.label}</span>
                <span className={classes.hint}>{r.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
