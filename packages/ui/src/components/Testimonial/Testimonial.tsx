import { Children, isValidElement } from "react";
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
 * platform rather than by layout. The author is a `Name` and a `Role`
 * beside an Avatar, each a part, so the caption's structure is the
 * composition's and not free text. It stands on its own in flow, sits in a
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
 *         <Testimonial.Name>Priya Natarajan</Testimonial.Name>
 *         <Testimonial.Role>Head of product, logistics</Testimonial.Role>
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
  /** An Avatar, then a `Testimonial.Name` and a `Testimonial.Role`. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

function isText(child: ReactNode) {
  return (
    isValidElement(child) && (child.type === TestimonialName || child.type === TestimonialRole)
  );
}

/**
 * Who said it: the figure's caption, a row. The Name and the Role are
 * gathered into one column of text beside whatever else is in it, an
 * Avatar, so the two lines stack against the picture whatever order you
 * wrote them in.
 */
function TestimonialAuthor({ className, children, ref, ...rest }: TestimonialAuthorProps) {
  const all = Children.toArray(children);
  const text = all.filter(isText);
  const others = all.filter((child) => !isText(child));
  return (
    <figcaption ref={ref} className={cx("author", className)} {...rest}>
      {others}
      {text.length > 0 && <div className="text">{text}</div>}
    </figcaption>
  );
}

export interface TestimonialNameProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/** The author's name, set strong. Wrap the words in a link when the person has a page. */
function TestimonialName({ className, children, ref, ...rest }: TestimonialNameProps) {
  return (
    <span ref={ref} className={cx("name", className)} {...rest}>
      {children}
    </span>
  );
}

export interface TestimonialRoleProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/** The author's role, muted, on its own line under the name. */
function TestimonialRole({ className, children, ref, ...rest }: TestimonialRoleProps) {
  return (
    <span ref={ref} className={cx("role", className)} {...rest}>
      {children}
    </span>
  );
}

export const Testimonial = {
  Root: TestimonialRoot,
  Quote: TestimonialQuote,
  Author: TestimonialAuthor,
  Name: TestimonialName,
  Role: TestimonialRole,
};
