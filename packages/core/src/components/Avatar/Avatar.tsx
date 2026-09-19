"use client";

import { Children, createContext, useMemo, useState } from "react";
import { useRequiredContext } from "../../context.js";
import { cx } from "../../utils.js";
import type { PartProps } from "../../utils.js";

export type AvatarImageStatus = "loading" | "loaded" | "error";
const AvatarContext = createContext<{
  status: AvatarImageStatus;
  setStatus: (status: AvatarImageStatus) => void;
} | null>(null);

export function useAvatarContext(part: string) {
  return useRequiredContext(AvatarContext, part, "Avatar.Root");
}

export interface AvatarRootProps extends Omit<PartProps<"span">, "color"> {}

/** A person represented by an Image and explicit Fallback content. */
export function AvatarRoot({ className, children, ref, ...rest }: AvatarRootProps) {
  const [status, setStatus] = useState<AvatarImageStatus>("loading");
  const context = useMemo(() => ({ status, setStatus }), [status]);
  return (
    <AvatarContext value={context}>
      <span ref={ref} className={cx("loam-Avatar", className)} {...rest}>
        {children}
      </span>
    </AvatarContext>
  );
}

export interface AvatarFallbackProps extends PartProps<"span"> {}

/** Visible until the image loads, and after a load failure. */
export function AvatarFallback({ className, ref, ...rest }: AvatarFallbackProps) {
  const { status } = useAvatarContext("Avatar.Fallback");
  return (
    <span ref={ref} className={cx("fallback", className)} {...rest} hidden={status === "loaded"} />
  );
}

export interface AvatarGroupProps extends PartProps<"ul"> {}

/** An overlapping list. Compose an additional Avatar for an overflow count. */
export function AvatarGroup({ className, children, ref, ...rest }: AvatarGroupProps) {
  return (
    <ul ref={ref} role="list" className={cx("loam-Avatar-group", className)} {...rest}>
      {Children.map(children, (child) => (child == null ? null : <li>{child}</li>))}
    </ul>
  );
}
