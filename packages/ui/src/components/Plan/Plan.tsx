"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { Card, renderWithProps, cx } from "@loamui/core";
import type { CardProps, PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

/** The words a plan says on its own, each with an English default. */
export interface PlanLabels {
  /** The hidden words before a feature the plan leaves out. @default "Not included:" */
  excluded?: ReactNode;
}

const DEFAULT_LABELS: Required<PlanLabels> = {
  excluded: "Not included:",
};

interface PlanContextValue {
  nameId: string;
  register: (id: string) => () => void;
  labels: Required<PlanLabels>;
}

const PlanContext = createContext<PlanContextValue | null>(null);

export interface PlanRootProps extends CardProps {
  /** The plan's own words; Exclusion reads them from here. */
  labels?: PlanLabels;
  /** Eyebrow, Title, Description, Value, Features and Actions. */
  children?: ReactNode;
}

/**
 * One pricing tier: a name, a price with its period, what it includes,
 * and the action that chooses it.
 *
 * The unit is the plan. It stands on its own on a product page, and a
 * pricing table is a grid you write with each plan rendered as a `li`
 * through the Card's `render`; the composition never arranges several,
 * and never assumes a count. The surface is core's Card, left exactly as
 * core styles it; the parts sit in their own `article` inside it, named
 * by the Title, so a screen reader's list of the page's articles reads
 * "Starter", "Team", "Enterprise". The price is a core `Price` in the
 * Value, with the period as text beside it, so the figure is
 * machine-readable and the words are yours. The features are a real list,
 * ticked by the stylesheet; a feature the plan leaves out is an
 * `Exclusion`, struck and muted on screen and prefixed by hidden words for
 * a reader who is listening, so the difference is never the glyph alone.
 * The recommended plan is marked by a `--loam-context: primary` region on
 * its Root: the Badge in its Eyebrow, its Title and Value, and the Button
 * in its Actions answer it, and a rule above the parts marks it in forced
 * colours, where the tints are gone.
 *
 * `className`, `style` and `ref` land on the Card; `aria-label` and
 * `aria-labelledby` name the article inside it.
 *
 * ```tsx
 * <Plan.Root style={{ "--loam-context": "primary" }}>
 *   <Plan.Eyebrow><Badge>Most popular</Badge></Plan.Eyebrow>
 *   <Plan.Title>Team</Plan.Title>
 *   <Plan.Description>For a product team that ships every week.</Plan.Description>
 *   <Plan.Value>
 *     <Price value={24} currency="GBP" />
 *     <Plan.Period>per seat, per month</Plan.Period>
 *   </Plan.Value>
 *   <Plan.Features>
 *     <Plan.Feature>Unlimited projects</Plan.Feature>
 *     <Plan.Feature>Ten seats</Plan.Feature>
 *     <Plan.Exclusion>Audit log</Plan.Exclusion>
 *   </Plan.Features>
 *   <Plan.Actions>
 *     <Button>Choose Team</Button>
 *   </Plan.Actions>
 * </Plan.Root>
 * ```
 */
function PlanRoot({
  labels,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  ...rest
}: PlanRootProps) {
  const { nameId, register, labelling } = useNamedRoot({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  });
  const value = useMemo<PlanContextValue>(
    () => ({ nameId, register, labels: { ...DEFAULT_LABELS, ...labels } }),
    [nameId, register, labels],
  );
  // The Card's own render prop passes through: render={<li />} in a list.
  // The article is named by its Title from the first render, so the server
  // HTML carries the name; a consumer's own name wins.
  return (
    <Card {...rest}>
      <article
        className="loam-Plan"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...labelling}
      >
        <PlanContext value={value}>{children}</PlanContext>
      </article>
    </Card>
  );
}

export interface PlanDivProps extends PartProps<"div"> {}

export interface PlanParagraphProps extends PartProps<"p"> {}

/**
 * A small row above the name for the Badge you pass: "Most popular",
 * "Current plan". The Badge answers the plan's `--loam-context` region on
 * its own, so the recommended plan's eyebrow is tinted without a prop.
 */
