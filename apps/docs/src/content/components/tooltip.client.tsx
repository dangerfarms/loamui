"use client";

import { Tooltip } from "@loamui/core";

const positions = [
  ["Top", "top"],
  ["Bottom", "bottom"],
  ["Left", "left"],
  ["Right", "right"],
] as const;

export function TooltipPositions() {
  return (
    <>
      {positions.map(([label, position]) => (
        <Tooltip.Root key={position}>
          <Tooltip.Trigger>{label}</Tooltip.Trigger>
          <Tooltip.Popup position={position}>On the {position}</Tooltip.Popup>
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
