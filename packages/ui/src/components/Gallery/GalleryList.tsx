"use client";

import { createContext, useContext } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx, renderWithProps } from "@loamui/core";
import type { RenderProp } from "@loamui/core";

/** True inside a `Gallery.Root`, where an Item is a list item. */
const ListContext = createContext(false);

export interface GalleryRootProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/**
 * The optional grid: a list, so assistive technology announces how many
 * images there are. As many columns as fit at 12rem; override the columns
 * in your own CSS if the page needs different ones.
 */
export function GalleryRoot({ className, children, ref, ...rest }: GalleryRootProps) {
  return (
    // role="list" is not redundant: Safari drops a ul's list semantics once
    // list-style is none, and the count is the point of the list.
    <ul ref={ref} role="list" className={cx("loam-Gallery", className)} {...rest}>
      <ListContext value>{children}</ListContext>
    </ul>
  );
}

export interface GalleryItemProps extends HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element. The part's classes and attributes merge
   * onto the element it renders, the same contract as every core part; the
   * children go straight in, so a `figure` of your own is yours to write.
   */
  render?: RenderProp<Record<string, unknown>>;
  /** A `Gallery.Link` around your `<img>`, then an optional `Gallery.Caption`. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * One image: a figure holding the link and its caption. Inside a Root the
 * item is the list item, and the figure is an inner element it renders, so
 * a class, a style or a ref lands on the element the grid places; on its
 * own it is just the figure, so it is valid HTML wherever a figure is.
 */
export function GalleryItem({ render, className, children, ref, ...rest }: GalleryItemProps) {
  const inList = useContext(ListContext);
  const props = { className: cx("loam-Gallery-item", className), ...rest };
  if (render) return <>{renderWithProps(render, { ref, ...props, children })}</>;
  if (inList) {
    return (
      <li ref={ref as Ref<HTMLLIElement>} {...props}>
        <figure>{children}</figure>
      </li>
    );
  }
  return (
    <figure ref={ref} {...props}>
      {children}
    </figure>
  );
}
