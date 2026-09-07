import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

export interface CardProps extends PartProps<"div"> {
  /**
   * Render as a different element: `render={<li />}` in a list,
   * `render={<label />}` when the whole surface is a control's label. The
   * Card's class and attributes merge onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
}

/**
 * A surface container that groups related content. One fixed look — a
 * quiet bordered surface; there are no styling props. It is the one surface
 * primitive: compositions (a product card, a testimonial) are built on it
 * rather than restyling it.
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
