"use client";

import { useMemo } from "react";
import type { Ref, SelectHTMLAttributes } from "react";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs } from "../../render";
import { cx } from "../../utils";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Class for the bordered field wrapper (className goes to the control itself). */
  wrapperClassName?: string;
  /** Non-selectable prompt shown as the first, empty-valued option. */
  placeholder?: string;
  ref?: Ref<HTMLSelectElement>;
}

/**
 * A native `<select>` in the shared control box, with a fluid chevron.
 * Options are children (`<option>` / `<optgroup>`), exactly as the
 * platform defines them. Label it by composing {@link Field}; the control
 * reads its wiring from the surrounding `Field.Root`.
 */
export function Select({
  placeholder,
  disabled,
  className,
  wrapperClassName,
  style,
  children,
  defaultValue,
  value,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onInput,
  onInvalid,
  ref,
  ...rest
}: SelectProps) {
  const field = useFieldControlProps();
  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLSelectElement>();
  const selectRef = useMemo(() => composeRefs(ref, validationRef), [ref, validationRef]);
  const isControlled = value !== undefined;
  const resolvedDefault =
    !isControlled && defaultValue === undefined && placeholder ? "" : defaultValue;

  return (
    <div
      className={cx("loam-Select-field", wrapperClassName)}
      data-disabled={disabled || undefined}
      style={style}
    >
      <select
        ref={selectRef}
        className={className}
        disabled={disabled}
        value={value}
        defaultValue={resolvedDefault}
        id={id ?? field.id}
        {...rest}
        aria-invalid={ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined)}
        aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
        onInput={(e) => {
          onInput?.(e);
          checkOnInput(e);
        }}
        onInvalid={(e) => {
          onInvalid?.(e);
          checkOnInvalid(e);
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg className="chevron" viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
