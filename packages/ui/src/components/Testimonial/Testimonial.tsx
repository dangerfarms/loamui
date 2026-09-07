import type { BlockquoteHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@loamui/core";

export interface TestimonialRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * One testimonial: a quotation and who said it.
 *
 * The unit is a `figure`: the quote is a `blockquote` and the author is
 * its `figcaption`, so the attribution is tied to the quote by the
 * platform rather than by layout. It stands on its own in flow, sits in a
 * Card, and rides in a Carousel or a grid you write; the arrangement is
 * never the testimonial's business.
 *
 * ```tsx
 * <Carousel.Item>
 *   <Card>
 *     <Testimonial.Root>
 *       <Testimonial.Quote>We shipped a bespoke design system in a week.</Testimonial.Quote>
 *       <Testimonial.Author>
 *         <Avatar name="Priya Natarajan" aria-hidden />
 *         <p><strong>Priya Natarajan</strong><br />Head of product, logistics</p>
 *       </Testimonial.Author>
 *     </Testimonial.Root>
 *   </Card>
 * </Carousel.Item>
 * ```
 */
function TestimonialRoot({ className, children, ref, ...rest }: TestimonialRootProps) {
  return (
    <figure ref={ref} className={cx("loam-Testimonial", className)} {...rest}>
      {children}
    </figure>
  );
}

export interface TestimonialQuoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children?: ReactNode;
  ref?: Ref<HTMLQuoteElement>;
}

/** The quotation, a blockquote. Pass `cite` when the source has a URL. */
function TestimonialQuote({ className, children, ref, ...rest }: TestimonialQuoteProps) {
  return (
    <blockquote ref={ref} className={cx("quote", className)} {...rest}>
      {children}
    </blockquote>
  );
}

export interface TestimonialAuthorProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** Who said it: the figure's caption, a row for an Avatar and the name and role beside it. */
function TestimonialAuthor({ className, children, ref, ...rest }: TestimonialAuthorProps) {
  return (
    <figcaption ref={ref} className={cx("author", className)} {...rest}>
      {children}
    </figcaption>
  );
}

export const Testimonial = {
  Root: TestimonialRoot,
  Quote: TestimonialQuote,
  Author: TestimonialAuthor,
};
