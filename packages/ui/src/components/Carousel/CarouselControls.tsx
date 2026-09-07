"use client";

import { useContext } from "react";
import { Button, cx } from "@loamui/core";
import type { PartProps } from "@loamui/core";
import { CarouselContext } from "./Carousel";

export interface CarouselControlsProps extends PartProps<"div"> {
  /** Label of the button that pages backwards. @default "Previous" */
  previousLabel?: string;
  /** Label of the button that pages forwards. @default "Next" */
  nextLabel?: string;
}

/** Scroll the Track by one of its widths; the snap points settle it on an item. */
function page(track: HTMLUListElement | null, direction: -1 | 1) {
  if (!track) return;
  const sign = getComputedStyle(track).direction === "rtl" ? -direction : direction;
  track.scrollBy({ left: sign * track.clientWidth });
}

/**
 * Two Buttons, "Previous" and "Next", that page the Track they share a
 * `Carousel.Root` with; the Root hands them the Track, so they work
 * wherever inside it you place them. Compositions built on Carousel
 * (Testimonials) reuse this as their own Controls.
 */
export function CarouselControls({
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
  ref,
  ...rest
}: CarouselControlsProps) {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error("Carousel.Controls must be rendered inside <Carousel.Root>.");
  }
  const { trackRef } = ctx;
  return (
    <div ref={ref} className={cx("controls", className)} {...rest}>
      <Button onClick={() => page(trackRef.current, -1)}>{previousLabel}</Button>
      <Button onClick={() => page(trackRef.current, 1)}>{nextLabel}</Button>
    </div>
  );
}
