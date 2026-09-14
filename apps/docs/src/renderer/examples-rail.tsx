import Link from "next/link";
import { EXAMPLE_META, examplesByCategory } from "@/examples/catalog";
import classes from "./examples-rail.module.css";

/**
 * The category rail: every category with its count, the current one
 * marked. Sticky beside the content where there is room; a horizontal
 * scroller above it where there is not.
 * Prefetching the whole rail would load every category before it is visited.
 */
export function ExamplesRail({ current }: { current?: string }) {
  const groups = examplesByCategory();
  return (
    <nav className={classes.rail} aria-label="Recipe categories">
      <ul className={classes.list}>
        <li>
          <Link
            href="/recipes"
            prefetch={false}
            className={classes.link}
            aria-current={current ? undefined : "page"}
          >
            <span>All recipes</span>
            <span className={classes.count}>{EXAMPLE_META.length}</span>
          </Link>
        </li>
        {groups.map(({ category, items }) => (
          <li key={category.slug}>
            <Link
              href={`/recipes/${category.slug}`}
              prefetch={false}
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
