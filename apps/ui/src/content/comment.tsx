"use client";

import { Avatar, Button } from "@loamui/core";
import { Comment } from "@loamui/ui";
import type { Composition } from "./types";

const comment: Composition = {
  slug: "comment",
  name: "Comment",
  category: "Blog",
  description:
    "One comment in a discussion: who wrote it, when, and what they said, with its replies.",
  lead: "The unit is the comment: an article named by its author, so a screen reader's list of the page's articles reads the names rather than 'article, article'; a Time whose dateTime is always the machine-readable moment; a body of rich text; and replies as a nested list that steps in once and no further. A thread is a list you write with each comment in a li.",
  importLine: `import { Comment } from "@loamui/ui";\nimport { Avatar, Button } from "@loamui/core";`,
  parts: [
    {
      name: "Comment.Root",
      description:
        "The article. Its aria-labelledby points at the Author, which names it, from the first render, so the server HTML carries the name; the reference is dropped if no Author is rendered, and an aria-label you pass wins. Declares its own container so the fluid tokens answer its width.",
    },
    {
      name: "Comment.Header",
      description:
        "The byline: a wrapping row for an Avatar (aria-hidden, since the name is printed beside it), the Author and the Time.",
    },
    {
      name: "Comment.Author",
      description:
        'Who wrote it. A span by default; render={<a href="/people/priya">Priya Natarajan</a>} links the name to a profile. Its id (yours if you pass one) is the target of the article\'s name.',
    },
    {
      name: "Comment.Time",
      description:
        "When: core's Time, left as core renders it, in a span the row addresses, so dateTime is the ISO moment whatever the words. Pass relative={{ now }} for a distance written against a moment you supply.",
    },
    {
      name: "Comment.Body",
      description: "What they said: paragraphs, links and code, held to the reading measure.",
    },
    {
      name: "Comment.Actions",
      description:
        "A row for your own controls. Complete each one's name with real text hidden by core's .loam-VisuallyHidden, Reply<span className=\"loam-VisuallyHidden\"> to Priya Natarajan</span>, so every Reply on the page says which comment it answers; real text translates and shows in reader mode where an aria-label does neither, and the class works inside a core Button as well as a native button.",
    },
    {
      name: "Comment.Replies",
      description:
        "The replies: a ul with role list, named by labels.replies (Replies by default) unless you pass an aria-label or aria-labelledby, indented once with a rule. Replies to replies sit at the same level.",
    },
    {
      name: "Comment.Reply",
      description: "One reply: the li around a nested Comment.Root.",
    },
  ],
  demos: [
    {
      title: "One comment",
      description:
        "An avatar, a linked name and a relative time over the body. The time is written against a fixed now passed in, never the clock: a page rendered on the server and hydrated in the browser would otherwise disagree about how long ago two days is, and React would report the mismatch. The dateTime underneath stays the exact moment.",
      code: `<Comment.Root>
  <Comment.Header>
    <Avatar name="Priya Natarajan" aria-hidden />
    <Comment.Author render={<a href="/people/priya">Priya Natarajan</a>} />
    <Comment.Time value="2026-09-05T14:30:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
  </Comment.Header>
  <Comment.Body>
    <p>
      The static stylesheet is the whole point. Nothing runs at runtime, so the audit has
      nothing to chase, and <code>@scope</code> keeps every rule where it belongs.
    </p>
  </Comment.Body>
</Comment.Root>`,
      render: () => (
        <Comment.Root>
          <Comment.Header>
            <Avatar name="Priya Natarajan" aria-hidden />
            <Comment.Author render={<a href="/people/priya">Priya Natarajan</a>} />
            <Comment.Time value="2026-09-05T14:30:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
          </Comment.Header>
          <Comment.Body>
            <p>
              The static stylesheet is the whole point. Nothing runs at runtime, so the audit has
              nothing to chase, and <code>@scope</code> keeps every rule where it belongs.
            </p>
          </Comment.Body>
        </Comment.Root>
      ),
    },
    {
      title: "A thread",
      description:
        "A comment with two replies. The replies are a list named Replies, each reply its own article, stepped in once behind a rule. The second reply carries an Actions row: a core Button whose visible text is Reply and whose name goes on, in a span with core's loam-VisuallyHidden class, to say which comment it answers, Reply to Tom Okafor. That is the recipe for every control placed here: real text, hidden, never an aria-label.",
      code: `<Comment.Root>
  <Comment.Header>
    <Avatar name="Priya Natarajan" aria-hidden />
    <Comment.Author>Priya Natarajan</Comment.Author>
    <Comment.Time value="2026-09-05T14:30:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
  </Comment.Header>
  <Comment.Body>
    <p>Does the fluid type scale hold up inside a narrow sidebar?</p>
  </Comment.Body>
  <Comment.Replies>
    <Comment.Reply>
      <Comment.Root>
        <Comment.Header>
          <Avatar name="Sam Reid" aria-hidden />
          <Comment.Author>Sam Reid</Comment.Author>
          <Comment.Time value="2026-09-05T16:05:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
        </Comment.Header>
        <Comment.Body>
          <p>It does: every root declares its own container, so the tokens answer its width.</p>
        </Comment.Body>
      </Comment.Root>
    </Comment.Reply>
    <Comment.Reply>
      <Comment.Root>
        <Comment.Header>
          <Avatar name="Tom Okafor" aria-hidden />
          <Comment.Author>Tom Okafor</Comment.Author>
          <Comment.Time value="2026-09-06T08:12:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
        </Comment.Header>
        <Comment.Body>
          <p>Confirmed in a 240px column; the small step is the floor of the clamp.</p>
        </Comment.Body>
        <Comment.Actions>
          <Button>
            Reply<span className="loam-VisuallyHidden"> to Tom Okafor</span>
          </Button>
        </Comment.Actions>
      </Comment.Root>
    </Comment.Reply>
  </Comment.Replies>
</Comment.Root>`,
      render: () => (
        <Comment.Root>
          <Comment.Header>
            <Avatar name="Priya Natarajan" aria-hidden />
            <Comment.Author>Priya Natarajan</Comment.Author>
            <Comment.Time value="2026-09-05T14:30:00Z" relative={{ now: "2026-09-07T09:00:00Z" }} />
          </Comment.Header>
          <Comment.Body>
            <p>Does the fluid type scale hold up inside a narrow sidebar?</p>
          </Comment.Body>
          <Comment.Replies>
            <Comment.Reply>
              <Comment.Root>
                <Comment.Header>
                  <Avatar name="Sam Reid" aria-hidden />
                  <Comment.Author>Sam Reid</Comment.Author>
                  <Comment.Time
                    value="2026-09-05T16:05:00Z"
                    relative={{ now: "2026-09-07T09:00:00Z" }}
                  />
                </Comment.Header>
                <Comment.Body>
                  <p>
                    It does: every root declares its own container, so the tokens answer its width.
                  </p>
                </Comment.Body>
              </Comment.Root>
            </Comment.Reply>
            <Comment.Reply>
              <Comment.Root>
                <Comment.Header>
                  <Avatar name="Tom Okafor" aria-hidden />
                  <Comment.Author>Tom Okafor</Comment.Author>
                  <Comment.Time
                    value="2026-09-06T08:12:00Z"
                    relative={{ now: "2026-09-07T09:00:00Z" }}
                  />
                </Comment.Header>
                <Comment.Body>
                  <p>Confirmed in a 240px column; the small step is the floor of the clamp.</p>
                </Comment.Body>
                <Comment.Actions>
                  <Button>
                    Reply<span className="loam-VisuallyHidden"> to Tom Okafor</span>
                  </Button>
                </Comment.Actions>
              </Comment.Root>
            </Comment.Reply>
          </Comment.Replies>
        </Comment.Root>
      ),
    },
  ],
  whenToUse: [
    "A discussion under an article, a release or a ticket: named people, each remark dated, replies kept with what they answer.",
    "A single remark on its own, a reviewer's note beside a change or a pinned comment at the top of a thread; the unit does not need a list around it.",
  ],
  whenNotToUse: [
    "A quotation from a customer or a reader: that is a Testimonial, a figure whose caption is the attribution, not a dated remark in a conversation.",
    "A chat or a message stream: messages arrive in order, are read as one flow and are not replied to in place, so a log of them is a list with times, not comments.",
  ],
};

export default comment;
