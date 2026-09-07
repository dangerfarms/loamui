"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamePart, useNamedRoot } from "../../naming";

interface PageHeaderContextValue {
  nameId: string;
  register: (id: string) => () => void;
}

const PageHeaderContext = createContext<PageHeaderContextValue | null>(null);

function usePageHeader(part: string): PageHeaderContextValue {
  const ctx = useContext(PageHeaderContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <PageHeader.Root>.`);
  }
  return ctx;
}

export interface PageHeaderRootProps extends PartProps<"header"> {
  /**
   * Render as a different element: `render={<div />}` where the page
   * already has a header landmark. The part's class and attributes merge
   * onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The top of a page inside an application or a documentation site: where
 * the page sits (breadcrumbs), what it is (the title, an `h1`), a line on
 * it, a row of small facts, and the actions that act on the whole page.
 *
 * The judgment is in the order and the naming. Breadcrumbs come first,
 * because "where am I" is read before "what is this"; the Title is the
 * page's one `h1` and names the header (`aria-labelledby`), so a screen
 * reader's list of landmarks says which page's header it is; Meta is
 * facts, not headings; Actions are real Buttons, at the end of the reading
 * order and beside the title only when the container is wide enough for
 * both, by a container query and not a breakpoint. The parts are optional,
 * every one but the Title, and the spacing between them is the parts'
 * own, so a header with only a title has no gap where the rest would be.
 *
 * ```tsx
 * <PageHeader.Root>
 *   <PageHeader.Breadcrumbs>
 *     <Breadcrumbs.Root>
 *       <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
 *       <Breadcrumbs.Item current>Loam</Breadcrumbs.Item>
 *     </Breadcrumbs.Root>
 *   </PageHeader.Breadcrumbs>
 *   <PageHeader.Title>Loam</PageHeader.Title>
 *   <PageHeader.Description>Modern UI primitives for agent-assisted developers.</PageHeader.Description>
 *   <PageHeader.Meta>
 *     <Badge>Active</Badge>
 *     <span>Updated <Time value="2026-09-01" /></span>
 *   </PageHeader.Meta>
 *   <PageHeader.Actions>
 *     <Button>Share</Button>
 *     <Button>Edit</Button>
 *   </PageHeader.Actions>
 * </PageHeader.Root>
 * ```
 */
function PageHeaderRoot({ render, className, children, ref, ...rest }: PageHeaderRootProps) {
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<PageHeaderContextValue>(() => ({ nameId, register }), [nameId, register]);
  const props = {
    ref,
    className: cx("loam-PageHeader", className),
    children,
    ...labelling,
    ...rest,
  };
  return (
    <PageHeaderContext value={value}>
      {render ? renderWithProps(render, props) : <header {...props}>{children}</header>}
    </PageHeaderContext>
  );
}

export interface PageHeaderPartProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** The slot for core `Breadcrumbs`, first, because where the page sits is read before what it is. */
function PageHeaderBreadcrumbs({ className, children, ref, ...rest }: PageHeaderPartProps) {
  return (
    <div ref={ref} className={cx("breadcrumbs", className)} {...rest}>
      {children}
    </div>
  );
}

export interface PageHeaderTitleProps extends PartProps<"h1"> {
  /**
   * Render as a different heading: `render={<h2 />}` for a header that
   * opens a section rather than the page. The part's class and attributes
   * merge onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The page's title, its one `h1`, and the header's accessible name, from
 * the first render. Its id is generated unless you give it one.
 */
function PageHeaderTitle({ render, id, className, children, ref, ...rest }: PageHeaderTitleProps) {
  const ctx = usePageHeader("PageHeader.Title");
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), children, ...rest };
  if (render) {
    return <>{renderWithProps(render, props)}</>;
  }
  return <h1 {...props}>{children}</h1>;
}

export interface PageHeaderDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One line under the title on what the page is, in the muted colour. */
function PageHeaderDescription({ className, children, ref, ...rest }: PageHeaderDescriptionProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * A wrapping row of small facts about the page: a `Badge` for its status,
 * a `Time` for when it changed, who owns it. Facts, not headings, and not
 * actions.
 */
function PageHeaderMeta({ className, children, ref, ...rest }: PageHeaderPartProps) {
  return (
    <div ref={ref} className={cx("meta", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * The actions that act on the whole page, as core `Button`s: last in the
 * reading order, and beside the title when the container is wide enough
 * for both.
 */
function PageHeaderActions({ className, children, ref, ...rest }: PageHeaderPartProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const PageHeader = {
  Root: PageHeaderRoot,
  Breadcrumbs: PageHeaderBreadcrumbs,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Meta: PageHeaderMeta,
  Actions: PageHeaderActions,
};
