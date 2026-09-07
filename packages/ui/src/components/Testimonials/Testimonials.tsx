import type { BlockquoteHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { Card, cx } from "@loamui/core";
import { Carousel } from "../Carousel/Carousel";
import type { CarouselItemProps, CarouselRootProps } from "../Carousel/Carousel";
import { CarouselControls } from "../Carousel/CarouselControls";

export type TestimonialsRootProps = CarouselRootProps;

/**
 * A testimonials section: a Carousel of quotes, each in a Card.
 *
 * Root, Track and Controls are the Carousel's own, so the track is an
 * ordinary scroll-snap list that works with a wheel, a swipe, a keyboard
 * and no JavaScript. What Testimonials adds is the item: a Card with a
 * quote and its author laid out inside it.
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
function TestimonialsRoot({ className, ...rest }: TestimonialsRootProps) {
  return <Carousel.Root className={cx("loam-Testimonials", className)} {...rest} />;
}

export type TestimonialsItemProps = CarouselItemProps;

/** One testimonial: a Carousel item wrapping a Card, with the quote and author in a column inside it. */
function TestimonialsItem({ children, ...rest }: TestimonialsItemProps) {
  return (
    <Carousel.Item {...rest}>
      <Card>
        <div className="loam-Testimonials-item">{children}</div>
      </Card>
    </Carousel.Item>
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
  Track: Carousel.Track,
  Item: TestimonialsItem,
  Quote: TestimonialsQuote,
  Author: TestimonialsAuthor,
  Controls: CarouselControls,
};
