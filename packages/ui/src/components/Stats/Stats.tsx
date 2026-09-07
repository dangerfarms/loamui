import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface StatsRootProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Headline figures: each a large value over a short label.
 *
 * The unit is the tile. `Stats.Item` is a description list of one pair
 * (label, then value), so it stands on its own anywhere: a dashboard grid
 * you lay out yourself, a sidebar, a Card. `Stats.Root` is optional: a
 * row that fits as many tiles across as there is room for. Write the label
 * before the value in each tile; the stylesheet shows the value on top. A
 * `--loam-context` region on a tile tints its value.
 *
 * ```tsx
 * <Stats.Item>
 *   <Stats.Label>Components</Stats.Label>
 *   <Stats.Value>34</Stats.Value>
 * </Stats.Item>
 *
 * <Stats.Root>
 *   <Stats.Item>…</Stats.Item>
 *   <Stats.Item style={{ "--loam-context": "success" }}>…</Stats.Item>
 * </Stats.Root>
 * ```
 */
function StatsRoot({ className, children, ref, ...rest }: StatsRootProps) {
  return (
    <div ref={ref} className={cx("loam-Stats", className)} {...rest}>
      {children}
    </div>
  );
}

export interface StatsItemProps extends HTMLAttributes<HTMLDListElement> {
  /** A `Stats.Label` then a `Stats.Value`, in that order. */
  children?: ReactNode;
  ref?: Ref<HTMLDListElement>;
}

/** One tile: a description list holding a label and its value. Works on its own or inside a Root. */
function StatsItem({ className, children, ref, ...rest }: StatsItemProps) {
  return (
    <dl ref={ref} className={cx("loam-Stats-item", className)} {...rest}>
      {children}
    </dl>
  );
}

export interface StatsPartProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** The figure, a `dd` set large in tabular lining figures. */
function StatsValue({ className, children, ref, ...rest }: StatsPartProps) {
  return (
    <dd ref={ref} className={cx("value", className)} {...rest}>
      {children}
    </dd>
  );
}

/** What the figure measures, a `dt`. Comes first in the markup. */
function StatsLabel({ className, children, ref, ...rest }: StatsPartProps) {
  return (
    <dt ref={ref} className={cx("label", className)} {...rest}>
      {children}
    </dt>
  );
}

export const Stats = {
  Root: StatsRoot,
  Item: StatsItem,
  Value: StatsValue,
  Label: StatsLabel,
};
