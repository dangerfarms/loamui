import type { HTMLAttributes, ReactNode, Ref } from "react";
import { Card } from "@loamui/core";
import { cx } from "../../utils";

export interface PricingRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A pricing section: a grid of plans, each a Card with a name, a price,
 * a description, a feature list and one action.
 *
 * The recommended plan is not a prop. Declare `--loam-context: primary`
 * on that `Pricing.Plan` (a class in your CSS, or the style attribute) and
 * the Badge and Button inside answer it. In the neutral theme primary is
 * near-black, so the plan's Card also takes the strong line colour in a
 * primary region and stays visible where the context alone would not show.
 *
 * ```tsx
 * <Pricing.Root>
 *   <Pricing.Plans>
 *     <Pricing.Plan>
 *       <Pricing.Name>Starter</Pricing.Name>
 *       <Pricing.Price>£0 <small>per month</small></Pricing.Price>
 *       <Pricing.Description>For one person trying things out.</Pricing.Description>
 *       <Pricing.Features>
 *         <li>One project</li>
 *         <li>Community support</li>
 *       </Pricing.Features>
 *       <Pricing.Action><Button>Start for free</Button></Pricing.Action>
 *     </Pricing.Plan>
 *     <Pricing.Plan style={{ "--loam-context": "primary" }}>
 *       <Pricing.Name>Team <Badge>Recommended</Badge></Pricing.Name>
 *       ...
 *     </Pricing.Plan>
 *   </Pricing.Plans>
 * </Pricing.Root>
 * ```
 */
function PricingRoot({ className, children, ref, ...rest }: PricingRootProps) {
  return (
    <section ref={ref} className={cx("loam-Pricing", className)} {...rest}>
      {children}
    </section>
  );
}

export interface PricingPlansProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** The list of plans: an auto-fit grid, one column when there is no room for more. */
function PricingPlans({ className, children, ref, ...rest }: PricingPlansProps) {
  return (
    <ul ref={ref} className={cx("plans", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface PricingPlanProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/**
 * One plan: a list item wrapping a Card. The list item is the region, so
 * `--loam-context` declared here reaches everything inside the Card.
 */
function PricingPlan({ className, children, ref, ...rest }: PricingPlanProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      <Card className="loam-Pricing-plan">{children}</Card>
    </li>
  );
}

export interface PricingNameProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The plan's name, an h3. A Badge beside the text sits at the far end of the row. */
function PricingName({ className, children, ref, ...rest }: PricingNameProps) {
  return (
    <h3 ref={ref} className={cx("name", className)} {...rest}>
      {children}
    </h3>
  );
}

export interface PricingParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** The amount, large and in tabular figures. Write the period in a `<small>`. */
function PricingPrice({ className, children, ref, ...rest }: PricingParagraphProps) {
  return (
    <p ref={ref} className={cx("price", className)} {...rest}>
      {children}
    </p>
  );
}

/** One line on who the plan is for. */
function PricingDescription({ className, children, ref, ...rest }: PricingParagraphProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface PricingFeaturesProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** What the plan includes, as list items. Takes the slack so every action aligns. */
function PricingFeatures({ className, children, ref, ...rest }: PricingFeaturesProps) {
  return (
    <ul ref={ref} className={cx("features", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface PricingActionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** The plan's one action. A grid wrapper, so the Button inside stretches to the plan's width. */
function PricingAction({ className, children, ref, ...rest }: PricingActionProps) {
  return (
    <div ref={ref} className={cx("action", className)} {...rest}>
      {children}
    </div>
  );
}

export const Pricing = {
  Root: PricingRoot,
  Plans: PricingPlans,
  Plan: PricingPlan,
  Name: PricingName,
  Price: PricingPrice,
  Description: PricingDescription,
  Features: PricingFeatures,
  Action: PricingAction,
};
