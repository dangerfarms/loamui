"use client";

import { useSyncExternalStore } from "react";
import { SunIcon, MoonIcon } from "./Icons";
import classes from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  // Cross-tab: another tab's toggle fires storage; same-tab writes go
  // through the emitter below (storage never fires in its own tab).
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    mq.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function themeSnapshot(): Theme {
  const stored = localStorage.getItem("loamui-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Two states: follow the system, or pin the opposite scheme. Toggling
 * back to the scheme the system already shows clears the pin entirely,
 * so the site tracks future OS changes instead of freezing today's
 * value.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, themeSnapshot, () => "light");

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    try {
      if (next === system) {
        delete document.documentElement.dataset.theme;
        localStorage.removeItem("loamui-theme");
      } else {
        document.documentElement.dataset.theme = next;
        localStorage.setItem("loamui-theme", next);
      }
    } catch {
      /* ignore */
    }
    for (const l of listeners) l();
  };

  return (
    <button
      type="button"
      className={classes.btn}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
