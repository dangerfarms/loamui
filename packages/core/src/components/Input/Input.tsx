"use client";

import { useMemo } from "react";
import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs } from "../../render";
import { cx } from "../../utils";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Class for the bordered field wrapper (className goes to the control itself). */
  wrapperClassName?: string;
  /** Content rendered inside the field, before the input. */
  leftSection?: ReactNode;
  /** Content rendered inside the field, after the input. */
  rightSection?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

/**
 * The bordered text box: sections and a native `<input>`.
 *
 * Label it by composing {@link Field} — the control reads its id,
 * description and error wiring from the surrounding `Field.Root`:
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Email</Field.Label>
 *   <Field.Error>{error}</Field.Error>
 *   <Input type="email" autoComplete="email" />
 * </Field.Root>
 * ```
 */
export function Input({
  leftSection,
  rightSection,
  disabled,
  className,
  wrapperClassName,
  style,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onInput,
  onInvalid,
  ref,
  ...rest
}: InputProps) {
  const field = useFieldControlProps();
  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLInputElement>();
  const inputRef = useMemo(() => composeRefs(ref, validationRef), [ref, validationRef]);
  return (
    <div
      className={cx("loam-Input-field", wrapperClassName)}
      data-disabled={disabled || undefined}
      style={style}
    >
      {leftSection && <span className="section">{leftSection}</span>}
      <input
        ref={inputRef}
        className={className}
        disabled={disabled}
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
      />
      {rightSection && <span className="section">{rightSection}</span>}
    </div>
  );
}
