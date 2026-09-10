"use client";

import { Tooltip } from "@loamui/core";

const sides = [
  ["Top", "top"],
  ["Bottom", "bottom"],
  ["Left", "left"],
  ["Right", "right"],
] as const;

export function TooltipSides() {
  return (
    <>
      {sides.map(([label, side]) => (
        <Tooltip.Root key={side}>
          <Tooltip.Trigger>{label}</Tooltip.Trigger>
          <Tooltip.Popup side={side}>On the {side}</Tooltip.Popup>
        </Tooltip.Root>
      ))}
    </>
  );
}

export function TooltipArrow() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
      <Tooltip.Popup>
        Saved just now <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Root>
  );
}

export function TooltipGroup() {
  return (
    <Tooltip.Provider>
      {["Cut", "Copy", "Paste"].map((label) => (
        <Tooltip.Root key={label}>
          <Tooltip.Trigger>{label}</Tooltip.Trigger>
          <Tooltip.Popup>
            {label} the selection <Tooltip.Arrow />
          </Tooltip.Popup>
        </Tooltip.Root>
      ))}
    </Tooltip.Provider>
  );
}
