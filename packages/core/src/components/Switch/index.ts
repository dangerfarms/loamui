// The assembly deliberately carries no "use client": composing here, outside
// the boundary, keeps each part its own client reference, so `Switch.Control`
// resolves in a server module. Built inside the boundary the whole component
// would cross as one opaque reference and every part would be undefined.
import { SwitchControl } from "./Switch.js";
import { SwitchLabelled } from "./SwitchLabelled.js";
import { SwitchRoot, SwitchTrack, SwitchThumb } from "./SwitchStructure.js";

/** Callable for the common case, with the anatomy attached for the rest. */
export const Switch = Object.assign(SwitchLabelled, {
  /** The bare toggle, for composing inside a `Field.Label` of your own. */
  Control: SwitchControl,
  Root: SwitchRoot,
  Track: SwitchTrack,
  Thumb: SwitchThumb,
});

export type { SwitchProps } from "./SwitchLabelled.js";
export type { SwitchControlProps } from "./Switch.js";
export type { SwitchRootProps, SwitchTrackProps, SwitchThumbProps } from "./SwitchStructure.js";
