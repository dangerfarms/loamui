"use client";

import { useId, useState, type ReactNode } from "react";
import { CopyButton } from "@loamui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import classes from "./AgentShowcase.module.css";

type Tab = "tsx" | "css";

/**
 * The homepage's "ask, get, look under the hood" panel: the prompt a
 * developer gives their agent, the live result the agent's code renders,
 * and the code itself. The code strings are synced from the real files
 * (scripts/sync-agent-demo.mjs), so the tabs cannot drift from the render.
 */
export function AgentShowcase({
  skillCommand,
  skillNote,
  prompt,
  tsx,
  css,
  caption,
  children,
}: {
  /** The consumer skill's install command; omit to hide the row. */
  skillCommand?: string;
  /** A short status shown beside the command, e.g. "soon". */
  skillNote?: string;
  prompt: string;
  tsx: string;
  css: string;
  caption: string;
  children: ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("tsx");
  const baseId = useId();

  return (
    <div className={classes.grid}>
      <div className={classes.ask}>
        <h3 className={classes.step}>Ask</h3>
        {skillCommand && (
          <>
            <p className={classes.label}>
              <a href="/docs/composing">Read the recipe</a> or add the skill:
              {skillNote && <span className={classes.note}>{skillNote}</span>}
            </p>
            <div className={classes.command}>
              <span className={classes.prompt} aria-hidden>
                $
              </span>
              <code>{skillCommand}</code>
              <CopyButton
                className={classes.copy}
                value={skillCommand}
                aria-label="Copy the skill install command"
              >
                Copy
              </CopyButton>
            </div>
          </>
        )}
        <p className={classes.label}>
          {skillCommand ? "Or point the agent at " : "Point the agent at "}
          <a href="/llms.txt">llms.txt</a>:
        </p>
        <div className={classes.promptBox}>
          <p>{prompt}</p>
          <CopyButton className={classes.copy} value={prompt} aria-label="Copy the prompt">
            Copy
          </CopyButton>
        </div>
      </div>

      <div className={classes.result}>
        <h3 className={classes.step}>Result</h3>
        <div className={classes.stage}>{children}</div>
      </div>

      <div className={classes.code}>
        <div className={classes.codeHead}>
          <h3 className={classes.step}>Under the hood</h3>
          <div role="tablist" aria-label="Generated code" className={classes.tabs}>
            {(["tsx", "css"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`${baseId}-tab-${t}`}
                aria-selected={tab === t}
                aria-controls={`${baseId}-panel-${t}`}
                tabIndex={tab === t ? 0 : -1}
                className={classes.tab}
                onClick={() => setTab(t)}
              >
                {t === "tsx" ? "Component" : "Stylesheet"}
              </button>
            ))}
          </div>
        </div>
        <div
          role="tabpanel"
          id={`${baseId}-panel-${tab}`}
          aria-labelledby={`${baseId}-tab-${tab}`}
          className={classes.panel}
        >
          {tab === "tsx" ? (
            <CodeBlock code={tsx} language="tsx" />
          ) : (
            <CodeBlock code={css} language="css" />
          )}
        </div>
        <p className={classes.caption}>{caption}</p>
      </div>
    </div>
  );
}
