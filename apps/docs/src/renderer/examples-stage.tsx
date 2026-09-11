"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@loamui/core";
import { useSiteScheme } from "./examples-scheme";
import classes from "./examples-stage.module.css";

type Scheme = "light" | "dark";
type Width = "narrow" | "medium" | "wide" | "full";

interface StageState {
  /** A scheme pinned for the frame; null follows the page. */
  scheme: Scheme | null;
  width: Width;
  rtl: boolean;
}

const STORAGE_KEY = "loamui-examples-stage";
const DEFAULT: StageState = { scheme: null, width: "full", rtl: false };

const WIDTHS: { value: Width; label: string }[] = [
  { value: "narrow", label: "Phone width" },
  { value: "medium", label: "Tablet width" },
  { value: "wide", label: "Laptop width" },
  { value: "full", label: "Full width" },
];

/**
 * Settings live for the visit, not for ever: a frame pinned narrow last
 * month would puzzle a reader back for something else.
 */
function load(): StageState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<StageState>;
    return {
      scheme: parsed.scheme === "light" || parsed.scheme === "dark" ? parsed.scheme : null,
      width: WIDTHS.some((w) => w.value === parsed.width) ? (parsed.width as Width) : "full",
      rtl: parsed.rtl === true,
    };
  } catch {
    return DEFAULT;
  }
}

function save(state: StageState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode, quota: the toolbar still works for this page */
  }
}

const icon = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SunIcon() {
  return (
    <svg {...icon}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...icon}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/** Four devices, so the presets read apart at a glance. */
function WidthIcon({ value }: { value: Width }) {
  switch (value) {
    case "narrow":
      return (
        <svg {...icon}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "medium":
      return (
        <svg {...icon}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "wide":
      return (
        <svg {...icon}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M1 20h22" />
        </svg>
      );
    default:
      return (
        <svg {...icon}>
          <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
      );
  }
}

function RtlIcon() {
  return (
    <svg {...icon}>
      <path d="M20 12H8M13 6l-6 6 6 6" />
      <path d="M4 5v14" />
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg {...icon}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/**
 * The live example inside a styled container with its own controls: a
 * colour scheme pinned to the frame alone (data-theme sets color-scheme
 * for the subtree, so every light-dark() token re-resolves inside it),
 * width presets so the container queries answer without a window resize,
 * and a direction toggle that proves the logical properties. The frame is
 * a container, so the example's fluid tokens answer the frame, not the
 * viewport. Settings persist for the session and are read after mount, so
 * the server render is the default and hydration never mismatches.
 */
export function ExampleStage({
  title,
  href,
  children,
}: {
  /** Names the frame for assistive technology. */
  title: string;
  /** The example's own page; omitted on that page. */
  href?: string;
  children: ReactNode;
}) {
  const [state, setState] = useState<StageState>(DEFAULT);
  const site = useSiteScheme();
  const scheme = state.scheme ?? site;

  useEffect(() => {
    setState(load());
  }, []);

  const update = (patch: Partial<StageState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  };

  const flipScheme = () => {
    const next: Scheme = scheme === "dark" ? "light" : "dark";
    // Back to following the page when the pin would equal what the page
    // already shows, so the frame tracks the site's toggle afterwards.
    update({ scheme: next === site ? null : next });
  };

  const schemeLabel = scheme === "dark" ? "Show the frame in light" : "Show the frame in dark";

  return (
    <div className={classes.wrap}>
      <div className={classes.toolbar} role="group" aria-label={`Preview controls for ${title}`}>
        <div className={classes.presets} role="group" aria-label="Frame width">
          {WIDTHS.map((w) => (
            <Button
              key={w.value}
              className={classes.control}
              aria-pressed={state.width === w.value}
              title={w.label}
              onClick={() => update({ width: w.value })}
            >
              <WidthIcon value={w.value} />
              <span className="loam-VisuallyHidden">{w.label}</span>
            </Button>
          ))}
        </div>
        <Button
          className={classes.control}
          aria-pressed={state.rtl}
          title="Right-to-left"
          onClick={() => update({ rtl: !state.rtl })}
        >
          <RtlIcon />
          <span className="loam-VisuallyHidden">Right-to-left</span>
        </Button>
        <Button className={classes.control} title={schemeLabel} onClick={flipScheme}>
          {scheme === "dark" ? <MoonIcon /> : <SunIcon />}
          <span className="loam-VisuallyHidden">{schemeLabel}</span>
        </Button>
        {href && (
          <Link href={href} className={classes.open} title="Open on its own page">
            <OpenIcon />
            <span className="loam-VisuallyHidden">Open {title} on its own page</span>
          </Link>
        )}
      </div>
      <div className={classes.stage} data-width={state.width}>
        <div
          className={classes.frame}
          data-theme={state.scheme ?? undefined}
          dir={state.rtl ? "rtl" : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
