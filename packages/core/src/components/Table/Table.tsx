import { useEffect, useId, useRef, useState } from "react";
import type { TableHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Shade alternating body rows. */
  striped?: boolean;
  /** Highlight the row under the pointer. */
  highlightOnHover?: boolean;
  /** Draw vertical borders between columns. */
  withColumnBorders?: boolean;
  /** Which side to place a <caption>. @default "top" */
  captionSide?: "top" | "bottom";
  /** Standard thead/tbody/tr/th/td markup. */
  children?: ReactNode;
  ref?: Ref<HTMLTableElement>;
}

/**
 * A styled data table. Compose with native
 * thead/tbody/tr/th/td. Scrolls horizontally on overflow.
 *
 * The scroll wrapper becomes a focusable, labelled region only when the
 * table actually overflows, so a page of narrow tables adds no tab stops.
 * The region takes its name from the table's own `<caption>` when there is
 * one, and falls back to "Scrollable table".
 */
export function Table({
  striped,
  highlightOnHover,
  withColumnBorders,
  captionSide = "top",
  className,
  children,
  ref,
  ...rest
}: TableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const captionId = useId();
  const [labelledBy, setLabelledBy] = useState<string>();
  const [scrollable, setScrollable] = useState(false);

  // Overflow and the caption are facts of the rendered DOM, so they are
  // measured after render, not declared as props.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const caption = el.querySelector("caption");
    if (caption) {
      if (!caption.id) caption.id = captionId;
      setLabelledBy(caption.id);
    }
    const measure = () => setScrollable(el.scrollWidth > el.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [captionId]);

  return (
    <div
      ref={scrollRef}
      className="loam-Table-scroll"
      role={scrollable ? "region" : undefined}
      aria-label={scrollable && !labelledBy ? "Scrollable table" : undefined}
      aria-labelledby={scrollable ? labelledBy : undefined}
      tabIndex={scrollable ? 0 : undefined}
    >
      <table
        ref={ref}
        className={cx("loam-Table", className)}
        data-striped={striped || undefined}
        data-hover={highlightOnHover || undefined}
        data-col-borders={withColumnBorders || undefined}
        data-caption-side={captionSide}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}
