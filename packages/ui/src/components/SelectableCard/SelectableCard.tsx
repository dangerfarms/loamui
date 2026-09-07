"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, LabelHTMLAttributes, ReactNode, Ref } from "react";
import { Card, CheckboxControl, RadioControl, cx } from "@loamui/core";
import type { CheckboxControlProps, RadioControlProps } from "@loamui/core";

interface SelectableCardContextValue {
  inputId: string;
  titleId: string;
  descriptionId: string;
  /** Whether a Description is rendered, so the control is described only by one that exists. */
  hasDescription: boolean;
  registerDescription: () => () => void;
}

const SelectableCardContext = createContext<SelectableCardContextValue | null>(null);

function useSelectableCard(part: string): SelectableCardContextValue {
  const ctx = useContext(SelectableCardContext);
  if (!ctx) {
    throw new Error(`SelectableCard.${part} must be rendered inside SelectableCard.Root.`);
  }
  return ctx;
}

export interface SelectableCardRootProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Base id for the control; auto-generated when omitted. */
  id?: string;
  /** A Radio or a Checkbox, the Title, an optional Description, and an optional Media first or last. */
  children?: ReactNode;
  ref?: Ref<HTMLLabelElement>;
}

/**
 * One choice presented as a card: a plan, a delivery option, a template.
 *
 * The root is a core Card rendered as a `<label>`, so the whole surface is
 * the click target of the real radio or checkbox inside it. The control's
 * accessible name is the Title alone (`aria-labelledby`), and the
 * Description reaches it as `aria-describedby` when there is one, so a
 * screen reader hears "Pro, radio, 1 of 3" and then the price, not one
 * run-on name. Checked state is the control's own tick plus a stronger
 * edge on the card, never colour alone; focus rings the card as well as
 * the control. The state lives in the input: there is no `checked` prop
 * on the card. The Card is core's, left as core styles it; the parts sit
 * in their own element inside it, and every one of them is phrasing
 * content, because that is all a label may hold. A set of radios shares a
 * `name`, and the group's legend is a core `Fieldset` you write.
 *
 * ```tsx
 * <Fieldset.Root>
 *   <Fieldset.Legend>Choose a plan</Fieldset.Legend>
 *   <SelectableCard.Root>
 *     <SelectableCard.Radio name="plan" value="pro" defaultChecked />
 *     <SelectableCard.Title>Pro</SelectableCard.Title>
 *     <SelectableCard.Description>Unlimited projects. £12 a month.</SelectableCard.Description>
 *   </SelectableCard.Root>
 * </Fieldset.Root>
 * ```
 */
function SelectableCardRoot({ id, className, children, ref, ...rest }: SelectableCardRootProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [descriptions, setDescriptions] = useState(0);
  const registerDescription = useCallback(() => {
    setDescriptions((n) => n + 1);
    return () => setDescriptions((n) => n - 1);
  }, []);
  const value = useMemo<SelectableCardContextValue>(
    () => ({
      inputId,
      titleId: `${inputId}-title`,
      descriptionId: `${inputId}-desc`,
      hasDescription: descriptions > 0,
      registerDescription,
    }),
    [inputId, descriptions, registerDescription],
  );
  // The Card is the label: it names the control by `for` as well as by
  // nesting, so the association holds however the Card's own markup
  // evolves. The parts are grid children of their own element inside it,
  // where the Card's styles stop at the loam- fence.
  return (
    <Card render={<label ref={ref} htmlFor={inputId} className={className} {...rest} />}>
      <span className="loam-SelectableCard">
        <SelectableCardContext value={value}>{children}</SelectableCardContext>
      </span>
    </Card>
  );
}

type WiredControlProps = "id" | "aria-labelledby" | "aria-describedby";

export interface SelectableCardRadioProps extends Omit<RadioControlProps, WiredControlProps> {}

/**
 * The real control for one-of-many: core's bare `RadioControl`, with its
 * id, name and description wired to the card's Title and Description.
 * Every input prop passes through (`name`, `value`, `defaultChecked`,
 * `disabled`, `onChange`, `required`); radios in a set share a `name`.
 */
function SelectableCardRadio(props: SelectableCardRadioProps) {
  const { inputId, titleId, descriptionId, hasDescription } = useSelectableCard("Radio");
  return (
    <span className="control">
      <RadioControl
        id={inputId}
        aria-labelledby={titleId}
        aria-describedby={hasDescription ? descriptionId : undefined}
        {...props}
      />
    </span>
  );
}

export interface SelectableCardCheckboxProps extends Omit<
  CheckboxControlProps,
  WiredControlProps
> {}

/**
 * The real control for any-of-many: core's bare `CheckboxControl`, wired
 * the same way as the Radio.
 */
function SelectableCardCheckbox(props: SelectableCardCheckboxProps) {
  const { inputId, titleId, descriptionId, hasDescription } = useSelectableCard("Checkbox");
  return (
    <span className="control">
      <CheckboxControl
        id={inputId}
        aria-labelledby={titleId}
        aria-describedby={hasDescription ? descriptionId : undefined}
        {...props}
      />
    </span>
  );
}

export interface SelectableCardTextProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/** The choice's name; it is the control's accessible name. */
function SelectableCardTitle({ className, children, ref, ...rest }: SelectableCardTextProps) {
  const { titleId } = useSelectableCard("Title");
  return (
    <span ref={ref} id={titleId} className={cx("title", className)} {...rest}>
      {children}
    </span>
  );
}

/**
 * What the choice includes, or costs; muted, and joined to the control as
 * its description while it is rendered.
 */
function SelectableCardDescription({ className, children, ref, ...rest }: SelectableCardTextProps) {
  const { descriptionId, registerDescription } = useSelectableCard("Description");
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <span ref={ref} id={descriptionId} className={cx("description", className)} {...rest}>
      {children}
    </span>
  );
}

export interface SelectableCardMediaProps extends HTMLAttributes<HTMLSpanElement> {
  /** An `img` or an inline `svg`. */
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/** A picture or icon for the choice, spanning the card. Decorative: the Title names the choice. */
function SelectableCardMedia({ className, children, ref, ...rest }: SelectableCardMediaProps) {
  return (
    <span ref={ref} className={cx("media", className)} aria-hidden {...rest}>
      {children}
    </span>
  );
}

export const SelectableCard = {
  Root: SelectableCardRoot,
  Radio: SelectableCardRadio,
  Checkbox: SelectableCardCheckbox,
  Title: SelectableCardTitle,
  Description: SelectableCardDescription,
  Media: SelectableCardMedia,
};
