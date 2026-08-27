import type { FieldsetHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

/**
 * Groups related controls under a shared, semantic label.
 *
 * Renders a native `<fieldset>` + `<legend>`, which is the accessible way to
 * label a set of checkboxes or radios (the legend names the group in the
 * accessibility tree). Prefer this over a `<div role="group">` with
 * `aria-labelledby`.
 *
 * ```tsx
 * <Fieldset.Root>
 *   <Fieldset.Legend>Notifications</Fieldset.Legend>
 *   …controls…
 * </Fieldset.Root>
 * ```
 */

export interface FieldsetRootProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  ref?: Ref<HTMLFieldSetElement>;
}

function FieldsetRoot({ className, children, ref, ...rest }: FieldsetRootProps) {
  return (
    <fieldset ref={ref} className={cx("fui-Fieldset", className)} {...rest}>
      {children}
    </fieldset>
  );
}

export interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
  /** Mark the whole group optional in text rather than with an asterisk. */
  optional?: boolean;
  children?: ReactNode;
}

function FieldsetLegend({ optional, className, children, ...rest }: FieldsetLegendProps) {
  return (
    <legend className={className} {...rest}>
      {children}
      {optional && <span className="optional"> (optional)</span>}
    </legend>
  );
}

export const Fieldset = {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
};
