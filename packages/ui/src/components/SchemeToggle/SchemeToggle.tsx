"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { cx } from "@loamui/core";
import type { PartProps } from "@loamui/core";

/** The three answers to "which colour scheme?" — `system` means no override. */
export type ColorScheme = "system" | "light" | "dark";

const SCHEMES: readonly ColorScheme[] = ["system", "light", "dark"];

/** The key a site's pre-paint script reads (the docs and gallery sites do). */
const DEFAULT_STORAGE_KEY = "loamui-theme";

/** The words the toggle says on its own, each with an English default. */
export interface SchemeToggleLabels {
  /** The group's name, its legend. @default "Colour scheme" */
  legend?: ReactNode;
  /** The hidden name of the System option. @default "System" */
  system?: ReactNode;
  /** The hidden name of the Light option. @default "Light" */
  light?: ReactNode;
  /** The hidden name of the Dark option. @default "Dark" */
  dark?: ReactNode;
}

const DEFAULT_LABELS: Required<SchemeToggleLabels> = {
  legend: "Colour scheme",
  system: "System",
  light: "Light",
  dark: "Dark",
};

export interface SchemeToggleProps extends Omit<PartProps<"fieldset">, "onChange"> {
  /** The toggle's own words; override to localise. */
  labels?: SchemeToggleLabels;
  /** Show the legend as text before the options instead of hiding it. */
  showLabel?: boolean;
  /** localStorage key the choice persists under. @default "loamui-theme" */
  storageKey?: string;
  /** Fires with the newly chosen scheme. */
  onChange?: (scheme: ColorScheme) => void;
}

function readStored(key: string): ColorScheme {
  try {
    const stored = localStorage.getItem(key);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable (privacy mode, sandboxed frame) — system it is */
  }
  return "system";
}

// Storage is the store. The `storage` event carries another tab's change;
// this tab's own changes are announced by hand, since the event does not
// fire in the document that made them.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function apply(scheme: ColorScheme, key: string) {
  const root = document.documentElement;
  try {
    if (scheme === "system") {
      delete root.dataset.theme;
      localStorage.removeItem(key);
    } else {
      root.dataset.theme = scheme;
      localStorage.setItem(key, scheme);
    }
  } catch {
    /* the attribute is set even when storage refuses; the choice just won't survive a reload */
  }
  for (const listener of listeners) listener();
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<ColorScheme, () => ReactNode> = {
  system: SystemIcon,
  light: LightIcon,
  dark: DarkIcon,
};

/**
 * A three-way choice of colour scheme — System, Light, Dark — as a native
 * radio group dressed as a segmented pill.
 *
 * Choosing sets `data-theme` on the root element (or removes it for
 * System), which is the whole mechanism: `color-scheme` re-resolves and
 * every `light-dark()` token follows. The choice persists to
 * `localStorage` under `storageKey`, and the checked option is read from
 * there before the first paint: on the client the stored choice is the
 * first render, and under hydration the server's System is replaced with
 * it in the same synchronous pass, before the browser paints. Two toggles
 * on one page, or two tabs, stay in step. Preventing a flash of the wrong
 * scheme for the page itself is still the page's job: an inline script in
 * `<head>` that reads the same key and sets the attribute before the
 * stylesheet applies.
 */
export function SchemeToggle({
  labels,
  showLabel,
  storageKey = DEFAULT_STORAGE_KEY,
  onChange,
  className,
  ref,
  ...rest
}: SchemeToggleProps) {
  const name = useId();
  const words = { ...DEFAULT_LABELS, ...labels };
  const scheme = useSyncExternalStore(
    subscribe,
    () => readStored(storageKey),
    // The server cannot know the stored choice; System keeps the markup
    // deterministic and the client snapshot replaces it before paint.
    () => "system",
  );

  // Synchronises with an external system (the root attribute): a page
  // without a pre-paint script still ends up wearing the stored choice.
  useEffect(() => {
    const stored = readStored(storageKey);
    if (stored !== "system") document.documentElement.dataset.theme = stored;
  }, [storageKey]);

  const choose = (next: ColorScheme) => {
    apply(next, storageKey);
    onChange?.(next);
  };

  return (
    <fieldset
      ref={ref}
      className={cx("loam-SchemeToggle", className)}
      data-show-label={showLabel || undefined}
      {...rest}
    >
      {/* The legend always names the group; unshown, it is only hidden. */}
      {showLabel ? (
        <legend className="shown">{words.legend}</legend>
      ) : (
        <legend className="loam-VisuallyHidden">{words.legend}</legend>
      )}
      {SCHEMES.map((value) => {
        const Icon = ICONS[value];
        return (
          <label key={value}>
            <input
              className="loam-VisuallyHidden"
              type="radio"
              name={name}
              value={value}
              checked={scheme === value}
              onChange={() => choose(value)}
            />
            <Icon />
            <span className="loam-VisuallyHidden">{words[value]}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
