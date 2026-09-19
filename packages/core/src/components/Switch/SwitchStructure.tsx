import { cx } from "../../utils.js";
import type { PartProps } from "../../utils.js";

export interface SwitchRootProps extends Omit<
  PartProps<"span">,
  "defaultChecked" | "defaultValue"
> {}
export interface SwitchTrackProps extends PartProps<"span"> {}
export interface SwitchThumbProps extends PartProps<"span"> {}

function SwitchRoot({ className, ...rest }: SwitchRootProps) {
  return <span className={cx("loam-Switch-control", className)} {...rest} />;
}

function SwitchTrack({ className, ...rest }: SwitchTrackProps) {
  return <span className={cx("track", className)} aria-hidden {...rest} />;
}
function SwitchThumb({ className, ...rest }: SwitchThumbProps) {
  return <span className={cx("thumb", className)} {...rest} />;
}

export { SwitchRoot, SwitchTrack, SwitchThumb };
