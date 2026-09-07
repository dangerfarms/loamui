"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

interface HeroContextValue {
  /** The id the Title takes unless the consumer gives it one; the section points at it. */
  nameId: string;
  /** The Title registers on mount so the section's reference stays honest. */
  register: (id: string) => () => void;
}

const HeroContext = createContext<HeroContextValue | null>(null);

export interface HeroRootProps extends PartProps<"section"> {
  /**
   * Render as a different element: `render={<header />}` when the hero is
   * the page's banner, `render={<div />}` where a section would be one
   * landmark too many. The part's classes and attributes merge onto the
   * element it renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * A page-opening section: eyebrow, title, lede, a row of actions and,
 * when the page has one, a piece of media beside them.
 *
 * Compose it from parts; the section's look comes from the element styles
 * and tokens, and a `--loam-context` region recolours the parts inside.
 * The section is named by its Title, so it is a region in a screen
 * reader's list of landmarks, and it is named in the server's HTML: the
 * Root mints the id and points `aria-labelledby` at it in the first
 * render, the Title renders it. An `aria-label` or `aria-labelledby` of
 * your own wins. `Hero.Media` hosts whatever the page opens with: an
 * image, a video, a Carousel. With it the hero becomes two columns where
 * there is room and stacks where there is not; without it the text runs
 * alone. There is no layout prop: the container decides. The section is
 * the container and an inner element it renders is the grid, because an
 * element cannot answer its own container query.
 *
 * ```tsx
 * <Hero.Root>
 *   <Hero.Eyebrow><Badge>New</Badge></Hero.Eyebrow>
 *   <Hero.Title>Modern UI primitives for agent-assisted developers.</Hero.Title>
 *   <Hero.Lede>Three primitives your agent builds from.</Hero.Lede>
 *   <Hero.Actions>
 *     <SignpostLink href="/docs">Get started</SignpostLink>
 *     <a href="https://github.com/dangerfarms/loamui">Star on GitHub</a>
 *   </Hero.Actions>
 * </Hero.Root>
 * ```
 */
function HeroRoot({ render, className, children, ref, ...rest }: HeroRootProps) {
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<HeroContextValue>(() => ({ nameId, register }), [nameId, register]);
  const props = {
    ref,
    className: cx("loam-Hero", className),
    ...labelling,
    ...rest,
    children: <div className="inner">{children}</div>,
  };
  return (
    <HeroContext value={value}>
      {render ? renderWithProps(render, props) : <section {...props} />}
    </HeroContext>
  );
}

export interface HeroEyebrowProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** A short line above the title: a Badge, a category, a date. */
function HeroEyebrow({ className, children, ref, ...rest }: HeroEyebrowProps) {
  return (
    <div ref={ref} className={cx("eyebrow", className)} {...rest}>
      {children}
    </div>
  );
}

export interface HeroTitleProps extends PartProps<"h1"> {
  /**
   * Render as a different heading: `render={<h2 />}` inside a page. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The headline. Renders an `h1` by default; pass `render={<h2 />}` inside
 * a page. Its id (yours if you pass one, the composition's otherwise) is
 * what the section's `aria-labelledby` points at.
 */
function HeroTitle({ render, className, children, ref, id, ...rest }: HeroTitleProps) {
  const ctx = useContext(HeroContext);
  if (!ctx) {
    throw new Error("Hero.Title must be rendered inside <Hero.Root>.");
  }
  const titleId = useNamePart(ctx, id);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h1 {...props}>{children}</h1>;
}

export interface HeroLedeProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One paragraph that says what the page is for. */
function HeroLede({ className, children, ref, ...rest }: HeroLedeProps) {
  return (
    <p ref={ref} className={cx("lede", className)} {...rest}>
      {children}
    </p>
  );
}

export interface HeroActionsProps extends PartProps<"div"> {
  children?: ReactNode;
}

/** A flex row of actions: a SignpostLink for the primary path, plain links beside it. */
function HeroActions({ className, children, ref, ...rest }: HeroActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface HeroMediaProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * What the page opens with: an image, a video, a Carousel. Optional; when
 * present the hero becomes two columns where the container has room.
 */
function HeroMedia({ className, children, ref, ...rest }: HeroMediaProps) {
  return (
    <div ref={ref} className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

export const Hero = {
  Root: HeroRoot,
  Eyebrow: HeroEyebrow,
  Title: HeroTitle,
  Lede: HeroLede,
  Actions: HeroActions,
  Media: HeroMedia,
};
