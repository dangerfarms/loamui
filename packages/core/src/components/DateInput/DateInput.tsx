"use client";

import { createContext, useCallback, useEffect, useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { idList } from "../../render";
import { usePresence } from "../../use-presence";
import { Field } from "../Field/Field";
import { Fieldset } from "../Fieldset/Fieldset";
import type { FieldsetLabels } from "../Fieldset/Fieldset";
import { Input } from "../Input/Input";
import type { InputProps } from "../Input/Input";

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
  hasError: boolean;
  /** Parts the registered error applies to; null means all of them. */
  errorParts: DateInputPart[] | null;
  registerDescription: () => () => void;
  registerError: (parts: DateInputPart[] | null) => () => void;
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
  /** The group's own words; the Legend and Error read them from here. */
  labels?: DateInputLabels;
}

function DateInputRoot({
  name,
  autoComplete,
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
  const [hasDescription, registerDescription] = usePresence();
  // An Error registers like a Description, plus the parts it names.
  const [errorInfo, setErrorInfo] = useState<{
    count: number;
    parts: DateInputPart[] | null;
  }>({ count: 0, parts: null });
  const registerError = useCallback((parts: DateInputPart[] | null) => {
    setErrorInfo((s) => ({ count: s.count + 1, parts }));
    return () =>
      setErrorInfo((s) => ({
        count: s.count - 1,
        parts: s.count > 1 ? s.parts : null,
      }));
  }, []);

  const hasError = errorInfo.count > 0;
  const describedBy = idList(
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  );

  const value = useMemo<DateInputContextValue>(
    () => ({
      baseId,
      name,
      autoComplete,
      descriptionId,
      errorId,
      errorPrefix,
      hasError,
      errorParts: errorInfo.parts,
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
      hasError,
      errorInfo.parts,
      registerDescription,
      registerError,
    ],
  );

  return (
    <DateInputContext value={value}>
      <Fieldset.Root
        ref={ref}
        id={id}
        className={cx("loam-DateInput", className)}
        labels={labels}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </Fieldset.Root>
    </DateInputContext>
  );
}

export interface DateInputDescriptionProps extends PartProps<"p"> {}

function DateInputDescription({ className, children, ref, ...rest }: DateInputDescriptionProps) {
  const ctx = useDateInputContext("DateInput.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p ref={ref} id={ctx.descriptionId} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface DateInputErrorProps extends PartProps<"p"> {
  /**
   * Which fields the error applies to. Defaults to all of them — narrow it
   * when the error names a specific part ("must include a year").
   */
  parts?: DateInputPart[];
}

function DateInputError({ parts, className, children, ref, ...rest }: DateInputErrorProps) {
  const ctx = useDateInputContext("DateInput.Error");
  const { registerError } = ctx;
  const hasContent = children != null && children !== false;
  const partsKey = parts?.join(",") ?? "";
  useEffect(() => {
    if (!hasContent) return;
    return registerError(partsKey ? (partsKey.split(",") as DateInputPart[]) : null);
  }, [hasContent, partsKey, registerError]);

  if (!hasContent) return null;
  return (
    <p ref={ref} id={ctx.errorId} role="alert" className={cx("error", className)} {...rest}>
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
    const invalid = ctx.hasError && (ctx.errorParts?.includes(part) ?? true);
    return (
      <Field.Root id={inputId}>
        <Field.Label>{children ?? PART_LABELS[part]}</Field.Label>
        <Input
          {...PARTS[part]}
          name={ctx.name ? `${ctx.name}-${part}` : undefined}
          autoComplete={ctx.autoComplete === "bday" ? `bday-${part}` : undefined}
          aria-invalid={invalid || undefined}
          {...rest}
        />
      </Field.Root>
    );
  }
  DateInputPartField.displayName = displayName;
  return DateInputPartField;
}

export const DateInput = {
  Root: DateInputRoot,
  /** Names the group: core `Fieldset.Legend`, which reads `labels.optional`. */
  Legend: Fieldset.Legend,
  Description: DateInputDescription,
  Error: DateInputError,
  Fields: DateInputFields,
  Day: createPart("day", "DateInput.Day"),
  Month: createPart("month", "DateInput.Month"),
  Year: createPart("year", "DateInput.Year"),
};
