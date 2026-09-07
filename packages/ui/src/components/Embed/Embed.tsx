import type { HTMLAttributes, IframeHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface EmbedRootProps extends HTMLAttributes<HTMLElement> {
  /** An `Embed.Frame`, then an optional `Embed.Caption`. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A third-party frame placed in a page: a video, a map, a form.
 *
 * The unit is the figure. `Embed.Frame` is the `iframe`, and its `title`
 * is required at the type level because it is the only name assistive
 * technology has for the frame. The frame loads lazily so a map below the
 * fold costs nothing until it is near, sends a
 * `strict-origin-when-cross-origin` referrer so the host learns the page's
 * origin and no more, and allows full screen so a video can be watched
 * properly. It is sized by aspect ratio, `--loam-embed-ratio` (default
 * `16 / 9`), so the layout never shifts when the frame loads. What the
 * frame shows is decided by its `src`; there is no `kind` prop, a video and
 * a map are the same element. `Embed.Caption` is a real `figcaption`.
 *
 * ```tsx
 * <Embed.Root>
 *   <Embed.Frame
 *     src="https://www.youtube-nocookie.com/embed/…"
 *     title="Building a form with LoamUI (4 min)"
 *   />
 *   <Embed.Caption>A walkthrough of the Field parts.</Embed.Caption>
 * </Embed.Root>
 *
 * <Embed.Root style={{ "--loam-embed-ratio": "4 / 3" }}>
 *   <Embed.Frame src="https://www.openstreetmap.org/export/embed.html?…" title="Map of the office" />
 * </Embed.Root>
 * ```
 */
function EmbedRoot({ className, children, ref, ...rest }: EmbedRootProps) {
  return (
    <figure ref={ref} className={cx("loam-Embed", className)} {...rest}>
      {children}
    </figure>
  );
}

export interface EmbedFrameProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  /**
   * What the frame shows, for assistive technology: "Map of the office",
   * "Building a form with LoamUI (4 min)". Required.
   */
  title: string;
  ref?: Ref<HTMLIFrameElement>;
}

/**
 * The `iframe`. Lazy, referrer-limited and full-screen capable by default;
 * every iframe attribute is forwarded, so `loading="eager"` for a frame
 * above the fold is one prop.
 */
function EmbedFrame({ className, title, ref, ...rest }: EmbedFrameProps) {
  return (
    // No default sandbox: a video player needs scripts, same-origin and
    // presentation, a map needs scripts and popups, and a sandbox that
    // allows all of those is no sandbox. Pass one for a src you do not trust.
    <iframe
      ref={ref}
      className={cx("frame", className)}
      title={title}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      {...rest}
    />
  );
}

export interface EmbedCaptionProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** Optional. A `figcaption` under the frame: a credit, a summary, a link to the source. */
function EmbedCaption({ className, children, ref, ...rest }: EmbedCaptionProps) {
  return (
    <figcaption ref={ref} className={cx("caption", className)} {...rest}>
      {children}
    </figcaption>
  );
}

export const Embed = {
  Root: EmbedRoot,
  Frame: EmbedFrame,
  Caption: EmbedCaption,
};
