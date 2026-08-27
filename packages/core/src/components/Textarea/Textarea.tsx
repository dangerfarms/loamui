"use client";

import { useMemo } from "react";
import type { Ref, TextareaHTMLAttributes } from "react";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs } from "../../render";
import { cx } from "../../utils";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Class for the bordered field wrapper (className goes to the control itself). */
  wrapperClassName?: string;
  /** Number of visible text rows. @default 3 */
  rows?: number;
  ref?: Ref<HTMLTextAreaElement>;
}

/**
 * The bordered multi-line field: a native `<textarea>` in the shared
 * control box. Label it by composing {@link Field}; the control reads its
 * wiring from the surrounding `Field.Root`.
 */
export function Textarea({
  rows = 3,
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
}: TextareaProps) {
  const field = useFieldControlProps();
  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLTextAreaElement>();
  const textareaRef = useMemo(() => composeRefs(ref, validationRef), [ref, validationRef]);
  return (
    <div
      className={cx("fui-Textarea-field", wrapperClassName)}
      data-disabled={disabled || undefined}
      style={style}
    >
      <textarea
        ref={textareaRef}
        className={className}
        rows={rows}
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
    </div>
  );
}
