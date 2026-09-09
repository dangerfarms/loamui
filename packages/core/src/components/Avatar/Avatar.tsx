"use client";

import type { ReactNode } from "react";
import { Children, useState } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";

export interface AvatarProps extends Omit<PartProps<"span">, "color"> {
  /** Image source. When set, renders an <img>. */
  src?: string;
  /** Alt text for the image (falls back to `name`; `""` when the Avatar is `aria-hidden`). */
  alt?: string;
  /** Person's name; used for initials and, if no `alt`, the image alt. */
  name?: string;
  children?: ReactNode;
}

/** The first `n` user-perceived characters of a string: graphemes, not code units. */
function graphemes(s: string, n: number): string {
  if (typeof Intl.Segmenter === "function") {
    let out = "";
    for (const { segment } of new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
      s,
    )) {
      if (n-- <= 0) break;
      out += segment;
    }
    return out;
  }
  return [...s].slice(0, n).join("");
}

/** Derive up to two uppercase initials from a name. */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!first || !last) return "";
  if (parts.length === 1) return graphemes(first, 2).toUpperCase();
  return (graphemes(first, 1) + graphemes(last, 1)).toUpperCase();
}

/** Fallback user glyph shown when there is no image or name. */
function UserGlyph() {
  return (
    <svg className="glyph" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.31-3.58-6-8-6Z" />
    </svg>
  );
}

/**
 * An image, initials, or fallback glyph representing a user.
 *
 * Sized by the public `--loam-avatar-size` property (2.5rem by default), set
 * per instance or on a region. A set of people is `Avatar.Group`.
 */
function AvatarBase({ src, alt, name, className, children, ref, ...rest }: AvatarProps) {
  // A failed image falls back to initials instead of the broken-image glyph.
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name ? initialsFrom(name) : "";
  // With no name anywhere, an avatar is decorative — hide it rather than
  // expose an unnamed role="img" to assistive technology.
  const accessibleName = name ?? alt;
  const consumerNamed = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  // A decorative avatar (aria-hidden, beside the printed name) carries an
  // empty alt, so the name is not read twice where aria-hidden is not honoured.
  const hidden = rest["aria-hidden"] === true || rest["aria-hidden"] === "true";

  let content: ReactNode;
  if (children) {
    content = children;
  } else if (src && !imageFailed) {
    content = (
      <img
        className="image"
        src={src}
        alt={hidden ? "" : (alt ?? name ?? "")}
        onError={() => setImageFailed(true)}
      />
    );
  } else if (initials) {
    content = <span className="initials">{initials}</span>;
  } else {
    content = <UserGlyph />;
  }

  return (
    <span
      ref={ref}
      className={cx("loam-Avatar", className)}
      role={src || (!accessibleName && !consumerNamed) ? undefined : "img"}
      aria-label={src ? undefined : accessibleName}
      aria-hidden={!src && !accessibleName && !consumerNamed ? true : undefined}
      {...rest}
    >
      {content}
    </span>
  );
}

export interface AvatarGroupProps extends PartProps<"ul"> {
  /**
   * How many more people there are than avatars shown. Rendered as a final
   * "+n" avatar named by `labels.more`.
   */
  more?: number;
  /** The words the overflow avatar speaks: `more(n)` names it ("5 more"). */
  labels?: {
    more?: (n: number) => string;
  };
  /** The avatars; each becomes a list item. */
  children?: ReactNode;
}

/**
 * A set of people: a list whose avatars overlap with a surface-coloured
 * ring. Each child is one item; `more` adds an overflow count at the end.
 */
function AvatarGroup({ more, labels, className, children, ref, ...rest }: AvatarGroupProps) {
  const moreLabel = labels?.more ?? ((n: number) => `${n} more`);
  return (
    <ul ref={ref} className={cx("loam-Avatar-group", className)} {...rest}>
      {Children.map(children, (child) => (child == null ? null : <li>{child}</li>))}
      {more != null && more > 0 && (
        <li>
          <AvatarBase aria-label={moreLabel(more)}>+{more}</AvatarBase>
        </li>
      )}
    </ul>
  );
}

export const Avatar = Object.assign(AvatarBase, { Group: AvatarGroup });