function PlanEyebrow({ className, children, ...rest }: PlanParagraphProps) {
  return (
    <p className={cx("eyebrow", className)} {...rest}>
      {children}
    </p>
  );
}

export interface PlanTitleProps extends PartProps<"h3"> {
  /** Render as a different heading: `render={<h2 />}` where the plans are the page's own sections. */
  render?: RenderProp<Record<string, unknown>>;
  /** The plan's name. */
  children?: ReactNode;
}

/**
 * The plan's name. An `h3` by default. Its `id` (yours if you pass one,
 * the composition's otherwise) is what the article's `aria-labelledby`
 * points at, which is what names the plan.
 */
function PlanTitle({ render, className, children, id, ...rest }: PlanTitleProps) {
  const ctx = useContext(PlanContext);
  const titleId = useNamePart(ctx, id);
  const props = { id: titleId, className: cx("title", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h3 {...props}>{children}</h3>;
}

/** One line on who the plan is for, muted, under the name. */
function PlanDescription({ className, children, ...rest }: PlanParagraphProps) {
  return (
    <p className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * The price: a core `Price` as its children, large, with a `Plan.Period`
 * beside it. The words are yours ("per seat, per month", "a year", "once");
 * the composition writes none.
 */
function PlanValue({ className, children, ...rest }: PlanParagraphProps) {
  return (
    <p className={cx("value", className)} {...rest}>
      {children}
    </p>
  );
}

export interface PlanPeriodProps extends PartProps<"span"> {}

/** What the price covers, small and muted after the figure: "per seat, per month". */
function PlanPeriod({ className, children, ...rest }: PlanPeriodProps) {
  return (
    <span className={cx("period", className)} {...rest}>
      {children}
    </span>
  );
}

export interface PlanFeaturesProps extends PartProps<"ul"> {
  /** `Plan.Feature`s and `Plan.Exclusion`s. */
  children?: ReactNode;
}

/**
 * What the plan includes: a `ul` (with `role="list"`, since the markers
 * are replaced) of Features and Exclusions.
 */
function PlanFeatures({ className, children, ...rest }: PlanFeaturesProps) {
  return (
    // list-style: none drops list semantics in some browsers; role="list"
    // keeps the features a list, so the count is announced.
    <ul role="list" className={cx("features", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface PlanFeatureProps extends PartProps<"li"> {}

/** One thing the plan includes: an `li` the stylesheet ticks. The tick is decoration; the words carry it. */
function PlanFeature({ className, children, ...rest }: PlanFeatureProps) {
  return (
    <li className={cx("feature", className)} {...rest}>
      {children}
    </li>
  );
}

/**
 * One thing the plan leaves out, listed so the tiers compare: struck and
 * muted on screen, and prefixed by `labels.excluded`, hidden, so a reader
 * who is listening hears "Not included: Audit log" rather than a feature.
 */
function PlanExclusion({ className, children, ...rest }: PlanFeatureProps) {
  const ctx = useContext(PlanContext);
  const labels = ctx?.labels ?? DEFAULT_LABELS;
  return (
    <li className={cx("exclusion", className)} {...rest}>
      <span className="loam-VisuallyHidden">{labels.excluded} </span>
      <s>{children}</s>
    </li>
  );
}

/**
 * The action that chooses the plan, at the foot and stretched to its
 * width: your core Button, which answers the plan's `--loam-context`
 * region, so the recommended plan's button is the primary one. Say which
 * plan in the button's text ("Choose Team"), so a row of buttons reads
 * apart.
 */
function PlanActions({ className, children, ...rest }: PlanDivProps) {
  return (
    <div className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const Plan = {
  Root: PlanRoot,
  Eyebrow: PlanEyebrow,
  Title: PlanTitle,
  Description: PlanDescription,
  Value: PlanValue,
  Period: PlanPeriod,
  Features: PlanFeatures,
  Feature: PlanFeature,
  Exclusion: PlanExclusion,
  Actions: PlanActions,
};
