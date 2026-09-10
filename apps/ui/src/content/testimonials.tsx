"use client";

import { Avatar } from "@loamui/core";
import { Testimonials } from "@loamui/ui";
import type { Composition } from "./types";

const testimonials: Composition = {
  slug: "testimonials",
  name: "Testimonials",
  category: "Page sections",
  description:
    "A scroll-snap carousel of quotes, each in a Card, with a pair of Buttons that page through it.",
  lead: "Six parts on a native section and list. The track is an ordinary scroller with snap points, so it works with a wheel, a swipe, a keyboard and no JavaScript at all; the Controls only add two Buttons that page it, and smooth scrolling is opt-in via the reader's motion preference.",
  importLine: `import { Testimonials } from "@loamui/ui";`,
  parts: [
    {
      name: "Testimonials.Root",
      description:
        "The section. Declares its own container so the fluid tokens answer the section's width.",
    },
    {
      name: "Testimonials.Track",
      description:
        "The scroller: a column grid, each column at most 22rem, with inline scroll snapping.",
    },
    { name: "Testimonials.Item", description: "One testimonial: a snap point wrapping a Card." },
    {
      name: "Testimonials.Quote",
      description: "The quotation, a blockquote. Pass cite when the source has a URL.",
    },
    {
      name: "Testimonials.Author",
      description: "Who said it: a footer row for an Avatar and the name and role beside it.",
    },
    {
      name: "Testimonials.Controls",
      description:
        "Two Buttons, Previous and Next, that page the Track by one width. Place them anywhere inside the Root.",
    },
  ],
  demos: [
    {
      title: "Four quotes",
      description: "Scroll the track, or page it with the Buttons; each quote snaps into place.",
      code: `<Testimonials.Root>
  <h2>What teams say</h2>
  <Testimonials.Track>
    <Testimonials.Item>
      <Testimonials.Quote>
        We shipped a bespoke design system in a week. The primitives did the work; we
        supplied the vocabulary.
      </Testimonials.Quote>
      <Testimonials.Author>
        <Avatar name="Priya Natarajan" aria-hidden />
        <p>
          <strong>Priya Natarajan</strong>
          <br />
          Head of product, logistics
        </p>
      </Testimonials.Author>
    </Testimonials.Item>
    <Testimonials.Item>
      <Testimonials.Quote>
        Dark mode, fluid type and contrast all came built in. I stopped writing overrides
        on day two.
      </Testimonials.Quote>
      <Testimonials.Author>
        <Avatar name="Tom Okafor" aria-hidden />
        <p>
          <strong>Tom Okafor</strong>
          <br />
          Product designer, healthcare
        </p>
      </Testimonials.Author>
    </Testimonials.Item>
    <Testimonials.Item>
      <Testimonials.Quote>
        Our agent reads the docs and writes components that pass review. That had never
        happened before.
      </Testimonials.Quote>
      <Testimonials.Author>
        <Avatar name="Sam Reid" aria-hidden />
        <p>
          <strong>Sam Reid</strong>
          <br />
          Founder, a two-person studio
        </p>
      </Testimonials.Author>
    </Testimonials.Item>
    <Testimonials.Item>
      <Testimonials.Quote>
        Real buttons, real headings, real focus rings. Nothing to fix in the audit, which is
        the highest praise I have.
      </Testimonials.Quote>
      <Testimonials.Author>
        <Avatar name="Hannah Weiss" aria-hidden />
        <p>
          <strong>Hannah Weiss</strong>
          <br />
          Accessibility consultant
        </p>
      </Testimonials.Author>
    </Testimonials.Item>
  </Testimonials.Track>
  <Testimonials.Controls />
</Testimonials.Root>`,
      render: () => (
        <Testimonials.Root>
          <h2>What teams say</h2>
          <Testimonials.Track>
            <Testimonials.Item>
              <Testimonials.Quote>
                We shipped a bespoke design system in a week. The primitives did the work; we
                supplied the vocabulary.
              </Testimonials.Quote>
              <Testimonials.Author>
                <Avatar name="Priya Natarajan" aria-hidden />
                <p>
                  <strong>Priya Natarajan</strong>
                  <br />
                  Head of product, logistics
                </p>
              </Testimonials.Author>
            </Testimonials.Item>
            <Testimonials.Item>
              <Testimonials.Quote>
                Dark mode, fluid type and contrast all came built in. I stopped writing overrides on
                day two.
              </Testimonials.Quote>
              <Testimonials.Author>
                <Avatar name="Tom Okafor" aria-hidden />
                <p>
                  <strong>Tom Okafor</strong>
                  <br />
                  Product designer, healthcare
                </p>
              </Testimonials.Author>
            </Testimonials.Item>
            <Testimonials.Item>
              <Testimonials.Quote>
                Our agent reads the docs and writes components that pass review. That had never
                happened before.
              </Testimonials.Quote>
              <Testimonials.Author>
                <Avatar name="Sam Reid" aria-hidden />
                <p>
                  <strong>Sam Reid</strong>
                  <br />
                  Founder, a two-person studio
                </p>
              </Testimonials.Author>
            </Testimonials.Item>
            <Testimonials.Item>
              <Testimonials.Quote>
                Real buttons, real headings, real focus rings. Nothing to fix in the audit, which is
                the highest praise I have.
              </Testimonials.Quote>
              <Testimonials.Author>
                <Avatar name="Hannah Weiss" aria-hidden />
                <p>
                  <strong>Hannah Weiss</strong>
                  <br />
                  Accessibility consultant
                </p>
              </Testimonials.Author>
            </Testimonials.Item>
          </Testimonials.Track>
          <Testimonials.Controls />
        </Testimonials.Root>
      ),
    },
  ],
  whenToUse: [
    "A handful of quotes of similar length where the reader is invited to browse, not obliged to read every one.",
    "When the page must work without JavaScript: the track is a native scroller, and the Buttons are an extra, not a dependency.",
  ],
  whenNotToUse: [
    "One or two quotes; those read better in flow, as a blockquote on the page.",
    "Content the reader must not miss, such as terms or steps: a carousel hides everything past the first page.",
  ],
};

export default testimonials;
