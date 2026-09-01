import { Skeleton } from "@loamui/core";
import type { ComponentContent } from "@/renderer/types";
import { SkeletonSwapDemo } from "./skeleton.client";

const doc: ComponentContent = {
  slug: "skeleton",
  lead: "An animated placeholder shown while content loads.",
  importLine: `import { Skeleton } from "@loamui/core";`,
  demos: [
    {
      title: "Basic lines",
      description:
        "Stack skeletons to stand in for text while it loads. A bare Skeleton is one line tall (1lh) in the local typography, so it needs no height.",
      code: `<Skeleton />
<Skeleton width="80%" />
<Skeleton width="60%" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.5rem",
            inlineSize: "100%",
            maxInlineSize: "22rem",
          }}
        >
          <Skeleton />
          <Skeleton width="80%" />
          <Skeleton width="60%" />
        </div>
      ),
    },
    {
      title: "Circle + lines",
      description: "An avatar-and-text placeholder for a list item.",
      code: `<div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
  <Skeleton circle width="2.5rem" />
  <div style={{ display: "grid", gap: "0.4rem", flex: 1 }}>
    <Skeleton height="0.75rem" width="40%" />
    <Skeleton height="0.75rem" width="70%" />
  </div>
</div>`,
      render: () => (
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            inlineSize: "100%",
            maxInlineSize: "22rem",
          }}
        >
          <Skeleton circle width="2.5rem" />
          <div style={{ display: "grid", gap: "0.4rem", flex: 1 }}>
            <Skeleton height="0.75rem" width="40%" />
            <Skeleton height="0.75rem" width="70%" />
          </div>
        </div>
      ),
    },
    {
      title: "Custom sizes",
      description:
        "Use width and height for cards or thumbnails; shape comes from --loam-skeleton-radius or circle.",
      code: `<Skeleton
  width="8rem"
  height="8rem"
  style={{ "--loam-skeleton-radius": "var(--loam-radius-lg)" }}
/>
<Skeleton width="8rem" height="8rem" circle />`,
      render: () => (
        <>
          <Skeleton
            width="8rem"
            height="8rem"
            style={{ "--loam-skeleton-radius": "var(--loam-radius-lg)" } as React.CSSProperties}
          />
          <Skeleton width="8rem" height="8rem" circle />
        </>
      ),
    },
    {
      title: "Wrap real content",
      description:
        "Wrapped children size the box, so the placeholder matches the coming layout with no size props; flip visible when the data lands.",
      code: `<Skeleton visible={loading}>
  <Avatar name="Ada Lovelace" />
</Skeleton>`,
      render: () => <SkeletonSwapDemo />,
    },
  ],
  whenToUse: [
    "While loading content whose shape you already know: the skeleton mirrors the coming layout, so the swap to real content is a fill-in, not a rearrangement.",
    "To hold the loaded content's space open and avoid layout shift while data arrives.",
  ],
  whenNotToUse: [
    "When you cannot predict what the loaded layout looks like. A skeleton that does not match what replaces it makes the swap more jarring than showing nothing, and perceived performance gets worse, not better. Use Loader.",
    "For an operation that is not producing visible content in that spot (saving, deleting, background work). A skeleton promises content that never comes; use Loader next to the affected control.",
  ],
  howItWorks: [
    {
      title: "Match the shape you are loading",
      body: "Build the skeleton from the loaded UI's real dimensions: the avatar's diameter, the text's line heights, the thumbnail's radius. The entire benefit of a skeleton is that the eye has already parsed the layout before the content lands; a placeholder of a different shape spends that benefit and charges interest.",
    },
    {
      title: "Swap in place with visible",
      body: "Wrap the real content and flip visible to false when it is ready. The wrapped children size the placeholder themselves, so it mirrors the coming layout without declared dimensions; width and height exist for bare placeholders, where the absent content cannot be measured. While the skeleton is visible, children are hidden from pointer, selection and assistive tech, so nothing half-loaded leaks out.",
    },
  ],
  accessibility: [
    "The root renders aria-hidden: skeletons are never announced. Screen-reader users hear the real content when it arrives instead of a stream of meaningless placeholders.",
    'Because skeletons are silent, announce the wait elsewhere if it needs announcing: a Loader (which renders role="status") or a visually hidden status message.',
    "The moving shimmer is gated behind prefers-reduced-motion: no-preference. Reduced-motion users get the same placeholder with a static gradient, with no override needed because the motion is opt-in.",
    "While visible, wrapped children are also unreachable by pointer and text selection (pointer-events: none, user-select: none), so nothing interactive is exposed before it is real.",
  ],
  props: [
    {
      name: "width",
      type: "number | string",
      default: `"100%"`,
      description:
        "Inline size for a bare placeholder (number → px, or any CSS length). Wrapped content sizes itself.",
    },
    {
      name: "height",
      type: "number | string",
      default: `"1lh"`,
      description: "Block size (number → px, or any CSS length).",
    },
    {
      name: "circle",
      type: "boolean",
      description: "Render as a circle (equal width/height, full radius).",
    },
    {
      name: "visible",
      type: "boolean",
      default: "true",
      description: "When false, render children instead of the placeholder.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Real content, shown once visible is false.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
  cssProps: [
    {
      name: "--loam-skeleton-radius",
      syntax: "CSS length",
      default: "var(--loam-radius-md)",
      description: "Corner rounding of the placeholder; set per instance or on a region.",
    },
  ],
};

export default doc;
