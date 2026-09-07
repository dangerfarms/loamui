"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";

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

/** The words a Fieldset says on its own, each with an English default. */
export interface FieldsetLabels {
  /** The text after an optional Legend's words. @default "(optional)" */
  optional?: ReactNode;
}

const DEFAULT_LABELS: Required<FieldsetLabels> = {
  optional: "(optional)",
};

// A Legend outside a Root (or under one without labels) reads the defaults.
const FieldsetContext = createContext<Required<FieldsetLabels>>(DEFAULT_LABELS);

export interface FieldsetRootProps extends PartProps<"fieldset"> {
  /** The Fieldset's own words; the Legend reads them from here. */
  labels?: FieldsetLabels;
}

function FieldsetRoot({ labels, className, children, ref, ...rest }: FieldsetRootProps) {
  const optional = labels?.optional ?? DEFAULT_LABELS.optional;
  const value = useMemo<Required<FieldsetLabels>>(() => ({ optional }), [optional]);
  return (
    <FieldsetContext value={value}>
      <fieldset ref={ref} className={cx("loam-Fieldset", className)} {...rest}>
        {children}
      </fieldset>
    </FieldsetContext>
  );
}

export interface FieldsetLegendProps extends PartProps<"legend"> {
  /** Mark the whole group optional in text rather than with an asterisk. */
  optional?: boolean;
}

function FieldsetLegend({ optional, className, children, ref, ...rest }: FieldsetLegendProps) {
  const labels = useContext(FieldsetContext);
  return (
    <legend ref={ref} className={className} {...rest}>
      {children}
      {optional && (
        <>
          {" "}
          <span className="optional">{labels.optional}</span>
        </>
      )}
    </legend>
  );
}

export const Fieldset = {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
};
