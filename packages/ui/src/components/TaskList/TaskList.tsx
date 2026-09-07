"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode, Ref } from "react";
import { cx, renderWithProps } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useOptionalSlot } from "../../naming";

export interface TaskListRootProps extends PartProps<"ul"> {}

/**
 * The things a person must complete across a multi-step process, each with
 * its status: an application, an onboarding, a set of checks before a
 * submission.
 *
 * The task's title is a link when the task can be started and plain text
 * when it cannot; the whole row is never a link, so the status stays
 * readable text and the pointer lands on the title. The status is a
 * `Badge` you place in `TaskList.Status`, coloured by the `--loam-context`
 * region you choose (success for a completed task, info for one in
 * progress, no region for one not yet started). The composition joins the
 * description and the status to the title as its `aria-describedby`, so a
 * screen reader hears "Your details, link, Completed" on the link and never
 * has to go looking across the row. A heading above a group of tasks is
 * your own `h2`.
 *
 * ```tsx
 * <h2>Your application</h2>
 * <TaskList.Root>
 *   <TaskList.Item>
 *     <TaskList.Title href="/apply/details">Your details</TaskList.Title>
 *     <TaskList.Status style={{ "--loam-context": "success" }}>
 *       <Badge>Completed</Badge>
 *     </TaskList.Status>
 *   </TaskList.Item>
 *   <TaskList.Item>
 *     <TaskList.Title>Payment</TaskList.Title>
 *     <TaskList.Description>Available once every section above is complete.</TaskList.Description>
 *     <TaskList.Status><Badge>Cannot start yet</Badge></TaskList.Status>
 *   </TaskList.Item>
 * </TaskList.Root>
 * ```
 */
function TaskListRoot({ className, children, ...rest }: TaskListRootProps) {
  return (
    // role="list" is not redundant here: the stylesheet removes the
    // markers, and a ul styled with list-style: none loses its list
    // semantics in some browsers; the explicit role restores "list, 5
    // items" for assistive tech.
    <ul role="list" className={cx("loam-TaskList", className)} {...rest}>
      {children}
    </ul>
  );
}

interface TaskListItemContextValue {
  descriptionId: string;
  statusId: string;
  /** The ids the title is described by, in the first render and thereafter only while the parts are present. */
  describedBy: string | undefined;
  registerDescription: () => () => void;
  registerStatus: () => () => void;
}

const TaskListItemContext = createContext<TaskListItemContextValue | null>(null);

function useTaskListItemContext(part: string): TaskListItemContextValue {
  const ctx = useContext(TaskListItemContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <TaskList.Item>.`);
  }
  return ctx;
}

export interface TaskListItemProps extends PartProps<"li"> {
  /** A `TaskList.Title`, an optional `TaskList.Description` and an optional `TaskList.Status`. */
  children?: ReactNode;
}

/**
 * One task: an `li` laid out as the title and description beside the
 * status. It mints the ids that tie the description and the status to the
 * title. Both are referenced in the first render, so the server HTML is
 * already described; after mount each reference is kept only while its
 * part is present, so a task without one carries no dangling reference.
 */
function TaskListItem({ children, ...rest }: TaskListItemProps) {
  const description = useOptionalSlot();
  const status = useOptionalSlot();
  const describedBy = cx(description.ref, status.ref) || undefined;

  const value = useMemo<TaskListItemContextValue>(
    () => ({
      descriptionId: description.id,
      statusId: status.id,
      describedBy,
      registerDescription: description.register,
      registerStatus: status.register,
    }),
    [description.id, status.id, describedBy, description.register, status.register],
  );

  return (
    <TaskListItemContext value={value}>
      <li {...rest}>{children}</li>
    </TaskListItemContext>
  );
}

export interface TaskListTitleProps extends Omit<PartProps<"a">, "ref"> {
  /**
   * Where the task is done. With it the title is an `a`; without it the
   * title is plain text, for a task that cannot be started yet.
   */
  href?: string;
  /**
   * Render as a different element: a router's link,
   * `render={<Link to="/apply/details" />}`. The part's classes and
   * attributes merge onto the element it renders, the same contract as
   * every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** The task's name. */
  children?: ReactNode;
  /** Reaches the link or the span, whichever the title turns out to be. */
  ref?: Ref<HTMLElement>;
}

/**
 * The task's title: an `a` when it has an `href`, plain text when it does
 * not, or the element you pass through `render`. It is described by the
 * item's Description and Status while they are present, so the title is
 * announced with what the task needs and where it stands.
 */
function TaskListTitle({ href, render, className, children, ref, ...rest }: TaskListTitleProps) {
  const { describedBy } = useTaskListItemContext("TaskList.Title");
  const props = {
    ref,
    className: cx("title", className),
    "aria-describedby": describedBy,
    children,
    ...rest,
  };
  if (render) return <>{renderWithProps(render, { href, ...props })}</>;
  // The ref is typed for whichever element the title turns out to be.
  if (href != null) {
    return (
      <a href={href} {...props} ref={ref as Ref<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }
  return (
    <span {...props} ref={ref as Ref<HTMLSpanElement>}>
      {children}
    </span>
  );
}

export interface TaskListDescriptionProps extends PartProps<"p"> {}

/**
 * Optional. One muted line under the title on what the task needs. It
 * carries the id the title is described by while it is mounted.
 */
function TaskListDescription({ className, children, ...rest }: TaskListDescriptionProps) {
  const { descriptionId, registerDescription } = useTaskListItemContext("TaskList.Description");
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <p className={cx("description", className)} id={descriptionId} {...rest}>
      {children}
    </p>
  );
}

export interface TaskListStatusProps extends PartProps<"div"> {
  /** A `Badge`. */
  children?: ReactNode;
}

/**
 * Hosts the task's `Badge` and carries the id the title is described by.
 * Colour comes from a `--loam-context` region: set it on this part's
 * `style` or on any ancestor; a style query is answered by an ancestor, and
 * this part is the Badge's.
 */
function TaskListStatus({ className, children, ...rest }: TaskListStatusProps) {
  const { statusId, registerStatus } = useTaskListItemContext("TaskList.Status");
  useEffect(() => registerStatus(), [registerStatus]);
  return (
    <div className={cx("status", className)} id={statusId} {...rest}>
      {children}
    </div>
  );
}

export const TaskList = {
  Root: TaskListRoot,
  Item: TaskListItem,
  Title: TaskListTitle,
  Description: TaskListDescription,
  Status: TaskListStatus,
};
