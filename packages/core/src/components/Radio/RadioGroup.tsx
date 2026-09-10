"use client";

import { createContext, useCallback, useEffect, useId, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { composeRefs, idList } from "../../render";
import { useFormReset } from "../../use-form-reset";
import { usePresence } from "../../use-presence";
import { Fieldset } from "../Fieldset/Fieldset";
import type { FieldsetLabels, FieldsetLegendProps } from "../Fieldset/Fieldset";
import { RadioGroupContext } from "./group-context";
import type { RadioGroupContextValue } from "./group-context";

/**
 * Labels and lays out a set of mutually exclusive {@link Radio} options,
 * sharing a single `name` so native inputs enforce exclusivity.
 *
 * Options participate via context (not element cloning), so `<Radio>`s
 * work at any nesting depth inside the group. The Root holds no selection
 * state: use uncontrolled (`defaultValue`) or drive it with `value` +
 * `onChange`. The group is invalid exactly while an Error with content is
 * rendered, or after a native submit attempt found a required option
 * unchosen.
 *
 * ```tsx
 * <RadioGroup.Root name="plan" defaultValue="pro">
 *   <RadioGroup.Legend>Plan</RadioGroup.Legend>
 *   <RadioGroup.Description>You can change it later.</RadioGroup.Description>
 *   <RadioGroup.Error>{error}</RadioGroup.Error>
 *   <Radio value="free" label="Free" />
 *   <Radio value="pro" label="Pro" />
 * </RadioGroup.Root>
 * ```
 */

/** The words a RadioGroup says on its own, each with an English default. */
export interface RadioGroupLabels extends FieldsetLabels {
  /**
   * The hidden words before an Error's message, so the announcement is
   * unmistakable out of context. @default "Error: "
   */
  errorPrefix?: ReactNode;
}

const DEFAULT_ERROR_PREFIX = "Error: ";

interface RadioGroupPartsContextValue {
  descriptionId: string;
  errorId: string;
  errorPrefix: ReactNode;
  registerDescription: () => () => void;
  registerError: () => () => void;
}

const RadioGroupPartsContext = createContext<RadioGroupPartsContextValue | null>(null);

function useRadioGroupParts(part: string): RadioGroupPartsContextValue {
  return useRequiredContext(RadioGroupPartsContext, part, "RadioGroup.Root");
}

export interface RadioGroupRootProps extends Omit<
  PartProps<"fieldset">,
  "onChange" | "defaultValue"
> {
  /**
   * Shared `name` for every radio in the group (guarantees native
   * mutual-exclusivity). Auto-generated when omitted.
   */
  name?: string;
  /** Controlled selected value. Pair with `onChange`. */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Fires with the newly selected value when a radio is chosen. */
  onChange?: (value: string) => void;
  /** Layout direction of the options. @default "vertical" */
  orientation?: "vertical" | "horizontal";
  /** The group's own words; the Legend and Error read them from here. */
  labels?: RadioGroupLabels;
}

function RadioGroupRoot({
  name,
  value,
  defaultValue,
  onChange,
  orientation = "vertical",
  labels,
  id,
  className,
  "aria-describedby": ariaDescribedby,
  "aria-invalid": ariaInvalid,
  onInvalid,
  onInput,
  children,
  ref,
  ...rest
}: RadioGroupRootProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const groupName = name ?? baseId;
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;
  const [hasDescription, registerDescription] = usePresence();
  const [hasError, registerError] = usePresence();
  const errorPrefix = labels?.errorPrefix ?? DEFAULT_ERROR_PREFIX;
  const [nativeInvalid, setNativeInvalid] = useState(false);
  const invalid = hasError || nativeInvalid;
  const clearNativeInvalid = useCallback(() => setNativeInvalid(false), []);
  const resetRef = useFormReset<HTMLFieldSetElement>(clearNativeInvalid);
  const rootRef = useMemo(() => composeRefs(ref, resetRef), [ref, resetRef]);

  const checkOnInput = (event: FormEvent<HTMLFieldSetElement>) => {
    if (!nativeInvalid) return;
    const radios = event.currentTarget.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    setNativeInvalid(Array.from(radios).some((radio) => !radio.validity.valid));
  };

  const ctx = useMemo<RadioGroupContextValue>(
    () => ({
      name: groupName,
      value,
      defaultValue,
      onSelect: onChange,
    }),
    [groupName, value, defaultValue, onChange],
  );
  const parts = useMemo<RadioGroupPartsContextValue>(
    () => ({ descriptionId, errorId, errorPrefix, registerDescription, registerError }),
    [descriptionId, errorId, errorPrefix, registerDescription, registerError],
  );

  return (
    <RadioGroupContext value={ctx}>
      <RadioGroupPartsContext value={parts}>
        <Fieldset.Root
          ref={rootRef}
          id={id}
          // radiogroup (not the fieldset's implicit group): the precise
          // role, and the one ARIA allows aria-invalid on.
          role="radiogroup"
          className={cx("loam-RadioGroup", className)}
          data-orientation={orientation}
          labels={labels}
          aria-describedby={idList(
            hasDescription ? descriptionId : undefined,
            hasError ? errorId : undefined,
            ariaDescribedby,
          )}
          aria-invalid={ariaInvalid ?? (invalid || undefined)}
          onInvalid={(event) => {
            onInvalid?.(event);
            setNativeInvalid(true);
          }}
          onInput={(event) => {
            onInput?.(event);
            checkOnInput(event);
          }}
          {...rest}
        >
          {children}
        </Fieldset.Root>
      </RadioGroupPartsContext>
    </RadioGroupContext>
  );
}

export interface RadioGroupLegendProps extends FieldsetLegendProps {}

/** The group's name: core `Fieldset.Legend`, which reads `labels.optional`. */
function RadioGroupLegend(props: RadioGroupLegendProps) {
  useRadioGroupParts("RadioGroup.Legend");
  return <Fieldset.Legend {...props} />;
}

export interface RadioGroupDescriptionProps extends PartProps<"p"> {}

/** Helper text under the legend, joined to the group with `aria-describedby`. */
function RadioGroupDescription({ className, children, ref, ...rest }: RadioGroupDescriptionProps) {
  const { descriptionId, registerDescription } = useRadioGroupParts("RadioGroup.Description");
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p ref={ref} className={cx("description", className)} id={descriptionId} {...rest}>
      {children}
    </p>
  );
}

export interface RadioGroupErrorProps extends PartProps<"p"> {}

/**
 * The group's error, announced as it appears. With content it puts the
 * group in the invalid state (every radio answers it); without content it
 * renders nothing.
 */
function RadioGroupError({ className, children, ref, ...rest }: RadioGroupErrorProps) {
  const { errorId, errorPrefix, registerError } = useRadioGroupParts("RadioGroup.Error");
  const hasContent = children != null && children !== false;
  useEffect(() => {
    if (!hasContent) return;
    return registerError();
  }, [hasContent, registerError]);

  if (!hasContent) return null;
  return (
    <p ref={ref} className={cx("error", className)} id={errorId} role="alert" {...rest}>
      <span className="loam-VisuallyHidden">{errorPrefix}</span>
      {children}
    </p>
  );
}

export const RadioGroup = {
  Root: RadioGroupRoot,
  Legend: RadioGroupLegend,
  Description: RadioGroupDescription,
  Error: RadioGroupError,
};
