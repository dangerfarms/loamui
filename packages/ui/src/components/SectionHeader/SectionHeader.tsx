import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";

export interface SectionHeaderRootProps extends PartProps<"div"> {
  /**
   * Render as a different element: `render={<header />}` when the intro
   * is the header of a sectioning element. The part's classes and
   * attributes merge onto the element it renders, the same contract as
   * every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The intro a section opens with: an eyebrow, a title, a line of
 * description and, beside them when there is room, a row of actions.
 *
 * It is the top of a section you write, not a section of its own: the
 * Root is a `div` (a `header` through `render`), and the Title is an `h2`
 * that your section's `aria-labelledby` can point at. It reads start-
 * aligned by default; centre it with `text-align: center` and
 * `justify-items: center` on the Root, in your stylesheet or a style
 * attribute, and the parts follow, because alignment is the page's
 * decision and not a prop. With Actions and room for them, the row sits
 * beside the words; narrower, it drops beneath. The container decides:
 * the Root is the container and an inner element it renders is the grid,
 * because an element cannot answer its own container query.
 *
 * ```tsx
 * <section aria-labelledby="pricing">
 *   <SectionHeader.Root>
 *     <SectionHeader.Eyebrow>Pricing</SectionHeader.Eyebrow>
 *     <SectionHeader.Title id="pricing">One plan, no tiers</SectionHeader.Title>
 *     <SectionHeader.Description>Every feature, every seat, one price.</SectionHeader.Description>
 *     <SectionHeader.Actions>
 *       <SignpostLink href="/pricing">See the details</SignpostLink>
 *     </SectionHeader.Actions>
 *   </SectionHeader.Root>
 *   …
 * </section>
 * ```
 */
function SectionHeaderRoot({ render, className, children, ref, ...rest }: SectionHeaderRootProps) {
  const props = {
    ref,
    className: cx("loam-SectionHeader", className),
    ...rest,
    children: <div className="inner">{children}</div>,
  };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <div {...props} />;
}

export interface SectionHeaderEyebrowProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** A short line above the title, small and strong: a category, a step, a Badge. */
function SectionHeaderEyebrow({ className, children, ref, ...rest }: SectionHeaderEyebrowProps) {
  return (
    <p ref={ref} className={cx("eyebrow", className)} {...rest}>
      {children}
    </p>
  );
}

export interface SectionHeaderTitleProps extends PartProps<"h2"> {
  /**
   * Render as a different heading: `render={<h3 />}` under a page's own
   * headings, `render={<h1 />}` when the section is the page. The part's
   * classes and attributes merge onto the element it renders, the same
   * contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The section's name. An `h2` by default; pass `render={<h3 />}` under a
 * page's own headings. Give it an `id` and point your section's
 * `aria-labelledby` at it.
 */
function SectionHeaderTitle({
  render,
  className,
  children,
  ref,
  ...rest
}: SectionHeaderTitleProps) {
  const props = { ref, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h2 {...props}>{children}</h2>;
}

export interface SectionHeaderDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One or two muted sentences on what the section holds, capped at a readable measure. */
function SectionHeaderDescription({
  className,
  children,
  ref,
  ...rest
}: SectionHeaderDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface SectionHeaderActionsProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * Optional: a wrapping row for a link or a Button that belongs to the whole
 * section ("See all", "New project"). Beside the words where the container
 * has room, beneath them where it does not.
 */
function SectionHeaderActions({ className, children, ref, ...rest }: SectionHeaderActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const SectionHeader = {
  Root: SectionHeaderRoot,
  Eyebrow: SectionHeaderEyebrow,
  Title: SectionHeaderTitle,
  Description: SectionHeaderDescription,
  Actions: SectionHeaderActions,
};
