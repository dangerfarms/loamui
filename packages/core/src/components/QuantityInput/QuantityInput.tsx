"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, InputHTMLAttributes, Ref } from "react";
import { Button } from "../Button/Button";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";
import { composeRefs } from "../../render";
import { cx } from "../../utils";

export interface QuantityInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "children" | "min" | "max" | "step"
> {
  /** The smallest count allowed; "Fewer" disables here. @default 0 */
  min?: number;
  /** The largest count allowed; "More" disables here. */
  max?: number;
  /** How much one press changes the count. @default 1 */
  step?: number;
  /** Accessible name of the decrement button. @default "Fewer" */
  fewerLabel?: string;
  /** Accessible name of the increment button. @default "More" */
  moreLabel?: string;
  /** Class for the row that holds the buttons (className goes to the input itself). */
  wrapperClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

/** Which bounds a value sits on. An empty or unparsable value sits on neither. */
function edges(value: unknown, min: number, max: number | undefined) {
  const n = typeof value === "number" ? value : value == null || value === "" ? NaN : Number(value);
  return { atMin: n <= min, atMax: max !== undefined && n >= max };
}

function Glyph({ plus }: { plus?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {plus && <path d="M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

/**
 * A count a person adjusts by one: items in a cart, guests, seats.
 *
 * A native `<input type="number">` is the value of record, flanked by two
 * {@link Button}s that step it. The buttons call the input's own
 * `stepDown()` / `stepUp()` and fire a native `input` event, so React's
 * `onChange`, a surrounding form and constraint validation all see one
 * value, in the input, with nothing mirrored here. They disable at `min`
 * and `max`; a typed value outside the bounds is left for the field to
 * report, as any Input would.
 *
 * Label it by composing {@link Field} — the control reads its id,
 * description and error wiring from the surrounding `Field.Root`. Outside
 * a Field give it an `aria-label`.
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Quantity</Field.Label>
 *   <QuantityInput name="quantity" defaultValue={1} min={1} max={10} />
 * </Field.Root>
 * ```
 */
export function QuantityInput({
  min = 0,
  max,
  step = 1,
  fewerLabel = "Fewer",
  moreLabel = "More",
  value,
  defaultValue,
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
}: QuantityInputProps) {
  const field = useFieldControlProps();
  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLInputElement>();
  const ownRef = useRef<HTMLInputElement>(null);
  const inputRef = useMemo(
    () => composeRefs(composeRefs(ref, validationRef), ownRef),
    [ref, validationRef],
  );

  // The value lives only in the input. The one thing a render needs to know
  // is whether it sits on a bound, so the buttons can disable — read from
  // the value prop when controlled, otherwise noted from the input's own
  // events. A form reset restores the default value without an input event,
  // so it is observed too.
  const [uncontrolledEdges, setUncontrolledEdges] = useState(() => edges(defaultValue, min, max));
  const controlled = value !== undefined;
  const { atMin, atMax } = controlled ? edges(value, min, max) : uncontrolledEdges;

  useEffect(() => {
    const form = ownRef.current?.form;
    if (!form || controlled) return;
    const onReset = () => {
      const input = ownRef.current;
      if (input) setUncontrolledEdges(edges(input.defaultValue, min, max));
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [controlled, min, max]);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    onInput?.(e);
    checkOnInput(e);
    if (!controlled) setUncontrolledEdges(edges(e.currentTarget.value, min, max));
  };

  const stepBy = (direction: -1 | 1) => {
    const input = ownRef.current;
    if (!input) return;
    if (direction < 0) input.stepDown();
    else input.stepUp();
    // stepUp/stepDown change the value silently. The browser fires input and
    // change for its own spinner, so do the same: React's onChange, native
    // listeners and the form all hear one change.
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return (
    <div className={cx("loam-QuantityInput", wrapperClassName)} style={style}>
      <Button
        type="button"
        aria-label={fewerLabel}
        disabled={disabled || atMin}
        onClick={() => stepBy(-1)}
      >
        <Glyph />
      </Button>
      <input
        ref={inputRef}
        type="number"
        inputMode="numeric"
        className={className}
        disabled={disabled}
        id={id ?? field.id}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        {...rest}
        aria-invalid={ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined)}
        aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
        onInput={handleInput}
        onInvalid={(e) => {
          onInvalid?.(e);
          checkOnInvalid(e);
        }}
      />
      <Button
        type="button"
        aria-label={moreLabel}
        disabled={disabled || atMax}
        onClick={() => stepBy(1)}
      >
        <Glyph plus />
      </Button>
    </div>
  );
}
