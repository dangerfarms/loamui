"use client";

import { useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import { Modal, cx } from "@loamui/core";

export interface GalleryLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The full-size image: where the link goes, and what the lightbox shows. */
  href: string;
  /**
   * The lightbox dialog's accessible name. Defaults to the figure's
   * caption, then the thumbnail's `alt`, then "Image", so the dialog is
   * never unnamed.
   */
  label?: string;
  /** Label of the lightbox's close button. @default "Close" */
  closeLabel?: string;
  /** The thumbnail: an `<img>` with alt text, or a framework image that renders one. */
  children?: ReactNode;
  ref?: Ref<HTMLAnchorElement>;
}

interface Opened {
  /** The thumbnail's alt, reused for the large image. */
  alt: string;
  /** What the dialog is called. */
  name: string;
}

/**
 * The link around the thumbnail. Its `href` is the full-size image, so
 * without JavaScript (or with a modifier key held) it is an ordinary link
 * to that image. Once hydrated, a plain click opens the same image in a
 * lightbox instead: a core Modal, so the native dialog supplies the top
 * layer, the backdrop, Escape and focus restore to the link. The dialog
 * is named by the figure's caption, or failing that the image's alt, so
 * the reader hears what opened; the caption itself is not repeated inside.
 */
export function GalleryLink({
  href,
  label,
  closeLabel = "Close",
  className,
  children,
  onClick,
  ref,
  ...rest
}: GalleryLinkProps) {
  const [open, setOpen] = useState(false);
  // Read from the DOM on the first open and kept; null until then, so no
  // full-size image is fetched for a lightbox nobody has opened.
  const [opened, setOpened] = useState<Opened | null>(null);

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
    const link = event.currentTarget;
    const alt = link.querySelector("img")?.alt ?? "";
    const caption = link.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
    setOpened({ alt, name: label ?? (caption || alt || "Image") });
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
        <Modal.Popup aria-label={opened?.name}>
          <div className="loam-Gallery-lightbox">
            {opened && <img className="full" src={href} alt={opened.alt} />}
            <Modal.Close>{closeLabel}</Modal.Close>
          </div>
        </Modal.Popup>
      </Modal.Root>
    </>
  );
}
