"use client";

import { createContext, isValidElement, use, useId, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils.js";
import type { PartProps } from "../../utils.js";
import { useRequiredContext } from "../../context.js";
import { useIdRegistry, useIsoLayoutEffect } from "../../use-id-registry.js";
import { hasContent } from "../../content.js";
import { idList, renderWithProps } from "../../render.js";
import type { RenderProp } from "../../render.js";

/**
 * A composable form-field primitive.
 *
 * Assemble a labelled control from small parts and the Root wires accessibility
 * for you: the Label points at the control, the control's `aria-describedby`
 * gathers whatever Description/Error are present, and `aria-invalid` reflects
 * the explicit invalid state. Parts may be reordered or swapped freely.
 *
 * ```tsx
 * <Field.Root invalid={Boolean(errorMessage)}>
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
  invalid: boolean;
  /** Composed aria-describedby (description + error ids that are present). */
  describedBy: string | undefined;
  labels: Required<FieldLabels>;
  registerControl: (id: string) => () => void;
  registerDescription: (id: string) => () => void;
  registerError: (id: string) => () => void;
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
 * (`<Field.Label><Checkbox /> …</Field.Label>`) and fall back to its
 * own props when used standalone. The shape matches
 * {@link FieldControlRenderProps}.
 */
export function useFieldControlProps(
  ariaDescribedby?: string,
  id?: string,
): Partial<FieldControlRenderProps> {
  const ctx = use(FieldContext);
  const registerControl = ctx?.registerControl;
  useIsoLayoutEffect(() => {
    if (id !== undefined && registerControl) return registerControl(id);
  }, [id, registerControl]);
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
  /** Validation state, independent of whether an error message is rendered. */
  invalid?: boolean;
  /** The Field's own words; Label and Error read them from here. */
  labels?: FieldLabels;
}

function FieldRoot({
  id,
  invalid = false,
  labels,
  className,
  children,
  ref,
  ...rest
}: FieldRootProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const [controls, registerControl] = useIdRegistry();
  const [descriptions, registerDescription] = useIdRegistry();
  const [errors, registerError] = useIdRegistry();
  const fieldId = controls.at(-1) ?? baseId;
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;
  const describedBy = idList(...descriptions, ...errors);
  const optionalLabel = labels?.optional ?? DEFAULT_LABELS.optional;
  const errorPrefix = labels?.errorPrefix ?? DEFAULT_LABELS.errorPrefix;

  const value = useMemo<FieldContextValue>(
    () => ({
      fieldId,
      descriptionId,
      errorId,
      invalid,
      describedBy,
      labels: { optional: optionalLabel, errorPrefix },
      registerControl,
      registerDescription,
      registerError,
    }),
    [
      fieldId,
      descriptionId,
      errorId,
      invalid,
      describedBy,
      optionalLabel,
      errorPrefix,
      registerControl,
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

/** A local label/description scope for an option, inheriting the surrounding validation state. */
export interface FieldItemProps extends PartProps<"div"> {}

function FieldItem(props: FieldItemProps) {
  const parent = use(FieldContext);
  return <FieldRoot invalid={parent?.invalid} labels={parent?.labels} {...props} />;
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

function FieldDescription({ id, className, children, ref, ...rest }: FieldDescriptionProps) {
  const ctx = useFieldContext("Field.Description");
  const { registerDescription } = ctx;
  const descriptionId = id ?? ctx.descriptionId;
  useIsoLayoutEffect(
    () => registerDescription(descriptionId),
    [descriptionId, registerDescription],
  );
  return (
    <p
      ref={ref}
      className={cx("loam-Field-description description", className)}
      id={descriptionId}
      {...rest}
    >
      {children}
    </p>
  );
}

export interface FieldErrorProps extends PartProps<"p"> {}

function FieldError({ id, className, children, ref, ...rest }: FieldErrorProps) {
  const ctx = useFieldContext("Field.Error");
  const { registerError } = ctx;
  const present = hasContent(children);
  const errorId = id ?? ctx.errorId;
  useIsoLayoutEffect(() => {
    if (present) return registerError(errorId);
  }, [present, errorId, registerError]);

  if (!present) return null;
  return (
    <p
      ref={ref}
      className={cx("loam-Field-error error", className)}
      id={errorId}
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

  const ownId = isValidElement<{ id?: string }>(render) ? render.props.id : undefined;
  const field = useFieldControlProps(undefined, ownId);
  const controlProps: FieldControlRenderProps = {
    id: field.id ?? ctx.fieldId,
    "aria-describedby": ctx.describedBy,
    "aria-invalid": ctx.invalid || undefined,
  };

  return <>{renderWithProps(render, controlProps, { id: controlProps.id })}</>;
}

export { FieldRoot, FieldItem, FieldLabel, FieldDescription, FieldControl, FieldError };
