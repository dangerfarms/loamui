"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamePart, useNamedRoot } from "../../naming";

interface FooterColumnContextValue {
  nameId: string;
  register: (id: string) => () => void;
}

const FooterColumnContext = createContext<FooterColumnContextValue | null>(null);

export interface FooterRootProps extends PartProps<"footer"> {
  children?: ReactNode;
}

/**
 * A site footer: brand and tagline, columns of links, and a bottom row for
 * the copyright line and small print.
 *
 * Compose it from parts. Each column is a `nav` named by its title over a
 * `ul` of the consumer's own links, so a screen reader's list of the
 * page's landmarks reads "Product navigation", "Company navigation"; the
 * columns fit as many across as the container allows and stack in a
 * narrow one, with no breakpoint to configure.
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

export interface FooterPartProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** The logo or name and a one-line tagline: your link and a paragraph. */
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

export interface FooterColumnProps extends PartProps<"nav"> {
  /** A `Footer.ColumnTitle` followed by a `ul` of `li > a` items. */
  children?: ReactNode;
}

/**
 * One column: a `nav` landmark named by its ColumnTitle, from the first
 * render, then the consumer's `ul` of links. The markers are stripped by
 * the stylesheet; inside a nav a list keeps its semantics in every
 * browser, so the `ul` needs no role. A column with no title carries no
 * name, a plain nav, so give it an `aria-label`; a name you give wins
 * over the title's.
 */
function FooterColumn({ className, children, ref, ...rest }: FooterColumnProps) {
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<FooterColumnContextValue>(() => ({ nameId, register }), [nameId, register]);
  return (
    <FooterColumnContext value={value}>
      <nav ref={ref} className={cx("column", className)} {...labelling} {...rest}>
        {children}
      </nav>
    </FooterColumnContext>
  );
}

export interface FooterColumnTitleProps extends PartProps<"h3"> {
  /** Render as a different heading: `render={<h2 />}` where the footer's columns sit under no h2. */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/** The column's heading, an `h3` by default. It names the column's nav. */
function FooterColumnTitle({
  render,
  className,
  children,
  ref,
  id,
  ...rest
}: FooterColumnTitleProps) {
  const ctx = useContext(FooterColumnContext);
  if (!ctx) {
    throw new Error("Footer.ColumnTitle must be rendered inside <Footer.Column>.");
  }
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h3 {...props}>{children}</h3>;
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
