"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs } from "../../render";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";

export interface InputProps extends PartProps<"input"> {
  /**
   * Props for the bordered box around the input (`div.loam-Input-field`).
   * `className`, `style`, `ref` and every other prop of the component land
   * on the `<input>` itself; this is the one way to reach the box.
   */
  wrapperProps?: Omit<PartProps<"div">, "children">;
  /** Content rendered inside the box, before the input. */
  startSection?: ReactNode;
  /** Content rendered inside the box, after the input. */
  endSection?: ReactNode;
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
 *
 * The native `size` attribute is forwarded and honoured: a sized input is
 * as wide as that many characters and the box shrink-wraps it, so a
 * two-digit answer gets a two-digit field.
 */
export function Input({
  startSection,
  endSection,
  wrapperProps,
  className,
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
  const { className: wrapperClassName, ...wrapper } = wrapperProps ?? {};
  return (
    <div className={cx("loam-Input-field", wrapperClassName)} {...wrapper}>
      {startSection && <span className="section">{startSection}</span>}
      <input
        ref={inputRef}
        className={className}
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
      {endSection && <span className="section">{endSection}</span>}
    </div>
  );
}
