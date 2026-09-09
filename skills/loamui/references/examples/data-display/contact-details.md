---
title: Contact details
description: How to reach the nursery: a phone number that dials, an email that opens, the postal address and the opening hours.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Contact details

How to reach the nursery: a phone number that dials, an email that opens, the postal address and the opening hours.

An example in **Data display**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: element styles and tokens only
- Tags: address, phone, email, opening hours, footer
- Live: https://loamui.com/examples/data-display/contact-details

## Built to the pillars

- **Native CSS.** An address element, which is contact information for the page, holding a description list; the phone is a tel link and the email a mailto link, so a tap dials or writes, and the hours are two descriptions of one term.
- **Modern CSS.** Two columns where the block has room and stacked pairs where it has not, each layout owned outright by its own container query; the pairs are grouping divs the wide grid sees through.
- **Composition.** Element styles alone: links, terms and descriptions carry it, and the address element's italic is the only default the example turns off.
- **Accessible & gatekept.** Each label and its value are associated by the list, the address keeps its line breaks in the markup rather than in the styling, the phone number is marked dir="ltr" so its two groups keep their order in a right-to-left page, and the links keep the page's own link colour and underline.

## Example.tsx

```tsx
import "./example.css";

export default function Example() {
  return (
    <address className="contact-details">
      <dl>
        <div className="pair">
          <dt>Phone</dt>
          <dd>
            <a href="tel:+441588640210" dir="ltr">
              01588 640210
            </a>
          </dd>
        </div>
        <div className="pair">
          <dt>Email</dt>
          <dd>
            <a href="mailto:hello@hedgerow.coop">hello@hedgerow.coop</a>
          </dd>
        </div>
        <div className="pair">
          <dt>Nursery</dt>
          <dd>
            Hedgerow Nursery
            <br />
            Bury Ditches Lane
            <br />
            Clun, Shropshire
            <br />
            SY7 8JQ
          </dd>
        </div>
        <div className="pair">
          <dt>Open</dt>
          <dd>Wednesday to Sunday, 10am to 4pm</dd>
          <dd>Closed Monday, Tuesday and the week of Christmas</dd>
        </div>
      </dl>
    </address>
  );
}
```

## example.css

```css
/* An address element holding a description list. Browsers set address in
   italic, a convention from letters that reads as emphasis here, so the
   root sets upright type. Each width owns its layout outright: the two
   columns live in the wide query and the stacked pairs in the narrow one,
   so neither overrides a rule the other set. The queries sit on the
   children because a container query is answered by an ancestor, never by
   the element that declares it. */
@scope (.contact-details) to ([class*="loam-"]) {
  :scope {
    container-type: inline-size;
    font-style: normal;
  }

  dl {
    display: block grid;
    margin: 0;
  }

  dt {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
  }

  /* A long email or URL breaks rather than widening the column. */
  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  /* Wide: two columns, the labels at their widest width, the values the
     rest. Each pair is a div so its cells stay together in the markup; the
     grid sees through it to place them as siblings, and every description
     is pinned to the second column so a term with two of them keeps both
     beside it. */
  @container (inline-size >= 22rem) {
    dl {
      gap: var(--loam-space-sm) var(--loam-space-lg);
      grid-template-columns: max-content 1fr;
    }

    div.pair {
      display: contents;
    }

    dd {
      grid-column: 2;
    }
  }

  /* Narrow: one column, each label above its values. The pair is a real
     box so the label sits close to its value and the pairs keep a larger
     gap between them. */
  @container (inline-size < 22rem) {
    dl {
      gap: var(--loam-space-md);
      grid-template-columns: 1fr;
    }

    div.pair {
      display: block grid;
      gap: var(--loam-space-xs);
    }
  }
}
```

