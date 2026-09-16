"use client";

import { useEffect, useRef, useState } from "react";
import { VisuallyHidden } from "@loamui/core";
import "./recipe-prompt-button.css";

type Status = "idle" | "copying" | "copied" | "failed";

export function RecipePromptButton({ title, prompt }: { title: string; prompt: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (status === "copying") return;
    clearTimeout(timer.current);
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("failed");
    }
  }

  const message =
    status === "copied"
      ? `Prompt copied for ${title}.`
      : status === "failed"
        ? "Could not copy. Select and copy the prompt above."
        : "";

  return (
    <div className="copy">
      <button
        type="button"
        onClick={() => void copy()}
        aria-disabled={status === "copying"}
        aria-busy={status === "copying"}
        aria-label={`Copy prompt for ${title}`}
      >
        {status === "copying" ? "Copying…" : status === "copied" ? "Copied" : "Copy prompt"}
      </button>
      <p role="status" className="message">
        {status === "failed" ? message : <VisuallyHidden>{message}</VisuallyHidden>}
      </p>
    </div>
  );
}
