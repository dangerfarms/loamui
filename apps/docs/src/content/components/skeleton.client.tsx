"use client";

import { useState } from "react";
import { Avatar, Button, Skeleton } from "@loamui/core";

export function SkeletonSwapDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
      <Skeleton visible={loading}>
        <Avatar name="Ada Lovelace" />
      </Skeleton>
      <Button onClick={() => setLoading((l) => !l)}>
        {loading ? "Finish loading" : "Load again"}
      </Button>
    </div>
  );
}
