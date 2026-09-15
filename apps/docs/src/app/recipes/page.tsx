import type { Metadata } from "next";
import { ExamplesRail } from "@/renderer/examples-rail";
import { ExamplesIndex } from "@/renderer/examples-index";
import "@/renderer/examples-page.css";

export const metadata: Metadata = {
  title: "Example recipes",
  description:
    "Example recipes we built for our own products with LoamUI’s tokens, element styles and React components: worked references to take inspiration from.",
};

export default function ExamplesPage() {
  return (
    <div className="site-RecipePage">
      <header className="hero">
        <span className="eyebrow">Example recipes</span>
        <h1 className="title">Recipes we built for our own products.</h1>
        <p className="lead">
          Explore product-specific compositions of LoamUI’s tokens, element styles and React
          components. Inspect the preview and source, then adapt a recipe to your own content.
        </p>
        <p className="lead">
          <a href="/recipes/guide">Building your own recipes</a> explains how to choose a pattern,
          compose it and adapt it to your content.
        </p>
      </header>
      <div className="shell">
        <aside className="aside">
          <ExamplesRail />
        </aside>
        <div className="content">
          <ExamplesIndex />
        </div>
      </div>
    </div>
  );
}
