import Link from "next/link";
import classes from "./Logo.module.css";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className={classes.logo} aria-label="LoamUI home">
      <span className={classes.mark} aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          {/* performance bolt */}
          <path d="M13 2 4 13.5h6L11 22l9-11.5h-6L13 2z" fill="currentColor" />
        </svg>
      </span>
      <span className={classes.word}>
        Loam<span className={classes.ui}>UI</span>
      </span>
    </Link>
  );
}
