import {
  BreadcrumbsBasicDemo,
  BreadcrumbsRenderDemo,
  BreadcrumbsSeparatorDemo,
} from "./breadcrumbs.client";
import type { ComponentContent } from "@/renderer/types";

const doc: ComponentContent = {
  slug: "breadcrumbs",
  lead: "The path to the current page, with each ancestor a link back up the hierarchy.",
  importLine: `import { Breadcrumbs } from "@loamui/core";`,
  demos: [
    {
      title: "Basic",
      description:
        "Items are links via href; mark the current page explicitly with current. Separators are drawn by CSS, not the DOM.",
      code: `<Breadcrumbs.Root>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
  <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
</Breadcrumbs.Root>`,
      render: () => <BreadcrumbsBasicDemo />,
    },
    {
      title: "Custom separator",
      description: "Set any glyph once on the Root; CSS draws it between items.",
      code: `<Breadcrumbs.Root separator="→">
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
  <Breadcrumbs.Item current>Website Redesign</Breadcrumbs.Item>
</Breadcrumbs.Root>`,
      render: () => <BreadcrumbsSeparatorDemo />,
    },
    {
      title: "With a router link",
      description:
        "Substitute the built-in <a> with your framework's link via render; the item's wiring (aria-current) merges onto it.",
      code: `import Link from "next/link";

<Breadcrumbs.Root>
  <Breadcrumbs.Item render={<Link href="/" />}>Home</Breadcrumbs.Item>
  <Breadcrumbs.Item render={<Link href="/settings" />}>Settings</Breadcrumbs.Item>
  <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
</Breadcrumbs.Root>`,
      render: () => <BreadcrumbsRenderDemo />,
    },
  ],
  whenToUse: [
    "On pages more than two levels deep, so users can step back up the hierarchy.",
    "When the URL structure reflects a real content hierarchy the user can navigate.",
  ],
  whenNotToUse: [
    "As a substitute for primary navigation, or on shallow sites where every page is one step from home.",
    "For linear multi-step flows, show progress instead: breadcrumbs describe structure, not position in a sequence.",
  ],
  howItWorks: [
    {
      title: "The current page ends the trail, unlinked",
      body: 'The last crumb is the page the user is on: mark it current and give it no href. It then renders as plain text with aria-current="page". A link to the page you are already on is a no-op that costs a click and misleads assistive technology. And never render breadcrumbs on the homepage: there is no path above it to show. The alternative convention (ending the trail at the parent section and letting the page\'s own heading anchor it) is equally valid; pick one and keep it consistent.',
    },
    {
      title: "A trail needs a real hierarchy",
      body: "Breadcrumbs earn their space only when the page sits at least two levels deep in a structure users can climb. One level up is a single destination: a plain 'Back to projects' link says the same thing more simply. Nor are breadcrumbs primary navigation: they show where you are, not where you can go, so they supplement the main nav rather than replace it.",
    },
    {
      title: "Truncate or omit before wrapping",
      body: "On narrow screens a long trail wraps onto several lines and pushes the content down. Prefer omitting the trail on mobile, or truncating the middle ('Home / … / Billing'). Because the consumer marks current explicitly rather than the component inferring it from position, a truncated path keeps the right item announced as the current page.",
    },
  ],
  accessibility: [
    'Renders a <nav aria-label="Breadcrumbs"> wrapping an ordered list, so assistive technology announces it as navigation with a known item count.',
    'The current page is marked aria-current="page", explicitly by the consumer, so truncated paths stay correct.',
    "Separators are CSS pseudo-content, invisible to screen readers: no aria-hidden bookkeeping in the DOM.",
  ],
  parts: [
    {
      name: "Breadcrumbs.Root",
      description: "The <nav> + list wrapper; native <nav> props are forwarded.",
      props: [
        {
          name: "separator",
          type: "string",
          default: `"/"`,
          description: "The CSS-drawn glyph between items.",
        },
      ],
    },
    {
      name: "Breadcrumbs.Item",
      description:
        "One crumb: an <a> when href is given, plain text otherwise. Native <a> props are forwarded to the link it renders.",
      props: [
        { name: "href", type: "string", description: "Renders the crumb as a link." },
        {
          name: "current",
          type: "boolean",
          description: "Marks the current page (aria-current).",
        },
        {
          name: "render",
          type: "element | (props) => node",
          description: "Substitute the element (e.g. render={<Link href=…/>}).",
        },
      ],
    },
  ],
};

export default doc;
