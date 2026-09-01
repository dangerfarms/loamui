import Link from "next/link";
import { Logo } from "./Logo";
import { GitHubIcon } from "./Icons";
import classes from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Tokens", href: "/docs/tokens" },
      { label: "Element styles", href: "/docs/element-styles" },
      { label: "Components", href: "/docs/components" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Input", href: "/docs/components/input" },
      { label: "Modal", href: "/docs/components/modal" },
      { label: "Tabs", href: "/docs/components/tabs" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/dangerfarms/loamui" },
      {
        label: "Changelog",
        href: "https://github.com/dangerfarms/loamui/releases",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.inner}`}>
        <div className={classes.brand}>
          <Logo />
          <p className={classes.tagline}>
            Modern UI primitives for agent-assisted developers. Open source and MIT-licensed.
          </p>
          <a
            className={classes.gh}
            href="https://github.com/dangerfarms/loamui"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon width={16} height={16} /> Star on GitHub
          </a>
        </div>

        <div className={classes.cols}>
          {COLUMNS.map((col) => (
            <div key={col.title} className={classes.col}>
              <h3 className={classes.colTitle}>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`container ${classes.bottom}`}>
        <span>© {new Date().getFullYear()} LoamUI. Built by Danger Farms.</span>
        <span>Built with modern CSS.</span>
      </div>
    </footer>
  );
}
