import { cx } from "../../utils.js";
import type { PartProps } from "../../utils.js";
import { renderWithProps } from "../../render.js";
import type { RenderProp } from "../../render.js";
import { AlertClose } from "./AlertClose.js";
export type { AlertCloseProps, AlertCloseLabels } from "./AlertClose.js";

export interface AlertRootProps extends Omit<PartProps<"div">, "color" | "title"> {}

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

export { AlertRoot, AlertIcon, AlertBody, AlertTitle, AlertDescription, AlertClose };
