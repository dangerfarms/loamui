import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";
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
 * Handle and the optional Caption take the rows below. The position is a
 * private custom property on the Root, `--_position`, which defaults to
 * 50%: with no JavaScript the frame shows half of each image, so the
 * comparison is legible before, or without, the script. The Handle is
 * core's `Range`, a real `<input type="range">` with a required `label`,
 * so the control is keyboard-operable and announced with a name and a
 * value. Both images need real `alt` text; the frame's aspect ratio is the
 * public `--loam-comparison-ratio` (default `16 / 9`), set on the Root.
 *
 * ```tsx
 * <ImageComparison.Root>
 *   <ImageComparison.Before>
 *     <img src="/kitchen-before.jpg" alt="The kitchen before the renovation" />
 *   </ImageComparison.Before>
 *   <ImageComparison.After>
 *     <img src="/kitchen-after.jpg" alt="The kitchen after the renovation" />
 *   </ImageComparison.After>
 *   <ImageComparison.Handle label="Reveal the after image" />
 *   <ImageComparison.Caption>The kitchen, before and after.</ImageComparison.Caption>
 * </ImageComparison.Root>
 * ```
 */
function ImageComparisonRoot({ className, children, ref, ...rest }: ImageComparisonRootProps) {
  return (
    <figure ref={ref} className={cx("loam-ImageComparison", className)} {...rest}>
      {children}
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
