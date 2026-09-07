"use client";

import { Avatar, Card } from "@loamui/core";
import { Carousel, Testimonial } from "@loamui/ui";
import type { Composition } from "./types";

const testimonial: Composition = {
  slug: "testimonial",
  name: "Testimonial",
  category: "Page sections",
  description: "One testimonial: a quotation and who said it, alone, in a Card or in a Carousel.",
  lead: "The unit is the testimonial: a figure whose quote is a blockquote and whose author is the figcaption, so the attribution is tied to the quote by the platform, not by layout. It stands in flow on its own, sits in a Card, and rides in a Carousel or a grid you write; the arrangement is never the testimonial's business.",
  importLine: `import { Testimonial } from "@loamui/ui";`,
  parts: [
    {
      name: "Testimonial.Root",
      description:
        "The figure. Declares its own container so the fluid tokens answer its width; fills a Card's height so the author sits at the foot.",
    },
    {
      name: "Testimonial.Quote",
      description: "The quotation, a blockquote. Pass cite when the source has a URL.",
    },
    {
      name: "Testimonial.Author",
      description:
        "Who said it: the figure's caption, a row for an Avatar and the name and role beside it.",
    },
  ],
  demos: [
    {
      title: "One testimonial",
      description: "A single quote reads best in flow, with no card and no track around it.",
      code: `<Testimonial.Root>
  <Testimonial.Quote>
    Real buttons, real headings, real focus rings. Nothing to fix in the audit, which is the
    highest praise I have.
  </Testimonial.Quote>
  <Testimonial.Author>
    <Avatar name="Hannah Weiss" aria-hidden />
    <p>
      <strong>Hannah Weiss</strong>
      <br />
      Accessibility consultant
    </p>
  </Testimonial.Author>
</Testimonial.Root>`,
      render: () => (
        <Testimonial.Root>
          <Testimonial.Quote>
            Real buttons, real headings, real focus rings. Nothing to fix in the audit, which is the
            highest praise I have.
          </Testimonial.Quote>
          <Testimonial.Author>
            <Avatar name="Hannah Weiss" aria-hidden />
            <p>
              <strong>Hannah Weiss</strong>
              <br />
              Accessibility consultant
            </p>
          </Testimonial.Author>
        </Testimonial.Root>
      ),
    },
    {
      title: "In a carousel",
      description:
        "Several quotes ride in a Carousel, each in a Card. The track is a native scroller; the Buttons page it; nothing here is the testimonial's own.",
      code: `<Carousel.Root aria-labelledby="quotes">
  <h2 id="quotes">What teams say</h2>
  <Carousel.Track>
    <Carousel.Item>
      <Card>
        <Testimonial.Root>
          <Testimonial.Quote>
            We shipped a bespoke design system in a week. The primitives did the work; we
            supplied the vocabulary.
          </Testimonial.Quote>
          <Testimonial.Author>
            <Avatar name="Priya Natarajan" aria-hidden />
            <p>
              <strong>Priya Natarajan</strong>
              <br />
              Head of product, logistics
            </p>
          </Testimonial.Author>
        </Testimonial.Root>
      </Card>
    </Carousel.Item>
    <Carousel.Item>
      <Card>
        <Testimonial.Root>
          <Testimonial.Quote>
            Dark mode, fluid type and contrast all came built in. I stopped writing overrides
            on day two.
          </Testimonial.Quote>
          <Testimonial.Author>
            <Avatar name="Tom Okafor" aria-hidden />
            <p>
              <strong>Tom Okafor</strong>
              <br />
              Product designer, healthcare
            </p>
          </Testimonial.Author>
        </Testimonial.Root>
      </Card>
    </Carousel.Item>
    <Carousel.Item>
      <Card>
        <Testimonial.Root>
          <Testimonial.Quote>
            Our agent reads the docs and writes components that pass review. That had never
            happened before.
          </Testimonial.Quote>
          <Testimonial.Author>
            <Avatar name="Sam Reid" aria-hidden />
            <p>
              <strong>Sam Reid</strong>
              <br />
              Founder, a two-person studio
            </p>
          </Testimonial.Author>
        </Testimonial.Root>
      </Card>
    </Carousel.Item>
  </Carousel.Track>
  <Carousel.Controls />
</Carousel.Root>`,
      render: () => (
        <Carousel.Root aria-labelledby="quotes">
          <h2 id="quotes">What teams say</h2>
          <Carousel.Track>
            <Carousel.Item>
              <Card>
                <Testimonial.Root>
                  <Testimonial.Quote>
                    We shipped a bespoke design system in a week. The primitives did the work; we
                    supplied the vocabulary.
                  </Testimonial.Quote>
                  <Testimonial.Author>
                    <Avatar name="Priya Natarajan" aria-hidden />
                    <p>
                      <strong>Priya Natarajan</strong>
                      <br />
                      Head of product, logistics
                    </p>
                  </Testimonial.Author>
                </Testimonial.Root>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card>
                <Testimonial.Root>
                  <Testimonial.Quote>
                    Dark mode, fluid type and contrast all came built in. I stopped writing
                    overrides on day two.
                  </Testimonial.Quote>
                  <Testimonial.Author>
                    <Avatar name="Tom Okafor" aria-hidden />
                    <p>
                      <strong>Tom Okafor</strong>
                      <br />
                      Product designer, healthcare
                    </p>
                  </Testimonial.Author>
                </Testimonial.Root>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card>
                <Testimonial.Root>
                  <Testimonial.Quote>
                    Our agent reads the docs and writes components that pass review. That had never
                    happened before.
                  </Testimonial.Quote>
                  <Testimonial.Author>
                    <Avatar name="Sam Reid" aria-hidden />
                    <p>
                      <strong>Sam Reid</strong>
                      <br />
                      Founder, a two-person studio
                    </p>
                  </Testimonial.Author>
                </Testimonial.Root>
              </Card>
            </Carousel.Item>
          </Carousel.Track>
          <Carousel.Controls />
        </Carousel.Root>
      ),
    },
  ],
  whenToUse: [
    "A quote from a named person, wherever it sits: alone beside a claim it supports, in a Card among others, or in a Carousel the reader browses.",
    "A pull quote: the same figure without an Author, set in flow where the page wants a line to stand out.",
  ],
  whenNotToUse: [
    "Content the reader must not miss, such as terms or steps; a carousel of testimonials hides everything past the first page.",
    "An unattributed slogan: a quotation with no source is copy, so write it as a paragraph.",
  ],
};

export default testimonial;
