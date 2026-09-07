"use client";

import { Stats } from "@loamui/ui";
import type { Composition } from "./types";

const stats: Composition = {
  slug: "stats",
  name: "Stats",
  category: "Data display",
  description: "Headline figures: each tile a large value over a short label, alone or in a row.",
  lead: "The unit is the tile: a description list of one pair, written label first so it reads correctly, with the stylesheet lifting the value to the top. A tile stands on its own anywhere; the optional Root is a row that fits as many across as there is room for. The figures are set in tabular lining numerals so a row of them aligns, and a --loam-context region on a tile tints its value.",
  importLine: `import { Stats } from "@loamui/ui";`,
  parts: [
    {
      name: "Stats.Item",
      description:
        "One tile: a dl holding a label and its value. Works on its own or inside a Root. Set --loam-context here to tint the value.",
    },
    {
      name: "Stats.Root",
      description:
        "Optional. A row laid out as an auto-fit grid of tiles; declares its own container. Leave it out to place a tile in a layout of your own.",
    },
    {
      name: "Stats.Label",
      description: "What the figure measures, a dt. Comes first in the markup.",
    },
    { name: "Stats.Value", description: "The figure, a dd set large in tabular lining numerals." },
  ],
  demos: [
    {
      title: "A single tile",
      description:
        "A tile needs no row. Drop one into a Card, a sidebar or a grid you wrote yourself; it is a description list of one pair.",
      code: `<Stats.Item>
  <Stats.Label>Uptime, last 30 days</Stats.Label>
  <Stats.Value>99.98%</Stats.Value>
</Stats.Item>`,
      render: () => (
        <Stats.Item>
          <Stats.Label>Uptime, last 30 days</Stats.Label>
          <Stats.Value>99.98%</Stats.Value>
        </Stats.Item>
      ),
    },
    {
      title: "A row of figures",
      description:
        "Stats.Root fits as many tiles across as there is room for. Label then value in the markup; value over label on screen. The last tile sits in a success region.",
      code: `<Stats.Root>
  <Stats.Item>
    <Stats.Label>Components</Stats.Label>
    <Stats.Value>33</Stats.Value>
  </Stats.Item>
  <Stats.Item>
    <Stats.Label>Stylesheet size</Stats.Label>
    <Stats.Value>24 kB</Stats.Value>
  </Stats.Item>
  <Stats.Item>
    <Stats.Label>Runtime styling</Stats.Label>
    <Stats.Value>0 kB</Stats.Value>
  </Stats.Item>
  <Stats.Item style={{ "--loam-context": "success" }}>
    <Stats.Label>Contrast audit</Stats.Label>
    <Stats.Value>100%</Stats.Value>
  </Stats.Item>
</Stats.Root>`,
      render: () => (
        <Stats.Root>
          <Stats.Item>
            <Stats.Label>Components</Stats.Label>
            <Stats.Value>33</Stats.Value>
          </Stats.Item>
          <Stats.Item>
            <Stats.Label>Stylesheet size</Stats.Label>
            <Stats.Value>24 kB</Stats.Value>
          </Stats.Item>
          <Stats.Item>
            <Stats.Label>Runtime styling</Stats.Label>
            <Stats.Value>0 kB</Stats.Value>
          </Stats.Item>
          <Stats.Item style={{ "--loam-context": "success" } as React.CSSProperties}>
            <Stats.Label>Contrast audit</Stats.Label>
            <Stats.Value>100%</Stats.Value>
          </Stats.Item>
        </Stats.Root>
      ),
    },
  ],
  whenToUse: [
    "A figure that summarises something at a glance: one tile for a card's key number, a row for a dashboard's headline metrics or a product's proof points.",
    "Figures that change and should be compared across the row; the tabular numerals keep the columns steady as values update.",
  ],
  whenNotToUse: [
    "More than five or six figures, or figures with a trend to show. Past that point a Table carries the comparison and a chart carries the trend.",
    "A number inside running text; a figure the reader meets mid-sentence needs a sentence, not a tile.",
  ],
};

export default stats;
