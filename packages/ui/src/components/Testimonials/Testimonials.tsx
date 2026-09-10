import type { BlockquoteHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { Card } from "@loamui/core";
import { cx } from "../../utils";
import { TestimonialsControls } from "./TestimonialsControls";

export interface TestimonialsRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A testimonials section: a scroll-snap carousel of quotes, each in a Card,
 * with a pair of Buttons that page through it.
 *
 * The track is an ordinary scroller, so it works with a wheel, a swipe, a
 * keyboard and no JavaScript; `Testimonials.Controls` only adds the two
 * Buttons. Smooth scrolling is opt-in via the reader's motion preference.
 *
 * ```tsx
 * <Testimonials.Root>
 *   <Testimonials.Track>
 *     <Testimonials.Item>
 *       <Testimonials.Quote>We shipped a bespoke design system in a week.</Testimonials.Quote>
 *       <Testimonials.Author>
 *         <Avatar name="Priya Natarajan" aria-hidden />
 *         <p><strong>Priya Natarajan</strong><br />Head of product, logistics</p>
 *       </Testimonials.Author>
 *     </Testimonials.Item>
 *   </Testimonials.Track>
 *   <Testimonials.Controls />
 * </Testimonials.Root>
 * ```
 */
function TestimonialsRoot({ className, children, ref, ...rest }: TestimonialsRootProps) {
  return (
    <section ref={ref} className={cx("loam-Testimonials", className)} {...rest}>
      {children}
    </section>
  );
}

export interface TestimonialsTrackProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** The scroller: a column grid with inline scroll snapping. Controls page it by one width. */
function TestimonialsTrack({ className, children, ref, ...rest }: TestimonialsTrackProps) {
  return (
    <ul ref={ref} className={cx("track", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface TestimonialsItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One testimonial: a snap point wrapping a Card. */
function TestimonialsItem({ className, children, ref, ...rest }: TestimonialsItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      <Card className="loam-Testimonials-item">{children}</Card>
    </li>
  );
}

export interface TestimonialsQuoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children?: ReactNode;
  ref?: Ref<HTMLQuoteElement>;
}

/** The quotation, a blockquote. Pass `cite` when the source has a URL. */
function TestimonialsQuote({ className, children, ref, ...rest }: TestimonialsQuoteProps) {
  return (
    <blockquote ref={ref} className={cx("quote", className)} {...rest}>
      {children}
    </blockquote>
  );
}

export interface TestimonialsAuthorProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** Who said it: a footer row for an Avatar and the name and role beside it. */
function TestimonialsAuthor({ className, children, ref, ...rest }: TestimonialsAuthorProps) {
  return (
    <footer ref={ref} className={cx("author", className)} {...rest}>
      {children}
    </footer>
  );
}

export const Testimonials = {
  Root: TestimonialsRoot,
  Track: TestimonialsTrack,
  Item: TestimonialsItem,
  Quote: TestimonialsQuote,
  Author: TestimonialsAuthor,
  Controls: TestimonialsControls,
};
