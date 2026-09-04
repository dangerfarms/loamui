"use client";

import { Avatar } from "@loamui/core";
import { Team } from "@loamui/ui";
import type { Composition } from "./types";

const team: Composition = {
  slug: "team",
  name: "Team",
  category: "Page sections",
  description: "A grid of team members, each an avatar over a name and a role.",
  lead: "Five parts on a native section and list. The avatar is the core Avatar, placed first by you with the person's name for its initials and aria-hidden, because the name is printed beneath it and assistive technology should hear each person once; the grid decides how many sit across.",
  importLine: `import { Team } from "@loamui/ui";`,
  parts: [
    {
      name: "Team.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the section's width.",
    },
    {
      name: "Team.Grid",
      description: "The list of members: an auto-fit grid of columns at least 12rem wide.",
    },
    {
      name: "Team.Member",
      description:
        "One member: a centred column. Put an Avatar first, with the person's name and aria-hidden, then the name and role.",
    },
    { name: "Team.Name", description: "The person's name, an h3." },
    { name: "Team.Role", description: "What the person does, a small muted line." },
  ],
  demos: [
    {
      title: "Four members",
      description:
        "Each Avatar takes its initials from the name and is hidden from assistive technology, which reads the heading beneath it instead.",
      code: `<Team.Root>
  <h2>The team</h2>
  <Team.Grid>
    <Team.Member>
      <Avatar name="Imogen Hartley" aria-hidden />
      <Team.Name>Imogen Hartley</Team.Name>
      <Team.Role>Founder</Team.Role>
    </Team.Member>
    <Team.Member>
      <Avatar name="Rafael Okonkwo" aria-hidden />
      <Team.Name>Rafael Okonkwo</Team.Name>
      <Team.Role>Engineering lead</Team.Role>
    </Team.Member>
    <Team.Member>
      <Avatar name="Sunniva Berg" aria-hidden />
      <Team.Name>Sunniva Berg</Team.Name>
      <Team.Role>Design</Team.Role>
    </Team.Member>
    <Team.Member>
      <Avatar name="Tomasz Wieczorek" aria-hidden />
      <Team.Name>Tomasz Wieczorek</Team.Name>
      <Team.Role>Accessibility</Team.Role>
    </Team.Member>
  </Team.Grid>
</Team.Root>`,
      render: () => (
        <Team.Root>
          <h2>The team</h2>
          <Team.Grid>
            <Team.Member>
              <Avatar name="Imogen Hartley" aria-hidden />
              <Team.Name>Imogen Hartley</Team.Name>
              <Team.Role>Founder</Team.Role>
            </Team.Member>
            <Team.Member>
              <Avatar name="Rafael Okonkwo" aria-hidden />
              <Team.Name>Rafael Okonkwo</Team.Name>
              <Team.Role>Engineering lead</Team.Role>
            </Team.Member>
            <Team.Member>
              <Avatar name="Sunniva Berg" aria-hidden />
              <Team.Name>Sunniva Berg</Team.Name>
              <Team.Role>Design</Team.Role>
            </Team.Member>
            <Team.Member>
              <Avatar name="Tomasz Wieczorek" aria-hidden />
              <Team.Name>Tomasz Wieczorek</Team.Name>
              <Team.Role>Accessibility</Team.Role>
            </Team.Member>
          </Team.Grid>
        </Team.Root>
      ),
    },
  ],
  whenToUse: [
    "An about page or a project page where the people behind the work are part of the pitch, and a name and a role are all a visitor needs from each.",
    "A small group, up to a dozen or so, that reads as one row or two: the grid keeps them equal and the visitor scans them in a glance.",
  ],
  whenNotToUse: [
    "A directory of many people that visitors search or filter: that is a Table or a list with a search field, not a grid of tiles.",
    "Where each person needs a biography, a contact or a link to a profile; give them a Card or a page of their own, so the tile does not have to carry it.",
  ],
};

export default team;
