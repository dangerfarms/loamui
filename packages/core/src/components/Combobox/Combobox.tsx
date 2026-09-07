"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
  RefObject,
} from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { cssSafeId } from "../../anchor";
import { composeRefs, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { Input } from "../Input/Input";
import type { InputProps } from "../Input/Input";

/**
 * A text box with a list of suggestions under it, composed from parts: the
 * APG editable combobox with a listbox popup.
 *
 * The Input is the library's Input wearing `role="combobox"`, so it reads
 * its label, description and error from a surrounding `Field.Root` like any
 * control. Which options appear is the consumer's decision: render the
 * Options that match the text (`inputValue`) and the component manages the
 * highlight, the selection, the open state and the announcements.
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Country</Field.Label>
 *   <Combobox.Root inputValue={query} onInputValueChange={setQuery}>
 *     <Combobox.Input />
 *     <Combobox.List>
 *       {matches.map((c) => (
 *         <Combobox.Option key={c} value={c}>{c}</Combobox.Option>
 *       ))}
 *       <Combobox.Empty />
 *     </Combobox.List>
 *   </Combobox.Root>
 * </Field.Root>
 * ```
 */

export interface ComboboxLabels {
  /** The live status read when the list changes. @default "n results available" */
  status?: (count: number) => string;
  /** What Combobox.Empty says. @default "No results" */
  empty?: string;
  /** The Trigger's accessible name. @default "Show options" */
  toggle?: string;
}

interface ComboboxContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
  value: string | null;
  inputValue: string;
  /** The user edited the text: value is no longer an option, until one is chosen. */
  type: (text: string) => void;
  commit: (value: string, label: string) => void;
  clear: () => void;
  /** Adopt a selected option's label as the text when nothing has been typed yet. */
  adoptLabel: (label: string) => void;
  highlightedId: string | null;
  highlight: (id: string | null) => void;
  releaseHighlight: (id: string) => void;
  moveHighlight: (to: "next" | "previous" | "first" | "last") => void;
  registerOption: () => () => void;
  count: number;
  listId: string;
  anchorName: string;
  inputRef: RefObject<HTMLInputElement | null>;
  listRef: RefObject<HTMLUListElement | null>;
  labels: Required<ComboboxLabels>;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useComboboxContext(part: string): ComboboxContextValue {
  const ctx = useContext(ComboboxContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Combobox.Root>.`);
  }
  return ctx;
}

function defaultStatus(count: number): string {
  return count === 1 ? "1 result available" : `${count} results available`;
}

const NO_LABELS: ComboboxLabels = {};

/** Controlled-or-uncontrolled state: the prop owns it when defined. */
function useControllable<T>(
  prop: T | undefined,
  fallback: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const [own, setOwn] = useState(fallback);
  const value = prop === undefined ? own : prop;
  const valueRef = useRef(value);
  valueRef.current = value;
  const controlledRef = useRef(false);
  controlledRef.current = prop !== undefined;
  const set = useCallback(
    (next: T) => {
      if (Object.is(next, valueRef.current)) return;
      if (!controlledRef.current) setOwn(next);
      onChange?.(next);
    },
    [onChange],
  );
  return [value, set];
}

/** The selectable options in DOM order; disabled ones are skipped. */
function enabledOptions(list: HTMLElement | null): HTMLElement[] {
  if (!list) return [];
  return Array.from(
    list.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])'),
  );
}

export interface ComboboxRootProps extends Omit<PartProps<"div">, "defaultValue"> {
  /** Controlled committed value: the chosen option's `value`, or null. */
  value?: string | null;
  /** Initial committed value when uncontrolled. */
  defaultValue?: string | null;
  /** Called when an option is chosen (its value) or the choice is cleared (null). */
  onValueChange?: (value: string | null) => void;
  /** Controlled text in the box. */
  inputValue?: string;
  /** Initial text when uncontrolled. */
  defaultInputValue?: string;
  /** Called whenever the text should change: typing, choosing, clearing. */
  onInputValueChange?: (inputValue: string) => void;
  /** Controlled open state of the list. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** Submit the committed value under this name, as a hidden input. */
  name?: string;
  /** The default strings, each overridable. */
  labels?: ComboboxLabels;
}

function ComboboxRoot({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  inputValue: inputValueProp,
  defaultInputValue = "",
  onInputValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  labels: { status = defaultStatus, empty = "No results", toggle = "Show options" } = NO_LABELS,
  className,
  children,
  onBlur,
  ...rest
}: ComboboxRootProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const [inputValue, setInputValue] = useControllable(
    inputValueProp,
    defaultInputValue,
    onInputValueChange,
  );
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const autoId = useId();
  const listId = `${cssSafeId(autoId)}-listbox`;
  const anchorName = `--loam-anchor-${listId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const touchedRef = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    setHighlightedId(null);
  }, [setOpen]);

  const type = useCallback(
    (text: string) => {
      touchedRef.current = true;
      setInputValue(text);
      setValue(null);
      setHighlightedId(null);
      setOpen(true);
    },
    [setInputValue, setValue, setOpen],
  );

  const commit = useCallback(
    (next: string, label: string) => {
      touchedRef.current = true;
      setValue(next);
      setInputValue(label);
      close();
    },
    [setValue, setInputValue, close],
  );

  const clear = useCallback(() => {
    touchedRef.current = true;
    setValue(null);
    setInputValue("");
    setHighlightedId(null);
  }, [setValue, setInputValue]);

  const inputValueRef = useRef(inputValue);
  inputValueRef.current = inputValue;
  const adoptLabel = useCallback(
    (label: string) => {
      if (touchedRef.current || inputValueRef.current !== "") return;
      setInputValue(label);
    },
    [setInputValue],
  );

  const releaseHighlight = useCallback((id: string) => {
    setHighlightedId((current) => (current === id ? null : current));
  }, []);

  const highlightedRef = useRef(highlightedId);
  highlightedRef.current = highlightedId;
  const moveHighlight = useCallback((to: "next" | "previous" | "first" | "last") => {
    const options = enabledOptions(listRef.current);
    if (options.length === 0) return;
    const current = options.findIndex((o) => o.id === highlightedRef.current);
    const last = options.length - 1;
    let index: number;
    switch (to) {
      case "first":
        index = 0;
        break;
      case "last":
        index = last;
        break;
      case "next":
        index = current < 0 ? 0 : Math.min(current + 1, last);
        break;
      case "previous":
        index = current < 0 ? last : Math.max(current - 1, 0);
        break;
    }
    setHighlightedId(options[index]?.id ?? null);
  }, []);

  const registerOption = useCallback(() => {
    setCount((n) => n + 1);
    return () => setCount((n) => n - 1);
  }, []);

  // Keep the highlighted option in view; the list scrolls, the page does not.
  useEffect(() => {
    if (!open || !highlightedId) return;
    document.getElementById(highlightedId)?.scrollIntoView?.({ block: "nearest" });
  }, [open, highlightedId]);

  const labels = useMemo(() => ({ status, empty, toggle }), [status, empty, toggle]);

  const ctx = useMemo<ComboboxContextValue>(
    () => ({
      open,
      setOpen,
      close,
      value,
      inputValue,
      type,
      commit,
      clear,
      adoptLabel,
      highlightedId,
      highlight: setHighlightedId,
      releaseHighlight,
      moveHighlight,
      registerOption,
      count,
      listId,
      anchorName,
      inputRef,
      listRef,
      labels,
    }),
    [
      open,
      setOpen,
      close,
      value,
      inputValue,
      type,
      commit,
      clear,
      adoptLabel,
      highlightedId,
      releaseHighlight,
      moveHighlight,
      registerOption,
      count,
      listId,
      anchorName,
      labels,
    ],
  );

  return (
    <ComboboxContext value={ctx}>
      <div
        className={cx("loam-Combobox", className)}
        onBlur={(e: ReactFocusEvent<HTMLDivElement>) => {
          onBlur?.(e);
          // Focus left the whole control (the list is not focusable, so a
          // click on an option never gets here: it keeps focus in the box).
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
        }}
        {...rest}
      >
        {children}
        {name !== undefined && <input type="hidden" name={name} value={value ?? ""} />}
        <span role="status" className="loam-VisuallyHidden">
          {open ? labels.status(count) : ""}
        </span>
      </div>
    </ComboboxContext>
  );
}

export interface ComboboxInputProps extends Omit<InputProps, "value" | "defaultValue" | "type"> {}

/** The combobox wiring the Input part attaches to the library's Input. */
interface ComboboxInputWiring {
  ref: Ref<HTMLInputElement> | undefined;
  type: "text";
  role: "combobox";
  "aria-autocomplete": "list";
  "aria-expanded": boolean;
  "aria-controls": string;
  "aria-activedescendant": string | undefined;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: ReactMouseEvent<HTMLInputElement>) => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLInputElement>) => void;
}

