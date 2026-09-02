"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Drawer } from "@loamui/core";
import { NavLinks } from "./NavLinks";
import classes from "./MobileNav.module.css";

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

/**
 * The mobile navigation: a hamburger that opens the documentation nav in a
 * Drawer. Shown only where the header nav and sidebar collapse (≤62rem). The
 * LoamUI Drawer gives the top layer, focus containment, Escape and
 * focus-restore for free; we drive open state so it closes on navigation.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger
        render={
          <button type="button" className={classes.trigger} aria-label="Open navigation menu">
            <MenuIcon />
          </button>
        }
      />
      <Drawer.Panel side="start" className={classes.panel}>
        <Drawer.Title className={classes.srOnly}>Navigation</Drawer.Title>
        <div className={classes.nav}>
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </Drawer.Panel>
    </Drawer.Root>
  );
}
