"use client";

import { Tooltip } from "@loamui/core";

export function TooltipPositions() {
  return (
    <>
      {(["top", "bottom", "left", "right"] as const).map((position) => (
        <Tooltip.Root key={position}>
          <Tooltip.Trigger style={{ textTransform: "capitalize" }}>{position}</Tooltip.Trigger>
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
