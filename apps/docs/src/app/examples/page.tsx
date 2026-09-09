import type { Metadata } from "next";
import { EXAMPLES } from "@/examples";
import { COMPONENTS } from "@/site/nav";
import { ExamplesRail } from "@/renderer/examples-rail";
import { ExamplesIndex } from "@/renderer/examples-index";
import c from "@/renderer/examples-page.module.css";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Ready-made sections built from @loamui/core, held to the five pillars: copy the two files and change what you like.",
};

export default function ExamplesPage() {
  return (
    <div className={c.page}>
      <header className={c.hero}>
        <span className="eyebrow">Examples</span>
        <h1 className={c.title}>
          {EXAMPLES.length} {EXAMPLES.length === 1 ? "example" : "examples"}{" "}
          built from the {COMPONENTS.length} components, to copy and change.
        </h1>
        <p className={c.lead}>
          Each one is a component and a stylesheet, nothing else. Copy the two
          files into your project, or point your agent at the markdown twin; the{" "}
          <a href="/docs/composing">Composing guide</a> is the recipe they all
          follow.
        </p>
      </header>
      <div className={c.shell}>
        <aside className={c.aside}>
          <ExamplesRail />
        </aside>
        <div className={c.content}>
          <ExamplesIndex />
        </div>
      </div>
    </div>
  );
}
