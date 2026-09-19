import type { ReactNode } from "react";
import type { PartProps } from "../../utils.js";
import { AlertBody, AlertDescription, AlertIcon, AlertRoot, AlertTitle } from "./Alert.js";
import { AlertClose } from "./AlertClose.js";
import type { AlertCloseLabels } from "./AlertClose.js";

export interface AlertProps extends Omit<PartProps<"div">, "color" | "title"> {
  /** The heading above the message. Omit for a message that needs none. */
  title?: ReactNode;
  /** A glyph before the message; decorative, so the words carry the meaning. */
  icon?: ReactNode;
  /** Render a dismiss button, and call this when it is pressed. */
  onClose?: () => void;
  /** The dismiss button's name when it is icon-only. @default { close: "Dismiss" } */
  labels?: AlertCloseLabels;
  /** The message itself. */
  children?: ReactNode;
}

/**
 * A message in one tag: `<Alert title="Saved">Your changes are live.</Alert>`.
 *
 * This composes the parts below for the shape almost every alert takes. Reach
 * for `Alert.Root` and the rest directly when the message needs something this
 * arrangement cannot hold — two actions, say, or content between the title and
 * the description.
 *
 * Polite by default, because an alert that is on the page at load is content
 * rather than news. Pass `role="alert"` for a message that appears in response
 * to something and has to interrupt.
 */
export function AlertBase({ title, icon, onClose, labels, children, ref, ...rest }: AlertProps) {
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

/** Callable for the common case, with every part attached for the rest. */
export const Alert = Object.assign(AlertBase, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
  Close: AlertClose,
});
