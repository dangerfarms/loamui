"use client";

import { Stats } from "@loamui/ui";
import type { Composition } from "./types";

const stats: Composition = {
  slug: "stats",
  name: "Stats",
  category: "Data display",
  description: "A row of headline figures: each a large value over a short label.",
  lead: "Four parts on a native description list. Each tile is a term and its definition, written label first so the list reads correctly, and the stylesheet lifts the value to the top; the figures are set in tabular lining numerals so a row of them aligns, and a --loam-context region on a tile tints its value.",
  importLine: `import { Stats } from "@loamui/ui";`,
  parts: [
    {
      name: "Stats.Root",
      description: "The dl, laid out as an auto-fit grid of tiles. Declares its own container.",
    },
    {
      name: "Stats.Item",
      description:
        "One tile, grouping a label and its value. Set --loam-context here to tint the value.",
    },
    {
      name: "Stats.Label",
      description: "What the figure measures, a dt. Comes first in the markup.",
    },
    { name: "Stats.Value", description: "The figure, a dd set large in tabular lining numerals." },
  ],
  demos: [
    {
      title: "Key figures",
      description:
        "Label then value in the markup; value over label on screen. The last tile sits in a success region.",
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
    "A handful of figures that summarise a page at a glance: a dashboard's headline metrics, a product's proof points, a report's totals.",
    "Figures that change and should be compared across the row; the tabular numerals keep the columns steady as values update.",
  ],
  whenNotToUse: [
    "More than five or six figures, or figures with a trend to show. Past that point a Table carries the comparison and a chart carries the trend.",
    "A single number inside running text; a figure with no peers needs a sentence, not a tile.",
  ],
};

export default stats;
