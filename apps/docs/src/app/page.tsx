import Link from "next/link";
import { SignpostLink } from "@loamui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import { BoltIcon, CheckIcon } from "@/site/Icons";
import { HeroShowcase } from "./home.client";
import { AgentShowcase } from "./AgentShowcase.client";
import { RestaurantMenu } from "./agent-demo/menu";
import { menu } from "./agent-demo/generated";
import "./home.css";

const TENETS = [
  {
    title: "Modern APIs, features and elements",
    body: (
      <>
        Real <code>&lt;dialog&gt;</code>, <code>&lt;details&gt;</code>, the Popover API, anchor
        positioning, container queries. The platform&rsquo;s own widgets, styled, not
        reimplementations of them.
      </>
    ),
  },
  {
    title: "Progressive enhancement",
    body: (
      <>
        The native element is the baseline: forms, disclosures and links work before JavaScript, and
        overlays open from server-rendered markup once it hydrates. Motion and newer platform
        features are layered on top, inside <code>prefers-reduced-motion: no-preference</code> and{" "}
        <code>@supports</code>.
      </>
    ),
  },
  {
    title: "Baseline browser support",
    body: (
      <>
        Features are adopted once they are{" "}
        <a href="https://web.dev/baseline" target="_blank" rel="noreferrer">
          Baseline
        </a>{" "}
        (supported in every major engine); anything newer ships as an enhancement behind{" "}
        <code>@supports</code>. Support claims come from compatibility data, not optimism.
      </>
    ),
  },
];

const AGENT_PROMPT =
  "Build a restaurant menu using LoamUI: two cards, Starter and Dessert. Each card lists three dishes with a one-line description and a price, has one status badge (Vegetarian, Sold out) and one action button.";

const PRIMITIVES = [
  {
    title: "Tokens",
    href: "/docs/tokens",
    body: "A handful of semantic decisions — a small palette of colours, a neutral ramp, fluid scales — with everything else derived from them.",
  },
  {
    title: "Element styles",
    href: "/docs/element-styles",
    body: "Enhanced default styles for native HTML, page-wide: responsive, accessible, and answering the user's own preferences.",
  },
  {
    title: "Components",
    href: "/docs/components",
    body: "A small set of carefully chosen, easily composed components, not hundreds.",
  },
];

const UX_RULES = [
  "Form fields read label, description, error, control, so the fix is read before the answer is given",
  "Optional is marked in words, never with asterisks",
  "Buttons act; links go, and the docs hold the line between them",
  "A switch acts now; a checkbox acts on submit",
  "Disclosure exists to shorten a long page, not to hide what everyone needs",
];

const A11Y_RULES = [
  "Semantics come from the platform, so ARIA is derived rather than declared",
  "Keyboard patterns follow the APG, including focus return and light dismiss",
  "The user's preferences are the baseline: colour scheme, reduced motion, forced colours, zoom and browser font size",
  "Contrast is engineered into the token recipes, not checked once and hoped for",
];

const GATES = [
  "Stylelint: standard, modern and alphabetical configs, nothing switched off",
  "Contrast audit reads the recipes out of the real stylesheets",
  "axe, the automated accessibility checker, runs on every component",
  "Interaction tests on real markup",
  "TypeScript-first",
  "Zero styling runtime",
];

const TECHNIQUES = [
  {
    name: "light-dark()",
    desc: "One value, both themes: no duplicated theme objects.",
    code: "color: light-dark(\n  oklch(24% 0.02 60deg), oklch(96% 0.006 60deg)\n);",
  },
  {
    name: "color-mix()",
    desc: "Derive every hover and tint from a single token.",
    code: "color-mix(\n  in oklab, var(--_color), #0000\n)",
  },
  {
    name: "@container",
    desc: "Components respond to their container, not the viewport.",
    code: "@container (width > 20rem) { … }",
  },
  {
    name: ":has()",
    desc: "Style a parent from the state of its children.",
    code: ".loam-Field:has(> p.error) { … }",
  },
  {
    name: "logical properties",
    desc: "RTL-ready by default, with no hardcoded left / right.",
    code: "padding-inline: 1rem; margin-block: 0.5rem;",
  },
  {
    name: "@layer",
    desc: "A predictable cascade: no specificity wars, no !important.",
    code: "@layer loamui.components { … }",
  },
  {
    name: "clamp()",
    desc: "Fluid type and spacing without a single media query.",
    code: "font-size: clamp(1rem, 0.93rem + 0.35cqi, 1.25rem);",
  },
  {
    name: "@scope",
    desc: "Encapsulation in the browser, so parts keep plain names.",
    code: "@scope (.loam-Field) { label { … } }",
  },
];

