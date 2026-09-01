"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GETTING_STARTED, PRIMITIVES, componentsByCategory } from "./nav";
import classes from "./Sidebar.module.css";

/**
 * The documentation navigation: Getting started, then a Primitives section
 * where tokens, element styles and components read as three peer destinations.
 * The component categories nest beneath the Components primitive (by
 * indentation, not a separate section), so Components stays part of the trio
 * instead of splitting off. Shared by the desktop Sidebar and the mobile
 * Drawer so the two never drift. `onNavigate` fires when a link is chosen, so
 * the Drawer can close on selection.
 */
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const groups = componentsByCategory();
  const isActive = (href: string) => pathname === href;

  const renderLink = (href: string, name: string) => (
    <li key={href}>
      <Link
        href={href}
        className={classes.link}
        data-active={isActive(href) || undefined}
        onClick={onNavigate}
      >
        {name}
      </Link>
    </li>
  );

  return (
    <>
      <div className={classes.group}>
        <p className={classes.groupTitle}>Getting started</p>
        <ul>{GETTING_STARTED.map((g) => renderLink(g.href, g.name))}</ul>
      </div>

      <div className={classes.section}>
        <p className={classes.sectionTitle}>Primitives</p>

        {/* The three primitives as peer links; Components is the last of them
            and the parent of the category tree that follows. */}
        <ul className={classes.primitiveList}>
          {PRIMITIVES.map((p) => renderLink(p.href, p.name))}
        </ul>

        <div className={classes.componentTree}>
          {groups.map((group) => (
            <div key={group.category} className={classes.subgroup}>
              <p className={classes.categoryTitle}>{group.category}</p>
              <ul className={classes.itemList}>
                {group.items.map((item) => renderLink(`/docs/components/${item.slug}`, item.name))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
