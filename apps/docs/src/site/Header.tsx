import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu } from "./CommandMenu";
import { MobileNav } from "./MobileNav";
import { GitHubIcon } from "./Icons";
import classes from "./Header.module.css";

const GITHUB_URL = "https://github.com/dangerfarms/loamui";

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.left}>
          <MobileNav />
          <Logo />
          <nav className={classes.nav} aria-label="Primary">
            <Link href="/docs/tokens">Tokens</Link>
            <Link href="/docs/element-styles">Element styles</Link>
            <Link href="/docs/components">Components</Link>
          </nav>
        </div>

        <div className={classes.right}>
          <div className={classes.search}>
            <CommandMenu />
          </div>
          <a
            className={classes.stars}
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LoamUI on GitHub"
          >
            <GitHubIcon width={16} height={16} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
