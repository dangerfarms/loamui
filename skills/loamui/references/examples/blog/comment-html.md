---
title: Comment with formatted text
description: One comment whose body holds formatted content: a link, bold text and a short list, styled by the element styles alone.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Comment with formatted text

One comment whose body holds formatted content: a link, bold text and a short list, styled by the element styles alone.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Time`
- Tags: discussion, reply, thread, rich text, formatted
- Live: https://loamui.com/examples/blog/comment-html

## Built to the pillars

- **Native CSS.** The body is ordinary HTML, a paragraph with a link and a strong, then a ul, so the element styles dress it and a reader's tools see a link and a list, not a run of styled spans.
- **Modern CSS.** The example writes no rule for the link, the bold text or the bullets: the element layer already has them, and this scope only spaces the blocks inside the reading measure.
- **Composition.** Time writes the distance against a moment the page passes in, never the clock, so a render on the server and the render that hydrates it write the same words.
- **Accessible & gatekept.** The article is named by its author; the link's text says where it goes and the emphasis is a strong element, so both are announced as what they are.

## Example.tsx

```tsx
import { Avatar, Time } from "@loamui/core";
import "./example.css";

// The moment the distance is written against: a value the server and the
// browser share, never Date.now(), so both write the same words.
const NOW = "2026-09-08T09:00:00Z";

export default function Example() {
  return (
    <article className="comment-html" aria-labelledby="comment-html-author">
      <header>
        <Avatar name="Tom Bradshaw" aria-hidden />
        <a id="comment-html-author" className="author" href="/members/tom-bradshaw">
          Tom Bradshaw
        </a>
        <Time value="2026-09-06T18:12:00Z" locale="en-GB" relative={{ now: NOW }} />
      </header>
      <div className="body">
        <p>
          Good write-up. One thing I would add from the{" "}
          <a href="/guides/autumn-broad-beans">autumn broad bean guide</a>:{" "}
          <strong>sow a spare row</strong>, because the losses to mice are never even along the bed.
          What worked on our plot last year:
        </p>
        <ul>
          <li>A double row, 20 cm apart, with the seed 5 cm deep.</li>
          <li>Netting the day the shoots show, not the day after.</li>
          <li>A top dressing of leaf mould in February.</li>
        </ul>
      </div>
    </article>
  );
}
```

## example.css

```css
@scope (.comment-html) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-sm);
  }

  header {
    --loam-avatar-size: 2rem;

    align-items: center;
    color: var(--loam-color-fg-muted);
    display: block flex;
    flex-wrap: wrap;
    font-size: var(--loam-text-sm);
    gap: var(--loam-space-sm);
  }

  a.author {
    color: var(--loam-color-fg-strong);
    font-size: var(--loam-text-md);
    font-weight: 600;
  }

  div.body {
    max-inline-size: var(--loam-measure);

    > * {
      margin-block: 0 var(--loam-space-sm);
    }

    > :last-child {
      margin-block-end: 0;
    }

    li + li {
      margin-block-start: var(--loam-space-xs);
    }
  }
}
```

