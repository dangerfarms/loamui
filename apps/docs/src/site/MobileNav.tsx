"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, VisuallyHidden } from "@loamui/core";
import { NavLinks } from "./NavLinks";
import "./MobileNav.css";

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
          <button
            type="button"
            className="site-MobileNav-trigger"
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </button>
        }
      />
      <Drawer.Popup side="start" className="site-MobileNav-panel">
        <VisuallyHidden render={<Drawer.Title />}> Navigation</VisuallyHidden>
        <div className="nav site-NavLinks">
          <NavLinks onNavigate={() => setOpen(false)} />
          <Link href="/recipes" onClick={() => setOpen(false)}>
            Recipes
          </Link>
        </div>
      </Drawer.Popup>
    </Drawer.Root>
  );
}
