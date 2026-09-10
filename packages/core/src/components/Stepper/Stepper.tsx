"use client";

import { createContext, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

/**
 * A stepper: an ordered list of steps, each a marker, a title and a
 * description, that shows how far a sequence has got.
 *
 * Put `aria-current="step"` on the Step the sequence has reached and the
 * rest is detected: the steps before it in the list are complete, the
 * steps after it upcoming. The stylesheet reads that order with `:has()`,
 * both to paint each step and to choose the word a screen reader hears
 * after it (`labels.complete`, `labels.current`), so "Completed" is read
 * where a sighted reader sees a check, in the server HTML already. Without
 * a current step it is a numbered list.
 *
 * The steps stack; when the Root's container is 40rem or wider they sit in
 * a row. There is no orientation prop: a consumer who wants them stacked
 * gives them less room.
 *
 * ```tsx
 * <Stepper.Root>
 *   <Stepper.Step>
 *     <Stepper.Marker />
 *     <Stepper.Title>Order placed</Stepper.Title>
 *   </Stepper.Step>
 *   <Stepper.Step aria-current="step">
 *     <Stepper.Marker />
 *     <Stepper.Title>Being packed</Stepper.Title>
 *     <Stepper.Description>Picked and packed at the warehouse.</Stepper.Description>
 *   </Stepper.Step>
 * </Stepper.Root>
 * ```
 */

export interface StepperLabels {
  /** The list's name, unless you pass `aria-label` or `aria-labelledby`. @default "Steps" */
  list?: string;
  /** Read after a complete step. @default "Completed" */
  complete?: string;
  /** Read after the current step. @default "Current step" */
  current?: string;
}

interface StepperContextValue {
  labels: Required<StepperLabels>;
}

const StepperContext = createContext<StepperContextValue | null>(null);

function useStepperContext(part: string): StepperContextValue {
  return useRequiredContext(StepperContext, part, "Stepper.Root");
}

const NO_LABELS: StepperLabels = {};

export interface StepperRootProps extends PartProps<"ol"> {
  /** The default strings, each overridable. */
  labels?: StepperLabels;
}

function StepperRoot({
  labels: { list = "Steps", complete = "Completed", current = "Current step" } = NO_LABELS,
  className,
  children,
  ...rest
}: StepperRootProps) {
  const labels = useMemo(() => ({ list, complete, current }), [list, complete, current]);
  const ctx = useMemo<StepperContextValue>(() => ({ labels }), [labels]);

  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;

  return (
    <StepperContext value={ctx}>
      <ol
        // list-style: none drops list semantics in WebKit; the role restores "2 of 4".
        role="list"
        aria-label={named ? undefined : labels.list}
        className={cx("loam-Stepper", className)}
        {...rest}
      >
        {children}
      </ol>
    </StepperContext>
  );
}

export interface StepperStepProps extends PartProps<"li"> {
  /** A `Stepper.Marker`, a `Stepper.Title`, then an optional `Stepper.Description`. */
  children?: ReactNode;
}

/**
 * One step, an `li`. Pass `aria-current="step"` on the step the sequence
 * has reached; the steps before it are complete and the steps after it
 * upcoming, and each says so in hidden text. Every step carries both
 * words; the stylesheet keeps the wrong one out of the accessibility tree
 * with `display: none`, from the same `:has()` that paints the state.
 */
function StepperStep({ className, children, ref, ...rest }: StepperStepProps) {
  const { labels } = useStepperContext("Stepper.Step");
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
      <span className="state complete">
        <span className="loam-VisuallyHidden">{labels.complete}</span>
      </span>
      <span className="state current">
        <span className="loam-VisuallyHidden">{labels.current}</span>
      </span>
    </li>
  );
}

export interface StepperMarkerProps extends PartProps<"span"> {
  /** An icon or a short label in place of the number. */
  children?: ReactNode;
}

/**
 * The circle beside the title. Empty, it shows the step's number, and a
 * check once the step is complete; children (an icon, a date) take the
 * number's place. Hidden from assistive technology: the list carries the
 * order and the Step the state.
 */
function StepperMarker({ className, children, ref, ...rest }: StepperMarkerProps) {
  useStepperContext("Stepper.Marker");
  return (
    <span ref={ref} aria-hidden="true" className={cx("marker", className)} {...rest}>
      {children}
    </span>
  );
}

export interface StepperTitleProps extends PartProps<"span"> {
  /**
   * Render as another element: `render={<h3 />}` when each step is a
   * section of the page, `render={<a href="…" />}` for a complete step
   * the reader can go back to. The part's class and attributes merge onto
   * the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/** The step's name. A `span` by default; see `render`. */
function StepperTitle({ render, className, children, ref, ...rest }: StepperTitleProps) {
  useStepperContext("Stepper.Title");
  if (render) {
    return (
      <>{renderWithProps(render, { ref, className: cx("title", className), children, ...rest })}</>
    );
  }
  return (
    <span ref={ref} className={cx("title", className)} {...rest}>
      {children}
    </span>
  );
}

export interface StepperDescriptionProps extends PartProps<"p"> {
  children?: ReactNode;
}

/** One or two muted sentences on what happens in this step. */
function StepperDescription({ className, children, ref, ...rest }: StepperDescriptionProps) {
  useStepperContext("Stepper.Description");
  return (
    <p ref={ref} className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

export const Stepper = {
  Root: StepperRoot,
  Step: StepperStep,
  Marker: StepperMarker,
  Title: StepperTitle,
  Description: StepperDescription,
};
