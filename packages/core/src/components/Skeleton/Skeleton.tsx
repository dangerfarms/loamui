import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Inline size (any CSS length). Bare placeholders default to "100%". */
  width?: number | string;
  /** Block size (any CSS length). Bare placeholders default to "1lh". */
  height?: number | string;
  /** Render as a circle (width sets the diameter; radius is ignored). */
  circle?: boolean;
  /** When false, render `children` instead of the placeholder. @default true */
  visible?: boolean;
  /** Real content: it sizes the placeholder, and shows once `visible` is false. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const toLen = (v: number | string | undefined): string | undefined =>
  typeof v === "number" ? `${v}px` : v;

/**
 * An animated placeholder shown while content loads.
 *
 * Wrapped children size the box, so the placeholder mirrors the coming
 * layout with nothing declared; `width`/`height` are for bare
 * placeholders, where the absent content cannot be measured. All sizing
 * policy lives in the stylesheet — inline custom properties carry only
 * what the consumer declared, so skeletons stay themeable from CSS.
 */
export function Skeleton({
  width,
  height,
  circle,
  visible = true,
  className,
  style,
  children,
  ref,
  ...rest
}: SkeletonProps) {
  if (!visible) return <>{children}</>;

  const declared: Record<string, string> = {};
  if (circle) {
    const size = toLen(width) ?? toLen(height);
    if (size) declared["--_size"] = size;
  } else {
    const w = toLen(width);
    const h = toLen(height);
    if (w) declared["--_w"] = w;
    if (h) declared["--_h"] = h;
  }

  return (
    <div
      ref={ref}
      className={cx("loam-Skeleton", className)}
      aria-hidden
      data-circle={circle || undefined}
      style={{ ...declared, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
