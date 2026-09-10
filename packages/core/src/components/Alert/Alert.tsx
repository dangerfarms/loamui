import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

export interface AlertRootProps extends Omit<PartProps<"div">, "color"> {}

/**
 * Polite by default: `role="status"` announces without interrupting, which
 * suits a message that is on the page when it loads. Pass `role="alert"` for
 * a message that appears in response to something and must interrupt.
 */
function AlertRoot({ className, children, ref, ...rest }: AlertRootProps) {
  return (
    <div ref={ref} role="status" className={cx("loam-Alert", className)} {...rest}>
      {children}
    </div>
  );
}

export interface AlertIconProps extends PartProps<"span"> {}

function AlertIcon({ className, children, ref, ...rest }: AlertIconProps) {
  return (
    <span ref={ref} className={cx("icon", className)} aria-hidden {...rest}>
      {children}
    </span>
  );
}

export interface AlertBodyProps extends PartProps<"div"> {}

function AlertBody({ className, children, ref, ...rest }: AlertBodyProps) {
  return (
    <div ref={ref} className={cx("body", className)} {...rest}>
      {children}
    </div>
  );
}

export interface AlertTitleProps extends PartProps<"div"> {
  /**
   * Render as a different element: `render={<h2 />}` where the alert's title
   * belongs in the page outline. The class merges onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
}

function AlertTitle({ render, className, children, ref, ...rest }: AlertTitleProps) {
  const wiring = { ref, className: cx("title", className), children, ...rest };
  if (render) {
    return <>{renderWithProps(render, wiring)}</>;
  }
  return <div {...wiring} />;
}

export interface AlertDescriptionProps extends PartProps<"div"> {}

function AlertDescription({ className, children, ref, ...rest }: AlertDescriptionProps) {
  return (
    <div ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </div>
  );
}

/** The words the Close button speaks. */
export interface AlertCloseLabels {
  /** The button's name when it has no children of its own. @default "Dismiss" */
  close?: string;
}

export interface AlertCloseProps extends ButtonProps {
  /** Called when the button is activated; the consumer stops rendering the alert. */
  onClose?: () => void;
  /**
   * The button's name when it has no children of its own (an icon-only
   * close). @default { close: "Dismiss" }
   */
  labels?: AlertCloseLabels;
}

/**
 * A close button: a LoamUI Button that reports the dismissal through
 * `onClose`. The alert itself does not vanish; the consumer removes it,
 * because an alert exists exactly as long as the condition it reports and
 * only the consumer knows when acknowledging it ends that condition.
 */
function AlertClose({ onClose, onClick, labels, children, ...rest }: AlertCloseProps) {
  const close = labels?.close ?? "Dismiss";
  return (
    <Button
      aria-label={children ? undefined : close}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onClose?.();
      }}
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
    </Button>
  );
}

export interface AlertProps extends Omit<AlertRootProps, "title"> {
  /** Bold heading rendered above the body. */
  title?: ReactNode;
  /** Icon rendered to the inline-start of the content. */
  icon?: ReactNode;
  /** Renders an `Alert.Close` that calls this when activated. */
  onClose?: () => void;
  /** The close button's name, when `onClose` renders one. @default { close: "Dismiss" } */
  labels?: AlertCloseLabels;
  /** Alert body. */
  children?: ReactNode;
}

/**
 * A prominent message box for conveying status or feedback.
 *
 * Neutral until a --loam-context region says otherwise: declare
 * `--loam-context` on a region (an ancestor — a style query never matches
 * the element that declares it, so a one-element region is a wrapper) and
 * the look derives from that status's colour:
 *
 * ```tsx
 * <div style={{ "--loam-context": "warning" } as React.CSSProperties}>
 *   <Alert title="Heads up">A new version is available.</Alert>
 * </div>
 * ```
 *
 * Compose it from parts, or use the `title`/`icon`/`onClose` convenience
 * props which render the same structure:
 *
 * ```tsx
 * <Alert.Root>
 *   <Alert.Icon>…</Alert.Icon>
 *   <Alert.Body>
 *     <Alert.Title>Heads up</Alert.Title>
 *     <Alert.Description>A new version is available.</Alert.Description>
 *   </Alert.Body>
 *   <Alert.Close onClose={dismiss} />
 * </Alert.Root>
 * ```
 */
function AlertBase({ title, icon, onClose, labels, children, ref, ...rest }: AlertProps) {
  return (
    <AlertRoot ref={ref} {...rest}>
      {icon && <AlertIcon>{icon}</AlertIcon>}
      <AlertBody>
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertDescription>{children}</AlertDescription>}
      </AlertBody>
      {onClose && <AlertClose onClose={onClose} labels={labels} />}
    </AlertRoot>
  );
}

export const Alert = Object.assign(AlertBase, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
  Close: AlertClose,
});
