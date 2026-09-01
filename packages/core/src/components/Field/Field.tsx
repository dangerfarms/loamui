"use client";

import { createContext, useContext, useEffect, useId, useMemo } from "react";
import type { HTMLAttributes, LabelHTMLAttributes } from "react";
import { cx } from "../../utils";
import { usePresence } from "../../use-presence";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

/**
 * A composable form-field primitive.
 *
 * Assemble a labelled control from small parts and the Root wires accessibility
 * for you: the Label points at the control, the control's `aria-describedby`
 * gathers whatever Description/Error are present, and `aria-invalid` reflects
 * the error state. Parts may be reordered or swapped freely.
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Email</Field.Label>
 *   <Field.Description>We'll never share it.</Field.Description>
 *   <Field.Error>{errorMessage}</Field.Error>
 *   <Field.Control render={<Input />} />
 * </Field.Root>
 * ```
 */

interface FieldContextValue {
  fieldId: string;
  descriptionId: string;
  errorId: string;
  hasDescription: boolean;
  hasError: boolean;
  invalid: boolean;
  /** Composed aria-describedby (description + error ids that are present). */
  describedBy: string | undefined;
  registerDescription: () => () => void;
  registerError: () => () => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(part: string): FieldContextValue {
  const ctx = useContext(FieldContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Field.Root>.`);
  }
  return ctx;
}

/**
 * Read the accessibility props for a control from its surrounding Field.
 *
 * Returns `{}` when used outside a `Field.Root`, so a control can wire itself
 * to the Field when composed inside one
 * (`<Field.Label><Checkbox /> …</Field.Label>`) and fall back to its own
 * props when used standalone. The shape matches {@link FieldControlRenderProps}.
 */
export function useFieldControlProps(): Partial<FieldControlRenderProps> {
  const ctx = useContext(FieldContext);
  if (!ctx) return {};
  return {
    id: ctx.fieldId,
    "aria-describedby": ctx.describedBy,
    "aria-invalid": ctx.invalid || undefined,
  };
}

export interface FieldRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Base id for the control; auto-generated when omitted. */
  id?: string;
}

function FieldRoot({ id, className, children, ...rest }: FieldRootProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [hasDescription, registerDescription] = usePresence();
  const [hasError, registerError] = usePresence();

  // Invalid is never declared, only detected: the field is invalid exactly
  // when a Field.Error with content is rendered. CSS detects the same thing
  // with :has(> p.error).
  const invalid = hasError;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;
  const describedBy =
    cx(hasDescription ? descriptionId : undefined, hasError ? errorId : undefined) || undefined;

  const value = useMemo<FieldContextValue>(
    () => ({
      fieldId,
      descriptionId,
      errorId,
      hasDescription,
      hasError,
      invalid,
      describedBy,
      registerDescription,
      registerError,
    }),
    [
      fieldId,
      descriptionId,
      errorId,
      hasDescription,
      hasError,
      invalid,
      describedBy,
      registerDescription,
      registerError,
    ],
  );

  return (
    <FieldContext value={value}>
      <div className={cx("loam-Field", className)} {...rest}>
        {children}
      </div>
    </FieldContext>
  );
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Mark the field optional in text rather than with a required asterisk. */
  optional?: boolean;
}

function FieldLabel({ optional, className, children, ...rest }: FieldLabelProps) {
  const ctx = useFieldContext("Field.Label");
  return (
    <label className={className} htmlFor={ctx.fieldId} {...rest}>
      {children}
      {optional && <span className="optional"> (optional)</span>}
    </label>
  );
}

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

function FieldDescription({ className, children, ...rest }: FieldDescriptionProps) {
  const ctx = useFieldContext("Field.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p className={cx("description", className)} id={ctx.descriptionId} {...rest}>
      {children}
    </p>
  );
}

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

function FieldError({ className, children, ...rest }: FieldErrorProps) {
  const ctx = useFieldContext("Field.Error");
  const { registerError } = ctx;
  const hasContent = children != null && children !== false;
  useEffect(() => {
    if (!hasContent) return;
    return registerError();
  }, [hasContent, registerError]);

  if (!hasContent) return null;
  return (
    <p className={cx("error", className)} id={ctx.errorId} role="alert" {...rest}>
      <span className="loam-Error-prefix">Error: </span>
      {children}
    </p>
  );
}

/** Accessibility props the Control wires onto whatever it renders. */
export interface FieldControlRenderProps {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
}

export interface FieldControlProps {
  /**
   * The control to render. Either an element to clone (`render={<Input />}`)
   * or a function that receives the accessibility props to spread.
   */
  render: RenderProp<FieldControlRenderProps>;
}

function FieldControl({ render }: FieldControlProps) {
  const ctx = useFieldContext("Field.Control");

  const controlProps: FieldControlRenderProps = {
    id: ctx.fieldId,
    "aria-describedby": ctx.describedBy,
    "aria-invalid": ctx.invalid || undefined,
  };

  return <>{renderWithProps(render, controlProps)}</>;
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Control: FieldControl,
  Error: FieldError,
};
