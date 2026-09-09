"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A card preview that mounts its live example only once the card is near
 * the viewport. Sixty-odd examples rendered at once, two of them holding
 * third-party frames, is enough work to stall a renderer; a placeholder
 * until scrolled to costs nothing and looks the same at a glance.
 */
export function LazyThumb({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <div ref={ref} className={className} aria-hidden inert>
      {near ? children : null}
    </div>
  );
}
