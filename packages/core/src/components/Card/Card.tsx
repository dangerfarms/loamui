import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A surface container that groups related content. One fixed look — a
 * quiet bordered surface; there are no styling props.
 */
export function Card({ className, children, ref, ...rest }: CardProps) {
  return (
    <div ref={ref} className={cx("loam-Card", className)} {...rest}>
      {children}
    </div>
  );
}
