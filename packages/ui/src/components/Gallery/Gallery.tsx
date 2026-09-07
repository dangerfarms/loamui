import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";
import { GalleryRoot, GalleryItem } from "./GalleryList";
import { GalleryLink } from "./GalleryLightbox";

export interface GalleryCaptionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** The caption, a `figcaption` under the image. Muted and small. */
function GalleryCaption({ className, children, ref, ...rest }: GalleryCaptionProps) {
  return (
    <figcaption ref={ref} className={cx("caption", className)} {...rest}>
      {children}
    </figcaption>
  );
}

/**
 * A gallery: figures of images, each opening larger.
 *
 * The unit is the figure. `Gallery.Item` holds a `Gallery.Link` around
 * your `<img>` (a plain one or a framework's) and an optional
 * `Gallery.Caption`, so it stands on its own in an article as readily as
 * in a grid. `Gallery.Root` is optional: a list, so the count is
 * announced, laid out as many columns as fit. The link's `href` is the
 * full-size image, which makes every thumbnail a working link without
 * JavaScript; once hydrated a click opens that image in a lightbox
 * instead, a core Modal, so the native dialog supplies the backdrop,
 * Escape and focus restore. Thumbnails are square; set another
 * `aspect-ratio` on the `img` in your own CSS.
 *
 * ```tsx
 * <Gallery.Root>
 *   <Gallery.Item>
 *     <Gallery.Link href="/photos/harbour.jpg">
 *       <img src="/photos/harbour-thumb.jpg" alt="Fishing boats in the harbour at dawn" />
 *     </Gallery.Link>
 *     <Gallery.Caption>The harbour, six in the morning</Gallery.Caption>
 *   </Gallery.Item>
 *   <Gallery.Item>…</Gallery.Item>
 * </Gallery.Root>
 * ```
 */
export const Gallery = {
  Root: GalleryRoot,
  Item: GalleryItem,
  Link: GalleryLink,
  Caption: GalleryCaption,
};
