import type { MDXComponents } from "mdx/types";
import type { ReactElement, ReactNode } from "react";
import { CodeBlock } from "@/renderer/CodeBlock";
import prose from "@/app/docs/prose.module.css";

/** Native fences render through the site's CodeBlock. */
function Pre({ children }: { children?: ReactNode }) {
  const code = children as ReactElement<{ className?: string; children?: string }>;
  const language = code?.props?.className?.replace("language-", "") ?? "tsx";
  const text = typeof code?.props?.children === "string" ? code.props.children.trimEnd() : "";
  return (
    <div className={prose.block}>
      <CodeBlock code={text} language={language} />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }: { children?: ReactNode }) => (
      <div className={prose.prose}>{children}</div>
    ),
    pre: Pre,
    ...components,
  };
}
