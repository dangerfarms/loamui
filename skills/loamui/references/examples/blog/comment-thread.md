---
title: Comment thread
description: A comment with two replies: the replies are a named list inside the parent, stepped in once and marked by a rule.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Comment thread

A comment with two replies: the replies are a named list inside the parent, stepped in once and marked by a rule.

An example in **Blog**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Avatar`, `Badge`, `Button`, `Time`
- Tags: discussion, replies, nested, conversation
- Live: https://loamui.com/examples/blog/comment-thread

## Built to the pillars

- **Native CSS.** Replies are articles nested inside the article they answer, in a ul named for what it holds; the nesting is the thread's structure, not a data attribute.
- **Modern CSS.** The rule down the replies is a border, so forced colours keep it as CanvasText where a background paint would vanish; one grid rule styles the parent and every reply alike.
- **Composition.** Each comment is the Comment example's markup, parent and reply alike; the author's reply carries a Badge in its byline the way any Badge is dropped into a row.
- **Accessible & gatekept.** Every article is named by its author, the replies list announces its count and whose replies they are, and every Reply button says who it replies to.

## Example.tsx

```tsx
import { Avatar, Badge, Button, Time } from "@loamui/core";
import "./example.css";

// The moment the distances are written against: a value the server and the
// browser share, never Date.now(), so both write the same words.
const NOW = "2026-09-08T09:00:00Z";

export default function Example() {
  return (
    <article className="comment-thread" aria-labelledby="comment-thread-author">
      <header>
        <Avatar name="Dafydd Rees" aria-hidden />
        <a id="comment-thread-author" className="author" href="/members/dafydd-rees">
          Dafydd Rees
        </a>
        <Time value="2026-09-05T14:30:00Z" locale="en-GB" relative={{ now: NOW }} />
      </header>
      <div className="body">
        <p>
          Does the October sowing hold up on heavy clay? Mine sat in water until March and half of
          it rotted, and the half that came through was no earlier than the spring-sown row.
        </p>
      </div>
      <div className="actions">
        <Button>
          Reply<span className="loam-VisuallyHidden"> to Dafydd Rees</span>
        </Button>
      </div>
      <ul className="replies" role="list" aria-label="Replies to Dafydd Rees">
        <li>
          <article aria-labelledby="comment-thread-reply-1-author">
            <header>
              <Avatar name="Nia Prosser" aria-hidden />
              <a id="comment-thread-reply-1-author" className="author" href="/growers/nia-prosser">
                Nia Prosser
              </a>
              <Badge>Author</Badge>
              <Time value="2026-09-05T16:05:00Z" locale="en-GB" relative={{ now: NOW }} />
            </header>
            <div className="body">
              <p>
                On clay, sow into a ridge so the seed sits above the standing water, or start them
                in modules in a cold frame and plant out in February. Either way you keep the early
                crop; it is the wet feet that do for them, not the cold.
              </p>
            </div>
            <div className="actions">
              <Button>
                Reply<span className="loam-VisuallyHidden"> to Nia Prosser</span>
              </Button>
            </div>
          </article>
        </li>
        <li>
          <article aria-labelledby="comment-thread-reply-2-author">
            <header>
              <Avatar name="Priya Natarajan" aria-hidden />
              <a
                id="comment-thread-reply-2-author"
                className="author"
                href="/members/priya-natarajan"
              >
                Priya Natarajan
              </a>
              <Time value="2026-09-06T08:12:00Z" locale="en-GB" relative={{ now: NOW }} />
            </header>
            <div className="body">
              <p>
                Ours is clay at Ludlow. A ridge and a handful of grit in the drill got a full row
                through last winter.
              </p>
            </div>
            <div className="actions">
              <Button>
                Reply<span className="loam-VisuallyHidden"> to Priya Natarajan</span>
              </Button>
            </div>
          </article>
        </li>
      </ul>
    </article>
  );
}
```

## example.css

```css
@scope (.comment-thread) to ([class*="loam-"]) {
  :scope,
  article {
    display: block grid;
    gap: var(--loam-space-sm);
  }

  :scope {
    container-type: inline-size;
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

    > :last-child {
      margin-block-end: 0;
    }
  }

  div.actions {
    display: block flex;
    flex-wrap: wrap;
    gap: var(--loam-space-sm);
  }

  ul.replies {
    border-inline-start: 1px solid var(--loam-color-line);
    display: block grid;
    gap: var(--loam-space-lg);
    list-style: none;
    margin-block: var(--loam-space-xs) 0;
    margin-inline: 0;
    padding-inline-start: var(--loam-space-lg);

    > li {
      margin: 0;
    }
  }
}
```

