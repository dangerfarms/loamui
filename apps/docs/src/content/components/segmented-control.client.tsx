"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { SegmentedControl } from "@loamui/core";

const frame: CSSProperties = {
  display: "grid",
  gap: "var(--loam-space-md)",
  justifyItems: "start",
};

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

type Scheme = "system" | "light" | "dark";

/**
 * A live scheme picker: choosing sets `data-theme` on the root element (or
 * removes it for System) and remembers the choice under the key this
 * site's pre-paint script reads.
 */
export function SegmentedControlSchemeDemo() {
  const [scheme, setScheme] = useState<Scheme>("system");
  useEffect(() => {
    const stored = localStorage.getItem("loamui-theme");
    if (stored === "light" || stored === "dark") setScheme(stored);
  }, []);
  const choose = (next: string) => {
    const value = next as Scheme;
    setScheme(value);
    if (value === "system") {
      delete document.documentElement.dataset.theme;
      localStorage.removeItem("loamui-theme");
    } else {
      document.documentElement.dataset.theme = value;
      localStorage.setItem("loamui-theme", value);
    }
  };
  return (
    <SegmentedControl.Root value={scheme} onValueChange={choose}>
      <SegmentedControl.Legend className="loam-VisuallyHidden">
        Colour scheme
      </SegmentedControl.Legend>
      <SegmentedControl.Item value="system">
        <SystemIcon />
        <span className="loam-VisuallyHidden">System</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="light">
        <LightIcon />
        <span className="loam-VisuallyHidden">Light</span>
      </SegmentedControl.Item>
      <SegmentedControl.Item value="dark">
        <DarkIcon />
        <span className="loam-VisuallyHidden">Dark</span>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}

/** Controlled: the view follows the value. */
export function SegmentedControlViewDemo() {
  const [view, setView] = useState("list");
  return (
    <div style={frame}>
      <SegmentedControl.Root value={view} onValueChange={setView}>
        <SegmentedControl.Legend>View</SegmentedControl.Legend>
        <SegmentedControl.Item value="list">
          <ListIcon />
          List
        </SegmentedControl.Item>
        <SegmentedControl.Item value="grid">
          <GridIcon />
          Grid
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <p style={{ margin: 0 }}>{view === "list" ? "Showing the list." : "Showing the grid."}</p>
    </div>
  );
}

/** A form control: the radios submit under `name`. */
export function SegmentedControlFormDemo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <form
      style={frame}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get("range")));
      }}
    >
      <SegmentedControl.Root name="range" defaultValue="week">
        <SegmentedControl.Legend>Range</SegmentedControl.Legend>
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      </SegmentedControl.Root>
      <button type="submit">Apply</button>
      <p style={{ margin: 0 }} aria-live="polite">
        {submitted ? `Submitted range=${submitted}` : "Nothing submitted yet."}
      </p>
    </form>
  );
}

/** A disabled segment stays in the row, out of the choice; a disabled Root takes the whole group out. */
export function SegmentedControlDisabledDemo() {
  return (
    <div style={frame}>
      <SegmentedControl.Root defaultValue="monthly">
        <SegmentedControl.Legend>Billing</SegmentedControl.Legend>
        <SegmentedControl.Item value="monthly">Monthly</SegmentedControl.Item>
        <SegmentedControl.Item value="yearly">Yearly</SegmentedControl.Item>
        <SegmentedControl.Item value="lifetime" disabled>
          Lifetime
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <SegmentedControl.Root defaultValue="week" disabled>
        <SegmentedControl.Legend>Range</SegmentedControl.Legend>
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  );
}
