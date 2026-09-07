"use client";

import { createContext, useContext, useId, useMemo } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { Field, renderWithProps, cx } from "@loamui/core";
import type { FieldErrorProps, FieldLabelProps, RenderProp } from "@loamui/core";

interface SettingRowContextValue {
  /** The control's id, and the base every other id in the row derives from. */
  id: string;
  /** The Label's id, for a fieldset in the control slot to name itself by. */
  labelId: string;
}

const SettingRowContext = createContext<SettingRowContextValue | null>(null);

function useSettingRow(part: string): SettingRowContextValue {
  const ctx = useContext(SettingRowContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <SettingRow.Root>.`);
  }
  return ctx;
}

export interface SettingRowRootProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The control's id, and the base the Label (`<id>-label`), Description
   * (`<id>-description`) and Error (`<id>-error`) derive theirs from.
   * Auto-generated when omitted; give one when a fieldset in the control
   * slot must point at the words by id.
   */
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * One preference: a label, a line explaining it, and the control that
 * sets it, laid out as a row with the control at the inline end so a
 * column of rows lines up.
 *
 * The wiring is core `Field`'s: the Label is the control's real
 * `<label>`, so clicking the words toggles a switch, and the Description
 * is joined to the control with `aria-describedby`, so a screen reader
 * hears the explanation. The Field's parts keep their own look; this
 * composition only places them, the words in a `Text` column and the
 * control in its slot. Put a bare `SwitchControl` (or a `Select`, or a
 * `CheckboxControl`) in the Control slot; it reads its id and description
 * from the surrounding Field on its own. Group rows under a core
 * `Fieldset` with a legend; that is the consumer's markup.
 *
 * When the control is itself a group, a `Fieldset` of radios, a `<label>`
 * cannot name it: render the Label as a span (`render={<span />}`) and
 * point the fieldset at it with `aria-labelledby="<id>-label"`, and at the
 * Description with `aria-describedby="<id>-description"`.
 *
 * ```tsx
 * <Fieldset.Root>
 *   <Fieldset.Legend>Notifications</Fieldset.Legend>
 *   <SettingRow.Root>
 *     <SettingRow.Text>
 *       <SettingRow.Label>Email digest</SettingRow.Label>
 *       <SettingRow.Description>A summary every Monday morning.</SettingRow.Description>
 *     </SettingRow.Text>
 *     <SettingRow.Control>
 *       <SwitchControl name="digest" defaultChecked />
 *     </SettingRow.Control>
 *   </SettingRow.Root>
 * </Fieldset.Root>
 * ```
 */
function SettingRowRoot({ id, className, children, ref, ...rest }: SettingRowRootProps) {
  const autoId = useId();
  const rowId = id ?? autoId;
  const value = useMemo<SettingRowContextValue>(
    () => ({ id: rowId, labelId: `${rowId}-label` }),
    [rowId],
  );
  // Field.Root provides the context the parts wire through; the row's own
  // element sits inside it so the Text, Control and Error slots are its
  // direct grid children, and Field's own stack stops at the loam- fence.
  return (
    <SettingRowContext value={value}>
      <Field.Root id={rowId}>
        <div ref={ref} className={cx("loam-SettingRow", className)} {...rest}>
          {children}
        </div>
      </Field.Root>
    </SettingRowContext>
  );
}

export interface SettingRowPartProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** The words: the Label and, under it, the Description, in a column at the inline start. */
function SettingRowText({ className, children, ref, ...rest }: SettingRowPartProps) {
  return (
    <div ref={ref} className={cx("text", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SettingRowLabelProps extends Omit<FieldLabelProps, "htmlFor"> {
  /**
   * Render the words as a different element when the control is a
   * fieldset, which a `<label>` cannot name: `render={<span />}`. The
   * element takes the Label's id (`<id>-label`) and no `for`, so the
   * fieldset names itself by it with `aria-labelledby`.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * The control's `<label>`: core `Field.Label`, wired to the control by the
 * Root, carrying the id `<id>-label`. With `render`, the same words on the
 * element you give, id kept and `for` dropped, for a control that is a
 * group.
 */
function SettingRowLabel({ render, className, children, ...rest }: SettingRowLabelProps) {
  const { labelId } = useSettingRow("SettingRow.Label");
  if (render) {
    return (
      <>
        {renderWithProps(render, {
          id: labelId,
          className: cx("label", className),
          children,
          ...rest,
        })}
      </>
    );
  }
  return (
    <Field.Label id={labelId} className={className} {...rest}>
      {children}
    </Field.Label>
  );
}

/** The slot at the inline end for the control that sets the preference. */
function SettingRowControl({ className, children, ref, ...rest }: SettingRowPartProps) {
  return (
    <div ref={ref} className={cx("control", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SettingRowErrorProps extends FieldErrorProps {
  children?: ReactNode;
}

/**
 * The message when the setting could not be saved, under the words: core
 * `Field.Error` in its own slot. It marks the control invalid, joins the
 * message to it and announces it. Renders nothing without content.
 */
function SettingRowError({ children, ...rest }: SettingRowErrorProps) {
  if (children == null || children === false) return null;
  return (
    <div className="error">
      <Field.Error {...rest}>{children}</Field.Error>
    </div>
  );
}

export const SettingRow = {
  Root: SettingRowRoot,
  Text: SettingRowText,
  Label: SettingRowLabel,
  /** The explanation, joined to the control with `aria-describedby`: core `Field.Description`. */
  Description: Field.Description,
  Control: SettingRowControl,
  Error: SettingRowError,
};
