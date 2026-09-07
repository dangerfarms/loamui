import { createContext, useContext } from "react";
import type { ReactNode, Ref } from "react";
import { Card, cx } from "@loamui/core";
import type { CardProps, PartProps } from "@loamui/core";

/** True inside a `Stat.Root`; a Label or a Value has no pair to be half of anywhere else. */
const StatContext = createContext(false);

export interface StatRootProps extends Omit<CardProps, "render" | "ref"> {
  /** A `Stat.Label` then a `Stat.Value`, in that order. */
  children?: ReactNode;
  ref?: Ref<HTMLDListElement>;
}

/**
 * One headline figure: a large value over a short label.
 *
 * The unit is the tile, a core Card rendered as a description list of one
 * pair. Write the label before the value; the stylesheet shows the value
 * on top. The surface, line, radius and padding are the Card's, so a tile
 * looks like every other Card on the page; this composition only arranges
 * the pair inside. It stands on its own anywhere: a dashboard grid you
 * lay out yourself, a sidebar, beside a paragraph. `Stat.Group` is
 * optional: a row that fits as many tiles across as there is room for. A
 * `--loam-context` region on a tile tints its value.
 *
 * ```tsx
 * <Stat.Root>
 *   <Stat.Label>Components</Stat.Label>
 *   <Stat.Value>34</Stat.Value>
 * </Stat.Root>
 *
 * <Stat.Group>
 *   <Stat.Root>…</Stat.Root>
 *   <Stat.Root style={{ "--loam-context": "success" }}>…</Stat.Root>
 * </Stat.Group>
 * ```
 */
function StatRoot({ className, children, ref, ...rest }: StatRootProps) {
  return (
    <Card render={<dl ref={ref} />} className={cx("loam-Stat", className)} {...rest}>
      <StatContext value>{children}</StatContext>
    </Card>
  );
}

export interface StatLabelProps extends PartProps<"dt"> {
  children?: ReactNode;
}

/** What the figure measures, a `dt`. Comes first in the markup. */
function StatLabel({ className, children, ref, ...rest }: StatLabelProps) {
  if (!useContext(StatContext)) {
    throw new Error("Stat.Label must be rendered inside <Stat.Root>.");
  }
  return (
    <dt ref={ref} className={cx("label", className)} {...rest}>
      {children}
    </dt>
  );
}

export interface StatValueProps extends PartProps<"dd"> {
  children?: ReactNode;
}

/** The figure, a `dd` set large in tabular lining figures. */
function StatValue({ className, children, ref, ...rest }: StatValueProps) {
  if (!useContext(StatContext)) {
    throw new Error("Stat.Value must be rendered inside <Stat.Root>.");
  }
  return (
    <dd ref={ref} className={cx("value", className)} {...rest}>
      {children}
    </dd>
  );
}

export interface StatGroupProps extends PartProps<"div"> {
  /** `Stat.Root`s. */
  children?: ReactNode;
}

/**
 * Optional: a row of tiles, an auto-fit grid that fits as many across as
 * there is room for. Leave it out to place a tile in a layout of your own.
 */
function StatGroup({ className, children, ref, ...rest }: StatGroupProps) {
  return (
    <div ref={ref} className={cx("loam-Stat-group", className)} {...rest}>
      {children}
    </div>
  );
}

export const Stat = {
  Root: StatRoot,
  Label: StatLabel,
  Value: StatValue,
  Group: StatGroup,
};
