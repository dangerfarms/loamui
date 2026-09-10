"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Header.module.css";

const LINKS = [
  { name: "Tokens", href: "/docs/tokens" },
  { name: "Element styles", href: "/docs/element-styles" },
  { name: "Components", href: "/docs/components" },
  { name: "Examples", href: "/examples" },
];

/**
 * The primary navigation, with the current section marked. A section's
 * link is current on its own page and on every page beneath it
 * (`/docs/components/button` marks Components), so the header always says
 * where in the site the reader is.
 */
export function HeaderNav() {
  const pathname = usePathname() ?? "";
  const current = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <nav className={classes.nav} aria-label="Primary">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined}>
          {l.name}
        </Link>
      ))}
    </nav>
  );
}
