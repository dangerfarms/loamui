import type { HTMLAttributes, ReactNode, Ref } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

export interface PersonRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element: `render={<li />}` inside a list. The
   * part's classes and attributes merge onto the element it renders, the
   * same contract as every core part.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * One person: an avatar over a name and a role.
 *
 * The unit is the person. It stands on its own beside a quote or in a
 * Card, and a team is a grid you write with each person rendered as a
 * `li`. The avatar is the core `Avatar`, placed first by you: give it the
 * person's `name` for the initials and `aria-hidden`, because the name is
 * printed beneath it and assistive technology should hear it once.
 *
 * ```tsx
 * <Person.Root>
 *   <Avatar name="Imogen Hartley" aria-hidden />
 *   <Person.Name>Imogen Hartley</Person.Name>
 *   <Person.Role>Founder</Person.Role>
 * </Person.Root>
 * ```
 */
function PersonRoot({ render, className, children, ref, ...rest }: PersonRootProps) {
  const props = { ref, className: cx("loam-Person", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <div {...(props as HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> })} />;
}

export interface PersonNameProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Render as a different heading, or a `p` where the name is not a heading. */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The person's name. An `h3` by default; pass `render={<p />}` where it is not a heading. */
function PersonName({ render, className, children, ref, ...rest }: PersonNameProps) {
  if (render) {
    return (
      <>{renderWithProps(render, { ref, className: cx("name", className), children, ...rest })}</>
    );
  }
  return (
    <h3 ref={ref} className={cx("name", className)} {...rest}>
      {children}
    </h3>
  );
}

export interface PersonRoleProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** What the person does, a small muted line. */
function PersonRole({ className, children, ref, ...rest }: PersonRoleProps) {
  return (
    <p ref={ref} className={cx("role", className)} {...rest}>
      {children}
    </p>
  );
}

export const Person = {
  Root: PersonRoot,
  Name: PersonName,
  Role: PersonRole,
};
