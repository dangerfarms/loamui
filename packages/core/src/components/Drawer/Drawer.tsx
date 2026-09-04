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
  RefObject,
  ButtonHTMLAttributes,
  DialogHTMLAttributes,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
} from "react";
import { cx } from "../../utils";
import { usePresence } from "../../use-presence";
import { mergeProps, renderWithProps, composeRefs } from "../../render";
import type { RenderProp } from "../../render";

import { Button } from "../Button/Button";

/**
 * An edge-anchored panel that slides in over the page, composed from parts.
 *
 * The Panel renders a native `<dialog>` opened with `showModal()`, so the top
 * layer, `::backdrop`, focus containment, Escape handling and
 * focus-restore-to-opener all come from the browser — a Drawer is a Modal
 * pinned to an edge with a slide transition. Light dismiss uses the `closedby`
 * attribute where supported, with a coordinate-check fallback elsewhere.
 *
 * Reach for a Drawer for navigation and secondary content that shouldn't take
 * over the whole screen (a mobile menu, filters, a details side-sheet). For a
 * focused, must-answer task, use Modal instead.
 *
 * ```tsx
 * <Drawer.Root>
 *   <Drawer.Trigger>Menu</Drawer.Trigger>
 *   <Drawer.Panel side="start">
 *     <Drawer.Title>Navigation</Drawer.Title>
 *     <nav>…</nav>
 *     <Drawer.Close aria-label="Close" />
 *   </Drawer.Panel>
 * </Drawer.Root>
 * ```
 */

