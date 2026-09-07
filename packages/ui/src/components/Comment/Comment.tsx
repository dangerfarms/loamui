"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { Time, renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp, TimeProps } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

interface CommentContextValue {
  /** The id the Author takes unless the consumer gives it one. */
  nameId: string;
  /** The Author tells the article which id names it; the article is named only while one is present. */
  register: (id: string) => () => void;
}

const CommentContext = createContext<CommentContextValue | null>(null);

export interface CommentRootProps extends PartProps<"article"> {
  /** Header, Body, then Actions and Replies as the comment has them. */
  children?: ReactNode;
}

/**
 * One comment: who wrote it, when, and what they said, with its replies.
 *
 * The unit is an `article`, because a comment is self-contained and
 * syndicable, and it is named by its author: `aria-labelledby` points at
 * the Author part, so a screen reader's list of the page's articles reads
 * "Priya Natarajan", "Tom Okafor" rather than "article", "article". The
 * time is core's `Time`, so `dateTime` is always the machine-readable
 * moment whatever words are shown. It stands on its own; a thread is a
 * list you write with each comment in a `li`, and a comment's replies are
 * its own `Replies` list.
 *
 * ```tsx
 * <Comment.Root>
 *   <Comment.Header>
 *     <Avatar name="Priya Natarajan" aria-hidden />
 *     <Comment.Author render={<a href="/people/priya">Priya Natarajan</a>} />
 *     <Comment.Time value="2026-09-05T14:30:00Z" relative={{ now }} />
 *   </Comment.Header>
 *   <Comment.Body>
 *     <p>The static stylesheet is the whole point.</p>
 *   </Comment.Body>
 * </Comment.Root>
 * ```
 */
function CommentRoot({ className, children, ...rest }: CommentRootProps) {
  // The article is named by its Author from the first render, so the
  // server HTML carries the name; a consumer's own name wins, and the
  // reference goes once nothing is registered against it.
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<CommentContextValue>(() => ({ nameId, register }), [nameId, register]);
  return (
    <CommentContext value={value}>
      <article className={cx("loam-Comment", className)} {...labelling} {...rest}>
        {children}
      </article>
    </CommentContext>
  );
}

export interface CommentHeaderProps extends PartProps<"header"> {}

/**
 * The byline: a wrapping row for an Avatar, the Author and the Time. Give
 * the Avatar the author's `name` and `aria-hidden`, because the name is
 * printed beside it and assistive technology should hear it once.
 */
function CommentHeader({ className, children, ...rest }: CommentHeaderProps) {
  return (
    <header className={cx("header", className)} {...rest}>
      {children}
    </header>
  );
}

export interface CommentAuthorProps extends PartProps<"span"> {
  /**
   * Render as a different element: `render={<a href="/people/priya">Priya
   * Natarajan</a>}` to link the name to a profile. The part's classes and
   * attributes merge onto the element it renders, the same contract as
   * every core part; the element's own children win, so the name may sit
   * in either place.
   */
  render?: RenderProp<Record<string, unknown>>;
}

/**
 * Who wrote it. A `span` by default, a link through `render`. Its `id`
 * (yours if you pass one, the composition's otherwise) is what the
 * article's `aria-labelledby` points at, which is what names the comment.
 */
function CommentAuthor({ render, className, children, id, ...rest }: CommentAuthorProps) {
  const ctx = useContext(CommentContext);
  const authorId = useNamePart(ctx, id);
  const props = { className: cx("author", className), children, ...rest, id: authorId };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <span {...props} />;
}

export interface CommentTimeProps extends TimeProps {
  /** Applied to the part's `span`; every other prop, `ref` included, reaches the `time` inside it. */
  className?: string;
}

/**
 * When it was written: core's `Time`, so `dateTime` is the ISO moment
 * whatever the text says, in a `span` the row addresses. Pass
 * `relative={{ now }}` to write the distance ("2 days ago") against a
 * moment you supply, never the clock: the server and the browser then
 * write the same words and hydration agrees.
 */
function CommentTime({ className, ...rest }: CommentTimeProps) {
  return (
    <span className={cx("time", className)}>
      <Time {...rest} />
    </span>
  );
}

export interface CommentDivProps extends PartProps<"div"> {}

/** What they said: rich text, paragraphs, links and code, held to the reading measure. */
function CommentBody({ className, children, ...rest }: CommentDivProps) {
  return (
    <div className={cx("body", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * A row for your own controls: Reply, Like, Report. Each one on the page
 * needs to say which comment it belongs to, so complete its name with
 * real text, visually hidden by core's class: `Reply<span
 * className="loam-VisuallyHidden"> to Priya Natarajan</span>`. Real text
 * translates and shows in reader mode; an aria-label does neither. The
 * class is core's, so it works inside a core `Button` as well as a native
 * `button` or `a` placed here.
 */
function CommentActions({ className, children, ...rest }: CommentDivProps) {
  return (
    <div className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

/** The words the replies list says on its own, each with an English default. */
export interface CommentRepliesLabels {
  /** The list's accessible name. @default "Replies" */
  replies?: string;
}

export interface CommentRepliesProps extends PartProps<"ul"> {
  /** The list's own words: `replies` names it. An `aria-label` or `aria-labelledby` you pass wins. */
  labels?: CommentRepliesLabels;
  /** Reply parts, each holding a nested Comment.Root. */
  children?: ReactNode;
}

/**
 * The replies: a `ul` named "Replies" (or `labels.replies`), each reply a
 * `li` around its own comment. Indented once, with a rule marking the
 * thread; replies to replies sit at the same level, because a thread that
 * steps in at every depth soon leaves no room for the words. Beyond one
 * level, link to the parent in the reply's text instead.
 */
function CommentReplies({
  labels,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ...rest
}: CommentRepliesProps) {
  const name = ariaLabelledBy ? ariaLabel : (ariaLabel ?? labels?.replies ?? "Replies");
  return (
    // list-style: none drops list semantics in some browsers; role="list"
    // keeps the replies a list.
    <ul
      role="list"
      className={cx("replies", className)}
      aria-label={name}
      aria-labelledby={ariaLabelledBy}
      {...rest}
    >
      {children}
    </ul>
  );
}

export interface CommentReplyProps extends PartProps<"li"> {
  /** A nested Comment.Root. */
  children?: ReactNode;
}

/** One reply: the list item around a nested comment. */
function CommentReply({ className, children, ...rest }: CommentReplyProps) {
  return (
    <li className={cx("reply", className)} {...rest}>
      {children}
    </li>
  );
}

export const Comment = {
  Root: CommentRoot,
  Header: CommentHeader,
  Author: CommentAuthor,
  Time: CommentTime,
  Body: CommentBody,
  Actions: CommentActions,
  Replies: CommentReplies,
  Reply: CommentReply,
};
