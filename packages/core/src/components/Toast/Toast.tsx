"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { composeRefs, mergeProps, renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

import { Button } from "../Button/Button";

/**
 * Transient notifications, composed from parts.
 *
 * The Viewport renders with `popover="manual"`, so the browser provides the
 * top layer (above every dialog and popover, no z-index war) and nothing can
 * light-dismiss it. Announcements are native live-region semantics: each
 * toast is `role="status"` (polite) or `role="alert"` for
 * `priority: "high"`. Timers pause while the pointer or keyboard focus is
 * inside the viewport (WCAG 2.2.1), and F6 jumps focus into the viewport to
 * reach a toast's actions from anywhere.
 *
 * Fire toasts with the `useToast` hook; render them with the parts (or the
 * ready-made `<Toasts />` viewport):
 *
 * ```tsx
 * // once, near the app root
 * <Toast.Provider>
 *   <App />
 *   <Toasts />
 * </Toast.Provider>
 *
 * // anywhere below
 * const toast = useToast();
 * toast.add({ title: "Saved", description: "Your changes are live." });
 * ```
 *
 * Toasts are for confirmations and background events, never for errors the
 * user must fix (use Field errors or an Alert in place), and never as the
 * only record of something important.
 */

export interface ToastOptions {
  /** Short heading. */
  title?: ReactNode;
  /** The message body. */
  description?: ReactNode;
  /** Optional action rendered as a button, e.g. Undo. */
  action?: { label: ReactNode; onClick: () => void };
  /**
   * `"high"` announces assertively (`role="alert"`) and should be reserved
   * for urgent, time-sensitive messages. @default "normal"
   */
  priority?: "normal" | "high";
  /** Auto-dismiss delay in ms; 0 keeps the toast until dismissed. */
  timeout?: number;
  /** Stable id: adding again with the same id updates in place. */
  id?: string;
}