/**
 * The text box: the library's Input as the combobox, with the list's
 * state and the highlighted option reflected in ARIA. `startSection`,
 * `endSection`, `wrapperProps`, `placeholder` and every native `<input>`
 * prop pass through; inside a `Field.Root` it is named and described by
 * the Field.
 */
function ComboboxInput({ ref, wrapperProps, ...rest }: ComboboxInputProps) {
  const ctx = useComboboxContext("Combobox.Input");
  const inputRef = useMemo(() => composeRefs(ref, ctx.inputRef), [ref, ctx.inputRef]);
  // The list is tethered to the box, which is the Input's wrapper, not
  // the <input> inside it.
  const wrapper: ComboboxInputProps["wrapperProps"] = {
    ...wrapperProps,
    style: { ...wrapperProps?.style, anchorName: ctx.anchorName } as CSSProperties,
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!ctx.open) ctx.setOpen(true);
        ctx.moveHighlight(ctx.open ? "next" : "first");
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!ctx.open) ctx.setOpen(true);
        ctx.moveHighlight(ctx.open ? "previous" : "last");
        break;
      case "Home":
      case "End":
        if (!ctx.open) return;
        e.preventDefault();
        ctx.moveHighlight(e.key === "Home" ? "first" : "last");
        break;
      case "Enter": {
        if (!ctx.open || !ctx.highlightedId) return;
        const option = document.getElementById(ctx.highlightedId);
        if (!option) return;
        e.preventDefault();
        ctx.commit(option.dataset.value ?? "", optionLabel(option));
        break;
      }
      case "Escape":
        // Once to close the list, once more to clear the box (APG).
        if (ctx.open) {
          e.preventDefault();
          ctx.close();
        } else if (ctx.inputValue !== "") {
          e.preventDefault();
          ctx.clear();
        }
        break;
      case "Tab":
        if (ctx.open) ctx.close();
        break;
    }
  };

  const wiring: ComboboxInputWiring = {
    ref: inputRef,
    type: "text",
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.listId,
    "aria-activedescendant": ctx.open ? (ctx.highlightedId ?? undefined) : undefined,
    value: ctx.inputValue,
    onChange: (e) => ctx.type(e.target.value),
    onClick: () => {
      if (!ctx.open) ctx.setOpen(true);
    },
    onKeyDown: handleKeyDown,
  };

  // The browser's own suggestions would sit on top of the list.
  return (
    <>{renderWithProps(<Input autoComplete="off" {...rest} wrapperProps={wrapper} />, wiring)}</>
  );
}

