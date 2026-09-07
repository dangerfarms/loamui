"use client";

import type { FormEvent } from "react";
import { Range } from "@loamui/core";
import type { RangeProps } from "@loamui/core";

export interface ImageComparisonHandleProps extends Omit<RangeProps, "aria-label" | "max" | "min"> {
  /** The slider's accessible name, e.g. "Reveal the after image". Becomes `aria-label`. */
  label: string;
}

/** Write the slider's value, a percentage, onto the Root it shares a figure with. */
function position(event: FormEvent<HTMLInputElement>) {
  const root = event.currentTarget.closest<HTMLElement>(".loam-ImageComparison");
  root?.style.setProperty("--_position", `${event.currentTarget.value}%`);
}

/**
 * The control: core's `Range`, 0 to 100, starting at 50 to match the
 * frame's default. On input it sets `--_position` on the nearest
 * `ImageComparison.Root`; the stylesheet does the clipping, so no state is
 * held here. A bare Range has no Field to label it, hence the required
 * `label`.
 */
export function ImageComparisonHandle({
  label,
  defaultValue = 50,
  onInput,
  ...rest
}: ImageComparisonHandleProps) {
  return (
    <Range
      aria-label={label}
      min={0}
      max={100}
      defaultValue={defaultValue}
      onInput={(event) => {
        position(event);
        onInput?.(event);
      }}
      {...rest}
    />
  );
}
