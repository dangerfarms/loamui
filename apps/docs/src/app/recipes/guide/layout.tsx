import { ExamplesRail } from "@/renderer/examples-rail";
import { MarkdownLink } from "@/site/MarkdownLink";
import "@/renderer/examples-page.css";

export default function RecipeGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-RecipePage">
      <div className="shell">
        <aside className="aside">
          <ExamplesRail current="guide" />
        </aside>
        <article className="content">
          <MarkdownLink />
          {children}
        </article>
      </div>
    </div>
  );
}
