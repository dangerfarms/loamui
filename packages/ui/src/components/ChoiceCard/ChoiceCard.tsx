"use client";

import { createContext, useContext, useEffect, useId, useMemo } from "react";
import type { ReactNode } from "react";
import { Card, Checkbox, Radio, cx } from "@loamui/core";
import type { CheckboxControlProps, PartProps, RadioControlProps } from "@loamui/core";
import { useOptionalSlot } from "../../naming";

interface ChoiceCardContextValue {
  inputId: string;
  titleId: string;
  /** The Description's id, and the reference the control carries while one is rendered. */
  description: ReturnType<typeof useOptionalSlot>;
}

const ChoiceCardContext = createContext<ChoiceCardContextValue | null>(null);

function useChoiceCard(part: string): ChoiceCardContextValue {
  const ctx = useContext(ChoiceCardContext);
  if (!ctx) {
    throw new Error(`ChoiceCard.${part} must be rendered inside ChoiceCard.Root.`);
  }
  return ctx;
}

export interface ChoiceCardRootProps extends PartProps<"label"> {
  /** Base id for the control; auto-generated when omitted. */
  id?: string;
  /** A Radio or a Checkbox, the Title, an optional Description, and an optional Media first or last. */
  children?: ReactNode;
}

/**
 * One choice presented as a card: a plan, a delivery option, a template.
 *
 * The root is a core Card rendered as a `<label>`, so the whole surface is
 * the click target of the real radio or checkbox inside it. The control's
 * accessible name is the Title alone (`aria-labelledby`), and the
 * Description reaches it as `aria-describedby` while there is one, so a
 * screen reader hears "Pro, radio, 1 of 3" and then the price, not one
 * run-on name. Checked state is the control's own tick plus an outline on
 * the card, never colour alone; focus rings the card as well as the
 * control. The state lives in the input: there is no `checked` prop on
 * the card. The label is the one root, carrying the Card's class and the
 * composition's, so `className`, `ref` and the rest land on it; the parts
 * sit in their own element inside it, and every one of them is phrasing
 * content, because that is all a label may hold. A set of radios shares a
 * `name`, and the group's legend is a core `Fieldset` you write.
 *
 * ```tsx
 * <Fieldset.Root>
 *   <Fieldset.Legend>Choose a plan</Fieldset.Legend>
 *   <ChoiceCard.Root>
 *     <ChoiceCard.Radio name="plan" value="pro" defaultChecked />
 *     <ChoiceCard.Title>Pro</ChoiceCard.Title>
 *     <ChoiceCard.Description>Unlimited projects. £12 a month.</ChoiceCard.Description>
 *   </ChoiceCard.Root>
 * </Fieldset.Root>
 * ```
 */
function ChoiceCardRoot({ id, className, children, ref, ...rest }: ChoiceCardRootProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const description = useOptionalSlot();
  const value = useMemo<ChoiceCardContextValue>(
    () => ({ inputId, titleId: `${inputId}-title`, description }),
    [inputId, description],
  );
  // The Card is the label: it names the control by `for` as well as by
  // nesting, so the association holds however the Card's own markup
  // evolves. The parts are grid children of their own element inside it,
  // where the Card's styles stop at the loam- fence.
  return (
    <Card
      render={
        <label ref={ref} htmlFor={inputId} className={cx("loam-ChoiceCard", className)} {...rest} />
      }
    >
      <span className="body">
        <ChoiceCardContext value={value}>{children}</ChoiceCardContext>
      </span>
    </Card>
  );
}

type WiredControlProps = "id" | "aria-labelledby" | "aria-describedby";

export interface ChoiceCardRadioProps extends Omit<RadioControlProps, WiredControlProps> {}

/**
 * The real control for one-of-many: core's bare `Radio.Control`, with its
 * id, name and description wired to the card's Title and Description.
 * Every input prop passes through (`name`, `value`, `defaultChecked`,
 * `disabled`, `onChange`, `required`); radios in a set share a `name`.
 */
function ChoiceCardRadio(props: ChoiceCardRadioProps) {
  const { inputId, titleId, description } = useChoiceCard("Radio");
  return (
    <span className="control">
      <Radio.Control
        id={inputId}
        aria-labelledby={titleId}
        aria-describedby={description.ref}
        {...props}
      />
    </span>
  );
}

export interface ChoiceCardCheckboxProps extends Omit<CheckboxControlProps, WiredControlProps> {}

/**
 * The real control for any-of-many: core's bare `Checkbox.Control`, wired
 * the same way as the Radio.
 */
function ChoiceCardCheckbox(props: ChoiceCardCheckboxProps) {
  const { inputId, titleId, description } = useChoiceCard("Checkbox");
  return (
    <span className="control">
      <Checkbox.Control
        id={inputId}
        aria-labelledby={titleId}
        aria-describedby={description.ref}
        {...props}
      />
    </span>
  );
}

export interface ChoiceCardTextProps extends PartProps<"span"> {
  children?: ReactNode;
}

/** The choice's name; it is the control's accessible name. */
function ChoiceCardTitle({ className, children, ref, ...rest }: ChoiceCardTextProps) {
  const { titleId } = useChoiceCard("Title");
  return (
    <span ref={ref} id={titleId} className={cx("title", className)} {...rest}>
      {children}
    </span>
  );
}

/**
 * What the choice includes, or costs; muted, and joined to the control as
 * its description while it is rendered. The reference is in the server
 * HTML already, and dropped after mount if no Description is rendered.
 */
function ChoiceCardDescription({ className, children, ref, ...rest }: ChoiceCardTextProps) {
  const { description } = useChoiceCard("Description");
  const { register } = description;
  useEffect(() => register(), [register]);
  return (
    <span ref={ref} id={description.id} className={cx("description", className)} {...rest}>
      {children}
    </span>
  );
}

export interface ChoiceCardMediaProps extends PartProps<"span"> {
  /** An `img` or an inline `svg`. */
  children?: ReactNode;
}

/** A picture or icon for the choice, spanning the card. Decorative: the Title names the choice. */
function ChoiceCardMedia({ className, children, ref, ...rest }: ChoiceCardMediaProps) {
  return (
    <span ref={ref} className={cx("media", className)} aria-hidden {...rest}>
      {children}
    </span>
  );
}

export const ChoiceCard = {
  Root: ChoiceCardRoot,
  Radio: ChoiceCardRadio,
  Checkbox: ChoiceCardCheckbox,
  Title: ChoiceCardTitle,
  Description: ChoiceCardDescription,
  Media: ChoiceCardMedia,
};
