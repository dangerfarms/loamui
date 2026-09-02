"use client";

import { Drawer } from "@loamui/core";
import type { DrawerSide } from "@loamui/core";
import type { CSSProperties } from "react";

const navLinks = ["Dashboard", "Orders", "Customers", "Settings"];

function DrawerNav() {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--loam-space-md)",
        marginBlock: "var(--loam-space-sm)",
      }}
    >
      {navLinks.map((label) => (
        <a
          key={label}
          href={`#${label.toLowerCase()}`}
          style={{ color: "var(--loam-color-fg)", textDecoration: "none" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

export function DrawerDemo() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open menu</Drawer.Trigger>
      <Drawer.Panel side="start">
        <Drawer.Title>Navigation</Drawer.Title>
        <Drawer.Description>Jump to a section of the app.</Drawer.Description>
        <DrawerNav />
        <Drawer.Close>Close</Drawer.Close>
      </Drawer.Panel>
    </Drawer.Root>
  );
}

export function DrawerSidesDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--loam-space-sm)",
        alignItems: "center",
      }}
    >
      {(["start", "end", "top", "bottom"] as DrawerSide[]).map((side) => (
        <Drawer.Root key={side}>
          <Drawer.Trigger>From {side}</Drawer.Trigger>
          <Drawer.Panel side={side}>
            <Drawer.Title>Side: {side}</Drawer.Title>
            <Drawer.Description>
              start/end set the panel width; top/bottom set its height. Both follow writing mode.
            </Drawer.Description>
            <Drawer.Close>Close</Drawer.Close>
          </Drawer.Panel>
        </Drawer.Root>
      ))}
    </div>
  );
}

export function DrawerPanelSizeDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--loam-space-sm)",
        alignItems: "center",
      }}
    >
      {(["18rem", "24rem", "30rem"] as const).map((size) => (
        <Drawer.Root key={size}>
          <Drawer.Trigger>Open {size}</Drawer.Trigger>
          <Drawer.Panel side="end" style={{ "--loam-drawer-size": size } as CSSProperties}>
            <Drawer.Title>A {size} drawer</Drawer.Title>
            <Drawer.Description>The width comes from one custom property.</Drawer.Description>
            <Drawer.Close>Close</Drawer.Close>
          </Drawer.Panel>
        </Drawer.Root>
      ))}
    </div>
  );
}

export function DrawerHeaderCloseDemo() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Filters</Drawer.Trigger>
      <Drawer.Panel side="end">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBlockEnd: "var(--loam-space-sm)",
          }}
        >
          <Drawer.Title style={{ margin: 0 }}>Filters</Drawer.Title>
          <Drawer.Close aria-label="Close">×</Drawer.Close>
        </div>
        <Drawer.Description>Refine the results shown in the list.</Drawer.Description>
      </Drawer.Panel>
    </Drawer.Root>
  );
}
