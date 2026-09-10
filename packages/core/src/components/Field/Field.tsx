"use client";

import { createContext, use, useEffect, useId, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { usePresence } from "../../use-presence";
import { idList, renderWithProps } from "../../render";
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

/** The words a Field says on its own, each with an English default. */
export interface FieldLabels {
  /** The text after an optional Label's words. @default "(optional)" */
  optional?: ReactNode;
  /**
   * The hidden words before an Error's message, so the announcement is
   * unmistakable out of context. @default "Error: "
   */
  errorPrefix?: ReactNode;
}

const DEFAULT_LABELS: Required<FieldLabels> = {
  optional: "(optional)",
  errorPrefix: "Error: ",
};

interface FieldContextValue {
  fieldId: string;
  descriptionId: string;
  errorId: string;
  hasDescription: boolean;
  hasError: boolean;
  invalid: boolean;
  /** Composed aria-describedby (description + error ids that are present). */
  describedBy: string | undefined;
  labels: Required<FieldLabels>;
  registerDescription: () => () => void;
  registerError: () => () => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(part: string): FieldContextValue {
  return useRequiredContext(FieldContext, part, "Field.Root");
}

/**
 * Read the accessibility props for a control from its surrounding Field.
 *
 * Pass the control's own `aria-describedby` and the returned one is the
 * Field's ids (description, then error) followed by the control's own, each
 * id once, so a control inside a Field keeps any description it brings.
 * Outside a `Field.Root` only that own value comes back, so a control can
 * wire itself to the Field when composed inside one
 * (`<Field.Label><Checkbox.Control /> …</Field.Label>`) and fall back to its
 * own props when used standalone. The shape matches
 * {@link FieldControlRenderProps}.
 */
export function useFieldControlProps(ariaDescribedby?: string): Partial<FieldControlRenderProps> {
  const ctx = use(FieldContext);
  if (!ctx) return { "aria-describedby": idList(ariaDescribedby) };
  return {
    id: ctx.fieldId,
    "aria-describedby": idList(ctx.describedBy, ariaDescribedby),
    "aria-invalid": ctx.invalid || undefined,
  };
}

export interface FieldRootProps extends PartProps<"div"> {
  /** Base id for the control; auto-generated when omitted. */
  id?: string;
  /** The Field's own words; Label and Error read them from here. */
  labels?: FieldLabels;
}

function FieldRoot({ id, labels, className, children, ref, ...rest }: FieldRootProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [hasDescription, registerDescription] = usePresence();
  const [hasError, registerError] = usePresence();
  const optionalLabel = labels?.optional ?? DEFAULT_LABELS.optional;
  const errorPrefix = labels?.errorPrefix ?? DEFAULT_LABELS.errorPrefix;

  // Invalid is never declared, only detected: the field is invalid exactly
  // when a Field.Error with content is rendered. CSS detects the same thing
  // with :has(> p.error).
  const invalid = hasError;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;
  const describedBy = idList(
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  );

  const value = useMemo<FieldContextValue>(
    () => ({
      fieldId,
      descriptionId,
      errorId,
      hasDescription,
      hasError,
      invalid,
      describedBy,
      labels: { optional: optionalLabel, errorPrefix },
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
      optionalLabel,
      errorPrefix,
      registerDescription,
      registerError,
    ],
  );

  return (
    <FieldContext value={value}>
      <div ref={ref} className={cx("loam-Field", className)} {...rest}>
        {children}
      </div>
    </FieldContext>
  );
}

export interface FieldLabelProps extends PartProps<"label"> {
  /** Mark the field optional in text rather than with a required asterisk. */
  optional?: boolean;
}

function FieldLabel({ optional, className, children, ref, ...rest }: FieldLabelProps) {
  const ctx = useFieldContext("Field.Label");
  return (
    <label ref={ref} className={cx("loam-Field-label", className)} htmlFor={ctx.fieldId} {...rest}>
      {children}
      {optional && (
        <>
          {" "}
          <span className="optional">{ctx.labels.optional}</span>
        </>
      )}
    </label>
  );
}

export interface FieldDescriptionProps extends PartProps<"p"> {}

function FieldDescription({ className, children, ref, ...rest }: FieldDescriptionProps) {
  const ctx = useFieldContext("Field.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p
      ref={ref}
      className={cx("loam-Field-description description", className)}
      id={ctx.descriptionId}
      {...rest}
    >
      {children}
    </p>
  );
}

export interface FieldErrorProps extends PartProps<"p"> {}

function FieldError({ className, children, ref, ...rest }: FieldErrorProps) {
  const ctx = useFieldContext("Field.Error");
  const { registerError } = ctx;
  const hasContent = children != null && children !== false;
  useEffect(() => {
    if (!hasContent) return;
    return registerError();
  }, [hasContent, registerError]);

  if (!hasContent) return null;
  return (
    <p
      ref={ref}
      className={cx("loam-Field-error error", className)}
      id={ctx.errorId}
      role="alert"
      {...rest}
    >
      <span className="loam-VisuallyHidden">{ctx.labels.errorPrefix}</span>
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
