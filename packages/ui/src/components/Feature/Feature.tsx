import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";

export interface FeatureRootProps extends PartProps<"div"> {
  /**
   * Render as a different element: `render={<li />}` inside a list. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * One feature: an icon, a title and a line on what it does for the reader.
 *
 * The unit is the tile. It stands on its own beside a paragraph, and a
 * list of them is a grid you write: a `ul` with `repeat(auto-fit,
 * minmax(min(16rem, 100%), 1fr))` and each tile rendered as a `li`. There
 * are no cards; features are scanned, not compared, so tiles are set apart
 * by space alone.
 *
 * ```tsx
 * <ul className="features">
 *   <Feature.Root render={<li />}>
 *     <Feature.Icon><svg viewBox="0 0 24 24">…</svg></Feature.Icon>
 *     <Feature.Title>Native CSS</Feature.Title>
 *     <Feature.Description>Real elements carry the semantics; static CSS carries the styling.</Feature.Description>
 *   </Feature.Root>
 * </ul>
 * ```
 */
function FeatureRoot({ render, className, children, ref, ...rest }: FeatureRootProps) {
  const props = { ref, className: cx("loam-Feature", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <div {...props} />;
}

export interface FeatureIconProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** A small square around the consumer's svg. Decorative: the title names the feature. */
function FeatureIcon({ className, children, ref, ...rest }: FeatureIconProps) {
  return (
    <div ref={ref} className={cx("icon", className)} aria-hidden {...rest}>
      {children}
    </div>
  );
}

export interface FeatureTitleProps extends PartProps<"h3"> {
  /** Render as a different heading: `render={<h4 />}` under a page's own h3s. */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/** The feature's name. An `h3` by default; pass `render={<h4 />}` under a page's own h3s. */
function FeatureTitle({ render, className, children, ref, ...rest }: FeatureTitleProps) {
  if (render) {
    return (
      <>{renderWithProps(render, { ref, className: cx("title", className), children, ...rest })}</>
    );
  }
  return (
    <h3 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h3>
  );
}

export interface FeatureDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One or two muted sentences on what the feature does for the reader. */
function FeatureDescription({ className, children, ref, ...rest }: FeatureDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export const Feature = {
  Root: FeatureRoot,
  Icon: FeatureIcon,
  Title: FeatureTitle,
  Description: FeatureDescription,
};
