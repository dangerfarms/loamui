import type { ComponentProps, JSX } from "react";

/**
 * The props of a part that renders one native element: every attribute of
 * that element plus `ref` as an ordinary prop (React 19). Use it instead of
 * `HTMLAttributes<T>`, which has never carried `ref`.
 *
 * ```ts
 * export interface FieldRootProps extends PartProps<"div"> { … }
 * ```
 */
export type PartProps<E extends keyof JSX.IntrinsicElements> = ComponentProps<E>;

/** Tiny classnames joiner — no dependency needed. */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}

/** Shared size type used across LoamUI controls. */
export type LoamUISize = "sm" | "md" | "lg";

/** Border-radius token keys shared across LoamUI controls. */
