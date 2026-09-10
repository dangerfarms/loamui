"use client";

import { useId, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs, idList } from "../../render";

/** The bare toggle (input + track), minus any label. */
export interface SwitchControlProps extends Omit<PartProps<"input">, "size" | "type"> {
  /**
   * Props for the span around the input and its track
   * (`span.loam-Switch-control`). `className`, `style`, `ref` and every
   * other prop land on the `<input>` itself.
   */
  wrapperProps?: Omit<PartProps<"span">, "children">;
}

export interface SwitchProps extends Omit<SwitchControlProps, "wrapperProps"> {
  /** Label rendered beside the toggle. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Which side of the toggle the label sits on. @default "end" */
  labelPosition?: "start" | "end";
  /**
   * Props for the labelled row (`label.loam-Switch-wrapper`), which exists
   * only with a `label` or `description`. `className`, `style`, `ref` and
   * every other prop land on the `<input>` itself.
   */
  wrapperProps?: Omit<PartProps<"label">, "children" | "htmlFor">;
}

/**
 * The bare track + `<input role="switch">`. When rendered
 * inside a `Field` it reads its id / describedby / invalid from context
 * (`<Field.Label><Switch.Control /> …</Field.Label>`); otherwise it uses
 * its own props.
 */
function SwitchControl({
  id,
  className,
  wrapperProps,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onInput,
  onInvalid,
  ref,
  ...rest
}: SwitchControlProps) {
  const field = useFieldControlProps(ariaDescribedby);

  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLInputElement>();
  const inputRef = useMemo(() => composeRefs(ref, validationRef), [ref, validationRef]);
  const resolvedAriaInvalid = ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined);
  const { className: wrapperClassName, ...wrapper } = wrapperProps ?? {};

  return (
    <span className={cx("loam-Switch-control", wrapperClassName)} {...wrapper}>
      {/* role-has-required-aria-props is off for this file (.oxlintrc):
          the native checkbox's checkedness maps to aria-checked */}
      <input
        ref={inputRef}
        id={id ?? field.id}
        type="checkbox"
        role="switch"
        className={className}
        {...rest}
        aria-invalid={resolvedAriaInvalid}
        aria-describedby={field["aria-describedby"]}
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
 * compose via `Field.Error`. The labelled row reads the Field too: its
 * input takes the Field's id, so a `Field.Label` in the same Field points
 * at it, and the Field's description and error join its own description
 * in `aria-describedby`.
 * Stateless and server-safe: `defaultChecked` uncontrolled, or
 * `checked` + `onChange`.
 */
function SwitchLabelled({
  label,
  description,
  labelPosition = "end",
  id,
  wrapperProps,
  "aria-describedby": ariaDescribedby,
  ref,
  ...control
}: SwitchProps) {
  const autoId = useId();
  const field = useFieldControlProps();

  if (!label && !description) {
    return <SwitchControl ref={ref} id={id} aria-describedby={ariaDescribedby} {...control} />;
  }

  const inputId = id ?? field.id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const { className: wrapperClassName, ...wrapper } = wrapperProps ?? {};

  const labelRow = (
    <label
      className={cx("loam-Switch-wrapper", wrapperClassName)}
      data-label-position={labelPosition}
      {...wrapper}
      htmlFor={inputId}
    >
      <SwitchControl
        ref={ref}
        id={inputId}
        aria-describedby={idList(descId, ariaDescribedby)}
        {...control}
      />
      <span className="label">{label}</span>
    </label>
  );

  if (!description) return labelRow;

  return (
    <div className="loam-Switch-field">
      {labelRow}
      <span className="description" id={descId}>
        {description}
      </span>
    </div>
  );
}

export const Switch = Object.assign(SwitchLabelled, {
  /** The bare toggle, for composing inside a `Field.Label` of its own. */
  Control: SwitchControl,
});
