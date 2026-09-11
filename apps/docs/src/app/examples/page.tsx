import type { Metadata } from "next";
import { ExamplesRail } from "@/renderer/examples-rail";
import { ExamplesIndex } from "@/renderer/examples-index";
import c from "@/renderer/examples-page.module.css";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Explore copyable forms, navigation, cards and page sections built with LoamUI’s tokens, element styles and React components.",
};

export default function ExamplesPage() {
  return (
    <div className={c.page}>
      <header className={c.hero}>
        <span className="eyebrow">Examples</span>
        <h1 className={c.title}>Examples to make your own.</h1>
        <p className={c.lead}>
          Explore forms, navigation, cards and page sections built with LoamUI’s tokens, element
          styles and React components. Preview each example, read the design decisions, and copy the
          React and CSS into your project. Start with the{" "}
          <a href="/docs/composing">Composing guide</a>.
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
