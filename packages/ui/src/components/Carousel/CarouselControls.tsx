"use client";

import type { HTMLAttributes, MouseEvent, Ref } from "react";
import { Button } from "@loamui/core";
import { cx } from "../../utils";

export interface CarouselControlsProps extends HTMLAttributes<HTMLDivElement> {
  /** Label of the button that pages backwards. @default "Previous" */
  previousLabel?: string;
  /** Label of the button that pages forwards. @default "Next" */
  nextLabel?: string;
  ref?: Ref<HTMLDivElement>;
}

/** Scroll the nearest Track by one of its widths; the snap points settle it on an item. */
function page(event: MouseEvent<HTMLButtonElement>, direction: -1 | 1) {
  const track = event.currentTarget
    .closest(".loam-Carousel")
    ?.querySelector<HTMLUListElement>("ul.track");
  if (!track) return;
  const sign = getComputedStyle(track).direction === "rtl" ? -direction : direction;
  track.scrollBy({ left: sign * track.clientWidth });
}

/**
 * Two Buttons, "Previous" and "Next", that page the Track they share a
 * `Carousel.Root` with. Place them anywhere inside the Root.
 */
export function CarouselControls({
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
  ref,
  ...rest
}: CarouselControlsProps) {
  return (
    <div ref={ref} className={cx("controls", className)} {...rest}>
      <Button onClick={(event) => page(event, -1)}>{previousLabel}</Button>
      <Button onClick={(event) => page(event, 1)}>{nextLabel}</Button>
    </div>
  );
}
