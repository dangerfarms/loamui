/** Tiny classnames joiner — no dependency needed. */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}

/** Shared size type used across LoamUI controls. */
export type LoamUISize = "sm" | "md" | "lg";

/** Border-radius token keys shared across LoamUI controls. */
