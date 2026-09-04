import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface TeamRootProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * A team section: a grid of members, each an avatar over a name and a role.
 *
 * The avatar is the core `Avatar`, placed first in each member by you.
 * Give it the person's `name` for the initials and `aria-hidden`, because
 * the name is printed beside it and assistive technology should hear it
 * once.
 *
 * ```tsx
 * <Team.Root>
 *   <Team.Grid>
 *     <Team.Member>
 *       <Avatar name="Imogen Hartley" aria-hidden />
 *       <Team.Name>Imogen Hartley</Team.Name>
 *       <Team.Role>Founder</Team.Role>
 *     </Team.Member>
 *   </Team.Grid>
 * </Team.Root>
 * ```
 */
function TeamRoot({ className, children, ref, ...rest }: TeamRootProps) {
  return (
    <section ref={ref} className={cx("loam-Team", className)} {...rest}>
      {children}
    </section>
  );
}

export interface TeamGridProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/** The list of members: an auto-fit grid of columns at least 12rem wide. */
function TeamGrid({ className, children, ref, ...rest }: TeamGridProps) {
  return (
    <ul ref={ref} className={cx("grid", className)} {...rest}>
      {children}
    </ul>
  );
}

export interface TeamMemberProps extends HTMLAttributes<HTMLLIElement> {
  /** An `Avatar` first, then a `Team.Name` and a `Team.Role`. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One member: a centred column of avatar, name and role. */
function TeamMember({ className, children, ref, ...rest }: TeamMemberProps) {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
}

export interface TeamNameProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/** The person's name, an h3. */
function TeamName({ className, children, ref, ...rest }: TeamNameProps) {
  return (
    <h3 ref={ref} className={cx("name", className)} {...rest}>
      {children}
    </h3>
  );
}

export interface TeamRoleProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  ref?: Ref<HTMLParagraphElement>;
}

/** What the person does, a small muted line. */
function TeamRole({ className, children, ref, ...rest }: TeamRoleProps) {
  return (
    <p ref={ref} className={cx("role", className)} {...rest}>
      {children}
    </p>
  );
}

export const Team = {
  Root: TeamRoot,
  Grid: TeamGrid,
  Member: TeamMember,
  Name: TeamName,
  Role: TeamRole,
};
