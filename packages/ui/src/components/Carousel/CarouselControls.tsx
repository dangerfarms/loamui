"use client";

import type { HTMLAttributes, MouseEvent, Ref } from "react";
import { Button, cx } from "@loamui/core";

export interface TrackControlsProps extends HTMLAttributes<HTMLDivElement> {
  /** Label of the button that pages backwards. @default "Previous" */
  previousLabel?: string;
  /** Label of the button that pages forwards. @default "Next" */
  nextLabel?: string;
  ref?: Ref<HTMLDivElement>;
}

export type CarouselControlsProps = TrackControlsProps;
export type TestimonialsControlsProps = TrackControlsProps;

/** Scroll the nearest Track by one of its widths; the snap points settle it on an item. */
function page(event: MouseEvent<HTMLButtonElement>, rootClass: string, direction: -1 | 1) {
  const track = event.currentTarget
    .closest(`.${rootClass}`)
    ?.querySelector<HTMLUListElement>("ul.track");
  if (!track) return;
  const sign = getComputedStyle(track).direction === "rtl" ? -direction : direction;
  track.scrollBy({ left: sign * track.clientWidth });
}

/**
 * Two Buttons, "Previous" and "Next", that page the Track they share a root
 * with. Place them anywhere inside the Root. One implementation serves every
 * scroll-snap composition; the root class is the only difference.
 */
function trackControls(rootClass: string) {
  return function TrackControls({
    previousLabel = "Previous",
    nextLabel = "Next",
    className,
    ref,
    ...rest
  }: TrackControlsProps) {
    return (
      <div ref={ref} className={cx("controls", className)} {...rest}>
        <Button onClick={(event) => page(event, rootClass, -1)}>{previousLabel}</Button>
        <Button onClick={(event) => page(event, rootClass, 1)}>{nextLabel}</Button>
      </div>
    );
  };
}

export const CarouselControls = trackControls("loam-Carousel");
export const TestimonialsControls = trackControls("loam-Testimonials");
