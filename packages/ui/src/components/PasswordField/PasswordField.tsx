"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, ReactNode, Ref } from "react";
import { Field, Meter, PasswordInput, cx, useFieldControlProps } from "@loamui/core";
import type { PartProps, PasswordInputProps } from "@loamui/core";
import { useOptionalSlot } from "../../naming";

/**
 * Every word the composition says on its own, each with an English
 * default, so a page in another language passes its own.
 */
export interface PasswordFieldLabels {
  /**
   * The toggle's name, passed to core `PasswordInput`. Constant: the
   * Button reports whether the password is shown with `aria-pressed`, and
   * a name that swapped as well would say it twice.
   * @default "Show password"
   */
  show?: string;
  /** The Meter's accessible name. @default "Password strength" */
  meter?: string;
  /**
   * The word for a strength level, 0 (nothing typed) to 4 (strong),
   * written beside the Meter and read as its `aria-valuetext`. An empty
   * string writes nothing beside the Meter; the default says nothing at 0.
   * @default 0 "", 1 "Weak", 2 "Fair", 3–4 "Strong"
   */
  strength?: (level: number) => string;
  /**
   * The Meter's `aria-valuetext` while `strength` gives no word, at 0
   * with the default. @default "Nothing typed yet"
   */
  empty?: string;
  /** The hidden word after a rule the typing meets. @default "met" */
  met?: string;
  /** The hidden words after a rule the typing does not meet yet. @default "not met" */
  notMet?: string;
}

// The band edges sit between whole scores, so a score never lands on an
// edge, where browsers disagree about which side it falls.
const LOW = 1.5;
const HIGH = 2.5;

function defaultStrength(level: number): string {
  if (level < 0.5) return "";
  if (level < LOW) return "Weak";
  if (level < HIGH) return "Fair";
  return "Strong";
}

const DEFAULT_LABELS: Required<PasswordFieldLabels> = {
  show: "Show password",
  meter: "Password strength",
  strength: defaultStrength,
  empty: "Nothing typed yet",
  met: "met",
  notMet: "not met",
};

interface PasswordFieldState {
  /** What is typed so far. Held only to score and test it; it goes nowhere. */
  value: string;
  setValue: (value: string) => void;
  labels: Required<PasswordFieldLabels>;
  /** The Rules list's id, referenced by the input while the list is rendered. */
  rules: ReturnType<typeof useOptionalSlot>;
}

const PasswordFieldContext = createContext<PasswordFieldState | null>(null);

function usePasswordField(part: string): PasswordFieldState {
  const state = useContext(PasswordFieldContext);
  if (!state) {
    throw new Error(`${part} must be rendered inside <PasswordField.Root>.`);
  }
  return state;
}

export interface PasswordFieldRootProps extends PartProps<"div"> {
  /** Base id for the control; auto-generated when omitted. */
  id?: string;
  /** The composition's own words, each with an English default. */
  labels?: PasswordFieldLabels;
  children?: ReactNode;
}

/**
 * A field for making up a password: core `PasswordInput`, a strength
 * Meter and a list of rules in plain words, each ticked as the typing
 * meets it.
 *
 * The wiring is core `Field`'s: the Label is the input's real `<label>`,
 * the Description and Error are joined to it with `aria-describedby`, and
 * an Error sets `aria-invalid`. The Rules list is joined the same way, so
 * a screen reader hears the rules when it lands on the box. Nothing here
 * blocks a submit. The rules are guidance while typing and the strength
 * is a reading, not a verdict; the server decides what it accepts, and
 * the consumer says so in a `Field.Error` in the words of the rule that
 * was broken.
 *
 * ```tsx
 * <PasswordField.Root>
 *   <PasswordField.Label>Password</PasswordField.Label>
 *   <PasswordField.Description>
 *     At least 12 characters. A few unrelated words are easier to remember than one word with numbers in it.
 *   </PasswordField.Description>
 *   <PasswordField.Input name="password" />
 *   <PasswordField.Strength />
 *   <PasswordField.Rules>
 *     <PasswordField.Rule test={(value) => value.length >= 12}>At least 12 characters</PasswordField.Rule>
 *     <PasswordField.Rule test={(value) => /\s/.test(value) || value.length >= 20}>More than one word, or 20 characters</PasswordField.Rule>
 *   </PasswordField.Rules>
 * </PasswordField.Root>
 * ```
 */
function PasswordFieldRoot({
  id,
  labels,
  className,
  children,
  ref,
  ...rest
}: PasswordFieldRootProps) {
  const [value, setValue] = useState("");
  const rules = useOptionalSlot();
  const state = useMemo<PasswordFieldState>(
    () => ({ value, setValue, labels: { ...DEFAULT_LABELS, ...labels }, rules }),
    [value, labels, rules],
  );
  // Field.Root provides the context the label, description and error wire
  // through; the composition's own element sits inside it so those parts
  // are its direct grid children, and Field's own styles stop at the
  // loam- fence.
  return (
    <Field.Root id={id}>
      <PasswordFieldContext value={state}>
        <div ref={ref} className={cx("loam-PasswordField", className)} {...rest}>
          {children}
        </div>
      </PasswordFieldContext>
    </Field.Root>
  );
}

export interface PasswordFieldInputProps extends Omit<PasswordInputProps, "labels"> {
  /**
   * The autofill purpose. "new-password" tells a browser or password
   * manager this is a password to make up and save, not one to look up.
   * @default "new-password"
   */
  autoComplete?: string;
}

/**
 * Core `PasswordInput`, untouched: the box and its "Show password" toggle,
 * with the toggle's words read from the Root's `labels.show`. The Field
 * wires its label, description and error; this part adds the Rules list
 * to `aria-describedby` while one is rendered, and reads what is typed so
 * the Strength and Rules can answer it. `className`, `style`, `ref` and
 * every other prop land on the `<input>`; `wrapperProps` reach the row.
 */
