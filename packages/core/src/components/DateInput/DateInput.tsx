"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type {
  FieldsetHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import { cx } from "../../utils";
import { Fieldset } from "../Fieldset/Fieldset";
import { Input } from "../Input/Input";

/**
 * Composable parts for asking for a memorable date.
 *
 * A date the user already knows — a date of birth, the date on a document —
 * is typed, not picked: a calendar widget makes them navigate to a value
 * they could have entered in three keystrokes. Each Field is a separate
 * labelled text input inside a `<fieldset>` named by the Legend, sized to
 * its answer, raising a numeric keypad on touch devices. Render only the
 * Fields you need — a month and year, say — and the wiring adapts.
 *
 * For choosing a date from availability (bookings, appointments), a
 * calendar is the right tool — this component is not it.
 *
 * ```tsx
 * <DateInput.Root name="date-of-birth" autoComplete="bday">
 *   <DateInput.Legend>Date of birth</DateInput.Legend>
 *   <DateInput.Description>For example, 27 3 2007</DateInput.Description>
 *   <DateInput.Fields>
 *     <DateInput.Field part="day" />
 *     <DateInput.Field part="month" />
 *     <DateInput.Field part="year" />
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

interface DateInputContextValue {
  baseId: string;
  name: string | undefined;
  autoComplete: "bday" | undefined;
  descriptionId: string;
  errorId: string;
  hasError: boolean;
  /** Parts the registered error applies to; null means all of them. */
  errorParts: DateInputPart[] | null;
  registerDescription: () => () => void;
  registerError: (parts: DateInputPart[] | null) => () => void;
}

const DateInputContext = createContext<DateInputContextValue | null>(null);

function useDateInputContext(part: string): DateInputContextValue {
  const ctx = useContext(DateInputContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <DateInput.Root>.`);
  }
  return ctx;
}

export interface DateInputRootProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "name"
> {
  /** Name prefix for form submission: `{name}-day`, `{name}-month`, `{name}-year`. */
  name?: string;
  /** Wire browser autofill when asking for a date of birth (WCAG 1.3.5). */
  autoComplete?: "bday";
}

function DateInputRoot({
  name,
  autoComplete,
  id,
  className,
  children,
  ...rest
}: DateInputRootProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [errorInfo, setErrorInfo] = useState<{
    count: number;
    parts: DateInputPart[] | null;
  }>({ count: 0, parts: null });

  const registerDescription = useCallback(() => {
    setDescriptionCount((n) => n + 1);
    return () => setDescriptionCount((n) => n - 1);
  }, []);
  const registerError = useCallback((parts: DateInputPart[] | null) => {
    setErrorInfo((s) => ({ count: s.count + 1, parts }));
    return () =>
      setErrorInfo((s) => ({
        count: s.count - 1,
        parts: s.count > 1 ? s.parts : null,
      }));
  }, []);

  const hasError = errorInfo.count > 0;
  const describedBy =
    cx(descriptionCount > 0 ? descriptionId : undefined, hasError ? errorId : undefined) ||
    undefined;

  const value = useMemo<DateInputContextValue>(
    () => ({
      baseId,
      name,
      autoComplete,
      descriptionId,
      errorId,
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
      hasError,
      errorInfo.parts,
      registerDescription,
      registerError,
    ],
  );

  return (
    <DateInputContext value={value}>
      <Fieldset.Root
        id={id}
        className={cx("loam-DateInput", className)}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </Fieldset.Root>
    </DateInputContext>
  );
}

export interface DateInputDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

function DateInputDescription({ className, children, ...rest }: DateInputDescriptionProps) {
  const ctx = useDateInputContext("DateInput.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p id={ctx.descriptionId} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export interface DateInputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Which fields the error applies to. Defaults to all of them — narrow it
   * when the error names a specific part ("must include a year").
   */
  parts?: DateInputPart[];
}

function DateInputError({ parts, className, children, ...rest }: DateInputErrorProps) {
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
    <p id={ctx.errorId} role="alert" className={cx("error", className)} {...rest}>
      <span className="loam-Error-prefix">Error: </span>
      {children}
    </p>
  );
}

export interface DateInputFieldsProps extends HTMLAttributes<HTMLDivElement> {}

function DateInputFields({ className, children, ...rest }: DateInputFieldsProps) {
  return (
    <div className={cx("parts", className)} {...rest}>
      {children}
    </div>
  );
}

export interface DateInputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children"
> {
  /** Which date part this field asks for. */
  part: DateInputPart;
  /** Visible field label. @default "Day" / "Month" / "Year" */
  children?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

function DateInputField({ part, children, id, ref, ...rest }: DateInputFieldProps) {
  const ctx = useDateInputContext("DateInput.Field");
  const inputId = id ?? `${ctx.baseId}-${part}`;
  const invalid = ctx.hasError && (ctx.errorParts?.includes(part) ?? true);
  return (
    <div data-part={part}>
      <label htmlFor={inputId}>{children ?? PART_LABELS[part]}</label>
      <Input
        ref={ref}
        // Day and year are numbers; the month accepts names ("jan",
        // "january") as well as digits, so it keeps the full keyboard.
        inputMode={part === "month" ? undefined : "numeric"}
        name={ctx.name ? `${ctx.name}-${part}` : undefined}
        autoComplete={ctx.autoComplete === "bday" ? `bday-${part}` : undefined}
        aria-invalid={invalid || undefined}
        {...rest}
        id={inputId}
      />
    </div>
  );
}

export const DateInput = {
  Root: DateInputRoot,
  Legend: Fieldset.Legend,
  Description: DateInputDescription,
  Error: DateInputError,
  Fields: DateInputFields,
  Field: DateInputField,
};
