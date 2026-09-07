"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import type { HTMLAttributes, LiHTMLAttributes, ReactNode, Ref } from "react";
import { Time, renderWithProps, cx } from "@loamui/core";
import type { RenderProp, TimeProps } from "@loamui/core";

interface CommentContextValue {
  /** The id the Author takes unless the consumer gives it one. */
  authorId: string;
  /** The Author tells the article which id names it; the article is named only while one is present. */
  registerAuthor: (id: string) => () => void;
}

const CommentContext = createContext<CommentContextValue | null>(null);

export interface CommentRootProps extends HTMLAttributes<HTMLElement> {
  /** Header, Body, then Actions and Replies as the comment has them. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
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
function CommentRoot({ className, children, ref, ...rest }: CommentRootProps) {
  const authorId = useId();
  const [labelId, setLabelId] = useState<string | null>(null);
  const registerAuthor = useCallback((id: string) => {
    setLabelId(id);
    return () => setLabelId((current) => (current === id ? null : current));
  }, []);
  const value = useMemo<CommentContextValue>(
    () => ({ authorId, registerAuthor }),
    [authorId, registerAuthor],
  );
  // A consumer's own name for the article wins over the author's, and the
  // article points at an Author only while one is rendered: a reference to
  // nothing would name it nothing.
  const named = rest["aria-label"] != null || rest["aria-labelledby"] != null;
  return (
    <CommentContext value={value}>
      <article
        ref={ref}
        className={cx("loam-Comment", className)}
        aria-labelledby={!named && labelId ? labelId : undefined}
        {...rest}
      >
        {children}
      </article>
    </CommentContext>
  );
}

export interface CommentPartProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * The byline: a wrapping row for an Avatar, the Author and the Time. Give
 * the Avatar the author's `name` and `aria-hidden`, because the name is
 * printed beside it and assistive technology should hear it once.
 */
function CommentHeader({ className, children, ref, ...rest }: CommentPartProps) {
  return (
    <header ref={ref} className={cx("header", className)} {...rest}>
      {children}
    </header>
  );
}

export interface CommentAuthorProps extends HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element: `render={<a href="/people/priya">Priya
   * Natarajan</a>}` to link the name to a profile. The part's classes and
   * attributes merge onto the element it renders, the same contract as
   * every core part; the element's own children win, so the name may sit
   * in either place.
   */
  render?: RenderProp<Record<string, unknown>>;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * Who wrote it. A `span` by default, a link through `render`. Its `id`
 * (yours if you pass one, the composition's otherwise) is what the
 * article's `aria-labelledby` points at, which is what names the comment.
 */
function CommentAuthor({ render, className, children, ref, id, ...rest }: CommentAuthorProps) {
  const ctx = useContext(CommentContext);
  if (!ctx) {
    throw new Error("Comment.Author must be rendered inside <Comment.Root>.");
  }
  const authorId = id ?? ctx.authorId;
  const { registerAuthor } = ctx;
  useEffect(() => registerAuthor(authorId), [registerAuthor, authorId]);
  const props = {
    ref,
    className: cx("author", className),
    children,
    ...rest,
    id: authorId,
  };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <span {...(props as HTMLAttributes<HTMLSpanElement> & { ref?: Ref<HTMLSpanElement> })} />;
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

export interface CommentDivProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** What they said: rich text, paragraphs, links and code, held to the reading measure. */
function CommentBody({ className, children, ref, ...rest }: CommentDivProps) {
  return (
    <div ref={ref} className={cx("body", className)} {...rest}>
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
function CommentActions({ className, children, ref, ...rest }: CommentDivProps) {
  return (
    <div ref={ref} className={cx("actions", className)} {...rest}>
      {children}
    </div>
  );
}

export interface CommentRepliesProps extends HTMLAttributes<HTMLUListElement> {
  /** Reply parts, each holding a nested Comment.Root. */
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

/**
 * The replies: a `ul` named "Replies", each reply a `li` around its own
 * comment. Indented once, with a rule marking the thread; replies to
 * replies sit at the same level, because a thread that steps in at every
 * depth soon leaves no room for the words. Beyond one level, link to the
 * parent in the reply's text instead.
 */
function CommentReplies({ className, children, ref, ...rest }: CommentRepliesProps) {
  return (
    // list-style: none drops list semantics in some browsers; role="list"
    // keeps the replies a list.
    <ul ref={ref} role="list" className={cx("replies", className)} aria-label="Replies" {...rest}>
      {children}
    </ul>
  );
}

export interface CommentReplyProps extends LiHTMLAttributes<HTMLLIElement> {
  /** A nested Comment.Root. */
  children?: ReactNode;
  ref?: Ref<HTMLLIElement>;
}

/** One reply: the list item around a nested comment. */
function CommentReply({ className, children, ref, ...rest }: CommentReplyProps) {
  return (
    <li ref={ref} className={cx("reply", className)} {...rest}>
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
