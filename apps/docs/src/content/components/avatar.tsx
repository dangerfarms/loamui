import { Avatar, AvatarGroup } from "@farmui/core";
import type { CSSProperties } from "react";
import type { ComponentContent } from "@/renderer/types";

const IMG =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces";

const doc: ComponentContent = {
  slug: "avatar",
  lead: "An image, initials, or fallback glyph representing a user.",
  importLine: `import { Avatar, AvatarGroup } from "@farmui/core";`,
  demos: [
    {
      title: "Image",
      description: "Pass a src to render a cover-fit image.",
      code: `<Avatar src="/user.jpg" name="Ada Lovelace" />`,
      render: () => <Avatar src={IMG} name="Ada Lovelace" />,
    },
    {
      title: "Initials",
      description:
        "With no image, initials are derived from name. There is no color prop: the initials background answers the surrounding --fui-context region (a style query is answered by ancestors, never by the declaring element itself), exactly like Badge. Wrap a single avatar in a one-element span, or let it inherit from a larger region. See the Contextualism guide.",
      code: `<Avatar name="Jane Doe" />
<span style={{ "--fui-context": "info" }}><Avatar name="Amara Okafor" /></span>
<span style={{ "--fui-context": "success" }}><Avatar name="Sam Reed" /></span>
<Avatar />`,
      render: () => (
        <>
          <Avatar name="Jane Doe" />
          <span style={{ "--fui-context": "info" } as CSSProperties}>
            <Avatar name="Amara Okafor" />
          </span>
          <span style={{ "--fui-context": "success" } as CSSProperties}>
            <Avatar name="Sam Reed" />
          </span>
          <Avatar />
        </>
      ),
    },
    {
      title: "Group",
      description: "AvatarGroup overlaps children with a surface-colored ring.",
      code: `<AvatarGroup>
  <Avatar name="Jane Doe" />
  <Avatar name="Sam Reed" />
  <Avatar name="Amara Okafor" />
  <Avatar name="+5" aria-label="5 more people" />
</AvatarGroup>`,
      render: () => (
        <AvatarGroup>
          <Avatar name="Jane Doe" />
          <Avatar name="Sam Reed" />
          <Avatar name="Amara Okafor" />
          <Avatar name="+5" aria-label="5 more people" />
        </AvatarGroup>
      ),
    },
  ],
  whenToUse: [
    "To identify a person next to something they did: a comment, an assignee, a row in a member list.",
    "With AvatarGroup, to show a set of participants compactly where listing every name would not fit.",
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
    "When the name is visibly printed next to the avatar, pass aria-hidden so assistive tech does not read the same name twice.",
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
      description: "Alt text for the image (falls back to name).",
    },
    {
      name: "name",
      type: "string",
      description: "Person's name; used for initials and as image alt.",
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
      name: "AvatarGroup",
      description:
        "Overlaps a row of avatars with a surface-coloured ring; all native <div> props are forwarded.",
    },
  ],
  contextual: true,
};

export default doc;
