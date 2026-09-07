"use client";

import { Avatar } from "@loamui/core";
import { Person } from "@loamui/ui";
import type { Composition } from "./types";

const person: Composition = {
  slug: "person",
  name: "Person",
  category: "Page sections",
  description: "A grid of team members, each an avatar over a name and a role.",
  lead: "Five parts on a native section and list. The avatar is the core Avatar, placed first by you with the person's name for its initials and aria-hidden, because the name is printed beneath it and assistive technology should hear each person once; the grid decides how many sit across.",
  importLine: `import { Person } from "@loamui/ui";`,
  parts: [
    {
      name: "Person.Root",
      description:
        "The unit: a centred column. A div by default; pass render={<li />} inside a list. Put an Avatar first, with the person's name and aria-hidden, then the name and role.",
    },
    {
      name: "Person.Name",
      description:
        "The person's name. An h3 by default; pass render={<p />} where it is not a heading.",
    },
    { name: "Person.Role", description: "What the person does, a small muted line." },
  ],
  demos: [
    {
      title: "One person",
      description:
        "A person needs no grid: an author beside an article, a speaker on an event page.",
      code: `<Person.Root>
  <Avatar name="Imogen Hartley" aria-hidden />
  <Person.Name>Imogen Hartley</Person.Name>
  <Person.Role>Founder</Person.Role>
</Person.Root>`,
      render: () => (
        <Person.Root>
          <Avatar name="Imogen Hartley" aria-hidden />
          <Person.Name>Imogen Hartley</Person.Name>
          <Person.Role>Founder</Person.Role>
        </Person.Root>
      ),
    },
    {
      title: "A team",
      description:
        "Four people in a list. The grid is yours: a ul with repeat(auto-fit, minmax(min(12rem, 100%), 1fr)), each person rendered as a li. Each Avatar takes its initials from the name and is hidden from assistive technology, which reads the heading beneath it instead.",
      code: `<section aria-labelledby="team">
  <h2 id="team">The team</h2>
  <ul style={{ display: "grid", gap: "2rem 1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(12rem, 100%), 1fr))", listStyle: "none", margin: 0, padding: 0 }}>
    <Person.Root render={<li />}>
      <Avatar name="Imogen Hartley" aria-hidden />
      <Person.Name>Imogen Hartley</Person.Name>
      <Person.Role>Founder</Person.Role>
    </Person.Root>
    <Person.Root render={<li />}>
      <Avatar name="Rafael Okonkwo" aria-hidden />
      <Person.Name>Rafael Okonkwo</Person.Name>
      <Person.Role>Engineering lead</Person.Role>
    </Person.Root>
    <Person.Root render={<li />}>
      <Avatar name="Sunniva Berg" aria-hidden />
      <Person.Name>Sunniva Berg</Person.Name>
      <Person.Role>Design</Person.Role>
    </Person.Root>
    <Person.Root render={<li />}>
      <Avatar name="Tomasz Wieczorek" aria-hidden />
      <Person.Name>Tomasz Wieczorek</Person.Name>
      <Person.Role>Accessibility</Person.Role>
    </Person.Root>
  </ul>
</section>`,
      render: () => (
        <section aria-labelledby="team">
          <h2 id="team">The team</h2>
          <ul
            style={{
              display: "grid",
              gap: "2rem 1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(12rem, 100%), 1fr))",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <Person.Root render={<li />}>
              <Avatar name="Imogen Hartley" aria-hidden />
              <Person.Name>Imogen Hartley</Person.Name>
              <Person.Role>Founder</Person.Role>
            </Person.Root>
            <Person.Root render={<li />}>
              <Avatar name="Rafael Okonkwo" aria-hidden />
              <Person.Name>Rafael Okonkwo</Person.Name>
              <Person.Role>Engineering lead</Person.Role>
            </Person.Root>
            <Person.Root render={<li />}>
              <Avatar name="Sunniva Berg" aria-hidden />
              <Person.Name>Sunniva Berg</Person.Name>
              <Person.Role>Design</Person.Role>
            </Person.Root>
            <Person.Root render={<li />}>
              <Avatar name="Tomasz Wieczorek" aria-hidden />
              <Person.Name>Tomasz Wieczorek</Person.Name>
              <Person.Role>Accessibility</Person.Role>
            </Person.Root>
          </ul>
        </section>
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

export default person;
