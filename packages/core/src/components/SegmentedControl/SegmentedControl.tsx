"use client";

import { createContext, useCallback, useId, useMemo, useRef } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";

/**
 * A set of mutually exclusive options drawn as one row of segments: a
 * native radio group in a pill, so it works as a form control (the radios
 * submit under `name`) and as a view switcher (`onValueChange`).
 *
 * ```tsx
 * <SegmentedControl.Root name="view" defaultValue="list" onValueChange={setView}>
 *   <SegmentedControl.Legend>View</SegmentedControl.Legend>
 *   <SegmentedControl.Item value="list">List</SegmentedControl.Item>
 *   <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
 * </SegmentedControl.Root>
 * ```
 *
 * The Legend names the group and is painted inside the pill before the
 * segments; give it `className="loam-VisuallyHidden"` when the segments
 * say it themselves. The arrow keys move the choice, as on any radio
 * group, and the chosen segment is drawn by the stylesheet from the
 * radio's own `:checked`.
 */

interface SegmentedControlContextValue {
  name: string;
  /** Controlled value (undefined = uncontrolled group). */
  value?: string;
  defaultValue?: string;
  select: (value: string) => void;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControl(part: string): SegmentedControlContextValue {
  return useRequiredContext(SegmentedControlContext, part, "SegmentedControl.Root");
}

export interface SegmentedControlRootProps extends Omit<
  PartProps<"fieldset">,
  "onChange" | "defaultValue"
> {
  /**
   * Shared `name` for every radio in the group: what the choice submits
   * under. Auto-generated when omitted.
   */
  name?: string;
  /** Controlled chosen value. Pair with `onValueChange`. */
  value?: string;
  /** Initial chosen value for uncontrolled usage. */
  defaultValue?: string;
  /** Fires with the newly chosen value when a segment is picked. */
  onValueChange?: (value: string) => void;
}

function SegmentedControlRoot({
  name,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ref,
  ...rest
}: SegmentedControlRootProps) {
  const autoName = useId();
  const groupName = name ?? autoName;
  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;
  const select = useCallback((next: string) => onValueChangeRef.current?.(next), []);
  const ctx = useMemo<SegmentedControlContextValue>(
    () => ({ name: groupName, value, defaultValue, select }),
    [groupName, value, defaultValue, select],
  );
  return (
    <SegmentedControlContext value={ctx}>
      <fieldset
        ref={ref}
        // radiogroup, not the fieldset's implicit group: the precise role
        // for a set of radios, which is what the segments are.
        role="radiogroup"
        className={cx("loam-SegmentedControl", className)}
        {...rest}
      >
        {children}
      </fieldset>
    </SegmentedControlContext>
  );
}

export interface SegmentedControlLegendProps extends PartProps<"legend"> {}

/**
 * The group's name, a `legend`, painted inside the pill before the
 * segments. Hide it visually with `className="loam-VisuallyHidden"`; it
 * still names the group.
 */
function SegmentedControlLegend({
  className,
  children,
  ref,
  ...rest
}: SegmentedControlLegendProps) {
  useSegmentedControl("SegmentedControl.Legend");
  return (
    <legend ref={ref} className={className} {...rest}>
      {children}
    </legend>
  );
}

export interface SegmentedControlItemProps extends PartProps<"label"> {
  /** The value this segment submits and reports. */
  value: string;
  /** Takes the segment out of the choice. */
  disabled?: boolean;
  /**
   * Props for the radio inside (`aria-describedby`, `data-*`); `className`,
   * `ref` and the rest land on the `<label>`, which is the segment.
   */
  inputProps?: Omit<
    PartProps<"input">,
    "checked" | "defaultChecked" | "disabled" | "name" | "onChange" | "type" | "value"
  >;
  /** The segment's visible label: text, an `svg` icon, or an icon beside hidden text. */
  children?: ReactNode;
}

/**
 * One segment: a `label` around a native radio, so the whole segment is
 * the target and the radio keeps focus and the arrow keys. The stylesheet
 * draws the chosen state from the radio's `:checked`.
 */
function SegmentedControlItem({
  value,
  disabled,
  inputProps,
  className,
  children,
  ref,
  ...rest
}: SegmentedControlItemProps) {
  const group = useSegmentedControl("SegmentedControl.Item");
  const { className: inputClassName, ...input } = inputProps ?? {};
  const selection =
    group.value !== undefined
      ? { checked: group.value === value }
      : { defaultChecked: group.defaultValue === value };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) group.select(value);
  };
  return (
    <label ref={ref} className={cx("segment", className)} {...rest}>
      <input
        {...input}
        className={cx("loam-VisuallyHidden", inputClassName)}
        type="radio"
        name={group.name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...selection}
      />
      {children}
    </label>
  );
}

export const SegmentedControl = {
  Root: SegmentedControlRoot,
  Legend: SegmentedControlLegend,
  Item: SegmentedControlItem,
};
