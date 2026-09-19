"use client";

import { createContext, useId, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils.js";
import type { PartProps } from "../../utils.js";
import { useRequiredContext } from "../../context.js";
import { idList } from "../../render.js";
import { hasContent as hasMessageContent } from "../../content.js";
import { useIdRegistry, useIsoLayoutEffect } from "../../use-id-registry.js";
import { FieldRoot, FieldLabel } from "../Field/Field.js";
import { FieldsetRoot, FieldsetLegend } from "../Fieldset/Fieldset.js";
import type { FieldsetLabels } from "../Fieldset/Fieldset.js";
import { Input } from "../Input/Input.js";
import type { InputProps } from "../Input/Input.js";

/**
 * Composable parts for asking for a memorable date.
 *
 * A date the user already knows — a date of birth, the date on a document —
 * is typed, not picked: a calendar widget makes them navigate to a value
 * they could have entered in three keystrokes. Day, Month and Year are
 * each a labelled Field around an Input inside a `<fieldset>` named by the
 * Legend, sized to their answer, raising a numeric keypad on touch
 * devices. Render only the parts you need — a month and year, say — and
 * the wiring adapts.
 *
 * For choosing a date from availability (bookings, appointments), a
 * calendar is the right tool — this component is not it.
 *
 * ```tsx
 * <DateInput.Root name="date-of-birth" autoComplete="bday">
 *   <DateInput.Legend>Date of birth</DateInput.Legend>
 *   <DateInput.Description>For example, 27 3 2007</DateInput.Description>
 *   <DateInput.Fields>
 *     <DateInput.Day />
 *     <DateInput.Month />
 *     <DateInput.Year />
 *   </DateInput.Fields>
 * </DateInput.Root>
 * ```
 */

export type DateInputPart = "day" | "month" | "year";

const PART_LABELS: Record<DateInputPart, string> = {
  day: "Day",
  month: "Month",
  year: "Year",
};

/** The words a DateInput says on its own, each with an English default. */
export interface DateInputLabels extends FieldsetLabels {
  /**
   * The hidden words before an Error's message, so the announcement is
   * unmistakable out of context. @default "Error: "
   */
  errorPrefix?: ReactNode;
}

const DEFAULT_ERROR_PREFIX = "Error: ";

interface DateInputContextValue {
  baseId: string;
  name: string | undefined;
  autoComplete: "bday" | undefined;
  descriptionId: string;
  errorId: string;
  errorPrefix: ReactNode;
  invalid: boolean | DateInputPart[];
  registerDescription: (id: string) => () => void;
  registerError: (id: string) => () => void;
}

const DateInputContext = createContext<DateInputContextValue | null>(null);

function useDateInputContext(part: string): DateInputContextValue {
  return useRequiredContext(DateInputContext, part, "DateInput.Root");
}

export interface DateInputRootProps extends Omit<PartProps<"fieldset">, "name"> {
  /** Name prefix for form submission: `{name}-day`, `{name}-month`, `{name}-year`. */
  name?: string;
  /** Wire browser autofill when asking for a date of birth (WCAG 1.3.5). */
  autoComplete?: "bday";
  /** Validation state: true for all fields, or the specific invalid parts. */
  invalid?: boolean | DateInputPart[];
  /** The group's own words; the Legend and Error read them from here. */
  labels?: DateInputLabels;
}

function DateInputRoot({
  name,
  autoComplete,
  invalid = false,
  "aria-describedby": ariaDescribedby,
  labels,
  id,
  className,
  children,
  ref,
  ...rest
}: DateInputRootProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;
  const errorPrefix = labels?.errorPrefix ?? DEFAULT_ERROR_PREFIX;
  const [descriptionIds, registerDescription] = useIdRegistry();
  const [errorIds, registerError] = useIdRegistry();
  const describedBy = idList(...descriptionIds, ...errorIds, ariaDescribedby);

  const value = useMemo<DateInputContextValue>(
    () => ({
      baseId,
      name,
      autoComplete,
      descriptionId,
      errorId,
      errorPrefix,
      invalid,
      registerDescription,
      registerError,
    }),
    [
      baseId,
      name,
      autoComplete,
      descriptionId,
      errorId,
      errorPrefix,
      invalid,
      registerDescription,
      registerError,
    ],
  );

  return (
    <DateInputContext value={value}>
      <FieldsetRoot
        ref={ref}
        id={id}
        className={cx("loam-DateInput", className)}
        labels={labels}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </FieldsetRoot>
    </DateInputContext>
  );
}

export interface DateInputDescriptionProps extends PartProps<"p"> {}

function DateInputDescription({
  id,
  className,
  children,
  ref,
  ...rest
}: DateInputDescriptionProps) {
  const ctx = useDateInputContext("DateInput.Description");
  const { registerDescription } = ctx;
  const descriptionId = id ?? ctx.descriptionId;
  useIsoLayoutEffect(
    () => registerDescription(descriptionId),
    [descriptionId, registerDescription],
  );
  return (
    <p ref={ref} id={descriptionId} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface DateInputErrorProps extends PartProps<"p"> {}

function DateInputError({ id, className, children, ref, ...rest }: DateInputErrorProps) {
  const ctx = useDateInputContext("DateInput.Error");
  const { registerError } = ctx;
  const hasContent = hasMessageContent(children);
  const errorId = id ?? ctx.errorId;
  useIsoLayoutEffect(() => {
    if (hasContent) return registerError(errorId);
  }, [hasContent, errorId, registerError]);

  if (!hasContent) return null;
  return (
    <p ref={ref} id={errorId} role="alert" className={cx("error", className)} {...rest}>
      <span className="loam-VisuallyHidden">{ctx.errorPrefix}</span>
      {children}
    </p>
  );
}

export interface DateInputFieldsProps extends PartProps<"div"> {}

function DateInputFields({ className, children, ref, ...rest }: DateInputFieldsProps) {
  return (
    <div ref={ref} className={cx("parts", className)} {...rest}>
      {children}
    </div>
  );
}

export interface DateInputPartProps extends Omit<InputProps, "children"> {
  /** The visible field label. @default "Day" / "Month" / "Year" */
  children?: ReactNode;
}

// What each part asks for: day and year are numbers; the month accepts
// names ("jan", "january") as well as digits, so it keeps the full
// keyboard and a character more room. The size attribute is the width.
const PARTS: Record<DateInputPart, Pick<InputProps, "inputMode" | "size">> = {
  day: { inputMode: "numeric", size: 2 },
  month: { size: 3 },
  year: { inputMode: "numeric", size: 4 },
};

function createPart(part: DateInputPart, displayName: string) {
  function DateInputPartField({ children, id, ...rest }: DateInputPartProps) {
    const ctx = useDateInputContext(displayName);
    const inputId = id ?? `${ctx.baseId}-${part}`;
    const invalid = typeof ctx.invalid === "boolean" ? ctx.invalid : ctx.invalid.includes(part);
    return (
      <FieldRoot id={inputId} invalid={invalid}>
        <FieldLabel>{children ?? PART_LABELS[part]}</FieldLabel>
        <Input
          {...PARTS[part]}
          name={ctx.name ? `${ctx.name}-${part}` : undefined}
          autoComplete={ctx.autoComplete === "bday" ? `bday-${part}` : undefined}
          aria-invalid={invalid || undefined}
          {...rest}
        />
      </FieldRoot>
    );
  }
  DateInputPartField.displayName = displayName;
  return DateInputPartField;
}

export { DateInputRoot, DateInputDescription, DateInputError, DateInputFields };
/** Names the group with Fieldset.Legend, which reads `labels.optional`. */
export const DateInputLegend = FieldsetLegend;
export const DateInputDay = /* @__PURE__ */ createPart("day", "DateInput.Day");
export const DateInputMonth = /* @__PURE__ */ createPart("month", "DateInput.Month");
export const DateInputYear = /* @__PURE__ */ createPart("year", "DateInput.Year");
