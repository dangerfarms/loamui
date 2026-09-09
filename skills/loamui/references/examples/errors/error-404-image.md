---
title: Page not found with an illustration
description: A 404 page in two columns: the code, what happened and a way back on one side, a drawing of an empty pot on the other.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Page not found with an illustration

A 404 page in two columns: the code, what happened and a way back on one side, a drawing of an empty pot on the other.

An example in **Error pages**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `SignpostLink`
- Tags: 404, not found, missing, error page, illustration
- Live: https://loamui.com/examples/errors/error-404-image

## Built to the pillars

- **Native CSS.** A section named by its own h1, because the error is the page; the code is a paragraph, not a heading, so the outline reads Nothing is growing here and not 404.
- **Modern CSS.** The page is a container: one column with the picture under the words where it is narrow, two columns with the picture at the end where it is wide; nothing is sized to a viewport.
- **Composition.** The illustration is an inline SVG in the markup, stroked in currentColor with a few parts coloured by token, so a reader recolours or redraws it in place; SignpostLink is dropped in as it comes.
- **Accessible & gatekept.** The illustration is hidden from assistive technology because the words already say it; the way back is a SignpostLink because it goes somewhere, and the copy says what to do without blaming the reader.

## Example.tsx

```tsx
import { SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="error-404-image" aria-labelledby="error-404-image-title">
      <div className="text">
        <p className="code">404</p>
        <h1 id="error-404-image-title">Nothing is growing here</h1>
        <p className="description">
          We looked under every pot. The page you asked for is not here: the link you followed may
          be out of date, or the page went when the new season’s catalogue replaced the old one.
        </p>
        <div className="actions">
          <SignpostLink href="/">Back to the home page</SignpostLink>
        </div>
      </div>
      <svg
        className="illustration"
        viewBox="0 0 240 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M70 110h100l-10 70H80z" />
        <rect x="62" y="98" width="116" height="12" rx="3" />
        <path className="soil" d="M84 110c10-6 62-6 72 0" />
        <path d="M120 98V52" />
        <path className="leaf" d="M120 74c-14 2-24-4-26-16 12-2 22 4 26 16z" />
        <path className="leaf" d="M120 62c10-8 22-8 30 0-8 8-20 10-30 0z" />
        <path className="wilt" d="M120 52c0-10 6-16 10-16" />
        <path className="ground" d="M20 180h200" />
        <path
          className="ground"
          d="M30 180c6-8 12-12 18-12M60 180c3-6 6-9 9-9M190 180c-6-8-12-12-18-12"
        />
      </svg>
    </section>
  );
}
```

## example.css

```css
/* An error page is a region: it declares its container so the fluid
   tokens answer its own width, and it hosts a SignpostLink, hence the
   donut. Narrow, the words then the picture in one column; wide, the
   picture beside the words at the end. */
@scope (.error-404-image) to ([class*="loam-"]) {
  :scope {
    align-items: center;
    container-type: inline-size;
    display: block grid;
    gap: var(--loam-space-xl);
    min-block-size: 24rem;
    padding-block: var(--loam-space-xl);
  }

  div.text {
    display: block grid;
    gap: var(--loam-space-md);
    justify-items: start;
  }

  /* The code is set dim on purpose: it identifies the error for anyone
     who needs it and stays behind the title, which is what the reader
     needs. */
  p.code {
    color: var(--loam-color-fg-dim);
    font-family: var(--loam-font-display);
    font-size: var(--loam-text-xl);
    font-variant-numeric: lining-nums tabular-nums;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 1;
    margin: 0;
  }

  h1 {
    font-size: var(--loam-text-2xl);
    margin: 0;
    text-wrap: balance;
  }

  p.description {
    color: var(--loam-color-fg-muted);
    margin: 0;
    max-inline-size: var(--loam-measure);
    text-wrap: pretty;
  }

  div.actions {
    display: block flex;
    margin-block-start: var(--loam-space-sm);
  }

  /* The illustration is decoration, stroked in the dim foreground so it
     sits behind the words; the leaves keep a little colour and the
     wilted tip says what happened. */
  svg.illustration {
    block-size: auto;
    color: var(--loam-color-fg-dim);
    inline-size: min(100%, 20rem);
    justify-self: center;

    path.leaf {
      fill: var(--loam-color-success-soft);
      stroke: var(--loam-color-success-strong);
    }

    path.soil,
    path.wilt {
      stroke: var(--loam-color-fg-muted);
    }

    path.ground {
      stroke: var(--loam-color-line-strong);
    }
  }

  @container (inline-size >= 40rem) {
    :scope {
      grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    }

    svg.illustration {
      justify-self: end;
    }
  }
}
```