interface DrawerContextValue {
  open: boolean;
  /** True once the Invoker Commands API is confirmed (commandfor/command). */
  invokers: boolean;
  setOpen: (open: boolean) => void;
  /** The Trigger's element (native dialog close restores focus to it). */
  triggerRef: RefObject<HTMLButtonElement | null>;
  dialogId: string;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext(part: string): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Drawer.Root>.`);
  }
  return ctx;
}

export interface DrawerRootProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

function DrawerRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: DrawerRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const [hasTitle, registerTitle] = usePresence();
  // Feature-probe the element prototype, never window/document.
  const [invokers, setInvokers] = useState(false);
  useEffect(() => setInvokers("commandForElement" in HTMLButtonElement.prototype), []);
  const [hasDescription, registerDescription] = usePresence();

  const autoId = useId();
  const dialogId = `${autoId}-drawer`;

  const openRef = useRef(open);
  openRef.current = open;
  const controlledRef = useRef(false);
  controlledRef.current = openProp !== undefined;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const setOpen = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      // In controlled mode the parent owns the state; we only propose.
      if (!controlledRef.current) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const value = useMemo<DrawerContextValue>(
    () => ({
      open,
      setOpen,
      invokers,
      triggerRef,
      dialogId,
      titleId: `${dialogId}-title`,
      descriptionId: `${dialogId}-description`,
      hasTitle,
      hasDescription,
      registerTitle,
      registerDescription,
    }),
    [
      open,
      setOpen,
      invokers,
      dialogId,
      hasTitle,
      hasDescription,
      registerTitle,
      registerDescription,
    ],
  );

  return <DrawerContext value={value}>{children}</DrawerContext>;
}

/** Wiring the Trigger attaches to whatever it renders. */
export interface DrawerTriggerRenderProps {
  type: "button";
  /** Declarative invoker wiring (Invoker Commands API) where supported. */
  commandfor: string | undefined;
  command: "show-modal" | undefined;
  "aria-haspopup": "dialog";
  /** Styling hook — present while the drawer is open. */
  "data-popup-open": "true" | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
  ref: Ref<HTMLButtonElement>;
}

export interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Substitute your own element as the trigger (`render={<MyIconButton />}`) — triggers act, so keep them buttons
   * or pass a function receiving the wiring props. Without it, the Trigger
   * renders a LoamUI Button.
   */
  render?: RenderProp<DrawerTriggerRenderProps>;
}

function DrawerTrigger({ render, children, ...rest }: DrawerTriggerProps) {
  const ctx = useDrawerContext("Drawer.Trigger");

  const triggerProps: DrawerTriggerRenderProps = {
    ref: ctx.triggerRef,
    type: "button",
    // Enhanced: once hydration has probed for invoker support, the browser
    // owns open via commandfor (no click handler needed). The dialog's toggle
    // event syncs state either way.
    commandfor: ctx.invokers ? ctx.dialogId : undefined,
    command: ctx.invokers ? "show-modal" : undefined,
    "aria-haspopup": "dialog",
    "data-popup-open": ctx.open ? "true" : undefined,
    onClick: () => {
      if (!ctx.invokers) ctx.setOpen(true);
    },
  };

  return render ? (
    <>{renderWithProps(render, mergeProps(triggerProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, triggerProps)}</>
  );
}

/** Which edge the panel is anchored to. Logical, so it follows writing mode. */
export type DrawerSide = "start" | "end" | "top" | "bottom";

export interface DrawerPanelProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  ref?: Ref<HTMLDialogElement>;
  /** Edge the panel slides in from. @default "start" */
  side?: DrawerSide;
}

function DrawerPanel({
  side = "start",
  className,
  children,
  ref: refProp,
  ...rest
}: DrawerPanelProps) {
  const ctx = useDrawerContext("Drawer.Panel");
  const { open, setOpen } = ctx;
  const ref = useRef<HTMLDialogElement>(null);
  const composedRef = useMemo(() => composeRefs(refProp, ref), [refProp]);

  // Reconcile React state with the native dialog. No dependency array — a
  // controlled parent may reject a close reported by the `close` event, and
  // only an every-render reconcile converges the DOM back.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  });

  // Native closes (Escape, closedby light dismiss, form method="dialog")
  // flow back into state via the `close` event; a native invoker open
  // (command="show-modal") flows in via `toggle`.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClose = () => setOpen(false);
    const onToggle = (e: Event) => {
      if ((e as ToggleEvent).newState === "open") setOpen(true);
    };
    el.addEventListener("close", onClose);
    el.addEventListener("toggle", onToggle);
    return () => {
      el.removeEventListener("close", onClose);
      el.removeEventListener("toggle", onToggle);
    };
  }, [setOpen]);

  // Light-dismiss fallback for browsers without `closedby` (Safari): a click
  // whose target is the dialog but whose coordinates fall outside its content
  // rect landed on the backdrop.
  useEffect(() => {
    const el = ref.current;
    if (!el || "closedBy" in HTMLDialogElement.prototype) return;
    const onClick = (e: MouseEvent) => {
      if (e.target !== el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        rect.top <= e.clientY &&
        e.clientY <= rect.bottom &&
        rect.left <= e.clientX &&
        e.clientX <= rect.right;
      if (!inside) el.close();
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  // Lock body scroll while open (showModal doesn't; the CSS-only
  // `body:has(dialog:modal)` route would restyle the host page).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    // rest cannot override what follows: the dialog wiring (id, open
    // reconciliation, closedby) must win.
    <dialog
      {...rest}
      ref={composedRef}
      id={ctx.dialogId}
      // Missing from React's typings; lowercase passes through as an attribute.
      {...({ closedby: "any" } as object)}
      aria-labelledby={ctx.hasTitle ? ctx.titleId : undefined}
      aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
      className={cx("loam-Drawer-panel", className)}
      data-position={side}
      data-open={open || undefined}
    >
      {children}
    </dialog>
  );
}

export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function DrawerTitle({ className, children, ...rest }: DrawerTitleProps) {
  const ctx = useDrawerContext("Drawer.Title");
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(), [registerTitle]);
  return (
    <h2 className={cx("title", className)} id={ctx.titleId} {...rest}>
      {children}
    </h2>
  );
}

export interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

function DrawerDescription({ className, children, ...rest }: DrawerDescriptionProps) {
  const ctx = useDrawerContext("Drawer.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p className={cx("description", className)} id={ctx.descriptionId} {...rest}>
      {children}
    </p>
  );
}

/** Wiring the Close part attaches to whatever it renders. */
export interface DrawerCloseRenderProps {
  type: "button";
  /** Declarative invoker wiring (Invoker Commands API) where supported. */
  commandfor: string | undefined;
  command: "close" | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface DrawerCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<DrawerCloseRenderProps>;
}

function DrawerClose({ render, children, ...rest }: DrawerCloseProps) {
  const ctx = useDrawerContext("Drawer.Close");
  const closeProps: DrawerCloseRenderProps = {
    type: "button",
    commandfor: ctx.invokers ? ctx.dialogId : undefined,
    command: ctx.invokers ? "close" : undefined,
    onClick: () => {
      // Enhanced path: command="close" closes natively; the dialog's close
      // event syncs state (same flow as Escape/light dismiss).
      if (!ctx.invokers) ctx.setOpen(false);
    },
  };
  return render ? (
    <>{renderWithProps(render, mergeProps(closeProps, { children, ...rest }))}</>
  ) : (
    <>{renderWithProps(<Button {...rest}>{children}</Button>, closeProps)}</>
  );
}

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Panel: DrawerPanel,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
};
