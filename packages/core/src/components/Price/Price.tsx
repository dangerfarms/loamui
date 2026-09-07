import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";

export interface PriceProps extends Omit<PartProps<"data">, "children"> {
  /** The amount in the currency's major unit: 24 for £24, 9.5 for £9.50. */
  value: number;
  /** The ISO 4217 currency code: "GBP", "USD", "EUR". */
  currency: string;
  /**
   * The BCP 47 locale the amount is written in: grouping, decimal mark and
   * where the symbol sits. Pass the page's language; the default is a fixed
   * value only so the server and the browser write the same text. @default "en"
   */
  locale?: string;
  /** What the amount covers ("per seat, per month"), written after it in small text. */
  children?: ReactNode;
}

/**
 * A monetary amount: a `<data>` element whose text is the amount written
 * for people and whose `value` is the number for machines.
 *
 * The amount takes the type around it. A Price sizes nothing itself, so it
 * reads as the heading, paragraph or table cell it sits in; it only fixes
 * the figures (lining, tabular) and dresses the qualifier written as its
 * children. Whole amounts drop their zeros (£24, not £24.00) and fractional
 * ones keep them (£9.50), so a column of prices reads at a glance.
 *
 * ```tsx
 * <p className="price">
 *   <Price value={24} currency="GBP">per seat, per month</Price>
 * </p>
 * ```
 */
export function Price({
  value,
  currency,
  locale = "en",
  className,
  children,
  ref,
  ...rest
}: PriceProps) {
  const amount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    // Baseline 2023; not yet in the es2022 lib types this package compiles against.
    trailingZeroDisplay: "stripIfInteger",
  } as Intl.NumberFormatOptions).format(value);
  return (
    <data ref={ref} value={String(value)} className={cx("loam-Price", className)} {...rest}>
      {amount}
      {children != null && children !== false && <small className="per">{children}</small>}
    </data>
  );
}
