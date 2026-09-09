"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
  RefObject,
} from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { composeRefs, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

/**
 * A carousel: a scroll-snap track of items with buttons that page it,
 * indicators that jump to an item, and a live status, composed from parts.
 *
 * The Track is an ordinary scroller, so it works with a wheel, a swipe, a
 * keyboard and no JavaScript; the parts around it add paging, position
 * and announcement on top of native scrolling rather than replacing it.
 * Which item is current is read from the scroll position with an
 * IntersectionObserver, so Indicators, Previous, Next and the status follow
 * a swipe as faithfully as a click. Nothing advances on its own.
 *
 * ```tsx
 * <Carousel.Root aria-labelledby="guides">
 *   <h2 id="guides">Guides</h2>
 *   <Carousel.Track>
 *     <Carousel.Item>…</Carousel.Item>
 *     <Carousel.Item>…</Carousel.Item>
 *   </Carousel.Track>
 *   <div className="row">
 *     <Carousel.Previous />
 *     <Carousel.Next />
 *   </div>
 *   <Carousel.Indicators />
 * </Carousel.Root>
 * ```
 */

export interface CarouselLabels {
  /** The region's name, unless you pass `aria-label` or `aria-labelledby`. @default "Carousel" */
  region?: string;
  /** The Previous button's name. @default "Previous" */
  previous?: string;
  /** The Next button's name. @default "Next" */
  next?: string;
  /** An indicator's name, from its 1-based position and the count. @default "Go to slide i of n" */
  indicator?: (index: number, count: number) => string;
  /** The status read once the track settles on an item. @default "Slide i of n" */
  status?: (index: number, count: number) => string;
}

interface CarouselContextValue {
  trackRef: RefObject<HTMLUListElement | null>;
  /** An Item announces its element; the Root observes it and counts it. */
  register: (item: HTMLElement) => () => void;
  count: number;
  /** The first item at least half in view, 0-based. */
  active: number;
  atStart: boolean;
  atEnd: boolean;
  loop: boolean;
  /** Scroll by one width of the track, in reading order. */
  page: (direction: -1 | 1) => void;
  /** Scroll so an item sits at the start of the track. */
  goTo: (index: number) => void;
  labels: Required<CarouselLabels>;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(part: string): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Carousel.Root>.`);
  }
  return ctx;
}

function defaultIndicator(index: number, count: number): string {
  return `Go to slide ${index} of ${count}`;
}

function defaultStatus(index: number, count: number): string {
  return `Slide ${index} of ${count}`;
}

const NO_LABELS: CarouselLabels = {};

/** An item counts as in view from this share of it; as wholly in view from FULL. */
const HALF = 0.5;
const FULL = 0.99;

/** How long the track must be still before its position is announced. */
const SETTLE_MS = 150;

function inDocumentOrder<T extends Element>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
  );
}

function isRtl(el: Element): boolean {
  return getComputedStyle(el).direction === "rtl";
}

interface Position {
  active: number;
  atStart: boolean;
  atEnd: boolean;
}

const AT_REST: Position = { active: 0, atStart: true, atEnd: false };

export interface CarouselRootProps extends PartProps<"section"> {
  /** At either end, Previous and Next wrap around instead of disabling. */
  loop?: boolean;
  /** The default strings, each overridable. */
  labels?: CarouselLabels;
}

function CarouselRoot({
  loop = false,
  labels: {
    region = "Carousel",
    previous = "Previous",
    next = "Next",
    indicator = defaultIndicator,
    status: statusLabel = defaultStatus,
  } = NO_LABELS,
  className,
  children,
  ...rest
}: CarouselRootProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const ratiosRef = useRef(new Map<Element, number>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState<Position>(AT_REST);
  const [measured, setMeasured] = useState(false);
  const [status, setStatus] = useState("");
  const positionRef = useRef(position);
  positionRef.current = position;

  const measure = useCallback(() => {
    const items = itemsRef.current;
    if (items.length === 0) return;
    const ratio = (el: Element) => ratiosRef.current.get(el) ?? 0;
    let active = items.findIndex((el) => ratio(el) >= HALF);
    if (active < 0) {
      active = items.reduce((best, el, i) => (ratio(el) > ratio(items[best]!) ? i : best), 0);
    }
    setPosition({
      active,
      atStart: ratio(items[0]!) >= FULL,
      atEnd: ratio(items[items.length - 1]!) >= FULL,
    });
    setMeasured(true);
  }, []);

  const register = useCallback(
    (item: HTMLElement) => {
      itemsRef.current = inDocumentOrder([...itemsRef.current, item]);
      setCount(itemsRef.current.length);
      // Created on the first Item, once the Track it scrolls in has a node.
      if (!observerRef.current && typeof IntersectionObserver !== "undefined" && trackRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              ratiosRef.current.set(entry.target, entry.intersectionRatio);
            }
            measure();
          },
          { root: trackRef.current, threshold: [0, HALF, 1] },
        );
      }
      observerRef.current?.observe(item);
      return () => {
        observerRef.current?.unobserve(item);
        ratiosRef.current.delete(item);
        itemsRef.current = itemsRef.current.filter((el) => el !== item);
        setCount(itemsRef.current.length);
      };
    },
    [measure],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const page = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;
      const sign = isRtl(track) ? -1 : 1;
      const { atStart, atEnd } = positionRef.current;
      if (loop && direction === 1 && atEnd) {
        track.scrollTo({ left: 0 });
        return;
      }
      if (loop && direction === -1 && atStart) {
        track.scrollTo({ left: sign * track.scrollWidth });
        return;
      }
      track.scrollBy({ left: sign * direction * track.clientWidth });
    },
    [loop],
  );

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const item = itemsRef.current[index];
    if (!track || !item) return;
    // Only the track scrolls: scrollIntoView would move every ancestor
    // scroller too. The snap points settle it on the item's start.
    const trackRect = track.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const delta = isRtl(track) ? itemRect.right - trackRect.right : itemRect.left - trackRect.left;
    track.scrollTo({ left: track.scrollLeft + delta });
  }, []);

  const labels = useMemo(
    () => ({ region, previous, next, indicator, status: statusLabel }),
    [region, previous, next, indicator, statusLabel],
  );

  // Announce once the track has settled: a fling passes several items,
  // and only the one it stops on is news. The first measurement is the
  // resting position, not a change.
  const announcedRef = useRef<number | null>(null);
  useEffect(() => {
    if (!measured) return;
    const last = announcedRef.current;
    announcedRef.current = position.active;
    if (last === null || last === position.active) return;
    const timer = setTimeout(() => {
      setStatus(labels.status(position.active + 1, count));
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [measured, position.active, count, labels]);

  const ctx = useMemo<CarouselContextValue>(
    () => ({
      trackRef,
      register,
      count,
      active: position.active,
      atStart: position.atStart,
      atEnd: position.atEnd,
      loop,
      page,
      goTo,
      labels,
    }),
    [register, count, position, loop, page, goTo, labels],
  );

  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;

  return (
    <CarouselContext value={ctx}>
      <section
        aria-roledescription="carousel"
        aria-label={named ? undefined : labels.region}
        className={cx("loam-Carousel", className)}
        {...rest}
      >
        {children}
        <span role="status" className="loam-VisuallyHidden">
          {status}
        </span>
      </section>
    </CarouselContext>
  );
}

export interface CarouselTrackProps extends PartProps<"ul"> {}

/** The wiring the Track attaches to its `<ul>`. */
interface CarouselTrackWiring {
  ref: Ref<HTMLUListElement> | undefined;
  tabIndex: number;
  onKeyDown: (e: ReactKeyboardEvent<HTMLUListElement>) => void;
}

/**
 * The scroller: a `ul` laid out as a column grid with inline scroll
 * snapping, in the tab order so a keyboard can reach it. ArrowLeft and
 * ArrowRight page it, Home and End go to the ends; the arrows are left to
 * the browser when focus is on something inside an item.
 */
function CarouselTrack({ ref, tabIndex = 0, className, ...rest }: CarouselTrackProps) {
  const ctx = useCarouselContext("Carousel.Track");
  const trackRef = useMemo(() => composeRefs(ref, ctx.trackRef), [ref, ctx.trackRef]);
  const { page, goTo, count } = ctx;

  const wiring: CarouselTrackWiring = {
    ref: trackRef,
    tabIndex,
    onKeyDown: (e) => {
      if (e.target !== e.currentTarget || e.defaultPrevented) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const rtl = isRtl(e.currentTarget);
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          page(rtl ? -1 : 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          page(rtl ? 1 : -1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(count - 1);
          break;
      }
    },
  };

  return (
    <>{renderWithProps(<ul role="list" className={cx("track", className)} {...rest} />, wiring)}</>
  );
}

/** The wiring an Item attaches to whatever it renders. */
export interface CarouselItemRenderProps {
  ref: Ref<HTMLLIElement> | undefined;
  className?: string;
  children?: ReactNode;
}

export interface CarouselItemProps extends PartProps<"li"> {
  /** Substitute your own element; it receives the wiring props. Defaults to an `<li>`. */
  render?: RenderProp<CarouselItemRenderProps>;
}

/** One item, a snap point that hosts your content: a Card, an image, a figure, a quote. */
function CarouselItem({ render, className, children, ref, ...rest }: CarouselItemProps) {
  const ctx = useCarouselContext("Carousel.Item");
  const ownRef = useRef<HTMLLIElement | null>(null);
  const itemRef = useMemo(() => composeRefs(ref, ownRef), [ref]);
  const { register } = ctx;

  useEffect(() => {
    const el = ownRef.current;
    if (!el) return;
    return register(el);
  }, [register]);

  const wiring: CarouselItemRenderProps = { ref: itemRef, className, children };

  return (
    <>
      {render
        ? renderWithProps(render, mergeProps(wiring, rest))
        : renderWithProps(<li {...rest} />, wiring)}
    </>
  );
}

/** The wiring Previous and Next attach to whatever they render. */
export interface CarouselControlRenderProps {
  type: "button";
  /** The name from `labels`, unless children name the button. */
  "aria-label": string | undefined;
  /** At an end without `loop`. The button keeps focus, so a reader is not dropped. */
  "aria-disabled": true | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface CarouselControlProps extends Omit<ButtonProps, "render"> {
  /**
   * Substitute your own element, or pass a function receiving the wiring
   * props. Without it, the part renders a LoamUI Button with a chevron
   * that points toward the start (Previous) or the end (Next) of the
   * track in either writing direction, named by `labels`.
   */
  render?: RenderProp<CarouselControlRenderProps>;
}

function ChevronIcon({ direction }: { direction: -1 | 1 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={direction === -1 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

function CarouselControl({
  direction,
  part,
  render,
  className,
  children,
  ...rest
}: CarouselControlProps & { direction: -1 | 1; part: string }) {
  const ctx = useCarouselContext(part);
  const disabled = !ctx.loop && (direction === -1 ? ctx.atStart : ctx.atEnd);
  const label = direction === -1 ? ctx.labels.previous : ctx.labels.next;

  const wiring: CarouselControlRenderProps = {
    type: "button",
    "aria-label": children == null ? label : undefined,
    "aria-disabled": disabled || undefined,
    onClick: () => {
      if (!disabled) ctx.page(direction);
    },
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(wiring, { className, children, ...rest }))}</>
  ) : (
    <>
      {renderWithProps(
        <Button {...rest} className={cx("loam-Carousel-control", className)}>
          {children ?? <ChevronIcon direction={direction} />}
        </Button>,
        wiring,
      )}
    </>
  );
}

/** Pages the Track back by one of its widths; disabled at the start unless `loop`. */
function CarouselPrevious(props: CarouselControlProps) {
  return <CarouselControl direction={-1} part="Carousel.Previous" {...props} />;
}

/** Pages the Track forward by one of its widths; disabled at the end unless `loop`. */
function CarouselNext(props: CarouselControlProps) {
  return <CarouselControl direction={1} part="Carousel.Next" {...props} />;
}

export interface CarouselIndicatorsProps extends PartProps<"ul"> {}

/**
 * One button per item, named by `labels.indicator`, the current one
 * marked with `aria-current`. A click scrolls that item to the start of
 * the Track.
 */
function CarouselIndicators({ className, ...rest }: CarouselIndicatorsProps) {
  const ctx = useCarouselContext("Carousel.Indicators");
  const id = useId();
  const dots: ReactNode[] = [];
  for (let i = 0; i < ctx.count; i += 1) {
    dots.push(
      <li key={`${id}-${i}`}>
        <button
          type="button"
          aria-label={ctx.labels.indicator(i + 1, ctx.count)}
          aria-current={ctx.active === i || undefined}
          onClick={() => ctx.goTo(i)}
        />
      </li>,
    );
  }
  return (
    // list-style: none drops list semantics in WebKit; the role keeps "5 items".
    <ul role="list" className={cx("indicators", className)} {...rest}>
      {dots}
    </ul>
  );
}

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Indicators: CarouselIndicators,
};
