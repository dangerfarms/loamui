import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface AlertRootProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  ref?: Ref<HTMLDivElement>;
}

function AlertRoot({ className, children, ref, ...rest }: AlertRootProps) {
  return (
    <div ref={ref} role="alert" className={cx("loam-Alert", className)} {...rest}>
      {children}
    </div>
  );
}

export interface AlertPartProps extends HTMLAttributes<HTMLElement> {}

function AlertIcon({ className, children, ...rest }: AlertPartProps) {
  return (
    <span className={cx("icon", className)} aria-hidden {...rest}>
      {children}
    </span>
  );
}

function AlertBody({ className, children, ...rest }: AlertPartProps) {
  return (
    <div className={cx("body", className)} {...rest}>
      {children}
    </div>
  );
}

function AlertTitle({ className, children, ...rest }: AlertPartProps) {
  return (
    <div className={cx("title", className)} {...rest}>
      {children}
    </div>
  );
}

function AlertMessage({ className, children, ...rest }: AlertPartProps) {
  return (
    <div className={cx("message", className)} {...rest}>
      {children}
    </div>
  );
}

export interface AlertProps extends Omit<AlertRootProps, "title"> {
  /** Bold heading rendered above the body. */
  title?: ReactNode;
  /** Icon rendered to the inline-start of the content. */
  icon?: ReactNode;
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
 * Compose it from parts, or use the `title`/`icon` convenience props which
 * render the same structure:
 *
 * ```tsx
 * <Alert.Root>
 *   <Alert.Icon>…</Alert.Icon>
 *   <Alert.Body>
 *     <Alert.Title>Heads up</Alert.Title>
 *     <Alert.Message>A new version is available.</Alert.Message>
 *   </Alert.Body>
 * </Alert.Root>
 * ```
 */
function AlertBase({ title, icon, children, ref, ...rest }: AlertProps) {
  return (
    <AlertRoot ref={ref} {...rest}>
      {icon && <AlertIcon>{icon}</AlertIcon>}
      <AlertBody>
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertMessage>{children}</AlertMessage>}
      </AlertBody>
    </AlertRoot>
  );
}

export const Alert = Object.assign(AlertBase, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Message: AlertMessage,
});