function PasswordFieldInput({
  autoComplete = "new-password",
  onChange,
  ref,
  "aria-describedby": ariaDescribedby,
  ...rest
}: PasswordFieldInputProps) {
  const { setValue, labels, rules } = usePasswordField("PasswordField.Input");
  const field = useFieldControlProps();
  const inputRef = useRef<HTMLInputElement>(null);

  // The browser can fill the box without an input event: a defaultValue,
  // a form restored on back navigation. Read what it holds once mounted so
  // the meter and rules describe the value the visitor can see.
  useEffect(() => {
    const input = inputRef.current;
    if (input?.value) setValue(input.value);
  }, [setValue]);

  // The Field's own wiring, then the Rules: the input reads the Field's
  // description only when nothing is passed, so the two are joined here.
  const describedBy = cx(ariaDescribedby ?? field["aria-describedby"], rules.ref) || undefined;

  return (
    <PasswordInput
      autoComplete={autoComplete}
      labels={{ show: labels.show }}
      aria-describedby={describedBy}
      {...rest}
      ref={composeRefs(ref, inputRef)}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        setValue(event.currentTarget.value);
      }}
    />
  );
}

/** Both refs receive the input: the consumer's and the one that reads a filled value. */
function composeRefs<T>(a: Ref<T> | undefined, b: Ref<T>): Ref<T> {
  if (!a) return b;
  return (node: T | null) => {
    for (const ref of [a, b]) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

/**
 * The placeholder score: a whole number 0–4 from the length alone. Length
 * is the one thing every guideline agrees on, and this counts characters
 * and nothing else: "aaaaaaaaaaaaaaaa" scores 4. Pass a real estimator as
 * `strength` for a reading that knows about dictionaries and patterns.
 */
export function lengthStrength(value: string): number {
  const length = value.length;
  if (length === 0) return 0;
  if (length < 8) return 1;
  if (length < 12) return 2;
  if (length < 16) return 3;
  return 4;
}

export interface PasswordFieldStrengthProps extends PartProps<"div"> {
  /**
   * Scores the value from 0 (nothing) to 4 (strong). The default counts
   * length only; see {@link lengthStrength}.
   * @default lengthStrength
   */
  strength?: (value: string) => number;
}

/**
 * A core Meter of the score with its level written beside it in a word:
 * Weak, Fair or Strong, and nothing while nothing is typed, because an
 * empty box is not a weak password. The word is the meter's
 * `aria-valuetext`, so a screen reader hears "Password strength, Fair"
 * rather than a percentage, and it is a polite live region, so the change
 * is announced once the typing pauses, at most three times, never per
 * keystroke.
 */
function PasswordFieldStrength({
  strength = lengthStrength,
  className,
  ref,
  ...rest
}: PasswordFieldStrengthProps) {
  const { value, labels } = usePasswordField("PasswordField.Strength");
  const score = Math.min(4, Math.max(0, Math.round(strength(value))));
  const word = labels.strength(score);
  return (
    <div ref={ref} className={cx("strength", className)} {...rest}>
      <Meter
        value={score}
        min={0}
        max={4}
        low={LOW}
        high={HIGH}
        optimum={4}
        label={labels.meter}
        aria-valuetext={word || labels.empty}
      />
      <span className="word" aria-live="polite">
        {word}
      </span>
    </div>
  );
}

export interface PasswordFieldRulesProps extends PartProps<"ul"> {
  children?: ReactNode;
}

/**
 * The list of rules: a plain `ul`, no roles, joined to the input with
 * `aria-describedby` while it is rendered, so a screen reader hears the
 * rules on landing in the box. Not a live region: a list that
 * re-announced on every keystroke would drown the typing. Each item
 * carries its state in hidden words a screen reader meets when it reads
 * the list.
 */
function PasswordFieldRules({ id, className, children, ref, ...rest }: PasswordFieldRulesProps) {
  const { rules } = usePasswordField("PasswordField.Rules");
  const { register } = rules;
  useEffect(() => register(), [register]);
  return (
    <ul ref={ref} id={id ?? rules.id} className={cx("rules", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface PasswordFieldRuleProps extends PartProps<"li"> {
  /** Whether the value meets this rule. */
  test: (value: string) => boolean;
  /** The rule as a sentence: "At least 12 characters". */
  children?: ReactNode;
}

/**
 * One rule, written as a sentence, with a tick once the typing meets it.
 * The state is on the item as `data-met`, which the mark and the colour
 * answer, and in words ("met", "not met") visually hidden after the
 * sentence, so it is never colour alone.
 */
function PasswordFieldRule({ test, className, children, ref, ...rest }: PasswordFieldRuleProps) {
  const { value, labels } = usePasswordField("PasswordField.Rule");
  const met = test(value);
  return (
    <li ref={ref} className={cx("rule", className)} data-met={met || undefined} {...rest}>
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        {met ? (
          <path
            d="M3 8.5 6.5 12 13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        )}
      </svg>
      <span>{children}</span>
      <span className="loam-VisuallyHidden">, {met ? labels.met : labels.notMet}</span>
    </li>
  );
}

export const PasswordField = {
  Root: PasswordFieldRoot,
  /** The input's `<label>`: core `Field.Label`, wired by the Root. */
  Label: Field.Label,
  /** The words before the box, joined to it with `aria-describedby`: core `Field.Description`. */
  Description: Field.Description,
  Input: PasswordFieldInput,
  Strength: PasswordFieldStrength,
  Rules: PasswordFieldRules,
  Rule: PasswordFieldRule,
  /** The message after a failed submit, in the words of the rule: core `Field.Error`. */
  Error: Field.Error,
};
