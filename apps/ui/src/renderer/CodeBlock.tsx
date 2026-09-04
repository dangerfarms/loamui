"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useState, useSyncExternalStore } from "react";
import classes from "./CodeBlock.module.css";

// One store for every CodeBlock on the page: a single observer + media
// query fan out to all subscribers, and the snapshot reads the data-theme
// attribute (the site's only scheme override) rather than getComputedStyle,
// which would force a style flush per block per render.
const schemeListeners = new Set<() => void>();
let teardownScheme: (() => void) | undefined;

function subscribeScheme(onChange: () => void) {
  schemeListeners.add(onChange);
  if (!teardownScheme) {
    const notify = () => {
      for (const l of schemeListeners) l();
    };
    const obs = new MutationObserver(notify);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", notify);
    teardownScheme = () => {
      obs.disconnect();
      mq.removeEventListener("change", notify);
      teardownScheme = undefined;
    };
  }
  return () => {
    schemeListeners.delete(onChange);
    if (schemeListeners.size === 0) teardownScheme?.();
  };
}

function isDarkSnapshot(): boolean {
  const pinned = document.documentElement.dataset.theme;
  if (pinned === "dark" || pinned === "light") return pinned === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function useIsDark() {
  return useSyncExternalStore(subscribeScheme, isDarkSnapshot, () => false);
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const dark = useIsDark();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={`${classes.wrap} ${className ?? ""}`}>
      <button className={classes.copy} onClick={copy} type="button">
        {copied ? "Copied" : "Copy"}
      </button>
      <Highlight
        code={code.trim()}
        language={language}
        theme={dark ? themes.vsDark : themes.github}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className={classes.pre}>
            {tokens.map((line, i) => (
              <span key={i} {...getLineProps({ line })} className={classes.line}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