export default function HomePage() {
  return (
    <div className="site-Home">
      {/* Hero */}
      <section className="hero" data-no-hyphens>
        <div className="heroBg" />
        <div className="container heroGrid">
          <div>
            <span className="badgeRow">
              <span className="badgePill">v0.1 Beta</span>
            </span>
            <h1 className="title">
              Modern UI primitives for <span className="brandText">agent-assisted developers.</span>
            </h1>
            <p className="subtitle">
              Use our agent skill to quickly build bespoke, accessible UIs on top of our contextual
              tokens, element styles, and React components.
            </p>
            <div className="ctaRow">
              <SignpostLink render={<Link href="/docs" />}>Get started</SignpostLink>
            </div>
          </div>
          <div className="heroArt">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* The three primitives */}
      <section className="container section" data-no-hyphens>
        <div className="sectionHead center">
          <span className="eyebrow">Three primitives</span>
          <h2 className="sectionTitle">Tokens. Element styles. Components.</h2>
          <p className="sectionSub">
            Tokens and element styles matter as much as the components: they are what agents build
            downstream components and whole apps from. All three ship in one package.
          </p>
        </div>
        <div className="cats">
          {PRIMITIVES.map((p) => (
            <Link key={p.title} href={p.href} className="cat">
              <span className="catTitle">{p.title}</span>
              <span className="catItems">{p.body}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ask an agent: prompt, result, code */}
      <section className="container section" data-no-hyphens>
        <div className="sectionHead center">
          <span className="eyebrow">Built with an agent</span>
          <h2 className="sectionTitle">Ask for a component. Get one built on the primitives.</h2>
          <p className="sectionSub">
            LoamUI&rsquo;s core ships low-level parts and no more. Larger sections, such as a hero
            or a grid of cards, are compositions: your agent builds one from the three primitives.
          </p>
        </div>
        <AgentShowcase
          skillCommand="npx skills add dangerfarms/loamui"
          prompt={AGENT_PROMPT}
          tsx={menu.tsx}
          css={menu.css}
          caption="A restaurant menu composed from LoamUI’s tokens, element styles and components. Each card declares its status, and its controls respond to that context. Explore the React and CSS, or use the prompt to build your own."
        >
          <RestaurantMenu />
        </AgentShowcase>
      </section>

      {/* Pillar 1: Modern */}
      <section className="container section" data-no-hyphens>
        <div className="sectionHead center">
          <span className="eyebrow">
            <BoltIcon width={14} height={14} /> Pillar 1: Modern Web
          </span>
          <h2 className="sectionTitle">Built on Google&rsquo;s Modern Web Guidance.</h2>
          <p className="sectionSub">
            Semantic HTML and modern CSS underpin all three primitives, following Google’s Modern
            Web Guidance. Three tenets shape their implementation:
          </p>
        </div>
        <div className="features">
          {TENETS.map((t) => (
            <div key={t.title} className="feature">
              <span className="featureIcon" aria-hidden>
                <BoltIcon width={18} height={18} />
              </span>
              <h3 className="featureTitle">{t.title}</h3>
              <p className="featureText">{t.body}</p>
            </div>
          ))}
        </div>

        {/* Modern CSS, a part of Modern Web */}
        <div className="sectionHead center subHead">
          <h3 className="sectionTitle">Modern CSS, put to work.</h3>
          <p className="sectionSub">
            LoamUI ships static CSS built on the platform’s own features, with no JavaScript styling
            runtime.
          </p>
        </div>
        <ul className="tech">
          {TECHNIQUES.map((t) => (
            <li key={t.name} className="techCard">
              <code className="techName">{t.name}</code>
              <p className="techDesc">{t.desc}</p>
              <pre className="techCode">{t.code}</pre>
            </li>
          ))}
        </ul>

        {/* Contextualism, the paradigm shift underneath */}
        <div className="split">
          <div>
            <h3 className="sectionTitle">A paradigm shift: context decides, props don&rsquo;t.</h3>
            <p className="sectionSub">
              Contextualism runs through all three primitives. Tokens respond to the surrounding
              region; element styles and components use those tokens. Declare a region’s meaning
              once, and its contents adapt. Explore the{" "}
              <Link href="/docs/contextualism">Contextualism guide</Link> to see how colour,
              available space and content shape the result.
            </p>
            <ul className="splitList">
              {[
                "One region declaration recolours buttons, checkboxes, focus rings, selection",
                "Fluid tokens size controls to their container, with no size props",
                "Width is the parent's layout: rows shrink-wrap, stacks stretch",
              ].map((item) => (
                <li key={item} className="splitItem">
                  <span className="splitCheck" aria-hidden>
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            language="css"
            code={`/* a named region declares its meaning */
.danger-zone {
  --loam-context: danger;
}

/* every LoamUI component inside adopts it:
   buttons, checked states, carets, focus
   rings. No props, no wrappers */`}
          />
        </div>
      </section>

      {/* Pillar 2: Accessibility & UX best practice */}
      <section className="container section" data-no-hyphens>
        <div className="sectionHead center">
          <span className="eyebrow">Pillar 2: Accessibility &amp; UX best practice</span>
          <h2 className="sectionTitle">The hard-earned rules, already in the primitives.</h2>
          <p className="sectionSub">
            Distilled from the GOV.UK and Polaris design systems and running through tokens, element
            styles and components alike. The{" "}
            <Link href="/docs/accessibility">Accessibility guide</Link> sets out what is engineered
            and what still needs your judgment.
          </p>
        </div>
        <ul className="pillars">
          {A11Y_RULES.map((item) => (
            <li key={item} className="pillar">
              <p className="pillarBody">{item}</p>
            </li>
          ))}
        </ul>
        <ul className="shouts">
          {UX_RULES.map((item) => (
            <li key={item} className="shout">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Gatekeeping: can you trust the agents? */}
      <section className="container section" data-no-hyphens>
        <div className="split">
          <div>
            <h2 className="sectionTitle">
              Quality that doesn&rsquo;t depend on who wrote the code.
            </h2>
            <p className="sectionSub">
              Stylelint, contrast audits, automated accessibility checks and interaction tests run
              in CI. Together, they check the conventions and behaviours that keep the primitives
              consistent as the code changes.
            </p>
            <ul className="splitList">
              {GATES.map((item) => (
                <li key={item} className="splitItem">
                  <span className="splitCheck" aria-hidden>
                    <CheckIcon width={13} height={13} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            language="css"
            code={`/* the audit reads these weights from the
   stylesheet and asserts every derived
   pairing holds its contrast. Change a
   recipe and CI tells you what broke */
--loam-color-primary-strong: light-dark(
  color-mix(in oklab, var(--loam-color-primary),
    oklch(0% 0 0deg) 22%),
  var(--loam-color-primary)
);`}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="container" data-no-hyphens>
        <div className="cta">
          <h2 className="ctaTitle">Start building</h2>
          <p className="ctaSub">
            Three primitives in one package: contextual tokens, enhanced element styles and a small
            set of composable React components. An agent skill to build with them. Two pillars,
            Modern and Accessible, holding all three together, and deterministic gates keeping them
            there.
          </p>
          <div className="ctaRowCenter">
            <SignpostLink render={<Link href="/docs" />}>Get started</SignpostLink>
          </div>
        </div>
      </section>
    </div>
  );
}
