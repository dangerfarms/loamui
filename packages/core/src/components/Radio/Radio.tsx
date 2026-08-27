"use client";

import { useContext, useId } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { RadioGroupContext } from "./group-context";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label rendered next to the control. */
  label?: ReactNode;
  /** Helper text rendered under the label. */
  description?: ReactNode;
  /** Root wrapper class. */
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

/** The bare radio input, minus any label. */
export type RadioControlProps = Omit<RadioProps, "label" | "description" | "wrapperClassName">;

/**
 * A plain `<input type="radio">` — the elements layer paints it with
 * `accent-color`, so there is no custom dot. When rendered inside a `Field`
 * it reads its id / describedby from context.
 */
function RadioControl({
  id,
  className,
  disabled,
  "aria-describedby": ariaDescribedby,
  ref,
  ...rest
}: RadioControlProps) {
  const field = useFieldControlProps();
  const group = useContext(RadioGroupContext);
  // No aria-invalid here: ARIA allows it on the radiogroup, not the
  // individual radio, so the group's fieldset carries composed errors.
  const resolvedId = id ?? field.id;
  const describedBy = ariaDescribedby ?? field["aria-describedby"];

  // Group participation via context (no cloneElement): shared name and
  // selection state, unless the Radio's own props say otherwise.
  const optionValue = typeof rest.value === "string" ? rest.value : undefined;
  const name = rest.name ?? group?.name;
  const selection =
    group && optionValue !== undefined && rest.checked === undefined
      ? group.value !== undefined
        ? { checked: optionValue === group.value }
        : rest.defaultChecked === undefined && group.defaultValue !== undefined
          ? { defaultChecked: optionValue === group.defaultValue }
          : {}
      : {};
  const onChange =
    group?.onSelect || rest.onChange
      ? (e: ChangeEvent<HTMLInputElement>) => {
          rest.onChange?.(e);
          group?.onSelect?.(e.currentTarget.value);
        }
      : undefined;

  return (
    <input
      ref={ref}
      id={resolvedId}
      type="radio"
      className={cx("fui-Radio", className)}
      disabled={disabled}
      {...rest}
      aria-describedby={describedBy}
      name={name}
      onChange={onChange}
      {...selection}
    />
  );
}

/**
 * A single choice within a set of mutually exclusive options.
 *
 * Pass `label`/`description` for the usual labelled row, or nothing for
 * the bare input (it self-wires inside a `Field`). Usually lives inside a
 * {@link RadioGroup}.
 */
export function Radio({
  label,
  description,
  disabled,
  id,
  wrapperClassName,
  ref,
  ...control
}: RadioProps) {
  const autoId = useId();

  if (!label && !description) {
    return <RadioControl ref={ref} id={id} disabled={disabled} {...control} />;
  }

  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;

  return (
    <label
      className={cx("fui-Radio-wrapper", wrapperClassName)}
      htmlFor={inputId}
      data-disabled={disabled || undefined}
    >
      <RadioControl
        ref={ref}
        id={inputId}
        disabled={disabled}
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
  );
}

export { RadioControl };
