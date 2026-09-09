import Link from "next/link";
import { EXAMPLES, examplesByCategory } from "@/examples";
import classes from "./examples-rail.module.css";

/**
 * The category rail: every category with its count, the current one
 * marked. Sticky beside the content where there is room; a horizontal
 * scroller above it where there is not.
 */
export function ExamplesRail({ current }: { current?: string }) {
  const groups = examplesByCategory();
  return (
    <nav className={classes.rail} aria-label="Example categories">
      <ul className={classes.list}>
        <li>
          <Link
            href="/examples"
            className={classes.link}
            aria-current={current ? undefined : "page"}
          >
            <span>All examples</span>
            <span className={classes.count}>{EXAMPLES.length}</span>
          </Link>
        </li>
        {groups.map(({ category, items }) => (
          <li key={category.slug}>
            <Link
              href={`/examples/${category.slug}`}
              className={classes.link}
              aria-current={current === category.slug ? "page" : undefined}
            >
              <span>{category.title}</span>
              <span className={classes.count}>{items.length}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
