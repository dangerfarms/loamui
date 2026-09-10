import Link from "next/link";
import { Logo } from "./Logo";
import { GitHubIcon } from "./Icons";
import { EXAMPLE_CATEGORIES } from "../examples/categories";
import classes from "./Footer.module.css";

const GITHUB_URL = "https://github.com/dangerfarms/loamui";

const COLUMNS = [
  {
    title: "Getting started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Contextualism", href: "/docs/contextualism" },
      { label: "Composing components", href: "/docs/composing" },
      { label: "Accessibility", href: "/docs/accessibility" },
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
    title: "Examples",
    links: [
      { label: "All examples", href: "/examples" },
      ...EXAMPLE_CATEGORIES.slice(0, 4).map((c) => ({
        label: c.title,
        href: `/examples/${c.slug}`,
      })),
    ],
  },
  {
    title: "For agents",
    links: [
      { label: "llms.txt", href: "/llms.txt" },
      { label: "Composing components", href: "/docs/composing" },
      { label: "Contributor skills", href: `${GITHUB_URL}/tree/main/.agents/skills` },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "Changelog", href: `${GITHUB_URL}/releases` },
      { label: "MIT licence", href: `${GITHUB_URL}/blob/main/LICENSE` },
    ],
  },
];

/** Site links go through the router; external ones are plain anchors. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
}

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.inner}`}>
        <div className={classes.brand}>
          <Logo />
          <p className={classes.tagline}>
            Modern UI primitives for agent-assisted developers. Open source and MIT-licensed.
          </p>
          <a className={classes.gh} href={GITHUB_URL} target="_blank" rel="noreferrer">
            <GitHubIcon width={16} height={16} /> Star on GitHub
          </a>
        </div>

        <nav className={classes.cols} aria-label="Site map">
          {COLUMNS.map((col) => (
            <div key={col.title} className={classes.col}>
              <h2 className={classes.colTitle}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={`container ${classes.bottom}`}>
        <span>© {new Date().getFullYear()} LoamUI. Built by Danger Farms.</span>
        <span>
          Every page has a markdown twin: add <code>.md</code> to its address.
        </span>
      </div>
    </footer>
  );
}
