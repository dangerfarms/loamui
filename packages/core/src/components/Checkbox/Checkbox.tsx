"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { composeRefs } from "../../render";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered next to the checkbox. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Render the "partially checked" (dash) state. */
  indeterminate?: boolean;
  /** Root wrapper class. */
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

/** The bare control, minus any label. */
export type CheckboxControlProps = Omit<
  CheckboxProps,
  "label" | "description" | "wrapperClassName"
>;

/**
 * A plain `<input type="checkbox">` — the elements layer paints it with the
 * platform's own `accent-color`, so there is no custom box or SVG. When
 * rendered inside a `Field` it reads its id / describedby / aria-invalid
 * from context; otherwise it uses its own props.
 */
function CheckboxControl({
  indeterminate = false,
  id,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onInput,
  onInvalid,
  ref,
  ...rest
}: CheckboxControlProps) {
  const field = useFieldControlProps();
  const innerRef = useRef<HTMLInputElement>(null);
  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLInputElement>();
  const inputRef = useMemo(
    () => composeRefs(composeRefs(ref, innerRef), validationRef),
    [ref, validationRef],
  );

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const resolvedAriaInvalid = ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined);
  const resolvedId = id ?? field.id;
  const describedBy = ariaDescribedby ?? field["aria-describedby"];

  return (
    <input
      ref={inputRef}
      id={resolvedId}
      type="checkbox"
      className={cx("fui-Checkbox", className)}
      disabled={disabled}
      {...rest}
      aria-invalid={resolvedAriaInvalid}
      aria-describedby={describedBy}
      onInput={(e) => {
        onInput?.(e);
        checkOnInput(e);
      }}
      onInvalid={(e) => {
        onInvalid?.(e);
        checkOnInvalid(e);
      }}
    />
  );
}

/**
 * A native `<input type="checkbox">`.
 *
 * The `label`/`description` props render an accessible inline row; errors
 * compose via `Field.Error`. Without them you get only the control, which
 * self-wires when placed inside a `Field`.
 */
export function Checkbox({
  label,
  description,
  disabled,
  required,
  id,
  wrapperClassName,
  ref,
  ...control
}: CheckboxProps) {
  const autoId = useId();

  if (!label && !description) {
    return (
      <CheckboxControl ref={ref} id={id} disabled={disabled} required={required} {...control} />
    );
  }

  const fieldId = id ?? autoId;
  const descId = description ? `${fieldId}-desc` : undefined;

  return (
    <div
      className={cx("fui-Checkbox-wrapper", wrapperClassName)}
      data-disabled={disabled || undefined}
    >
      <label htmlFor={fieldId}>
        <CheckboxControl
          ref={ref}
          id={fieldId}
          disabled={disabled}
          required={required}
          aria-describedby={descId}
          {...control}
        />
        <span className="body">
          {label && <span className="label">{label}</span>}
          {description && (
            <span className="description" id={descId}>
              {description}
            </span>
          )}
        </span>
      </label>
    </div>
  );
}

export { CheckboxControl };
