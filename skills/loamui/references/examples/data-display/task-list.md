---
title: Task list
description: The sections of a multi-step application, each a linked title with what it needs and where it stands.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Task list

The sections of a multi-step application, each a linked title with what it needs and where it stands.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Badge`
- Tags: application, steps, checklist, onboarding, progress
- Live: https://loamui.com/examples/data-display/task-list

## Built to the pillars

- **Native CSS.** A list under a heading that names it: each task is a list item holding a link, a paragraph and a status, and a task that cannot be started yet is plain text rather than a dead link.
- **Modern CSS.** Each row is a two-column grid with the status spanning both rows, so it sits level with the title whether or not a description follows; below a narrow width the rows restack.
- **Composition.** The only component is the Badge; the row, the title and the description are the page's own elements, arranged in the markup where a reader can see and reorder them.
- **Contextualism.** A completed task's status is a success region and one under way an info region, so each Badge takes its colour from what the task means; a task not yet started declares nothing and its Badge stays neutral.
- **Accessible & gatekept.** Each title is described by its description and its status, so a screen reader hears Choose a plot, link, then what it needs and In progress, without a journey across the row; the list role is restored where the markers are stripped.

## Example.tsx

```tsx
import { Badge } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="task-list" aria-labelledby="task-list-title">
      <h2 id="task-list-title">Join the co-op</h2>
      <p className="summary">You have completed 1 of 4 sections.</p>
      <ul role="list">
        <li>
          <a href="/join/details" className="title" aria-describedby="task-list-details-status">
            Your details
          </a>
          <div className="status complete" id="task-list-details-status">
            <Badge>Completed</Badge>
          </div>
        </li>
        <li>
          <a
            href="/join/plot"
            className="title"
            aria-describedby="task-list-plot-description task-list-plot-status"
          >
            Choose a plot
          </a>
          <p className="description" id="task-list-plot-description">
            Pick a bed on one of the member fields, or join the waiting list for Ludlow.
          </p>
          <div className="status started" id="task-list-plot-status">
            <Badge>In progress</Badge>
          </div>
        </li>
        <li>
          <a
            href="/join/proof"
            className="title"
            aria-describedby="task-list-proof-description task-list-proof-status"
          >
            Proof of address
          </a>
          <p className="description" id="task-list-proof-description">
            A council tax letter or a utility bill from the last three months.
          </p>
          <div className="status" id="task-list-proof-status">
            <Badge>Not started</Badge>
          </div>
        </li>
        <li>
          <span className="title" aria-describedby="task-list-fee-description task-list-fee-status">
            Pay the membership fee
          </span>
          <p className="description" id="task-list-fee-description">
            Available once every section above is complete.
          </p>
          <div className="status" id="task-list-fee-status">
            <Badge>Cannot start yet</Badge>
          </div>
        </li>
      </ul>
    </section>
  );
}
```

## example.css

```css
@scope (.task-list) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
  }

  h2 {
    font-size: var(--loam-text-xl);
    margin-block-end: var(--loam-space-xs);
  }

  p.summary {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin-block: 0 var(--loam-space-md);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Zero row gap: the status spans both rows, and a task with no
     description leaves the second one empty. */
  li {
    align-items: start;
    border-block-end: 1px solid var(--loam-color-line);
    display: block grid;
    gap: 0 var(--loam-space-lg);
    grid-template-columns: 1fr auto;
    margin: 0;
    padding-block: var(--loam-space-sm);
  }

  .title {
    font-weight: 600;

    &:not(a) {
      color: var(--loam-color-fg-muted);
    }
  }

  p.description {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    grid-column: 1;
    margin: 0;
    margin-block-start: var(--loam-space-xs);
  }

  div.status {
    grid-column: 2;
    grid-row: 1 / span 2;

    &.complete {
      --loam-context: success;
    }

    &.started {
      --loam-context: info;
    }
  }

  /* A container query is answered by an ancestor, never by the element that
     declares it. */
  @container (inline-size < 24rem) {
    li {
      grid-template-columns: 1fr;
    }

    div.status {
      grid-column: 1;
      grid-row: auto;
      margin-block-start: var(--loam-space-xs);
    }
  }
}
```

