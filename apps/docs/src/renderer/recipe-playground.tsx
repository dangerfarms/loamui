"use client";

import type { ReactNode } from "react";
import { Tabs } from "@loamui/core";
import type { ExampleSource } from "@/examples/types";
import { CodeBlock } from "./CodeBlock";
import { ExampleStage } from "./examples-stage";
import "./recipe-playground.css";

export function RecipePlayground({
  title,
  source,
  children,
}: {
  title: string;
  source: ExampleSource;
  children: ReactNode;
}) {
  return (
    <div className="site-RecipePlayground">
      <Tabs.Root defaultValue="preview">
        <Tabs.List aria-label={`${title} preview and source`}>
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
          <Tabs.Tab value="react">React</Tabs.Tab>
          <Tabs.Tab value="css">CSS</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="preview">
          <ExampleStage title={title}>{children}</ExampleStage>
        </Tabs.Panel>
        <Tabs.Panel value="react">
          <CodeBlock code={source.tsx} language="tsx" />
        </Tabs.Panel>
        <Tabs.Panel value="css">
          <CodeBlock code={source.css} language="css" />
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
