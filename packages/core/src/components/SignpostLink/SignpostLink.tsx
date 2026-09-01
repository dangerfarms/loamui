import { cloneElement, isValidElement } from "react";
import type { AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

export interface SignpostLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  /**
   * Substitute the built-in `<a>` — e.g. a router link:
   * `render={<Link href="/apply">Start your application</Link>}`. The
   * label may live on either element; the arrow anatomy wraps it.
   */
  render?: RenderProp<Record<string, unknown>>;
  ref?: Ref<HTMLAnchorElement>;
}

function anatomy(label: ReactNode) {
  return (
    <>
      <span className="icon" aria-hidden>
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="label">{label}</span>
    </>
  );
}

/**
 * A prominent navigational link: the signpost to a task's starting point.
 *
 * ```tsx
 * <SignpostLink href="/apply">Start your application</SignpostLink>
 * ```
 *
 * It is a real `<a>` — navigation, never an action. Where a design wants a
 * button-sized call-to-action that goes somewhere, this is the component;
 * a `Button` is for doing, not going. The arrow is decoration
 * (`aria-hidden`), so assistive technology hears only the label and the
 * link role.
 */
export function SignpostLink({ render, className, children, ref, ...rest }: SignpostLinkProps) {
  if (render) {
    const wiring = { ref, className: cx("loam-SignpostLink", className), ...rest };
    if (isValidElement<Record<string, unknown>>(render)) {
      // The label may arrive on either element; re-cloning wraps it in the
      // arrow anatomy so element children can't bypass the markup.
      const label = children ?? (render.props.children as ReactNode);
      return <>{renderWithProps(cloneElement(render, {}, anatomy(label)), wiring)}</>;
    }
    return <>{renderWithProps(render, { ...wiring, children: anatomy(children) })}</>;
  }
  return (
    <a ref={ref} className={cx("loam-SignpostLink", className)} {...rest}>
      {anatomy(children)}
    </a>
  );
}
