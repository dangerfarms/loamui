import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface FeaturesRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A features section: a grid of tiles, each an icon, a title and a line of
 * body text. No cards; the tiles are separated by space alone.
 *
 * ```tsx
 * <Features.Root>
 *   <Features.Grid>
 *     <Features.Item>
 *       <Features.Icon><svg viewBox="0 0 24 24">…</svg></Features.Icon>
 *       <Features.Title>Native CSS</Features.Title>
 *       <Features.Body>Real elements carry the semantics; static CSS carries the styling.</Features.Body>
 *     </Features.Item>
 *   </Features.Grid>
 * </Features.Root>
 * ```
 */
function FeaturesRoot({ className, children, ref, ...rest }: FeaturesRootProps) {
  return (
    <section ref={ref} className={cx("loam-Features", className)} {...rest}>
      {children}
    </section>
  );
}

export interface FeaturesGridProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** The list of tiles: an auto-fit grid of columns at least 16rem wide. */
function FeaturesGrid({ className, children, ref, ...rest }: FeaturesGridProps) {
  return (
    <ul ref={ref} className={cx("grid", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface FeaturesItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One tile. */
function FeaturesItem({ className, children, ref, ...rest }: FeaturesItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

export interface FeaturesIconProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A small square around the consumer's svg. Decorative: the title names the feature. */
function FeaturesIcon({ className, children, ref, ...rest }: FeaturesIconProps) {
  return (
    <div ref={ref} className={cx("icon", className)} aria-hidden {...rest}>
      {children}
    </div>
  );
}

export interface FeaturesTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The feature's name, an h3. */
function FeaturesTitle({ className, children, ref, ...rest }: FeaturesTitleProps) {
  return (
    <h3 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h3>
  );
}

export interface FeaturesBodyProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One or two muted sentences on what the feature does for the reader. */
function FeaturesBody({ className, children, ref, ...rest }: FeaturesBodyProps) {
  return (
    <p ref={ref} className={cx("body", className)} {...rest}>
      {children}
    </p>
  );
}

export const Features = {
  Root: FeaturesRoot,
  Grid: FeaturesGrid,
  Item: FeaturesItem,
  Icon: FeaturesIcon,
  Title: FeaturesTitle,
  Body: FeaturesBody,
};
