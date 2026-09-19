"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { cx, type PartProps } from "../../utils.js";
import { idList } from "../../render.js";
import { SwitchControl } from "./Switch.js";

export interface SwitchProps extends Omit<PartProps<"input">, "size" | "type"> {
  /** The words beside the toggle. Without one, this renders the bare control. */
  label?: ReactNode;
  /** A line under the label, joined to the control by `aria-describedby`. */
  description?: ReactNode;
  /** Which side the words sit on. @default "end" */
  labelPosition?: "start" | "end";
  /** Props for the wrapping `<label>`, for layout the row needs. */
  wrapperProps?: Omit<PartProps<"label">, "children" | "htmlFor">;
}

/**
 * A toggle and its words: `<Switch label="Order updates" />`.
 *
 * A switch acts immediately, which is what separates it from a checkbox, so
 * the label is part of the control rather than something placed beside it —
 * the whole row is the target. With no label this falls through to the bare
 * control, for composing inside a `Field.Label` of your own.
 *
 * Reach for `Switch.Root`, `Switch.Track` and `Switch.Thumb` when the toggle
 * itself needs a different anatomy.
 */
export function SwitchLabelled({
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

  if (!label && !description) {
    return <SwitchControl ref={ref} id={id} aria-describedby={ariaDescribedby} {...control} />;
  }

  const inputId = id ?? autoId;
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
