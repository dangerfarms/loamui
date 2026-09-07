"use client";

import { createContext } from "react";

/**
 * The Handle tells the Root where the reveal is, 0 to 100; the Root writes
 * it onto itself as `--loam-comparison-position`.
 */
export const PositionContext = createContext<((position: number) => void) | null>(null);