/** The text an option commits: its `label`, else what it says. */
function optionLabel(option: HTMLElement): string {
  return option.dataset.label ?? option.textContent?.trim() ?? "";
}

/** Wiring the Trigger attaches to whatever it renders. */
export interface ComboboxTriggerRenderProps {
  type: "button";
  /** Out of the Tab sequence: the box already reaches the list by keyboard. */
  tabIndex: -1;
  "aria-label": string;
  "aria-expanded": boolean;
  "aria-controls": string;
  /** Styling hook — present while the list is open. */
  "data-popup-open": "true" | undefined;
  onMouseDown: (e: ReactMouseEvent<Element>) => void;
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface ComboboxTriggerProps extends Omit<ButtonProps, "render"> {
  /**
   * Substitute your own element as the trigger, or pass a function receiving
   * the wiring props. Without it, the Trigger renders a LoamUI Button with
   * a chevron, named by `labels.toggle`.
   */
  render?: RenderProp<ComboboxTriggerRenderProps>;
}

/** A button that shows or hides the list, for pointer users. */
function ComboboxTrigger({ render, children, ...rest }: ComboboxTriggerProps) {
  const ctx = useComboboxContext("Combobox.Trigger");

  const triggerProps: ComboboxTriggerRenderProps = {
    type: "button",
    tabIndex: -1,
    "aria-label": ctx.labels.toggle,
    "aria-expanded": ctx.open,
    "aria-controls": ctx.listId,
    "data-popup-open": ctx.open ? "true" : undefined,
    // Keep focus in the box: a button that took it would blur the box and
    // close the list before the click could open it.
    onMouseDown: (e) => e.preventDefault(),
    onClick: () => {
      ctx.inputRef.current?.focus({ preventScroll: true });
      if (ctx.open) ctx.close();
      else ctx.setOpen(true);
    },
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>
      {renderWithProps(
        <Button {...rest}>
          {children ?? (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Button>,
        triggerProps,
      )}
    </>
  );
}

export interface ComboboxListProps extends PartProps<"ul"> {}

/** The listbox wiring the List part attaches to its `<ul>`. */
interface ComboboxListWiring {
  ref: Ref<HTMLUListElement> | undefined;
  id: string;
  role: "listbox";
  hidden: true | undefined;
  /** Styling hook — present while the list is open. */
  "data-open": true | undefined;
  style: CSSProperties;
  onMouseDown: (e: ReactMouseEvent<HTMLUListElement>) => void;
}

/** The listbox under the box. Its children are Options and, last, an Empty. */
function ComboboxList({ ref, ...rest }: ComboboxListProps) {
  const ctx = useComboboxContext("Combobox.List");
  const listRef = useMemo(() => composeRefs(ref, ctx.listRef), [ref, ctx.listRef]);
  const wiring: ComboboxListWiring = {
    ref: listRef,
    id: ctx.listId,
    role: "listbox",
    hidden: ctx.open ? undefined : true,
    "data-open": ctx.open || undefined,
    style: { positionAnchor: ctx.anchorName } as CSSProperties,
    // The box keeps focus through a click on the list.
    onMouseDown: (e) => e.preventDefault(),
  };
  return <>{renderWithProps(<ul {...rest} />, wiring)}</>;
}

/** Wiring an Option attaches to whatever it renders. */
export interface ComboboxOptionRenderProps {
  id: string;
  role: "option";
  "aria-selected": boolean;
  "aria-disabled": true | undefined;
  /** Styling hook — present on the option the keyboard or pointer is on. */
  "data-highlighted": "true" | undefined;
  "data-value": string;
  "data-label": string | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
  onMouseMove: (e: ReactMouseEvent<Element>) => void;
  children?: ReactNode;
  className?: string;
}

export interface ComboboxOptionProps extends Omit<PartProps<"li">, "value"> {
  /** What the choice submits and `onValueChange` receives. */
  value: string;
  /** The text the box shows once chosen. @default the option's text content */
  label?: string;
  /** Present but not choosable; skipped by the keyboard. */
  disabled?: boolean;
  /** Substitute your own element; it receives the wiring props. */
  render?: RenderProp<ComboboxOptionRenderProps>;
}

function ComboboxOption({
  value,
  label,
  disabled,
  render,
  className,
  children,
  ...rest
}: ComboboxOptionProps) {
  const ctx = useComboboxContext("Combobox.Option");
  const id = `${useId()}-option`;
  const selected = ctx.value !== null && ctx.value === value;
  const highlighted = ctx.highlightedId === id;

  const { registerOption, releaseHighlight, adoptLabel } = ctx;
  useEffect(() => {
    const unregister = registerOption();
    return () => {
      unregister();
      releaseHighlight(id);
    };
  }, [registerOption, releaseHighlight, id]);

  // A defaultValue names an option before its label is known; the option
  // supplies it once, unless the user has already typed.
  const textRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    const el = textRef.current;
    if (el) adoptLabel(optionLabel(el));
  }, [selected, adoptLabel]);

  const optionProps: ComboboxOptionRenderProps = {
    id,
    role: "option",
    "aria-selected": selected,
    "aria-disabled": disabled || undefined,
    "data-highlighted": highlighted ? "true" : undefined,
    "data-value": value,
    "data-label": label,
    onClick: (e) => {
      if (disabled) return;
      ctx.commit(value, optionLabel(e.currentTarget as HTMLElement));
    },
    onMouseMove: () => {
      if (!disabled && !highlighted) ctx.highlight(id);
    },
  };

  const wiring = { ...optionProps, ref: textRef };
  return (
    <>
      {render
        ? renderWithProps(render, mergeProps(wiring, { ...rest, children, className }))
        : renderWithProps(
            <li className={className} {...rest}>
              {children}
            </li>,
            wiring,
          )}
    </>
  );
}

export interface ComboboxEmptyProps extends PartProps<"li"> {}

/**
 * Shown in the list when it has no Options. Children default to
 * `labels.empty`. It is a sighted-user message: a listbox may hold only
 * options, so it is hidden from assistive technology, which hears the
 * count from the status region instead.
 */
function ComboboxEmpty({ className, children, ...rest }: ComboboxEmptyProps) {
  const ctx = useComboboxContext("Combobox.Empty");
  if (ctx.count > 0) return null;
  return (
    <li role="presentation" aria-hidden className={cx("empty", className)} {...rest}>
      {children ?? ctx.labels.empty}
    </li>
  );
}

export const Combobox = {
  Root: ComboboxRoot,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  List: ComboboxList,
  Option: ComboboxOption,
  Empty: ComboboxEmpty,
};
