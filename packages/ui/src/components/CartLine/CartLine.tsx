"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

interface CartLineContextValue {
  /** The Title tells the line its id; the line is named by it while it is present. */
  registerTitle: (id: string) => () => void;
}

const CartLineContext = createContext<CartLineContextValue | null>(null);

export interface CartLineRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element: `render={<li />}` inside a basket's
   * list. The part's classes and attributes merge onto the element it
   * renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** Media, Title, Description, Control, Value, Note and Actions. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * One item in a basket: an image, the product's name linked to its page,
 * the options chosen, a quantity control, the line total with the unit
 * price under it, and a way to remove it.
 *
 * The unit is the line, an `article` named by its Title, so a screen
 * reader's list of the page's articles reads "Linen shirt", "Wool socks"
 * rather than "article", "article". It stands on its own in a mini-basket
 * or an order confirmation, and a basket is a `ul` you write with each
 * line rendered as a `li`. The quantity is your own core `QuantityInput`
 * in a `Field`, so a form, constraint validation and React all see one
 * value in one native input; write its label as the product's name,
 * visually hidden, so a screen reader hears "Quantity for Linen shirt"
 * and not "Quantity" three times in a row, and name the product in the
 * remove Button the same way. The line does no arithmetic: the total is a
 * `Price` you compute, so the figure on screen is the figure the server
 * charged.
 *
 * ```tsx
 * <CartLine.Root>
 *   <CartLine.Media>
 *     <img src="/shirt.jpg" alt="" />
 *   </CartLine.Media>
 *   <CartLine.Title>
 *     <a href="/products/linen-shirt">Linen shirt</a>
 *   </CartLine.Title>
 *   <CartLine.Description>Size M, Blue</CartLine.Description>
 *   <CartLine.Control>
 *     <Field.Root>
 *       <Field.Label className="loam-VisuallyHidden">Quantity for Linen shirt</Field.Label>
 *       <QuantityInput name="quantity" defaultValue={2} min={1} />
 *     </Field.Root>
 *   </CartLine.Control>
 *   <CartLine.Value>
 *     <Price value={90} currency="GBP" />
 *   </CartLine.Value>
 *   <CartLine.Note>
 *     <Price value={45} currency="GBP">each</Price>
 *   </CartLine.Note>
 *   <CartLine.Actions>
 *     <Button onClick={remove}>
 *       Remove<span className="loam-VisuallyHidden"> Linen shirt</span>
 *     </Button>
 *   </CartLine.Actions>
 * </CartLine.Root>
 * ```
 */
function CartLineRoot({ render, className, children, ref, ...rest }: CartLineRootProps) {
  const [titleId, setTitleId] = useState<string | null>(null);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<CartLineContextValue>(() => ({ registerTitle }), [registerTitle]);
  // A name the consumer gives wins over the title's, and the line points
  // at a Title only while one is rendered: a reference to nothing would
  // name it nothing.
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  const props = {
    ref,
    className: cx("loam-CartLine", className),
    "aria-labelledby": !named && titleId ? titleId : undefined,
    children,
    ...rest,
  };
  return (
    <CartLineContext value={value}>
      {render ? renderWithProps(render, props) : <article {...props} />}
    </CartLineContext>
  );
}

export interface CartLineDivProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export interface CartLineParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/**
 * The product's picture: your `img`, sized to a square thumbnail. Give it
 * an empty `alt`: the product's name is text beside it, and a screen
 * reader should hear the name once, not "Linen shirt, link, Linen shirt".
 */
function CartLineMedia({ className, children, ref, ...rest }: CartLineDivProps) {
  return (
    <div ref={ref} className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CartLineTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Render as a different heading, or a `p` where the line is not a section of the page. */
  render?: RenderProp<Record<string, unknown>>;
  /** The product's link: an `<a href>`, or a router link. */
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * The product's name around your link to its page. An `h3` by default. Its
 * `id` (yours if you pass one, the composition's otherwise) is what the
 * line's `aria-labelledby` points at, which is what names the line.
 */
function CartLineTitle({ render, className, children, ref, id, ...rest }: CartLineTitleProps) {
  const ctx = useContext(CartLineContext);
  if (!ctx) {
    throw new Error("CartLine.Title must be rendered inside <CartLine.Root>.");
  }
  const autoId = useId();
  const titleId = id ?? autoId;
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  const props = { ref, id: titleId, className: cx("title", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h3 {...props}>{children}</h3>;
}

/** The options chosen ("Size M, Blue"), a small muted line under the name. */
function CartLineDescription({ className, children, ref, ...rest }: CartLineParagraphProps) {
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * How many of it: hosts your core `QuantityInput` in a `Field.Root`, its
 * `Field.Label` the product's name in the `loam-VisuallyHidden` class,
 * "Quantity for Linen shirt". The control is core's, left as core styles
 * it; this part only gives it its place in the line.
 */
function CartLineControl({ className, children, ref, ...rest }: CartLineDivProps) {
  return (
    <div ref={ref} className={cx("control", className)} {...rest}>
      {children}
    </div>
  );
}

/** The line total: a core `Price` you compute. The line does no arithmetic. */
function CartLineValue({ className, children, ref, ...rest }: CartLineDivProps) {
  return (
    <div ref={ref} className={cx("value", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Optional. One short line under the total explaining it: the unit price,
 * a core `Price` with "each" as its children, so the qualifier is visible
 * and the unit price is never mistaken for the total.
 */
function CartLineNote({ className, children, ref, ...rest }: CartLineParagraphProps) {
  return (
    <p ref={ref} className={cx("note", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * The line's actions, at the end of its last row: your core `Button` that
 * removes it, its visible text "Remove" and the product's name after it in
 * the `loam-VisuallyHidden` class, so a list of remove buttons is a list of
 * products to a screen reader.
 */
function CartLineActions({ className, children, ref, ...rest }: CartLineDivProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export const CartLine = {
  Root: CartLineRoot,
  Media: CartLineMedia,
  Title: CartLineTitle,
  Description: CartLineDescription,
  Control: CartLineControl,
  Value: CartLineValue,
  Note: CartLineNote,
  Actions: CartLineActions,
};
