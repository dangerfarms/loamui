import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx, type LoamUISize } from "../../utils";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Control size. @default "md" */
  size?: LoamUISize;
  /** Render a status dot before the label, colored by the context. */
  dot?: boolean;
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * A compact pill for statuses, counts, and labels.
 *
 * Neutral by default; a --loam-context region colours it. Declare
 * `--loam-context` on a region (an ancestor — a style query never matches
 * the element that declares it, so a one-element region is a wrapper) and
 * the pill's tint and text derive from that status's colour. Icons are
 * composed as svg children and detected — there are no slot props.
 */
export function Badge({ size = "md", dot, className, style, children, ref, ...rest }: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cx("loam-Badge", className)}
      data-size={size}
      style={style}
      {...rest}
    >
      {dot && <span className="dot" aria-hidden />}
      {children}
    </span>
  );
}
