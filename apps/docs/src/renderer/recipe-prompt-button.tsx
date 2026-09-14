"use client";

import { useEffect, useRef, useState } from "react";
import classes from "./recipe-prompt-button.module.css";

type Status = "idle" | "copying" | "copied" | "ready" | "failed";

export function RecipePromptButton({ title, href }: { title: string; href: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const text = useRef<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      request.current?.abort();
      clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (status === "copying") return;
    clearTimeout(timer.current);
    const controller = new AbortController();
    request.current = controller;
    setStatus("copying");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      if (text.current !== null) {
        await navigator.clipboard.writeText(text.current);
      } else {
        const content = fetch(href, { signal: controller.signal }).then(async (response) => {
          if (!response.ok || !response.headers.get("content-type")?.startsWith("text/plain")) {
            throw new Error("Prompt unavailable");
          }
          const value = await response.text();
          if (!value.trim()) throw new Error("Empty prompt");
          text.current = value;
          return value;
        });
        // A clipboard refusal can happen before the request settles.
        void content.catch(() => {});
        if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
          // Start the write during user activation; resolve the text after fetching.
          const blob = content.then((value) => new Blob([value], { type: "text/plain" }));
          void blob.catch(() => {});
          await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
        } else {
          await content;
          if (!controller.signal.aborted) setStatus("ready");
          return;
        }
      }
      if (!controller.signal.aborted) {
        setStatus("copied");
        timer.current = setTimeout(() => setStatus("idle"), 2000);
      }
    } catch {
      if (!controller.signal.aborted) setStatus("failed");
    }
  }

  const message =
    status === "copied"
      ? `Prompt copied for ${title}.`
      : status === "ready"
        ? "Prompt loaded. Press Copy prompt again to copy it."
        : status === "failed"
          ? "Could not copy. Try again, or open the prompt and copy its text."
          : "";

  return (
    <div className={classes.actions}>
      <div className={classes.controls}>
        <button
          type="button"
          onClick={() => void copy()}
          aria-disabled={status === "copying"}
          aria-busy={status === "copying"}
          aria-label={`Copy prompt for ${title}`}
        >
          {status === "copying" ? "Copying…" : status === "copied" ? "Copied" : "Copy prompt"}
        </button>
        <a href={href} aria-label={`Open prompt for ${title}`}>
          Open prompt
          <span aria-hidden="true"> →</span>
        </a>
      </div>
      <p
        role="status"
        className={
          status === "failed" || status === "ready" ? classes.message : "loam-VisuallyHidden"
        }
      >
        {message}
      </p>
    </div>
  );
}
