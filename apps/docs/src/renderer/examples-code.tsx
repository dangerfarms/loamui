"use client";

import { CopyButton, Tabs } from "@loamui/core";
import { CodeBlock } from "./CodeBlock";
import type { ExampleSource } from "@/examples/types";
import classes from "./examples-code.module.css";

/** Both files as one markdown pair, for a paste into a chat or a PR. */
export function fencedPair(source: ExampleSource): string {
  return `\`\`\`tsx\n${source.tsx.trim()}\n\`\`\`\n\n\`\`\`css\n${source.css.trim()}\n\`\`\`\n`;
}

/**
 * The example's two files, verbatim from disk, in tabs: the component and
 * its stylesheet. Each block copies itself; "Copy both" copies a fenced
 * pair so the whole example travels as one paste.
 */
export function ExampleCode({ source }: { source: ExampleSource }) {
  return (
    <Tabs.Root defaultValue="tsx" className={classes.tabs}>
      <div className={classes.bar}>
        <Tabs.List aria-label="Example files" className={classes.list}>
          <Tabs.Tab value="tsx">Example.tsx</Tabs.Tab>
          <Tabs.Tab value="css">example.css</Tabs.Tab>
        </Tabs.List>
        <CopyButton
          className={classes.copyBoth}
          value={fencedPair(source)}
          labels={{ copied: "Copied both" }}
        >
          Copy both
        </CopyButton>
      </div>
      <Tabs.Panel value="tsx" className={classes.panel}>
        <CodeBlock code={source.tsx} language="tsx" className={classes.code} />
      </Tabs.Panel>
      <Tabs.Panel value="css" className={classes.panel}>
        <CodeBlock code={source.css} language="css" className={classes.code} />
      </Tabs.Panel>
    </Tabs.Root>
  );
}
