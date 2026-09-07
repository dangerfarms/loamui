import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Render as a different element: `render={<li />}` in a list,
   * `render={<label />}` when the whole surface is a control's label. The
   * Card's class and attributes merge onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A surface container that groups related content. One fixed look — a
 * quiet bordered surface; there are no styling props.
 */
export function Card({ render, className, children, ref, ...rest }: CardProps) {
  if (render) {
    return (
      <>
        {renderWithProps(render, { ref, className: cx("loam-Card", className), children, ...rest })}
      </>
    );
  }
  return (
    <div ref={ref} className={cx("loam-Card", className)} {...rest}>
      {children}
    </div>
  );
}
