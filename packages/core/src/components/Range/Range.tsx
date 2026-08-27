"use client";

import type { InputHTMLAttributes, Ref } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";

export interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  ref?: Ref<HTMLInputElement>;
}

/**
 * A styled `<input type="range">` for choosing a value from a range.
 *
 * Label it by composing {@link Field}; the control reads its id,
 * description and error wiring from the surrounding `Field.Root`. No
 * state is held here: uncontrolled via `defaultValue`, or controlled
 * with `value` + `onChange`.
 */
export function Range({
  min = 0,
  max = 100,
  step = 1,
  id,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  ref,
  ...rest
}: RangeProps) {
  const field = useFieldControlProps();

  return (
    <input
      ref={ref}
      id={id ?? field.id}
      type="range"
      className={cx("fui-Range", className)}
      data-disabled={disabled || undefined}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      // No native-validation state is needed here: every range thumb position
      // is valid, so only a composed Field error can mark it invalid.
      aria-invalid={ariaInvalid ?? field["aria-invalid"]}
      aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
      {...rest}
    />
  );
}
