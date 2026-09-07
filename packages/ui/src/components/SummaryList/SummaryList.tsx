import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { cx, renderWithProps } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

export interface SummaryListRootProps extends HTMLAttributes<HTMLDListElement> {
  /**
   * The list's accessible name, for a page that holds more than one: "Your
   * answers", "Order details". Set as `aria-label`; prefer `aria-labelledby`
   * pointing at the heading above the list when there is one.
   */
  label?: string;
  /** `SummaryList.Item`s, one per label/value pair. */
  children?: ReactNode;
  ref?: Ref<HTMLDListElement>;
}

/**
 * Label/value rows, each with an optional action: the answers a person is
 * about to submit, an order's details and its money lines, the facts of an
 * account.
 *
 * The unit is the Root: a description list, so each label and its value are
 * associated for assistive technology and the pair reads as one thing. The
 * action is a real link (or a Button) in the row, and its accessible name
 * says what it changes: "Change name", not "Change", because a page of
 * identical "Change" links tells a screen reader user nothing about where
 * each one goes. `SummaryList.Action` writes that name for you: the visible
 * text is its children and the rest is its `label`, visually hidden. A row
 * with no action keeps the column empty so values align down the list. A
 * `Note` under a value explains it on the page ("Free over £50", "Included")
 * rather than in a tooltip only a pointer finds. An item that sums the ones
 * above it takes `className="total"` and is set apart by a heavier rule and
 * weight; its Label says "Total", so nothing is hidden that the page does
 * not show. Write a missing value ("Not provided") rather than leaving the
 * cell blank, so the reader knows the answer is absent and not the page
 * broken. Long values wrap; nothing truncates.
 *
 * ```tsx
 * <SummaryList.Root>
 *   <SummaryList.Item>
 *     <SummaryList.Label>Name</SummaryList.Label>
 *     <SummaryList.Value>Sarah Bloom</SummaryList.Value>
 *     <SummaryList.Actions>
 *       <SummaryList.Action href="/name" label="name">Change</SummaryList.Action>
 *     </SummaryList.Actions>
 *   </SummaryList.Item>
 *   <SummaryList.Item>
 *     <SummaryList.Label>Reference</SummaryList.Label>
 *     <SummaryList.Value>LU-48213</SummaryList.Value>
 *   </SummaryList.Item>
 * </SummaryList.Root>
 * ```
 */
function SummaryListRoot({ label, className, children, ref, ...rest }: SummaryListRootProps) {
  return (
    <dl ref={ref} className={cx("loam-SummaryList", className)} aria-label={label} {...rest}>
      {children}
    </dl>
  );
}

export interface SummaryListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** A `SummaryList.Label`, a `SummaryList.Value`, then optionally a `SummaryList.Note` and a `SummaryList.Actions`, in that order. */
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * One pair: a `div` grouping a label, its value, a note and its actions
 * inside the Root's list. It belongs inside a Root, which is the unit that
 * stands alone. Give the item that sums the others `className="total"`.
 */
function SummaryListItem({ className, children, ref, ...rest }: SummaryListItemProps) {
  return (
    <div ref={ref} className={cx("item", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SummaryListPartProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** What the value is (Name, Date of birth, Total), a `dt`. Comes first in the item. */
function SummaryListLabel({ className, children, ref, ...rest }: SummaryListPartProps) {
  return (
    <dt ref={ref} className={cx("label", className)} {...rest}>
      {children}
    </dt>
  );
}

export interface SummaryListValueProps extends SummaryListPartProps {
  /**
   * Render as a different element: `render={<dd lang="fr" />}` is not
   * needed (pass `lang` directly), but a value that is itself a core part,
   * `render={<Price value={42.5} currency="GBP" />}`, keeps the `dd` slot
   * while the element is the Price. The part's classes and attributes merge
   * onto the element it renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
}

/**
 * The value, a `dd`: text, a short `ul` when the answer is several things,
 * a core `Price`, lines separated by `br`. Write "Not provided" when there
 * is no value, never leave it empty.
 */
function SummaryListValue({ render, className, children, ref, ...rest }: SummaryListValueProps) {
  const props = { ref, className: cx("value", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <dd {...props} />;
}

/**
 * Optional. One short line explaining the value, a `dd` after it: "Free
 * over £50", "Included", "Arrives Thursday". Small and muted, under the
 * value, on the page rather than in a tooltip, so it reads in order after
 * the figure it explains and is there for every reader.
 */
function SummaryListNote({ className, children, ref, ...rest }: SummaryListPartProps) {
  return (
    <dd ref={ref} className={cx("note", className)} {...rest}>
      {children}
    </dd>
  );
}

/**
 * The item's actions, a `dd` holding a `SummaryList.Action` (or a Button).
 * Leave it out of an item that cannot be changed; the column stays so the
 * values still align.
 */
function SummaryListActions({ className, children, ref, ...rest }: SummaryListPartProps) {
  return (
    <dd ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </dd>
  );
}

export interface SummaryListActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * What the action changes, completing the visible text into the
   * accessible name: children "Change" and label "name" read as
   * "Change name". Rendered as real text, visually hidden, so it
   * translates and shows in reader mode.
   */
  label: string;
  /**
   * Render as a different element: `render={<button type="button" />}`
   * when the action is a step in the page rather than a destination. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** The visible text: a verb, "Change", "Add", "Remove". */
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * The action: an `a` whose accessible name is its visible text plus the
 * `label`, so every action on the page says what it changes.
 */
function SummaryListAction({
  label,
  render,
  className,
  children,
  ref,
  ...rest
}: SummaryListActionProps) {
  const content = (
    <>
      {children}
      <span className="loam-VisuallyHidden"> {label}</span>
    </>
  );
  if (render) {
    return (
      <>
        {renderWithProps(render, {
          ref,
          className: cx("action", className),
          children: content,
          ...rest,
        })}
      </>
    );
  }
  return (
    <a ref={ref} className={cx("action", className)} {...rest}>
      {content}
    </a>
  );
}

export const SummaryList = {
  Root: SummaryListRoot,
  Item: SummaryListItem,
  Label: SummaryListLabel,
  Value: SummaryListValue,
  Note: SummaryListNote,
  Actions: SummaryListActions,
  Action: SummaryListAction,
};
