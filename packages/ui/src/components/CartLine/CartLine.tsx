"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";
import { Button, Field, renderWithProps, cx } from "@loamui/core";
import type { ButtonProps, FieldLabelProps, PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

/** The words a cart line says on its own, each with an English default. */
export interface CartLineLabels {
  /**
   * The quantity control's label, hidden on screen, written from the
   * product's name so a basket of controls reads apart: "Quantity for Linen
   * shirt". Before the Title's text is known (on the server, and until
   * hydration) it is called with `undefined`. @default "Quantity for {title}"
   */
  quantity?: (title: string | undefined) => ReactNode;
  /** The remove Button's visible word; the product's name follows it, hidden. @default "Remove" */
  remove?: ReactNode;
}

const DEFAULT_LABELS: Required<CartLineLabels> = {
  quantity: (title) => (title ? `Quantity for ${title}` : "Quantity"),
  remove: "Remove",
};

interface CartLineContextValue {
  nameId: string;
  register: (id: string) => () => void;
  /** The Title's text, read from the element once it is in the document. */
  title: string | undefined;
  setTitle: (text: string | undefined) => void;
  labels: Required<CartLineLabels>;
}

const CartLineContext = createContext<CartLineContextValue | null>(null);

function useCartLine(part: string): CartLineContextValue {
  const ctx = useContext(CartLineContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <CartLine.Root>.`);
  }
  return ctx;
}

export interface CartLineRootProps extends PartProps<"article"> {
  /**
   * Render as a different element: `render={<li />}` inside a basket's
   * list. The part's classes and attributes merge onto the element it
   * renders, the same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** The line's own words; QuantityLabel and Remove read them from here. */
  labels?: CartLineLabels;
  /** Media, Title, Description, Control, Value, Note and Actions. */
  children?: ReactNode;
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
 * value in one native input; its label is `CartLine.QuantityLabel`, which
 * writes the product's name into a hidden `Field.Label` so a screen reader
 * hears "Quantity for Linen shirt" and not "Quantity" three times in a
 * row, and `CartLine.Remove` names the product in the remove Button the
 * same way. The line does no arithmetic: the total is a `Price` you
 * compute, so the figure on screen is the figure the server charged.
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
 *       <CartLine.QuantityLabel />
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
 *     <CartLine.Remove onClick={remove} />
 *   </CartLine.Actions>
 * </CartLine.Root>
 * ```
 */
function CartLineRoot({ render, labels, className, children, ...rest }: CartLineRootProps) {
  // The line is named by its Title from the first render, so the server
  // HTML carries the name; a consumer's own name wins.
  const { nameId, register, labelling } = useNamedRoot(rest);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const value = useMemo<CartLineContextValue>(
    () => ({
      nameId,
      register,
      title,
      setTitle,
      labels: { ...DEFAULT_LABELS, ...labels },
    }),
    [nameId, register, title, labels],
  );
  // The article is only the container; the grid is the inner element,
  // because an element cannot answer its own container query.
  const props = {
    className: cx("loam-CartLine", className),
    ...labelling,
    children: <div className="inner">{children}</div>,
    ...rest,
  };
  return (
    <CartLineContext value={value}>
      {render ? renderWithProps(render, props) : <article {...props} />}
    </CartLineContext>
  );
}

export interface CartLineDivProps extends PartProps<"div"> {}

export interface CartLineParagraphProps extends PartProps<"p"> {}

/**
 * The product's picture: your `img`, sized to a square thumbnail by the
 * public `--loam-cart-line-media-size` (5rem by default), set on the line
 * or on a region. Give it an empty `alt`: the product's name is text
 * beside it, and a screen reader should hear the name once, not "Linen
 * shirt, link, Linen shirt".
 */
function CartLineMedia({ className, children, ...rest }: CartLineDivProps) {
  return (
    <div className={cx("media", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CartLineTitleProps extends PartProps<"h3"> {
  /** Render as a different heading, or a `p` where the line is not a section of the page. */
  render?: RenderProp<Record<string, unknown>>;
  /** The product's link: an `<a href>`, or a router link. */
  children?: ReactNode;
}

/** Hand a node to two refs: the consumer's and the composition's. */
function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

/**
 * The product's name around your link to its page. An `h3` by default. Its
 * `id` (yours if you pass one, the composition's otherwise) is what the
 * line's `aria-labelledby` points at, which is what names the line; its
 * text is what `QuantityLabel` and `Remove` write after their words.
 */
function CartLineTitle({ render, className, children, id, ref, ...rest }: CartLineTitleProps) {
  const ctx = useCartLine("CartLine.Title");
  const titleId = useNamePart(ctx, id);
  const { setTitle } = ctx;
  // The text is read from the element after every commit, not from the
  // children, so a router link or a component renders whatever it likes
  // and the name still follows; setting the same text again is a no-op.
  const node = useRef<HTMLElement | null>(null);
  useEffect(() => {
    setTitle(node.current?.textContent?.trim() || undefined);
  });
  const props = {
    id: titleId,
    ref: composeRefs(ref, node),
    className: cx("title", className),
    children,
    ...rest,
  };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h3 {...props}>{children}</h3>;
}

/** The options chosen ("Size M, Blue"), a small muted line under the name. */
function CartLineDescription({ className, children, ...rest }: CartLineParagraphProps) {
  return (
    <p className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * How many of it: hosts your core `QuantityInput` in a `Field.Root`, with
 * `CartLine.QuantityLabel` as the Field's label. The control is core's,
 * left as core styles it; this part only gives it its place in the line.
 */
function CartLineControl({ className, children, ...rest }: CartLineDivProps) {
  return (
    <div className={cx("control", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CartLineQuantityLabelProps extends Omit<FieldLabelProps, "children"> {}

/**
 * The quantity control's label: a core `Field.Label`, visually hidden,
 * whose text is `labels.quantity` written with the Title's text, "Quantity
 * for Linen shirt". Place it inside the `Field.Root` in `CartLine.Control`,
 * before the QuantityInput. Real text, so it translates and shows in
 * reader mode; hidden, because the product's name is already on screen.
 */
function CartLineQuantityLabel({ className, ...rest }: CartLineQuantityLabelProps) {
  const { title, labels } = useCartLine("CartLine.QuantityLabel");
  return (
    <Field.Label className={cx("loam-VisuallyHidden", className)} {...rest}>
      {labels.quantity(title)}
    </Field.Label>
  );
}

/**
 * The line total: a core `Price` you compute. The line does no arithmetic.
 * For a reduced line, put a `ProductCard.Was` before the Price: the old
 * price struck through, with "Was" and "Now" read out around the pair.
 */
function CartLineValue({ className, children, ...rest }: CartLineDivProps) {
  return (
    <div className={cx("value", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Optional. One short line under the total explaining it: the unit price,
 * a core `Price` with "each" as its children, so the qualifier is visible
 * and the unit price is never mistaken for the total.
 */
function CartLineNote({ className, children, ...rest }: CartLineParagraphProps) {
  return (
    <p className={cx("note", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * The line's actions, at the end of its last row: a `CartLine.Remove`, or
 * a core Button of your own that names the product in the
 * `loam-VisuallyHidden` class.
 */
function CartLineActions({ className, children, ...rest }: CartLineDivProps) {
  return (
    <div className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CartLineRemoveProps extends ButtonProps {
  /** The visible word. @default labels.remove ("Remove") */
  children?: ReactNode;
}

/**
 * The remove action: a core `Button` whose visible text is `labels.remove`
 * (or your children) and whose name goes on to the Title's text, hidden,
 * so a basket of remove buttons is a list of products to a screen reader.
 * Pass `onClick`, or `render={<button type="submit" name="remove" value={id} />}`
 * to make it a form's own.
 */
function CartLineRemove({ children, ...rest }: CartLineRemoveProps) {
  const { title, labels } = useCartLine("CartLine.Remove");
  return (
    <Button {...rest}>
      {children ?? labels.remove}
      {title && <span className="loam-VisuallyHidden"> {title}</span>}
    </Button>
  );
}

export const CartLine = {
  Root: CartLineRoot,
  Media: CartLineMedia,
  Title: CartLineTitle,
  Description: CartLineDescription,
  Control: CartLineControl,
  QuantityLabel: CartLineQuantityLabel,
  Value: CartLineValue,
  Note: CartLineNote,
  Actions: CartLineActions,
  Remove: CartLineRemove,
};
