import type { CSSProperties, HTMLAttributes, Ref } from "react";
import { cx, type LoamUISize } from "../../utils";

export interface LoaderProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /**
   * Overall size — a token or an explicit pixel number. When omitted the
   * size comes from context: 1.5rem standalone, or the composing
   * component's answer (a Button sizes it at 1em, like its icons).
   */
  size?: LoamUISize | number;
  /** Accessible label announced to assistive tech. @default "Loading" */
  label?: string;
  ref?: Ref<HTMLSpanElement>;
}

const sizeVar: Record<LoamUISize, string> = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2.25rem",
};

/**
 * An animated indicator for pending, indeterminate work.
 *
 * Coloured by the brand token, so a `--loam-context` region recolours it
 * with no prop; the parts draw with `currentColor`, so a plain `color:`
 * declaration on the loader (or an ancestor's channel) overrides.
 */
export function Loader({ size, label = "Loading", className, style, ref, ...rest }: LoaderProps) {
  // Only an explicit size becomes an inline declaration — an inline var
  // would out-rank the context sizing a composing component provides.
  const vars = {
    ...(size !== undefined && {
      "--_size": typeof size === "number" ? `${size}px` : sizeVar[size],
    }),
    ...style,
  } as CSSProperties;

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx("loam-Loader", className)}
      style={vars}
      {...rest}
    >
      <span className="spinner" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}
