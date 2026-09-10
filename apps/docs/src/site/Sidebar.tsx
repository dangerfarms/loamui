"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NavLinks } from "./NavLinks";
import classes from "./Sidebar.module.css";

/**
 * The docs sidebar. On every navigation the current link is brought into
 * view inside the sidebar's own scroller (the nearest scrolling ancestor),
 * without moving the page, so a reader deep in the component list always
 * sees where they are.
 */
export function Sidebar() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const nav = ref.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    const scroller = nav?.parentElement;
    if (!nav || !link || !scroller) return;
    const box = scroller.getBoundingClientRect();
    const at = link.getBoundingClientRect();
    if (at.top >= box.top && at.bottom <= box.bottom) return;
    scroller.scrollTo({
      top: scroller.scrollTop + (at.top - box.top) - box.height / 2 + at.height / 2,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <nav ref={ref} className={classes.sidebar} aria-label="Documentation">
      <NavLinks />
    </nav>
  );
}
