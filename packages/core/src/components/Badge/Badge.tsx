import type { ReactNode } from "react";
import { cx, type LoamUISize, type PartProps } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

export interface BadgeProps extends Omit<PartProps<"span">, "color"> {
  /** Control size. @default "md" */
  size?: LoamUISize;
  /**
   * Render as a different element: `render={<a href="…" />}` for a badge
   * that is a link (a tag in a tag list). The Badge's class and attributes
   * merge onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

export interface BadgeDotProps extends PartProps<"span"> {}

/**
 * A status dot before the label, carrying the raw context colour: a swatch,
 * not text. Decoration, so the visible word must carry the state on its own.
 */
function BadgeDot({ className, ...rest }: BadgeDotProps) {
  return <span className={cx("dot", className)} aria-hidden {...rest} />;
}

/**
 * A compact pill for statuses, counts, and labels.
 *
 * Neutral by default; a --loam-context region colours it. Declare
 * `--loam-context` on a region (an ancestor — a style query never matches
 * the element that declares it, so a one-element region is a wrapper) and
 * the pill's tint and text derive from that status's colour. Icons and the
 * status dot are composed as children and detected — there are no slot
 * props:
 *
 * ```tsx
 * <Badge>
 *   <Badge.Dot /> Live
 * </Badge>
 * ```
 */
function BadgeBase({ size = "md", render, className, children, ref, ...rest }: BadgeProps) {
  const wiring = {
    ref,
    className: cx("loam-Badge", className),
    "data-size": size,
    children,
    ...rest,
  };
  if (render) {
    return <>{renderWithProps(render, wiring)}</>;
  }
  return <span {...wiring} />;
}

export const Badge = Object.assign(BadgeBase, { Dot: BadgeDot });
