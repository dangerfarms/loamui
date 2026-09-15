import { Sidebar } from "@/site/Sidebar";
import { MarkdownLink } from "@/site/MarkdownLink";
import "./layout.css";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-DocsShell">
      <aside className="aside" aria-label="Sidebar">
        <div className="asideInner">
          <Sidebar />
        </div>
      </aside>
      <div className="content">
        <MarkdownLink />
        {children}
      </div>
    </div>
  );
}
