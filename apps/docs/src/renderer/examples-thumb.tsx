"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A card preview that mounts its live example only while the card is near
 * the viewport, and unmounts it again once the card has scrolled well
 * past. A hundred-odd examples rendered at once is enough work to stall a
 * renderer; kept to the dozen or so around the viewport, the index costs
 * what a dozen cards cost however long it grows. The placeholder keeps the
 * card's size, so nothing shifts as previews come and go.
 */
export function LazyThumb({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    // One viewport of margin either side: a preview mounts a screen before
    // it arrives and leaves a screen after it has gone, so a small scroll
    // back never re-renders it.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setNear(entry.isIntersecting);
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden inert>
      {near ? children : null}
    </div>
  );
}
