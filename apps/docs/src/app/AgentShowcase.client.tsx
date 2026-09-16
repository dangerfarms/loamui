"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { Card, CopyButton, SignpostLink, Tabs } from "@loamui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import "./AgentShowcase.css";

/**
 * The homepage's "ask, get, look under the hood" panel: the prompt a
 * developer gives their agent, the live result the agent's code renders,
 * and the code itself. The code strings are synced from the real files
 * (scripts/sync-agent-demo.mjs), so the tabs cannot drift from the render.
 */
export function AgentShowcase({
  prompt,
  tsx,
  css,
  caption,
  children,
}: {
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
          <h3>Start with a prompt</h3>
          <p className="label">Use this prompt with the LoamUI skill:</p>
          <div className="promptBox">
            <p>{prompt}</p>
            <CopyButton className="copy" value={prompt} aria-label="Copy the prompt">
              Copy
            </CopyButton>
          </div>
          <p>
            <SignpostLink render={<Link href="/docs/agent-workflow" />}>
              Build with the skill
            </SignpostLink>
          </p>
          <p className="label">
            New to LoamUI? <Link href="/docs/installation">Set up your project first</Link>.
          </p>
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
