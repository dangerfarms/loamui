"use client";

import { Drawer } from "@farmui/core";
import type { DrawerSide } from "@farmui/core";

const navLinks = ["Dashboard", "Orders", "Customers", "Settings"];

function DrawerNav() {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--fui-space-md)",
        marginBlock: "var(--fui-space-sm)",
      }}
    >
      {navLinks.map((label) => (
        <a
          key={label}
          href={`#${label.toLowerCase()}`}
          style={{ color: "var(--fui-color-fg)", textDecoration: "none" }}
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
        gap: "var(--fui-space-sm)",
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

export function DrawerSizesDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--fui-space-sm)",
        alignItems: "center",
      }}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <Drawer.Root key={size}>
          <Drawer.Trigger>Open {size}</Drawer.Trigger>
          <Drawer.Panel side="end" size={size}>
            <Drawer.Title>A {size} drawer</Drawer.Title>
            <Drawer.Description>The panel width comes from the size prop.</Drawer.Description>
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
            marginBlockEnd: "var(--fui-space-sm)",
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
