import type { ReactNode } from "react";
import { cx } from "../../utils.js";
import type { PartProps } from "../../utils.js";
import { AvatarFallback, AvatarGroup, AvatarRoot } from "./Avatar.js";
import { AvatarImage } from "./AvatarImage.js";

/**
 * The first grapheme cluster of `n` characters, so an emoji or a combining
 * accent counts once rather than splitting into its code units.
 */
function graphemes(value: string, count: number): string {
  if (typeof Intl.Segmenter === "function") {
    let out = "";
    for (const { segment } of new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    }).segment(value)) {
      if (count-- <= 0) break;
      out += segment;
    }
    return out;
  }
  return [...value].slice(0, count).join("");
}

/** "Imogen Hartley" → "IH"; a single name gives its first two characters. */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!first || !last) return "";
  if (parts.length === 1) return graphemes(first, 2).toUpperCase();
  return (graphemes(first, 1) + graphemes(last, 1)).toUpperCase();
}

/** A person with no picture and no name: a glyph, never a broken image. */
function UserGlyph() {
  return (
    <svg className="glyph" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" fill="currentColor" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" fill="currentColor" />
    </svg>
  );
}

export interface AvatarProps extends Omit<PartProps<"span">, "color"> {
  /** The picture. Falls back to initials, then a glyph, if it fails to load. */
  src?: string;
  /** Alternative text for the picture; defaults to `name`. */
  alt?: string;
  /** The person's name, used for the initials and the accessible name. */
  name?: string;
  /** Your own content, in place of the picture and initials. */
  children?: ReactNode;
}

/**
 * A person, in one tag: `<Avatar name="Imogen Hartley" />`.
 *
 * This is the common case composed from the parts below — a picture with
 * initials behind it. Reach for `Avatar.Root`, `Avatar.Image` and
 * `Avatar.Fallback` directly when you need to control what shows while the
 * picture loads, or to put something other than initials behind it.
 *
 * Naming follows what the avatar is for. Beside a printed name it is
 * decoration, so pass `aria-hidden` and the reader hears the person once;
 * standing alone it takes the name, so it is announced.
 */
export function AvatarBase({ src, alt, name, className, children, ref, ...rest }: AvatarProps) {
  const initials = name ? initialsFrom(name) : "";
  const accessibleName = name ?? alt;
  const namedByConsumer = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  const hidden = rest["aria-hidden"] === true || rest["aria-hidden"] === "true";
  // With no name anywhere, the avatar says nothing a reader needs: hide it
  // rather than expose an unnamed image.
  const decorative = !src && !accessibleName && !namedByConsumer;

  return (
    <AvatarRoot
      ref={ref}
      className={cx(className)}
      role={src || decorative ? undefined : "img"}
      aria-label={src ? undefined : accessibleName}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    >
      {children ?? (
        <>
          {src && <AvatarImage src={src} alt={hidden ? "" : (alt ?? name ?? "")} />}
          <AvatarFallback>{initials || <UserGlyph />}</AvatarFallback>
        </>
      )}
    </AvatarRoot>
  );
}

/**
 * Callable for the common case, with the parts attached for the rest:
 * `<Avatar name="…" />`, or `Avatar.Root` + `Avatar.Image` + `Avatar.Fallback`
 * when the loading state matters. `Avatar.Group` overlaps a list of them.
 */
export const Avatar = Object.assign(AvatarBase, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Group: AvatarGroup,
});
