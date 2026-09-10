import Link from "next/link";
import classes from "./examples-pager.module.css";

export interface PagerLink {
  href: string;
  title: string;
}

/**
 * The foot of a category or example page: the previous and the next in
 * the sequence, each a card with an eyebrow saying which way it goes, so
 * a reader can walk the set without returning to the index.
 */
export function ExamplePager({
  previous,
  next,
  label,
}: {
  previous?: PagerLink;
  next?: PagerLink;
  /** What the sequence is of: "category" or "example". */
  label: string;
}) {
  if (!previous && !next) return null;
  return (
    <nav className={classes.pager} aria-label={`Previous and next ${label}`}>
      {previous ? (
        <Link href={previous.href} className={classes.link} rel="prev">
          <span className={classes.eyebrow}>Previous {label}</span>
          <span className={classes.title}>{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className={classes.link} data-next rel="next">
          <span className={classes.eyebrow}>Next {label}</span>
          <span className={classes.title}>{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
