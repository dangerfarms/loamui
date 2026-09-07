import type { HTMLAttributes, LiHTMLAttributes, OlHTMLAttributes, ReactNode, Ref } from "react";
import { cx, renderWithProps } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

export interface StepsRootProps extends OlHTMLAttributes<HTMLOListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLOListElement>;
}

/**
 * An ordered sequence: each step a marker, a title and a description. A
 * timeline is the same thing with a `<time>` in the marker.
 *
 * The order lives in the `ol`, so assistive tech announces "2 of 4" from
 * the list itself; the visible number is a CSS counter with an empty alt,
 * decorative and never the only carrier of order. Leave `Steps.Marker` out
 * and the stylesheet draws the number; put one in to host a date or an
 * icon in its place. `Steps.Title` is an `h3`; pass `render={<h2 />}` when
 * the page's outline needs it. The list is a region and declares its
 * container, so the fluid tokens answer its width.
 *
 * ```tsx
 * <Steps.Root>
 *   <Steps.Item>
 *     <Steps.Title>Install the packages</Steps.Title>
 *     <Steps.Description>Core for the primitives, ui for the compositions.</Steps.Description>
 *   </Steps.Item>
 *   <Steps.Item>
 *     <Steps.Title>Import the stylesheets once</Steps.Title>
 *     <Steps.Description>At the app root, core before ui.</Steps.Description>
 *   </Steps.Item>
 * </Steps.Root>
 *
 * <Steps.Root>
 *   <Steps.Item>
 *     <Steps.Marker><time dateTime="2026-03">Mar 2026</time></Steps.Marker>
 *     <Steps.Title>First release</Steps.Title>
 *     <Steps.Description>Tokens, element styles and 20 components.</Steps.Description>
 *   </Steps.Item>
 * </Steps.Root>
 * ```
 */
function StepsRoot({ className, children, ref, ...rest }: StepsRootProps) {
  return (
    // role="list" is not redundant here: a list styled with list-style:
    // none loses its list semantics in some browsers, and the explicit
    // role is what restores "2 of 4" for assistive tech.
    <ol ref={ref} className={cx("loam-Steps", className)} role="list" {...rest}>
      {children}
    </ol>
  );
}

export interface StepsItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** An optional `Steps.Marker`, then a `Steps.Title`, then a `Steps.Description`. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One step: an `li` laid out as a marker column beside the title and description. */
function StepsItem({ className, children, ref, ...rest }: StepsItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

export interface StepsMarkerProps extends HTMLAttributes<HTMLSpanElement> {
  /** A `<time>`, an icon or a short label. */
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * Optional. Replaces the drawn number with your own content: a `<time>` for
 * a timeline, an icon for a checklist. Its content is read out, so pass
 * `aria-hidden` yourself when it is purely decorative.
 */
function StepsMarker({ className, children, ref, ...rest }: StepsMarkerProps) {
  return (
    <span ref={ref} className={cx("marker", className)} {...rest}>
      {children}
    </span>
  );
}

export interface StepsTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render as a different heading: `render={<h2 />}` when the steps are a
   * page's top-level sections. The part's classes and attributes merge onto
   * the element it renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The step's name. Renders an `h3` by default; pass `render={<h2 />}` to change the level. */
function StepsTitle({ render, className, children, ref, ...rest }: StepsTitleProps) {
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

export interface StepsDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One or two muted sentences on what happens in this step. */
function StepsDescription({ className, children, ref, ...rest }: StepsDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export const Steps = {
  Root: StepsRoot,
  Item: StepsItem,
  Marker: StepsMarker,
  Title: StepsTitle,
  Description: StepsDescription,
};
