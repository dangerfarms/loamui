"use client";

import { Badge } from "@loamui/core";
import type { CSSProperties } from "react";

export function BadgeDotDemo() {
  return (
    <>
      <span style={{ "--loam-context": "success" } as CSSProperties}>
        <Badge>
          <Badge.Dot /> Live
        </Badge>
      </span>
      <span style={{ "--loam-context": "warning" } as CSSProperties}>
        <Badge>
          <Badge.Dot /> Pending
        </Badge>
      </span>
      <span style={{ "--loam-context": "danger" } as CSSProperties}>
        <Badge>
          <Badge.Dot /> Offline
        </Badge>
      </span>
      <Badge>
        <Badge.Dot /> Draft
      </Badge>
    </>
  );
}
