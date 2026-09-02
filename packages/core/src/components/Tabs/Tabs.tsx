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
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { composeRefs } from "../../render";

interface TabsContextValue {
  value: string | null;
  setValue: (value: string) => void;
  isControlled: boolean;
  /** Stable id prefix so tab/panel aria wiring links up. */
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Tabs>.`);
  }
  return ctx;
}

interface TabsCommonProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Called with the new value when the active tab changes. */
  onChange?: (value: string) => void;
  children?: ReactNode;
}

/** Tabs must start with one selected value, controlled or uncontrolled. */
export type TabsProps = TabsCommonProps &
  (
    | {
        /** Controlled active tab value. */
        value: string;
        defaultValue?: never;
      }
    | {
        /** Value of the tab active by default (uncontrolled). */
        defaultValue: string;
        value?: never;
      }
  );

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabsTabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Unique value linking this tab to its panel. */
  value: string;
  children?: ReactNode;
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Value of the tab this panel belongs to. */
  value: string;
  children?: ReactNode;
}

/**
 * Switch between related panels of content.
 *
 * Supports uncontrolled (`defaultValue`) and controlled (`value`/`onChange`)
 * usage. Compose with `Tabs.List`, `Tabs.Tab` and `Tabs.Panel`.
 */
function TabsBase({
  defaultValue,
  value: controlled,
  onChange,
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue ?? null);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const ctx = useMemo<TabsContextValue>(
    () => ({ value, setValue, isControlled, baseId }),
    [value, setValue, isControlled, baseId],
  );

  return (
    <TabsContext value={ctx}>
      <div className={cx("loam-Tabs", className)} {...rest}>
        {children}
      </div>
    </TabsContext>
  );
}

/** The row of tab controls. */
export function TabsList({ className, children, ...rest }: TabsListProps) {
  const { value, setValue, isControlled } = useTabsContext("Tabs.List");
  const listRef = useRef<HTMLDivElement>(null);

  // The type requires an initial selection. This runtime fallback also keeps
  // plain JavaScript and stale values accessible by selecting the first
  // enabled tab instead of leaving every panel hidden.
  useEffect(() => {
    if (isControlled) return;
    const list = listRef.current;
    if (
      !list ||
      list.querySelector('[role="tab"][aria-selected="true"]:not([aria-disabled="true"])')
    )
      return;
    const first = list.querySelector<HTMLButtonElement>('[role="tab"]:not([aria-disabled="true"])');
    const fallback = first?.dataset.tabValue;
    if (fallback) setValue(fallback);
  }, [isControlled, setValue, value]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([aria-disabled="true"])',
      ) ?? [],
    );
    if (tabs.length === 0) return;

    const list = listRef.current!;
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex = current;
    const direction = getComputedStyle(list).direction || list.closest<HTMLElement>("[dir]")?.dir;
    const rtl = direction === "rtl";

    switch (event.key) {
      case "ArrowRight":
        nextIndex =
          current < 0
            ? 0
            : rtl
              ? (current - 1 + tabs.length) % tabs.length
              : (current + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex =
          current < 0
            ? tabs.length - 1
            : rtl
              ? (current + 1) % tabs.length
              : (current - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
    }

    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  };

  return (
    // interactive-supports-focus is off for this file (.oxlintrc):
    // focus roves between the tabs; the list itself is never a stop
    <div
      {...rest}
      ref={listRef}
      role="tablist"
      className={cx("loam-Tabs-list", className)}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}

/** A single tab control. */
export function TabsTab({ value, disabled, className, children, onClick, ...rest }: TabsTabProps) {
  const { value: active, setValue, baseId } = useTabsContext("Tabs.Tab");
  const selected = active === value;

  return (
    <button
      {...rest}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      // aria-disabled, not native disabled: the tab stays in the a11y tree
      // (announced as disabled) but is skipped by roving focus and can't be
      // activated — the same pattern as Menu items.
      aria-disabled={disabled || undefined}
      data-tab-value={value}
      className={cx("tab", className)}
      data-active={selected || undefined}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        setValue(value);
      }}
    >
      {children}
    </button>
  );
}

/** The panel shown for its matching tab. */
export function TabsPanel({ value, className, children, ref: refProp, ...rest }: TabsPanelProps) {
  const { value: active, setValue, baseId } = useTabsContext("Tabs.Panel");
  const selected = active === value;
  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);

  // hidden="until-found" lets find-in-page reach inactive panels;
  // `beforematch` activates the matched tab. React normalises `hidden` to a
  // boolean, so the attribute value must be set imperatively.
  const untilFound = typeof HTMLElement !== "undefined" && "onbeforematch" in HTMLElement.prototype;
  useEffect(() => {
    const el = ref.current;
    if (!el || !untilFound) return;
    if (selected) el.removeAttribute("hidden");
    else el.setAttribute("hidden", "until-found");
  }, [selected, untilFound]);
  useEffect(() => {
    const el = ref.current;
    if (!el || !untilFound) return;
    const onBeforeMatch = () => setValue(value);
    el.addEventListener("beforematch", onBeforeMatch);
    return () => el.removeEventListener("beforematch", onBeforeMatch);
  }, [untilFound, setValue, value]);

  return (
    <div
      {...rest}
      ref={composedRef}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={untilFound ? undefined : !selected}
      tabIndex={0}
      className={cx("panel", className)}
    >
      {children}
    </div>
  );
}

export const Tabs = Object.assign(TabsBase, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
