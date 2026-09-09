---
title: Tasks card
description: A milestone in a Card: a due date, a title and description, a Progress with the count of tasks done beneath it, and the team on it as an Avatar.Group.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Tasks card

A milestone in a Card: a due date, a title and description, a Progress with the count of tasks done beneath it, and the team on it as an Avatar.Group.

An example in **Application cards**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Card`, `Progress`, `Time`
- Tags: milestone, project, tasks, team, deadline
- Live: https://loamui.com/examples/app-cards/tasks-card

## Built to the pillars

- **Native CSS.** The due date is a time element whose text is written for people and whose dateTime is the date; the bar is the native progress element and the team is a list, one item per person.
- **Modern CSS.** The Card is a flex column whose foot takes the slack with an auto margin, so a row of milestones lines its teams up; the count is set in tabular figures at the end, under the end of the fill.
- **Composition.** Avatar.Group counts the people it is given and adds the overflow avatar from more; the avatar size is its public property, set on the foot rather than passed to each Avatar.
- **Accessible & gatekept.** The bar speaks 60% of tasks done through labels.value and the count is written out beside it; the group is named Working on this and each avatar is an image with the person's name as its alt.

## Example.tsx

```tsx
"use client";

import { Avatar, Card, Progress, Time } from "@loamui/core";
import "./example.css";

const TEAM = [
  { name: "Nia Prosser", seed: "hedgerow-nia" },
  { name: "Dafydd Rees", seed: "hedgerow-dafydd" },
  { name: "Amara Okonkwo", seed: "hedgerow-amara" },
  { name: "Tom Bradshaw", seed: "hedgerow-tom" },
];

export default function Example() {
  return (
    <Card render={<article className="tasks-card" aria-labelledby="tasks-card-title" />}>
      <p className="due">
        Due <Time value="2026-11-30" locale="en-GB" dateStyle="long" />
      </p>
      <h3 id="tasks-card-title">Spring catalogue 2027</h3>
      <p className="description">
        Every variety trialled this year written up, photographed and priced, ready for the printer
        in December.
      </p>
      <div className="progress">
        <Progress value={60} labels={{ value: (n) => `${n}% of tasks done` }}>
          Tasks done
        </Progress>
        <p className="count">
          12 <span>of 20</span>
        </p>
      </div>
      <div className="foot">
        <Avatar.Group more={3} aria-label="Working on this">
          {TEAM.map((member) => (
            <Avatar
              key={member.name}
              name={member.name}
              src={`https://picsum.photos/seed/${member.seed}/80/80`}
            />
          ))}
        </Avatar.Group>
      </div>
    </Card>
  );
}
```

## example.css

```css
/* The Card is the article, so its element is this scope's root: core's
   surface, line, radius and padding stay, and the column inside is the
   example's own. The Time, the Progress and the Avatar.Group keep their
   recipes behind the donut. */
@scope (.tasks-card) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block flex;
    flex-direction: column;
    gap: var(--loam-space-sm);
  }

  p.due {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
  }

  h3 {
    font-size: var(--loam-text-lg);
    margin: 0;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    text-wrap: pretty;
  }

  /* The bar and the count under it, the count in tabular figures at the
     end so it sits under the end of the fill. */
  div.progress {
    display: block grid;
    gap: var(--loam-space-xs);
    margin-block-start: var(--loam-space-sm);
  }

  p.count {
    color: var(--loam-color-fg-strong);
    font-size: var(--loam-text-sm);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 600;
    margin: 0;
    text-align: end;

    span {
      color: var(--loam-color-fg-muted);
      font-weight: 400;
    }
  }

  /* The team sits at the foot whatever the description's length, so a
     row of these cards lines its groups up. */
  div.foot {
    --loam-avatar-size: 2rem;

    display: block flex;
    margin-block-start: auto;
    padding-block-start: var(--loam-space-sm);
  }
}
```

