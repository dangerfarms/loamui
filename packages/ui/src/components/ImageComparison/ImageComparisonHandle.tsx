"use client";

import { useContext, useEffect, useState } from "react";
import { Range } from "@loamui/core";
import type { RangeProps } from "@loamui/core";
import { PositionContext } from "./ImageComparisonContext";

export interface ImageComparisonHandleProps extends Omit<
  RangeProps,
  "aria-label" | "defaultValue" | "max" | "min" | "value"
> {
  /**
   * The slider's accessible name, set as `aria-label`. Yields to an
   * `aria-labelledby` you pass instead. @default "Reveal the after image"
   */
  label?: string;
  /** Uncontrolled: where the reveal starts, 0 to 100. @default 50 */
  defaultValue?: number;
  /** Controlled: the reveal's position, 0 to 100. Pair with `onValueChange`. */
  value?: number;
  /** Called with the new position, 0 to 100, on every move. */
  onValueChange?: (value: number) => void;
}

/**
 * The control: core's `Range`, 0 to 100, starting at 50 to match the
 * frame's fallback. Uncontrolled via `defaultValue`, or controlled with
 * `value` and `onValueChange`; either way the current position reaches the
 * Root it shares a figure with, which writes it as
 * `--loam-comparison-position` for the stylesheet to clip by. A bare Range
 * has no Field to label it, hence the `label`, "Reveal the after image"
 * unless you say otherwise.
 */
export function ImageComparisonHandle({
  label = "Reveal the after image",
  defaultValue = 50,
  value,
  onValueChange,
  onChange,
  ...rest
}: ImageComparisonHandleProps) {
  const setPosition = useContext(PositionContext);
  if (!setPosition) {
    throw new Error("ImageComparison.Handle must be rendered inside <ImageComparison.Root>.");
  }
  const [own, setOwn] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : own;
  useEffect(() => setPosition(current), [current, setPosition]);

  return (
    <Range
      aria-label={rest["aria-labelledby"] ? undefined : label}
      min={0}
      max={100}
      value={controlled ? value : undefined}
      defaultValue={controlled ? undefined : defaultValue}
      onChange={(event) => {
        const next = Number(event.currentTarget.value);
        if (!controlled) setOwn(next);
        onValueChange?.(next);
        onChange?.(event);
      }}
      {...rest}
    />
  );
}
