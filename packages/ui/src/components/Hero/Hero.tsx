import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

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
 * `Hero.Media` hosts whatever the page opens with: an image, a video, a
 * Carousel. With it the hero becomes two columns where there is room and
 * stacks where there is not; without it the text runs alone. There is no
 * layout prop: the container decides.
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

/**
 * What the page opens with: an image, a video, a Carousel. Optional; when
 * present the hero becomes two columns where the container has room.
 */
function HeroMedia({ className, children, ...rest }: HeroPartProps) {
  return (
    <div className={cx("media", className)} {...rest}>
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
