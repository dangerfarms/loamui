"use client";

import { Stat } from "@loamui/ui";
import type { Composition } from "./types";

const stat: Composition = {
  slug: "stat",
  name: "Stat",
  category: "Data display",
  description:
    "One headline figure: a large value over a short label in a core Card, alone or in a Group that fits several across.",
  lead: "The unit is the tile: a core Card rendered as a description list of one pair, written label first so it reads correctly, with the stylesheet lifting the value to the top. The surface, line, radius and padding are the Card's, so a tile looks like every other Card on the page and nothing here repeats them. A tile stands on its own anywhere; the optional Group is a row that fits as many across as there is room for. The figures are set in tabular lining numerals so a row of them aligns, and a --loam-context region on a tile tints its value.",
  importLine: `import { Stat } from "@loamui/ui";`,
  parts: [
    {
      name: "Stat.Root",
      description:
        "The unit: a core Card rendered as a dl holding a label and its value. Works on its own or inside a Group. Set --loam-context here to tint the value.",
    },
    {
      name: "Stat.Label",
      description: "What the figure measures, a dt. Comes first in the markup.",
    },
    { name: "Stat.Value", description: "The figure, a dd set large in tabular lining numerals." },
    {
      name: "Stat.Group",
      description:
        "Optional. A row laid out as an auto-fit grid of tiles; declares its own container. Leave it out to place a tile in a layout of your own.",
    },
  ],
  demos: [
    {
      title: "A single tile",
      description:
        "A tile needs no row. Drop one into a sidebar or a grid you wrote yourself; it is a Card holding a description list of one pair.",
      code: `<Stat.Root>
  <Stat.Label>Uptime, last 30 days</Stat.Label>
  <Stat.Value>99.98%</Stat.Value>
</Stat.Root>`,
      render: () => (
        <Stat.Root>
          <Stat.Label>Uptime, last 30 days</Stat.Label>
          <Stat.Value>99.98%</Stat.Value>
        </Stat.Root>
      ),
    },
    {
      title: "A row of figures",
      description:
        "Stat.Group fits as many tiles across as there is room for. Label then value in the markup; value over label on screen. The last tile sits in a success region.",
      code: `<Stat.Group>
  <Stat.Root>
    <Stat.Label>Components</Stat.Label>
    <Stat.Value>33</Stat.Value>
  </Stat.Root>
  <Stat.Root>
    <Stat.Label>Stylesheet size</Stat.Label>
    <Stat.Value>24 kB</Stat.Value>
  </Stat.Root>
  <Stat.Root>
    <Stat.Label>Runtime styling</Stat.Label>
    <Stat.Value>0 kB</Stat.Value>
  </Stat.Root>
  <Stat.Root style={{ "--loam-context": "success" }}>
    <Stat.Label>Contrast audit</Stat.Label>
    <Stat.Value>100%</Stat.Value>
  </Stat.Root>
</Stat.Group>`,
      render: () => (
        <Stat.Group>
          <Stat.Root>
            <Stat.Label>Components</Stat.Label>
            <Stat.Value>33</Stat.Value>
          </Stat.Root>
          <Stat.Root>
            <Stat.Label>Stylesheet size</Stat.Label>
            <Stat.Value>24 kB</Stat.Value>
          </Stat.Root>
          <Stat.Root>
            <Stat.Label>Runtime styling</Stat.Label>
            <Stat.Value>0 kB</Stat.Value>
          </Stat.Root>
          <Stat.Root style={{ "--loam-context": "success" } as React.CSSProperties}>
            <Stat.Label>Contrast audit</Stat.Label>
            <Stat.Value>100%</Stat.Value>
          </Stat.Root>
        </Stat.Group>
      ),
    },
  ],
  whenToUse: [
    "A figure that summarises something at a glance: one tile for a page's key number, a Group for a dashboard's headline metrics or a product's proof points.",
    "Figures that change and should be compared across the row; the tabular numerals keep the columns steady as values update.",
  ],
  whenNotToUse: [
    "More than five or six figures, or figures with a trend to show. Past that point a Table carries the comparison and a chart carries the trend.",
    "A number inside running text; a figure the reader meets mid-sentence needs a sentence, not a tile.",
  ],
};

export default stat;
