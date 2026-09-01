import type { HTMLAttributes, Ref } from "react";
import { cx, type LoamUISize } from "../../utils";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Fill amount, 0–100. @default 0 */
  value?: number;
  /** Track thickness. @default "md" */
  size?: LoamUISize;
  /** Overlay diagonal stripes on the filled bar. */
  striped?: boolean;
  /** Animate the stripes (implies `striped`). */
  animated?: boolean;
  /** Render the percentage as text inside the bar. */
  label?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * A horizontal bar showing completion of a task.
 *
 * The bar fills with the primary colour, re-answered by any --loam-context
 * region: declare `--loam-context` on a region (an ancestor — a style
 * query never matches the element that declares it, so a one-element
 * region is a wrapper) and the token remap recolours the fill.
 */
export function Progress({
  value = 0,
  size = "md",
  striped,
  animated,
  label,
  className,
  style,
  ref,
  ...rest
}: ProgressProps) {
  const pct = clamp(value);
  const rounded = Math.round(pct);
  const showStripes = striped || animated;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={rounded}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx("loam-Progress", className)}
      data-size={size}
      style={style}
      {...rest}
    >
      <div
        className="bar"
        data-striped={showStripes || undefined}
        data-animated={animated || undefined}
        style={{ inlineSize: `${pct}%` }}
      >
        {label && rounded >= 8 && <span className="label">{rounded}%</span>}
      </div>
    </div>
  );
}
