import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { CarouselControls } from "./CarouselControls";

export interface CarouselRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A carousel: a scroll-snap track of items, any content in each, with a
 * pair of Buttons that page through it.
 *
 * The track is an ordinary scroller, so it works with a wheel, a swipe, a
 * keyboard and no JavaScript; `Carousel.Controls` only adds the two
 * Buttons. Each item is a snap point that hosts whatever you put in it: a
 * Card, an image, a figure, a quote. Smooth scrolling is opt-in via the
 * reader's motion preference.
 *
 * ```tsx
 * <Carousel.Root aria-labelledby="guides">
 *   <h2 id="guides">Guides</h2>
 *   <Carousel.Track>
 *     <Carousel.Item>
 *       <Card>
 *         <h3>Tokens</h3>
 *         <p>Four hues, eight neutrals and two fluid scales.</p>
 *       </Card>
 *     </Carousel.Item>
 *     <Carousel.Item>
 *       <img src="/guides/layout.png" alt="The layout guide" />
 *     </Carousel.Item>
 *   </Carousel.Track>
 *   <Carousel.Controls />
 * </Carousel.Root>
 * ```
 */
function CarouselRoot({ className, children, ref, ...rest }: CarouselRootProps) {
  return (
    <section ref={ref} className={cx("loam-Carousel", className)} {...rest}>
      {children}
    </section>
  );
}

export interface CarouselTrackProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** The scroller: a column grid with inline scroll snapping. Controls page it by one width. */
function CarouselTrack({ className, children, ref, ...rest }: CarouselTrackProps) {
  return (
    <ul ref={ref} className={cx("track", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface CarouselItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One item: a snap point that hosts your content, a Card, an image, a figure or a quote. */
function CarouselItem({ className, children, ref, ...rest }: CarouselItemProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Item: CarouselItem,
  Controls: CarouselControls,
};
