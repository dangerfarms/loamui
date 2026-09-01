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
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { cx } from "../../utils";
import { mergeProps, renderWithProps } from "../../render";
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
 * Toasts are for confirmations and background events — never for errors the
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
  /** Stable id — adding again with the same id updates in place. */
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
  /** Timers pause while the pointer/focus is inside the viewport. */
  pause: () => void;
  resume: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Fire and dismiss toasts from anywhere under a Toast.Provider. */
export function useToast(): Pick<ToastContextValue, "toasts" | "add" | "close"> {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be called inside <Toast.Provider>.");
  }
  return ctx;
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
  const exitTimers = useRef(new Set<ReturnType<typeof setTimeout>>());

  const remove = useCallback((id?: string) => {
    toastsRef.current = id ? toastsRef.current.filter((t) => t.id !== id) : [];
    setToasts(toastsRef.current);
    setExiting((prev) => {
      if (!id) return new Set();
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (id) {
      const timer = timers.current.get(id);
      if (timer?.handle) clearTimeout(timer.handle);
      timers.current.delete(id);
    } else {
      for (const t of timers.current.values()) {
        if (t.handle) clearTimeout(t.handle);
      }
      timers.current.clear();
    }
  }, []);

  // Two-phase close: mark the toast as exiting so its CSS transition plays,
  // then remove it. Where motion is off (preference or no matchMedia, e.g.
  // jsdom) removal is immediate.
  const close = useCallback(
    (id?: string) => {
      const animated =
        typeof matchMedia === "function" &&
        matchMedia("(prefers-reduced-motion: no-preference)").matches;
      if (!id || !animated) {
        remove(id);
        return;
      }
      setExiting((prev) => new Set(prev).add(id));
      const timer = timers.current.get(id);
      if (timer?.handle) clearTimeout(timer.handle);
      timers.current.delete(id);
      // Must match the CSS exit transition (--loam-duration-lg = 300ms):
      // shorter unmounts mid-animation, longer leaves a ghost node.
      const handle = setTimeout(() => {
        exitTimers.current.delete(handle);
        remove(id);
      }, 300);
      exitTimers.current.add(handle);
    },
    [remove],
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
      for (const dropped of appended.slice(0, dropIndex)) {
        const timer = timers.current.get(dropped.id);
        if (timer?.handle) clearTimeout(timer.handle);
        timers.current.delete(dropped.id);
      }
      toastsRef.current = appended.slice(dropIndex);
      setToasts(toastsRef.current);
      const delay = options.timeout ?? timeout;
      const existing = timers.current.get(id);
      if (existing?.handle) clearTimeout(existing.handle);
      if (delay > 0) schedule(id, delay);
      else timers.current.delete(id);
      return id;
    },
    [limit, timeout, schedule],
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
    const exits = exitTimers.current;
    return () => {
      for (const t of map.values()) {
        if (t.handle) clearTimeout(t.handle);
      }
      for (const handle of exits) clearTimeout(handle);
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, exiting, add, close, pause, resume }),
    [toasts, exiting, add, close, pause, resume],
  );

  return <ToastContext value={value}>{children}</ToastContext>;
}

export interface ToastViewportProps extends HTMLAttributes<HTMLDivElement> {}

function ToastViewport({ className, children, ...rest }: ToastViewportProps) {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("Toast.Viewport must be rendered inside <Toast.Provider>.");
  }
  const ref = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(
    () => setEnhanced(typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype),
    [],
  );

  // The viewport stays in the top layer permanently so toasts inserted into
  // it are announced by their live-region roles — a hidden container would
  // swallow the first announcement.
  useEffect(() => {
    const el = ref.current;
    if (!el || !enhanced) return;
    if (!el.matches(":popover-open")) el.showPopover();
  }, [enhanced]);

  // F6 jumps focus into the notifications region (and back out on Escape via
  // the browser's normal focus behaviour — the viewport never traps).
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

  return (
    <div
      aria-label="Notifications"
      {...rest}
      ref={ref}
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

export interface ToastRootProps extends HTMLAttributes<HTMLDivElement> {
  /** The toast being rendered (from `useToast().toasts`). */
  toast: ToastData;
}

function ToastRoot({ toast, className, children, ...rest }: ToastRootProps) {
  const ctx = useContext(ToastContext);
  return (
    <div
      // A live region: role="status" announces politely on insertion;
      // role="alert" interrupts — reserved for priority: "high".
      role={toast.priority === "high" ? "alert" : "status"}
      className={cx("toast", className)}
      data-exiting={ctx?.exiting.has(toast.id) || undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ToastTitleProps extends HTMLAttributes<HTMLDivElement> {}

function ToastTitle({ className, children, ...rest }: ToastTitleProps) {
  return (
    <div className={cx("title", className)} {...rest}>
      {children}
    </div>
  );
}

export interface ToastDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

function ToastDescription({ className, children, ...rest }: ToastDescriptionProps) {
  return (
    <div className={cx("description", className)} {...rest}>
      {children}
    </div>
  );
}

/** Wiring the Action attaches to whatever it renders. */
export interface ToastActionRenderProps {
  type: "button";
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The toast this action belongs to (its activation dismisses it). */
  toastId: string;
  onAction?: () => void;
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<ToastActionRenderProps>;
}

function ToastAction({ toastId, onAction, render, children, ...rest }: ToastActionProps) {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("Toast.Action must be rendered inside <Toast.Provider>.");
  }
  const actionProps: ToastActionRenderProps = {
    type: "button",
    onClick: () => {
      onAction?.();
      ctx.close(toastId);
    },
  };
  return render ? (
    <>{renderWithProps(render, mergeProps(actionProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, actionProps)}</>
  );
}

export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The toast to dismiss. */
  toastId: string;
}

function ToastClose({ toastId, className, children, ...rest }: ToastCloseProps) {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("Toast.Close must be rendered inside <Toast.Provider>.");
  }
  return (
    <button
      type="button"
      aria-label="Dismiss notification"
      className={cx("close", className)}
      onClick={() => ctx.close(toastId)}
      {...rest}
    >
      {children ?? (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M4 4l8 8m0-8l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

/**
 * The ready-made viewport: renders every active toast with title,
 * description, action and a dismiss button. Compose the parts yourself only
 * when this layout doesn't fit.
 */
export function Toasts() {
  const { toasts } = useToast();
  return (
    <ToastViewport>
      {toasts.map((toast) => (
        <ToastRoot key={toast.id} toast={toast}>
          <div className="content">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          {toast.action && (
            <ToastAction toastId={toast.id} onAction={toast.action.onClick}>
              {toast.action.label}
            </ToastAction>
          )}
          <ToastClose toastId={toast.id} />
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
