import Link from "next/link";
import { Logo } from "./Logo";
import "./Footer.css";

const groups = [
  {
    title: "Get started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Build with the skill", href: "/docs/agent-workflow" },
    ],
  },
  {
    title: "Primitives",
    links: [
      { label: "Tokens", href: "/docs/tokens" },
      { label: "Element styles", href: "/docs/element-styles" },
      { label: "Components", href: "/docs/components" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Recipes", href: "/recipes" },
      { label: "Accessibility", href: "/docs/accessibility" },
      { label: "GitHub", href: "https://github.com/loamui/loamui" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-Footer">
      <div className="container">
        <div className="links">
          <div className="brand">
            <Logo />
            <p>Modern UI primitives for agent-assisted developers. Open source and MIT-licensed.</p>
          </div>
          <nav aria-label="Footer">
            {groups.map(({ title, links }) => (
              <div key={title}>
                <h2>{title}</h2>
                <ul>
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      {href.startsWith("https://") ? (
                        <a href={href}>{label}</a>
                      ) : (
                        <Link href={href}>{label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="bottom">
          <span>© {new Date().getFullYear()} LoamUI. Built by Danger Farms.</span>
          <a href="/llms.txt">Browse the Markdown documentation</a>
        </div>
      </div>
    </footer>
  );
}
