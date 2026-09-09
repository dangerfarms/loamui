import { Avatar } from "@loamui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";
import { Example } from "@/renderer/Example";
import { AvatarGroupDemo } from "./avatar.client";

const IMG =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces";

const doc: ComponentContent = {
  slug: "avatar",
  lead: "An image, initials, or fallback glyph representing a user.",
  importLine: `import { Avatar } from "@loamui/core";`,
  demos: [
    {
      title: "Image",
      description: "Pass a src to render a cover-fit image.",
      code: `<Avatar src="${IMG}" name="Ada Lovelace" />`,
      render: () => <Avatar src={IMG} name="Ada Lovelace" />,
    },
    {
      title: "Initials",
      description:
        "With no image, initials are derived from name. There is no colour prop: declare --loam-context on a one-element wrapper region (see the Contextualism guide) and the status colours follow, exactly like Badge; or let it inherit from a larger region.",
      code: `<Avatar name="Jane Doe" />
<span style={{ "--loam-context": "info" }}><Avatar name="Amara Okafor" /></span>
<span style={{ "--loam-context": "success" }}><Avatar name="Sam Reed" /></span>`,
      render: () => (
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "start" }}>
          <Example label="Initials from the name">
            <Avatar name="Jane Doe" />
          </Example>
          <Example label="Background from an info region">
            <span style={{ "--loam-context": "info" } as CSSProperties}>
              <Avatar name="Amara Okafor" />
            </span>
          </Example>
          <Example label="Background from a success region">
            <span style={{ "--loam-context": "success" } as CSSProperties}>
              <Avatar name="Sam Reed" />
            </span>
          </Example>
        </div>
      ),
    },
    {
      title: "Fallback glyph",
      description:
        "A bare Avatar with no name from any source renders a decorative person glyph. It carries no identity: the glyph is marked aria-hidden, so give an avatar a name whenever it stands in for a specific person.",
      code: `<Avatar />`,
      render: () => <Avatar />,
    },
    {
      title: "Size",
      description:
        "There is no size prop. The public --loam-avatar-size property sets the diameter per instance or on a region, and the initials follow it.",
      code: `<Avatar name="Jane Doe" style={{ "--loam-avatar-size": "1.5rem" }} />
<Avatar name="Jane Doe" />
<Avatar name="Jane Doe" style={{ "--loam-avatar-size": "4rem" }} />`,
      render: () => (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar name="Jane Doe" style={{ "--loam-avatar-size": "1.5rem" } as CSSProperties} />
          <Avatar name="Jane Doe" />
          <Avatar name="Jane Doe" style={{ "--loam-avatar-size": "4rem" } as CSSProperties} />
        </div>
      ),
    },
    {
      title: "Group",
      description:
        "Avatar.Group is a list: each avatar is an item, overlapped and ringed in the surface colour, and more adds the overflow count as a final avatar named by labels.more.",
      code: `<Avatar.Group more={5} labels={{ more: (n) => \`\${n} more people\` }}>
  <Avatar name="Jane Doe" />
  <Avatar name="Sam Reed" />
  <Avatar name="Amara Okafor" />
</Avatar.Group>`,
      render: () => <AvatarGroupDemo />,
    },
  ],
  whenToUse: [
    "To identify a person next to something they did: a comment, an assignee, a row in a member list.",
    "With Avatar.Group, to show a set of participants compactly where listing every name would not fit.",
  ],
  whenNotToUse: [
    "For arbitrary images. The image is cover-cropped into a fixed square or circle, which is right for faces and wrong for logos, screenshots or product photos; use a plain <img>.",
    "As a click target. Avatar renders a <span>; if it should open a profile, wrap it in a real link or button rather than adding onClick to it.",
  ],
  howItWorks: [
    {
      title: "The name is the API",
      body: "Pass the person's full name and everything derives from it: the initials (first and last word, uppercased), the image alt when you give a src, and the aria-label when you do not. One prop keeps what sighted users see and what screen readers hear describing the same person.",
    },
    {
      title: "Identifying or decorative: decide which",
      body: "An avatar identifies when it is the only place the person appears; it decorates when their name is printed right beside it. A decorative avatar should be aria-hidden so the name is not announced twice; an identifying one must have a name (or alt), never neither.",
    },
  ],
  accessibility: [
    "With src, a real <img> is rendered and its alt falls back to name: pass the name and the image announces the person.",
    'Without an image, the root becomes role="img" with aria-label from name (or alt): screen readers hear the full name (“Jane Doe”), never the raw initials (“JD”).',
    "A bare <Avatar /> with no name from any source is treated as decorative automatically (aria-hidden, no role). An identifying avatar must be given a name, an alt, or an aria-label.",
    "When the name is visibly printed next to the avatar, pass aria-hidden so assistive tech does not read the same name twice; the image's alt is then empty as well, so the name is not read where aria-hidden is not honoured.",
    'The fallback glyph is aria-hidden and focusable="false": it is decoration; identity always comes from the name/alt wiring above.',
  ],
  props: [
    {
      name: "src",
      type: "string",
      description: "Image source. When set, renders an <img>.",
    },
    {
      name: "alt",
      type: "string",
      description:
        "Alt text for the image (falls back to name). Empty when the Avatar is aria-hidden, so a decorative image is not described.",
    },
    {
      name: "name",
      type: "string",
      description:
        "Person's name; used for initials (the first grapheme of the first and last words) and as image alt.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Custom content; overrides the derived image/initials/glyph.",
    },
    {
      name: "...others",
      type: "SpanHTMLAttributes",
      description: "All native <span> props are forwarded.",
    },
  ],
  parts: [
    {
      name: "Avatar.Group",
      description:
        'A <ul role="list"> of avatars, each child an item, overlapped with a surface-coloured ring; all native <ul> props are forwarded.',
      props: [
        {
          name: "more",
          type: "number",
          description: "How many more people than avatars shown; rendered as a final +n avatar.",
        },
        {
          name: "labels",
          type: "{ more?: (n: number) => string }",
          default: "(n) => `${n} more`",
          description: "The overflow avatar's accessible name.",
        },
      ],
    },
  ],
  cssProps: [
    {
      name: "--loam-avatar-size",
      syntax: "CSS length",
      default: "2.5rem",
      description: "The diameter; set per instance or on a region.",
    },
    {
      name: "--loam-avatar-overlap",
      syntax: "CSS length",
      default: "0.5rem",
      description: "How far each item in an Avatar.Group overlaps the one before.",
    },
  ],
  contextual: true,
};

export default doc;
