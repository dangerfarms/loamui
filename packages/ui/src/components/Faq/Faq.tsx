import type { HTMLAttributes, ReactNode, Ref } from "react";
import { Details } from "@loamui/core";
import type { DetailsRootProps } from "@loamui/core";
import { cx } from "../../utils";

export interface FaqRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A list of questions, each a native disclosure: write your own `h2` for
 * the title, then a `Faq.List` of `Faq.Item`s.
 *
 * Each item is a core `Details`, so the browser owns opening, closing and
 * find-in-page. Give every item the same `name` and the browser keeps at
 * most one open; omit it and readers can hold two answers open to compare.
 *
 * ```tsx
 * <Faq.Root aria-labelledby="faq-title">
 *   <h2 id="faq-title">Questions</h2>
 *   <Faq.List>
 *     <Faq.Item name="faq" summary="Does it work without JavaScript?">
 *       Yes. The stylesheet is static CSS and the disclosures are native.
 *     </Faq.Item>
 *     <Faq.Item name="faq" summary="Which browsers are supported?">
 *       Every browser with Baseline Newly Available CSS.
 *     </Faq.Item>
 *   </Faq.List>
 * </Faq.Root>
 * ```
 */
function FaqRoot({ className, children, ref, ...rest }: FaqRootProps) {
  return (
    <section ref={ref} className={cx("loam-Faq", className)} {...rest}>
      {children}
    </section>
  );
}

export interface FaqListProps extends HTMLAttributes<HTMLDivElement> {
  /** `Faq.Item`s, in the order readers should meet them. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** The stack of questions. */
function FaqList({ className, children, ref, ...rest }: FaqListProps) {
  return (
    <div ref={ref} className={cx("list", className)} {...rest}>
      {children}
    </div>
  );
}

export interface FaqItemProps extends Omit<DetailsRootProps, "children"> {
  /** The question: the always-visible summary line and the item's accessible name. */
  summary: ReactNode;
  /** The answer, revealed when the question is opened. */
  children?: ReactNode;
}

/**
 * One question and its answer: a core `Details` with the question as its
 * summary. `name`, `defaultOpen` and every other native `details` prop pass
 * straight through, so a shared `name` makes the list exclusive.
 */
function FaqItem({ summary, children, ...rest }: FaqItemProps) {
  return (
    <Details.Root {...rest}>
      <Details.Summary>{summary}</Details.Summary>
      <Details.Content>{children}</Details.Content>
    </Details.Root>
  );
}

export const Faq = {
  Root: FaqRoot,
  List: FaqList,
  Item: FaqItem,
};
