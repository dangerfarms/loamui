import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu } from "./CommandMenu";
import { MobileNav } from "./MobileNav";
import { HeaderNav } from "./HeaderNav";
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
          <HeaderNav />
        </div>

        <div className={classes.right}>
          <CommandMenu />
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
