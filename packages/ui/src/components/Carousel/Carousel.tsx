"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { cx } from "@loamui/core";
import type { PartProps } from "@loamui/core";
import { CarouselControls } from "./CarouselControls";

export interface CarouselContextValue {
  /** The Track's element, for the Controls to page; null until one mounts. */
  trackRef: RefObject<HTMLUListElement | null>;
}

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export interface CarouselRootProps extends PartProps<"section"> {
  children?: ReactNode;
}

/**
 * A carousel: a scroll-snap track of items, any content in each, with a
 * pair of Buttons that page through it.
 *
 * The track is an ordinary scroller, so it works with a wheel, a swipe, a
 * keyboard and no JavaScript; `Carousel.Controls` only adds the two
 * Buttons. The track is in the tab order and named ("Carousel" unless you
 * say otherwise), because a scroller that a keyboard cannot reach cannot
 * be scrolled by one: Tab lands on it and the arrow keys move it, and the
 * snap points settle it on an item. Each item is a snap point that hosts
 * whatever you put in it: a Card, an image, a figure, a quote. Items share
 * one width, the public `--loam-carousel-item-size` (20rem by default,
 * never wider than the track), set on the Root. Smooth scrolling is
 * opt-in via the reader's motion preference.
 *
 * ```tsx
 * <Carousel.Root aria-labelledby="guides">
 *   <h2 id="guides">Guides</h2>
 *   <Carousel.Track aria-labelledby="guides">
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
  const trackRef = useRef<HTMLUListElement | null>(null);
  const value = useMemo<CarouselContextValue>(() => ({ trackRef }), []);
  return (
    <CarouselContext value={value}>
      <section ref={ref} className={cx("loam-Carousel", className)} {...rest}>
        {children}
      </section>
    </CarouselContext>
  );
}

export interface CarouselTrackProps extends PartProps<"ul"> {
  /**
   * The words the track speaks: `track` names it for assistive technology
   * when you pass no `aria-label` or `aria-labelledby` of your own.
   * @default { track: "Carousel" }
   */
  labels?: { track?: string };
  children?: ReactNode;
}

/**
 * The scroller: a `ul` laid out as a column grid with inline scroll
 * snapping, in the tab order (`tabIndex` 0, yours to change) and named by
 * `labels.track` unless you name it yourself. Controls page it by one
 * width.
 */
function CarouselTrack({
  labels,
  tabIndex = 0,
  className,
  children,
  ref,
  ...rest
}: CarouselTrackProps) {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error("Carousel.Track must be rendered inside <Carousel.Root>.");
  }
  const { trackRef } = ctx;
  // Both the consumer's ref and the Root's receive the node.
  const setRef = useCallback(
    (node: HTMLUListElement | null) => {
      trackRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, trackRef],
  );
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  const label = named ? undefined : (labels?.track ?? "Carousel");
  return (
    // role="list" is not redundant here: the stylesheet strips the markers,
    // and a list styled with list-style: none loses its list semantics in
    // some browsers; the explicit role keeps the count announced.
    <ul
      ref={setRef}
      role="list"
      tabIndex={tabIndex}
      aria-label={label}
      className={cx("track", className)}
      {...rest}
    >
      {children}
    </ul>
  );
}

export interface CarouselItemProps extends PartProps<"li"> {
  children?: ReactNode;
}

/** One item, an `li`: a snap point that hosts your content, a Card, an image, a figure or a quote. */
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
