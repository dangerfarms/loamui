"use client";

import { useEffect, useSyncExternalStore } from "react";
import { SegmentedControl } from "@loamui/core";
import "./example.css";

type Scheme = "system" | "light" | "dark";

/** The key the page's pre-paint script reads, so a reload keeps the choice. */
const STORAGE_KEY = "color-scheme";

function readStored(): Scheme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable (private mode, sandboxed frame): system it is */
  }
  return "system";
}

// The root attribute is the current choice, even if storage is unavailable.
// The storage event carries another tab's change;
// this tab's own changes are announced by hand, since the event does not
// fire in the document that made them.
const listeners = new Set<() => void>();

function readSnapshot(): Scheme {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme : "system";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) apply(readStored());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function apply(scheme: Scheme) {
  const root = document.documentElement;
  try {
    if (scheme === "system") {
      delete root.dataset.theme;
      localStorage.removeItem(STORAGE_KEY);
    } else {
      root.dataset.theme = scheme;
      localStorage.setItem(STORAGE_KEY, scheme);
    }
  } catch {
    /* the attribute is set even when storage refuses; the choice just won't survive a reload */
  }
  for (const listener of listeners) listener();
}

export default function Example() {
  // The server cannot know the stored choice: System keeps the markup
  // deterministic, and the client snapshot supplies the applied choice.
  const scheme = useSyncExternalStore(subscribe, readSnapshot, () => "system" as Scheme);

  // A page without a pre-paint script still ends up wearing the stored choice.
  useEffect(() => {
    apply(readStored());
  }, []);

  return (
    <SegmentedControl.Root
      className="scheme-toggle"
      value={scheme}
      onValueChange={(next) => apply(next as Scheme)}
    >
      <SegmentedControl.Legend className="loam-VisuallyHidden">
        Colour scheme
      </SegmentedControl.Legend>
      <SegmentedControl.Item value="system">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" strokeLinecap="round" />
        </svg>
        <span className="loam-VisuallyHidden">System</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="light">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            strokeLinecap="round"
          />
        </svg>
        <span className="loam-VisuallyHidden">Light</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="dark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round" />
        </svg>
        <span className="loam-VisuallyHidden">Dark</span>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
