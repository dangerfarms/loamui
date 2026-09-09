---
title: Comment
description: One comment: who wrote it, how long ago, what they said, and a row of actions that each say which comment they belong to.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Comment

One comment: who wrote it, how long ago, what they said, and a row of actions that each say which comment they belong to.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Button`, `Time`
- Tags: discussion, reply, thread, review
- Live: https://loamui.com/examples/blog/comment

## Built to the pillars

- **Native CSS.** A comment is an article, self-contained and syndicable, with a header for the byline; the time is a time element whose dateTime is the exact moment whatever the words say.
- **Modern CSS.** The article is its own container, so the Buttons in the actions row take their size from the comment's width rather than the page's.
- **Composition.** Time writes the distance against a moment the page passes in, never the clock, so a render on the server and the render that hydrates it write the same words.
- **Accessible & gatekept.** The article is named by its author, so a list of the page's articles reads the names; each action's name is completed with real hidden text ("Reply to Priya Natarajan") rather than an aria-label, so it translates and shows in reader mode.

## Example.tsx

```tsx
import { Avatar, Button, Time } from "@loamui/core";
import "./example.css";

// The moment the distance is written against: a value the server and the
// browser share, never Date.now(), so both write the same words.
const NOW = "2026-09-08T09:00:00Z";

export default function Example() {
  return (
    <article className="comment" aria-labelledby="comment-author">
      <header>
        <Avatar name="Priya Natarajan" aria-hidden />
        <a id="comment-author" className="author" href="/members/priya-natarajan">
          Priya Natarajan
        </a>
        <Time value="2026-09-05T14:30:00Z" locale="en-GB" relative={{ now: NOW }} />
      </header>
      <div className="body">
        <p>
          Sowed a double row of ‘Aquadulce Claudia’ on the allotment last October and it came
          through two hard frosts with nothing over it. The pigeons were another matter: net the row
          the day the shoots show, not the day after.
        </p>
      </div>
      <div className="actions">
        <Button>
          Reply<span className="loam-VisuallyHidden"> to Priya Natarajan</span>
        </Button>
        <Button>
          Report<span className="loam-VisuallyHidden"> Priya Natarajan’s comment</span>
        </Button>
      </div>
    </article>
  );
}
```

## example.css

```css
/* One comment: a byline over the body over a row of actions. The
   article declares its own container so the fluid tokens answer its
   width; the donut keeps the Avatar, the Time and the Buttons on their
   own styles. */
@scope (.comment) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-sm);
  }

  /* The byline sets the small muted type and the Time takes it; the name
     alone is set back to the body size, strong. A linked name keeps its
     underline, so the affordance stays. */
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

  /* The body is rich text held to the reading measure. Blocks carry only
     a block-end margin, so the last one's goes and the grid gap spaces
     what follows. */
  div.body {
    max-inline-size: var(--loam-measure);

    > :last-child {
      margin-block-end: 0;
    }
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
  }
}
```