export interface ToastData extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toasts: ToastData[];
  /** Ids currently playing their exit transition. */
  exiting: ReadonlySet<string>;
  /** Show a toast (or update the one with the same id). Returns its id. */
  add: (options: ToastOptions) => string;
  /** Dismiss one toast by id, or all when omitted. */
  close: (id?: string) => void;
  /** Drop a toast from the list once its exit has played. */
  remove: (id: string) => void;
  /** The Roots currently mounted, by toast id: they play the exit. */
  mounted: Set<string>;
  /** Timers pause while the pointer/focus is inside the viewport. */
  pause: () => void;
  resume: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToastContext(part: string): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Toast.Provider>.`);
  }
  return ctx;
}

/** Fire and dismiss toasts from anywhere under a Toast.Provider. */
export function useToast(): Pick<ToastContextValue, "toasts" | "add" | "close"> {
  return useToastContext("useToast");
}

export interface ToastProviderProps {
  /** Default auto-dismiss delay in ms. @default 5000 */
  timeout?: number;
  /** Most toasts shown at once; the oldest closes first. @default 3 */
  limit?: number;
  children: ReactNode;
}

let toastCounter = 0;

function ToastProvider({ timeout = 5000, limit = 3, children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  // Mirror of `toasts` so `add` can compute the next list (and which toasts
  // get dropped) without side effects inside the state updater.
  const toastsRef = useRef<ToastData[]>([]);
  const [exiting, setExiting] = useState<ReadonlySet<string>>(new Set());
  // Per-toast countdown bookkeeping so pause/resume keeps the remaining time.
  const timers = useRef(
    new Map<
      string,
      {
        handle: ReturnType<typeof setTimeout> | null;
        remaining: number;
        startedAt: number;
      }
    >(),
  );
  const pausedRef = useRef(false);
  const mounted = useRef(new Set<string>());

  const clearTimer = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer?.handle) clearTimeout(timer.handle);
    timers.current.delete(id);
  }, []);

  const remove = useCallback(
    (id: string) => {
      toastsRef.current = toastsRef.current.filter((t) => t.id !== id);
      setToasts(toastsRef.current);
      setExiting((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      clearTimer(id);
    },
    [clearTimer],
  );

  // Two-phase close: mark the toast as exiting so its Root can play the
  // exit transition, then the Root removes it. A toast with no Root
  // rendered has nothing to animate and goes at once.
  const close = useCallback(
    (id?: string) => {
      const ids = id ? [id] : toastsRef.current.map((t) => t.id);
      for (const each of ids) {
        clearTimer(each);
        if (mounted.current.has(each)) setExiting((prev) => new Set(prev).add(each));
        else remove(each);
      }
    },
    [clearTimer, remove],
  );

  const schedule = useCallback(
    (id: string, remaining: number) => {
      const handle = pausedRef.current ? null : setTimeout(() => close(id), remaining);
      timers.current.set(id, { handle, remaining, startedAt: Date.now() });
    },
    [close],
  );

  const add = useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? `loam-toast-${++toastCounter}`;
      const data: ToastData = { priority: "normal", ...options, id };
      const prev = toastsRef.current;
      const appended = prev.some((t) => t.id === id)
        ? prev.map((t) => (t.id === id ? data : t))
        : [...prev, data];
      const dropIndex = Math.max(0, appended.length - limit);
      for (const dropped of appended.slice(0, dropIndex)) clearTimer(dropped.id);
      toastsRef.current = appended.slice(dropIndex);
      setToasts(toastsRef.current);
      const delay = options.timeout ?? timeout;
      clearTimer(id);
      if (delay > 0) schedule(id, delay);
      return id;
    },
    [limit, timeout, schedule, clearTimer],
  );

  const pause = useCallback(() => {
    if (pausedRef.current) return;
    pausedRef.current = true;
    for (const [id, t] of timers.current) {
      if (!t.handle) continue;
      clearTimeout(t.handle);
      timers.current.set(id, {
        handle: null,
        remaining: Math.max(0, t.remaining - (Date.now() - t.startedAt)),
        startedAt: Date.now(),
      });
    }
  }, []);

  const resume = useCallback(() => {
    if (!pausedRef.current) return;
    pausedRef.current = false;
    for (const [id, t] of timers.current) {
      schedule(id, t.remaining);
    }
  }, [schedule]);

  useEffect(() => {
    const map = timers.current;
    return () => {
      for (const t of map.values()) {
        if (t.handle) clearTimeout(t.handle);
      }
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, exiting, add, close, remove, mounted: mounted.current, pause, resume }),
    [toasts, exiting, add, close, remove, pause, resume],
  );

  return <ToastContext value={value}>{children}</ToastContext>;
}

export interface ToastViewportProps extends PartProps<"div"> {
  /** The words the region speaks: `region` names the landmark. */
  labels?: { region?: string };
}

function ToastViewport({ labels, className, children, ref: refProp, ...rest }: ToastViewportProps) {
  const ctx = useToastContext("Toast.Viewport");
  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(
    () => setEnhanced(typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype),
    [],
  );

  // The viewport stays in the top layer permanently so toasts inserted into
  // it are announced by their live-region roles: a hidden container would
  // swallow the first announcement.
  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    if (!el.matches(":popover-open")) el.showPopover();
  }, [enhanced]);

  // F6 jumps focus into the notifications region (and back out on Escape via
  // the browser's normal focus behaviour; the viewport never traps).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "F6" || ctx.toasts.length === 0) return;
      const el = ref.current;
      if (!el || el.contains(document.activeElement)) return;
      e.preventDefault();
      el.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ctx.toasts.length]);

  const regionLabel = labels?.region ?? "Notifications";

  return (
    <div
      aria-label={regionLabel}
      {...rest}
      ref={composedRef}
      role="region"
      tabIndex={-1}
      popover={enhanced ? "manual" : undefined}
      className={cx("loam-Toast-viewport", className)}
      data-empty={ctx.toasts.length === 0 || undefined}
      // no-noninteractive-element-interactions is off for this file
      // (.oxlintrc): hover/focus pause the timers (WCAG 2.2.1); the
      // region is never clickable
      onPointerEnter={ctx.pause}
      onPointerLeave={ctx.resume}
      onFocus={ctx.pause}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) ctx.resume();
      }}
    >
      {children}
    </div>
  );
}

/** The toast a Root renders, read by the parts inside it. */
const ToastItemContext = createContext<ToastData | null>(null);

function useToastItem(part: string): ToastData {
  const toast = useContext(ToastItemContext);
  if (!toast) {
    throw new Error(`${part} must be rendered inside <Toast.Root>.`);
  }
  return toast;
}

export interface ToastRootProps extends PartProps<"div"> {
  /** The toast being rendered (from `useToast().toasts`). */
  toast: ToastData;
}

function ToastRoot({ toast, className, children, ref: refProp, ...rest }: ToastRootProps) {
  const ctx = useToastContext("Toast.Root");
  const ref = useRef<HTMLDivElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);
  const exiting = ctx.exiting.has(toast.id);

  const { mounted } = ctx;
  useEffect(() => {
    mounted.add(toast.id);
    return () => {
      mounted.delete(toast.id);
    };
  }, [mounted, toast.id]);

  // The exit ends when the stylesheet says so: `transitionend` on the toast
  // itself. Where no transition will run (reduced motion, no motion styles,
  // jsdom) the computed durations are all zero and the toast goes at once.
  const { remove } = ctx;
  useEffect(() => {
    const el = ref.current;
    if (!exiting || !el) return;
    const durations = getComputedStyle(el).transitionDuration || "0s";
    const animated = durations.split(",").some((d) => parseFloat(d) > 0);
    if (!animated) {
      remove(toast.id);
      return;
    }
    const onEnd = (e: TransitionEvent) => {
      if (e.target === el) remove(toast.id);
    };
    el.addEventListener("transitionend", onEnd);
    el.addEventListener("transitioncancel", onEnd);
    return () => {
      el.removeEventListener("transitionend", onEnd);
      el.removeEventListener("transitioncancel", onEnd);
    };
  }, [exiting, remove, toast.id]);

  return (
    <ToastItemContext value={toast}>
      <div
        // A live region: role="status" announces politely on insertion;
        // role="alert" interrupts, reserved for priority: "high".
        role={toast.priority === "high" ? "alert" : "status"}
        className={cx("toast", className)}
        data-exiting={exiting || undefined}
        {...rest}
        ref={composedRef}
      >
        {children}
      </div>
    </ToastItemContext>
  );
}

/** Wiring the Title and Description attach to whatever they render. */
export interface ToastTextRenderProps {
  className: string;
}

export interface ToastTitleProps extends PartProps<"div"> {
  /** Substitute the element (`render={<strong />}`). Defaults to a `<div>`. */
  render?: RenderProp<ToastTextRenderProps>;
}

function ToastTitle({ render, className, children, ...rest }: ToastTitleProps) {
  useToastItem("Toast.Title");
  const wiring: ToastTextRenderProps = { className: cx("title", className) };
  if (render) return <>{renderWithProps(render, { ...rest, ...wiring, children })}</>;
  return (
    <div {...rest} {...wiring}>
      {children}
    </div>
  );
}

export interface ToastDescriptionProps extends PartProps<"div"> {
  /** Substitute the element (`render={<p />}`). Defaults to a `<div>`. */
  render?: RenderProp<ToastTextRenderProps>;
}

function ToastDescription({ render, className, children, ...rest }: ToastDescriptionProps) {
  useToastItem("Toast.Description");
  const wiring: ToastTextRenderProps = { className: cx("description", className) };
  if (render) return <>{renderWithProps(render, { ...rest, ...wiring, children })}</>;
  return (
    <div {...rest} {...wiring}>
      {children}
    </div>
  );
}

/** Wiring the Action attaches to whatever it renders. */
export interface ToastActionRenderProps {
  type: "button";
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface ToastActionProps extends PartProps<"button"> {
  /** Runs before the toast dismisses. */
  onAction?: () => void;
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<ToastActionRenderProps>;
}

function ToastAction({ onAction, render, children, ...rest }: ToastActionProps) {
  const ctx = useToastContext("Toast.Action");
  const toast = useToastItem("Toast.Action");
  const actionProps: ToastActionRenderProps = {
    type: "button",
    onClick: () => {
      onAction?.();
      ctx.close(toast.id);
    },
  };
  return render ? (
    <>{renderWithProps(render, mergeProps(actionProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, actionProps)}</>
  );
}

/** Wiring the Close part attaches to whatever it renders. */
export interface ToastCloseRenderProps {
  type: "button";
  "aria-label": string;
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface ToastCloseProps extends PartProps<"button"> {
  /** The words the button speaks: `dismiss` is its accessible name. */
  labels?: { dismiss?: string };
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<ToastCloseRenderProps>;
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ToastClose({ labels, render, children, ...rest }: ToastCloseProps) {
  const ctx = useToastContext("Toast.Close");
  const toast = useToastItem("Toast.Close");
  const closeProps: ToastCloseRenderProps = {
    type: "button",
    "aria-label": labels?.dismiss ?? "Dismiss notification",
    onClick: () => ctx.close(toast.id),
  };
  const content = children ?? <CrossIcon />;
  return render ? (
    <>{renderWithProps(render, mergeProps(closeProps, { children: content, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{content}</Button>, closeProps)}</>
  );
}

export interface ToastsProps {
  /**
   * The words the viewport speaks: `region` names the landmark, `dismiss`
   * names each toast's close button.
   */
  labels?: { region?: string; dismiss?: string };
}

/**
 * The ready-made viewport: renders every active toast with title,
 * description, action and a dismiss button. Compose the parts yourself only
 * when this layout doesn't fit.
 */
export function Toasts({ labels }: ToastsProps) {
  const { toasts } = useToast();
  return (
    <ToastViewport labels={{ region: labels?.region }}>
      {toasts.map((toast) => (
        <ToastRoot key={toast.id} toast={toast}>
          <div className="content">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          {toast.action && (
            <ToastAction onAction={toast.action.onClick}>{toast.action.label}</ToastAction>
          )}
          <ToastClose labels={{ dismiss: labels?.dismiss }} />
        </ToastRoot>
      ))}
    </ToastViewport>
  );
}

export const Toast = {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
};
