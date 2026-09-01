"use client";

import { useId, useMemo } from "react";
import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs } from "../../render";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label rendered beside the toggle. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Which side of the toggle the label sits on. @default "end" */
  labelPosition?: "start" | "end";
  /** Root wrapper class. */
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

/** The bare toggle (input + track), minus any label. */
export type SwitchControlProps = Omit<
  SwitchProps,
  "label" | "description" | "labelPosition" | "wrapperClassName"
>;

/**
 * The bare track + `<input role="switch">`. When rendered
 * inside a `Field` it reads its id / describedby / invalid from context
 * (`<Field.Label><SwitchControl /> …</Field.Label>`); otherwise it uses its
 * own props.
 */
function SwitchControl({
  id,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onInput,
  onInvalid,
  ref,
  ...rest
}: SwitchControlProps) {
  const field = useFieldControlProps();

  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLInputElement>();
  const inputRef = useMemo(() => composeRefs(ref, validationRef), [ref, validationRef]);
  const resolvedAriaInvalid = ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined);

  return (
    <span className="loam-Switch-control" data-disabled={disabled || undefined}>
      {/* role-has-required-aria-props is off for this file (.oxlintrc):
          the native checkbox's checkedness maps to aria-checked */}
      <input
        ref={inputRef}
        id={id ?? field.id}
        type="checkbox"
        role="switch"
        className={className}
        disabled={disabled}
        {...rest}
        aria-invalid={resolvedAriaInvalid}
        aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
        onInput={(e) => {
          onInput?.(e);
          checkOnInput(e);
        }}
        onInvalid={(e) => {
          onInvalid?.(e);
          checkOnInvalid(e);
        }}
      />
      <span className="track" aria-hidden>
        <span className="thumb" />
      </span>
    </span>
  );
}

/**
 * An on/off toggle built on a native checkbox with `role="switch"`.
 *
 * Renders an accessible inline row when given `label`/`description`,
 * or the bare track alone (self-wiring inside a `Field`). Errors
 * compose via `Field.Error`.
 * Stateless and server-safe: `defaultChecked` uncontrolled, or
 * `checked` + `onChange`.
 */
export function Switch({
  label,
  description,
  required,
  labelPosition = "end",
  disabled,
  id,
  wrapperClassName,
  ref,
  ...control
}: SwitchProps) {
  const autoId = useId();

  if (!label && !description) {
    return <SwitchControl ref={ref} id={id} disabled={disabled} required={required} {...control} />;
  }

  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;

  const labelRow = (
    <label
      className={cx("loam-Switch-wrapper", !description ? wrapperClassName : undefined)}
      htmlFor={inputId}
      data-label-position={labelPosition}
      data-disabled={disabled || undefined}
    >
      <SwitchControl
        ref={ref}
        id={inputId}
        disabled={disabled}
        required={required}
        aria-describedby={descId}
        {...control}
      />
      <span className="label">{label}</span>
    </label>
  );

  if (!description) return labelRow;

  return (
    <div
      className={cx("loam-Switch-field", wrapperClassName)}
      data-disabled={disabled || undefined}
    >
      {labelRow}
      {description && (
        <span className="description" id={descId}>
          {description}
        </span>
      )}
    </div>
  );
}

export { SwitchControl };
