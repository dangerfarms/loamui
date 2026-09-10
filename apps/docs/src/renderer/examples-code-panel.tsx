"use client";

import { Details } from "@loamui/core";
import { ExampleCode } from "./examples-code";
import type { ExampleSource } from "@/examples/types";
import classes from "./examples-code-panel.module.css";

/**
 * The code, collapsed under a native disclosure, so a category page reads
 * as a showcase first and a source listing second.
 */
export function ExampleCodePanel({ source }: { source: ExampleSource }) {
  return (
    <Details.Root className={classes.details}>
      <Details.Summary>Code</Details.Summary>
      <Details.Content className={classes.content}>
        <ExampleCode source={source} />
      </Details.Content>
    </Details.Root>
  );
}
