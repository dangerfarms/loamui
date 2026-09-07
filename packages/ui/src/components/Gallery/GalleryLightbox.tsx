"use client";

import { useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import { Modal, cx } from "@loamui/core";

export interface GalleryLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The full-size image: where the link goes, and what the lightbox shows. */
  href: string;
  /** Label of the lightbox's close button. @default "Close" */
  closeLabel?: string;
  /** The thumbnail: an `<img>` with alt text, or a framework image that renders one. */
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * The link around the thumbnail. Its `href` is the full-size image, so
 * without JavaScript (or with a modifier key held) it is an ordinary link
 * to that image. Once hydrated, a plain click opens the same image in a
 * lightbox instead: a core Modal, so the native dialog supplies the top
 * layer, the backdrop, Escape and focus restore to the link.
 */
export function GalleryLink({
  href,
  closeLabel = "Close",
  className,
  children,
  onClick,
  ref,
  ...rest
}: GalleryLinkProps) {
  const [open, setOpen] = useState(false);
  // The thumbnail's alt, read on the first open and reused for the large
  // image; null until then, so no full-size image is fetched for a
  // lightbox nobody has opened.
  const [alt, setAlt] = useState<string | null>(null);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    // A modified click (new tab, new window, download) keeps the link's own
    // behaviour, as it would on any link.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    setAlt(event.currentTarget.querySelector("img")?.alt ?? "");
    setOpen(true);
  }

  return (
    <>
      <a
        ref={ref}
        href={href}
        className={cx("link", className)}
        data-popup-open={open || undefined}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Popup aria-label={alt || undefined}>
          <div className="loam-Gallery-lightbox">
            {alt !== null && <img className="full" src={href} alt={alt} />}
            <Modal.Close>{closeLabel}</Modal.Close>
          </div>
        </Modal.Popup>
      </Modal.Root>
    </>
  );
}
