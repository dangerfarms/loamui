"use client";

import { useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";
import { PositionContext } from "./ImageComparisonContext";
import { ImageComparisonHandle } from "./ImageComparisonHandle";

export interface ImageComparisonRootProps extends HTMLAttributes<HTMLElement> {
  /** `ImageComparison.Before`, then `ImageComparison.After`, then a Handle and an optional Caption. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A before/after comparison: two images in one frame, the second clipped
 * at a position the reader moves with a slider.
 *
 * The Root is a `figure` laid out as a single-column grid. `Before`,
 * `After` and the divider line all sit in the first row, stacked in DOM
 * order (so write Before, then After), and the row's height comes from the
 * images' shared aspect ratio; nothing is absolutely positioned. The
 * Handle and the optional Caption take the rows below. The position is
 * the public `--loam-comparison-position` on the Root, a percentage the
 * Handle writes from its value; the stylesheet falls back to 50%, so with
 * no JavaScript the frame shows half of each image and the comparison is
 * legible before, or without, the script. The Handle is core's `Range`, a
 * real `<input type="range">` with an `aria-label`, so the control is
 * keyboard-operable and announced with a name and a value. Both images
 * need real `alt` text; the frame's aspect ratio is the public
 * `--loam-comparison-ratio` (default `16 / 9`), set on the Root.
 *
 * ```tsx
 * <ImageComparison.Root>
 *   <ImageComparison.Before>
 *     <img src="/kitchen-before.jpg" alt="The kitchen before the renovation" />
 *   </ImageComparison.Before>
 *   <ImageComparison.After>
 *     <img src="/kitchen-after.jpg" alt="The kitchen after the renovation" />
 *   </ImageComparison.After>
 *   <ImageComparison.Handle />
 *   <ImageComparison.Caption>The kitchen, before and after.</ImageComparison.Caption>
 * </ImageComparison.Root>
 * ```
 */
function ImageComparisonRoot({
  className,
  style,
  children,
  ref,
  ...rest
}: ImageComparisonRootProps) {
  // Null until a Handle reports in, so a Root with no Handle, or one not
  // yet hydrated, leaves the stylesheet's fallback and any value set in
  // the consumer's own style alone.
  const [position, setPosition] = useState<number | null>(null);
  const styles =
    position === null
      ? style
      : ({ ...style, "--loam-comparison-position": `${position}%` } as CSSProperties);
  return (
    <figure ref={ref} className={cx("loam-ImageComparison", className)} style={styles} {...rest}>
      <PositionContext value={setPosition}>{children}</PositionContext>
    </figure>
  );
}

export interface ImageComparisonSlotProps extends HTMLAttributes<HTMLDivElement> {
  /** Your `img`, with real `alt` text. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** The underlying image's slot. Write it first; it fills the frame and is never clipped. */
function ImageComparisonBefore({ className, children, ref, ...rest }: ImageComparisonSlotProps) {
  return (
    <div ref={ref} className={cx("before", className)} {...rest}>
      {children}
    </div>
  );
}

/** The top image's slot. Sits over Before and is clipped at the Handle's position. */
function ImageComparisonAfter({ className, children, ref, ...rest }: ImageComparisonSlotProps) {
  return (
    <div ref={ref} className={cx("after", className)} {...rest}>
      {children}
    </div>
  );
}

export interface ImageComparisonCaptionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** An optional `figcaption` naming what the two images show. */
function ImageComparisonCaption({
  className,
  children,
  ref,
  ...rest
}: ImageComparisonCaptionProps) {
  return (
    <figcaption ref={ref} className={cx("caption", className)} {...rest}>
      {children}
    </figcaption>
  );
}

export const ImageComparison = {
  Root: ImageComparisonRoot,
  Before: ImageComparisonBefore,
  After: ImageComparisonAfter,
  Handle: ImageComparisonHandle,
  Caption: ImageComparisonCaption,
};
