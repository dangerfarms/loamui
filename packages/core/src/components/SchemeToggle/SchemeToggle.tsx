"use client";

import { useEffect, useId, useState } from "react";
import type { FieldsetHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

/** The three answers to "which colour scheme?" — `system` means no override. */
export type ColorScheme = "system" | "light" | "dark";

const SCHEMES: readonly ColorScheme[] = ["system", "light", "dark"];

/** The key the docs site's pre-paint script and toggle already read. */
const DEFAULT_STORAGE_KEY = "loamui-theme";

const DEFAULT_LABELS: Record<ColorScheme, ReactNode> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export interface SchemeToggleProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> {
  /** Visually hidden text for each option; override to localise. */
  labels?: Partial<Record<ColorScheme, ReactNode>>;
  /** The group's name, its legend. @default "Colour scheme" */
  label?: ReactNode;
  /** Show the label as text before the options instead of hiding it. */
  showLabel?: boolean;
  /** localStorage key the choice persists under. @default "loamui-theme" */
  storageKey?: string;
  /** Fires with the newly chosen scheme. */
  onChange?: (scheme: ColorScheme) => void;
  ref?: Ref<HTMLFieldSetElement>;
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
 * radio group.
 *
 * Choosing sets `data-theme` on the root element (or removes it for
 * System), which is the whole mechanism: `color-scheme` re-resolves and
 * every `light-dark()` token follows. The choice persists to
 * `localStorage` under `storageKey`. Preventing a flash of the wrong
 * scheme on reload is the page's job: an inline script in `<head>` that
 * reads the same key and sets the attribute before paint.
 */
export function SchemeToggle({
  labels,
  label = "Colour scheme",
  showLabel,
  storageKey = DEFAULT_STORAGE_KEY,
  onChange,
  className,
  ref,
  ...rest
}: SchemeToggleProps) {
  const name = useId();
  // The server cannot know the stored choice, so it renders System checked
  // and hydration matches; the effect below then corrects it from storage.
  const [scheme, setScheme] = useState<ColorScheme>("system");

  // Synchronises with an external system (storage + the root attribute):
  // adopt the stored choice and make sure the document wears it.
  useEffect(() => {
    const stored = readStored(storageKey);
    if (stored === "system") return;
    setScheme(stored);
    document.documentElement.dataset.theme = stored;
  }, [storageKey]);

  const choose = (next: ColorScheme) => {
    setScheme(next);
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
      <legend>{label}</legend>
      {SCHEMES.map((value) => {
        const Icon = ICONS[value];
        return (
          <label key={value}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={scheme === value}
              onChange={() => choose(value)}
            />
            <Icon />
            <span className="label">{labels?.[value] ?? DEFAULT_LABELS[value]}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
