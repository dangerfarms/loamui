"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

interface HeroContextValue {
  /** The Title tells the section its id; the section is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const HeroContext = createContext<HeroContextValue | null>(null);

export interface HeroRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A page-opening section: eyebrow, title, lede, a row of actions and,
 * when the page has one, a piece of media beside them.
 *
 * Compose it from parts; the section's look comes from the element styles
 * and tokens, and a `--loam-context` region recolours the parts inside.
 * The section is named by its Title, so it is a region in a screen
 * reader's list of landmarks; an `aria-label` or `aria-labelledby` of
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
function HeroRoot({ className, children, ref, ...rest }: HeroRootProps) {
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<HeroContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins over the title's.
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  return (
    <HeroContext value={value}>
      <section
        ref={ref}
        className={cx("loam-Hero", className)}
        aria-labelledby={!named && titleId ? titleId : undefined}
        {...rest}
      >
        <div className="inner">{children}</div>
      </section>
    </HeroContext>
  );
}

export interface HeroEyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A short line above the title: a Badge, a category, a date. */
function HeroEyebrow({ className, children, ref, ...rest }: HeroEyebrowProps) {
  return (
    <div ref={ref} className={cx("eyebrow", className)} {...rest}>
      {children}
    </div>
  );
}

export interface HeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render as a different heading: `render={<h2 />}` inside a page. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * The headline. Renders an `h1` by default; pass `render={<h2 />}` inside
 * a page. It names the Root while it is present.
 */
function HeroTitle({ render, className, children, ref, id, ...rest }: HeroTitleProps) {
  const ctx = useContext(HeroContext);
  if (!ctx) {
    throw new Error("Hero.Title must be rendered inside <Hero.Root>.");
  }
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  const props = { ref, id: titleId, className: cx("title", className), ...rest };
  if (render) return <>{renderWithProps(render, { ...props, children })}</>;
  return <h1 {...props}>{children}</h1>;
}

export interface HeroLedeProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** One paragraph that says what the page is for. */
function HeroLede({ className, children, ref, ...rest }: HeroLedeProps) {
  return (
    <p ref={ref} className={cx("lede", className)} {...rest}>
      {children}
    </p>
  );
}

export interface HeroActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A flex row of actions: a SignpostLink for the primary path, plain links beside it. */
function HeroActions({ className, children, ref, ...rest }: HeroActionsProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface HeroMediaProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
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
