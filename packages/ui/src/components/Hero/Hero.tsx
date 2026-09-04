import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

export interface HeroRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A page-opening section: eyebrow, title, lede and a row of actions.
 *
 * Compose it from parts; the section's look comes from the element styles
 * and tokens, and a `--loam-context` region recolours the parts inside.
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
  return (
    <section ref={ref} className={cx("loam-Hero", className)} {...rest}>
      {children}
    </section>
  );
}

export interface HeroPartProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/** A short line above the title: a Badge, a category, a date. */
function HeroEyebrow({ className, children, ...rest }: HeroPartProps) {
  return (
    <div className={cx("eyebrow", className)} {...rest}>
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

/** The headline. Renders an `h1` by default; pass `render={<h2 />}` inside a page. */
function HeroTitle({ render, className, children, ref, ...rest }: HeroTitleProps) {
  if (render) {
    return (
      <>{renderWithProps(render, { ref, className: cx("title", className), children, ...rest })}</>
    );
  }
  return (
    <h1 ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </h1>
  );
}

/** One paragraph that says what the page is for. */
function HeroLede({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cx("lede", className)} {...rest}>
      {children}
    </p>
  );
}

/** A flex row of actions: a SignpostLink for the primary path, plain links beside it. */
function HeroActions({ className, children, ...rest }: HeroPartProps) {
  return (
    <div className={cx("actions", className)} {...rest}>
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
};
