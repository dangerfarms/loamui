"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { renderWithProps, cx } from "@loamui/core";
import type { PartProps, RenderProp } from "@loamui/core";
import { useNamedRoot, useNamePart } from "../../naming";

interface ArticleHeaderContextValue {
  nameId: string;
  register: (id: string) => () => void;
}

const ArticleHeaderContext = createContext<ArticleHeaderContextValue | null>(null);

export interface ArticleHeaderRootProps extends PartProps<"header"> {
  /** Eyebrow, Title, Description, Meta, Tags and Media, in the order the page reads them. */
  children?: ReactNode;
}

/**
 * The top of an article: its category, its title, a standfirst, who wrote
 * it and when, its tags, and the lead image.
 *
 * The unit is a `header` at the top of one `article`, named by its Title
 * through `aria-labelledby`. The judgment is in the order and the levels:
 * the Title is the page's `h1` (the only one), the Eyebrow above it is a
 * link to the category and not a heading, the standfirst is a paragraph
 * and not an `h2`, and the byline, the tags and the picture are the
 * compositions built for them, `Byline`, `TagList` and a `figure`, placed
 * in the slots this header gives them. The header never sizes the page:
 * the title and the standfirst take the fluid scale from the container,
 * and the lead image takes the header's width and keeps its own ratio.
 *
 * ```tsx
 * <article>
 *   <ArticleHeader.Root>
 *     <ArticleHeader.Eyebrow>
 *       <a href="/blog/engineering">Engineering</a>
 *     </ArticleHeader.Eyebrow>
 *     <ArticleHeader.Title>Why the stylesheet is one static file</ArticleHeader.Title>
 *     <ArticleHeader.Description>Nothing runs at runtime, and that is the point.</ArticleHeader.Description>
 *     <ArticleHeader.Meta>
 *       <Byline.Root>…</Byline.Root>
 *     </ArticleHeader.Meta>
 *     <ArticleHeader.Media>
 *       <img src="/lead.jpg" alt="" />
 *     </ArticleHeader.Media>
 *   </ArticleHeader.Root>
 *   …
 * </article>
 * ```
 */
function ArticleHeaderRoot({ className, children, ...rest }: ArticleHeaderRootProps) {
  // The header is named by its Title from the first render, so the server
  // HTML carries the name; a consumer's own name wins.
  const { nameId, register, labelling } = useNamedRoot(rest);
  const value = useMemo<ArticleHeaderContextValue>(
    () => ({ nameId, register }),
    [nameId, register],
  );
  return (
    <ArticleHeaderContext value={value}>
      <header className={cx("loam-ArticleHeader", className)} {...labelling} {...rest}>
        {children}
      </header>
    </ArticleHeaderContext>
  );
}

export interface ArticleHeaderDivProps extends PartProps<"div"> {}

export interface ArticleHeaderParagraphProps extends PartProps<"p"> {}

/**
 * The category, above the title: a link to the section the article is
 * filed under, or a Badge. A `p`, not a heading, since it is not a title
 * of anything on this page.
 */
function ArticleHeaderEyebrow({ className, children, ...rest }: ArticleHeaderParagraphProps) {
  return (
    <p className={cx("eyebrow", className)} {...rest}>
      {children}
    </p>
  );
}

export interface ArticleHeaderTitleProps extends PartProps<"h1"> {
  /** Render as a different heading: `render={<h2 />}` where the article is not the page's own. */
  render?: RenderProp<Record<string, unknown>>;
  /** The article's title, as text: the header is on the article's own page, so the title links nowhere. */
  children?: ReactNode;
}

/**
 * The article's title: the page's `h1`. Its `id` (yours if you pass one,
 * the composition's otherwise) is what the header's `aria-labelledby`
 * points at, which is what names the header.
 */
function ArticleHeaderTitle({ render, className, children, id, ...rest }: ArticleHeaderTitleProps) {
  const ctx = useContext(ArticleHeaderContext);
  const titleId = useNamePart(ctx, id);
  const props = { id: titleId, className: cx("title", className), children, ...rest };
  if (render) return <>{renderWithProps(render, props)}</>;
  return <h1 {...props}>{children}</h1>;
}

/** The standfirst: one or two sentences on what the article says, larger than the body and muted, held to the measure. */
function ArticleHeaderDescription({ className, children, ...rest }: ArticleHeaderParagraphProps) {
  return (
    <p className={cx("description", className)} {...rest}>
      {children}
    </p>
  );
}

/** Who wrote it and when: the slot for a `Byline.Root`. */
function ArticleHeaderMeta({ className, children, ...rest }: ArticleHeaderDivProps) {
  return (
    <div className={cx("meta", className)} {...rest}>
      {children}
    </div>
  );
}

/** The topics it is filed under: the slot for a `TagList.Root`. */
function ArticleHeaderTags({ className, children, ...rest }: ArticleHeaderDivProps) {
  return (
    <div className={cx("tags", className)} {...rest}>
      {children}
    </div>
  );
}

export interface ArticleHeaderMediaProps extends PartProps<"figure"> {
  /** Your `img` (or `picture`), and a `figcaption` after it when the picture has a credit or a caption. */
  children?: ReactNode;
}

/**
 * The lead image: a `figure` holding your `img` at the header's width,
 * and a `figcaption` when there is a credit or a caption to give. An
 * empty `alt` when the picture only sets the scene; a description when
 * the article refers to it.
 */
function ArticleHeaderMedia({ className, children, ...rest }: ArticleHeaderMediaProps) {
  return (
    <figure className={cx("media", className)} {...rest}>
      {children}
    </figure>
  );
}

export const ArticleHeader = {
  Root: ArticleHeaderRoot,
  Eyebrow: ArticleHeaderEyebrow,
  Title: ArticleHeaderTitle,
  Description: ArticleHeaderDescription,
  Meta: ArticleHeaderMeta,
  Tags: ArticleHeaderTags,
  Media: ArticleHeaderMedia,
};
