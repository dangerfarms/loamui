"use client";

import { type ReactNode } from "react";
import { Card, CopyButton, Tabs } from "@loamui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import "./AgentShowcase.css";

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
  /** Optional guidance shown beside the command. */
  skillNote?: ReactNode;
  prompt: string;
  tsx: string;
  css: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="site-AgentShowcase">
      <Card>
        <div className="site-AgentAsk">
          <h3>Add the skill and ask</h3>
          {skillCommand && (
            <>
              <p className="label">
                Add the skill: {skillNote && <span className="note">{skillNote}</span>}
              </p>
              <div className="command">
                <span className="prompt" aria-hidden>
                  $
                </span>
                <code>{skillCommand}</code>
                <CopyButton
                  className="copy"
                  value={skillCommand}
                  aria-label="Copy the skill install command"
                >
                  Copy
                </CopyButton>
              </div>
            </>
          )}
          <p className="label">
            {skillCommand ? (
              "And then write a prompt using it:"
            ) : (
              <>
                Point the agent at <a href="/llms.txt">llms.txt</a>:
              </>
            )}
          </p>
          <div className="promptBox">
            <p>{prompt}</p>
            <CopyButton className="copy" value={prompt} aria-label="Copy the prompt">
              Copy
            </CopyButton>
          </div>
        </div>
      </Card>
      <Card>
        <div className="site-AgentResult">
          <p className="eyebrow">Explore the result</p>
          <Tabs.Root defaultValue="result">
            <Tabs.List aria-label="Generated code">
              <Tabs.Tab value="result">Preview</Tabs.Tab>
              <Tabs.Tab value="tsx">React</Tabs.Tab>
              <Tabs.Tab value="css">CSS</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="result">
              <div className="site-AgentShowcase-stage">{children}</div>
            </Tabs.Panel>
            <Tabs.Panel value="tsx">
              <CodeBlock code={tsx} language="tsx" />
            </Tabs.Panel>
            <Tabs.Panel value="css">
              <CodeBlock code={css} language="css" />
            </Tabs.Panel>
          </Tabs.Root>
          <p className="caption">{caption}</p>
        </div>
      </Card>
    </div>
  );
}
