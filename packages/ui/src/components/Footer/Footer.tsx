import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface FooterRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A site footer: brand and tagline, columns of links, and a bottom row for
 * the copyright line and small print.
 *
 * Compose it from parts. Each column is a titled list of the consumer's
 * own links; the columns fit as many across as the container allows and
 * stack in a narrow one, with no breakpoint to configure.
 *
 * ```tsx
 * <Footer.Root>
 *   <Footer.Brand>
 *     <a href="/">Loam</a>
 *     <p>Modern UI primitives for agent-assisted developers.</p>
 *   </Footer.Brand>
 *   <Footer.Columns>
 *     <Footer.Column>
 *       <Footer.ColumnTitle>Product</Footer.ColumnTitle>
 *       <ul>
 *         <li><a href="/docs">Docs</a></li>
 *         <li><a href="/pricing">Pricing</a></li>
 *       </ul>
 *     </Footer.Column>
 *   </Footer.Columns>
 *   <Footer.Bottom>
 *     <small>&copy; 2026 Loam</small>
 *     <a href="/privacy">Privacy</a>
 *   </Footer.Bottom>
 * </Footer.Root>
 * ```
 */
function FooterRoot({ className, children, ref, ...rest }: FooterRootProps) {
  return (
    <footer ref={ref} className={cx("loam-Footer", className)} {...rest}>
      {children}
    </footer>
  );
}

export interface FooterPartProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** The logo or name and a one-line tagline: a link and a paragraph. */
function FooterBrand({ className, children, ref, ...rest }: FooterPartProps) {
  return (
    <div ref={ref} className={cx("brand", className)} {...rest}>
      {children}
    </div>
  );
}

/** An auto-fit grid of columns. */
function FooterColumns({ className, children, ref, ...rest }: FooterPartProps) {
  return (
    <div ref={ref} className={cx("columns", className)} {...rest}>
      {children}
    </div>
  );
}

export interface FooterColumnProps extends HTMLAttributes<HTMLDivElement> {
  /** A `Footer.ColumnTitle` followed by a `ul` of `li > a` items. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** One column: a title, then the consumer's `ul` of links. */
function FooterColumn({ className, children, ref, ...rest }: FooterColumnProps) {
  return (
    <div ref={ref} className={cx("column", className)} {...rest}>
      {children}
    </div>
  );
}

export interface FooterColumnTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The column's heading, an `h3`. */
function FooterColumnTitle({ className, children, ref, ...rest }: FooterColumnTitleProps) {
  return (
    <h3 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h3>
  );
}

/** A wrapping flex row at the foot: a `small` copyright line and small links. */
function FooterBottom({ className, children, ref, ...rest }: FooterPartProps) {
  return (
    <div ref={ref} className={cx("bottom", className)} {...rest}>
      {children}
    </div>
  );
}

export const Footer = {
  Root: FooterRoot,
  Brand: FooterBrand,
  Columns: FooterColumns,
  Column: FooterColumn,
  ColumnTitle: FooterColumnTitle,
  Bottom: FooterBottom,
};
