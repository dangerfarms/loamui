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
 * A blocking dialog for must-complete tasks, composed from parts.
 *
 * The Popup renders a native `<dialog>` opened with `showModal()`, so the
 * top layer, `::backdrop`, focus containment, Escape handling and
 * focus-restore-to-opener all come from the browser. Light dismiss uses the
 * `closedby` attribute where supported, with a small coordinate-check
 * fallback elsewhere.
 *
 * ```tsx
 * <Modal.Root>
 *   <Modal.Trigger>Invite teammate</Modal.Trigger>
 *   <Modal.Popup>
 *     <Modal.Title>Invite a teammate</Modal.Title>
 *     <Modal.Description>They'll get an email invitation.</Modal.Description>
 *     <Modal.Close>Cancel</Modal.Close>
 *   </Modal.Popup>
 * </Modal.Root>
 * ```
 */

interface ModalContextValue {
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

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(part: string): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Modal.Root>.`);
  }
  return ctx;
}

export interface ModalRootProps {
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (either path). */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

function ModalRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const [hasTitle, registerTitle] = usePresence();
  // Feature-probe the element prototype, never window/document.
  const [invokers, setInvokers] = useState(false);
  useEffect(() => setInvokers("commandForElement" in HTMLButtonElement.prototype), []);
  const [hasDescription, registerDescription] = usePresence();

  const autoId = useId();
  const dialogId = `${autoId}-modal`;

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

  const value = useMemo<ModalContextValue>(
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

  return <ModalContext value={value}>{children}</ModalContext>;
}

/** Wiring the Trigger attaches to whatever it renders. */
export interface ModalTriggerRenderProps {
  type: "button";
  /** Declarative invoker wiring (Invoker Commands API) where supported. */
  commandfor: string | undefined;
  command: "show-modal" | undefined;
  "aria-haspopup": "dialog";
  /** Styling hook — present while the modal is open. */
  "data-popup-open": "true" | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
  ref: Ref<HTMLButtonElement>;
}

export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Substitute your own element as the trigger (`render={<MyIconButton />}`) — triggers act, so keep them buttons
   * or pass a function receiving the wiring props. Without it, the Trigger
   * renders a LoamUI Button.
   */
  render?: RenderProp<ModalTriggerRenderProps>;
}

function ModalTrigger({ render, children, ...rest }: ModalTriggerProps) {
  const ctx = useModalContext("Modal.Trigger");

  const triggerProps: ModalTriggerRenderProps = {
    ref: ctx.triggerRef,
    type: "button",
    // Enhanced: the browser owns open — a server-rendered trigger works
    // before (and without) hydration. The dialog's toggle event syncs state.
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

export interface ModalPopupProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  ref?: Ref<HTMLDialogElement>;
  /** Panel width. @default "md" */
  size?: "sm" | "md" | "lg";
  /**
   * Renders an alert dialog (`role="alertdialog"`): a confirmation that
   * interrupts the user and cannot be light-dismissed — clicking the
   * backdrop does nothing, only Escape or an explicit choice closes it.
   * Pair with a Title and Description, and put `autoFocus` on the
   * least-destructive action so it is the default answer.
   */
  alert?: boolean;
}

function ModalPopup({
  size = "md",
  alert = false,
  className,
  children,
  ref: refProp,
  ...rest
}: ModalPopupProps) {
  const ctx = useModalContext("Modal.Popup");
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
  // rect landed on the backdrop. Alert dialogs never light-dismiss.
  useEffect(() => {
    const el = ref.current;
    if (!el || alert || "closedBy" in HTMLDialogElement.prototype) return;
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
  }, [alert]);

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
      // "closerequest" = Escape closes, backdrop clicks don't — the native
      // spelling of an alert dialog's dismissal contract.
      {...({ closedby: alert ? "closerequest" : "any" } as object)}
      role={alert ? "alertdialog" : undefined}
      aria-labelledby={ctx.hasTitle ? ctx.titleId : undefined}
      aria-describedby={ctx.hasDescription ? ctx.descriptionId : undefined}
      className={cx("loam-Modal-popup", className)}
      data-size={size}
      data-open={open || undefined}
    >
      {children}
    </dialog>
  );
}

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function ModalTitle({ className, children, ...rest }: ModalTitleProps) {
  const ctx = useModalContext("Modal.Title");
  const { registerTitle } = ctx;
  useEffect(() => registerTitle(), [registerTitle]);
  return (
    <h2 className={cx("title", className)} id={ctx.titleId} {...rest}>
      {children}
    </h2>
  );
}

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

function ModalDescription({ className, children, ...rest }: ModalDescriptionProps) {
  const ctx = useModalContext("Modal.Description");
  const { registerDescription } = ctx;
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p className={cx("description", className)} id={ctx.descriptionId} {...rest}>
      {children}
    </p>
  );
}

/** Wiring the Close part attaches to whatever it renders. */
export interface ModalCloseRenderProps {
  type: "button";
  /** Declarative invoker wiring (Invoker Commands API) where supported. */
  commandfor: string | undefined;
  command: "close" | undefined;
  onClick: (e: ReactMouseEvent<Element>) => void;
}

export interface ModalCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Substitute your own element; defaults to a LoamUI Button. */
  render?: RenderProp<ModalCloseRenderProps>;
}

function ModalClose({ render, children, ...rest }: ModalCloseProps) {
  const ctx = useModalContext("Modal.Close");
  const closeProps: ModalCloseRenderProps = {
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

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Popup: ModalPopup,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
};
