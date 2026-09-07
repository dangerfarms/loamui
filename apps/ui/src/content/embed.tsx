"use client";

import { Embed } from "@loamui/ui";
import type { Composition } from "./types";

const embed: Composition = {
  slug: "embed",
  name: "Embed",
  category: "Page sections",
  description:
    "A third-party frame in the page: a video, a map, sized before it loads and named for assistive technology.",
  lead: "The unit is the figure. The iframe's title is required by the type, because it is the only name a screen reader has for the frame; it loads lazily so a map below the fold costs nothing until it is near; it sends a strict-origin-when-cross-origin referrer and allows full screen; and it is sized by aspect ratio, --loam-embed-ratio (default 16 / 9), so the page never shifts when it loads. What it shows is decided by its src, so a video and a map are the same element; the optional caption is a real figcaption.",
  importLine: `import { Embed } from "@loamui/ui";`,
  parts: [
    {
      name: "Embed.Root",
      description:
        "The figure. Set --loam-embed-ratio here to size the frame; it defaults to 16 / 9.",
    },
    {
      name: "Embed.Frame",
      description:
        'The iframe. title is required. Lazy, referrer-limited and full-screen capable by default; every iframe attribute is forwarded, so loading="eager" for a frame above the fold is one prop.',
    },
    {
      name: "Embed.Caption",
      description:
        "Optional. A figcaption under the frame: a credit, a summary, a link to the source.",
    },
  ],
  demos: [
    {
      title: "A video",
      description:
        "A YouTube embed with a title that says what the video is and how long it runs, and a caption underneath. The default 16 / 9 ratio holds the space before the player loads.",
      code: `<Embed.Root>
  <Embed.Frame
    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    title="Never Gonna Give You Up, Rick Astley (3 min)"
  />
  <Embed.Caption>The official video, from Rick Astley’s channel.</Embed.Caption>
</Embed.Root>`,
      render: () => (
        <Embed.Root>
          <Embed.Frame
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="Never Gonna Give You Up, Rick Astley (3 min)"
          />
          <Embed.Caption>The official video, from Rick Astley’s channel.</Embed.Caption>
        </Embed.Root>
      ),
    },
    {
      title: "A map",
      description:
        "The same parts with a map for a src. A map reads better squarer than a video, so the Root sets --loam-embed-ratio to 4 / 3; the frame is still lazy, and its title says what the map shows.",
      code: `<Embed.Root style={{ "--loam-embed-ratio": "4 / 3" }}>
  <Embed.Frame
    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1276%2C51.5072%2C-0.1176%2C51.5172&layer=mapnik"
    title="Map of Trafalgar Square and Covent Garden, London"
  />
  <Embed.Caption>
    Map data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>.
  </Embed.Caption>
</Embed.Root>`,
      render: () => (
        <Embed.Root style={{ "--loam-embed-ratio": "4 / 3" } as React.CSSProperties}>
          <Embed.Frame
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1276%2C51.5072%2C-0.1176%2C51.5172&layer=mapnik"
            title="Map of Trafalgar Square and Covent Garden, London"
          />
          <Embed.Caption>
            Map data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>.
          </Embed.Caption>
        </Embed.Root>
      ),
    },
  ],
  whenToUse: [
    "Content that lives on another site and must stay there: a hosted video, a map, a form or a chart served by its own player.",
    "A frame that sits below the fold on a long page; the lazy default means it costs nothing until the reader nears it.",
  ],
  whenNotToUse: [
    "A video you host yourself. That is a video element with captions and a poster, not a frame.",
    "An image or a static map tile. That is an img with alt text; a frame adds a document and a network round trip for nothing.",
  ],
};

export default embed;
