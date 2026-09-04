import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface StatsRootProps extends HTMLAttributes<HTMLDListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDListElement>;
}

/**
 * A row of headline figures: each a large value over a short label.
 *
 * The root is a description list, so every figure is a term and its
 * definition. Write the label before the value in each item; the
 * stylesheet shows the value on top. A `--loam-context` region on an item
 * tints its value.
 *
 * ```tsx
 * <Stats.Root>
 *   <Stats.Item>
 *     <Stats.Label>Components</Stats.Label>
 *     <Stats.Value>33</Stats.Value>
 *   </Stats.Item>
 *   <Stats.Item style={{ "--loam-context": "success" }}>
 *     <Stats.Label>Contrast audit</Stats.Label>
 *     <Stats.Value>100%</Stats.Value>
 *   </Stats.Item>
 * </Stats.Root>
 * ```
 */
function StatsRoot({ className, children, ref, ...rest }: StatsRootProps) {
  return (
    <dl ref={ref} className={cx("loam-Stats", className)} {...rest}>
      {children}
    </dl>
  );
}

export interface StatsItemProps extends HTMLAttributes<HTMLDivElement> {
  /** A `Stats.Label` then a `Stats.Value`, in that order. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** One tile, grouping a label and its value. */
function StatsItem({ className, children, ref, ...rest }: StatsItemProps) {
  return (
    <div ref={ref} className={cx("item", className)} {...rest}>
      {children}
    </div>
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
