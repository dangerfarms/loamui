import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { composeRefs } from "../../render";

export interface TableProps extends PartProps<"div"> {
  /** Shade alternating body rows. */
  striped?: boolean;
  /** Highlight the row under the pointer. */
  highlightOnHover?: boolean;
  /** Draw vertical borders between columns. */
  withColumnBorders?: boolean;
  /** Attributes for the `<table>` itself (`ref` included). */
  tableProps?: PartProps<"table">;
  /**
   * The words the scroll region speaks: `scrollable` names it when the
   * table overflows and has no `<caption>` to take the name from.
   */
  labels?: { scrollable?: string };
}

/**
 * A styled data table. Compose with native thead/tbody/tr/th/td inside it.
 *
 * The component's own element is the scroll wrapper: `className`, `ref` and
 * the rest land on it, and it becomes a focusable, labelled region only when
 * the table actually overflows, so a page of narrow tables adds no tab
 * stops. The region takes its name from the table's own `<caption>` when
 * there is one. The `<table>` inside takes `tableProps`.
 */
export function Table({
  striped,
  highlightOnHover,
  withColumnBorders,
  tableProps,
  labels,
  className,
  children,
  ref: refProp,
  ...rest
}: TableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, scrollRef), [refProp]);
  const captionId = useId();
  const [labelledBy, setLabelledBy] = useState<string>();
  const [scrollable, setScrollable] = useState(false);
  const scrollableLabel = labels?.scrollable ?? "Scrollable table";

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
      {...rest}
      ref={composedRef}
      className={cx("loam-Table", className)}
      role={scrollable ? "region" : undefined}
      aria-label={scrollable && !labelledBy ? scrollableLabel : undefined}
      aria-labelledby={scrollable ? labelledBy : undefined}
      tabIndex={scrollable ? 0 : undefined}
      data-striped={striped || undefined}
      data-hover={highlightOnHover || undefined}
      data-col-borders={withColumnBorders || undefined}
    >
      <table {...tableProps}>{children}</table>
    </div>
  );
}
