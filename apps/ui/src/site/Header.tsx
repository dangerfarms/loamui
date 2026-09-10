import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubIcon } from "./Icons";
import classes from "./Header.module.css";

const CORE_URL = "https://loamui.com/";
const GITHUB_URL = "https://github.com/dangerfarms/loamui";

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.left}>
          <Logo />
          <span className={classes.tag}>UI</span>
          <nav className={classes.nav} aria-label="Primary">
            <a href={CORE_URL}>Core docs</a>
            <a href={`${CORE_URL}docs/composing/`}>Composing guide</a>
          </nav>
        </div>
        <div className={classes.right}>
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
